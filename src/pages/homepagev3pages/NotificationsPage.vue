<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Notifications" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!flex !justify-between !items-center !mb-4">
        <h2 class="!text-lg !font-bold">Your Notifications</h2>
        <button
          v-if="unreadCount > 0"
          class="!text-sm !text-primary-500 hover:!underline"
          @click="markAllRead"
        >
          Mark all as read
        </button>
      </div>

      <!-- Filter buttons -->
      <div class="!flex !overflow-x-auto !space-x-2 !mb-4 !pb-2">
        <button
          v-for="option in ['all', 'order', 'price', 'message']"
          :key="option"
          :class="[
            '!px-4 !py-2 !rounded-full !whitespace-nowrap',
            filter === option ? '!bg-primary-500 !text-white' : '!bg-white !text-gray-700'
          ]"
          @click="filter = option"
        >
          {{ option === 'all' ? 'All' : capitalize(option) }}
        </button>
      </div>

      <!-- No notifications -->
      <div v-if="filteredNotifications.length === 0" class="!bg-white !rounded-lg !shadow-sm !p-8 !text-center">
        <BellIcon class="!w-12 !h-12 !text-gray-300 !mx-auto !mb-3" />
        <h3 class="!text-lg !font-medium !mb-1">No notifications</h3>
        <p class="!text-gray-500">You don't have any notifications yet</p>
      </div>

      <!-- Notification list -->
      <div v-else class="!space-y-3">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          :class="['!bg-white !rounded-lg !shadow-sm !p-4 !flex', !notification.read ? '!border-l-4 !border-primary-500' : '']"
        >
          <div class="!mr-4">
            <component :is="getIcon(notification.type)" class="!w-6 !h-6" />
          </div>
          <div class="!flex-1">
            <div class="!flex !justify-between">
              <h3 :class="['!font-medium', !notification.read ? '!text-black' : '!text-gray-700']">
                {{ notification.title }}
              </h3>
              <span class="!text-xs !text-gray-500">{{ notification.time }}</span>
            </div>
            <p :class="['!text-sm !mt-1', !notification.read ? '!text-gray-800' : '!text-gray-500']">
              {{ notification.message }}
            </p>
          </div>
          <button
            v-if="!notification.read"
            class="!ml-2 !text-primary-500 hover:!text-primary-600"
            @click="markRead(notification.id)"
          >
            <CheckIcon class="!w-5 !h-5" />
          </button>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'

import {
  BellIcon,
  CheckIcon,
  PackageIcon,
  TruckIcon,
  TagIcon
} from 'lucide-vue-next'

const notifications = ref([
  {
    id: '1',
    title: 'Your order has been shipped',
    message: 'Order #12345 has been shipped and will arrive in 2-3 days.',
    time: '2 hours ago',
    read: false,
    type: 'order'
  },
  {
    id: '2',
    title: 'Price drop on your wishlist item',
    message: 'Toyota Camry Headlights price has dropped by 15%.',
    time: '1 day ago',
    read: false,
    type: 'price'
  },
  {
    id: '3',
    title: 'Order delivered',
    message: 'Your order #12089 has been delivered. Please rate your experience.',
    time: '3 days ago',
    read: true,
    type: 'order'
  },
  {
    id: '4',
    title: 'New message from seller',
    message: 'AutoParts Nigeria has sent you a message regarding your inquiry.',
    time: '1 week ago',
    read: true,
    type: 'message'
  }
])

const filter = ref('all')

const filteredNotifications = computed(() => {
  return filter.value === 'all'
    ? notifications.value
    : notifications.value.filter(n => n.type === filter.value)
})

const unreadCount = computed(() =>
  notifications.value.filter(n => !n.read).length
)

function markAllRead() {
  notifications.value = notifications.value.map(n => ({ ...n, read: true }))
}

function markRead(id) {
  notifications.value = notifications.value.map(n =>
    n.id === id ? { ...n, read: true } : n
  )
}

function getIcon(type) {
  switch (type) {
    case 'order':
      return PackageIcon
    case 'delivery':
      return TruckIcon
    case 'price':
      return TagIcon
    default:
      return BellIcon
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
