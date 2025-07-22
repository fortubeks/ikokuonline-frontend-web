<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="pt-[85px] font-sora bg-[#000000] flex flex-col gap-[76px] w-full h-fit">
    <div class="w-full lg:px-[100px] flex lg:flex-row flex-col gap-[80px]">
      <!-- Logo & Description -->
      <div class="flex lg:flex-row flex-col lg:gap-[70px]">
        <div class="h-full w-[420px] flex flex-col gap-6">
          <img :src="logoWhite" alt="Logo" class="w-[116px] h-[59px] object-contain" />
          <p class="flex flex-col gap-6 text-[#FFFFFF] text-base font-normal">
            Ikokuonline.com is the No.1 online shop for your car batteries, tyres, car parts and accessories in Nigeria.
            <span>
              We aim to deliver the best competitive price while assuring you of genuine brands, best quality products, excellent customer service and fast delivery nationwide.
            </span>
          </p>
        </div>

    
        <div
          v-for="section in footerSections"
          :key="section.title"
          class="h-full flex flex-col items-start gap-8 w-fit"
        >
          <h1 class="text-lg font-semibold text-[#FFFFFF]">{{ section.title }}</h1>
          <div class="flex flex-col items-start gap-6">
            <RouterLink
              v-for="link in section.links"
              :key="link.label"
              :to="link.to"
              class="text-base font-normal text-[#FFFFFF] hover:underline"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>
      </div>

      
      <div class="w-[280px] text-white flex flex-col gap-4 h-full">
        <div
          v-for="(item, index) in contactInfo"
          :key="index"
          class="flex gap-2 items-center"
        >
          <img :src="item.icon" :alt="item.alt" />
          <button class="text-left">{{ item.text }}</button>
        </div>

        <div class="flex gap-2 w-full">
          <a v-for="(icon, index) in socialIcons" :key="index" href="#" target="_blank" rel="noopener noreferrer">
            <img :src="icon.src" :alt="icon.alt" />
          </a>
        </div>
      </div>
    </div>

    
    <div class="h-fit lg:px-[120px] bg-[#7D7D7D]">
      <div class="flex lg:flex-row flex-col  justify-between items-center py-[33.5px]">
        <p class="text-normal text-sm text-[#FFFFFF]">
          Ikokuonline © {{ currentYear }}. All Rights Reserved.
        </p>

        <div class="flex lg:flex-row flex-col items-center gap-2">
          <p class="text-normal text-sm text-[#FFFFFF]">We Are Accepting</p>
          <img :src="paymenticon" alt="payment" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import logoWhite from '@/assets/images/logo/ikokuonline_white_logo.png'
import callicon from "@/assets/svgs/callicon.svg"
import messageicon from "@/assets/svgs/messageicon.svg"
import locationicon from "@/assets/svgs/locationicon.svg"
import facebookicon from "@/assets/svgs/facebookicon.svg"
import twittericon from "@/assets/svgs/twittericon.svg"
import instagramicon from "@/assets/svgs/instagramicon.svg"
import linkednicon from "@/assets/svgs/linkednicon.svg"
import paymenticon from "@/assets/svgs/paymenticon.svg"

const currentYear = new Date().getFullYear()

const footerSections = [
  {
    title: "Information",
    links: [
      { label: "My Account", to: "/account" },
      { label: "Become a Vendor", to: "/vendor" },
      { label: "Return Policy", to: "/return-policy" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Order History", to: "/orders" },
      { label: "Product Support", to: "/support" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Tyres", to: "/tyres" },
      { label: "Batteries", to: "/batteries" },
      { label: "Fluids and Lubricants", to: "/fluids" },
      { label: "Accessories", to: "/accessories" },
      { label: "Audio and DND", to: "/audio" },
      { label: "Replacement parts", to: "/replacement" },
    ],
  },
]

const contactInfo = [
  { icon: callicon, alt: "call", text: "+234 809 083 9412" },
  { icon: messageicon, alt: "message", text: "support@ikokuonline.com" },
  { icon: locationicon, alt: "location", text: "Port Harcourt, Rivers State" },
]

const socialIcons = [
  { src: facebookicon, alt: "facebook" },
  { src: twittericon, alt: "twitter" },
  { src: instagramicon, alt: "instagram" },
  { src: linkednicon, alt: "linkedin" },
]
</script>

<style scoped>

</style>
