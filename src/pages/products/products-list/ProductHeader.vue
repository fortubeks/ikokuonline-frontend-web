<template>
  <div>
    <form @submit.prevent class="search-box">
      <button
        type="button"
        class="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
        @click="search = ''"
      >
        <i class="ph ph-x"></i>
      </button>
      <div class="container">
        <div class="position-relative">
          <input
            v-model="search"
            type="text"
            class="form-control py-16 px-24 text-xl rounded-pill pe-64"
            placeholder="Search for a product or brand"
          />
          <button
            type="submit"
            class="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
          >
            <i class="ph ph-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>

    <div class="mobile-menu scroll-sm d-lg-none d-block" v-if="showMobileMenu">
      <button type="button" class="close-button" @click="closeMobileMenu">
        <i class="ph ph-x"></i>
      </button>
      <div class="mobile-menu__inner">
        <a href="/" class="mobile-menu__logo">
          <img :src="LogoIcon" :alt="Logo" />
        </a>
        <div class="mobile-menu__menu">
          <slot name="mobile-menu" />
        </div>
      </div>
    </div>

    <header class="header-middle border-bottom border-neutral-40 py-4">
      <div class="container container-lg">
        <nav class="header-inner flex-between gap-8">
          <div class="logo">
            <a href="/" class="link">
              <img :src="LogoIcon" :alt="Logo" />
            </a>
          </div>

          <div class="header-menu d-lg-block d-none">
            <slot name="desktop-menu" />
          </div>

          <div class="header-right flex-align">
            <ul class="header-top__right style-two style-three flex-align flex-wrap">
              <li
                class="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white"
              >
                <a href="#" class="selected-text text-neutral-500 fw-semibold text-sm py-8">Eng</a>
                <ul
                  class="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8"
                >
                  <li v-for="lang in languages" :key="lang.name">
                    <a
                      href="#"
                      class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <img
                        :src="lang.flag"
                        alt=""
                        class="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      {{ lang.name }}
                    </a>
                  </li>
                </ul>
              </li>

              <li
                class="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white"
              >
                <a href="#" class="selected-text text-neutral-500 fw-semibold text-sm py-8">USD</a>
                <ul
                  class="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8"
                >
                  <li v-for="currency in currencies" :key="currency.name">
                    <a
                      href="#"
                      class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
                    >
                      <img
                        :src="currency.flag"
                        alt=""
                        class="w-16 h-12 rounded-4 border border-gray-100"
                      />
                      {{ currency.name }}
                    </a>
                  </li>
                </ul>
              </li>

              <li class="d-sm-flex d-none">
                <a
                  href="#"
                  class="selected-text text-neutral-500 fw-semibold text-sm py-8 hover-text-heading"
                  >Order Tracking</a
                >
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
  </div>
</template>

<script>
// import LogoIcon from '@/assets/images/logo/ikokuonline_logo.png'

export default {
  name: 'HeaderMobileSearch',
  data() {
    return {
      search: '',
      showMobileMenu: false,
      languages: [
        { name: 'English', flag: '@/assets/images/thumbs/flag1.png' },
        { name: 'Japan', flag: '@/assets/images/thumbs/flag2.png' },
        { name: 'French', flag: '@/assets/images/thumbs/flag3.png' },
        { name: 'Germany', flag: '@/assets/images/thumbs/flag4.png' },
        { name: 'Bangladesh', flag: '@/assets/images/thumbs/flag6.png' },
        { name: 'South Korea', flag: '@/assets/images/thumbs/flag5.png' },
      ],
      currencies: [
        { name: 'USD', flag: '@/assets/images/thumbs/flag1.png' },
        { name: 'Yen', flag: '@/assets/images/thumbs/flag2.png' },
        { name: 'Franc', flag: '@/assets/images/thumbs/flag3.png' },
        { name: 'EURO', flag: '@/assets/images/thumbs/flag4.png' },
        { name: 'BDT', flag: '@/assets/images/thumbs/flag6.png' },
        { name: 'WON', flag: '@/assets/images/thumbs/flag5.png' },
      ],
    }
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    closeMobileMenu() {
      this.showMobileMenu = false
    },
  },
}
</script>
