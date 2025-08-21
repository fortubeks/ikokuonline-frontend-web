// cart.js
import { reactive, computed, provide, inject, onMounted, watch, ref } from 'vue'
import api from '@/services/api'

const CartSymbol = Symbol('Cart')

// --- Config ---
const GUEST_CART_KEY = 'cart'
const GUEST_CART_TTL_MINUTES = 60 * 24 * 30 // 30 days; set to null to disable

function nowPlusMinutes(mins) {
  const d = new Date()
  d.setMinutes(d.getMinutes() + mins)
  return d.toISOString()
}

function readGuestCartFromStorage() {
  const raw = localStorage.getItem(GUEST_CART_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (parsed && parsed.expiresAt) {
      if (new Date(parsed.expiresAt) < new Date()) {
        localStorage.removeItem(GUEST_CART_KEY)
        return null
      }
      return parsed.data
    }
    // Back-compat: if it was saved without wrapper
    return parsed
  } catch {
    return null
  }
}

function writeGuestCartToStorage(cart) {
  if (GUEST_CART_TTL_MINUTES) {
    localStorage.setItem(
      GUEST_CART_KEY,
      JSON.stringify({ data: cart, expiresAt: nowPlusMinutes(GUEST_CART_TTL_MINUTES) }),
    )
  } else {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart))
  }
}

