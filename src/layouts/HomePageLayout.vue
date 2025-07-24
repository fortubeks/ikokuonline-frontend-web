<!-- layouts/HomePageLayout.vue -->
<template>
  <div class=" ">
    <HeaderMiddle />
    <Header />
    <MiddleHeader />
    <div class="lg:px-[100px] px-[24px] h-fit bg-white">
      <router-view />
      <!-- this renders the page content -->
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import Footer from '@/components/home/Footer.vue'
import MiddleHeader from '@/components/home/MiddleHeader.vue'
import HeaderMiddle from '@/pages/homepages/HeaderMiddle.vue'
</script>
