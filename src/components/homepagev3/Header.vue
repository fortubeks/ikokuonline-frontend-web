<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="!sticky !top-0 !z-50">
    <!-- Mobile Header -->
    <div class="md:hidden">
      <div
        v-if="showBackButton || title"
        class="!flex !items-center text-center !px-4 !py-3 !bg-dark-900 !text-white !border-b !border-dark-700"
      >
        <a v-if="showBackButton" href="/" class="!mr-2">
          <ChevronLeftIcon class="!w-6 !h-6 !text-white" />
        </a>
        <h1 v-if="title" class="!flex-1 h-full !text-base text-white !font-medium !truncate">
          {{ title }}
        </h1>
        <button v-if="showBookmark" class="!ml-2">
          <BookmarkIcon
            :class="bookmarked ? '!fill-primary-500 !text-primary-500' : '!text-gray-400'"
          />
        </button>
      </div>
      <div class="!flex !items-center !px-4 !py-2 !bg-primary-500 !relative">
        <div class="!flex-1 !relative">
          <div class="!flex !items-center !px-3 !py-2 !bg-white !rounded-md">
            <SearchIcon v-if="!showBackButton" class="!w-5 !h-5 !mr-2 !text-gray-400" />
            <input
              ref="searchInputRef"
              type="text"
              :placeholder="searchPlaceholder"
              class="!flex-1 !text-sm focus:!outline-none"
              v-model="searchQuery"
              @focus="handleSearchInputFocus"
            />
            <button v-if="searchQuery" @click="clearSearch" class="!ml-2">
              <XIcon class="!w-4 !h-4 !text-gray-400" />
            </button>
          </div>
          <SearchResults
            :query="searchQuery"
            :isVisible="showSearchResults"
            @close="() => (showSearchResults = false)"
          />
        </div>
        <a href="/cart" class="!ml-3 !relative">
          <ShoppingCartIcon class="!w-6 !h-6 !text-white" />
          <span
            v-if="itemCount > 0"
            class="!absolute !-top-1 !-right-1 !bg-white !text-primary-500 !text-xs !rounded-full !w-4 !h-4 !flex !items-center !justify-center !font-bold"
          >
            {{ itemCount > 9 ? '9+' : itemCount }}
          </span>
        </a>
        <button class="!ml-3" @click="showMobileMenu = !showMobileMenu">
          <component :is="showMobileMenu ? XIcon : MenuIcon" class="!w-6 !h-6 !text-white" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="!fixed !inset-0 !bg-white !z-50 !pt-16 animate-slideInDown">
        <div
          class="!absolute !top-0 !left-0 !right-0 !px-4 !py-3 !bg-primary-500 !flex !items-center"
        >
          <div class="!text-white !font-bold !flex-1">
            <img src="/ikokuonline.svg" alt="IkokuOnline" class="" />
          </div>
          <button @click="showMobileMenu = false">
            <XIcon class="!w-6 !h-6 !text-white" />
          </button>
        </div>
        <div class="!p-4 !space-y-4">
          <template v-for="link in mobileLinks" :key="link.href">
            <a
              :href="link.href"
              class="!flex !items-center !p-3 hover:!bg-gray-100 !rounded-lg"
              @click="showMobileMenu = false"
            >
              <component v-if="link.icon" :is="link.icon" class="!w-6 !h-6 !mr-3 !text-gray-600" />
              <span class="!font-medium text-black">{{ link.label }}</span>
              <span
                v-if="link.badge"
                class="!ml-auto !bg-primary-500 !text-white !text-xs !rounded-full !px-2 !py-1"
              >
                {{ link.badge > 9 ? '9+' : link.badge }}
              </span>
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Desktop Header -->
    <div class="hidden md:block">
      <div class="!bg-dark-900 !text-white">
        <div class="!container !mx-auto !px-4 !py-3 !flex !items-center !justify-between">
          <a href="/" class="!flex !items-center">
            <img src="/ikokuonline.svg" alt="IkokuOnline" class="" />
          </a>
          <nav class="!flex !items-center text-white !space-x-8">
            <a href="/" class="hover:!text-primary-500 text-white !transition">Home</a>
            <a href="/category/batteries" class="hover:!text-primary-500 text-white !transition"
              >Batteries</a
            >
            <a href="/category/accessories" class="hover:!text-primary-500 !text-white !transition"
              >Accessories</a
            >
            <a href="/category/parts" class="hover:!text-primary-500 !text-white !transition"
              >Replacement parts</a
            >
            <a href="/contact" class="hover:!text-primary-500 !text-white !transition"
              >Contact Us</a
            >
          </nav>
          <a
            href="/become-seller"
            class="!bg-primary-500 !text-white !px-4 !py-2 !rounded hover:!bg-primary-600 !transition"
            >Become A Seller</a
          >
        </div>
      </div>
      <div class="!bg-white !shadow-sm">
        <div class="!container !mx-auto !px-4 !py-3 !flex !items-center">
          <div class="!relative !mr-4">
            <button
              class="category-button !flex !items-center !px-4 !py-2 !border !rounded-l-md !bg-gray-50 !text-gray-700 !min-w-[180px]"
              @click="showCategoryDropdown = !showCategoryDropdown"
            >
              <span class="!mr-2">{{ selectedCategory }}</span>
              <ChevronDownIcon class="!w-4 !h-4" />
            </button>
            <div
              v-if="showCategoryDropdown"
              ref="categoryDropdownRef"
              class="!absolute !top-full !left-0 !mt-1 !w-full !bg-white !border !rounded-md !shadow-lg !z-50 !max-h-60 !overflow-y-auto"
            >
              <button
                class="!block !w-full !text-left !px-4 !py-2 hover:!bg-gray-100"
                @click="handleCategorySelect('All categories')"
              >
                All categories
              </button>
              <button
                v-for="cat in categories"
                :key="cat.id"
                class="!block !w-full !text-left !px-4 !py-2 hover:!bg-gray-100"
                @click="handleCategorySelect(cat.name)"
              >
                {{ cat.name }}
              </button>
            </div>
          </div>
          <form @submit.prevent="handleSearch" class="!flex-1 !flex !relative">
            <input
              ref="searchInputRef"
              type="text"
              placeholder="Search for products, categories or brands..."
              class="!flex-1 !px-4 !py-2 !border-y !border-l !rounded-l-md focus:!outline-none focus:!ring-2 focus:!ring-primary-500"
              v-model="searchQuery"
              @focus="handleSearchInputFocus"
            />
            <button
              type="submit"
              class="!bg-primary-500 !text-white !px-4 !py-2 !rounded-r-md hover:!bg-primary-600 !transition"
            >
              <SearchIcon class="!w-5 !h-5" />
            </button>
            <div v-if="showSearchResults" class="search-results">
              <SearchResults
                :query="searchQuery"
                :isVisible="showSearchResults"
                @close="() => (showSearchResults = false)"
              />
            </div>
          </form>
          <div class="!ml-6 !flex !items-center !space-x-6">
            <a href="/login" class="!flex !items-center !text-gray-700 hover:!text-primary-500">
              <UserIcon class="!w-5 !h-5 !mr-1" />
              <span>Profile</span>
            </a>
            <a
              href="/wishlist"
              class="!flex !items-center !text-gray-700 hover:!text-primary-500 !relative"
            >
              <HeartIcon class="!w-5 !h-5 !mr-1" />
              <span>Wishlist</span>
              <span
                v-if="wishlistCount > 0"
                class="!absolute !-top-2 !-right-2 !bg-primary-500 !text-white !text-xs !rounded-full !w-5 !h-5 !flex !items-center !justify-center"
              >
                {{ wishlistCount > 9 ? '9+' : wishlistCount }}
              </span>
            </a>
            <a
              href="/cart"
              class="!flex !items-center !text-gray-700 hover:!text-primary-500 !relative"
            >
              <ShoppingCartIcon class="!w-5 !h-5 !mr-1" />
              <span>Cart</span>
              <span
                v-if="itemCount > 0"
                class="!absolute !-top-2 !-right-2 !bg-primary-500 !text-white !text-xs !rounded-full !w-5 !h-5 !flex !items-center !justify-center"
              >
                {{ itemCount > 9 ? '9+' : itemCount }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  ChevronLeftIcon,
  SearchIcon,
  BookmarkIcon,
  ChevronDownIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  ShoppingBag,
} from 'lucide-vue-next'

