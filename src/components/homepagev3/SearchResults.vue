<template>
  <div
    v-if="isVisible"
    class="!absolute !top-full mt-2 !left-0 !right-0 !bg-white !shadow-lg !rounded-b-lg !z-50 !max-h-[80vh] !overflow-y-auto"
  >
    <div class="!sticky !top-0 !flex !items-center !justify-between !p-4 !bg-white !border-b">
      <h3 class="!font-medium !flex !text-base !items-center">
        <SearchIcon class="!w-4 !h-4 !mr-2 !text-gray-400" />
        Search Results
      </h3>
      <button @click="onClose" class="!p-1 hover:!bg-gray-100 !rounded-full">
        <XIcon class="!w-5 !h-5" />
      </button>
    </div>

    <div v-if="loading" class="!flex !justify-center !py-8">
      <div
        class="!animate-spin !rounded-full !h-8 !w-8 !border-t-2 !border-b-2 !border-primary-500"
      ></div>
    </div>

    <div v-else-if="results.length === 0 && query.trim() !== ''" class="!p-6 !text-center">
      <p class="!text-gray-500">No results found for "{{ query }}"</p>
      <p class="!text-sm !text-gray-400 !mt-2">Try using different keywords or check for typos</p>
    </div>

    <template v-else>
      <!-- Categories -->
      <div v-if="categories.length" class="!p-4 !border-b">
        <h4 class="!text-xs !text-gray-500 !mb-2">CATEGORIES</h4>
        <div class="!flex !flex-wrap !gap-2">
          <RouterLink
            v-for="(category, idx) in categories"
            :key="idx"
            :to="`/category/${slugify(category)}`"
            @click="onClose"
            class="!px-3 !py-1 !bg-gray-100 hover:!bg-gray-200 !rounded-full !text-sm !transition-colors"
          >
            {{ category }}
          </RouterLink>
        </div>
      </div>

      <!-- Products -->
      <div v-if="results.length" class="!p-4">
        <h4 class="!text-xs !text-gray-500 !mb-2">PRODUCTS</h4>
        <div class="!space-y-3">
          <RouterLink
            v-for="product in results"
            :key="product.id"
            :to="`/product/${product.id}`"
            @click="handleResultClick"
            class="!flex !items-center !p-2 hover:!bg-gray-50 !rounded-lg !transition-colors"
          >
            <div class="!w-12 !h-12 !flex-shrink-0">
              <img
                :src="product.image"
                :alt="product.title"
                class="!w-full !h-full !object-cover !rounded"
              />
            </div>
            <div class="!ml-3 !flex-1">
              <h5 class="!font-medium line-clamp-1 text-base">{{ product.title }}</h5>
              <p class="!text-sm !text-gray-500">{{ product.category }}</p>
            </div>
            <div class="!text-primary-500 !font-bold">₦{{ product.price.toLocaleString() }}</div>
          </RouterLink>

          <RouterLink
            :to="`/search?q=${encodeURIComponent(query)}`"
            @click="handleResultClick"
            class="!block !text-center !text-primary-500 hover:!underline !py-2 !font-medium"
          >
            View all results
          </RouterLink>
        </div>
      </div>

      <!-- Recent Searches -->
      <div class="!p-4 !border-t">
        <h4 class="!text-xs !text-gray-500 !mb-2">RECENT SEARCHES</h4>
        <div class="!space-y-2">
          <template v-if="recentSearches.length">
            <RouterLink
              v-for="(term, idx) in recentSearches"
              :key="idx"
              :to="`/search?q=${encodeURIComponent(term)}`"
              @click="onClose"
              class="!flex !items-center !p-2 hover:!bg-gray-50 !rounded-lg !transition-colors"
            >
              <SearchIcon class="!w-4 !h-4 !text-gray-400 !mr-3" />
              <span>{{ term }}</span>
            </RouterLink>
          </template>
          <p v-else class="!text-sm !text-gray-500 !p-2">No recent searches</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { SearchIcon, XIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { products } from '../../components/utils/homepagev3utils/data'

const props = defineProps({
  query: { type: String, required: true },
  onClose: { type: Function, required: true },
  isVisible: { type: Boolean, required: true },
})

const results = ref([])
const categories = ref([])
const loading = ref(false)
const recentSearches = ref([])
let searchTimer = null

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-')

const fetchResults = () => {
  clearTimeout(searchTimer)

  if (!props.query.trim() || !props.isVisible) {
    results.value = []
    categories.value = []
    loading.value = false
    return
  }

  loading.value = true

  searchTimer = setTimeout(() => {
    const term = props.query.toLowerCase()

    const filtered = products.filter((p) =>
      [p.title, p.description, p.category, p.compatibility]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term)),
    )

    results.value = filtered.slice(0, 5)
    categories.value = [...new Set(filtered.map((p) => p.category).filter(Boolean))].slice(0, 3)
    loading.value = false
  }, 300) // 300ms debounce after last keystroke
}

watch(() => [props.query, props.isVisible], fetchResults, { immediate: true })

const saveRecentSearch = (term) => {
  if (!term.trim()) return
  const stored = JSON.parse(localStorage.getItem('recentSearches') || '[]')
  const filtered = stored.filter((s) => s.toLowerCase() !== term.toLowerCase())
  const updated = [term, ...filtered].slice(0, 5)
  localStorage.setItem('recentSearches', JSON.stringify(updated))
  recentSearches.value = updated
}

onMounted(() => {
  recentSearches.value = JSON.parse(localStorage.getItem('recentSearches') || '[]')
})

const handleResultClick = () => {
  saveRecentSearch(props.query)
  props.onClose()
}
</script>
