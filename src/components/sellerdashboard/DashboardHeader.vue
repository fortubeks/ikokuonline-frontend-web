<template>
  <div class="dashboard-nav bg-white flx-between gap-md-3 gap-2" :class="{ dark: isDarkMode }">
    <div class="dashboard-nav__left flx-align gap-md-3 gap-2">
      <button type="button" class="icon-btn bar-icon text-heading bg-gray-seven flx-center">
        <i class="las la-bars"></i>
      </button>
      <button type="button" class="icon-btn arrow-icon text-heading bg-gray-seven flx-center">
        <img src="@/assets/dp-market-dashboard/images/icons/angle-right.svg" alt="" />
      </button>
      <form action="#" class="search-input d-sm-block d-none">
        <span class="icon">
          <img
            src="@/assets/dp-market-dashboard/images/icons/search-dark.svg"
            alt=""
            class="white-version"
          />
          <img
            src="@/assets/dp-market-dashboard/images/icons/search-dark-white.svg"
            alt=""
            class="dark-version"
          />
        </span>
        <input
          type="text"
          class="common-input common-input--md common-input--bg pill w-100"
          placeholder="Search here..."
        />
      </form>
    </div>
    <div class="dashboard-nav__right">
      <div class="header-right flx-align">
        <div class="header-right__inner gap-sm-3 gap-2 flx-align d-flex">
          <div class="theme-switch-wrapper position-relative">
            <label class="theme-switch" for="checkbox">
              <input
                type="checkbox"
                class="d-none"
                id="checkbox"
                v-model="isDarkMode"
                @change="toggleDarkMode"
              />
              <span class="slider text-black header-right__button white-version">
                <img src="@/assets/dp-market-dashboard/images/icons/sun.svg" alt="" />
              </span>
              <span class="slider text-black header-right__button dark-version">
                <img src="@/assets/dp-market-dashboard/images/icons/moon.svg" alt="" />
              </span>
            </label>
          </div>

          <div class="user-profile" @click="toggleUserMenu">
            <button class="user-profile__button flex-align">
              <span class="user-profile__thumb">
                <img
                  src="@/assets/dp-market-dashboard/images/thumbs/user-profile.png"
                  class="cover-img"
                  alt=""
                />
              </span>
            </button>
            <ul class="user-profile-dropdown" v-show="showUserMenu">
              <li class="sidebar-list__item">
                <a href="dashboard-profile.html" class="sidebar-list__link">
                  <span class="sidebar-list__icon">
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon2.svg"
                      alt=""
                      class="icon"
                    />
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon-active2.svg"
                      alt=""
                      class="icon icon-active"
                    />
                  </span>
                  <span class="text">Profile</span>
                </a>
              </li>
              <li class="sidebar-list__item">
                <a href="setting.html" class="sidebar-list__link">
                  <span class="sidebar-list__icon">
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon10.svg"
                      alt=""
                      class="icon"
                    />
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon-active10.svg"
                      alt=""
                      class="icon icon-active"
                    />
                  </span>
                  <span class="text">Settings</span>
                </a>
              </li>
              <li class="sidebar-list__item">
                <a href="login.html" class="sidebar-list__link">
                  <span class="sidebar-list__icon">
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon13.svg"
                      alt=""
                      class="icon"
                    />
                    <img
                      src="@/assets/dp-market-dashboard/images/icons/sidebar-icon-active13.svg"
                      alt=""
                      class="icon icon-active"
                    />
                  </span>
                  <span class="text">Logout</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="language-select flx-align select-has-icon">
            <img
              src="@/assets/dp-market-dashboard/images/icons/globe.svg"
              alt=""
              class="globe-icon white-version"
            />
            <img
              src="@/assets/dp-market-dashboard/images/icons/globe-white.svg"
              alt=""
              class="globe-icon dark-version"
            />
            <select class="select py-0 ps-2 border-0 fw-500" v-model="selectedLang">
              <option value="1">Eng</option>
              <option value="2">Bn</option>
              <option value="3">Eur</option>
              <option value="4">Urd</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)
const showUserMenu = ref(false)
const selectedLang = ref('1')

const toggleDarkMode = () => {
  const root = document.documentElement
  if (isDarkMode.value) {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDarkMode.value = true
  }
})
</script>

<style scoped>
.user-profile-dropdown {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  z-index: 1000;
}
.user-profile-dropdown[style*='display: block'] {
  display: block;
}
</style>

<style>
.dark .white-version {
  display: none !important;
}
.dark-version {
  display: none;
}
.dark .dark-version {
  display: inline !important;
}
.dark body,
.dark .dashboard-nav,
.dark .user-profile-dropdown {
  background-color: #1e1e1e !important;
  color: #eee !important;
}
</style>
