<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <header class="header bg-white border-bottom-0 box-shadow-3xl py-[40px] z-2">
      <div class="container container-lg">
        <nav class="header-inner d-flex justify-content-between gap-8">
          <div class="flex-align menu-category-wrapper position-relative">
            <div>
              <button
                type="button"
                class="category-button d-flex align-items-center gap-12 text-white bg-success-600 px-20 py-16 rounded-6 hover-bg-success-700 transition-2"
              >
                <span class="text-xl line-height-1"><i class="ph ph-squares-four"></i></span>
                <span>Browse Categories</span>
                <span class="line-height-1 icon transition-2">
                  <i class="ph-bold ph-caret-down"></i>
                </span>
              </button>

              <div
                class="category-dropdown border border-success-200 shadow bg-white p-16 rounded-16 w-100 max-w-472 position-absolute inset-block-start-100 inset-inline-start-0 z-99 transition-2"
              >
                <div class="d-grid grid-cols-3-repeat gap-4 max-h-350 overflow-y-auto">
                  <a
                    v-for="(category, index) in categories"
                    :key="index"
                    href="shop.html"
                    class="py-16 px-8 rounded-8 hover-bg-main-50 d-flex flex-column align-items-center text-center border border-white hover-border-main-100"
                  >
                    <img :src="category.img" :alt="category.title" class="w-40" />
                    <span class="fw-semibold text-heading mt-16 text-sm">{{ category.title }}</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="header-menu d-lg-block d-none">
              <ul class="nav-menu flex-align">
                <li
                  v-for="(nav, index) in navItems"
                  :key="index"
                  class="on-hover-item nav-menu__item"
                  :class="{ 'has-submenu': nav.children, activePage: nav.active }"
                >
                  <span v-if="nav.badge" :class="['badge-notification', nav.badge.class]">
                    {{ nav.badge.text }}
                  </span>
                  <a v-if="!nav.children" :href="nav.href" class="nav-menu__link text-heading-two">
                    {{ nav.label }}
                  </a>
                  <a v-else href="javascript:void(0)" class="nav-menu__link text-heading-two">
                    {{ nav.label }}
                  </a>
                  <ul
                    v-if="nav.children"
                    class="on-hover-dropdown common-dropdown nav-submenu scroll-sm"
                  >
                    <li
                      v-for="(child, childIndex) in nav.children"
                      :key="childIndex"
                      class="common-dropdown__item nav-submenu__item"
                    >
                      <a
                        :href="child.href"
                        class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"
                      >
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div class="header-right flex-align gap-20">
            <a href="tel:+(2)871382023" class="d-sm-flex align-items-center gap-16 d-none">
              <span class="d-flex text-32">
                <img src="../../assets/images/icon/mobile.png" alt="Mobile Icon" />
              </span>
              <span class="">
                <span class="d-block text-heading fw-medium">Need any Help! call Us</span>
                <span class="d-block fw-bold text-main-600 hover-text-decoration-underline"
                  >+(2) 871 382 023</span
                >
              </span>
            </a>
            <button
              @click="isMobileMenuOpen = true"
              type="button"
              class="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
            >
              <i class="ph ph-list">menu</i>
            </button>
          </div>
        </nav>
      </div>
    </header>

    <transition name="slide">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu scroll-sm d-lg-none !d-block fixed inset-0 z-50 bg-white"
        ref="mobileMenuRef"
      >
        <button type="button" class="close-button" @click="isMobileMenuOpen = false">
          <i class="ph ph-x">aaaa</i>
        </button>
        <div class="mobile-menu__inner">
          <div class="mobile-menu__menu">
            <ul class="nav-menu flex-align nav-menu--mobile">
              <li
                v-for="(nav, index) in navItems"
                :key="index"
                class="on-hover-item nav-menu__item"
                :class="{ 'has-submenu': nav.children, activePage: nav.active }"
              >
                <span v-if="nav.badge" :class="['badge-notification', nav.badge.class]">
                  {{ nav.badge.text }}
                </span>
                <a v-if="!nav.children" :href="nav.href" class="nav-menu__link text-heading-two">
                  {{ nav.label }}
                </a>
                <div v-else>
                  <a href="javascript:void(0)" class="nav-menu__link text-heading-two">
                    {{ nav.label }}
                  </a>
                  <ul class="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                    <li
                      v-for="(child, childIndex) in nav.children"
                      :key="childIndex"
                      class="common-dropdown__item nav-submenu__item"
                    >
                      <a
                        :href="child.href"
                        class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"
                      >
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import '@/assets/images/logo/favicon.png'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/select2.min.css'
import '@/assets/css/slick.css'
import '@/assets/css/jquery-ui.css'
import '@/assets/css/animate.css'

