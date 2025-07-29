<template>
  <section class="w-full flex flex-col gap-[32px] min-h-[50vh]">
    <div class="flex font-inter justify-end w-full h-fit">
      <div class="w-fit py-[20px] flex gap-14 items-center h-fit">
        <div class="w-fit flex items-center flex-col lg:min-h-[48px] justify-between">
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
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[22%] bg-[#FD603E] rounded-full text-xs absolute"
          >
            2
          </div>
        </div>
        <div class="w-fit flex items-center relative flex-col h-fit min-h-[48px] justify-between">
          <div>
            <img :src="comparepics" :alt="compare" />
          </div>
          <p class="font-medium text-base text-[#000000]">Compare</p>
          <div
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[22%] bg-[#FD603E] rounded-full text-xs absolute"
          >
            2
          </div>
        </div>
        <div class="w-fit flex items-center relative flex-col h-fit min-h-[48px] justify-between">
          <div>
            <img :src="cartPics" :alt="profile" />
          </div>
          <p class="font-medium text-base text-[#000000]">Cart</p>
          <div
            class="h-14 flex justify-center items-center w-14 top-[-10%] right-[5%] bg-[#FD603E] rounded-full text-xs absolute"
          >
            2
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full min-h-[633px] h-fit flex lg:flex-row flex-col gap-[50px] lg:gap-[172px] items-center lg:px-auto px-[20px] lg:pl-[99px] max-lg:py-10 bg-contain bg-center"
      :style="{ backgroundImage: 'url(/images/backgroundimage1.svg)' }"
    >
      <div class="w-fit flex flex-col font-sora gap-[52px] h-fit">
        <p
          class="font-sora lg:text-[50px] max-w-[480px] leading-[56px] font-semibold text-[#FFFFFF]"
        >
          Get Your Vehicle, Car Parts and Accessories For Less
        </p>

        <div class="h-fit w-fit flex lg:flex-row flex-col gap-[20px] items-center">
          <button
            class="h-fit w-full lg:w-fit px-[24px] py-[20px] border border-[#FFFFFF] rounded-[48px]"
          >
            <div class="w-full h-full flex items-center gap-2">
              <p class="text-base text-[#FFFFFF]">Shop Car Parts</p>
              <img :src="cartticon" alt="cart" />
            </div>
          </button>
          <button class="h-fit w-full lg:w-fit px-[24px] py-[20px] bg-[#FD603E] rounded-[48px]">
            <div class="w-full h-full flex items-center gap-2">
              <p class="text-base text-[#FFFFFF]">Shop Car Parts</p>
              <img :src="cartticon" alt="cart" />
            </div>
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-[32px]">
        <div class="lg:w-[400px] w-full relative lg:h-[370px] bg-[#C4C4C4]">
          <div
            class="absolute top-[-20%] overflow-x-auto"
            v-for="(img, index) in images"
            :key="index"
          >
            <img :src="img" :alt="tire" />
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button
            v-for="(img, index) in images"
            :key="'dot-' + index"
            @click="activeIndex = index"
            class="h-6 w-18 rounded-lg transition-all duration-300"
            :class="{
              'bg-[#FB6A00]': activeIndex === index,
              'bg-white opacity-20': activeIndex !== index,
            }"
          ></button>
        </div>
      </div>
    </div>

    <div class="h-fit w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-[24px]">
      <TiresComponent
        v-for="(items, index) in productcard"
        :key="index"
        :bgimage="items.bgImage"
        :title="items.title"
        :image="items.image"
      />
    </div>
    <div class="flex justify-center items-center">
      <div class="flex flex-col items-center gap-[32px] h-fit w-[921px]">
        <p class="lg:text-[24px] text-base font-semibold text-[#121535] leading-[120%] font-sora">
          Can’t find category? Search below
        </p>

        <div class="w-full h-fit flex">
          <AllCategory />
          <SearchInput />
        </div>
      </div>
    </div>
    <DealsWeek :products="products" :onAddToCart="handleAddToCart" />

    <TrendingProduct :products="products" :onAddToCart="handleAddToCart" />

    <BrandCarousel :brands="brands" />

    <FeaturedDeals :products="productsdeals" :onAddToCart="handleAddToCart" />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
      <!-- <FeaturedProductsCard
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
        :onAddToCart="handleAddToCart"
        :isPromo="item.promo"
      /> -->
    </div>
  </section>
</template>

<script setup>
// import AddToCartCard from '@/components/utils/AddToCartCard.vue'
import profilePics from '@/assets/svgs/profilepics.svg'
import heartPics from '@/assets/svgs/heartpics.svg'
import comparepics from '@/assets/svgs/comparepics.svg'
import cartPics from '@/assets/svgs/cartpics.svg'
import tirepics from '@/assets/svgs/tirepics.svg'
import cartticon from '@/assets/svgs/cartticon.svg'

import { ref } from 'vue'
import TiresComponent from '@/components/utils/TiresComponent.vue'
import AllCategory from '@/components/utils/AllCategory.vue'
import SearchInput from '@/components/utils/SearchInput.vue'
import DealsWeek from '../homepage/DealsWeek.vue'
import TrendingProduct from '../homepage/TrendingProduct.vue'
import BrandCarousel from '../homepage/BrandCarousel.vue'
// import FeaturedProductsCard from '@/components/utils/FeaturedProductsCard.vue'
import FeaturedDeals from '../homepage/FeaturedDeals.vue'

const images = [tirepics, tirepics, tirepics]
const activeIndex = ref(0)

function handleAddToCart() {
  console.log('Product added to cart!')
}

const productsdeals = [
  {
    name: 'Universal Car Horn',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/carpics.svg',
    rating: 4.5,
    reviews: 24,
    promo: true,
    sold: 18,
    total: 35,
    originalPrice: 28000,
    discountedPrice: 20000,
  },
  {
    name: '17 AH New Power Battery',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/carpics.svg',
    rating: 3.7,
    reviews: 10,
    promo: false,
    sold: 12,
    total: 40,
    originalPrice: 35000,
    discountedPrice: 31000,
  },
  {
    name: 'Universal Car Horn',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/carpics.svg',
    rating: 4.5,
    reviews: 24,
    promo: true,
    sold: 18,
    total: 35,
    originalPrice: 28000,
    discountedPrice: 20000,
  },
  {
    name: '17 AH New Power Battery',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/carpics.svg',
    rating: 3.7,
    reviews: 10,
    promo: false,
    sold: 12,
    total: 40,
    originalPrice: 35000,
    discountedPrice: 31000,
  },
]

const products = [
  {
    name: 'Universal Car Horn',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/tireimage.svg',
    rating: 4.5,
    reviews: 24,
    promo: true,
    sold: 18,
    total: 35,
    originalPrice: 28000,
    discountedPrice: 20000,
  },
  {
    name: '17 AH New Power Battery',
    promotext: 'Best Sale',
    image: '/src/assets/svgs/carpics.svg',
    rating: 3.7,
    reviews: 10,
    promo: false,
    sold: 12,
    total: 40,
    originalPrice: 35000,
    discountedPrice: 31000,
  },
  {
    name: '215/60/16 Maxtrek Tyre',
    image: '/src/assets/svgs/tireimage.svg',
    rating: 5,
    promotext: 'Best Sale',
    reviews: 33,
    sold: 27,
    promo: true,
    total: 30,
    originalPrice: 50000,
    discountedPrice: 47000,
  },
  {
    name: 'Car Wiper Blade',
    image: '/src/assets/svgs/tireimage.svg',
    rating: 2.5,
    promotext: 'Best Sale',
    reviews: 8,
    sold: 5,
    promo: false,
    total: 25,
    originalPrice: 5000,
    discountedPrice: 3500,
  },
  {
    name: 'Engine Oil Premium',
    image: '/src/assets/svgs/carpics.svg',
    rating: 4.0,
    reviews: 15,
    promotext: 'Best Sale',
    sold: 20,
    promo: true,
    total: 45,
    originalPrice: 12000,
    discountedPrice: 10000,
  },
]

const brands = [
  {
    image: '/src/assets/svgs/hondapics.svg',
  },
  {
    image: '/src/assets/svgs/nissanpics.svg',
  },
  {
    image: '/src/assets/svgs/jaguarpics.svg',
  },
  {
    image: '/src/assets/svgs/minipics.svg',
  },
  {
    image: '/src/assets/svgs/jeeppics.svg',
  },
  {
    image: '/src/assets/svgs/audipics.svg',
  },
  {
    image: '/src/assets/svgs/bpics.svg',
  },
  {
    image: '/src/assets/svgs/infinitypics.svg',
  },
]

const productcard = [
  {
    bgImage: 'url(/images/cardpic1.svg)',
    title: 'Tyres',
    image: '/src/assets/svgs/tirecomp.svg',
  },
  {
    bgImage: 'url(/images/productcard2.svg)',
    title: 'Batteries',
    image: '/src/assets/svgs/tirecomp.svg',
  },
  {
    bgImage: 'url(/images/productcard3.svg)',
    title: 'Fluids',
    image: '/src/assets/svgs/tirecomp.svg',
  },
  {
    bgImage: 'url(/images/productcard4.svg)',
    title: 'Audio & DND',
    image: '/src/assets/svgs/tirecomp.svg',
  },
  {
    bgImage: 'url(/images/productcard5.svg)',
    title: 'Accessories',
    image: '/src/assets/svgs/tirecomp.svg',
  },
  {
    bgImage: 'url(/images/productcard6.svg)',
    title: 'Vehicles',
    image: '/src/assets/svgs/tirecomp.svg',
  },
]
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
