<template>
  <section class="w-full flex flex-col gap-[32px] min-h-[50vh]">
    <Productdetails />
    <SimilarProduct />
    <NewsletterSection />
  </section>
</template>

<script setup>
import NewsletterSection from './NewsletterSection.vue'
import Productdetails from './ProductSingleView.vue'
import SimilarProduct from './SimilarProduct.vue'
</script>

<style scoped></style>
