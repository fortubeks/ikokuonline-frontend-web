<template>
  <Layout @search="handleSearch">
    <HeroSection />

    <div class="!container !mx-auto !px-4 !py-6 !max-w-screen-xl">
      <FeaturedCarousel :items="featuredDeals" title="Featured Deals" />

      <div class="!mb-6">
        <CategorySection
          title="Browse Categories"
          :categories="categories"
          viewAllLink="/categories/all"
        />
      </div>

      <div class="!bg-white !rounded-lg !shadow-sm !py-4 !px-4 !mb-6">
        <div class="!flex !justify-between !items-center !mb-3">
          <h2 class="!text-lg !font-bold">Popular Car Brands</h2>
          <a :href="'/brands'" class="!text-primary-500 !text-sm !font-medium hover:!underline">
            View All
          </a>
        </div>
        <div class="!grid !grid-cols-5 md:!grid-cols-10 !gap-4">
          <div
            v-for="brand in featuredBrands.slice(0, 10)"
            :key="brand.id"
            @click="handleBrandClick(brand.id)"
            class="!flex !flex-col !items-center !transition-transform hover:!scale-105 !cursor-pointer"
          >
            <div
              class="!flex !items-center !justify-center !w-14 !h-14 !bg-gray-100 !rounded-full hover:!bg-gray-200 !transition-colors"
            >
              <img :src="brand.icon" :alt="brand.name" class="!w-8 !h-8" />
            </div>
            <span class="!mt-1 !text-xs !text-center">{{ brand.name }}</span>
          </div>
        </div>
      </div>

      <PopularProducts :products="popularProducts" viewAllLink="/category/all" />

      <FilterBar
        :onFilterChange="handleFilterChange"
        :onSortChange="handleSortChange"
        :onViewChange="handleViewChange"
        :onResetFilters="resetFilters"
      />

      <template v-if="isLoading">
        <div class="!flex !justify-center !py-12">
          <div
            class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"
          ></div>
        </div>
      </template>

      <template v-else-if="!filteredProducts.length">
        <div class="!bg-white !rounded-lg !p-8 !text-center !mt-4 !animate-fadeIn">
          <h3 class="!text-xl !font-bold !mb-2">No results found</h3>
          <p class="!text-gray-600 !mb-4">Try adjusting your search or filter criteria</p>
          <button
            @click="clearFilters"
            class="!px-4 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors"
          >
            Clear all filters
          </button>
        </div>
      </template>

      <template v-else>
        <div class="!animate-fadeIn">
          <div class="!flex !justify-between !items-center !mb-4 !mt-6">
            <h2 class="!text-xl !font-bold">{{ filteredProducts.length }} Results</h2>
            <a
              :href="'/category/all'"
              class="!text-primary-500 !text-sm !font-medium hover:!underline"
            >
              View All Products
            </a>
          </div>
          <div :class="[view === 'grid' ? gridClass : listClass]">
            <div
              v-for="(product, index) in currentPageProducts"
              :key="product.id"
              :style="{ animationDelay: `${index * 50}ms` }"
              class="!animate-fadeIn !cursor-pointer"
              @click="handleProductClick(product.id)"
            >
              <ProductCard v-bind="product" :view="view" />
            </div>
          </div>
          <div v-if="filteredProducts.length > 8" class="!text-center !mt-6">
            <a
              :href="'/category/all'"
              class="!inline-block !px-6 !py-3 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors"
            >
              View All {{ filteredProducts.length }} Products
            </a>
          </div>
        </div>
      </template>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  products as initialProducts,
  categories,
  featuredBrands,
} from '../../components/utils/homepagev3utils/data.js'
import Layout from '../../layouts/Layout.vue'
import FilterBar from '../../components/homepagev3/FilterBar.vue'
import ProductCard from '../../components/homepagev3/ProductCard.vue'
import CategorySection from '../../components/homepagev3/CategorySection.vue'
import HeroSection from '../../components/homepagev3/HeroSection.vue'
import FeaturedCarousel from '../../components/homepagev3/FeaturedCarousel.vue'
import PopularProducts from '../../components/homepagev3/PopularProducts.vue'

const router = useRouter()

// const navigate = (path) => router.push(path)

const filteredProducts = ref([initialProducts])
const isLoading = ref(false)
const view = ref('grid')
const searchQuery = ref('')
const activeFilters = ref({})
const activeSort = ref('Recommended')

const featuredDeals = [
  {
    id: 'f1',
    title: 'Limited Time Offer: Complete Brake Kit for Toyota Camry',
    price: 85000,
    image:
      'https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    discount: 15,
  },
  {
    id: 'f2',
    title: 'Premium Michelin Tires - Set of 4',
    price: 240000,
    image:
      'https://images.unsplash.com/photo-1605118883147-1c1cab552085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    discount: 10,
  },
  {
    id: 'f3',
    title: 'Mercedes-Benz Original Headlights',
    price: 175000,
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    discount: 20,
  },
]

const popularProducts = computed(() =>
  initialProducts
    .map((p) => ({
      ...p,
      views: Math.floor(Math.random() * 5000) + 500,
      rating: p.rating || Math.floor(Math.random() * 10) / 2 + 3,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 4),
)

watch(
  [searchQuery, activeFilters, activeSort],
  () => {
    isLoading.value = true
    setTimeout(() => {
      let result = [...initialProducts]
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase()
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            (p.compatibility && p.compatibility.toLowerCase().includes(q)),
        )
      }
      filteredProducts.value = result
      isLoading.value = false
    }, 300)
  },
  { immediate: true },
)

const handleSearch = (q) => (searchQuery.value = q)
const handleFilterChange = (f) => (activeFilters.value = f)
const handleSortChange = (s) => (activeSort.value = s)
const handleViewChange = (v) => (view.value = v)
const clearFilters = () => {
  searchQuery.value = ''
  activeFilters.value = {}
  activeSort.value = 'Recommended'
}

const handleBrandClick = (id) => router.push(`/brand/${id}`)
const handleProductClick = (id) => router.push(`/product/${id}`)

const currentPageProducts = computed(() => filteredProducts.value.slice(0, 8))

const gridClass = '!grid !grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 !gap-4'
const listClass = '!flex !flex-col !space-y-3'
</script>