import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import SearchResults from '../../components/homepagev3/SearchResults.vue'
import { useCart } from '../../components/homepagev3/CartProvider'
import { categories } from '../../components/utils/homepagev3utils/data'

const props = defineProps({
  showBackButton: Boolean,
  title: String,
  showBookmark: Boolean,
  bookmarked: Boolean,
  searchPlaceholder: { type: String, default: 'Search in Car Parts' },
  onSearch: { type: Function, default: () => {} },
})

const router = useRouter()
const { itemCount } = useCart()

const searchQuery = ref('')
const showSearchResults = ref(false)
const showCategoryDropdown = ref(false)
const selectedCategory = ref('All categories')
const showMobileMenu = ref(false)
const wishlistCount = ref(0)

const searchInputRef = ref(null)
const categoryDropdownRef = ref(null)

onMounted(() => {
  const updateWishlist = () => {
    const saved = localStorage.getItem('wishlist')
    wishlistCount.value = saved ? JSON.parse(saved).length : 0
  }
  updateWishlist()
  window.addEventListener('storage', updateWishlist)

  const clickOutside = (e) => {
    if (
      searchInputRef.value &&
      !searchInputRef.value.contains(e.target) &&
      !e.target.closest('.search-results')
    ) {
      showSearchResults.value = false
    }
    if (
      categoryDropdownRef.value &&
      !categoryDropdownRef.value.contains(e.target) &&
      !e.target.closest('.category-button')
    ) {
      showCategoryDropdown.value = false
    }
  }
  document.addEventListener('mousedown', clickOutside)
  onBeforeUnmount(() => {
    window.removeEventListener('storage', updateWishlist)
    document.removeEventListener('mousedown', clickOutside)
  })
})

