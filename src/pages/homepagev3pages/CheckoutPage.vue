<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Checkout" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div class="md:!flex md:!space-x-6">
        <!-- Checkout Form Section -->
        <form class="md:!w-2/3" @submit.prevent="handleSubmit">
          <!-- Contact Information -->
          <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
            <div class="!px-4 !py-3 !border-b">
              <h2 class="!text-lg !font-bold">Contact Information</h2>
            </div>
            <div class="!p-4 !space-y-4">
              <div class="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <div>
                  <label for="firstName" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    First Name *
                  </label>
                  <div class="!relative">
                    <div
                      class="!absolute inset-y-0 left-0 !pl-3 !flex !items-center !pointer-events-none"
                    >
                      <UserIcon class="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      v-model="firstName"
                      class="!pl-10 !w-full !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label for="lastName" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    v-model="lastName"
                    class="!w-full !py-2 !px-3 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div class="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <div>
                  <label for="email" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    v-model="email"
                    class="!w-full !py-2 !px-3 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label for="phone" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    Phone Number *
                  </label>
                  <div class="!relative">
                    <div
                      class="!absolute inset-y-0 left-0 !pl-3 !flex !items-center !pointer-events-none"
                    >
                      <PhoneIcon class="!h-5 !w-5 !text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      v-model="phone"
                      class="!pl-10 !w-full !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Delivery Method -->
          <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
            <div class="!px-4 !py-3 !border-b">
              <h2 class="!text-lg !font-bold">Delivery Method</h2>
            </div>
            <div class="!p-4 !space-y-3">
              <div
                v-for="(option, key) in deliveryOptions"
                :key="key"
                :class="[
                  '!border !rounded-md !p-3 !flex !items-center !cursor-pointer',
                  deliveryMethod === key
                    ? '!border-primary-500 !bg-primary-50'
                    : 'hover:!border-gray-400',
                ]"
                @click="deliveryMethod = key"
              >
                <div
                  :class="[
                    '!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center',
                    deliveryMethod === key ? '!border-primary-500' : '!border-gray-300',
                  ]"
                >
                  <div
                    v-if="deliveryMethod === key"
                    class="!w-3 !h-3 !rounded-full !bg-primary-500"
                  ></div>
                </div>
                <div class="!ml-3 !flex-1">
                  <div class="!font-medium">{{ option.name }}</div>
                  <div class="!text-sm !text-gray-500">{{ option.desc }}</div>
                </div>
                <div class="!font-medium">{{ option.costText }}</div>
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div
            v-if="deliveryMethod !== 'pickup'"
            class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6"
          >
            <div class="!px-4 !py-3 !border-b">
              <h2 class="!text-lg !font-bold">Shipping Address</h2>
            </div>
            <div class="!p-4 !space-y-4">
              <div>
                <label for="address" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                  Address *
                </label>
                <div class="!relative">
                  <div
                    class="!absolute inset-y-0 left-0 !pl-3 !flex !items-center !pointer-events-none"
                  >
                    <MapPinIcon class="!h-5 !w-5 !text-gray-400" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    v-model="address"
                    class="!pl-10 !w-full !py-2 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div class="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
                <div>
                  <label for="city" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    v-model="city"
                    class="!w-full !py-2 !px-3 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label for="state" class="!block !text-sm !font-medium !text-gray-700 !mb-1">
                    State *
                  </label>
                  <select
                    id="state"
                    v-model="state"
                    class="!w-full !py-2 !px-3 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
                    required
                  >
                    <option disabled value="">Select State</option>
                    <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
            <div class="!px-4 !py-3 !border-b">
              <h2 class="!text-lg !font-bold">Payment Method</h2>
            </div>
            <div class="!p-4 !space-y-3">
              <div
                v-for="(option, key) in paymentOptions"
                :key="key"
                :class="[
                  '!border !rounded-md !p-3 !flex !items-center !cursor-pointer',
                  paymentMethod === key
                    ? '!border-primary-500 !bg-primary-50'
                    : 'hover:!border-gray-400',
                ]"
                @click="paymentMethod = key"
              >
                <div
                  :class="[
                    '!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center',
                    paymentMethod === key ? '!border-primary-500' : '!border-gray-300',
                  ]"
                >
                  <div
                    v-if="paymentMethod === key"
                    class="!w-3 !h-3 !rounded-full !bg-primary-500"
                  ></div>
                </div>
                <div class="!ml-3 !flex-1">
                  <div class="!font-medium">{{ option.name }}</div>
                  <div class="!text-sm !text-gray-500">{{ option.desc }}</div>
                </div>
                <component :is="option.icon" class="!w-6 !h-6 !text-gray-400" />
              </div>
            </div>
          </div>
        </form>

        <!-- Order Summary Section -->
        <div class="md:!w-1/3">
          <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden md:!sticky md:!top-4">
            <div class="!px-4 !py-3 !border-b">
              <h2 class="!text-lg !font-bold">Order Summary</h2>
            </div>
            <div class="!p-4 !space-y-3">
              <div class="!max-h-64 !overflow-y-auto !mb-4">
                <div v-for="item in items" :key="item.product.id" class="!flex !py-2 !border-b">
                  <div class="!w-16 !h-16">
                    <img
                      :src="item.product.display_image_url"
                      :alt="item.product.name"
                      class="!w-full !h-full !object-cover !rounded"
                    />
                  </div>
                  <div class="!ml-3 !flex-1">
                    <div class="!text-sm !font-medium !line-clamp-1">{{ item.product.name }}</div>
                    <div class="!text-xs !text-gray-500">Qty: {{ item.quantity }}</div>
                    <div class="!font-medium !text-primary-500">
                      ₦{{
                        (
                          (item.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price) *
                          item.quantity
                        ).toLocaleString()
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="!space-y-2">
                <div class="!flex !justify-between">
                  <span class="!text-gray-600">Subtotal</span>
                  <span>₦{{ subtotal.toLocaleString() }}</span>
                </div>
                <div v-if="totalDiscount > 0" class="!flex !justify-between !text-green-600">
                  <span>Discount</span>
                  <span>-₦{{ totalDiscount.toLocaleString() }}</span>
                </div>
                <div class="!flex !justify-between">
                  <span class="!text-gray-600">Delivery</span>
                  <span>{{
                    actualDeliveryCost === 0 ? 'Free' : `₦${actualDeliveryCost.toLocaleString()}`
                  }}</span>
                </div>
                <div class="!flex !justify-between !border-t !pt-3 !mt-3">
                  <span class="!font-bold">Total</span>
                  <span class="!font-bold !text-lg !text-primary-500">
                    ₦{{ finalTotal.toLocaleString() }}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                @click="handleSubmit"
                :disabled="isProcessing || !isFormValid"
                :class="[
                  '!w-full !py-3 !mt-6 !rounded-md !font-medium !flex !items-center !justify-center !transition-colors',
                  isFormValid
                    ? '!bg-primary-500 !text-white hover:!bg-primary-600'
                    : '!bg-gray-300 !text-gray-500 !cursor-not-allowed',
                ]"
              >
                <svg
                  v-if="isProcessing"
                  class="!animate-spin !-ml-1 !mr-2 !h-4 !w-4 !text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="!opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    class="!opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-if="!isProcessing">Place Order</span>
                <span v-else>Processing...</span>
              </button>

              <div class="!flex !items-center !justify-center !mt-4 !text-xs !text-gray-500">
                <p>
                  By placing your order, you agree to our
                  <a href="#" class="!text-primary-500">Terms & Conditions</a>
                </p>
              </div>
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
// import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
// import { CreditCardIcon, CheckIcon, MapPinIcon, UserIcon, PhoneIcon } from 'lucide-vue-next'
// import Header from '../../components/homepagev3/Header.vue'
// import Footer from '../../components/homepagev3/Footer.vue'
// import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
// import { useCart } from '../../components/homepagev3/CartProvider.js'

// const { items, subtotal, total, totalDiscount, clearCart } = useCart()
// const router = useRouter()

// const firstName = ref('')
// const lastName = ref('')
// const email = ref('')
// const phone = ref('')
// const address = ref('')
// const city = ref('')
// const state = ref('')
// const deliveryMethod = ref('standard')
// const paymentMethod = ref('card')
// const isProcessing = ref(false)

// const deliveryCosts = { standard: 1500, express: 3000, pickup: 0 }
// const actualDeliveryCost = computed(() => deliveryCosts[deliveryMethod.value])
// const finalTotal = computed(() => total.value + actualDeliveryCost.value)

// const deliveryOptions = {
//   standard: { name: 'Standard Delivery', desc: '3-5 business days', costText: '₦1,500' },
//   express: { name: 'Express Delivery', desc: '1-2 business days', costText: '₦3,000' },
//   pickup: { name: 'Pickup from Store', desc: 'Collect from Lagos store', costText: 'Free' },
// }

// const paymentOptions = {
//   card: { name: 'Credit/Debit Card', desc: 'Pay securely with your card', icon: CreditCardIcon },
//   bank: { name: 'Bank Transfer', desc: 'Pay via bank transfer', icon: CheckIcon },
//   cash: { name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: UserIcon },
// }

// const states = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Kaduna', 'Enugu']

// const isFormValid = computed(() => {
//   return (
//     firstName.value.trim() &&
//     lastName.value.trim() &&
//     email.value.includes('@') &&
//     phone.value.length >= 10 &&
//     (deliveryMethod.value === 'pickup' ||
//       (address.value.trim() && city.value.trim() && state.value.trim()))
//   )
// })

// function handleSubmit() {
//   if (!isFormValid.value) {
//     alert('Please fill in all required fields correctly')
//     return
//   }
//   isProcessing.value = true
//   setTimeout(() => {
//     clearCart()
//     router.push({
//       path: '/order-confirmation',
//       state: {
//         orderId: 'ORD' + Math.floor(Math.random() * 1000000),
//         orderDate: new Date().toISOString(),
//         deliveryMethod: deliveryMethod.value,
//         paymentMethod: paymentMethod.value,
//         items: items.value,
//         subtotal: subtotal.value,
//         discount: totalDiscount.value,
//         deliveryCost: actualDeliveryCost.value,
//         total: finalTotal.value,
//         shippingDetails: {
//           name: `${firstName.value} ${lastName.value}`,
//           email: email.value,
//           phone: phone.value,
//           address: address.value,
//           city: city.value,
//           state: state.value,
//         },
//       },
//     })
//   }, 2000)
// }

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CreditCardIcon, CheckIcon, MapPinIcon, UserIcon, PhoneIcon } from 'lucide-vue-next'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import { useCart } from '../../components/homepagev3/CartProvider.js'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const { cart, subtotal, total, totalDiscount, clearCart } = useCart()
const router = useRouter()
const { user, isAuthenticated } = useAuthStore();

