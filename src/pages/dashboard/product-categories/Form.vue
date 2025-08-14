<template>
  <div class="row gy-4">
    <div class="col-12">
      <div class="card common-card border border-gray-five overflow-hidden mb-24" id="personalInfo">
        <div class="card-header">
          <h6 class="title">
            {{ productCategory ? 'Update Product Category' : 'Add Product Category' }}
          </h6>
        </div>
        <div class="card-body">
          <div class="row gy-3">
            <div class="col-sm-6 col-xs-6">
              <label for="name" class="form-label">Product Category Name</label>
              <input
                v-model="form.name"
                type="text"
                class="common-input common-input--md border--color-dark bg--white"
                id="name"
              />
            </div>

            <div class="col-sm-6 col-xs-6">
              <label for="product_category_id" class="form-label">Parent Category</label>
              <select
                v-model="form.product_category_id"
                class="common-input common-input--md border--color-dark bg--white"
              >
                <option value="">Select Category</option>
                <option
                  v-for="category in productCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="col-sm-12 text-end">
              <button class="btn btn-main btn-lg pill mt-4" @click.prevent="submitForm">
                {{ productCategory ? 'Update Product Category ' : 'Add Product Category' }}
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
  props: {
    id: {
      type: String,
      default: null, // null means create mode
    },
  },
  data() {
    return {
      productCategory: null,
      form: {
        product_category_id: '',
        name: '',
      },
      productCategories: [],
    }
  },
  mounted() {
    this.fetchProductCategories()

    if (this.id) {
      // Edit mode → fetch the existing product category
      this.fetchProductCategory(this.id)
    }
  },
  methods: {
    fetchProductCategories() {
      api
        .get('/api/product-categories')
        .then((res) => {
          this.productCategories = res.data
        })
        .catch((err) => console.error(err))
    },
    fetchProductCategory(id) {
      api
        .get(`/api/product-categories/${id}/edit`)
        .then((res) => {
          this.productCategory = res.data
          this.form = { ...res.data }
        })
        .catch((err) => console.error(err))
    },
    submitForm() {
      const method = this.productCategory ? 'put' : 'post'
      const url = this.productCategory
        ? `/api/product-categories/${this.productCategory.id}`
        : '/api/product-categories'

      api[method](url, this.form)
        .then(() => {
          alert('Product Category saved successfully!')
          this.$router.push({ name: 'ProductCategories' })
        })
        .catch((err) => {
          console.error('Error saving:', err)
        })
    },
  },
}
</script>
