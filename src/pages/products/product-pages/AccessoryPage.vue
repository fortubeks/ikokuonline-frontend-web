<template>
  <section class="py-16  bg-white min-h-[50vh]">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Tyres</h1>

    <p class="text-lg text-gray-600">
      Browse our collection of top-quality accessory for all vehicle types. Select by size, brand, or type to find the perfect match for your ride.
    </p>

    <!-- Example products grid (optional) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      <div v-for="n in 4" :key="n" class="bg-gray-100 p-4 rounded shadow hover:shadow-md transition">
        <div class="h-40 bg-gray-200 rounded mb-4"></div>
        <h2 class="text-xl font-semibold mb-2">Tyre Brand {{ n }}</h2>
        <p class="text-sm text-gray-600">High-performance all-season tyres.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// You can fetch tyre data here later or use dummy data
</script>

<style scoped>
/* Optional: SCSS if you need custom styles */
</style>
