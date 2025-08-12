<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <div class="!bg-white !shadow-md !p-4">
      <h1 class="!text-xl !font-bold">{{ seller?.name || 'Seller Profile' }}</h1>
    </div>

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Loading -->
      <div v-if="isLoading" class="!flex !justify-center !items-center !py-20">
        <div class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"></div>
      </div>

      <!-- Not Found -->
      <div v-else-if="!seller" class="!text-center !py-12">
        <UserIcon class="!w-16 !h-16 !text-gray-300 !mx-auto !mb-4" />
        <h2 class="!text-xl !font-bold !mb-2">Seller not found</h2>
        <p class="!text-gray-600 !mb-6">Seller may not exist or was removed</p>
        <router-link to="/" class="!bg-primary-500 !text-white !px-6 !py-2 !rounded-md hover:!bg-primary-600">
          Go to Homepage
        </router-link>
      </div>

      <!-- Seller Profile -->
      <div v-else>
        <!-- Seller Card -->
        <div class="!bg-white !rounded-lg !shadow-sm !mb-6 !p-6">
          <div class="!flex !items-center">
            <img :src="seller.image" alt="seller.name" class="!w-20 !h-20 !rounded-full !object-cover" />
            <div class="!ml-4 !flex-1">
              <div class="!flex !items-center">
                <h2 class="!text-xl !font-bold">{{ seller.name }}</h2>
                <div v-if="seller.isVerified" class="!ml-2 !text-blue-500 !flex !items-center">
                  <CheckCircleIcon class="!w-5 !h-5 !mr-1" />
                  <span class="!text-sm">Verified Seller</span>
                </div>
              </div>
              <div class="!flex !items-center">
                <StarIcon class="!w-4 !h-4 !text-yellow-400 !fill-yellow-400" />
                <span class="!ml-1 !font-bold">{{ seller.rating }}</span>
                <span class="!ml-1 !text-gray-500">({{ seller.reviewCount }} reviews)</span>
              </div>
              <div class="!text-sm !text-gray-500 !flex !items-center">
                <MapPinIcon class="!w-4 !h-4 !mr-1" />
                <span>{{ seller.location }}</span>
              </div>
              <p class="!text-xs !text-gray-500 !mt-1">{{ seller.memberSince }}</p>
            </div>
          </div>

          <div class="!grid !grid-cols-2 !gap-4 !mt-6">
            <button class="!py-2 !bg-green-500 !text-white !rounded-md !font-medium !flex !items-center !justify-center"
              @click="openWhatsApp">
              <MessageCircleIcon class="!w-4 !h-4 !mr-2" /> WhatsApp
            </button>
            <button
              class="!py-2 !border !border-primary-500 !text-primary-500 !rounded-md !flex !items-center !justify-center"
              @click="showPhone = !showPhone">
              <PhoneIcon class="!w-4 !h-4 !mr-2" />
              {{ showPhone ? seller.phone : 'Call Seller' }}
            </button>
          </div>

          <!-- Stats -->
          <div class="!grid !grid-cols-3 !border-t !mt-6">
            <div class="!text-center !p-3 !border-r">
              <div class="!text-lg !text-primary-500 !font-bold">{{ seller.totalSales }}</div>
              <div class="!text-xs !text-gray-500">Products Sold</div>
            </div>
            <div class="!text-center !p-3 !border-r">
              <div class="!text-lg !text-primary-500 !font-bold">{{ seller.responseRate }}%</div>
              <div class="!text-xs !text-gray-500">Response Rate</div>
            </div>
            <div class="!text-center !p-3">
              <div class="!text-lg !text-primary-500 !font-bold">{{ seller.products.length }}</div>
              <div class="!text-xs !text-gray-500">Listings</div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="!flex !border-b !mb-4">
          <button @click="activeTab = 'products'"
            :class="[activeTab === 'products' ? '!text-primary-500 !border-b-2 !border-primary-500' : '!text-gray-500', '!flex-1 !py-3 !font-medium !text-center']">
            Products
          </button>
          <button @click="activeTab = 'about'"
            :class="[activeTab === 'about' ? '!text-primary-500 !border-b-2 !border-primary-500' : '!text-gray-500', '!flex-1 !py-3 !font-medium !text-center']">
            About
          </button>
        </div>

        <!-- Products -->
        <div v-if="activeTab === 'products'">
          <div class="!flex !justify-between !items-center !mb-4">
            <h3 class="!text-lg !font-bold">All Products ({{ seller.products.length }})</h3>
            <div class="!flex !space-x-2">
              <button @click="view = 'grid'"
                :class="[view === 'grid' ? '!bg-primary-100 !text-primary-500' : '!text-gray-400', '!p-1.5 !rounded-md']">
                <GridIcon class="!w-5 !h-5" />
              </button>
              <button @click="view = 'list'"
                :class="[view === 'list' ? '!bg-primary-100 !text-primary-500' : '!text-gray-400', '!p-1.5 !rounded-md']">
                <ListIcon class="!w-5 !h-5" />
              </button>
            </div>
          </div>

          <div :class="view === 'grid' ? '!grid !grid-cols-2 md:!grid-cols-3 !gap-4' : '!flex !flex-col !space-y-3'">
            <div v-for="product in seller.products" :key="product.id" class="!bg-white !rounded !p-4 !shadow-sm">
              <img :src="product.image" alt="" class="!w-full !h-40 !object-cover !mb-2 !rounded" />
              <h4 class="!font-medium">{{ product.title }}</h4>
              <p class="!text-primary-500 !font-bold">₦{{ product.price }}</p>
              <p class="!text-sm !text-gray-500">{{ product.location }}</p>
            </div>
          </div>
        </div>

        <!-- About -->
        <div v-else class="!bg-white !rounded-lg !shadow-sm !p-4">
          <h3 class="!font-bold !text-lg !mb-2">About {{ seller.name }}</h3>
          <p class="!text-gray-600 !mb-4">{{ seller.description }}</p>
          <div class="!space-y-3">
            <div class="!flex">
              <ClockIcon class="!w-5 !h-5 !text-primary-500 !mr-2" />
              <span>Response time: {{ seller.responseTime }}</span>
            </div>
            <div class="!flex">
              <ShieldCheckIcon class="!w-5 !h-5 !text-primary-500 !mr-2" />
              <span v-if="seller.isVerified">Seller is verified</span>
              <span v-else>Not verified yet</span>
            </div>
            <div class="!flex">
              <TagIcon class="!w-5 !h-5 !text-primary-500 !mr-2" />
              <span>Specialized in Toyota, Honda, Mercedes, BMW</span>
            </div>
            <div class="!flex">
              <ShoppingBagIcon class="!w-5 !h-5 !text-primary-500 !mr-2" />
              <span>Mon–Fri: 9–6 | Sat: 10–4 | Sun: Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="!bg-white !p-4 !fixed !bottom-0 !w-full !border-t text-center">
      <p class="!text-xs !text-gray-400">Bottom Navigation Placeholder</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import {
  UserIcon,
  CheckCircleIcon,
  MapPinIcon,
  StarIcon,
  MessageCircleIcon,
  PhoneIcon,
  ClockIcon,
  ShieldCheckIcon,
  TagIcon,
  ShoppingBagIcon,
  GridIcon,
  ListIcon
} from 'lucide-vue-next'

const route = useRoute()
const seller = ref(null)
const isLoading = ref(true)
const showPhone = ref(false)
const activeTab = ref('products')
const view = ref('grid')

onMounted(() => {
  setTimeout(() => {
    seller.value = {
      id: route.params.id || 's1',
      name: 'AutoParts Nigeria',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      reviewCount: 42,
      responseRate: 95,
      responseTime: 'Replies in 1-2 hours',
      memberSince: 'Member since June 2022',
      location: 'Ikeja, Lagos',
      isVerified: true,
      totalSales: 156,
      description:
        'We are a leading supplier of genuine and OEM car parts in Nigeria.',
      phone: '+234 812 345 6789',
      whatsapp: '+2348123456789',
      products: Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Car Part ${i + 1}`,
        price: 50000 + i * 10000,
        image: 'https://via.placeholder.com/150',
        location: 'Lagos'
      }))
    }
    isLoading.value = false
  }, 1000)
})

const openWhatsApp = () => {
  const msg = `Hello ${seller.value.name}, I'm interested in your products.`
  const phone = seller.value.whatsapp.replace(/\D/g, '')
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
}
</script>

<style scoped>
/* No extra styles; Tailwind with `!` is used to override Bootstrap */
</style>
