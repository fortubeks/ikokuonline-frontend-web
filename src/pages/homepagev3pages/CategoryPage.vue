<template>
  <Layout :showBackButton="true" :title="categoryName">
    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!flex !items-center !mb-6">
        <div
          v-if="categoryInfo"
          class="!flex !items-center !justify-center !w-12 !h-12 !bg-gradient-to-br from-primary-50 to-primary-100 !rounded-full !shadow-sm !mr-3"
        >
          <img :src="categoryInfo.icon" :alt="categoryInfo.name" class="!w-6 !h-6" />
        </div>
        <h1 class="!text-2xl !font-bold">{{ categoryName }}</h1>
      </div>

      <FilterBar
        :onFilterChange="handleFilterChange"
        :onSortChange="handleSortChange"
        :onViewChange="handleViewChange"
        :onResetFilters="resetFilters"
      />

      <div v-if="isLoading" class="!flex !justify-center !py-12">
        <div
          class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"
        ></div>
      </div>

      <div
        v-else-if="filteredProducts.length === 0"
        class="!bg-white !rounded-lg !p-8 !text-center !mt-4"
      >
        <h3 class="!text-xl !font-bold !mb-2">No products found</h3>
        <p class="!text-gray-600 !mb-4">Try adjusting your filters or check back later</p>
        <button
          @click="resetFilters"
          class="!px-4 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <template v-else>
        <div class="!flex !justify-between !items-center !mb-4">
          <p class="!text-sm !text-gray-600">
            Showing {{ indexOfFirstProduct + 1 }}-
            {{ Math.min(indexOfLastProduct, filteredProducts.length) }} of
            {{ filteredProducts.length }} results
          </p>
        </div>

        <div class="!animate-fadeIn">
          <div :class="view === 'grid' ? gridClass : listClass">
            <div
              v-for="(product, index) in currentProducts"
              :key="product.id"
              class="!animate-fadeIn !cursor-pointer"
              :style="{ animationDelay: `${index * 50}ms` }"
              @click="handleProductClick(product.id)"
            >
              <ProductCard v-bind="product" :view="view" />
            </div>
          </div>

          <Pagination
            v-if="totalPages > 1"
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="handlePageChange"
          />
        </div>
      </template>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../../layouts/Layout.vue'
import FilterBar from '../../components/homepagev3/FilterBar.vue'
import ProductCard from '../../components/homepagev3/ProductCard.vue'
import Pagination from '../../components/homepagev3/Pagination.vue'
import { products, categories } from '../../components/utils/homepagev3utils/data'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const categoryProducts = ref([])
const filteredProducts = ref([])
const view = ref('grid')
const isLoading = ref(true)
const activeSort = ref('Recommended')
const activeFilters = ref({})
const categoryInfo = ref(null)

const currentPage = ref(1)
const productsPerPage = 8

onMounted(() => {
  loadCategoryData()
})

watch(
  () => route.params.id,
  () => {
    loadCategoryData()
  },
)

function loadCategoryData() {
  isLoading.value = true
  currentPage.value = 1

  const category = categories.find((cat) => cat.id === id)
  categoryInfo.value = category

  setTimeout(() => {
    let filtered
    if (!id || id === 'all') {
      filtered = [...products]
    } else {
      const categoryName = category?.name || id.replace(/-/g, ' ')
      filtered = products.filter(
        (p) =>
          p.category?.toLowerCase() === categoryName.toLowerCase() ||
          p.category?.toLowerCase().includes(categoryName.toLowerCase()),
      )
    }
    categoryProducts.value = filtered
    filteredProducts.value = filtered
    isLoading.value = false
  }, 500)
}

function handleFilterChange(filters) {
  activeFilters.value = filters
  currentPage.value = 1
}

function handleSortChange(sort) {
  activeSort.value = sort
}

function handleViewChange(newView) {
  view.value = newView
}

function resetFilters() {
  activeFilters.value = {}
  filteredProducts.value = categoryProducts.value
  activeSort.value = 'Recommended'
  currentPage.value = 1
}

function handlePageChange(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleProductClick(productId) {
  router.push(`/product/${productId}`)
}

const indexOfLastProduct = computed(() => currentPage.value * productsPerPage)
const indexOfFirstProduct = computed(() => indexOfLastProduct.value - productsPerPage)
const currentProducts = computed(() =>
  filteredProducts.value.slice(indexOfFirstProduct.value, indexOfLastProduct.value),
)
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage))

const categoryName = computed(() => {
  if (categoryInfo.value?.name) return categoryInfo.value.name
  if (id === 'all') return 'All Products'
  return id.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
})

const gridClass = '!grid !grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-4'
const listClass = '!flex !flex-col !space-y-3'
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
