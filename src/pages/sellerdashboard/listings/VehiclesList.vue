<template>
  <div class="h-[150vh] flex-grow w-full">
    <div
      class="h-[300px] relative w-full bg-cover bg-center"
      :style="`background-image: url(${bgcover})`"
    >
      <div
        v-if="tab === 0"
        class="px-[32px] overflow-x-auto w-[500px] h-fit lg:w-full top-[70%] absolute"
      >
        <div class="w-full h-fit bg-[#FFFFFF] overflow-x-auto py-[32px]">
          <h1 class="text-3xl font-bold pb-6 px-[18px]">Vehicle Listings</h1>

          <div class="flex justify-between px-[40px] items-center mb-6 flex-wrap gap-4">
            <div class="flex space-x-6">
              <button
                class="py-2 font-sora"
                :class="activeTab === 'all' ? 'font-semibold text-[#000425]' : 'text-gray-500'"
                @click="activeTab = 'all'"
              >
                All ({{ vehicles.length }})
              </button>
              <button
                class="py-2 font-sora"
                :class="activeTab === 'in-stock' ? 'font-semibold text-[#000425]' : 'text-gray-500'"
                @click="activeTab = 'in-stock'"
              >
                In Stock
              </button>
              <button
                class="py-2 font-sora"
                :class="
                  activeTab === 'out-stock' ? 'font-semibold text-[#000425]' : 'text-gray-500'
                "
                @click="activeTab = 'out-stock'"
              >
                Out Stock
              </button>
            </div>

            <div class="flex space-x-4 relative">
              <!-- Filter Dropdown -->
              <div class="relative" ref="filterDropdownRef">
                <button
                  class="flex items-center px-4 py-2 border border-gray-300 rounded-md"
                  @click="filterOpen = !filterOpen"
                >
                  {{ selectedCondition || 'Filter' }}
                  <i class="ph ph-caret-down ml-2 text-base"></i>
                </button>
                <div
                  v-if="filterOpen"
                  class="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-md w-full"
                >
                  <button
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    @click="handleFilterSelection('New')"
                  >
                    Condition: New
                  </button>
                  <button
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    @click="handleFilterSelection('Used')"
                  >
                    Condition: Used
                  </button>
                </div>
              </div>

              <div class="relative" ref="dateDropdownRef">
                <button
                  class="flex items-center px-4 py-2 border border-gray-300 rounded-md"
                  @click="dateOpen = !dateOpen"
                >
                  {{ selectedDate || 'All Date' }}
                  <i class="ph ph-caret-down ml-2 text-base"></i>
                </button>
                <div
                  v-if="dateOpen"
                  class="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-md w-full"
                >
                  <button
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    @click="handleDateSelection('Today')"
                  >
                    Today
                  </button>
                  <button
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    @click="handleDateSelection('This Week')"
                  >
                    This Week
                  </button>
                  <button
                    class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    @click="handleDateSelection('This Month')"
                  >
                    This Month
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto pl-[60px]">
            <table class="w-full border-collapse">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Name</th>
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Model</th>
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Price</th>
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Stock</th>
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Condition</th>
                  <th class="py-4 text-left font-semibold font-sora text-[#000425]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="vehicle in filteredVehicles"
                  :key="vehicle.id"
                  class="border-b border-gray-200 border-dashed"
                >
                  <td class="py-4">{{ vehicle.name }}</td>
                  <td class="py-4">{{ vehicle.model }}</td>
                  <td class="py-4">{{ vehicle.price }}</td>
                  <td class="py-4">{{ vehicle.stock }}</td>
                  <td class="py-4">{{ vehicle.condition }}</td>
                  <td class="py-4">
                    <div class="flex items-center gap-[14px]">
                      <button>
                        <img :src="editicon" alt="edit" />
                      </button>
                      <button>
                        <img :src="deleteicon" alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pt-[32px] flex justify-between flex-wrap gap-4">
            <div class="relative flex gap-[30px] px-[49px]" ref="bulkDropdownRef">
              <button
                class="flex items-center h-fit px-[16px] py-[16px] bg-gray-100 rounded-md"
                @click="bulkActionsOpen = !bulkActionsOpen"
              >
                {{ selectedBulkAction || 'Bulk Actions' }}
                <i class="ph ph-caret-down ml-2 text-base"></i>
              </button>

              <div
                v-if="bulkActionsOpen"
                class="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10"
              >
                <button
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  @click="
                    () => {
                      selectedBulkAction.value = 'Edit'
                      bulkActionsOpen.value = false
                    }
                  "
                >
                  Edit
                </button>
                <button
                  class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  @click="
                    () => {
                      selectedBulkAction.value = 'Delete'
                      bulkActionsOpen.value = false
                    }
                  "
                >
                  Delete
                </button>
              </div>

              <button
                class="h-fit px-[28.5px] py-[13px] bg-white border border-gray-300 text-orange-500 font-medium rounded-md"
                :disabled="!selectedBulkAction"
              >
                Apply
              </button>
            </div>

            <div class="px-[25px]">
              <button class="btn btn-main btn-lg rounded-[10px] mt-4" @click="tab = 1">
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="tab === 1" class="absolute top-[70%] px-[32px] w-full">
        <AddNewListing @close="tab = 0" @add-vehicle="handleAddVehicle" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import bgcover from '@/assets/svgs/coverpicture.svg'
