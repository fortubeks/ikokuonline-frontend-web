<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import FilterBar from '../../components/homepagev3/FilterBar.vue'
import ProductCard from '../../components/homepagev3/ProductCard.vue'
import Pagination from '../../components/homepagev3/Pagination.vue'
import { TagIcon } from 'lucide-vue-next'

const deals = ref([])
const filteredDeals = ref([])
const isLoading = ref(true)
const view = ref('grid')
const activeSort = ref('Discount: High to Low')
const activeFilters = reactive({})
const currentPage = ref(1)
const dealsPerPage = 8

const fetchDeals = () => {
  isLoading.value = true
  setTimeout(() => {
    const mockDeals = [
      {
        id: 'fd1',
        title: 'Limited Time Offer: Complete Brake Kit for Toyota Camry',
        price: 72250,
        originalPrice: 85000,
        image:
          'https://images.unsplash.com/photo-1600712242805-5f78671b24da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 15,
        category: 'Brakes',
        condition: 'New',
        location: 'Ikeja, Lagos',
        postedTime: '2 days ago',
        isVerified: true,
      },
      {
        id: 'fd2',
        title: 'Premium Michelin Tires - Set of 4',
        price: 216000,
        originalPrice: 240000,
        image:
          'https://images.unsplash.com/photo-1605118883147-1c1cab552085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 10,
        category: 'Tires',
        condition: 'New',
        location: 'Victoria Island, Lagos',
        postedTime: '3 days ago',
        isVerified: true,
      },
      {
        id: 'fd3',
        title: 'Mercedes-Benz Original Headlights',
        price: 140000,
        originalPrice: 175000,
        image:
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 20,
        category: 'Lights',
        condition: 'New',
        location: 'Lekki, Lagos',
        postedTime: '1 day ago',
        isVerified: true,
      },
      {
        id: 'fd4',
        title: 'BMW 3 Series Air Filter Set (Pack of 3)',
        price: 20000,
        originalPrice: 25000,
        image:
          'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 20,
        category: 'Engine Parts',
        condition: 'New',
        location: 'Ikeja, Lagos',
        postedTime: '4 days ago',
        isVerified: false,
      },
      {
        id: 'fd5',
        title: 'Honda Civic Type R Turbocharger K20C1',
        price: 224000,
        originalPrice: 280000,
        image:
          'https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 20,
        category: 'Engine Parts',
        condition: 'Used - Excellent',
        location: 'Ikeja, Lagos',
        postedTime: '5 days ago',
        isVerified: true,
      },
      {
        id: 'fd6',
        title: 'Toyota Land Cruiser Suspension Kit',
        price: 382500,
        originalPrice: 450000,
        image:
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 15,
        category: 'Suspension',
        condition: 'New',
        location: 'Ajah, Lagos',
        postedTime: '1 week ago',
        isVerified: true,
      },
      {
        id: 'fd7',
        title: 'Lexus LX570 Front Grille 2016-2021',
        price: 212500,
        originalPrice: 250000,
        image:
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 15,
        category: 'Body Parts',
        condition: 'Used - Like New',
        location: 'Ajah, Lagos',
        postedTime: '6 days ago',
        isVerified: true,
      },
      {
        id: 'fd8',
        title: 'Ford F-150 Tailgate 2015-2020',
        price: 130500,
        originalPrice: 145000,
        image:
          'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 10,
        category: 'Body Parts',
        condition: 'Used - Good',
        location: 'Ikoyi, Lagos',
        postedTime: '1 week ago',
        isVerified: false,
      },
      {
        id: 'fd9',
        title: 'Audi A4 LED Taillights (Pair)',
        price: 131250,
        originalPrice: 175000,
        image:
          'https://images.unsplash.com/photo-1563720223523-5e79f2bc9271?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 25,
        category: 'Lights',
        condition: 'Used - Like New',
        location: 'Lekki, Lagos',
        postedTime: '3 days ago',
        isVerified: true,
      },
      {
        id: 'fd10',
        title: 'Nissan Altima 2.5L Engine 2013-2018',
        price: 304000,
        originalPrice: 380000,
        image:
          'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        discount: 20,
        category: 'Engines',
        condition: 'Used - Excellent',
        location: 'Apapa, Lagos',
        postedTime: '1 week ago',
        isVerified: true,
      },
    ]
    deals.value = mockDeals
    filteredDeals.value = mockDeals
    isLoading.value = false
  }, 1000)
}