// ---- Form state ----
const firstName = ref(isAuthenticated.value ? user.value?.first_name ?? '' : '')
const lastName = ref(isAuthenticated.value ? user.value?.last_name ?? '' : '')
const email = ref(isAuthenticated.value ? user.value?.email ?? '' : '')
const phone = ref(isAuthenticated.value ? user.value?.phone ?? '' : '')
const address = ref(isAuthenticated.value ? user.value?.address ?? '' : '')
const city = ref(isAuthenticated.value ? user.value?.city ?? '' : '')
const state = ref(isAuthenticated.value ? user.value?.state ?? '' : '')
const deliveryMethod = ref('standard')
const paymentMethod = ref('card')
const isProcessing = ref(false)

// ---- Delivery costs ----
const deliveryCosts = { standard: 1500, express: 3000, pickup: 0 }
const actualDeliveryCost = computed(() => deliveryCosts[deliveryMethod.value])
const finalTotal = computed(() => total.value + actualDeliveryCost.value)

const deliveryOptions = {
  standard: { name: 'Standard Delivery', desc: '3-5 business days', costText: '₦1,500' },
  express: { name: 'Express Delivery', desc: '1-2 business days', costText: '₦3,000' },
  pickup: { name: 'Pickup from Store', desc: 'Collect from Lagos store', costText: 'Free' },
}

