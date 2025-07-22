<!-- layouts/HomePageLayout.vue -->
<template>
  <div class=" ">
    <Header />
    <MiddleHeader />
    <div class="px-[100px] h-fit bg-white">
    <router-view /> <!-- this renders the page content -->
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import Footer from '@/components/home/Footer.vue';
import MiddleHeader from '@/components/home/MiddleHeader.vue';

</script>
