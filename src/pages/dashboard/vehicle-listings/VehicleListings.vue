<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="title">Vehicle Listings</h5>
            <div class="card-header-actions">
              <button
                class="btn btn-main"
                data-bs-toggle="modal"
                data-bs-target="#vehicleTypeModal"
              >
                <i class="las la-plus"></i> Add Vehicle Listing
              </button>
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
                <tr v-for="vehicleListing in paginatedVehicleListings" :key="vehicleListing.id">
                  <td data-label="Name">{{ vehicleListing.description ?? '—' }}</td>
                  <td data-label="Price">
                    ₦
                    {{ vehicleListing.price != null ? vehicleListing.price.toLocaleString() : '—' }}
                  </td>
                  <td data-label="Details">
                    <router-link
                      :to="{
                        name: vehicleListing.name
                          ? 'VehicleListingEdit'
                          : 'VehicleListingEditSimple',
                        params: { id: vehicleListing.id },
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
  <div
    class="modal fade"
    id="vehicleTypeModal"
    tabindex="-1"
    aria-labelledby="vehicleTypeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="vehicleTypeModalLabel">Choose Listing Type</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <p>Select the type of vehicle listing you want to create:</p>
          <div class="d-flex justify-content-center gap-3 mt-3">
            <button class="btn btn-sub" @click="goTo('VehicleListingCreateSimple')">
              <i class="las la-plus"></i>Simple
            </button>
            <button class="btn btn-main" @click="goTo('VehicleListingCreate')">
              <i class="las la-plus"></i>Advanced
            </button>
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

const vehicleListings = ref([]) // fetched or static
const currentPage = ref(1)
const pageSize = ref(5)

const start = computed(() => (currentPage.value - 1) * pageSize.value)
const end = computed(() => Math.min(start.value + pageSize.value, vehicleListings.value.length))
const paginatedVehicleListings = computed(() => vehicleListings.value.slice(start.value, end.value))

// Fetch vehicleListings on component mount
const fetchModelList = async () => {
  try {
    const response = await api.get('/api/vehicle-listings')
    vehicleListings.value = response.data.data.data
  } catch (error) {
    console.error('Failed to fetch list:', error)
  }
}

onMounted(() => {
  fetchModelList()
})
</script>

<script>
import { Modal } from 'bootstrap'
export default {
  name: 'VehicleListing',
  methods: {
    goTo(routeName) {
      // Close the modal
      const modalEl = document.getElementById('vehicleTypeModal')
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl)
      modal.hide()

      // Navigate after modal is hidden
      modalEl.addEventListener(
        'hidden.bs.modal',
        () => {
          this.$router.push({ name: routeName })
        },
        { once: true }, // only run once
      )
    },
  },
}
</script>
