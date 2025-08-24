<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="title">Product Categories</h5>
            <div class="card-header-actions">
              <router-link :to="{ name: 'ProductCategoriesCreate' }" class="btn btn-main">
                <i class="las la-plus"></i> Add Product Category
              </router-link>
            </div>
          </div>
          <div class="py-4">
            <form class="search-input d-sm-block">
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
                  <th>Parent</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="productCategory in paginatedProductCategories" :key="productCategory.id">
                  <td data-label="Name">{{ productCategory.name }}</td>
                  <td data-label="Parent">{{ productCategory.parent?.name || '—' }}</td>
                  <td data-label="Details">
                    <router-link
                      :to="{
                        name: 'ProductCategoriesEdit',
                        params: { id: productCategory.id },
                      }"
                      class="btn btn-main"
                    >
                      <i class="far fa-eye"></i>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination
              :total="filteredCategories.length"
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

const productCategories = ref([])
const currentPage = ref(1)
const pageSize = ref(5)
const searchQuery = ref('')

// 🔍 Filtered categories by search
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return productCategories.value
  }
  return productCategories.value.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (cat.parent?.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Pagination depends on filtered results
const start = computed(() => (currentPage.value - 1) * pageSize.value)
const end = computed(() => Math.min(start.value + pageSize.value, filteredCategories.value.length))
const paginatedProductCategories = computed(() =>
  filteredCategories.value.slice(start.value, end.value),
)

// Fetch product categories on component mount
const fetchModelList = async () => {
  try {
    const response = await api.get('/api/product-categories')
    productCategories.value = response.data.data.data
  } catch (error) {
    console.error('Failed to fetch list:', error)
  }
}

onMounted(() => {
  fetchModelList()
})
</script>
