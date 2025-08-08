<template>
  <Layout :showBackButton="true" title="Shopping Cart">
    <template #default>
      <div class="!container !mx-auto !px-4 !py-6">
        <!-- Empty Cart -->
        <div v-if="items.length === 0" class="!bg-white !rounded-lg !shadow-sm !p-6 !text-center">
          <div class="!flex !justify-center !mb-4">
            <ShoppingCartIcon class="!w-16 !h-16 !text-gray-300" />
          </div>
          <h2 class="!text-xl !font-bold !mb-2">Your cart is empty</h2>
          <p class="!text-gray-600 !mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <RouterLink
            to="/"
            class="!inline-block !bg-primary-500 !text-white !px-6 !py-3 !rounded-md !font-medium hover:!bg-primary-600 !transition-colors"
          >
            Continue Shopping
          </RouterLink>
        </div>
        <!-- Cart Items -->
        <div v-else class="md:!flex md:!space-x-6">
          <!-- Items List -->
          <div class="md:!w-2/3">
            <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
              <div class="!px-4 !py-3 !border-b">
                <h2 class="!text-lg !font-bold">Cart Items ({{ itemCount }})</h2>
              </div>
              <div class="!divide-y">
                <div v-for="item in items" :key="item.id" class="!p-4 !flex">
                  <div class="!w-24 !h-24 !flex-shrink-0">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="!w-full !h-full !object-cover !rounded-md"
                    />
                  </div>
                  <div class="!ml-4 !flex-1">
                    <RouterLink
                      :to="`/product/${item.id}`"
                      class="!font-medium hover:!text-primary-500"
                    >
                      {{ item.title }}
                    </RouterLink>
                    <div class="!flex !items-baseline !mt-1">
                      <div class="!font-bold !text-primary-500">{{ formatPrice(item) }}</div>
                      <div v-if="item.discount" class="!ml-2 !text-sm !text-gray-400 !line-through">
                        {{ formatOriginalPrice(item) }}
                      </div>
                    </div>
                    <div class="!flex !items-center !justify-between !mt-3">
                      <div class="!flex !items-center !border !rounded-md">
                        <button
                          class="!px-2 !py-1 hover:!bg-gray-100"
                          @click="updateQuantity(item.id, item.quantity - 1)"
                        >
                          <MinusIcon class="!w-4 !h-4" />
                        </button>
                        <span class="!px-3 !py-1 !border-x">{{ item.quantity }}</span>
                        <button
                          class="!px-2 !py-1 hover:!bg-gray-100"
                          @click="updateQuantity(item.id, item.quantity + 1)"
                        >
                          <PlusIcon class="!w-4 !h-4" />
                        </button>
                      </div>
                      <button
                        class="!text-red-500 hover:!text-red-600 !transition-colors"
                        @click="removeItem(item.id)"
                      >
                        <TrashIcon class="!w-5 !h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="!p-4 !bg-gray-50 !flex !items-center !justify-between">
                <RouterLink to="/" class="!flex !items-center !text-primary-500 hover:!underline">
                  <ChevronLeftIcon class="!w-4 !h-4 !mr-1" /> Continue Shopping
                </RouterLink>
                <button
                  class="!text-red-500 hover:!underline !flex !items-center"
                  @click="clearCart"
                >
                  <TrashIcon class="!w-4 !h-4 !mr-1" /> Remove Item
                </button>
              </div>
            </div>
          </div>
          <!-- Order Summary -->
          <div class="md:!w-1/3">
            <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !mb-6">
              <div class="!px-4 !py-3 !border-b">
                <h2 class="!text-lg !font-bold">Order Summary</h2>
              </div>
              <div class="!p-4 !space-y-3">
                <div class="!flex !justify-between">
                  <span class="!text-gray-600">Subtotal</span>
                  <span class="!font-medium">₦{{ subtotal.toLocaleString() }}</span>
                </div>
                <div v-if="totalDiscount > 0" class="!flex !justify-between !text-green-600">
                  <span>Discount</span>
                  <span>-₦{{ totalDiscount.toLocaleString() }}</span>
                </div>
                <div class="!flex !justify-between !border-t !pt-3 !mt-3">
                  <span class="!font-bold">Total</span>
                  <span class="!font-bold !text-lg !text-primary-500"
                    >₦{{ total.toLocaleString() }}</span
                  >
                </div>
                <button
                  class="!w-full !py-3 !bg-primary-500 !text-white !rounded-md !font-medium !mt-4 hover:!bg-primary-600 !transition-colors"
                  @click="goCheckout"
                >
                  Proceed to Checkout
                </button>
                <div class="!flex !items-center !justify-center !text-xs !text-gray-500 !mt-4">
                  <ShieldCheckIcon class="!w-4 !h-4 !mr-1 !text-green-500" /><span
                    >Secure checkout</span
                  >
                </div>
              </div>
            </div>
            <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !p-4">
              <h3 class="!font-medium !mb-3">We Accept</h3>
              <div class="!flex !flex-wrap !gap-2">
                <span class="!bg-gray-100 !rounded !px-3 !py-1 !text-xs">Visa</span>
                <span class="!bg-gray-100 !rounded !px-3 !py-1 !text-xs">Mastercard</span>
                <span class="!bg-gray-100 !rounded !px-3 !py-1 !text-xs">PayPal</span>
                <span class="!bg-gray-100 !rounded !px-3 !py-1 !text-xs">Bank Transfer</span>
                <span class="!bg-gray-100 !rounded !px-3 !py-1 !text-xs">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import {
  ShoppingCartIcon,
  TrashIcon,
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  ShieldCheckIcon,
} from 'lucide-vue-next'
import Layout from '../../layouts/Layout.vue'
import { useCart } from '../../components/homepagev3/CartProvider.js'

const { items, updateQuantity, removeItem, itemCount, subtotal, totalDiscount, total } = useCart()
const router = useRouter()

const formatPrice = (item) => {
  const discounted = item.discount ? item.price * (1 - item.discount / 100) : item.price
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  })
    .format(discounted)
    .replace('NGN', '₦')
}

const formatOriginalPrice = (item) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  })
    .format(item.price)
    .replace('NGN', '₦')
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    items.value.forEach((item) => removeItem(item.id))
  }
}

const goCheckout = () => router.push('/checkout')
</script>
