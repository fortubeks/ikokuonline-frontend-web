<template>
  <section class="w-full flex flex-col gap-[32px] min-h-[50vh]">
    <BannerSection :banners="bannerItems" />

    <FeaturedSection />

    <PromotionalBanners />

    <FlashSalesToday />

    <Salealert />

    <RecommendSection />

    <OfferSection />

    <HotDealsSection />

    <DealsEnd />

    <ProductSection />

    <BrandSection />

    <BestSellSEction />

    <NewsletterSection />

    <FooterSection />
  </section>
</template>

<script setup>
// import AddToCartCard from '@/components/utils/AddToCartCard.vue'
// import profilePics from '@/assets/svgs/profilepics.svg'
// import heartPics from '@/assets/svgs/heartpics.svg'
// import comparepics from '@/assets/svgs/comparepics.svg'
// import cartPics from '@/assets/svgs/cartpics.svg'
// import tirepics from '@/assets/svgs/tirepics.svg'
// import cartticon from '@/assets/svgs/cartticon.svg'

// import { ref } from 'vue'
// import TiresComponent from '@/components/utils/TiresComponent.vue'
// import AllCategory from '@/components/utils/AllCategory.vue'
// import SearchInput from '@/components/utils/SearchInput.vue'
// import DealsWeek from '../homepage/DealsWeek.vue'
// import TrendingProduct from '../homepage/TrendingProduct.vue'
// import BrandCarousel from '../homepage/BrandCarousel.vue'
// import FeaturedProductsCard from '@/components/utils/FeaturedProductsCard.vue'
// import FeaturedDeals from '../homepage/FeaturedDeals.vue'
import BannerSection from '../homepages/BannerSection.vue'
import FeaturedSection from '../homepages/FeaturedSection.vue'
import PromotionalBanners from '../homepages/PromotionalBanners.vue'
import FlashSalesToday from '../homepages/FlashSalesToday.vue'
import Salealert from '../homepages/Salealert.vue'
import RecommendSection from '../homepages/RecommendSection.vue'
import OfferSection from '../homepages/OfferSection.vue'
import HotDealsSection from '../homepages/HotDealsSection.vue'
import DealsEnd from '../homepages/DealsEnd.vue'
import ProductSection from '../homepages/ProductSection.vue'
import BrandSection from '../homepages/BrandSection.vue'
import BestSellSEction from '../homepages/BestSellSEction.vue'
import NewsletterSection from '../homepages/NewsletterSection.vue'
import FooterSection from '../homepages/FooterSection.vue'

// const images = [tirepics, tirepics, tirepics]
// const activeIndex = ref(0)

// const productsdeals = [
//   {
//     name: 'Universal Car Horn',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 4.5,
//     reviews: 24,
//     promo: true,
//     sold: 18,
//     total: 35,
//     originalPrice: 28000,
//     discountedPrice: 20000,
//   },
//   {
//     name: '17 AH New Power Battery',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 3.7,
//     reviews: 10,
//     promo: false,
//     sold: 12,
//     total: 40,
//     originalPrice: 35000,
//     discountedPrice: 31000,
//   },
//   {
//     name: 'Universal Car Horn',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 4.5,
//     reviews: 24,
//     promo: true,
//     sold: 18,
//     total: 35,
//     originalPrice: 28000,
//     discountedPrice: 20000,
//   },
//   {
//     name: '17 AH New Power Battery',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 3.7,
//     reviews: 10,
//     promo: false,
//     sold: 12,
//     total: 40,
//     originalPrice: 35000,
//     discountedPrice: 31000,
//   },
// ]

// const products = [
//   {
//     name: 'Universal Car Horn',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/tireimage.svg',
//     rating: 4.5,
//     reviews: 24,
//     promo: true,
//     sold: 18,
//     total: 35,
//     originalPrice: 28000,
//     discountedPrice: 20000,
//   },
//   {
//     name: '17 AH New Power Battery',
//     promotext: 'Best Sale',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 3.7,
//     reviews: 10,
//     promo: false,
//     sold: 12,
//     total: 40,
//     originalPrice: 35000,
//     discountedPrice: 31000,
//   },
//   {
//     name: '215/60/16 Maxtrek Tyre',
//     image: '/src/assets/svgs/tireimage.svg',
//     rating: 5,
//     promotext: 'Best Sale',
//     reviews: 33,
//     sold: 27,
//     promo: true,
//     total: 30,
//     originalPrice: 50000,
//     discountedPrice: 47000,
//   },
//   {
//     name: 'Car Wiper Blade',
//     image: '/src/assets/svgs/tireimage.svg',
//     rating: 2.5,
//     promotext: 'Best Sale',
//     reviews: 8,
//     sold: 5,
//     promo: false,
//     total: 25,
//     originalPrice: 5000,
//     discountedPrice: 3500,
//   },
//   {
//     name: 'Engine Oil Premium',
//     image: '/src/assets/svgs/carpics.svg',
//     rating: 4.0,
//     reviews: 15,
//     promotext: 'Best Sale',
//     sold: 20,
//     promo: true,
//     total: 45,
//     originalPrice: 12000,
//     discountedPrice: 10000,
//   },
// ]

const bannerItems = [
  {
    title: 'Daily Grocery Order and Get',
    highlight: 'Express',
    subheading: 'Save up to 50% off on your first order',
    buttonText: 'Explore Shop',
    buttonLink: 'shop.html',
    price: '$60.99',
    image: 'assets/images/thumbs/banner-img1.png',
  },
  {
    title: 'Fresh Vegetables with',
    highlight: 'Free Shipping',
    subheading: 'Only Today’s Deal',
    buttonText: 'Shop Now',
    buttonLink: 'shop.html',
    price: '$39.99',
    image: 'assets/images/thumbs/banner-img2.png',
  },
  {
    title: 'Get Best Quality at',
    highlight: 'Low Price',
    subheading: 'Flash Sale',
    buttonText: 'Grab Now',
    buttonLink: 'shop.html',
    price: '$29.50',
    image: 'assets/images/thumbs/banner-img3.png',
  },
]

// const brands = [
//   {
//     image: '/src/assets/svgs/hondapics.svg',
//   },
//   {
//     image: '/src/assets/svgs/nissanpics.svg',
//   },
//   {
//     image: '/src/assets/svgs/jaguarpics.svg',
//   },
//   {
//     image: '/src/assets/svgs/minipics.svg',
//   },
//   {
//     image: '/src/assets/svgs/jeeppics.svg',
//   },
//   {
//     image: '/src/assets/svgs/audipics.svg',
//   },
//   {
//     image: '/src/assets/svgs/bpics.svg',
//   },
//   {
//     image: '/src/assets/svgs/infinitypics.svg',
//   },
// ]

// const productcard = [
//   {
//     bgImage: 'url(/images/cardpic1.svg)',
//     title: 'Tyres',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
//   {
//     bgImage: 'url(/images/productcard2.svg)',
//     title: 'Batteries',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
//   {
//     bgImage: 'url(/images/productcard3.svg)',
//     title: 'Fluids',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
//   {
//     bgImage: 'url(/images/productcard4.svg)',
//     title: 'Audio & DND',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
//   {
//     bgImage: 'url(/images/productcard5.svg)',
//     title: 'Accessories',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
//   {
//     bgImage: 'url(/images/productcard6.svg)',
//     title: 'Vehicles',
//     image: '/src/assets/svgs/tirecomp.svg',
//   },
// ]
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
