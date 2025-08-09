// CartProvider.js
import { reactive, computed, provide, inject, onMounted, watch } from 'vue'

const CartSymbol = Symbol('Cart')

export function provideCart() {
  const state = reactive({
    items: [],
  })

  onMounted(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        state.items.push(...JSON.parse(savedCart)) // ✅ mutate instead of replace
      } catch (e) {
        console.error('Error parsing cart data from localStorage', e)
      }
    }
  })

  watch(
    () => state.items,
    (items) => {
      localStorage.setItem('cart', JSON.stringify(items))
    },
    { deep: true }
  )

  const addItem = (item) => {
    const existingIndex = state.items.findIndex(i => i.id === item.id)
    if (existingIndex >= 0) {
      state.items[existingIndex].quantity += item.quantity
    } else {
      state.items.push(item)
    }
  }

  const removeItem = (id) => {
    const index = state.items.findIndex(item => item.id === id)
    if (index !== -1) {
      state.items.splice(index, 1) // ✅ mutate
    }
  }

  const updateQuantity = (id, quantity) => {
    const index = state.items.findIndex(item => item.id === id)
    if (index !== -1) {
      if (quantity <= 0) {
        state.items.splice(index, 1) // ✅ remove directly
      } else {
        state.items[index] = { ...state.items[index], quantity } // ✅ replace item in-place
      }
    }
  }

  const clearCart = () => {
    state.items.splice(0, state.items.length) // ✅ clear without replacing
  }

  const itemCount = computed(() =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  const subtotal = computed(() =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const totalDiscount = computed(() =>
    state.items.reduce((total, item) => {
      const itemDiscount = item.discount
        ? item.price * (item.discount / 100) * item.quantity
        : 0
      return total + itemDiscount
    }, 0)
  )

  const total = computed(() => subtotal.value - totalDiscount.value)

  const cart = {
    get items() {
      return state.items
    },
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    totalDiscount,
    total,
  }

  provide(CartSymbol, cart)
  return cart
}

export function useCart() {
  const cart = inject(CartSymbol)
  if (!cart) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return cart
}