export function provideCart(isAuthenticatedRef = ref(false)) {
  // Unified cart shape (mirrors API CartResource)
  const state = reactive({
    cart: {
      id: null,
      items: [], // each: { id, cart_id, product_id, quantity, product: {...} }
    },
    loading: false,
  })

  const applyCart = (cartObj) => {
    state.cart.id = cartObj?.id ?? null
    state.cart.items.splice(0, state.cart.items.length, ...(cartObj?.items ?? []))
  }

  const emptyCart = () => ({
    id: null,
    items: [],
  })

  // Load cart (API when authed; localStorage when guest)
  const loadCart = async () => {
    state.loading = true
    try {
      if (isAuthenticatedRef.value) {
        const { data } = await api.get('/api/cart')
        // API might return { cart: null } or { cart: { ... } }
        const incoming = data?.cart || emptyCart()
        applyCart(incoming)
      } else {
        const stored = readGuestCartFromStorage()
        applyCart(stored || emptyCart())
      }
    } catch (e) {
      console.error('Error loading cart', e)
      // Keep cart usable even on error
      if (!isAuthenticatedRef.value) {
        const stored = readGuestCartFromStorage()
        applyCart(stored || emptyCart())
      }
    } finally {
      state.loading = false
    }
  }

  onMounted(loadCart)

  // Persist guest cart automatically
  watch(
    () => state.cart,
    (cart) => {
      if (!isAuthenticatedRef.value) {
        writeGuestCartToStorage(cart)
      }
    },
    { deep: true },
  )

  // --- Merge helper: POST guest cart to /api/cart/merge right after login ---
  const mergeGuestIntoUser = async () => {
  const guest = readGuestCartFromStorage()
  const guestItems = Array.isArray(guest) ? guest : guest?.items
  if (!guestItems || guestItems.length === 0) return

  const payloadItems = guestItems
    .map((it) => {
      if (it?.product?.id) {
        return { product_id: it.product.id, quantity: it.quantity || 1 }
      }
      if (it?.product_id) {
        return { product_id: it.product_id, quantity: it.quantity || 1 }
      }
      return null
    })
    .filter(Boolean)

  if (payloadItems.length === 0) return

  try {
    await api.post('/api/cart/merge', {
      cart: {
        items: payloadItems,   // <-- matches backend expectation
      },
    })
    localStorage.removeItem(GUEST_CART_KEY)
    await loadCart()
  } catch (e) {
    console.error('Cart merge failed', e)
  }
}


  // Auto-merge when auth flips from guest -> user
  watch(
    () => isAuthenticatedRef.value,
    async (now, prev) => {
      if (!prev && now) {
        await mergeGuestIntoUser()
      } else if (!now) {
        // returning to guest mode: reload guest cart
        await loadCart()
      }
    },
  )

  // Helpers
  const findGuestItemByProductId = (pid) => state.cart.items.find((it) => it.product_id === pid)

  const addItem = async (product, quantity = 1) => {
    if (quantity <= 0) return

    if (isAuthenticatedRef.value) {
      try {
        await api.post('/api/cart/add', {
          product_id: product.id,
          quantity,
        })
        await loadCart()
      } catch (e) {
        console.error('Error adding item to backend cart', e)
      }
      return
    }

    // Guest cart: store full product details to match DB shape
    const existing = findGuestItemByProductId(product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      state.cart.items.push({
        id: `local_${Date.now()}`, // local cart-item id (UI uses this like DB id)
        cart_id: null,
        product_id: product.id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          slug: product.slug,
          display_image_url: product.display_image_url,
          product_category_slug: product.product_category_slug ?? null,
        },
      })
    }
  }

  // Remove by cart-item id (matches DB semantics)
  const removeItem = async (cartItemId) => {
    if (isAuthenticatedRef.value) {
      try {
        await api.delete(`/api/cart/remove/${cartItemId}`)
        await loadCart()
      } catch (e) {
        console.error('Error removing item from backend cart', e)
      }
      return
    }

    const idx = state.cart.items.findIndex((it) => it.id === cartItemId)
    if (idx !== -1) {
      state.cart.items.splice(idx, 1)
    }
  }

  // Update quantity by cart-item id
  const updateQuantity = async (cartItemId, nextQuantity) => {
    if (nextQuantity <= 0) {
      return removeItem(cartItemId)
    }

    if (isAuthenticatedRef.value) {
      try {
        // Prefer "set" to avoid guessing increase/decrease
        await api.put(`/api/cart/update/${cartItemId}`, {
          action: 'set',
          quantity: nextQuantity,
        })
        await loadCart()
      } catch (e) {
        console.error('Error updating backend cart quantity', e)
      }
      return
    }

    const item = state.cart.items.find((it) => it.id === cartItemId)
    if (item) {
      item.quantity = nextQuantity
      item.updated_at = new Date().toISOString()
    }
  }

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return

    if (isAuthenticatedRef.value) {
      try {
        await api.delete('/api/cart/clear')
        applyCart(emptyCart())
      } catch (e) {
        console.error('Error clearing backend cart', e)
      }
      return
    }

    applyCart(emptyCart())
    localStorage.removeItem(GUEST_CART_KEY)
  }

  const removeGuestCartFromStorage = async () => {
    applyCart(emptyCart())
    localStorage.removeItem(GUEST_CART_KEY)
  }

  // Computed
  const items = computed(() => state.cart.items)
  const cart = computed(() => state.cart)
  const loading = computed(() => state.loading)

  const itemCount = computed(() =>
    state.cart.items.reduce((sum, it) => sum + (it.quantity || 0), 0),
  )

  const subtotal = computed(() =>
    state.cart.items.reduce((sum, it) => {
      const price =
        typeof it.product?.price === 'string'
          ? parseFloat(it.product.price)
          : it.product?.price || 0
      return sum + price * (it.quantity || 0)
    }, 0),
  )

  // If you apply discounts on the product object, adapt here
  const totalDiscount = computed(() => 0)
  const total = computed(() => subtotal.value - totalDiscount.value)

  // Public API
  const cartApi = {
    // shape-compatible getter (kept for backwards compatibility)
    get items() {
      return state.cart.items
    },
    cart: computed(() => state.cart),
    loading,
    loadCart,
    addItem,
    removeItem, // expects cart-item id
    updateQuantity, // expects cart-item id + quantity
    clearCart,
    itemCount,
    subtotal,
    totalDiscount,
    total,
    mergeGuestIntoUser,
    removeGuestCartFromStorage,
    readGuestCartFromStorage,
  }

  provide(CartSymbol, cartApi)
  return cartApi
}

export function useCart() {
  const cart = inject(CartSymbol)
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return cart
}
