<template>
  <section class="  w-full bg-white min-h-[50vh]">

    <div class=" flex font-inter justify-end w-full h-fit">
      <div class=" w-fit py-5 flex gap-14 items-center h-[48px]">

        <div class="w-fit flex items-center flex-col min-h-[48px]  justify-between">
          <div>
            <img :src="profilePics" :alt="profile" />

          </div>
          <p class="font-medium text-base text-[#000000]">Profile</p>
        </div>
        <div class="w-fit relative flex items-center flex-col h-fit min-h-[48px] justify-between">
          <div>
            <img :src="heartPics" :alt="heart" />

          </div>
          <p class="font-medium text-base text-[#000000]">Wishlist</p>
          <div
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[22%] bg-[#FD603E] rounded-full  text-xs  absolute">
            2</div>
        </div>
        <div class="w-fit flex items-center relative flex-col h-fit min-h-[48px]  justify-between">
          <div>
            <img :src="comparepics" :alt="compare" />

          </div>
          <p class="font-medium text-base text-[#000000]">Compare</p>
          <div
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[22%] bg-[#FD603E] rounded-full  text-xs  absolute">
            2</div>
        </div>
        <div class="w-fit flex items-center relative flex-col h-fit min-h-[48px]  justify-between">
          <div>
            <img :src="cartPics" :alt="profile" />

          </div>
          <p class="font-medium text-base text-[#000000]">Cart</p>
          <div
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[5%] bg-[#FD603E] rounded-full  text-xs  absolute">
            2</div>
        </div>

      </div>
    </div>

    <div class="w-full h-[633px] flex gap-[172px]  items-center px-[99px] bg-cover bg-center"
      :style="{ backgroundImage: 'url(/images/backgroundimage1.svg)' }">
      <div class="w-[504px] h-20 bg-yellow-300">

      </div>
     <div class="flex flex-col gap-[38px] overflow-hidden">
    
    <div class="w-[441px] h-[326px] bg-[#C4C4C4] relative  rounded-lg">
      <div
        class="flex transition-transform w-full duration-500 ease-in-out"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <div
          v-for="(img, index) in images"
          :key="index"
          class=" flex-shrink-0 flex items-center justify-center"
        >
          <img :src="img" alt="slide"  />
        </div>
      </div>
    </div>

    <!-- Slide Buttons -->
    <div class="flex items-center gap-3 justify-center">
      <button
        v-for="(img, index) in images"
        :key="'dot-' + index"
        @click="activeIndex = index"
        class="h-4 w-10 rounded-lg transition-all duration-300"
        :class="{
          'bg-[#FB6A00]': activeIndex === index,
          'bg-white opacity-20': activeIndex !== index
        }"
      ></button>
    </div>
  </div>

      <div>

      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] ">
      <AddToCartCard v-for="(item, index) in products" :key="index" :product="item" :title="item.name"
        :promotext="item.promotext" :Reviews="item.reviews" :image="item.image" :firstPrice="item.originalPrice"
        :discountPrice="item.discountedPrice" :ratings="item.rating" :onAddToCart="handleAddToCart"
        :isPromo="item.promo" />
    </div>
  </section>
</template>

<script setup>
import AddToCartCard from '@/components/utils/AddToCartCard.vue'
import profilePics from "@/assets/svgs/profilepics.svg"
import heartPics from "@/assets/svgs/heartpics.svg"
import comparepics from "@/assets/svgs/comparepics.svg"
import cartPics from "@/assets/svgs/cartpics.svg"
import tirepics from "@/assets/svgs/tirepics.svg"

import { ref } from 'vue'


const images = [tirepics, tirepics, tirepics]
const activeIndex = ref(0)

function handleAddToCart() {
  console.log("Product added to cart!")
}


const products = [
  {
    name: "Universal Car Horn",
    promotext: "Best Sale",
    image: "/src/assets/svgs/tireimage.svg",
    rating: 4.5,
    reviews: 24,
    promo: true,
    sold: 18,
    total: 35,
    originalPrice: 28000,
    discountedPrice: 20000,
  },
  {
    name: "17 AH New Power Battery",
    promotext: "Best Sale",
    image: "/src/assets/svgs/tireimage.svg",
    rating: 3.7,
    reviews: 10,
    promo: false,
    sold: 12,
    total: 40,
    originalPrice: 35000,
    discountedPrice: 31000,
  },
  // {
  //   name: "215/60/16 Maxtrek Tyre",
  //   image: "/src/assets/svgs/tireimage.svg",
  //   rating: 5,
  //   reviews: 33,
  //   sold: 27,
  //   promo: true,
  //   total: 30,
  //   originalPrice: 50000,
  //   discountedPrice: 47000,
  // },
  // {
  //   name: "Car Wiper Blade",
  //   image: "/src/assets/svgs/tireimage.svg",
  //   rating: 2.5,
  //   reviews: 8,
  //   sold: 5,
  //   promo: false,
  //   total: 25,
  //   originalPrice: 5000,
  //   discountedPrice: 3500,
  // },
  // {
  //   name: "Engine Oil Premium",
  //   image: "/src/assets/svgs/tireimage.svg",
  //   rating: 4.0,
  //   reviews: 15,
  //   sold: 20,
  //   promo: true,
  //   total: 45,
  //   originalPrice: 12000,
  //   discountedPrice: 10000,
  // },
]
</script>

<style scoped></style>
