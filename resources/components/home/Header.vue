<template>
    <header class="header-middle border-bottom border-neutral-40 py-4">
        <div class="container container-lg">
            <nav class="header-inner flex-between gap-8">
                <!-- Logo Start -->
                <div class="logo">
                    <a href="index.html" class="link">
                        <img :src="`${appUrl}/assets/images/logo/ikokuonline_white_logo.png`" alt="Logo" class="dark-version" />
                    </a>
                </div>
                <!-- Logo End  -->

                <!-- Menu Start  -->
                <div class="header-menu d-lg-block d-none">
                    <!-- Nav Menu Start -->
                    <ul class="nav-menu flex-align ">
                        <li class="on-hover-item nav-menu__item has-submenu activePage">
                            <a href="javascript:void(0)" class="nav-menu__link text-heading-two">Home</a>
                            <ul class="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                                <li class="common-dropdown__item nav-submenu__item">
                                    <a href="index.html" class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"> Home Grocery</a>
                                </li>
                                <li class="common-dropdown__item nav-submenu__item activePage">
                                    <a href="index-two.html" class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"> Home Electronics</a>
                                </li>
                                <li class="common-dropdown__item nav-submenu__item">
                                    <a href="index-three.html" class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"> Home Fashion</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-menu__item">
                            <a href="contact.html" class="nav-menu__link text-heading-two">Contact Us</a>
                        </li>
                    </ul>
                    <!-- Nav Menu End -->
                </div>
                <!-- Menu End  -->
                
                <!-- Middle Header Right start -->
                <div class="header-right flex-align">
                    <!-- Dropdown Select Start -->
                    <a href="javascript:void(0)" class="d-flex align-content-around gap-10 fw-medium text-main-600 py-14 px-24 bg-main-50 rounded-pill line-height-1 hover-bg-main-600 hover-text-white">
                        <span class="d-sm-flex d-none line-height-1"><i class="ph-bold ph-user"></i></span>
                        Account
                    </a>
                    <!-- Dropdown Select End -->
                    <button type="button" class="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"> <i class="ph ph-list"></i> </button>
                </div>
                <!-- Middle Header Right End  -->
                
            </nav>
        </div>
    </header>
</template>

<script setup>
import { useAppConfig } from '@/composables/useAppConfig';
const { appUrl } = useAppConfig();
</script>