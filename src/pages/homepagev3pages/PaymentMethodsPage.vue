<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :show-back-button="true" title="Payment Methods" />

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Card List -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-4 !mb-4">
        <h2 class="!text-lg !font-bold !mb-4">Your Payment Methods</h2>

        <div v-if="paymentMethods.length === 0" class="!text-center !py-8">
          <CreditCardIcon class="!w-12 !h-12 !text-gray-300 !mx-auto !mb-3" />
          <p class="!text-gray-500">No payment methods added yet</p>
        </div>

        <div v-else class="!space-y-4">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            :class="['!border !rounded-lg !p-4 !relative', method.isDefault ? '!border-primary-500 !bg-primary-50' : '']"
          >
            <div class="!flex !items-center !justify-between">
              <div>
                <div class="!font-medium">
                  {{ method.type }} {{ method.number }}
                </div>
                <div class="!text-sm !text-gray-500">
                  Expires: {{ method.expiry }} • {{ method.name }}
                </div>
              </div>
              <div class="!flex !space-x-2">
                <button
                  v-if="!method.isDefault"
                  @click="setDefault(method.id)"
                  class="!text-sm !text-primary-500 hover:!underline"
                >
                  Set as Default
                </button>
                <button
                  @click="deleteMethod(method.id)"
                  class="!text-red-500 hover:!text-red-700"
                >
                  <TrashIcon class="!w-5 !h-5" />
                </button>
              </div>
            </div>

            <div
              v-if="method.isDefault"
              class="!absolute !top-0 !right-0 !bg-primary-500 !text-white !text-xs !px-2 !py-1 !rounded-bl-lg !rounded-tr-lg"
            >
              Default
            </div>
          </div>
        </div>

        <button
          class="!mt-6 !w-full !py-3 !flex !items-center !justify-center !border !border-dashed !border-gray-300 !rounded-lg hover:!bg-gray-50 !transition-colors"
          @click="showAddForm = true"
        >
          <PlusIcon class="!w-5 !h-5 !mr-2 !text-primary-500" />
          <span class="!text-primary-500 !font-medium">Add New Payment Method</span>
        </button>
      </div>

      <!-- Security Info -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-4">
        <h3 class="!font-medium !mb-2">Payment Security</h3>
        <p class="!text-sm !text-gray-600">
          Your payment information is securely stored and encrypted. We never
          store your complete card details on our servers.
        </p>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import { CreditCardIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'

// State
const showAddForm = ref(false)
const paymentMethods = ref([
  {
    id: '1',
    type: 'Visa',
    number: '**** **** **** 4242',
    expiry: '09/25',
    name: 'John Doe',
    isDefault: true
  },
  {
    id: '2',
    type: 'Mastercard',
    number: '**** **** **** 5555',
    expiry: '12/24',
    name: 'John Doe',
    isDefault: false
  }
])

// Methods
const deleteMethod = (id) => {
  paymentMethods.value = paymentMethods.value.filter((m) => m.id !== id)
}

const setDefault = (id) => {
  paymentMethods.value = paymentMethods.value.map((m) => ({
    ...m,
    isDefault: m.id === id
  }))
}
</script>
