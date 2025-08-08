<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :show-back-button="true" title="My Orders" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
        <!-- Search & Filter -->
        <div class="!p-4 !border-b">
          <div class="!flex !items-center !space-x-2 !mb-4">
            <div class="!relative !flex-1">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search orders..."
                class="!w-full !pl-10 !pr-4 !py-2 !border !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
              />
              <SearchIcon class="!absolute !left-3 !top-2.5 !w-5 !h-5 !text-gray-400" />
            </div>
            <button
              class="!relative !px-4 !py-2 !border !rounded-md !bg-gray-50 hover:!bg-gray-100"
              @click="() => {}"
            >
              <FilterIcon class="!w-4 !h-4 !mr-2" />
              <span>Filter</span>
            </button>
          </div>

          <div class="!flex !overflow-x-auto !space-x-2 !pb-2">
            <button
              v-for="opt in filters"
              :key="opt.value"
              @click="activeFilter = opt.value"
              :class="[
                '!px-4 !py-1.5 !rounded-full !whitespace-nowrap',
                activeFilter === opt.value
                  ? '!bg-primary-500 !text-white'
                  : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200',
              ]"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Orders List -->
        <div v-if="isLoading" class="!flex !justify-center !py-12">
          <div
            class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"
          ></div>
        </div>

        <div v-else-if="!filteredOrders.length" class="!py-12 !text-center">
          <PackageIcon class="!w-16 !h-16 !mx-auto !text-gray-300 !mb-4" />
          <h3 class="!text-lg !font-bold !text-gray-700 !mb-2">No Orders Found</h3>
          <p class="!text-gray-500">
            {{
              searchQuery || activeFilter !== 'all'
                ? 'Try adjusting your filters'
                : "You haven't placed any orders yet"
            }}
          </p>
          <button
            v-if="searchQuery || activeFilter !== 'all'"
            class="!mt-4 !px-4 !py-2 !text-primary-500 hover:!underline"
            @click="resetFilters"
          >
            Clear filters
          </button>
          <RouterLink
            v-else
            to="/"
            class="!mt-4 !inline-block !px-6 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600"
          >
            Start Shopping
          </RouterLink>
        </div>

        <div v-else class="!divide-y">
          <div v-for="order in filteredOrders" :key="order.id" class="!p-4 hover:!bg-gray-50">
            <div class="!flex !justify-between !items-start !mb-4">
              <div>
                <h3 class="!font-bold">{{ order.id }}</h3>
                <p class="!text-sm !text-gray-500">Placed on {{ formatDate(order.date) }}</p>
              </div>
              <div
                :class="[
                  '!flex !items-center !px-3 !py-1 !rounded-full',
                  getStatus(order.status).color,
                ]"
              >
                <component :is="getStatus(order.status).icon" />
                <span class="!ml-1 !text-sm !font-medium">{{ getStatus(order.status).text }}</span>
              </div>
            </div>

            <div class="!space-y-3">
              <div v-for="item in order.items" :key="item.id" class="!flex !items-center">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="!w-16 !h-16 !object-cover !rounded"
                />
                <div class="!ml-3 !flex-1">
                  <RouterLink
                    :to="`/product/${item.id}`"
                    class="!font-medium hover:!text-primary-500 !line-clamp-1"
                  >
                    {{ item.title }}
                  </RouterLink>
                  <p class="!text-sm !text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <div class="!text-right">
                  <p class="!font-bold !text-primary-500">₦{{ item.price.toLocaleString() }}</p>
                </div>
              </div>
            </div>

            <div v-if="order.status === 'shipped'" class="!mt-3 !p-3 !bg-amber-50 !rounded-md">
              <div class="!flex !items-start">
                <TruckIcon class="!w-5 !h-5 !text-amber-500 !mt-0.5 !mr-2" />
                <div>
                  <p class="!text-sm !font-medium">Your order is on the way!</p>
                  <p class="!text-xs !text-gray-600">Tracking Number: {{ order.trackingNumber }}</p>
                  <p class="!text-xs !text-gray-600">
                    Estimated Delivery: {{ formatDate(order.deliveryDate) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="!mt-4 !flex !justify-between !items-center">
              <div>
                <p class="!text-sm !text-gray-500">Total</p>
                <p class="!font-bold !text-lg">₦{{ order.total.toLocaleString() }}</p>
              </div>
              <RouterLink
                :to="`/account/orders/${order.id}`"
                class="!flex !items-center !text-primary-500 hover:!underline"
              >
                <span class="!mr-1">View Details</span>
                <ChevronRightIcon class="!w-4 !h-4" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import {
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
} from 'lucide-vue-next'

const orders = ref([])
const filteredOrders = ref([])
const searchQuery = ref('')
const activeFilter = ref('all')
const isLoading = ref(true)

const filters = [
  { label: 'All Orders', value: 'all' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
]

// Simulate fetching
onMounted(() => {
  setTimeout(() => {
    orders.value = [
      // ...mock orders array as in source...
    ]
    filteredOrders.value = orders.value
    isLoading.value = false
  }, 1000)
})

onMounted(() => {
  filterOrders()
})
// eslint-disable-next-line no-undef
watch([searchQuery, activeFilter, orders], filterOrders)

function filterOrders() {
  let res = [...orders.value]
  if (activeFilter.value !== 'all') {
    res = res.filter((o) => o.status === activeFilter.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    res = res.filter(
      (o) =>
        o.id.toLowerCase().includes(q) || o.items.some((i) => i.title.toLowerCase().includes(q)),
    )
  }
  filteredOrders.value = res
}

function resetFilters() {
  searchQuery.value = ''
  activeFilter.value = 'all'
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getStatus(status) {
  switch (status) {
    case 'processing':
      return { color: '!bg-blue-100 !text-blue-600', icon: ClockIcon, text: 'Processing' }
    case 'shipped':
      return { color: '!bg-amber-100 !text-amber-600', icon: TruckIcon, text: 'Shipped' }
    case 'delivered':
      return { color: '!bg-green-100 !text-green-600', icon: CheckCircleIcon, text: 'Delivered' }
    case 'cancelled':
      return { color: '!bg-red-100 !text-red-600', icon: XCircleIcon, text: 'Cancelled' }
    default:
      return { color: '!bg-gray-100 !text-gray-600', icon: ClockIcon, text: status }
  }
}
</script>
