<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  options: { type: Array, default: () => [] },
  value: { type: String, default: '' },
  placeholder: { type: String, default: 'Select option' },
  className: { type: String, default: '' },
  buttonClassName: { type: String, default: '' },
  optionsClassName: { type: String, default: '' },
})

const emit = defineEmits(['update:value'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const selectedOption = computed(
  () => props.options?.find((option) => option.value === props.value) || null,
)

const getStatusColor = (option) => option.color || ''

const toggleDropdown = (event) => {
  event.stopPropagation() // prevent triggering outside click
  isOpen.value = !isOpen.value
}

const handleSelect = (option) => {
  emit('update:value', option.value)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="!relative" :class="className">
    <button
      type="button"
      class="!bg-white !relative !w-full !border !border-gray-300 !rounded-md !shadow-sm !pl-3 !pr-10 !py-2 !text-left !cursor-default !focus:outline-none !focus:ring-1 !focus:!ring-blue-500 !focus:!border-blue-500 sm:!text-sm"
      :class="buttonClassName"
      @click="toggleDropdown"
    >
      <div v-if="selectedOption" class="!flex !items-center">
        <span
          v-if="selectedOption.color"
          class="!inline-block !w-2 !h-2 !rounded-full !mr-2"
          :class="getStatusColor(selectedOption)"
        />
        <span class="!text-black">{{ selectedOption.label }}</span>
      </div>
      <span v-else class="!text-gray-400">{{ placeholder }}</span>

      <span class="!absolute !inset-y-0 !right-0 !flex !items-center !pr-2 !pointer-events-none">
        <ChevronDown class="!h-4 !w-4 !text-gray-400" aria-hidden="true" />
      </span>
    </button>

    <div
      v-if="isOpen"
      class="!absolute !z-10 !mt-1 !w-full !bg-white !text-black !shadow-lg !max-h-60 !rounded-md !py-1 !text-base !ring-1 !ring-black !ring-opacity-5 !overflow-auto !focus:outline-none sm:!text-sm"
      :class="optionsClassName"
    >
      <div
        v-for="option in props.options"
        :key="option.value"
        class="!cursor-pointer !select-none !relative !py-2 !pl-3 !pr-9 hover:!bg-gray-100"
        :class="option.value === props.value ? '!bg-gray-100' : ''"
        @click="handleSelect(option)"
      >
        <div class="!flex !items-center">
          <span
            v-if="option.color"
            class="!inline-block !w-2 !h-2 !rounded-full !mr-2"
            :class="getStatusColor(option)"
          />
          <span
            :class="
              option.value === props.value ? '!font-medium !text-black' : '!font-normal !text-black'
            "
          >
            {{ option.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
