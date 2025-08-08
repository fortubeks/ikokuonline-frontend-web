<template>
  <div class=" ">
    <Header />
    <!-- <HeaderMiddle /> -->

    <div class="min-h-screen bg-white">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/homepagev3/Header.vue'
// import HeaderMiddle from '@/pages/home-page-sections/HeaderMiddle.vue'
import Footer from '@/components/homepagev3/Footer.vue'
</script>
