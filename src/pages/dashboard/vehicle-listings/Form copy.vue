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
                            <label for="Vehicle Listing_category_id" class="form-label">Vehicle Listing Category</label>
                            <select id="Vehicle Listing_category_id" class="common-input common-input--md border--color-dark bg--white">
                                <!-- Options should be dynamically generated -->
                                <option value="">Select Category</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="name" class="form-label">Vehicle Listing Name</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="name">
                        </div>

                        <div class="col-sm-12 col-xs-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea id="description" class="common-input common-input--md border--color-dark bg--white" rows="3"></textarea>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" step="0.01" class="common-input common-input--md border--color-dark bg--white" id="price">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="stock" class="form-label">Stock Quantity</label>
                            <input type="number" class="common-input common-input--md border--color-dark bg--white" id="stock">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="brand" class="form-label">Brand</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="brand">
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="car_make_id" class="form-label">Car Make</label>
                            <select id="car_make_id" class="common-input common-input--md border--color-dark bg--white">
                                <!-- Options dynamically loaded (e.g. Toyota) -->
                                <option value="">Select Make</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="car_model_id" class="form-label">Car Model</label>
                            <select id="car_model_id" class="common-input common-input--md border--color-dark bg--white">
                                <!-- Options dynamically loaded (e.g. Camry) -->
                                <option value="">Select Model</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6">
                            <label for="condition" class="form-label">Condition</label>
                            <select id="condition" class="common-input common-input--md border--color-dark bg--white">
                                <option value="new">New</option>
                                <option value="used">Used</option>
                            </select>
                        </div>

                        <div class="col-sm-6 col-xs-6 d-flex align-items-center mt-4">
                            <input type="checkbox" id="can_negotiate" class="me-2">
                            <label for="can_negotiate" class="form-label mb-0">Can Negotiate</label>
                        </div>

                        <div class="col-sm-12 text-end">
                            <button class="btn btn-main btn-lg pill mt-4"> {{ vehicleListing ? 'Update Vehicle Listing ' : 'Add Vehicle Listing' }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
     vehicleListing: {
      type: Object,
      default: null
    }
  },
}
</script>