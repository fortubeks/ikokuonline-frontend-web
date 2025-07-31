<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
        <div class="card-header">
          <h6 class="title">{{ product ? 'Update Product' : 'Add Product' }}</h6>
        </div>
        <div class="card-body">
          <div class="row gy-3">
            <!-- Product Category -->
            <div class="col-sm-6 col-xs-6">
              <label for="product_category_id" class="form-label">Product Category</label>
              <select v-model="form.product_category_id" class="common-input common-input--md border--color-dark bg--white">
                <option value="">Select Category</option>
                <option v-for="category in productCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Product Name -->
            <div class="col-sm-6 col-xs-6">
              <label for="name" class="form-label">Product Name</label>
              <input v-model="form.name" type="text" class="common-input common-input--md border--color-dark bg--white" id="name">
            </div>

            <!-- Description -->
            <div class="col-sm-12 col-xs-12">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="form.description" class="common-input common-input--md border--color-dark bg--white" rows="3" id="description"></textarea>
            </div>

            <!-- Price -->
            <div class="col-sm-6 col-xs-6">
              <label for="price" class="form-label">Price</label>
              <input v-model="form.price" type="number" step="0.01" class="common-input common-input--md border--color-dark bg--white" id="price">
            </div>

            <!-- Stock -->
            <div class="col-sm-6 col-xs-6">
              <label for="stock" class="form-label">Stock Quantity</label>
              <input v-model="form.stock" type="number" class="common-input common-input--md border--color-dark bg--white" id="stock">
            </div>

            <!-- Brand -->
            <div class="col-sm-6 col-xs-6">
              <label for="brand" class="form-label">Brand</label>
              <input v-model="form.brand" type="text" class="common-input common-input--md border--color-dark bg--white" id="brand">
            </div>

            <!-- Car Make using @vueform/multiselect -->
            <div class="col-sm-6 col-xs-6">
              <label for="car_make_id" class="form-label">Car Make</label>
              <Multiselect
                id="car_make_id"
                v-model="form.car_make_id"
                :options="makeOptions"
                :searchable="true"
                :loading="loadingMakes"
                :clear-on-select="true"
                :can-clear="false"
                :multiple="false"
                placeholder="Select Make"
                @search-change="debouncedFetchCarMakes"
              />
            </div>

            <!-- Car Model using @vueform/multiselect -->
            <div class="col-sm-6 col-xs-6">
              <label for="car_model_id" class="form-label">Car Model</label>
              <Multiselect
                id="car_model_id"
                v-model="form.car_model_id"
                :options="modelOptions"
                :searchable="true"
                :loading="loadingModels"
                :clear-on-select="true"
                :can-clear="false"
                :multiple="false"
                placeholder="Select Model"
                @search-change="debouncedFetchCarModels"
              />
            </div>

            <!-- Condition -->
            <div class="col-sm-6 col-xs-6">
              <label for="condition" class="form-label">Condition</label>
              <select v-model="form.condition" class="common-input common-input--md border--color-dark bg--white" id="condition">
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <!-- Can Negotiate -->
            <div class="col-sm-6 col-xs-6 d-flex align-items-center mt-4">
              <input v-model="form.can_negotiate" type="checkbox" id="can_negotiate" class="me-2">
              <label for="can_negotiate" class="form-label mb-0">Can Negotiate</label>
            </div>

            <!-- Submit Button -->
            <div class="col-sm-12 text-end">
              <button class="btn btn-main btn-lg pill mt-4" @click.prevent="submitForm">
                {{ product ? 'Update Product' : 'Add Product' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { debounce } from 'lodash'
import api from '@/services/api'

export default {
  components: { Multiselect },
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        product_category_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        brand: '',
        car_make_id: '',
        car_model_id: '',
        condition: 'new',
        can_negotiate: false,
      },
      productCategories: [],
      makeOptions: [],
      modelOptions: [],
      loadingMakes: false,
      loadingModels: false,
    }
  },
  created() {
    // Setup debounced versions of fetch functions
    this.debouncedFetchCarMakes = debounce(this.fetchCarMakes, 300)
    this.debouncedFetchCarModels = debounce(this.fetchCarModels, 300)
  },
  mounted() {
    this.fetchProductCategories()
    if (this.product) {
      this.form = { ...this.product }
    }
  },
  methods: {
    fetchProductCategories() {
      api.get('/api/product-categories')
        .then(res => this.productCategories = res.data)
    },
    fetchCarMakes(query) {
      if (!query || query.length < 2) return
      this.loadingMakes = true
      api.get(`/api/car-makes/search?q=${query}`)
        .then(res => {
          this.makeOptions = res.data.data.map(m => ({ value: m.id, label: m.name }))
        })
        .finally(() => this.loadingMakes = false)
    },
    fetchCarModels(query) {
      if (!query || query.length < 2 || !this.form.car_make_id) return
      this.loadingModels = true
      api.get(`/api/car-models/search?make_id=${this.form.car_make_id}&q=${query}`)
        .then(res => {
          this.modelOptions = res.data.data.map(m => ({ value: m.id, label: m.name }))
        })
        .finally(() => this.loadingModels = false)
    },
    submitForm() {
      const method = this.product ? 'put' : 'post'
      const url = this.product ? `/api/products/${this.product.id}` : '/api/products'

      api[method](url, this.form)
        .then(res => {
          // Handle success (e.g., notify user or redirect)
        })
    }
  }
}
</script>
