<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="My Wishlist" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div
        v-if="wishlistProducts.length === 0"
        class="!bg-white !rounded-lg !shadow-sm !p-6 !text-center"
      >
        <div class="!flex !justify-center !mb-4">
          <HeartIcon class="!w-16 !h-16 !text-gray-300" />
        </div>
        <h2 class="!text-xl !font-bold !mb-2">Your wishlist is empty</h2>
        <p class="!text-gray-600 !mb-6">
          Save items you like by clicking the heart icon on products
        </p>
        <RouterLink
          to="/"
          class="!inline-block !bg-primary-500 !text-white !px-6 !py-3 !rounded-md !font-medium hover:!bg-primary-600 !transition-colors"
        >
          Explore Products
        </RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in wishlistProducts"
          :key="product.id"
          class="!bg-white !rounded-lg !shadow-sm !overflow-hidden animate-fadeIn"
        >
          <div class="!relative">
            <RouterLink :to="`/product/${product.id}`">
              <img :src="product.image" :alt="product.title" class="!w-full  !h-48 !object-cover" />
            </RouterLink>
            <button
              @click="removeFromWishlist(product.id)"
              class="!absolute !top-2 !right-2 !bg-white !rounded-full !p-2 !shadow-md"
            >
              <HeartIcon class="!w-5 !h-5 !text-primary-500 !fill-primary-500" />
            </button>
          </div>
          <div class="!p-4">
            <RouterLink :to="`/product/${product.id}`" class="!block">
              <h3 class="!font-medium !text-lg !mb-1 line-clamp-2">{{ product.title }}</h3>
              <div class="!text-primary-500 !font-bold !mb-2">
                ₦{{ product.price.toLocaleString() }}
              </div>
            </RouterLink>
            <div class="!flex !space-x-2 !mt-4">
              <button
                @click="addToCart(product.id)"
                class="!flex-1 !bg-primary-500 !text-white !py-2 !rounded-md !font-medium hover:!bg-primary-600 !transition-colors !flex !items-center !justify-center"
              >
                <ShoppingCartIcon class="!w-4 !h-4 !mr-2" />
                Add to Cart
              </button>
              <button
                @click="removeFromWishlist(product.id)"
                class="!p-2 !border !rounded-md hover:!bg-gray-50"
              >
                <TrashIcon class="!w-5 !h-5 !text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { HeartIcon, TrashIcon, ShoppingCartIcon } from 'lucide-vue-next'

import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'

// mock products, or import from utils
import { products } from '../../components/utils/homepagev3utils/data'

// Simulate CartProvider logic
import { useCart } from '../../components/homepagev3/CartProvider'

// Wishlist from localStorage
const wishlistItems = ref([])

onMounted(() => {
  const saved = localStorage.getItem('wishlist')
  wishlistItems.value = saved ? JSON.parse(saved) : []
})

watch(
  wishlistItems,
  (newList) => {
    localStorage.setItem('wishlist', JSON.stringify(newList))
  },
  { deep: true },
)

// Cart logic
const { addItem } = useCart()

const removeFromWishlist = (id) => {
  wishlistItems.value = wishlistItems.value.filter((item) => item !== id)
}

const addToCart = (id) => {
  const product = products.find((p) => p.id === id)
  if (product) {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      discount: product.discount,
    })

    // show notification
    const notification = document.createElement('div')
    notification.className =
      'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md z-50'
    notification.textContent = 'Added to cart'
    document.body.appendChild(notification)
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 2000)
  }
}

// Get wishlist products
const wishlistProducts = ref([])

watch(
  wishlistItems,
  () => {
    wishlistProducts.value = products.filter((p) => wishlistItems.value.includes(p.id))
  },
  { immediate: true },
)
</script>

<style scoped>
/* Use Tailwind with `!` prefix instead of overriding in CSS */
</style>
