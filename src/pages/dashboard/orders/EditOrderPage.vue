<!-- src/views/admin/EditOrderPage.vue -->
<template>
  <div class="!space-y-6">
    <!-- Header -->
    <div class="!flex !items-center !justify-between">
      <div class="!flex !items-center">
        <router-link to="/dashboard/orders" class="!mr-4 !text-blue-600 hover:!text-blue-800">
          <ArrowLeft class="!h-5 !w-5" />
        </router-link>
        <div class="!text-2xl !font-semibold !text-gray-900">Edit Order: {{ order.id }}</div>
      </div>
      <button
        type="button"
        @click="handleSubmit"
        class="!inline-flex !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !shadow-sm !text-white !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
      >
        <Save class="!h-5 !w-5 !mr-2" /> Save Changes
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="!flex !justify-center !items-center !h-64">
      <div
        class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-blue-500"
      ></div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="!space-y-8">
      <!-- Customer Information -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Customer Information</h2>
        <div class="!grid !grid-cols-1 !gap-y-6 !gap-x-4 sm:!grid-cols-6">
          <div class="sm:!col-span-3">
            <label for="customer" class="!block !text-sm !font-medium !text-gray-700"
              >Customer Name</label
            >
            <input
              id="customer"
              name="customer"
              v-model="order.customer"
              type="text"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors.customer ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors.customer" class="!mt-2 !text-sm !text-red-600">{{ errors.customer }}</p>
          </div>

          <div class="sm:!col-span-3">
            <label for="email" class="!block !text-sm !font-medium !text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              v-model="order.email"
              type="email"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors.email ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors.email" class="!mt-2 !text-sm !text-red-600">{{ errors.email }}</p>
          </div>

          <div class="sm:!col-span-3">
            <label for="phone" class="!block !text-sm !font-medium !text-gray-700"
              >Phone Number</label
            >
            <input
              id="phone"
              name="phone"
              v-model="order.phone"
              type="tel"
              class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
            />
          </div>

          <div class="sm:!col-span-3">
            <label for="date" class="!block !text-sm !font-medium !text-gray-700">Order Date</label>
            <input
              id="date"
              name="date"
              v-model="order.date"
              type="date"
              class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Shipping Address</h2>
        <div class="!grid !grid-cols-1 !gap-y-6 !gap-x-4 sm:!grid-cols-6">
          <div class="sm:!col-span-6">
            <label for="shippingAddress.street" class="!block !text-sm !font-medium !text-gray-700"
              >Street Address</label
            >
            <input
              id="shippingAddress.street"
              name="shippingAddress.street"
              v-model="order.shippingAddress.street"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors['shippingAddress.street'] ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors['shippingAddress.street']" class="!mt-2 !text-sm !text-red-600">
              {{ errors['shippingAddress.street'] }}
            </p>
          </div>

          <div class="sm:!col-span-2">
            <label for="shippingAddress.city" class="!block !text-sm !font-medium !text-gray-700"
              >City</label
            >
            <input
              id="shippingAddress.city"
              name="shippingAddress.city"
              v-model="order.shippingAddress.city"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors['shippingAddress.city'] ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors['shippingAddress.city']" class="!mt-2 !text-sm !text-red-600">
              {{ errors['shippingAddress.city'] }}
            </p>
          </div>

          <div class="sm:!col-span-2">
            <label for="shippingAddress.state" class="!block !text-sm !font-medium !text-gray-700"
              >State / Province</label
            >
            <input
              id="shippingAddress.state"
              name="shippingAddress.state"
              v-model="order.shippingAddress.state"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors['shippingAddress.state'] ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors['shippingAddress.state']" class="!mt-2 !text-sm !text-red-600">
              {{ errors['shippingAddress.state'] }}
            </p>
          </div>

          <div class="sm:!col-span-2">
            <label for="shippingAddress.zipCode" class="!block !text-sm !font-medium !text-gray-700"
              >ZIP / Postal Code</label
            >
            <input
              id="shippingAddress.zipCode"
              name="shippingAddress.zipCode"
              v-model="order.shippingAddress.zipCode"
              :class="[
                '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm',
                errors['shippingAddress.zipCode'] ? '!border-red-300' : '',
              ]"
            />
            <p v-if="errors['shippingAddress.zipCode']" class="!mt-2 !text-sm !text-red-600">
              {{ errors['shippingAddress.zipCode'] }}
            </p>
          </div>

          <div class="sm:!col-span-3">
            <label for="shippingAddress.country" class="!block !text-sm !font-medium !text-gray-700"
              >Country</label
            >
            <input
              id="shippingAddress.country"
              name="shippingAddress.country"
              v-model="order.shippingAddress.country"
              class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Order Details -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Order Details</h2>

        <div class="!grid !grid-cols-1 !gap-y-6 !gap-x-4 sm:!grid-cols-6 !mb-6">
          <div class="sm:!col-span-3">
            <label class="!block !text-sm !font-medium !text-gray-700">Status</label>
            <!-- Assume CustomDropdown Vue emits 'change' with new value; keep props shape -->
            <CustomDropdown
              class="!mt-1"
              :options="statusOptions"
              :value="order.status"
              @change="handleStatusChange"
            />
          </div>

          <div class="sm:!col-span-3">
            <label class="!block !text-sm !font-medium !text-gray-700">Payment Method</label>
            <CustomDropdown
              class="!mt-1"
              :options="paymentOptions"
              :value="order.paymentMethod"
              @change="handlePaymentMethodChange"
            />
          </div>
        </div>

        <!-- Add Items Section -->
        <div class="!border-t !border-gray-200 !pt-4 !mb-6">
          <h3 class="!text-base !font-medium !text-gray-900 !mb-4">Add Items to Order</h3>

          <div class="!flex !flex-col sm:!flex-row !gap-4 !mb-4">
            <div class="!flex-grow">
              <label for="productSearch" class="!sr-only">Search Products</label>
              <div class="!relative !rounded-md !shadow-sm">
                <div
                  class="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none"
                >
                  <Search class="!h-5 !w-5 !text-gray-400" />
                </div>
                <input
                  id="productSearch"
                  type="text"
                  v-model="productSearch"
                  placeholder="Search products..."
                  class="focus:!ring-blue-500 focus:!border-blue-500 !block !w-full !pl-10 sm:!text-sm !border-gray-300 !rounded-md"
                />
              </div>
            </div>

            <div class="!w-24">
              <label for="quantity" class="!sr-only">Quantity</label>
              <input
                id="quantity"
                type="number"
                min="1"
                v-model.number="quantity"
                placeholder="Qty"
                class="!block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
              />
            </div>

            <button
              type="button"
              :disabled="!selectedProduct"
              @click="addItemToOrder"
              :class="[
                '!inline-flex !items-center !px-4 !py-2 !border !border-transparent !text-sm !font-medium !rounded-md !shadow-sm !text-white focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500',
                selectedProduct
                  ? '!bg-blue-600 hover:!bg-blue-700'
                  : '!bg-gray-300 !cursor-not-allowed',
              ]"
            >
              <Plus class="!h-5 !w-5 !mr-1" /> Add Item
            </button>
          </div>

          <!-- Product Search Results -->
          <div
            v-if="productSearch && filteredProducts.length > 0"
            class="!bg-white !border !border-gray-300 !rounded-md !shadow-sm !max-h-60 !overflow-y-auto !mb-4"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              @click="selectedProduct = product"
              :class="[
                '!flex !items-center !p-3 !cursor-pointer hover:!bg-gray-50',
                selectedProduct?.id === product.id ? '!bg-blue-50' : '',
              ]"
            >
              <div v-if="product.image" class="!flex-shrink-0 !h-10 !w-10 !mr-3">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="!h-10 !w-10 !rounded-md !object-cover"
                />
              </div>
              <div class="!flex-1 !min-w-0">
                <p class="!text-sm !font-medium !text-gray-900 !truncate">{{ product.name }}</p>
                <p class="!text-sm !text-gray-500">{{ product.category }}</p>
              </div>
              <div class="!ml-3">
                <p class="!text-sm !font-medium !text-gray-900">{{ formatPrice(product.price) }}</p>
              </div>
            </div>
          </div>

          <div
            v-else-if="productSearch && filteredProducts.length === 0"
            class="!bg-gray-50 !border !border-gray-300 !rounded-md !p-4 !mb-4"
          >
            <p class="!text-sm !text-gray-500">No products found matching your search.</p>
          </div>

          <p v-if="errors.items" class="!mt-2 !text-sm !text-red-600">{{ errors.items }}</p>
        </div>

        <!-- Order Items List -->
        <div v-if="order.items.length > 0" class="!overflow-x-auto !border !rounded-md">
          <table class="!min-w-full !divide-y !divide-gray-200">
            <thead class="!bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="!bg-white !divide-y !divide-gray-200">
              <tr v-for="item in order.items" :key="item.id">
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!flex !items-center">
                    <div v-if="item.image" class="!flex-shrink-0 !h-10 !w-10">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="!h-10 !w-10 !rounded-md !object-cover"
                      />
                    </div>
                    <div class="!ml-4">
                      <div class="!text-sm !font-medium !text-gray-900">{{ item.name }}</div>
                      <div class="!text-sm !text-gray-500">{{ item.category }}</div>
                    </div>
                  </div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!text-sm !text-gray-900">{{ formatPrice(item.price) }}</div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!flex !items-center">
                    <button
                      type="button"
                      @click="updateItemQuantity(item.id, item.quantity - 1)"
                      class="!p-1 !text-gray-400 hover:!text-gray-500"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      :value="item.quantity"
                      @input="(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 1)"
                      class="!mx-1 !block !w-16 !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
                    />
                    <button
                      type="button"
                      @click="updateItemQuantity(item.id, item.quantity + 1)"
                      class="!p-1 !text-gray-400 hover:!text-gray-500"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!text-sm !font-medium !text-gray-900">
                    {{ formatPrice(item.subtotal) }}
                  </div>
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-500">
                  <button
                    type="button"
                    @click="removeItem(item.id)"
                    class="!text-red-600 hover:!text-red-900"
                  >
                    <Trash2 class="!h-5 !w-5" />
                  </button>
                </td>
              </tr>

              <tr class="!bg-gray-50">
                <td colspan="3" class="!px-6 !py-4 !text-right !font-medium !text-gray-900">
                  Total:
                </td>
                <td class="!px-6 !py-4 !whitespace-nowrap">
                  <div class="!text-lg !font-bold !text-gray-900">
                    {{ formatPrice(order.total) }}
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="!border !border-gray-300 !border-dashed !rounded-md !p-6 !text-center">
          <p class="!text-gray-500">No items added to this order yet.</p>
          <p class="!text-sm !text-gray-400 !mt-1">
            Search for products above and click "Add Item" to add them to the order.
          </p>
        </div>
      </div>

      <!-- Order Notes -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Order Notes</h2>
        <textarea
          id="notes"
          name="notes"
          rows="4"
          v-model="order.notes"
          class="!block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
          placeholder="Add any special instructions or notes about this order..."
        />
      </div>

      <!-- Order Images -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Order Images</h2>
        <p class="!text-sm !text-gray-500 !mb-4">
          Upload images related to this order (optional). These could include signed documents,
          special instructions, etc.
        </p>
        <!-- Keep API shape close to React: images prop + imagesChange event -->
        <ImageGallery
          :images="orderImages"
          :maxImages="5"
          @imagesChange="(val) => (orderImages = val)"
        />
      </div>

      <!-- Submit buttons -->
      <div class="!flex !justify-end !space-x-3">
        <router-link
          to="/dashboard/orders"
          class="!inline-flex !justify-center !py-2 !px-4 !border !border-gray-300 !shadow-sm !text-sm !font-medium !rounded-md !text-gray-700 !bg-white hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          class="!inline-flex !justify-center !py-2 !px-4 !border !border-transparent !shadow-sm !text-sm !font-medium !rounded-md !text-white !bg-blue-600 hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="!fixed !z-10 !inset-0 !overflow-y-auto">
      <div
        class="!flex !items-end !justify-center !min-h-screen !pt-4 !px-4 !pb-20 !text-center sm:!block sm:!p-0"
      >
        <div class="!fixed !inset-0 !transition-opacity" aria-hidden="true">
          <div class="!absolute !inset-0 !bg-gray-500 !opacity-75"></div>
        </div>
        <span class="!hidden sm:!inline-block sm:!align-middle sm:!h-screen" aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="!inline-block !align-bottom !bg-white !rounded-lg !text-left !overflow-hidden !shadow-xl !transform !transition-all sm:!my-8 sm:!align-middle sm:!max-w-lg sm:!w-full"
        >
          <div class="!bg-white !px-4 !pt-5 !pb-4 sm:!p-6 sm:!pb-4">
            <div class="sm:!flex sm:!items-start">
              <div
                class="!mx-auto !flex-shrink-0 !flex !items-center !justify-center !h-12 !w-12 !rounded-full !bg-green-100 sm:!mx-0 sm:!h-10 sm:!w-10"
              >
                <svg
                  class="!h-6 !w-6 !text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div class="!mt-3 !text-center sm:!mt-0 sm:!ml-4 sm:!text-left">
                <h3 class="!text-lg !leading-6 !font-medium !text-gray-900">
                  Order Updated Successfully
                </h3>
                <div class="!mt-2">
                  <p class="!text-sm !text-gray-500">
                    Your changes to order #{{ order.id }} have been saved.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="!bg-gray-50 !px-4 !py-3 sm:!px-6 sm:!flex sm:!flex-row-reverse">
            <button
              type="button"
              class="!w-full !inline-flex !justify-center !rounded-md !border !border-transparent !shadow-sm !px-4 !py-2 !bg-blue-600 !text-base !font-medium !text-white hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 sm:!ml-3 sm:!w-auto sm:!text-sm"
              @click="router.push('/admin/orders')"
            >
              View All Orders
            </button>
            <button
              type="button"
              class="!mt-3 !w-full !inline-flex !justify-center !rounded-md !border !border-gray-300 !shadow-sm !px-4 !py-2 !bg-white !text-base !font-medium !text-gray-700 hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-indigo-500 sm:!mt-0 sm:!ml-3 sm:!w-auto sm:!text-sm"
              @click="showSuccessModal = false"
            >
              Continue Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
  Why specific choices:
  - Keep child components external as requested.
  - Use Composition API for clear state grouping and methods.
  - Retain localStorage and data shapes exactly to avoid migration issues.
