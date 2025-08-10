<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
        <div class="card-header">
          <h6 class="title">{{ vehicleListing ? 'Update Vehicle Listing' : 'Add Vehicle Listing' }}</h6>
        </div>
        <div class="card-body">
          <div class="row gy-3">

            <div class="col-sm-6 col-xs-6">
              <label for="vehicle_listing_category_id" class="form-label">Vehicle Listing Category</label>
              <select v-model="form.vehicle_listing_category_id" class="common-input common-input--md border--color-dark bg--white">
                <option value="">Select Category</option>
                <option v-for="category in vehicleListingCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="name" class="form-label">Vehicle Listing Name</label>
              <input v-model="form.name" type="text" class="common-input common-input--md border--color-dark bg--white" id="name">
            </div>

            <div class="col-sm-12 col-xs-12">
              <label for="description" class="form-label">Description</label>
              <textarea v-model="form.description" class="common-input common-input--md border--color-dark bg--white" rows="3" id="description"></textarea>
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="price" class="form-label">Price</label>
              <input v-model="form.price" type="number" step="0.01" class="common-input common-input--md border--color-dark bg--white" id="price">
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="stock" class="form-label">Stock Quantity</label>
              <input v-model="form.stock" type="number" class="common-input common-input--md border--color-dark bg--white" id="stock">
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="brand" class="form-label">Brand</label>
              <input v-model="form.brand" type="text" class="common-input common-input--md border--color-dark bg--white" id="brand">
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="car_make_id" class="form-label">Car Make</label>
              <Multiselect
                v-model="form.car_make_id"
                :options="makeOptions"
                :searchable="true"
                :loading="loadingMakes"
                :multiple="false"
                placeholder="Select Make"
                @search-change="fetchCarMakes"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="car_model_id" class="form-label">Car Model</label>
              <Multiselect
                v-model="form.car_model_id"
                :options="modelOptions"
                :searchable="true"
                :loading="loadingModels"
                :multiple="false"
                placeholder="Select Model"
                @search-change="fetchCarModels"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="condition" class="form-label">Condition</label>
              <select v-model="form.condition" class="common-input common-input--md border--color-dark bg--white" id="condition">
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div class="col-sm-6 col-xs-6 d-flex align-items-center mt-4">
              <input v-model="form.can_negotiate" type="checkbox" id="can_negotiate" class="me-2">
              <label for="can_negotiate" class="form-label mb-0">Can Negotiate</label>
            </div>

            <div class="col-sm-12 text-end">
              <button class="btn btn-main btn-lg pill mt-4" @click.prevent="submitForm">
                {{ vehicleListing ? 'Update Vehicle Listing' : 'Add Vehicle Listing' }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';
import { debounce } from 'lodash';
import api from '@/services/api';

const props = defineProps({
  vehicleListing: {
    type: Object,
    default: null,
  },
});

const form = ref({
  vehicle_listing_category_id: '',
  name: '',
  description: '',
  price: '',
  stock: '',
  brand: '',
  car_make_id: '',
  car_model_id: '',
  condition: 'new',
  can_negotiate: false,
});

const vehicleListingCategories = ref([]);
const makeOptions = ref([]);
const modelOptions = ref([]);
const loadingMakes = ref(false);
const loadingModels = ref(false);

const fetchVehicleListingCategories = async () => {
  const res = await api.get('/api/product-categories');
  vehicleListingCategories.value = res.data;
};

const fetchCarMakes = debounce(async (query) => {
  if (!query || query.length < 2) return;
  loadingMakes.value = true;
  const res = await api.get(`/api/car-makes/search?q=${query}`);
  makeOptions.value = res.data.data.map(m => ({ value: m.id, label: m.name }));
  loadingMakes.value = false;
}, 300);


const fetchCarModels = debounce(async (query) => {
  if (!query || query.length < 2 || !form.value.car_make_id) return;
  loadingModels.value = true;
  const res = await api.get(`/api/car-models/search?make_id=${form.value.car_make_id}&q=${query}`);
  modelOptions.value = res.data.data.map(m => ({ value: m.id, label: m.name }));
  loadingModels.value = false;
}, 300);

const submitForm = async () => {
  const method = props.vehicleListing ? 'put' : 'post';
  const url = props.vehicleListing
    ? `/api/vehicle-listings/${props.vehicleListing.id}`
    : '/api/vehicle-listings';

  const res = await api[method](url, form.value);
};

onMounted(() => {
  fetchVehicleListingCategories();
  if (props.vehicleListing) {
    form.value = { ...props.vehicleListing };
  }
});
</script>
