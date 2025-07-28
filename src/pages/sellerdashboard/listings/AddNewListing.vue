<template>
  <div class="inset-0 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 w-full overflow-y-auto">
      <div class="flex justify-between px-[18px] items-center mb-6">
        <h2 class="text-2xl font-bold">Add New Listing</h2>
        <button @click="onClose" class="text-gray-500 hover:text-gray-700">
          <i class="ph ph-x text-xl"></i>
        </button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 max-w-[90%] gap-[24px] px-[57px]">
          <div>
            <label class="block mb-2 font-medium">Brand</label>
            <input
              v-model="brand"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Nissan"
              required
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Model</label>
            <input
              v-model="model"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md"
              placeholder="SUV"
              required
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Year</label>
            <input
              v-model="year"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md"
              placeholder="2005"
              required
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Condition</label>
            <input
              v-model="condition"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md"
              placeholder="New"
              required
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Price</label>
            <input
              v-model="price"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md"
              placeholder="N4,000,000"
              required
            />
          </div>
          <div>
            <label class="block mb-2 font-medium">Fuel Usage</label>
            <div class="relative">
              <button
                type="button"
                class="w-full p-3 border border-gray-300 rounded-md flex justify-between items-center"
                @click="fuelDropdownOpen = !fuelDropdownOpen"
              >
                {{ fuelUsage }} <span class="text-gray-500">▼</span>
              </button>
              <div
                v-if="fuelDropdownOpen"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10"
              >
                <button
                  v-for="option in fuelOptions"
                  :key="option"
                  type="button"
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  @click="
                    () => {
                      fuelUsage = option
                      fuelDropdownOpen = false
                    }
                  "
                >
                  {{ option }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-[25px] max-w-[90%] px-[57px]">
          <label class="block mb-2 font-medium">Upload Images</label>
          <div class="border border-gray-300 rounded-md p-4">
            <div class="flex flex-wrap gap-4">
              <div v-for="(preview, index) in imagePreviews" :key="index" class="relative">
                <img :src="preview" alt="preview" class="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  @click="removeImage(index)"
                >
                  <i class="ph ph-x text-sm"></i>
                </button>
              </div>
              <button
                type="button"
                class="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400"
                @click="triggerImageUpload"
              >
                <i class="ph ph-plus"></i>
              </button>
            </div>
            <input
              ref="fileInputRef"
              type="file"
              class="hidden"
              accept="image/jpeg,image/png"
              multiple
              @change="handleImageUpload"
            />
            <p class="text-sm text-gray-500 mt-2">Supported formats are *.jpg and *.png</p>
          </div>
        </div>

        <div class="p-[32px] flex justify-end">
          <button type="submit" class="btn btn-main btn-lg rounded-[10px] mt-4">Add New</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'add-vehicle'])

const brand = ref('')
const model = ref('')
const year = ref('')
const condition = ref('')
const price = ref('')
const fuelUsage = ref('Electricity')
const fuelDropdownOpen = ref(false)
const fuelOptions = ['Electricity', 'Petrol', 'Diesel', 'Hybrid', 'Gas']

const images = ref([])
const imagePreviews = ref([])
const fileInputRef = ref(null)

function triggerImageUpload() {
  fileInputRef.value?.click()
}

function handleImageUpload(e) {
  const files = Array.from(e.target.files)
  const newPreviews = files.map((file) => URL.createObjectURL(file))
  images.value.push(...files)
  imagePreviews.value.push(...newPreviews)
}

function removeImage(index) {
  URL.revokeObjectURL(imagePreviews.value[index])
  images.value.splice(index, 1)
  imagePreviews.value.splice(index, 1)
}

function handleSubmit() {
  const newVehicle = {
    id: Date.now(),
    name: brand.value,
    model: model.value,
    year: year.value,
    price: price.value,
    condition: condition.value,
    fuelUsage: fuelUsage.value,
    stock: 10,
    images: imagePreviews.value,
  }
  emit('add-vehicle', newVehicle)
  emit('close')
}

function onClose() {
  emit('close')
}
</script>
