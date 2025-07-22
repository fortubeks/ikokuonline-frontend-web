<template>
  <div class="relative w-fit font-inter" ref="dropdownRef">
    <!-- Trigger Section -->
    <section
      class="h-[48px] flex items-center justify-center cursor-pointer border border-[#FD603E] px-4 rounded-l-lg gap-2"
      @click="toggleModal"
    >
      <p class="text-xs font-medium text-[#808080] truncate max-w-[120px]">
        {{ selectedCategory || 'All Categories' }}
      </p>
      <img :src="arrowdown" alt="arrow" />
    </section>

    <div
      v-if="showModal"
      class="absolute z-50 mt-2 w-[322px] pb-[30px] font-sora bg-white border border-[#ccc] rounded-lg shadow-lg"
    >
      <!-- Header -->
      <div class="bg-[#F3E7DE] rounded-t-lg py-3.5 px-[24px]">
        <p class="text-base font-semibold w-fit text-[#101828]">Categories</p>
      </div>

      <!-- Search & Arrow Controls -->
      <div class="relative mb-2 px-[19px] py-[27px]">
        <div class="flex flex-col gap-1.5 relative">
          <p class="text-sm font-semibold text-[#344054]">Enter Category</p>
          <input
            v-model="search"
            type="text"
            placeholder="Enter category"
            class="w-full px-3.5 text-base text-[#667085] h-[44px] py-2.5 font-normal border border-[#D0D5DD] rounded-lg focus:outline-none"
          />

          <div class="absolute right-[5%] top-[70%] -translate-y-1/2 flex flex-col">
            <button
              @click.stop="moveSelection(-1)"
              class="text-xs text-[#676872]"
              :disabled="selectedIndex <= 0"
              :class="{ 'opacity-40 cursor-not-allowed': selectedIndex <= 0 }"
            >
              &#9650;
            </button>
            <button
              @click.stop="moveSelection(1)"
              class="text-xs text-[#676872]"
              :disabled="selectedIndex >= filteredCategories.length - 1"
              :class="{
                'opacity-40 cursor-not-allowed': selectedIndex >= filteredCategories.length - 1,
              }"
            >
              &#9660;
            </button>
          </div>
        </div>
      </div>

      <ul
        class="max-h-[120px] px-3.5 overflow-y-auto text-sm bg-white border border-[#ccc] rounded-md"
        v-if="filteredCategories.length > 0"
      >
        <li
          v-for="(item, index) in filteredCategories"
          :key="index"
          @click="selectCategory(item, index)"
          :class="[
            'category-item px-2 py-1 cursor-pointer hover:bg-[#FD603E]/10',
            selectedIndex === index ? 'bg-[#FD603E]/20 font-semibold' : '',
          ]"
        >
          {{ item }}
        </li>
      </ul>

      <button
        class="mt-3 bg-[#FD603E] text-white rounded-[10px] w-full text-sm py-2.5 hover:bg-[#e05532]"
        @click="applySelection"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import arrowdown from '@/assets/svgs/arrowdown.svg'

const dropdownRef = ref(null)
const showModal = ref(false)
const search = ref('')
const selectedIndex = ref(-1)
const selectedCategory = ref('')

const categories = ref(['Tyres', 'Batteries', 'Brake Pads', 'Wipers', 'Engine Oil'])

const filteredCategories = computed(() =>
  categories.value.filter((c) => c.toLowerCase().includes(search.value.toLowerCase())),
)

function toggleModal() {
  showModal.value = !showModal.value
  search.value = ''
  selectedIndex.value = -1
}

function moveSelection(direction) {
  const maxIndex = filteredCategories.value.length - 1
  if (maxIndex < 0) return

  const newIndex = selectedIndex.value + direction
  if (newIndex >= 0 && newIndex <= maxIndex) {
    selectedIndex.value = newIndex

    // eslint-disable-next-line no-undef
    nextTick(() => {
      const list = document.querySelectorAll('.category-item')
      if (list[selectedIndex.value]) {
        list[selectedIndex.value].scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    })
  }
}

function selectCategory(value, index) {
  selectedIndex.value = index
  search.value = value
}

function applySelection() {
  if (selectedIndex.value >= 0) {
    selectedCategory.value = filteredCategories.value[selectedIndex.value]
  } else {
    selectedCategory.value = search.value || 'All Categories'
  }
  showModal.value = false
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showModal.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #fd603e50;
  border-radius: 4px;
}
</style>
