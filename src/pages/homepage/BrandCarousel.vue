<template>
  <div class="h-fit w-full border border-[#E6E6E6] rounded-[16px] p-[24px]">
    <div class="flex flex-col gap-[24px] w-full h-full">
      <div class="h-fit w-full flex justify-between">
        <p class="text-[#121535] text-2xl font-semibold">Top Brands</p>
        <div class="w-fit font-inter flex items-center gap-4 h-fit">
          <div class="flex items-center gap-2">
            <button
              class="bg-[#FD603E] w-[40px] flex justify-center items-center h-[40px] rounded-full text-white"
              @click="scrollLeft"
            >
              &lt;
            </button>
            <button
              class="bg-white border border-[#CCCCCC] w-[40px] flex justify-center items-center h-[40px] rounded-full text-[#1A1A1A]"
              @click="scrollRight"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div
        ref="scrollContainer"
        class="flex overflow-x-auto no-scrollbar items-center gap-[52px] scroll-smooth"
      >
        <div
          v-for="(brand, index) in brands"
          :key="index"
          @click="setActive(index)"
          :class="[
            'cursor-pointer h-fit min-h-[84px] flex items-center justify-center min-w-[159px] rounded-lg border transition-all',
            activeIndex === index ? 'border-[#FD603E] bg-[#FFF1EC]' : 'border-[#E6E6E6] bg-white'
          ]"
        >
          <img :src="brand.image" :alt="'brand-' + index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  brands: {
    type: Array,
    required: true,
  },
})

const scrollContainer = ref(null)
const activeIndex = ref(0)

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}

function setActive(index) {
  activeIndex.value = index
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