const clearSearch = () => {
  searchQuery.value = ''
  showSearchResults.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    props.onSearch(searchQuery.value)
    showSearchResults.value = false
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

const handleSearchInputFocus = () => {
  if (searchQuery.value.trim().length > 0) {
    showSearchResults.value = true
  }
}

const handleCategorySelect = (cat) => {
  selectedCategory.value = cat
  showCategoryDropdown.value = false
  const url =
    cat === 'All categories' ? '/categories' : `/category/${cat.toLowerCase().replace(/ /g, '-')}`
  router.push(url)
}

const mobileLinks = [
  { href: '/login', label: 'My Account', icon: UserIcon },
  { href: '/wishlist', label: 'Wishlist', icon: HeartIcon, badge: wishlistCount },
  { href: '/cart', label: 'Cart', icon: ShoppingCartIcon, badge: itemCount },
  { href: '/account/orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/featured', label: 'Featured Deals' },
  { href: '/category/batteries', label: 'Batteries' },
  { href: '/category/accessories', label: 'Accessories' },
  { href: '/category/parts', label: 'Replacement Parts' },
  { href: '/sell', label: 'Sell' },
  { href: '/become-seller', label: 'Become A Seller' },
  { href: '/contact', label: 'Contact Us' },
]
</script>

<style scoped>
.search-results {
  @apply !absolute !top-full !left-0 !right-0;
  z-index: 50;
}
.animate-slideInDown {
  animation: slideInDown 0.3s ease-out;
}
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
