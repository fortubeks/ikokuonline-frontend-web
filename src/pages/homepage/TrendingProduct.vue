<template>
  <div class="h-fit w-full border border-[#E6E6E6] font-sora rounded-[16px] p-[24px]">
    <div class="flex flex-col gap-[24px] w-full h-full">
      <div class="h-fit w-full flex lg:flex-row flex-col justify-between">
        <p class="text-[#121535] text-2xl font-semibold">Trending Products</p>

        <div class="flex lg:flex-row flex-col items-center gap-[8px]">
          <button class="py-[12px] px-[24px] rounded-[48px] bg-[#FD603E] text-white text-base font-normal">All</button>
          <button class="py-[12px] px-[24px] rounded-[48px] border border-[#CCCCCC] text-[#121535] text-base font-normal">Car Parts</button>
          <button class="py-[12px] px-[24px] rounded-[48px] border border-[#CCCCCC] text-[#121535] text-base font-normal">Vehicles</button>
        </div>

        <div class="w-fit font-inter flex items-center gap-4 h-fit">
          <div class="flex items-center gap-2">
            <button class="bg-[#FD603E] w-[40px] flex justify-center items-center h-[40px] rounded-full text-white">&lt;</button>
            <button class="bg-white border border-[#CCCCCC] w-[40px] flex justify-center items-center h-[40px] rounded-full text-[#1A1A1A]">&gt;</button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[10px]">
        <div class="rounded-[16px] bg-[#F3EDDE] w-full h-fit py-[85px] flex justify-center items-center">
          <p class="lg:text-[24px] text-[12px] font-semibold text-[#121535] max-w-[536px] flex flex-col items-center lg:leading-[120%]">
            Free Delivery for all Port Harcourt Residents <span>On Orders Above N9,800</span>
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[12px]">
          <AddToCartCard
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
  </div>
</template>

<script setup>
import AddToCartCard from '@/components/utils/AddToCartCard.vue'

defineProps({
  products: Array,
  onAddToCart: Function,
})
</script>
