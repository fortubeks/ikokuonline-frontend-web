<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="title">Products</h5>
            <div class="card-header-actions">
              <router-link :to="{ name: 'ProductCreate' }" class="btn btn-main">
                <i class="las la-plus"></i> Add Product
              </router-link>
            </div>
          </div>
          <div class="py-4">
            <form class="search-input d-sm-block" @submit.prevent>
              <span class="icon">
                <img
                  src="@/assets/dp-market-dashboard/images/icons/search-dark.svg"
                  class="white-version"
                />
                <img
                  src="@/assets/dp-market-dashboard/images/icons/search-dark-white.svg"
                  class="dark-version"
                />
              </span>
              <input
                type="text"
                v-model="searchQuery"
                class="common-input common-input--md common-input--bg pill w-100"
                placeholder="Search here..."
              />
            </form>
          </div>

          <div class="table-responsive">
            <table class="table text-body mt--24">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id">
                  <td data-label="Name">{{ product.name }}</td>
                  <td data-label="Price">₦ {{ product.price.toLocaleString() }}</td>
                  <td data-label="Details">
                    <router-link
                      :to="{ name: 'ProductEdit', params: { id: product.id } }"
                      class="btn btn-main"
                    >
                      <i class="far fa-eye"></i>
                    </router-link>
                  </td>
                </tr>
                <tr v-if="paginatedProducts.length === 0">
                  <td colspan="3" class="text-center">No products found</td>
                </tr>
              </tbody>
            </table>
            <Pagination
              :total="filteredProducts.length"
              v-model:currentPage="currentPage"
              v-model:pageSize="pageSize"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from '@components/dashboard/Pagination.vue'
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const products = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const searchQuery = ref('')

// filter products by search
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// pagination logic applied to filtered results
const start = computed(() => (currentPage.value - 1) * pageSize.value)
const end = computed(() => Math.min(start.value + pageSize.value, filteredProducts.value.length))
const paginatedProducts = computed(() => filteredProducts.value.slice(start.value, end.value))

// Fetch products on component mount
const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products')
    products.value = response.data.data.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
