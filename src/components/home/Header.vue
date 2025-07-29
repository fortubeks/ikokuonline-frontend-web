<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <header class="header !bg-[#000000] border-bottom-0 box-shadow-3xl py-[25px] z-2">
      <div class="container container-lg">
        <nav class="header-inner d-flex justify-content-between gap-8">
          <div class="flex-align !gap-[168px] menu-category-wrapper position-relative">
            <button @click="goToHome">
              <img :src="ikokuonline" alt="logo" />
            </button>

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
                  <a
                    v-if="!nav.children"
                    :href="nav.href"
                    class="nav-menu__link text-white text-heading-two"
                  >
                    {{ nav.label }}
                  </a>
                  <a
                    v-else
                    href="javascript:void(0)"
                    class="nav-menu__link text-white text-heading-two"
                  >
                    {{ nav.label }}
                  </a>
                  <ul
                    v-if="nav.children"
                    class="on-hover-dropdown common-dropdown !text-white nav-submenu scroll-sm"
                  >
                    <li
                      v-for="(child, childIndex) in nav.children"
                      :key="childIndex"
                      class="common-dropdown__item !text-white nav-submenu__item"
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
            <div>
              <div class="lg:block hidden">
                <button
                  @click="goToLogin"
                  type="button"
                  class="category-button d-flex align-items-center gap-12 text-white bg-[#FD603E] px-[20px] py-16 rounded-6 hover-bg-success-700 transition-2"
                >
                  <span class="text-xl line-height-1"><i class="ph ph-squares-four"></i></span>
                  <span class="text-base font-inter">Become A Seller</span>
                </button>
              </div>
            </div>
            <button
              @click="isMobileMenuOpen = true"
              type="button"
              class="toggle-mobileMenu d-lg-none ms-3n text-white text-4xl d-flex"
            >
              <i class="ph ph-list"></i>
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
          <i class="ph ph-x"></i>
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

import { useRouter } from 'vue-router'

const router = useRouter()

import '@/assets/images/logo/favicon.png'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/select2.min.css'
import '@/assets/css/slick.css'
import '@/assets/css/jquery-ui.css'
import '@/assets/css/animate.css'
import ikokuonline from '@/assets/svgs/ikokuonline.svg'

import { onMounted, onBeforeUnmount } from 'vue'

const mobileMenuRef = ref(null)

function handleClickOutside(event) {
  if (mobileMenuRef.value && !mobileMenuRef.value.contains(event.target)) {
    isMobileMenuOpen.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
function goToHome() {
  router.push('/')
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

const navItems = [
  // {
  //   label: 'Home',
  //   active: true,
  //   children: [{ label: 'Home', href: '/' }],
  // },

  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Batteries',
    href: '/',
  },

  {
    label: 'Accessories',
    href: '/',
  },
  // {
  //   label: 'Shop',
  //   children: [
  //     { label: 'Shop', href: 'shop.html' },
  //     { label: 'Shop Details', href: 'product-details.html' },
  //     { label: 'Shop Details Two', href: 'product-details-two.html' },
  //   ],
  // },
  // {
  //   label: 'Pages',
  //   badge: { text: 'New', class: 'bg-warning-600 text-white text-sm py-2 px-8 rounded-4' },
  //   children: [
  //     { label: 'Cart', href: 'cart.html' },
  //     { label: 'Wishlist', href: 'wishlist.html' },
  //     { label: 'Checkout', href: 'checkout.html' },
  //     { label: 'Become Seller', href: 'become-seller.html' },
  //     { label: 'Account', href: 'account.html' },
  //   ],
  // },
  {
    label: 'Replacement parts',
    children: [
      { label: 'Tire', href: '/' },
      { label: 'Batteries', href: '/' },
      { label: 'Fluids', href: '/' },
      { label: 'Accessories', href: '/' },
    ],
  },
  // {
  //   label: 'Blog',
  //   children: [
  //     { label: 'Blog', href: 'blog.html' },
  //     { label: 'Blog Details', href: 'blog-details.html' },
  //   ],
  // },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]
</script>
