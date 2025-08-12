<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Car Brands" />

    <div class="!container !mx-auto !px-4 !py-6">
      <h1 class="!text-2xl !font-bold !mb-6">All Car Brands</h1>

      <div class="!bg-white !rounded-lg !shadow-sm !p-6">
        <div class="!grid !grid-cols-2 sm:!grid-cols-3 md:!grid-cols-4 lg:!grid-cols-5 !gap-6">
          <div
            v-for="brand in featuredBrands"
            :key="brand.id"
            class="!flex !flex-col !items-center !cursor-pointer group"
            @click="goToBrand(brand.id)"
          >
            <div class="!flex !items-center !justify-center !w-20 !h-20 !bg-gray-100 !rounded-full hover:!bg-gray-200 !transition-colors group-hover:!shadow-md">
              <img :src="brand.icon" :alt="brand.name" class="!w-12 !h-12" />
            </div>
            <span class="!mt-2 !text-center !font-medium group-hover:!text-primary-500 !transition-colors">
              {{ brand.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import { featuredBrands } from '../../components/utils/homepagev3utils/data'

const router = useRouter()

const goToBrand = (brandId) => {
  router.push(`/brand/${brandId}`)
}
</script>
