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

        
          <div class="header-right flex-align">
            <ul class="header-top__right style-two style-three flex-align flex-wrap">
              <li
                class="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white"
              >
                <a
                  href="javascript:void(0)"
                  class="selected-text text-neutral-500 fw-semibold text-sm py-8"
                >
                  Eng
                </a>
                <ul
                  class="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8"
                >
                  <li v-for="lang in languages" :key="lang.name">
                    <a
                      href="javascript:void(0)"
                      class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <img
                        :src="lang.flag"
                        :alt="lang.name"
                        class="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      {{ lang.name }}
                    </a>
                  </li>
                </ul>
              </li>
              <li class="d-sm-flex d-none">
                <a
                  href="javascript:void(0)"
                  class="selected-text text-neutral-500 fw-semibold text-sm py-8 hover-text-heading"
                >
                  Order Tracking
                </a>
              </li>
            </ul>
            <button
              type="button"
              class="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
              @click="toggleMobileMenu"
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

<script>
import { ref } from 'vue'

export default {
  name: 'HeaderComponent',
  setup() {
    const searchQuery = ref('')
    const mobileMenuOpen = ref(false)

    function toggleMobileMenu() {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    function closeSearch() {
      searchQuery.value = ''
    }

    const languages = [
      {
        name: 'English',
        flag: new URL('@/assets/images/thumbs/flag1.png', import.meta.url).href,
      },
      {
        name: 'Japan',
        flag: new URL('@/assets/images/thumbs/flag2.png', import.meta.url).href,
      },
      {
        name: 'French',
        flag: new URL('@/assets/images/thumbs/flag3.png', import.meta.url).href,
      },
      {
        name: 'Germany',
        flag: new URL('@/assets/images/thumbs/flag4.png', import.meta.url).href,
      },
      {
        name: 'Bangladesh',
        flag: new URL('@/assets/images/thumbs/flag6.png', import.meta.url).href,
      },
      {
        name: 'South Korea',
        flag: new URL('@/assets/images/thumbs/flag5.png', import.meta.url).href,
      },
    ]

    return {
      searchQuery,
      mobileMenuOpen,
      toggleMobileMenu,
      closeSearch,
      languages,
    }
  },
}
</script>

<style scoped>
.search-box {
  z-index: 1050;
}
</style>
