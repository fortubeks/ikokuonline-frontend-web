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
        v-else-if="currentProducts.length === 0"
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
            Showing {{ meta.from }}-{{ meta.to }} of {{ meta.total }} results
          </p>
        </div>

        <div class="!animate-fadeIn">
          <div :class="view === 'grid' ? gridClass : listClass">
            <div
              v-for="(product, index) in currentProducts"
              :key="product.id"
              class="!animate-fadeIn !cursor-pointer"
              :style="{ animationDelay: `${index * 50}ms` }"
              @click="handleProductClick(product.slug)"
            >
              <ProductCard v-bind="product" :view="view" />
            </div>
          </div>

          <Pagination
            v-if="meta.total_pages > 1"
            :currentPage="currentPage"
            :totalPages="meta.total_pages"
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
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const category_id = route.params.slug
const q = route.query.q

const currentProducts = ref([])
const view = ref('grid')
const isLoading = ref(true)
const activeFilters = ref({})
const categoryInfo = ref(null)

const currentPage = ref(1)
const productsPerPage = 8

const products = ref([])
const categories = ref([])
const totalProducts = ref(0)

const meta = ref({
  from: 0,
  to: 0,
  total: 0,
  last_page: 1,
  total_pages: 1
})

onMounted(() => {
  fetchCategories()
  fetchProducts()
})

function handleFilterChange(filters) {
  activeFilters.value = filters
  currentPage.value = 1
}

function handleViewChange(newView) {
  view.value = newView
}

function resetFilters() {
  activeFilters.value = {}
  currentPage.value = 1
}

function handlePageChange(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleProductClick(productSlug) {
  router.push(`/product/${productSlug}`)
}

const categoryName = 'All';

const gridClass = '!grid !grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-4'
const listClass = '!flex !flex-col !space-y-3'

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const params = {
      q: q,
      category: category_id,
      ...activeFilters.value, // Merge all active filters here
      page: currentPage.value,
      per_page: productsPerPage
    }
    const response = await api.get('/api/products', { params })

    const resData = response.data.data
    products.value = resData.data
    currentProducts.value = products.value

    meta.value = {
      from: resData.from,
      to: resData.to,
      total: resData.total,
      last_page: resData.last_page,
      total_pages: Math.ceil(resData.total / resData.per_page)
    }
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    isLoading.value = false
  }
}

watch([() => category_id, route.query.q, activeFilters, currentPage], () => {
  fetchProducts()
},
{ deep: true })

const fetchCategories = async () => {
  try {
    const response = await api.get('/api/product-categories')

    const resData = response.data.data
    categories.value = resData.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}
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
