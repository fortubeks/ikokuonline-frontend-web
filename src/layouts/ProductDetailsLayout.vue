<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />
    <ShopNav
      title="Shop Details"
      current="Shop"
      :links="[{ label: 'Home', href: '/', icon: 'ph ph-house' }]"
    />
    <section class="contact">
      <router-view />
    </section>

    <ProductFooter />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeaderMiddle from '@/pages/home-page-sections/HeaderMiddle.vue'
import ShopNav from '@/pages/products/products-list/ShopNav.vue'
import ProductFooter from '@/pages/products/products-list/ProductFooter.vue'
</script>
