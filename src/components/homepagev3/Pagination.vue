<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="!flex !justify-center !items-center !my-6">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="!p-2 !rounded-md !border !mr-2 disabled:!opacity-50 disabled:!cursor-not-allowed"
    >
      <ChevronLeftIcon class="!w-5 !h-5" />
    </button>

    <div class="!flex !space-x-1">
      <button
        v-for="(page, index) in visiblePages"
        :key="index"
        @click="typeof page === 'number' && handlePageChange(page)"
        class="!w-8 !h-8 !flex !items-center !justify-center !rounded-md"
        :class="[
          typeof page === 'number' && page === currentPage
            ? '!bg-primary-500 !text-white'
            : 'hover:!bg-gray-100'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="!p-2 !rounded-md !border !ml-2 disabled:!opacity-50 disabled:!cursor-not-allowed"
    >
      <ChevronRightIcon class="!w-5 !h-5" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const emit = defineEmits(['page-change'])

const handlePageChange = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const pages = computed(() =>
  Array.from({ length: props.totalPages }, (_, i) => i + 1)
)

const visiblePages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages

  if (total <= 7) return pages.value

  if (current <= 3) {
    return [...pages.value.slice(0, 5), '...', total]
  } else if (current >= total - 2) {
    return [1, '...', ...pages.value.slice(total - 5)]
  } else {
    return [1, '...', current - 1, current, current + 1, '...', total]
  }
})
</script>
