<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />
    <ShopNav :title="route.meta.title" :current="route.meta.current" :links="route.meta.links" />
    <section class="">
      <router-view />
    </section>

    <ProductFooter />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeaderMiddle from '@/pages/home-page-sections/HeaderMiddle.vue'
import ProductFooter from '@/components/home/Footer.vue'
import ShopNav from '@/pages/shop-pages/ShopNav.vue'

import { useRoute } from 'vue-router'

const route = useRoute()
</script>
