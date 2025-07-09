<!-- components/Sidebar.vue -->
<template>
  <div class="dashboard-sidebar">
    <button type="button" class="dashboard-sidebar__close d-lg-none d-flex">
      <i class="las la-times"></i>
    </button>
    <div class="dashboard-sidebar__inner">
      <a href="/" class="logo mb-48">
        <img src="/public/assets/dp-market-dashboard/images/logo/logo.png" alt="Logo" class="white-version" />
        <img src="/public/assets/dp-market-dashboard/images/logo/white-logo-two.png" alt="Logo" class="dark-version" />
      </a>
      <a href="/" class="logo favicon mb-48">
        <img src="/public/assets/dp-market-dashboard/images/logo/favicon.png" alt="Favicon" />
      </a>

      <ul class="sidebar-list">
        <li v-for="item in links" :key="item.text" class="sidebar-list__item">
          <router-link :to="item.route" class="sidebar-list__link">
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
const links = [
  {
    text: 'Dashboard',
    route: '/dashboard',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon1.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active1.svg',
  },
  {
    text: 'Profile',
    route: '/dashboard/profile',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon2.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active2.svg',
  },
  {
    text: 'Followers',
    route: '/dashboard/followers',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon4.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active4.svg',
  },
  {
    text: 'Followings',
    route: '/dashboard/followings',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon5.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active5.svg',
  },
  {
    text: 'Settings',
    route: '/dashboard/settings',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon10.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active10.svg',
  },
  {
    text: 'Statements',
    route: '/dashboard/statements',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon12.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active12.svg',
  },
  {
    text: 'Earnings',
    route: '/dashboard/earnings',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon11.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active11.svg',
  },
  {
    text: 'Reviews',
    route: '/dashboard/reviews',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon7.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active7.svg',
  },
  {
    text: 'Downloads',
    route: '/dashboard/downloads',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon6.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active6.svg',
  },
  {
    text: 'Refunds',
    route: '/dashboard/refunds',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon8.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active8.svg',
  },
  {
    text: 'Logout',
    route: '/logout',
    icon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon13.svg',
    activeIcon: '/public/assets/dp-market-dashboard/images/icons/sidebar-icon-active13.svg',
  },
];
</script>
