<template>
  <nav
    class="!fixed !bottom-0 !left-0 !right-0 !flex !items-center !justify-around !bg-dark-900 !border-t !border-dark-700 md:!hidden !z-40"
  >
    <router-link to="/" class="!flex !flex-col !items-center !py-2">
      <HomeIcon :class="iconClass('/')" />
      <span :class="textClass('/')">Home</span>
    </router-link>

    <router-link to="/categories" class="!flex !flex-col !items-center !py-2">
      <BookmarkIcon :class="iconClass('/categories', true)" />
      <span :class="textClass('/categories', true)">Browse</span>
    </router-link>

    <router-link to="/login" class="!flex !flex-col !items-center !py-2">
      <div class="!bg-primary-500 !rounded-full !p-3 !-mt-5 !border-4 !border-dark-900">
        <PlusCircleIcon class="!w-6 !h-6 !text-white" />
      </div>
      <span class="!text-xs !text-gray-300 !mt-1">Sell</span>
    </router-link>

    <router-link to="/wishlist" class="!flex !flex-col !items-center !py-2 !relative">
      <HeartIcon :class="iconClass('/wishlist')" />
      <span
        v-if="wishlistCount > 0"
        class="!absolute !top-0 !right-0 !bg-primary-500 !text-white !text-xs !rounded-full !w-4 !h-4 !flex !items-center !justify-center !-mt-1 !-mr-1 !font-bold"
      >
        {{ wishlistCount > 9 ? '9+' : wishlistCount }}
      </span>
      <span :class="textClass('/wishlist')">Wishlist</span>
    </router-link>

    <router-link to="/cart" class="!flex !flex-col !items-center !py-2 !relative">
      <ShoppingCartIcon :class="iconClass('/cart', false, true)" />
      <span
        v-if="itemCount > 0"
        class="!absolute !top-0 !right-0 !bg-primary-500 !text-white !text-xs !rounded-full !w-4 !h-4 !flex !items-center !justify-center !-mt-1 !-mr-1 !font-bold"
      >
        {{ itemCount > 9 ? '9+' : itemCount }}
      </span>
      <span :class="textClass('/cart', false, true)">Cart</span>
    </router-link>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  BookmarkIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  HeartIcon,
} from 'lucide-vue-next'

const route = useRoute()
const itemCount = ref(0) // Replace with actual cart logic
const wishlistCount = ref(0)

onMounted(() => {
  const saved = localStorage.getItem('wishlist')
  wishlistCount.value = saved ? JSON.parse(saved).length : 0
})

const isActive = (path, include = false) => {
  return include ? route.path.includes(path) : route.path === path
}

const iconClass = (path, include = false) => {
  return `!w-6 !h-6 ${isActive(path, include) ? '!text-primary-500' : '!text-gray-300'}`
}

const textClass = (path, include = false) => {
  return `!text-xs ${isActive(path, include) ? '!text-primary-500' : '!text-gray-300'}`
}
</script>

<style scoped>
/* All Tailwind classes prefixed with ! will override Bootstrap styles */
</style>
