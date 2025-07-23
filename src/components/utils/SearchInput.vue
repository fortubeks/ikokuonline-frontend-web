<template>
  <section class="h-[48px] w-[100%] max-w-[777px]">
    <div class="relative">
      <input
        placeholder="Search for a product or brand"
        class="border text-sm outline-none h-[48px] rounded-r-lg px-4 text-[#666666] border-[#FB6A00] w-full"
      />
      <button
        class="p-[14px] absolute rounded-r-lg top-0 right-0 h-full flex flex-col items-center justify-center w-fit bg-[#FB6A00]"
        @click="performSearch"
      >
        <img :src="searchinput" alt="search" />
      </button>
    </div>
  </section>
</template>

<script setup>
import searchinput from '@/assets/svgs/searchicon.svg'

import { ref } from 'vue'

const search = ref('')

const performSearch = () => {
  if (!search.value.trim()) return

  console.log('Searching for:', search.value)
}
</script>

<style scoped></style>