*/
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Plus, Trash2, Search, Save } from 'lucide-vue-next'
import CustomDropdown from '@/components/utils/CustomDropdown.vue'
import ImageGallery from '@/components/utils/ImageGallery.vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const showSuccessModal = ref(false)
const errors = reactive({})
const isLoading = ref(true)

const order = reactive({
  id: '',
  customer: '',
  email: '',
  phone: '',
  date: new Date().toISOString().split('T')[0],
  total: 0,
  status: 'Pending',
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  },
  paymentMethod: 'Credit Card',
  notes: '',
  items: [],
})

const availableProducts = ref([])
const productSearch = ref('')
const selectedProduct = ref(null)
const quantity = ref(1)
let orderImages = ref([])

onMounted(() => {
  isLoading.value = true
  const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
  const orderData = savedOrders.find((o) => o.id === id)
  if (orderData) {
    Object.assign(order, {
      ...orderData,
      shippingAddress: orderData.shippingAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
    })
    if (orderData.images && orderData.images.length > 0) {
      orderImages.value = orderData.images.map((imageUrl, index) => ({
        id: `existing-${index}`,
        url: imageUrl,
      }))
    }
  }

  const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]')
  const parts = [
    { id: 'p1', name: 'Brake Pads', price: 75, category: 'Parts', status: 'In Stock' },
    { id: 'p2', name: 'Oil Filter', price: 20, category: 'Parts', status: 'In Stock' },
    { id: 'p3', name: 'Motor Oil (5qt)', price: 30, category: 'Parts', status: 'In Stock' },
    { id: 'p4', name: 'Car Battery', price: 150, category: 'Parts', status: 'In Stock' },
    { id: 'p5', name: 'Air Filter', price: 25, category: 'Parts', status: 'In Stock' },
  ]

  const vehicleProducts = savedVehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    price: vehicle.price,
    category: 'Vehicle',
    status: vehicle.status,
    image: vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : null,
  }))

  availableProducts.value = [...vehicleProducts, ...parts]
  isLoading.value = false
})

