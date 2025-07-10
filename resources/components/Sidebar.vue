<!-- components/Sidebar.vue -->
<template>
  <div class="dashboard-sidebar">
    <button type="button" class="dashboard-sidebar__close d-lg-none d-flex">
      <i class="las la-times"></i>
    </button>
    <div class="dashboard-sidebar__inner">
      <a href="/" class="logo mb-48">
        <img :src="`${appUrl}/assets/images/logo/ikokuonline_logo.png`" alt="Logo" class="white-version" />
        <img :src="`${appUrl}/assets/images/logo/ikokuonline_white_logo.png`" alt="Logo" class="dark-version" />
      </a>
      <a href="/" class="logo favicon mb-48">
        <img :src="`${appUrl}/assets/images/logo/favicon.png`" alt="Favicon" />
      </a>

      <ul class="sidebar-list">
        <li v-for="item in links" :key="item.text" :class="['sidebar-list__item', isActive(item.route) ? 'activePage' : '']">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppConfig } from '@/composables/useAppConfig';
import { useRoute } from 'vue-router';

const route = useRoute();

const { appUrl } = useAppConfig();

const links = [
  {
    text: 'Dashboard',
    route: '/dashboard',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon1.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active1.svg`,
  },
  {
    text: 'Profile',
    route: '/dashboard/profile',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon2.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active2.svg`,
  },
  {
    text: 'Vehicle Listings',
    route: '/dashboard/vehicle-listings',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon4.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active4.svg`,
  },
  {
    text: 'Products & Car Parts',
    route: '/dashboard/products',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon5.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active5.svg`,
  },
  {
    text: 'Orders',
    route: '/dashboard/orders',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon12.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active12.svg`,
  },
  {
    text: 'Logout',
    route: '/logout',
    icon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon13.svg`,
    activeIcon: `${appUrl}/assets/dp-market-dashboard/images/icons/sidebar-icon-active13.svg`,
  },
];

const isActive = (targetRoute) => {
  if (targetRoute === '/dashboard') {
    return route.path === '/dashboard';
  }
  return route.path.startsWith(targetRoute);
};
</script>
