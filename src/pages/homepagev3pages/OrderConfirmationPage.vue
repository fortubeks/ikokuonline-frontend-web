<template>
  <div v-if="order" class="min-h-screen bg-gray-100 pb-16 md:pb-0">
    <Header title="Order Confirmation" />
    <div class="container mx-auto px-4 py-6">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div class="p-6 text-center border-b">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
            >
              <CheckCircleIcon class="w-8 h-8 text-green-500" />
            </div>
            <h1 class="text-2xl font-bold mb-2">Thank You For Your Order!</h1>
            <p class="text-gray-600">
              Your order has been placed successfully and is being processed.
            </p>
          </div>

          <div class="p-6">
            <div class="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 class="text-sm text-gray-600">ORDER NUMBER</h2>
                <p class="font-bold">{{ order.orderId }}</p>
              </div>
              <div>
                <h2 class="text-sm text-gray-600">ORDER DATE</h2>
                <p class="font-bold">{{ formattedDate }}</p>
              </div>
              <div>
                <h2 class="text-sm text-gray-600">PAYMENT METHOD</h2>
                <p class="font-bold">{{ paymentMethod }}</p>
              </div>
              <div>
                <h2 class="text-sm text-gray-600">TOTAL AMOUNT</h2>
                <p class="font-bold text-primary-500">₦{{ order.total.toLocaleString() }}</p>
              </div>
            </div>

            <div
              v-if="order.deliveryMethod !== 'pickup'"
              class="mb-6 p-4 border rounded-lg bg-blue-50"
            >
              <div class="flex items-start">
                <TruckIcon class="w-6 h-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 class="font-medium">Estimated Delivery</h3>
                  <p class="text-sm">
                    Your order is expected to be delivered by
                    <span class="font-bold">{{ formattedDeliveryDate }}</span>
                  </p>
                  <div class="mt-3 flex items-center text-blue-600 text-sm">
                    <ClockIcon class="w-4 h-4 mr-1" />
                    <span>Track your order status in your account dashboard</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="mb-6 p-4 border rounded-lg bg-green-50">
              <div class="flex items-start">
                <MapPinIcon class="w-6 h-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h3 class="font-medium">Pickup Information</h3>
                  <p class="text-sm">
                    Your order will be available for pickup at our Lagos store from
                    <span class="font-bold">{{ formattedDeliveryDate }}</span>
                  </p>
                  <p class="text-sm mt-1">Address: 123 Ikoku Street, Lagos, Nigeria</p>
                  <p class="text-sm">Opening hours: Mon-Sat, 9am - 6pm</p>
                  <div class="mt-3 flex items-center text-green-600 text-sm">
                    <InfoIcon class="w-4 h-4 mr-1" />
                    <span>Please bring your ID and order number when collecting</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border rounded-lg overflow-hidden">
              <h3 class="px-4 py-3 bg-gray-50 font-medium border-b">Order Summary</h3>
              <div class="divide-y">
                <div v-for="item in order.items" :key="item.id" class="flex p-4">
                  <div class="w-16 h-16 flex-shrink-0">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div class="ml-4 flex-1">
                    <h4 class="font-medium">{{ item.title }}</h4>
                    <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold">₦{{ getDiscountedTotal(item).toLocaleString() }}</p>
                    <p v-if="item.discount" class="text-xs text-gray-500 line-through">
                      ₦{{ (item.price * item.quantity).toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-gray-50 space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span>₦{{ order.subtotal.toLocaleString() }}</span>
                </div>
                <div v-if="order.discount > 0" class="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₦{{ order.discount.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Delivery</span>
                  <span>
                    {{
                      order.deliveryCost === 0 ? 'Free' : `₦${order.deliveryCost.toLocaleString()}`
                    }}
                  </span>
                </div>
                <div class="flex justify-between border-t pt-2 font-bold">
                  <span>Total</span>
                  <span class="text-primary-500">₦{{ order.total.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <div class="mt-6 flex flex-col md:flex-row gap-4">
              <a
                href="/"
                class="flex-1 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors text-center"
              >
                Continue Shopping
              </a>
              <a
                href="/account/orders"
                class="flex-1 py-3 border border-primary-500 text-primary-500 rounded-md font-medium hover:bg-primary-50 transition-colors flex items-center justify-center"
              >
                View Order History
                <ArrowRightIcon class="w-4 h-4 ml-2" />
              </a>
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
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import {
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  ArrowRightIcon,
  MapPinIcon,
  InfoIcon,
} from 'lucide-vue-next'

const order = ref(null)
const formattedDate = ref('')
const formattedDeliveryDate = ref('')
const paymentMethod = ref('')

onMounted(() => {
  try {
    const raw = localStorage.getItem('lastOrder')
    if (!raw) throw new Error('No order')
    order.value = JSON.parse(raw)
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    window.location.href = '/'
    return
  }

  const orderDate = new Date(order.value.orderDate)
  formattedDate.value = orderDate.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const deliveryDays = order.value.deliveryMethod === 'express' ? 2 : 5
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays)
  formattedDeliveryDate.value = deliveryDate.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  paymentMethod.value = {
    card: 'Credit/Debit Card',
    bank: 'Bank Transfer',
    cash: 'Cash on Delivery',
  }[order.value.paymentMethod]
})

const getDiscountedTotal = (item) => {
  const discountedPrice = item.discount
    ? item.price - (item.price * item.discount) / 100
    : item.price
  return discountedPrice * item.quantity
}
</script>

<style scoped>
/* Add any specific overrides or style fixes here if needed */
</style>
