<template>
  <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
    <div class="!flex !justify-between !items-center !px-4 !py-3 !border-b">
      <h2 class="!text-lg !font-bold !text-black">{{ title }}</h2>
      <a href="/featured" class="!text-primary-500 !text-sm !font-medium hover:!underline"
        >View All</a
      >
    </div>

    <div class="!relative !overflow-hidden">
      <div
        class="!flex !transition-transform !duration-500 !ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="item in items" :key="item.id" class="!w-full !flex-shrink-0">
          <a :href="`/product/${item.id}`" class="!block">
            <div class="!relative">
              <img :src="item.image" :alt="item.title" class="!w-full !h-[400px] !object-cover" />
              <div
                v-if="item.discount"
                class="!absolute !top-3 !left-3 !bg-primary-500 !text-white !px-2 !py-1 !rounded-md"
              >
                {{ item.discount }}% OFF
              </div>
              <div
                class="!absolute !bottom-0 !left-0 !right-0 !bg-gradient-to-t !from-black !to-transparent !p-4"
              >
                <h3 class="!text-white !font-bold !text-lg">
                  {{ item.title }}
                </h3>
                <p class="!text-white !font-bold">₦{{ item.price.toLocaleString() }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <button
        @click="prevSlide"
        class="!absolute !left-2 !top-1/2 !transform -translate-y-1/2 !bg-black !bg-opacity-50 !text-white !rounded-full !p-2 hover:!bg-opacity-70 !transition"
      >
        <ChevronLeftIcon class="!w-6 !h-6" />
      </button>
      <button
        @click="nextSlide"
        class="!absolute !right-2 !top-1/2 !transform -translate-y-1/2 !bg-black !bg-opacity-50 !text-white !rounded-full !p-2 hover:!bg-opacity-70 !transition"
      >
        <ChevronRightIcon class="!w-6 !h-6" />
      </button>

      <div class="!absolute !bottom-4 !left-0 !right-0 !flex !justify-center !space-x-2">
        <button
          v-for="(dot, index) in items"
          :key="index"
          @click="currentIndex = index"
          :class="[
            '!w-2 !h-2 !rounded-full',
            currentIndex === index ? '!bg-primary-500' : '!bg-white !bg-opacity-50',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

export default {
  name: 'FeaturedCarousel',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      isAnimating: false,
      interval: null,
    }
  },
  mounted() {
    this.interval = setInterval(this.nextSlide, 5000)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    nextSlide() {
      if (this.isAnimating) return
      this.isAnimating = true
      this.currentIndex = this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1
      setTimeout(() => {
        this.isAnimating = false
      }, 500)
    },
    prevSlide() {
      if (this.isAnimating) return
      this.isAnimating = true
      this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1
      setTimeout(() => {
        this.isAnimating = false
      }, 500)
    },
  },
}
</script>