const paymentOptions = {
  card: { name: 'Credit/Debit Card', desc: 'Pay securely with your card', icon: CreditCardIcon },
  bank: { name: 'Bank Transfer', desc: 'Pay via bank transfer', icon: CheckIcon },
  cash: { name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: UserIcon },
}

const states = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Kaduna', 'Enugu']

// ---- Validation ----
const isFormValid = computed(() => {
  return (
    firstName.value.trim() &&
    lastName.value.trim() &&
    email.value.includes('@') &&
    phone.value.length >= 10 &&
    (deliveryMethod.value === 'pickup' ||
      (address.value.trim() && city.value.trim() && state.value.trim()))
  )
})

// ---- Order submission ----
async function handleSubmit() {
  if (!isFormValid.value) {
    alert('Please fill in all required fields correctly')
    return
  }

  isProcessing.value = true
  try {
    const orderPayload = {
      customer: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
      },
      shipping: deliveryMethod.value === 'pickup'
        ? { method: 'pickup' }
        : {
            method: deliveryMethod.value,
            address: address.value,
            city: city.value,
            state: state.value,
          },
      cart: cart.value,
      subtotal: subtotal.value,
      discount: totalDiscount.value,
      deliveryCost: actualDeliveryCost.value,
      total: finalTotal.value,
      paymentMethod: paymentMethod.value,
    }

    const res = await api.post('/api/orders/checkout', orderPayload)

    console.log(res)

    const data = res.data

    if (data.status === false) { 
      throw new Error(data.message || 'Failed to place order.');
    }

    //cart.clearCart()
    clearCart()

    // Payment handling
    if (paymentMethod.value === 'card' && data.data.payment.url) {
      window.location.href = data.data.payment.url
      return
    }

    if (paymentMethod.value === 'bank') {
      router.push({
        path: '/order-confirmation',
        state: { ...data, note: 'Please complete your bank transfer using the provided details.' },
      })
    } else {
      router.push({
        path: '/order-confirmation',
        state: data,
      })
    }

    //clearCart()
  } catch (err) {
    console.error(err)
    alert('Something went wrong placing your order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}
</script>