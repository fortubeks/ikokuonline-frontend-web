<template>
  <div class="flex lg:flex-row flex-col gap-[24px] h-fit">
    <div class="h-fit font-sora w-full border border-[#E6E6E6] rounded-2xl p-[24px]">
      <div class="w-full h-full rounded-2xl flex flex-col gap-[24px]">
        <div class="h-fit w-full flex lg:flex-row flex-col justify-between">
          <p class="text-[#121535] text-2xl font-semibold">Featured Products</p>

          <div class="w-fit font-inter flex items-center gap-4 h-fit">
            <p class="text-base font-semibold text-[#4D4D4D]">View All Deals</p>

            <div class="flex items-center gap-2">
              <button
                @click="scrollLeft"
                :class="[
                  'w-[40px] h-[40px] rounded-full flex justify-center items-center',
                  activeButton === 'left'
                    ? 'bg-[#FD603E] text-white'
                    : 'border border-[#CCCCCC] text-[#1A1A1A] bg-white',
                ]"
              >
                &lt;
              </button>
              <button
                @click="scrollRight"
                :class="[
                  'w-[40px] h-[40px] rounded-full flex justify-center items-center',
                  activeButton === 'right'
                    ? 'bg-[#FD603E] text-white'
                    : 'border border-[#CCCCCC] text-[#1A1A1A] bg-white',
                ]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div
          ref="scrollContainer"
          class="grid grid-cols-1 lg:grid-cols-2 gap-[10px] scroll-smooth no-scrollbar"
        >
          <FeaturedProductsCard
            v-for="(item, index) in products"
            :key="index"
            :product="item"
            :title="item.name"
            :promotext="item.promotext"
            :Reviews="item.reviews"
            :image="item.image"
            :firstPrice="item.originalPrice"
            :discountPrice="item.discountedPrice"
            :ratings="item.rating"
            :onAddToCart="onAddToCart"
            :isPromo="item.promo"
          />
        </div>
      </div>
    </div>
    <div class="w-fit h-full bg-[#6B6E8E] rounded-[16px] pb-[100px] py-[55px] px-[46.8px]">
      <div class="h-full w-full flex flex-col gap-[31px] items-center">
        <div class="h-fit flex flex-col items-center gap-[23px] w-full">
          <p class="text-2xl font-semibold text-[#FFFFFF]">Nissan SUV 2005</p>

          <div class="flex  gap-2 items-end">
            <p
              class="text-base font-semibold whitespace-nowrap flex gap-1 items-end text-[#FFFFFF]"
            >
              GET AT
              <span
                class="text-[40px] leading-[120%] whitespace-nowrap font-semibold text-[#FFFFFF]"
                >N890,000</span
              >
            </p>
            <div
              class="lg:w-[128px] w-full flex items-end whitespace-nowrap justify-center text-2xl font-semibold text-[#FFFFFF] h-full bg-contain bg-center"
              :style="{ backgroundImage: 'url(/images/promopics.svg)' }"
            >
              20% off
            </div>
          </div>
        </div>
      </div>

      <div>
        <img :src="suvpics" :alt="suv" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeaturedProductsCard from '@/components/utils/FeaturedProductsCard.vue'
import suvpics from '@/assets/svgs/suvpics.svg'

// Props from parent
defineProps({
  products: Array,
  onAddToCart: Function,
})

const scrollContainer = ref(null)
const activeButton = ref('left')

const scrollLeft = () => {
  activeButton.value = 'left'
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}

const scrollRight = () => {
  activeButton.value = 'right'
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
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
