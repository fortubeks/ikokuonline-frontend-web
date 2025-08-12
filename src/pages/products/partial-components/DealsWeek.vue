<template>
  <div class="h-fit font-sora w-full border border-[#E6E6E6] rounded-2xl p-[24px]">
    <div class="w-full h-full rounded-2xl flex flex-col gap-[24px]">
      <div class="h-fit w-full flex lg:flex-row flex-col justify-between">
        <p class="text-[#121535] text-2xl font-semibold">Deal of The Week</p>

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
        class="grid grid-flow-col auto-cols-[minmax(250px,_1fr)] gap-[12px] overflow-x-auto scroll-smooth no-scrollbar"
      >
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
</template>

<script setup>
import { ref } from 'vue'
import AddToCartCard from '@/components/utils/AddToCartCard.vue'

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