import { onMounted, onBeforeUnmount } from 'vue'

const mobileMenuRef = ref(null)

function handleClickOutside(event) {
  if (mobileMenuRef.value && !mobileMenuRef.value.contains(event.target)) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

import '@/assets/css/aos.css'
import '@/assets/css/main.css'
import 'jquery'
import '@/assets/marketpro/js/jquery-3.7.1.min.js'
// import '@/assets/marketpro/js/boostrap.bundle.min.js';
import '@/assets/marketpro/js/phosphor-icon.js'
import '@/assets/marketpro/js/select2.min.js'
import '@/assets/marketpro/js/slick.min.js'
import '@/assets/marketpro/js/count-down.js'
import '@/assets/marketpro/js/jquery-ui.js'
// import '@/assets/marketpro/js/wow.min.js';
// import '@/assets/marketpro/js/aos.js';
import '@/assets/marketpro/js/marque.min.js'
import '@/assets/marketpro/js/vanilla-tilt.min.js'
import '@/assets/marketpro/js/counter.min.js'
import '@/assets/marketpro/js/main.js'

const isMobileMenuOpen = ref(false)

const categories = [
  {
    title: 'Vegetables',
    img: new URL('@/assets/images/icon/category-1.png', import.meta.url).href,
  },
  {
    title: 'Milk & Cake',
    img: new URL('@/assets/images/icon/category-2.png', import.meta.url).href,
  },
  { title: 'Grocery', img: new URL('@/assets/images/icon/category-3.png', import.meta.url).href },
  { title: 'Beauty', img: new URL('@/assets/images/icon/category-4.png', import.meta.url).href },
  {
    title: 'Wines & Drinks',
    img: new URL('@/assets/images/icon/category-5.png', import.meta.url).href,
  },
  { title: 'Snacks', img: new URL('@/assets/images/icon/category-6.png', import.meta.url).href },
  { title: 'Juice', img: new URL('@/assets/images/icon/category-7.png', import.meta.url).href },
  { title: 'Fruits', img: new URL('@/assets/images/icon/category-8.png', import.meta.url).href },
  {
    title: 'Tea & Coffee',
    img: new URL('@/assets/images/icon/category-9.png', import.meta.url).href,
  },
]

const navItems = [
  {
    label: 'Home',
    active: true,
    children: [
      { label: 'Home Grocery', href: 'index.html' },
      { label: 'Home Electronics', href: 'index-two.html' },
      { label: 'Home Fashion', href: 'index-three.html' },
    ],
  },
  {
    label: 'Shop',
    children: [
      { label: 'Shop', href: 'shop.html' },
      { label: 'Shop Details', href: 'product-details.html' },
      { label: 'Shop Details Two', href: 'product-details-two.html' },
    ],
  },
  {
    label: 'Pages',
    badge: { text: 'New', class: 'bg-warning-600 text-white text-sm py-2 px-8 rounded-4' },
    children: [
      { label: 'Cart', href: 'cart.html' },
      { label: 'Wishlist', href: 'wishlist.html' },
      { label: 'Checkout', href: 'checkout.html' },
      { label: 'Become Seller', href: 'become-seller.html' },
      { label: 'Account', href: 'account.html' },
    ],
  },
  {
    label: 'Vendors',
    badge: { text: 'New', class: 'bg-tertiary-600 text-white text-sm py-2 px-8 rounded-4' },
    children: [
      { label: 'Vendors', href: 'vendor.html' },
      { label: 'Vendor Details', href: 'vendor-details.html' },
      { label: 'Vendors Two', href: 'vendor-two.html' },
      { label: 'Vendors Two Details', href: 'vendor-two-details.html' },
    ],
  },
  {
    label: 'Blog',
    children: [
      { label: 'Blog', href: 'blog.html' },
      { label: 'Blog Details', href: 'blog-details.html' },
    ],
  },
  {
    label: 'Contact Us',
    href: 'contact.html',
  },
]
</script>
