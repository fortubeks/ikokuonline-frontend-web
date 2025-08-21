<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="title">Vehicle Listings</h5>
            <div class="card-header-actions">
              <router-link :to="{ name: 'VehicleListingCreate' }" class="btn btn-main">
                <i class="las la-plus"></i> Add Vehicle Listing
              </router-link>
            </div>
          </div>

          <!-- Search -->
          <div class="py-4">
            <form class="search-input d-sm-block" @submit.prevent="fetchVehicleListings">
              <span class="icon">
                <img src="@/assets/dp-market-dashboard/images/icons/search-dark.svg" class="white-version" />
                <img src="@/assets/dp-market-dashboard/images/icons/search-dark-white.svg" class="dark-version" />
              </span>
              <input
                v-model="searchTerm"
                type="text"
                class="common-input common-input--md common-input--bg pill w-100"
                placeholder="Search here..."
              />
            </form>
          </div>

          <!-- Table -->
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
                <tr v-for="listing in paginatedVehicleListings" :key="listing.id">
                  <td data-label="Name">{{ listing.slug }}</td>
                  <td data-label="Price">₦ {{ listing.price.toLocaleString() }}</td>
                  <td data-label="Details">
                    <router-link
                      :to="{ name: 'VehicleListingEdit', params: { id: listing.id } }"
                      class="btn btn-main"
                    >
                      <i class="far fa-eye"></i>
                    </router-link>
                  </td>
                </tr>
                <tr v-if="!loading && !vehicleListings.length">
                  <td colspan="3" class="text-center py-4">No listings found</td>
                </tr>
              </tbody>
            </table>

            <div v-if="loading" class="text-center py-4">
              <i class="fas fa-spinner fa-spin"></i> Loading...
            </div>

            <Pagination
              v-if="vehicleListings.length"
              :total="vehicleListings.length"
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
import Pagination from '@components/dashboard/Pagination.vue';
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const vehicleListings = ref([]);
const loading = ref(false);
const searchTerm = ref('');
const currentPage = ref(1);
const pageSize = ref(5);

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const end = computed(() => Math.min(start.value + pageSize.value, vehicleListings.value.length));
const paginatedVehicleListings = computed(() =>
  vehicleListings.value.slice(start.value, end.value)
);

const fetchVehicleListings = async () => {
  loading.value = true;
  try {
    const res = await api.get('/api/vehicle-listings', {
      params: {
        q: searchTerm.value
      }
    });
    vehicleListings.value = res.data.data.data ?? res.data; // Support for paginated API
  } catch (error) {
    console.error('Failed to fetch vehicle listings:', error.response?.data || error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchVehicleListings);
</script>
