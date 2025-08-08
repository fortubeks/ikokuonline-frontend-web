<template>
  <Layout title="My Profile">
    <div class="container mx-auto px-4 py-6">
      <!-- Profile Header -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div class="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
          <div class="relative flex items-center md:block">
            <img
              :src="user.image"
              :alt="user.name"
              class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
            <ShieldCheckIcon
              v-if="user.verified"
              class="absolute bottom-0 right-0 bg-primary-500 rounded-full p-1 text-white"
            />
          </div>
          <div class="ml-4 flex-1">
            <h1 class="text-xl font-bold">{{ user.name }}</h1>
            <p class="text-gray-600">{{ user.email }}</p>
            <p class="text-gray-600">{{ user.phone }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ user.joinDate }}</p>
          </div>
          <a
            href="/edit-profile"
            class="mt-4 md:mt-0 py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors w-full md:w-auto text-center"
          >
            Edit Profile
          </a>
        </div>
      </div>

      <!-- Menu List -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 divide-y">
          <template v-for="(item, i) in menuItems" :key="i">
            <component
              :is="item.onClick ? 'button' : 'a'"
              :href="!item.onClick ? item.path : null"
              @click="item.onClick"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div class="flex items-center">
                <component :is="item.icon" />
                <span class="ml-3 font-medium">{{ item.title }}</span>
              </div>
              <div class="flex items-center">
                <span
                  v-if="item.count !== undefined && item.count > 0"
                  class="mr-3 bg-primary-500 text-white text-xs rounded-full px-2 py-1"
                  >{{ item.count }}</span
                >
                <ChevronRightIcon class="w-5 h-5 text-gray-400" />
              </div>
            </component>
          </template>
          <button
            class="w-full flex items-center p-4 text-red-500 hover:bg-gray-50 transition-colors"
            @click="handleLogout"
          >
            <LogOutIcon class="w-5 h-5 mr-3" />
            <span class="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '../../layouts/Layout.vue'
import {
  SettingsIcon,
  ShoppingBagIcon,
  HeartIcon,
  MessageCircleIcon,
  LogOutIcon,
  ChevronRightIcon,
  BellIcon,
  CreditCardIcon,
  MapPinIcon,
  ShieldCheckIcon,
  HelpCircleIcon,
} from 'lucide-vue-next'

const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+234 801 234 5678',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  joinDate: 'Member since June 2023',
  verified: true,
})

const wishlistCount = ref(0)
const orderCount = ref(5)
const messageCount = ref(3)
const notificationCount = ref(2)

onMounted(() => {
  const wish = JSON.parse(localStorage.getItem('wishlist') || '[]')
  wishlistCount.value = wish.length

  setTimeout(() => {
    orderCount.value = Math.floor(Math.random() * 10) + 1
    messageCount.value = Math.floor(Math.random() * 5)
    notificationCount.value = Math.floor(Math.random() * 8)
  }, 1000)
})

const menuItems = [
  { title: 'My Orders', icon: ShoppingBagIcon, path: '/account/orders', count: orderCount },
  { title: 'Wishlist', icon: HeartIcon, path: '/wishlist', count: wishlistCount },
  {
    title: 'Messages',
    icon: MessageCircleIcon,
    path: '/messages',
    count: messageCount,
    onClick: () => window.open('https://wa.me/2348123456789', '_blank'),
  },
  { title: 'Payment Methods', icon: CreditCardIcon, path: '/payment-methods' },
  { title: 'Addresses', icon: MapPinIcon, path: '/addresses' },
  { title: 'Notifications', icon: BellIcon, path: '/notifications', count: notificationCount },
  { title: 'Security', icon: ShieldCheckIcon, path: '/security' },
  { title: 'Help & Support', icon: HelpCircleIcon, path: '/help' },
  { title: 'Settings', icon: SettingsIcon, path: '/settings' },
]

const handleLogout = () => {
  setTimeout(() => {
    window.location.href = '/'
  }, 1000)
}
</script>

<style scoped></style>
