<!-- layouts/HomePageLayout.vue -->
<template>
  <div class="web-front-layout">
    <Header />
    <MiddleHeader />
    <router-view /> <!-- this renders the page content -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import Footer from '@/components/home/Footer.vue';
import MiddleHeader from '@/components/home/MiddleHeader.vue';

</script>
