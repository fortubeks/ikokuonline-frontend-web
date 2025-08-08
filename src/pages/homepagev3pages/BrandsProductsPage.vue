<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" :title="`${brandName} Parts`" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!flex !items-center !mb-6">
        <img v-if="brandInfo" :src="brandInfo.icon" :alt="brandInfo.name" class="!w-12 !h-12 !mr-4" />
        <h1 class="!text-2xl !font-bold">
          {{ brandName }} Parts & Accessories
        </h1>
      </div>

      <FilterBar
        :onFilterChange="handleFilterChange"
        :onSortChange="handleSortChange"
        :onViewChange="handleViewChange"
        :onResetFilters="resetFilters"
      />

      <div v-if="isLoading" class="!flex !justify-center !py-12">
        <div class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"></div>
      </div>

      <div v-else>
        <div v-if="filteredProducts.length === 0" class="!bg-white !rounded-lg !p-8 !text-center !mt-4">
          <h3 class="!text-xl !font-bold !mb-2">No products found</h3>
          <p class="!text-gray-600 !mb-4">
            We couldn't find any {{ brandName }} parts at the moment.
          </p>
          <button @click="resetFilters" class="!px-4 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors">
            Reset Filters
          </button>
        </div>

        <div v-else>
          <div class="!flex !justify-between !items-center !mb-4">
            <p class="!text-sm !text-gray-600">
              Showing {{ startIndex + 1 }}–
              {{ Math.min(endIndex, filteredProducts.length) }} of
              {{ filteredProducts.length }} results
            </p>
          </div>

          <div class="animate-fadeIn">
            <div :class="viewGridClass">
              <div
                v-for="(product, index) in currentProducts"
                :key="product.id"
                class="animate-fadeIn"
                :style="{ animationDelay: `${index * 50}ms` }"
                @click="navigateProduct(product.id)"
              >
                <ProductCard
                  :id="product.id"
                  :title="product.title"
                  :price="product.price"
                  :location="product.location"
                  :image="product.image"
                  :isVerified="product.isVerified"
                  :isFeatured="product.isFeatured"
                  :view="view"
                  :condition="product.condition"
                  :postedTime="product.postedTime"
                  :rating="product.rating || 4.5"
                  :discount="product.discount"
                />
              </div>
            </div>

            <Pagination
              v-if="totalPages > 1"
              :currentPage="currentPage"
              :totalPages="totalPages"
              @page-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import FilterBar from '../../components/homepagev3/FilterBar.vue'
import ProductCard from '../../components/homepagev3/ProductCard.vue'
import Pagination from '../../components/homepagev3/Pagination.vue'
import { products, featuredBrands } from '../../components/utils/homepagev3utils/data'

const route = useRoute()
const router = useRouter()
const brandId = route.params.id

const brandInfo = ref(null)
const brandProducts = ref([])
const filteredProducts = ref([])
const isLoading = ref(true)

const view = ref('grid')
const activeFilters = ref({})
const activeSort = ref('Recommended')
const currentPage = ref(1)
const productsPerPage = 8

const startIndex = computed(() => (currentPage.value - 1) * productsPerPage)
const endIndex = computed(() => startIndex.value + productsPerPage)
const currentProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage))
const brandName = computed(() => brandInfo.value?.name || brandId)

const viewGridClass = computed(() =>
  view.value === 'grid'
    ? '!grid !grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-4'
    : '!flex !flex-col !space-y-3'
)

const fetchProducts = () => {
  isLoading.value = true
  currentPage.value = 1
  brandInfo.value = featuredBrands.find(b => b.id === brandId)
  setTimeout(() => {
    const name = brandInfo.value?.name.toLowerCase() || ''
    const filtered = products.filter(
      p =>
        p.title.toLowerCase().includes(name) ||
        (p.compatibility && p.compatibility.toLowerCase().includes(name))
    )
    brandProducts.value = filtered
    filteredProducts.value = filtered
    isLoading.value = false
  }, 500)
}

const handleFilterChange = filters => {
  activeFilters.value = filters
  currentPage.value = 1
  let result = [...brandProducts.value]
  if (filters.category) result = result.filter(p => p.category === filters.category)
  if (filters.priceRange) {
    const { min, max } = filters.priceRange
    if (min !== null) result = result.filter(p => p.price >= min)
    if (max !== null) result = result.filter(p => p.price <= max)
  }
  if (filters.conditions?.length) result = result.filter(p => filters.conditions.includes(p.condition))
  if (filters.verifiedOnly) result = result.filter(p => p.isVerified)
  if (filters.hasDiscount) {
    result = result.filter(p => p.discount && p.discount > 0)
    if (filters.minDiscount) result = result.filter(p => p.discount >= filters.minDiscount)
  }
  filteredProducts.value = result
}

const handleSortChange = sort => {
  activeSort.value = sort
  let sorted = [...filteredProducts.value]
  switch (sort) {
    case 'Newest':
      sorted.sort((a, b) => parseTime(a.postedTime) - parseTime(b.postedTime))
      break
    case 'Price: Low to High':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'Most Popular':
      sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      break
    case 'Best Rated':
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'Discount: High to Low':
      sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0))
      break
  }
  filteredProducts.value = sorted
}

const handleViewChange = v => view.value = v

const resetFilters = () => {
  activeFilters.value = {}
  filteredProducts.value = [...brandProducts.value]
  activeSort.value = 'Recommended'
  currentPage.value = 1
}

const handlePageChange = page => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateProduct = id => router.push(`/product/${id}`)
const parseTime = t => {
  if (t.includes('hour')) return 1
  if (t.includes('day')) return parseInt(t) * 24
  return parseInt(t) * 24 * 7
}

onMounted(fetchProducts)
watch(() => brandId, fetchProducts)
</script>
