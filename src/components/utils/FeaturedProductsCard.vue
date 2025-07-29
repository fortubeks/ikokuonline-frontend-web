<template>
  <section
    class="border max-w-[534px] border-[#E6E6E6] font-sora h-fit rounded-2xl px-[13px] py-[16px]"
  >
    <div class="w-full flex  gap-[18px] h-full rounded-lg">
      <div class="w-full relative h-fit bg-[#F1F1F1] rounded-lg">
        <div class="absolute top-0 rounded-lg w-full h-fit">
          <div
            v-if="props.isPromo"
            class="w-fit rounded-tl-lg rounded-br-lg bg-[#2F80ED] py-[9px] px-[21.8px]"
          >
            <p class="text-white font-normal text-sm">
              {{ props.promotext }}
            </p>
          </div>
        </div>

        <div class="pt-[26px] pb-[2px] flex items-center justify-center">
          <div class="h-full">
            <img :src="image" :alt="tire" />
          </div>
        </div>
      </div>

      <div class="w-full h-fit px-1.5 rounded-b-lg">
        <div class="w-full rounded-lg flex flex-col gap-6 h-full">
          <div class="h-fit flex flex-col gap-2 rounded-lg">
            <p class="font-semibold truncate font-sora text-sm lg:text-base text-[#333333]">
              {{ props.title }}
            </p>

            <div class="flex items-center gap-[5.31px]">
              <p class="text-sm text-[#808080] font-normal">{{ ratings.toFixed(1) }}</p>
              <div class="flex gap-1 items-center">
                <div class="flex gap-[5.31px] items-center">
                  <template v-for="(star, index) in 5" :key="index">
                    <img :src="getStarType(index)" :alt="`star-${index}`" />
                  </template>
                </div>
                <div class="text-xs font-normal text-[#808080]">({{ Reviews }})</div>
              </div>
            </div>

            <div class="flex gap-1 items-center">
              <img :src="supermarketIcon" :alt="icon" />
              <p class="lg:text-xs text-[10px] leading-[100%] font-normal text-[#808080]">
                By Lucky Supermarket
              </p>
            </div>
          </div>
          <div class="h-fit flex gap-2 items-center">
            <p class="lg:text-base text-sm font-semibold text-[#999999] line-through">
              {{ formatPrice(firstPrice) }}
            </p>
            <p class="lg:text-base text-sm font-semibold text-[#121535]">
              {{ formatPrice(discountPrice) }}
            </p>
          </div>
          <div class="rounded-lg bg-gray-500">
            <button
              class="w-full rounded-lg py-[16px] flex items-center justify-center gap-2 bg-[#F1F1F1]"
              @click="onAddToCart"
            >
              Add To Cart
              <img :src="cartIcon" :alt="cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import tireimage from "@/assets/svgs/tireimage.svg"
import filledstar from '@/assets/svgs/filledstar.svg'
import supermarketIcon from '@/assets/svgs/supermarketicon.svg'
import emptystar from '@/assets/svgs/emptystar.svg'
import halfstar from '@/assets/svgs/halfstar.svg'
import cartIcon from '@/assets/svgs/carticon.svg'

const props = defineProps([
  'title',
  'promotext',
  'ratings',
  'image',
  'Reviews',
  'firstPrice',
  'discountPrice',
  'solds',
  'isPromo',
  'totals',
  'onAddToCart',
])

// const rating = 4
// const totalReviews = 12

// const originalPrice = 28000
// const discountedPrice = 20000

function formatPrice(value) {
  return `₦${value.toLocaleString()}`
}

function getStarType(index) {
  const fullStars = Math.floor(props.ratings)
  const hasHalf = props.ratings - fullStars >= 0.25 && props.ratings - fullStars < 0.75

  if (index < fullStars) {
    return filledstar
  } else if (index === fullStars && hasHalf) {
    return halfstar
  } else {
    return emptystar
  }
}
</script>

<style scoped></style>
