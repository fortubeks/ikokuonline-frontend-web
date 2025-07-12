<template>
    <div class="row gy-4">
        <div class="col-12">
            <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
                <div class="card-header">
                    <h6 class="title">{{ vehicleListing ? 'Update Vehicle Listing' : 'Add Vehicle Listing' }}</h6>
                </div>
                <div class="card-body">
                        
                    <div v-if="formType === 'simple'">
                        <!-- Simple Form -->
                        <p>Simply write the description and upload quality pictures of your vehicle.</p>
                        <div class="col-sm-12 col-xs-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" class="common-input common-input--md border--color-dark bg--white" rows="3"></textarea>
                        </div>
                        <div class="col-sm-12 col-xs-12">
                            <label for="images" class="form-label">Upload Images</label>
                            <input type="file" id="images" class="common-input common-input--md border--color-dark bg--white" multiple>
                        </div>
                    </div>

                    <div class="row gy-3" v-else-if="formType === 'advanced'">
                    <!-- Advanced Form -->
                        <div class="col-sm-6 col-xs-6">
                            <label for="carMakeId" class="form-label">Car Make</label>
                            <select id="carMakeId" class="common-input common-input--md border--color-dark bg--white">
                                <!-- Populate dynamically with car makes -->
                                <option value="">Select Make</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="carModelId" class="form-label">Car Model</label>
                            <select id="carModelId" class="common-input common-input--md border--color-dark bg--white">
                                <!-- Populate dynamically with car models -->
                                <option value="">Select Model</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="year" class="form-label">Year</label>
                            <input type="number" class="common-input common-input--md border--color-dark bg--white" id="year">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="trim" class="form-label">Trim</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="trim">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="color" class="form-label">Color</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="color">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="interiorColor" class="form-label">Interior Color</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="interiorColor">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="transmission" class="form-label">Transmission</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="transmission">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="vin" class="form-label">VIN</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="vin">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="condition" class="form-label">Condition</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="condition">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" step="0.01" class="common-input common-input--md border--color-dark bg--white" id="price">
                        </div>

                        <div class="col-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" class="common-input common-input--md border--color-dark bg--white" rows="5"></textarea>
                        </div>
                        <div class="col-sm-12 col-xs-12">
                            <label for="images" class="form-label">Upload Images</label>
                            <input type="file" id="images" class="common-input common-input--md border--color-dark bg--white" multiple>
                        </div>

                    </div>

                    <div v-else>
                    <p>Please select a form type.</p>
                    </div>

                    <div class="col-sm-12 text-end">
                        <button class="btn btn-main btn-lg pill mt-4"> {{ vehicleListing ? 'Update Vehicle Listing ' : 'Add Vehicle Listing' }}</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const formType = computed(() => route.query.type || 'simple');

const props = defineProps({
  vehicleListing: {
    type: Object,
    default: null
  }
});
</script>