import editicon from '@/assets/svgs/edit-icon.svg'
import deleteicon from '@/assets/svgs/deleteicon.svg'
import AddNewListing from './AddNewListing.vue'
const tab = ref(0)

// const showAddForm = ref(false)

function handleAddVehicle(newVehicle) {
  vehicles.value.unshift({
    ...newVehicle,
    addedDate: new Date().toISOString().split('T')[0],
  })
  tab.value = 0 // return to list view
}

const selectedBulkAction = ref(null)
const bulkDropdownRef = ref(null)

const activeTab = ref('all')
const bulkActionsOpen = ref(false)
const filterOpen = ref(false)
const dateOpen = ref(false)

const filterDropdownRef = ref(null)
const dateDropdownRef = ref(null)

const selectedCondition = ref(null)
const selectedDate = ref(null)

const vehicles = ref([
  {
    id: 1,
    name: 'Nissan',
    model: 'SUV',
    price: 'N4,000,000',
    stock: 45,
    condition: 'New',
    addedDate: '2025-07-28',
  },
  {
    id: 2,
    name: 'Jaguar',
    model: '2005',
    price: 'N4,000,000',
    stock: 8,
    condition: 'Used',
    addedDate: '2025-07-27',
  },
  {
    id: 3,
    name: 'Camry',
    model: '2024',
    price: 'N4,000,000',
    stock: 45,
    condition: 'New',
    addedDate: '2025-07-20',
  },
  {
    id: 4,
    name: 'Jeep',
    model: 'SUV',
    price: 'N4,000,000',
    stock: 0,
    condition: 'Used',
    addedDate: '2025-07-01',
  },
  {
    id: 5,
    name: 'Toyota',
    model: 'Saloon',
    price: 'N4,000,000',
    stock: 45,
    condition: 'Used',
    addedDate: '2025-06-30',
  },
  {
    id: 6,
    name: 'Honda',
    model: '2014',
    price: 'N4,000,000',
    stock: 5,
    condition: 'New',
    addedDate: '2025-07-28',
  },
])

function isInSelectedDateRange(dateStr) {
  const today = new Date()
  const d = new Date(dateStr)

  if (selectedDate.value === 'Today') {
    return today.toDateString() === d.toDateString()
  }

  if (selectedDate.value === 'This Week') {
    const diff = (today - d) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }

  if (selectedDate.value === 'This Month') {
    return today.getMonth() === d.getMonth() && today.getFullYear() === d.getFullYear()
  }

  return true
}

const filteredVehicles = computed(() => {
  return vehicles.value.filter((v) => {
    const inStockFilter =
      activeTab.value === 'in-stock'
        ? v.stock > 0
        : activeTab.value === 'out-stock'
          ? v.stock === 0
          : true

    const conditionFilter = selectedCondition.value ? v.condition === selectedCondition.value : true
    const dateFilter = selectedDate.value ? isInSelectedDateRange(v.addedDate) : true

    return inStockFilter && conditionFilter && dateFilter
  })
})

function handleFilterSelection(option) {
  selectedCondition.value = option
  filterOpen.value = false
}

function handleDateSelection(option) {
  selectedDate.value = option
  dateOpen.value = false
}

function handleClickOutside(event) {
  if (filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)) {
    filterOpen.value = false
  }
  if (dateDropdownRef.value && !dateDropdownRef.value.contains(event.target)) {
    dateOpen.value = false
  }
  if (bulkDropdownRef.value && !bulkDropdownRef.value.contains(event.target)) {
    bulkActionsOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>
