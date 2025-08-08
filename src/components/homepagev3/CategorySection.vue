<template>
  <div class="!bg-white !rounded-lg !shadow-sm !py-4 !mb-6 !relative">
    <div class="!px-4 !flex !justify-between !items-center !mb-3">
      <h2 class="!text-lg !font-bold">{{ title }}</h2>
      <a :href="viewAllLink" class="!text-primary-500 !text-sm !font-medium hover:!underline">
        View All
      </a>
    </div>

    <button
      v-if="showLeftArrow"
      @click="scrollLeft"
      class="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !rounded-full !shadow-md !p-1 !ml-2"
      aria-label="Scroll left"
    >
      <ChevronLeftIcon class="!w-5 !h-5 !text-gray-600" />
    </button>

    <button
      v-if="showRightArrow"
      @click="scrollRight"
      class="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !rounded-full !shadow-md !p-1 !mr-2"
      aria-label="Scroll right"
    >
      <ChevronRightIcon class="!w-5 !h-5 !text-gray-600" />
    </button>

    <div
      ref="scrollContainerRef"
      class="!flex !px-4 !overflow-x-auto !space-x-6 !pb-2 !scrollbar-hide !scroll-smooth"
      style="scrollbar-width: none; -ms-overflow-style: none"
    >
      <a
        v-for="category in categories"
        :key="category.id"
        :href="`/category/${category.id}`"
        class="!flex !flex-col !items-center !flex-shrink-0 group !transition-transform hover:!scale-105"
      >
        <div
          class="!flex !items-center !justify-center !w-16 !h-16 !bg-gradient-to-br !from-primary-50 !to-primary-100 !rounded-full !shadow-sm group-hover:!shadow-md !transition-all"
        >
          <img :src="category.icon" :alt="category.name" class="!w-8 !h-8" />
        </div>
        <span
          class="!mt-2 !text-sm !text-center !font-medium !text-gray-700 group-hover:!text-primary-500 !transition-colors"
        >
          {{ category.name }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: String,
  viewAllLink: String,
  categories: Array,
})

const scrollContainerRef = ref(null)
const showLeftArrow = ref(false)
const showRightArrow = ref(true)

const checkScroll = () => {
  const container = scrollContainerRef.value
  if (container) {
    showLeftArrow.value = container.scrollLeft > 0
    showRightArrow.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 10
  }
}

onMounted(() => {
  const container = scrollContainerRef.value
  if (container) {
    container.addEventListener('scroll', checkScroll)
    checkScroll()
  }
})

onUnmounted(() => {
  const container = scrollContainerRef.value
  if (container) {
    container.removeEventListener('scroll', checkScroll)
  }
})

const scrollLeft = () => {
  scrollContainerRef.value?.scrollBy({ left: -200, behavior: 'smooth' })
}

const scrollRight = () => {
  scrollContainerRef.value?.scrollBy({ left: 200, behavior: 'smooth' })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
