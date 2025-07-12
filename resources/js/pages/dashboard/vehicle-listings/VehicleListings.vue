<template>
    <div class="row gy-4">
        <div class="col-12">
            <div class="card common-card border border-gray-five">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="title">Vehicle Listings</h5>
                        <div class="card-header-actions">
                            <!-- <router-link :to="{ name: 'VehicleListingCreate' }" class="btn btn-main">
                                <i class="las la-plus"></i> Add Vehicle Listing
                            </router-link> -->
                            <button class="btn btn-main" data-bs-toggle="modal" data-bs-target="#listingTypeModal">
                                <i class="las la-plus"></i> Add Vehicle Listing
                            </button>
                        </div>
                    </div>
                    <div class="py-4">
                        <form class="search-input d-sm-block">
                            <span class="icon">
                            <img src="/public/assets/dp-market-dashboard/images/icons/search-dark.svg" class="white-version" />
                            <img src="/public/assets/dp-market-dashboard/images/icons/search-dark-white.svg" class="dark-version" />
                            </span>
                            <input type="text" class="common-input common-input--md common-input--bg pill w-100" placeholder="Search here..." />
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
                                <tr v-for="product in paginatedVehicleListings" :key="product.id">
                                <td data-label="Name">{{ product.name }}</td>
                                <td data-label="Price">₦ {{ product.price.toLocaleString() }}</td>
                                <td data-label="Details">
                                    <router-link :to="{ name: 'VehicleListingEdit', params: { id: product.id } }" class="btn btn-main">
                                    <i class="far fa-eye"></i>
                                    </router-link>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination
                            :total="vehicleListings.length"
                            v-model:currentPage="currentPage"
                            v-model:pageSize="pageSize"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="listingTypeModal" tabindex="-1" aria-labelledby="listingTypeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
        <div class="modal-header border-0">
            <h5 class="modal-title" id="listingTypeModalLabel">Choose Listing Type</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
            <p>Select how you want to create your listing:</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <button class="btn btn-main" @click="goToCreate('simple')" data-bs-dismiss="modal">
                    Simple
                </button>

                <button class="btn btn-outline-main" @click="goToCreate('advanced')" data-bs-dismiss="modal">
                    Advanced
                </button>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import Pagination from '@components/Pagination.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const vehicleListings = ref([/* ... */]); // fetched or static

const currentPage = ref(1);
const pageSize = ref(5);

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const end = computed(() => Math.min(start.value + pageSize.value, vehicleListings.value.length));
const paginatedVehicleListings = computed(() =>
  vehicleListings.value.slice(start.value, end.value)
);

function goToCreate(type) {
  // Close modal manually
  const modal = bootstrap.Modal.getInstance(document.getElementById('listingTypeModal'));
  modal.hide();

  // Navigate to Create route with query string
  router.push({ name: 'VehicleListingCreate', query: { type } });
}
</script>
