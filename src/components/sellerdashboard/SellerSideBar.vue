<template>
  <div class="dashboard-sidebar h-full bg-[#ffffff] dark:bg-gray-900 text-black">
    <button type="button" class="dashboard-sidebar__close d-lg-none d-flex">
      <i class="las la-times"></i>
    </button>
    <div class="dashboard-sidebar__inner">
      <a href="/" class="logo mb-48">
        <img src="@/assets/images/logo/ikokuonline_logo.png" alt="Logo" class="white-version" />
        <img
          src="@/assets/images/logo/ikokuonline_white_logo.png"
          alt="Logo"
          class="dark-version"
        />
      </a>
      <a href="/" class="logo favicon mb-48">
        <img src="@/assets/images/logo/favicon.png" alt="Favicon" />
      </a>

      <ul class="sidebar-list">
        <li
          v-for="item in links"
          :key="item.text"
          :class="['sidebar-list__item', isActive(item.route) ? 'activePage' : '']"
        >
          <template v-if="item.children">
            <div
              class="sidebar-list__link cursor-pointer flex justify-between items-center"
              @click="toggleListings"
              :class="showListings ? 'activePage' : ''"
            >
              <div class="flex items-center gap-2">
                <span class="sidebar-list__icon">
                  <img :src="item.icon" class="icon" />
                  <img :src="item.activeIcon" class="icon icon-active" />
                </span>
                <span class="text">{{ item.text }}</span>
              </div>
              <i class="las" :class="showListings ? 'la-angle-up' : 'la-angle-down'"></i>
            </div>

            <transition name="fade-slide">
              <ul v-show="showListings" class="ml-8 mt-2">
                <li
                  v-for="child in item.children"
                  :key="child.text"
                  :class="['sidebar-list__item', isActive(child.route) ? 'activePage' : '']"
                >
                  <router-link :to="child.route" class="sidebar-list__link">
                    <span class="text">{{ child.text }}</span>
                  </router-link>
                </li>
              </ul>
            </transition>
          </template>

          <template v-else>
            <router-link
              :to="item.route"
              :class="['sidebar-list__link', isActive(item.route) ? 'activePage' : '']"
            >
              <span class="sidebar-list__icon">
                <img :src="item.icon" class="icon" />
                <img :src="item.activeIcon" class="icon icon-active" />
              </span>
              <span class="text">{{ item.text }}</span>
            </router-link>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const icons = import.meta.glob('@/assets/dp-market-dashboard/images/icons/*.svg', {
  eager: true,
  import: 'default',
})

const route = useRoute()

const showListings = ref(false)
const toggleListings = () => {
  showListings.value = !showListings.value
}

const links = [
  {
    text: 'Dashboard',
    route: '/seller-dashboard',
    icon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon1.svg`],
    activeIcon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon-active1.svg`],
  },
  {
    text: 'Profile',
    route: '/sellerprofile',
    icon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon2.svg`],
    activeIcon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon-active2.svg`],
  },
  {
    text: 'Listings',
    icon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon4.svg`],
    activeIcon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon-active4.svg`],
    children: [
      {
        text: 'Car Parts',
        route: '/listingscarparts',
      },
      {
        text: 'Vehicle Listings',
        route: '/listingsvehicleslist',
      },
    ],
  },
  {
    text: 'Logout',
    route: '/logout',
    icon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon13.svg`],
    activeIcon: icons[`/src/assets/dp-market-dashboard/images/icons/sidebar-icon-active13.svg`],
  },
]

const isActive = (targetRoute) => {
  if (!targetRoute) return false
  return route.path === targetRoute || route.path.startsWith(targetRoute)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
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
.dark .dashboard-sidebar {
  background-color: #1e1e1e;
  color: #eee;
}
</style>
