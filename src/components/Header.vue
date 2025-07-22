<!-- eslint-disable vue/multi-word-component-names -->
<!-- components/Header.vue -->
<template>
  <div class="dashboard-nav bg-white flx-between gap-md-3 gap-2">
    <div class="dashboard-nav__left flx-align gap-md-3 gap-2">
      <button type="button" class="icon-btn bar-icon text-heading bg-gray-seven flx-center">
        <i class="las la-bars"></i>
      </button>
      <button type="button" class="icon-btn arrow-icon text-heading bg-gray-seven flx-center">
        <img src="@/assets/dp-market-dashboard/images/icons/angle-right.svg" alt="Angle" />
      </button>
    </div>

    <div class="dashboard-nav__right">
      <div class="header-right flx-align">
        <div class="header-right__inner gap-sm-3 gap-2 flx-align d-flex">
          <!-- Dark/Light toggle -->
          <div class="theme-switch-wrapper position-relative">
            <label class="theme-switch" for="checkbox">
              <input type="checkbox" class="d-none" id="checkbox" />
              <span class="slider text-black header-right__button white-version">
                <img src="@/assets/dp-market-dashboard/images/icons/sun.svg" />
              </span>
              <span class="slider text-black header-right__button dark-version">
                <img src="@/assets/dp-market-dashboard/images/icons/moon.svg" />
              </span>
            </label>
          </div>

          <!-- User Profile Dropdown -->
          <div class="user-profile">
            <button class="user-profile__button flex-align">
              <span class="user-profile__thumb">
                <img src="@/assets/dp-market-dashboard/images/thumbs/user-profile.png" class="cover-img" alt="User" />
              </span>
            </button>
            <ul class="user-profile-dropdown">
              <li>
                <router-link to="/dashboard/profile">Profile</router-link>
              </li>
              <li>
                <router-link to="/dashboard/settings">Settings</router-link>
              </li>
              <li>
                <router-link to="/logout">Logout</router-link>
              </li>
            </ul>
          </div>

          <!-- Language Selector -->
          <div class="language-select flx-align select-has-icon">
            <img src="@/assets/dp-market-dashboard/images/icons/globe.svg" class="globe-icon white-version" />
            <img src="@/assets/dp-market-dashboard/images/icons/globe-white.svg" class="globe-icon dark-version" />
            <select class="select py-0 ps-2 border-0 fw-500">
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
