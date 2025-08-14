<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="!space-y-6">
    <!-- Header -->
    <div class="!flex !items-center !justify-between">
      <h1 class="!text-2xl !font-semibold !text-gray-900">Orders</h1>
      <router-link
        to="/dashboard/orders/add"
        class="!inline-flex !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !shadow-sm !text-white !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
      >
        <PlusIcon class="!h-5 !w-5 !mr-2" />
        Add Order
      </router-link>
    </div>

    <!-- Search & Filter -->
    <div class="!bg-white !shadow !rounded-lg">
      <div class="!p-4 !border-b !border-gray-200">
        <div class="!flex !flex-col md:!flex-row md:!items-center md:!justify-between !gap-4">
          <div class="!relative !rounded-md !shadow-sm !flex-grow">
            <div
              class="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none"
            >
              <SearchIcon class="!h-5 !w-5 !text-gray-400" />
            </div>
            <input
              v-model="searchTerm"
              type="text"
              class="focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !pl-10 !sm:text-sm !border-gray-300 !rounded-md"
              placeholder="Search orders by ID, customer name or email..."
            />
          </div>

          <!-- Status Filter -->
          <div class="!flex !items-center !w-full md:!w-auto">
            <FilterIcon class="!h-5 !w-5 !text-gray-400 !mr-2" />
            <!-- <CustomDropdown
              :options="statusOptions"
              v-model="statusFilter"
              class="!w-full md:!w-56"
              placeholder="Filter by status"
            /> -->

            <select
              v-model="statusFilter"
              class="!block !w-full !pl-3 !pr-10 !py-2 !text-base !border-gray-300 !focus:outline-none !focus:ring-blue-500 !focus:border-blue-500 sm:!text-sm !rounded-md"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="!overflow-x-auto">
        <table class="!min-w-full !divide-y !divide-gray-200">
          <thead class="!bg-gray-50">
            <tr>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Order ID
              </th>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Customer
              </th>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Date
              </th>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Total
              </th>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Status
              </th>
              <th
                class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="!bg-white !divide-y !divide-gray-200">
            <!-- <template v-for="order in filteredOrders" :key="order.id"> -->
            <template v-for="order in paginatedOrders" :key="order.id">
              <tr class="hover:!bg-gray-50">
                <td
                  class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium !text-blue-600 !cursor-pointer"
                  @click="toggleOrderExpansion(order.id)"
                >
                  <div class="!flex !items-center">
                    <ChevronDownIcon
                      class="!h-4 !w-4 !mr-1 !transform !transition-transform"
                      :class="{ '!rotate-180': expandedOrders.includes(order.id) }"
                    />
                    {{ order.id }}
                  </div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!text-sm !font-medium !text-gray-900">
                    {{ order.customer }}
                  </div>
                  <div class="!text-sm !text-gray-500">{{ order.email }}</div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                  {{ order.date }}
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-900">
                  {{ formatPrice(order.total) }}
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <span
                    class="!px-2 !inline-flex !text-xs !leading-5 !font-semibold !rounded-full"
                    :class="getStatusBadgeColor(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !font-medium">
                  <div class="!flex !items-center !space-x-3">
                    <button @click="openDetails(order)" class="!text-blue-600 hover:!text-blue-900">
                      <EyeIcon class="!h-5 !w-5" />
                    </button>
                    <router-link
                      :to="`/dashboard/orders/edit/${order.id}`"
                      class="!text-indigo-600 hover:!text-indigo-900"
                    >
                      <EditIcon class="!h-5 !w-5" />
                    </router-link>
                    <button @click="confirmDelete(order)" class="!text-red-600 hover:!text-red-900">
                      <XIcon class="!h-5 !w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Expanded Items -->
              <tr v-if="expandedOrders.includes(order.id)">
                <td colspan="6" class="!px-6 !py-4 !bg-gray-50">
                  <div class="!text-sm !text-gray-900 !font-medium !mb-2">Order Items:</div>
                  <table class="!min-w-full !divide-y !divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          class="!px-4 !py-2 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                        >
                          Item
                        </th>
                        <th
                          class="!px-4 !py-2 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          class="!px-4 !py-2 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          class="!px-4 !py-2 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody class="!divide-y !divide-gray-200">
                      <tr v-for="item in order.items" :key="item.id">
                        <td class="!px-4 !py-2 !whitespace-nowrap !text-sm !text-gray-900">
                          {{ item.name }}
                        </td>
                        <td class="!px-4 !py-2 !whitespace-nowrap !text-sm !text-gray-500">
                          {{ formatPrice(item.price) }}
                        </td>
                        <td class="!px-4 !py-2 !whitespace-nowrap !text-sm !text-gray-500">
                          {{ item.quantity }}
                        </td>
                        <td class="!px-4 !py-2 !whitespace-nowrap !text-sm !text-gray-900">
                          {{ formatPrice(item.price * item.quantity) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div class="!flex !px-6 !py-6 !justify-between !items-center !mt-4">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="!px-3 !py-1 !bg-gray-200 hover:!bg-gray-300 !rounded disabled:!opacity-50"
          >
            Previous
          </button>

          <span class="!text-sm"> Page {{ currentPage }} of {{ totalPages }} </span>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="!px-3 !py-1 !bg-gray-200 hover:!bg-gray-300 !rounded disabled:!opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showDetailsModal && selectedOrder" class="!fixed !z-10 !inset-0 !overflow-y-auto">
      <div
        class="!flex !items-end !justify-center !min-h-screen !pt-4 !px-4 !pb-20 !text-center sm:!block sm:!p-0"
      >
        <div class="!fixed !inset-0 !transition-opacity" @click="showDetailsModal = false">
          <div class="!absolute !inset-0 !bg-gray-500 !opacity-75"></div>
        </div>
        <span class="!hidden sm:!inline-block sm:!align-middle sm:!h-screen">&#8203;</span>
        <div
          class="!inline-block !align-bottom !bg-white !rounded-lg !text-left !overflow-hidden !shadow-xl !transform !transition-all sm:!my-8 sm:!align-middle sm:!max-w-lg sm:!w-full"
        >
          <div class="!bg-white !px-4 !pt-5 !pb-4 sm:!p-6 sm:!pb-4">
            <h3 class="!text-lg !leading-6 !font-medium !text-gray-900 !mb-4">
              Order Details - {{ selectedOrder.id }}
            </h3>
            <p class="!text-sm !text-gray-500">Customer: {{ selectedOrder.customer }}</p>
            <p class="!text-sm !text-gray-500">Status: {{ selectedOrder.status }}</p>
          </div>
          <div class="!bg-gray-50 !px-4 !py-3 sm:!px-6 sm:!flex sm:!flex-row-reverse">
            <button
              class="!w-full !inline-flex !justify-center !rounded-md !border !border-transparent !shadow-sm !px-4 !py-2 !bg-blue-600 !text-base !font-medium !text-white hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 sm:!ml-3 sm:!w-auto sm:!text-sm"
              @click="showDetailsModal = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && deleteTargetOrder" class="!fixed !z-10 !inset-0 !overflow-y-auto">
      <div
        class="!flex !items-end !justify-center !min-h-screen !pt-4 !px-4 !pb-20 !text-center sm:!block sm:!p-0"
      >
        <div class="!fixed !inset-0 !transition-opacity" @click="showDeleteModal = false">
          <div class="!absolute !inset-0 !bg-gray-500 !opacity-75"></div>
        </div>
        <span class="!hidden sm:!inline-block sm:!align-middle sm:!h-screen">&#8203;</span>
        <div
          class="!inline-block !align-bottom !bg-white !rounded-lg !text-left !overflow-hidden !shadow-xl !transform !transition-all sm:!my-8 sm:!align-middle sm:!max-w-lg sm:!w-full"
        >
          <div class="!bg-white !px-4 !pt-5 !pb-4 sm:!p-6 sm:!pb-4">
            <h3 class="!text-lg !leading-6 !font-medium !text-gray-900">Confirm Deletion</h3>
            <p class="!mt-2 !text-sm !text-gray-500">
              Are you sure you want to delete order
              <span class="!font-semibold">{{ deleteTargetOrder.id }}</span
              >?
            </p>
          </div>
          <div class="!bg-gray-50 !px-4 !py-3 sm:!px-6 sm:!flex sm:!flex-row-reverse">
            <button
              class="!w-full !inline-flex !justify-center !rounded-md !border !border-transparent !shadow-sm !px-4 !py-2 !bg-red-600 !text-base !font-medium !text-white hover:!bg-red-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-red-500 sm:!ml-3 sm:!w-auto sm:!text-sm"
              @click="deleteOrder"
            >
              Delete
            </button>
            <button
              class="!mt-3 !w-full !inline-flex !justify-center !rounded-md !border !border-gray-300 !shadow-sm !px-4 !py-2 !bg-white !text-base !font-medium !text-gray-700 hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-gray-500 sm:!mt-0 sm:!ml-3 sm:!w-auto sm:!text-sm"
              @click="showDeleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  ChevronDown as ChevronDownIcon,
  Plus as PlusIcon,
  Edit as EditIcon,
  X as XIcon,
} from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'

const initialOrders = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    email: 'john@example.com',
    date: '2023-05-10',
    total: 25000,
    status: 'Delivered',
    items: [{ id: 1, name: '2021 Toyota Camry', price: 25000, quantity: 1 }],
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    date: '2023-05-12',
    total: 150,
    status: 'Processing',
    items: [{ id: 2, name: 'Brake Pads', price: 75, quantity: 2 }],
  },
  {
    id: 'ORD-1003',
    customer: 'Michael Johnson',
    email: 'michael@example.com',
    date: '2023-05-15',
    total: 28500,
    status: 'Shipped',
    items: [{ id: 3, name: '2020 Honda CR-V', price: 28500, quantity: 1 }],
  },
  {
    id: 'ORD-1004',
    customer: 'Emily Brown',
    email: 'emily@example.com',
    date: '2023-05-08',
    total: 320,
    status: 'Delivered',
    items: [
      { id: 4, name: 'Oil Filter', price: 20, quantity: 1 },
      { id: 5, name: 'Motor Oil (5qt)', price: 30, quantity: 10 },
    ],
  },
  {
    id: 'ORD-1005',
    customer: 'David Wilson',
    email: 'david@example.com',
    date: '2023-05-11',
    total: 39000,
    status: 'Pending',
    items: [{ id: 6, name: '2018 BMW X5', price: 39000, quantity: 1 }],
  },
  {
    id: 'ORD-1006',
    customer: 'Sarah Taylor',
    email: 'sarah@example.com',
    date: '2023-05-14',
    total: 450,
    status: 'Processing',
    items: [{ id: 7, name: 'Car Battery', price: 150, quantity: 3 }],
  },
  {
    id: 'ORD-1007',
    customer: 'Chris Evans',
    email: 'chris@example.com',
    date: '2023-06-01',
    total: 120,
    status: 'Cancelled',
    items: [{ id: 8, name: 'Windshield Wipers', price: 40, quantity: 3 }],
  },
  {
    id: 'ORD-1008',
    customer: 'Sophia Lee',
    email: 'sophia@example.com',
    date: '2023-06-03',
    total: 800,
    status: 'Delivered',
    items: [{ id: 9, name: 'Tire Set', price: 200, quantity: 4 }],
  },
  {
    id: 'ORD-1009',
    customer: 'Daniel Harris',
    email: 'daniel@example.com',
    date: '2023-06-05',
    total: 5000,
    status: 'Shipped',
    items: [{ id: 10, name: 'Motorcycle', price: 5000, quantity: 1 }],
  },
  {
    id: 'ORD-1010',
    customer: 'Olivia Martinez',
    email: 'olivia@example.com',
    date: '2023-06-08',
    total: 75,
    status: 'Pending',
    items: [{ id: 11, name: 'Air Filter', price: 25, quantity: 3 }],
  },
  {
    id: 'ORD-1011',
    customer: 'Liam Scott',
    email: 'liam@example.com',
    date: '2023-06-10',
    total: 600,
    status: 'Delivered',
    items: [{ id: 12, name: 'Alloy Rims', price: 150, quantity: 4 }],
  },
  {
    id: 'ORD-1012',
    customer: 'Mia Rodriguez',
    email: 'mia@example.com',
    date: '2023-06-12',
    total: 999,
    status: 'Processing',
    items: [{ id: 13, name: 'GPS Navigation System', price: 999, quantity: 1 }],
  },
  {
    id: 'ORD-1013',
    customer: 'Noah White',
    email: 'noah@example.com',
    date: '2023-06-15',
    total: 300,
    status: 'Cancelled',
    items: [{ id: 14, name: 'Dash Cam', price: 150, quantity: 2 }],
  },
  {
    id: 'ORD-1014',
    customer: 'Ava Young',
    email: 'ava@example.com',
    date: '2023-06-18',
    total: 22000,
    status: 'Shipped',
    items: [{ id: 15, name: '2019 Ford Mustang', price: 22000, quantity: 1 }],
  },
  {
    id: 'ORD-1015',
    customer: 'William King',
    email: 'william@example.com',
    date: '2023-06-20',
    total: 180,
    status: 'Delivered',
    items: [{ id: 16, name: 'Tool Kit', price: 60, quantity: 3 }],
  },
  {
    id: 'ORD-1016',
    customer: 'Isabella Clark',
    email: 'isabella@example.com',
    date: '2023-06-22',
    total: 210,
    status: 'Pending',
    items: [{ id: 17, name: 'Seat Covers', price: 70, quantity: 3 }],
  },
  {
    id: 'ORD-1017',
    customer: 'James Lewis',
    email: 'james@example.com',
    date: '2023-06-25',
    total: 4500,
    status: 'Processing',
    items: [{ id: 18, name: 'Engine Overhaul Kit', price: 4500, quantity: 1 }],
  },
  {
    id: 'ORD-1018',
    customer: 'Charlotte Hall',
    email: 'charlotte@example.com',
    date: '2023-06-27',
    total: 650,
    status: 'Delivered',
    items: [{ id: 19, name: 'Suspension Kit', price: 650, quantity: 1 }],
  },
  {
    id: 'ORD-1019',
    customer: 'Henry Allen',
    email: 'henry@example.com',
    date: '2023-06-30',
    total: 95,
    status: 'Cancelled',
    items: [{ id: 20, name: 'Spark Plugs', price: 19, quantity: 5 }],
  },
  {
    id: 'ORD-1020',
    customer: 'Grace Wright',
    email: 'grace@example.com',
    date: '2023-07-01',
    total: 1200,
    status: 'Delivered',
    items: [{ id: 21, name: 'Performance Exhaust', price: 1200, quantity: 1 }],
  },
  {
    id: 'ORD-1021',
    customer: 'Ethan Green',
    email: 'ethan@example.com',
    date: '2023-07-03',
    total: 75,
    status: 'Pending',
    items: [{ id: 22, name: 'Car Wax', price: 25, quantity: 3 }],
  },
  {
    id: 'ORD-1022',
    customer: 'Zoe Adams',
    email: 'zoe@example.com',
    date: '2023-07-05',
    total: 520,
    status: 'Shipped',
    items: [{ id: 23, name: 'Roof Rack', price: 260, quantity: 2 }],
  },
  {
    id: 'ORD-1023',
    customer: 'Lucas Baker',
    email: 'lucas@example.com',
    date: '2023-07-08',
    total: 340,
    status: 'Processing',
    items: [{ id: 24, name: 'LED Headlights', price: 170, quantity: 2 }],
  },
  {
    id: 'ORD-1024',
    customer: 'Chloe Perry',
    email: 'chloe@example.com',
    date: '2023-07-10',
    total: 15000,
    status: 'Delivered',
    items: [{ id: 25, name: 'Used Toyota Corolla', price: 15000, quantity: 1 }],
  },
  {
    id: 'ORD-1025',
    customer: 'Mason Foster',
    email: 'mason@example.com',
    date: '2023-07-12',
    total: 89,
    status: 'Cancelled',
    items: [{ id: 26, name: 'Floor Mats', price: 29, quantity: 3 }],
  },
  {
    id: 'ORD-1026',
    customer: 'Ella Torres',
    email: 'ella@example.com',
    date: '2023-07-15',
    total: 220,
    status: 'Pending',
    items: [{ id: 27, name: 'Car Jack', price: 110, quantity: 2 }],
  },
  {
    id: 'ORD-1027',
    customer: 'Logan Hughes',
    email: 'logan@example.com',
    date: '2023-07-17',
    total: 450,
    status: 'Delivered',
    items: [{ id: 28, name: 'Brake Rotors', price: 225, quantity: 2 }],
  },
  {
    id: 'ORD-1028',
    customer: 'Harper Price',
    email: 'harper@example.com',
    date: '2023-07-20',
    total: 800,
    status: 'Processing',
    items: [{ id: 29, name: 'Car Stereo', price: 400, quantity: 2 }],
  },
  {
    id: 'ORD-1029',
    customer: 'Benjamin Russell',
    email: 'benjamin@example.com',
    date: '2023-07-22',
    total: 350,
    status: 'Delivered',
    items: [{ id: 30, name: 'Side Mirrors', price: 175, quantity: 2 }],
  },
  {
    id: 'ORD-1030',
    customer: 'Amelia Ward',
    email: 'amelia@example.com',
    date: '2023-07-25',
    total: 270,
    status: 'Shipped',
    items: [{ id: 31, name: 'Fog Lights', price: 135, quantity: 2 }],
  },
]
const currentPage = ref(1)
const rowsPerPage = ref(5)

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / rowsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return filteredOrders.value.slice(start, start + rowsPerPage.value)
})

