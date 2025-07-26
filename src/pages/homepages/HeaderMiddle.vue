<template>
  <header class="header-middle border-bottom border-gray-100">
    <div class="container container-lg">
      <nav class="header-inner flex-between gap-[32px]">
        <div class="logo">
          <a href="/" class="link">
            <img :src="logo.src" :alt="logo.alt" />
          </a>
        </div>

        <form
          class="flex-align flex-wrap form-location-wrapper max-w-840 w-100"
          @submit.prevent="onSearch"
        >
          <div class="search-category select-style-one d-flex text-heading-two text-sm w-100">
            <select
              v-model="selectedCategory"
              class="js-example-basic-single border border-neutral-40 border-end-0"
            >
              <option :value="null" disabled>All categories</option>
              <option v-for="(cat, i) in categories" :key="i" :value="cat">{{ cat }}</option>
            </select>
            <div class="search-form__wrapper position-relative border-half-start flex-grow-1">
              <input
                v-model="query"
                type="text"
                class="common-input border-neutral-40 py-18 ps-16 pe-76 rounded-0 rounded-end pe-44 placeholder-italic placeholder-text-sm border-start-0"
                placeholder="Search for products, categories or brands..."
              />
              <button
                type="submit"
                class="w-64 h-44 bg-main-600 hover-bg-main-800 rounded-4 flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-6"
              >
                <i class="ph ph-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </form>

        <div class="header-right flex-align flex-shrink-0">
          <div class="flex-align gap-20">
            <button
              @click="onSearchIcon"
              class="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
            >
              <span class="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                <i class="ph ph-magnifying-glass"></i>
              </span>
            </button>

            <HeaderItem v-for="item in headerItems" :key="item.label" :item="item" />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import logopics from '@/assets/images/logo/ikokuonline_logo.png'

const logo = {
  link: 'index.html',
  src: logopics,
  alt: 'Logo',
}

const categories = [
  'Grocery',
  'Breakfast & Dairy',
  'Vegetables',
  'Milks and Dairies',
  'Pet Foods & Toy',
  'Breads & Bakery',
  'Fresh Seafood',
  'Frozen Foods',
  'Noodles & Rice',
  'Ice Cream',
]

const selectedCategory = ref(null)
const query = ref('')

import profilePics from '@/assets/svgs/profilepics.svg'
import heartPics from '@/assets/svgs/heartpics.svg'
import cartPics from '@/assets/svgs/cartpics.svg'
import HeaderItem from './HeaderItem.vue'

const headerItems = [
  { label: 'Profile', icon: profilePics, link: '#' },
  { label: 'Wishlist', icon: heartPics, link: 'wishlist.html', count: 2 },
  { label: 'Cart', icon: cartPics, link: '/cart', count: 2 },
]

function onSearch() {
  console.log('Search:', selectedCategory.value, query.value)
}

function onSearchIcon() {
  console.log('Mobile search icon clicked')
}

onMounted(() => {
  if (window.$) {
    window.$('.js-example-basic-single').select2()
  }
})
</script>