const filteredProducts = computed(() => {
  return productSearch.value
    ? availableProducts.value.filter(
        (product) =>
          product.name.toLowerCase().includes(productSearch.value.toLowerCase()) ||
          product.category.toLowerCase().includes(productSearch.value.toLowerCase()),
      )
    : availableProducts.value
})

const handleStatusChange = (value) => {
  order.status = value
}

const handlePaymentMethodChange = (value) => {
  order.paymentMethod = value
}

const calculateTotal = (items) => items.reduce((sum, item) => sum + item.subtotal, 0)

const addItemToOrder = () => {
  if (!selectedProduct.value) return
  const existingItemIndex = order.items.findIndex((item) => item.id === selectedProduct.value.id)
  if (existingItemIndex >= 0) {
    const updatedItems = [...order.items]
    updatedItems[existingItemIndex].quantity += quantity.value
    updatedItems[existingItemIndex].subtotal =
      updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity
    order.items = updatedItems
    order.total = calculateTotal(updatedItems)
  } else {
    const newItem = {
      id: selectedProduct.value.id,
      name: selectedProduct.value.name,
      price: selectedProduct.value.price,
      quantity: quantity.value,
      subtotal: selectedProduct.value.price * quantity.value,
      category: selectedProduct.value.category,
      image: selectedProduct.value.image || null,
    }
    const updatedItems = [...order.items, newItem]
    order.items = updatedItems
    order.total = calculateTotal(updatedItems)
  }
  selectedProduct.value = null
  quantity.value = 1
}

