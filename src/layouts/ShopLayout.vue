<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />

    <section class="">
      <router-view />
    </section>

    <ProductFooter />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeaderMiddle from '@/pages/home-page-sections/HeaderMiddle.vue'
import ProductFooter from '@/pages/products/products-list/ProductFooter.vue'
</script>
