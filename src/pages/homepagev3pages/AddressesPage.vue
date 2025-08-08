<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="My Addresses" />
    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!bg-white !rounded-lg !shadow-sm !p-4 !mb-4">
        <h2 class="!text-lg !font-bold !mb-4">Your Addresses</h2>

        <div v-if="addresses.length === 0" class="!text-center !py-8">
          <MapPinIcon class="!w-12 !h-12 !text-gray-300 !mx-auto !mb-3" />
          <p class="!text-gray-500">No addresses added yet</p>
        </div>

        <div v-else class="!space-y-4">
          <div
            v-for="address in addresses"
            :key="address.id"
            :class="[
              '!border !rounded-lg !p-4 !relative',
              address.isDefault ? '!border-primary-500 !bg-primary-50' : ''
            ]"
          >
            <div class="!flex !justify-between">
              <div>
                <div class="!font-medium">{{ address.name }}</div>
                <div class="!text-sm !text-gray-700 !mt-1">
                  {{ address.address }}
                </div>
                <div class="!text-sm !text-gray-700">
                  {{ address.city }}, {{ address.state }}
                </div>
                <div class="!text-sm !text-gray-500 !mt-1">
                  {{ address.phone }}
                </div>
              </div>
              <div class="!flex !flex-col !space-y-2">
                <button class="!text-primary-500 hover:!text-primary-600">
                  <PencilIcon class="!w-5 !h-5" />
                </button>
                <button
                  @click="handleDelete(address.id)"
                  class="!text-red-500 hover:!text-red-700"
                >
                  <TrashIcon class="!w-5 !h-5" />
                </button>
              </div>
            </div>

            <div v-if="address.isDefault" class="!absolute !top-0 !right-0 !bg-primary-500 !text-white !text-xs !px-2 !py-1 !rounded-bl-lg !rounded-tr-lg">
              Default
            </div>
            <button
              v-else
              @click="handleSetDefault(address.id)"
              class="!mt-3 !text-sm !text-primary-500 hover:!underline"
            >
              Set as Default
            </button>
          </div>
        </div>

        <button
          class="!mt-6 !w-full !py-3 !flex !items-center !justify-center !border !border-dashed !border-gray-300 !rounded-lg hover:!bg-gray-50 !transition-colors"
        >
          <PlusIcon class="!w-5 !h-5 !mr-2 !text-primary-500" />
          <span class="!text-primary-500 !font-medium">Add New Address</span>
        </button>
      </div>

      <div class="!bg-white !rounded-lg !shadow-sm !p-4">
        <h3 class="!font-medium !mb-2">Delivery Information</h3>
        <p class="!text-sm !text-gray-600">
          Your default address will be used for deliveries. Make sure your
          address details are accurate for smooth delivery.
        </p>
      </div>
    </div>
    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MapPinIcon, PlusIcon, TrashIcon, PencilIcon } from 'lucide-vue-next'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'

const addresses = ref([
  {
    id: '1',
    name: 'Home',
    address: '123 Main Street, Ikeja',
    city: 'Lagos',
    state: 'Lagos State',
    phone: '+234 801 234 5678',
    isDefault: true
  },
  {
    id: '2',
    name: 'Office',
    address: '45 Business Avenue, Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    phone: '+234 802 345 6789',
    isDefault: false
  }
])

const handleDelete = (id) => {
  addresses.value = addresses.value.filter((address) => address.id !== id)
}

const handleSetDefault = (id) => {
  addresses.value = addresses.value.map((address) => ({
    ...address,
    isDefault: address.id === id
  }))
}
</script>