const removeItem = (itemId) => {
  const updatedItems = order.items.filter((item) => item.id !== itemId)
  order.items = updatedItems
  order.total = calculateTotal(updatedItems)
}

const updateItemQuantity = (itemId, newQuantity) => {
  if (newQuantity < 1) return
  const updatedItems = order.items.map((item) => {
    if (item.id === itemId) {
      return { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
    }
    return item
  })
  order.items = updatedItems
  order.total = calculateTotal(updatedItems)
}

const validateForm = () => {
  // reset errors
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!order.customer) errors.customer = 'Customer name is required'
  if (!order.email) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(order.email)) errors.email = 'Email format is invalid'
  if (order.items.length === 0) errors.items = 'At least one item is required'
  if (!order.shippingAddress.street) errors['shippingAddress.street'] = 'Street is required'
  if (!order.shippingAddress.city) errors['shippingAddress.city'] = 'City is required'
  if (!order.shippingAddress.state) errors['shippingAddress.state'] = 'State is required'
  if (!order.shippingAddress.zipCode) errors['shippingAddress.zipCode'] = 'ZIP code is required'
  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    const updatedOrder = {
      ...order,
      images: orderImages.value.map((img) => img.url),
      date: order.date,
    }
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedOrders = existingOrders.map((o) => (o.id === id ? updatedOrder : o))
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    showSuccessModal.value = true
  }
}

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

const statusOptions = [
  { value: 'Pending', label: 'Pending', color: 'bg-orange-400' },
  { value: 'Processing', label: 'Processing', color: 'bg-yellow-400' },
  { value: 'Shipped', label: 'Shipped', color: 'bg-blue-400' },
  { value: 'Delivered', label: 'Delivered', color: 'bg-green-400' },
  { value: 'Cancelled', label: 'Cancelled', color: 'bg-red-400' },
]

const paymentOptions = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'PayPal', label: 'PayPal' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Financing', label: 'Financing' },
]
</script>
