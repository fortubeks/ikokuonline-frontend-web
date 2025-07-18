<template>
    <div class="row gy-4">
        <div class="col-12">
            <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
                <div class="card-header">
                    <h6 class="title">{{ productCategory ? 'Update Product Category' : 'Add Product Category' }}</h6>
                </div>
                <div class="card-body">
                    <div class="row gy-3">

                        <div class="col-sm-6 col-xs-6">
                            <label for="name" class="form-label">Product Category Category Name</label>
                            <input type="text" class="common-input common-input--md border--color-dark bg--white" id="name">
                        </div>

                        <div class="col-sm-12 text-end">
                            <button class="btn btn-main btn-lg pill mt-4"> {{ productCategory ? 'Update Product Category ' : 'Add Product Category' }}</button>
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
    productCategory: {
      type: Object,
      default: null
    }
  },
}
</script>