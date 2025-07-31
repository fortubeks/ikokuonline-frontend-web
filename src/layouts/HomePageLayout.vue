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
import HeaderMiddle from '@/pages/homepages/HeaderMiddle.vue'
import ProductFooter from '@/pages/productview/ProductFooter.vue'
</script>
