<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="!space-y-6">
    <!-- Header -->
    <div class="!flex  text-center !items-center">
      <router-link to="/dashboard/orders" class="!mr-4 !text-blue-600 hover:!text-blue-800">
        <ArrowLeft class="" />
      </router-link>
      <div class="!text-2xl !font-semibold h-full  !text-gray-900">Create New Order</div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="!space-y-8">
      <!-- Customer Information -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Customer Information</h2>
        <div class="!grid !grid-cols-1 !gap-y-6 !gap-x-4 sm:!grid-cols-6">
          <div class="sm:!col-span-3">
            <label for="customer" class="!block !text-sm !font-medium !text-gray-700"
              >Customer Name</label
            >
            <input
              type="text"
              id="customer"
              name="customer"
              v-model="order.customer"
              @input="clearError('customer')"
              :class="inputClass(errors.customer)"
            />
            <p v-if="errors.customer" class="!mt-2 !text-sm !text-red-600">{{ errors.customer }}</p>
          </div>
          <div class="sm:!col-span-3">
            <label for="email" class="!block !text-sm !font-medium !text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="order.email"
              @input="clearError('email')"
              :class="inputClass(errors.email)"
            />
            <p v-if="errors.email" class="!mt-2 !text-sm !text-red-600">{{ errors.email }}</p>
          </div>
          <div class="sm:!col-span-3">
            <label for="phone" class="!block !text-sm !font-medium !text-gray-700"
              >Phone Number</label
            >
            <input
              type="tel"
              id="phone"
              name="phone"
              v-model="order.phone"
              class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
            />
          </div>
          <div class="sm:!col-span-3">
            <label for="date" class="!block !text-sm !font-medium !text-gray-700">Order Date</label>
            <input
              type="date"
              id="date"
              name="date"
              v-model="order.date"
              class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Order Items</h2>
        <div class="!flex !space-x-4 !mb-4">
          <CustomDropdown
            :items="filteredProducts"
            v-model="selectedProduct"
            placeholder="Select a product"
          />
          <input
            type="number"
            v-model.number="quantity"
            min="1"
            class="!w-20 !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
          />
          <button
            type="button"
            @click="addItemToOrder"
            class="!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-blue-700"
          >
            Add
          </button>
        </div>
        <p v-if="errors.items" class="!mt-2 !text-sm !text-red-600">{{ errors.items }}</p>
        <table v-if="order.items.length" class="!min-w-full !divide-y !divide-gray-300">
          <thead class="!bg-gray-50">
            <tr>
              <th class="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500">Product</th>
              <th class="!px-6 !py-3 !text-right !text-xs !font-medium !text-gray-500">Price</th>
              <th class="!px-6 !py-3 !text-right !text-xs !font-medium !text-gray-500">Quantity</th>
              <th class="!px-6 !py-3 !text-right !text-xs !font-medium !text-gray-500">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="!bg-white !divide-y !divide-gray-200">
            <tr v-for="item in order.items" :key="item.id">
              <td class="!px-6 !py-4 !whitespace-nowrap">{{ item.name }}</td>
              <td class="!px-6 !py-4 !text-right">{{ formatPrice(item.price) }}</td>
              <td class="!px-6 !py-4 !text-right">{{ item.quantity }}</td>
              <td class="!px-6 !py-4 !text-right">{{ formatPrice(item.subtotal) }}</td>
              <td class="!px-6 !py-4 !text-right">
                <button
                  type="button"
                  @click="removeItem(item.id)"
                  class="!text-red-600 hover:!text-red-800"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="!px-6 !py-4 !text-right !font-medium">Total</td>
              <td class="!px-6 !py-4 !text-right !font-medium">{{ formatPrice(order.total) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Shipping Information -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Shipping Address</h2>
        <div class="!grid !grid-cols-1 !gap-y-6 !gap-x-4 sm:!grid-cols-6">
          <div class="sm:!col-span-6">
            <label for="street" class="!block !text-sm !font-medium !text-gray-700">Street</label>
            <input
              type="text"
              id="street"
              v-model="order.shippingAddress.street"
              :class="inputClass(errors['shippingAddress.street'])"
            />
          </div>
          <div class="sm:!col-span-2">
            <label for="city" class="!block !text-sm !font-medium !text-gray-700">City</label>
            <input
              type="text"
              id="city"
              v-model="order.shippingAddress.city"
              :class="inputClass(errors['shippingAddress.city'])"
            />
          </div>
          <div class="sm:!col-span-2">
            <label for="state" class="!block !text-sm !font-medium !text-gray-700">State</label>
            <input
              type="text"
              id="state"
              v-model="order.shippingAddress.state"
              :class="inputClass(errors['shippingAddress.state'])"
            />
          </div>
          <div class="sm:!col-span-2">
            <label for="zip" class="!block !text-sm !font-medium !text-gray-700">ZIP Code</label>
            <input
              type="text"
              id="zip"
              v-model="order.shippingAddress.zipCode"
              :class="inputClass(errors['shippingAddress.zipCode'])"
            />
          </div>
        </div>
      </div>

      <!-- Payment and Notes -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Payment & Notes</h2>
        <select
          v-model="order.paymentMethod"
          class="!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
        >
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Bank Transfer</option>
        </select>
        <textarea
          v-model="order.notes"
          rows="4"
          class="!mt-4 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm"
          placeholder="Additional notes"
        ></textarea>
      </div>

      <!-- Images -->
      <div class="!bg-white !shadow !rounded-lg !p-6">
        <h2 class="!text-lg !font-medium !text-gray-900 !mb-4">Attach Images</h2>
        <!-- <ImageGallery v-model="orderImages" /> -->

        <ImageGallery
          :images="orderImages"
          :onImagesChange="(newImages) => (orderImages = newImages)"
        />
      </div>

      <div class="!flex !justify-end">
        <button
          type="submit"
          class="!bg-green-600 !text-white !px-6 !py-3 !rounded-lg hover:!bg-green-700"
        >
          Create Order
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="!fixed !inset-0 !flex !items-center !justify-center !bg-black !bg-opacity-50"
    >
      <div class="!bg-white !p-6 !rounded-lg !shadow-lg !max-w-sm !w-full !text-center">
        <h2 class="!text-xl !font-semibold !mb-4">Order Created Successfully</h2>
        <button
          @click="router.push('/admin/orders')"
          class="!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-blue-700"
        >
          Go to Orders
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
// import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { ChevronLeft as ArrowLeft } from 'lucide-vue-next'
import CustomDropdown from '@/components/utils/CustomDropdown.vue'
import ImageGallery from '@/components/utils/ImageGallery.vue'

const router = useRouter()

const order = reactive({
  customer: '',
  email: '',
  phone: '',
  date: '',
  items: [],
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  paymentMethod: 'Credit Card',
  notes: '',
  total: 0,
})

const errors = reactive({})
const products = ref([
  { id: 1, name: 'Product A', price: 25 },
  { id: 2, name: 'Product B', price: 50 },
  { id: 3, name: 'Product C', price: 75 },
])
const filteredProducts = computed(() => products.value)

const selectedProduct = ref(null)
const quantity = ref(1)
const orderImages = ref([])
const showSuccessModal = ref(false)

function inputClass(error) {
  return error
    ? '!mt-1 !block !w-full !rounded-md !border-red-300 !shadow-sm focus:!border-red-500 focus:!ring-red-500 sm:!text-sm'
    : '!mt-1 !block !w-full !rounded-md !border-gray-300 !shadow-sm focus:!border-blue-500 focus:!ring-blue-500 sm:!text-sm'
}

function clearError(field) {
  delete errors[field]
}

function addItemToOrder() {
  if (!selectedProduct.value) {
    errors.items = 'Please select a product'
    return
  }
  const existingItem = order.items.find((item) => item.id === selectedProduct.value.id)
  if (existingItem) {
    existingItem.quantity += quantity.value
    existingItem.subtotal = existingItem.quantity * existingItem.price
  } else {
    order.items.push({
      ...selectedProduct.value,
      quantity: quantity.value,
      subtotal: selectedProduct.value.price * quantity.value,
    })
  }
  updateTotal()
  selectedProduct.value = null
  quantity.value = 1
}

function removeItem(id) {
  order.items = order.items.filter((item) => item.id !== id)
  updateTotal()
}

function updateTotal() {
  order.total = order.items.reduce((sum, item) => sum + item.subtotal, 0)
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`
}

function validateForm() {
  errors.customer = order.customer ? '' : 'Customer name is required'
  errors.email = order.email ? '' : 'Email is required'
  errors.items = order.items.length ? '' : 'At least one product is required'
  errors['shippingAddress.street'] = order.shippingAddress.street ? '' : 'Street is required'
  errors['shippingAddress.city'] = order.shippingAddress.city ? '' : 'City is required'
  errors['shippingAddress.state'] = order.shippingAddress.state ? '' : 'State is required'
  errors['shippingAddress.zipCode'] = order.shippingAddress.zipCode ? '' : 'ZIP Code is required'
  return !Object.values(errors).some(Boolean)
}

function handleSubmit() {
  if (!validateForm()) return
  // Simulate API call
  setTimeout(() => {
    showSuccessModal.value = true
  }, 500)
}
</script>
