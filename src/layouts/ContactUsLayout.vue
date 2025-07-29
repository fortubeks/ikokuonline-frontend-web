<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />
    <ShopNav
      title="Contact"
      current="Contact"
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
import HeaderMiddle from '@/pages/homepages/HeaderMiddle.vue'
import ShopNav from '@/pages/productview/ShopNav.vue'
import ProductFooter from '@/pages/productview/ProductFooter.vue'
</script>
