<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />

    <div class="min-h-screen bg-white">
      <router-view />
    </div>
    <ProductFooter />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeaderMiddle from '@/pages/home-page-sections/HeaderMiddle.vue'
import ProductFooter from '@/pages/products/products-list/ProductFooter.vue'
</script>