// const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

// const router = useRouter()
const orders = ref([])
const searchTerm = ref('')
const statusFilter = ref('All')
const expandedOrders = ref([])
const selectedOrder = ref(null)
const deleteTargetOrder = ref(null)
const showDetailsModal = ref(false)
const showDeleteModal = ref(false)

onMounted(() => {
  const savedOrders = localStorage.getItem('orders')
  if (savedOrders) {
    orders.value = JSON.parse(savedOrders)
  } else {
    orders.value = initialOrders
    localStorage.setItem('orders', JSON.stringify(initialOrders))
  }
})
const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || order.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

function toggleOrderExpansion(id) {
  if (expandedOrders.value.includes(id)) {
    expandedOrders.value = expandedOrders.value.filter((o) => o !== id)
  } else {
    expandedOrders.value.push(id)
  }
}

function getStatusBadgeColor(status) {
  switch (status) {
    case 'Delivered':
      return '!bg-green-100 !text-green-800'
    case 'Shipped':
      return '!bg-blue-100 !text-blue-800'
    case 'Processing':
      return '!bg-yellow-100 !text-yellow-800'
    case 'Pending':
      return '!bg-orange-100 !text-orange-800'
    case 'Cancelled':
      return '!bg-red-100 !text-red-800'
    default:
      return '!bg-gray-100 !text-gray-800'
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function openDetails(order) {
  selectedOrder.value = order
  showDetailsModal.value = true
}

function confirmDelete(order) {
  deleteTargetOrder.value = order
  showDeleteModal.value = true
}

function deleteOrder() {
  orders.value = orders.value.filter((o) => o.id !== deleteTargetOrder.value.id)
  localStorage.setItem('orders', JSON.stringify(orders.value))
  showDeleteModal.value = false
  deleteTargetOrder.value = null
}
</script>
