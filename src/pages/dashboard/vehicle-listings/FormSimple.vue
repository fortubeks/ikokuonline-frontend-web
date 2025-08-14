<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
        <div class="card-header">
          <h6 class="title">
            {{ vehicleListing ? 'Update Vehicle Listing' : 'Add Vehicle Listing' }}
          </h6>
        </div>
        <div class="card-body">
          <div class="row gy-3">
            <div class="col-sm-12 col-xs-12">
              <label class="form-label">Description</label>
              <textarea
                class="common-input common-input--md border--color-dark bg--white"
                v-model="form.description"
                rows="4"
                placeholder="Enter vehicle description"
              ></textarea>
            </div>

            <div class="col-sm-12 col-xs-12">
              <label class="form-label">Pictures</label>
              <input
                type="file"
                class="form-control"
                @change="handleFileUpload"
                multiple
                accept="image/*"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="price" class="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                class="common-input common-input--md border--color-dark bg--white"
                v-model="form.price"
                id="price"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="price" class="form-label">Buyer Take Home</label>
              <input
                type="number"
                step="0.01"
                class="common-input common-input--md border--color-dark bg--white"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="condition" class="form-label">Condition</label>
              <select
                id="condition"
                class="common-input common-input--md border--color-dark bg--white"
              >
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div class="col-sm-6 col-xs-6 d-flex align-items-center mt-4">
              <input type="checkbox" id="can_negotiate" class="me-2" />
              <label for="can_negotiate" class="form-label mb-0">Can Negotiate</label>
            </div>

            <div class="col-sm-12 text-end">
              <button class="btn btn-main btn-lg pill mt-4" @click.prevent="submitForm">
                {{ vehicleListing ? 'Update Vehicle Listing ' : 'Add Vehicle Listing' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'VehicleListingCreateSimple',
  props: {
    vehicleListing: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        description: '',
        pictures: [],
      },
    }
  },
  mounted() {
    if (this.vehicleListing) {
      this.form = { ...this.vehicleListing }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.form.pictures = Array.from(event.target.files)
    },
    submitForm() {
      // Form submission logic (e.g., API request)
      const method = this.vehicleListing ? 'put' : 'post'
      const url = this.product
        ? `/api/vehicle-listings/${this.vehicleListing.id}`
        : '/api/vehicle-listings'

      api[method](url, this.form)
        .then(() => {
          // Handle success (e.g., notify user or redirect)
          alert('Vehicle Listing saved successfully!')
          //redirect
          this.$router.push({ name: 'VehicleListings' }) // redirect to vehicle listing page
        })
        .catch((err) => {
          // Handle error (e.g., show error message)
          console.error('Error saving product:', err)
        })
    },
  },
}
</script>