onMounted(fetchDeals)

const handleFilterChange = (filters) => {
  Object.assign(activeFilters, filters)
  currentPage.value = 1
  let result = [...deals.value]
  if (filters.category) result = result.filter((deal) => deal.category === filters.category)
  if (filters.priceRange) {
    const { min, max } = filters.priceRange
    if (min !== null) result = result.filter((deal) => deal.price >= min)
    if (max !== null) result = result.filter((deal) => deal.price <= max)
  }
  if (filters.minDiscount) result = result.filter((deal) => deal.discount >= filters.minDiscount)
  if (filters.conditions?.length)
    result = result.filter((deal) => filters.conditions.includes(deal.condition))
  if (filters.verifiedOnly) result = result.filter((deal) => deal.isVerified)
  filteredDeals.value = result
}

const handleSortChange = (sort) => {
  activeSort.value = sort
  const sorted = [...filteredDeals.value]
  switch (sort) {
    case 'Discount: High to Low':
      sorted.sort((a, b) => b.discount - a.discount)
      break
    case 'Price: Low to High':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'Newest': {
      const timeToHours = (str) =>
        str.includes('hour') ? 1 : str.includes('day') ? parseInt(str) * 24 : parseInt(str) * 24 * 7
      sorted.sort((a, b) => timeToHours(a.postedTime) - timeToHours(b.postedTime))
      break
    }
    default:
      sorted.sort((a, b) => b.discount - a.discount)
  }
  filteredDeals.value = sorted
}

const handleViewChange = (v) => (view.value = v)
const resetFilters = () => {
  Object.keys(activeFilters).forEach((k) => delete activeFilters[k])
  filteredDeals.value = deals.value
  activeSort.value = 'Discount: High to Low'
  currentPage.value = 1
}
const handlePageChange = (p) => {
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const indexOfLastDeal = computed(() => currentPage.value * dealsPerPage)
const indexOfFirstDeal = computed(() => indexOfLastDeal.value - dealsPerPage)
const currentDeals = computed(() =>
  filteredDeals.value.slice(indexOfFirstDeal.value, indexOfLastDeal.value),
)
const totalPages = computed(() => Math.ceil(filteredDeals.value.length / dealsPerPage))
</script>

<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Featured Deals" />
    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!flex !items-center !mb-6">
        <TagIcon class="!w-6 !h-6 !text-primary-500 !mr-3" />
        <h1 class="!text-2xl !font-bold">Featured Deals</h1>
      </div>

      <FilterBar
        @filter-change="handleFilterChange"
        @sort-change="handleSortChange"
        @view-change="handleViewChange"
        @reset-filters="resetFilters"
      />

      <div v-if="isLoading" class="!flex !justify-center !py-12">
        <div
          class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"
        ></div>
      </div>

      <div
        v-else-if="filteredDeals.length === 0"
        class="!bg-white !rounded-lg !p-8 !text-center !mt-4"
      >
        <h3 class="!text-xl !font-bold !mb-2">No deals found</h3>
        <p class="!text-gray-600">Try adjusting your filters or check back later for new deals</p>
        <a
          href="#"
          @click.prevent="resetFilters"
          class="!mt-4 !inline-block !px-4 !py-2 !bg-primary-500 !text-white !rounded-md"
        >
          Reset Filters
        </a>
      </div>

      <div v-else>
        <div
          :class="
            view === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'flex flex-col space-y-3'
          "
        >
          <div
            v-for="(deal, index) in currentDeals"
            :key="deal.id"
            class="!animate-fadeIn"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <ProductCard
              :id="deal.id"
              :title="deal.title"
              :price="deal.price"
              :location="deal.location"
              :image="deal.image"
              :isVerified="deal.isVerified"
              :view="view"
              :condition="deal.condition"
              :postedTime="deal.postedTime"
              :discount="deal.discount"
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
    <Footer />
    <BottomNavigation />
  </div>
</template>
