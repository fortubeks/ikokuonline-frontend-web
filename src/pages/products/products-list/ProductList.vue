<template>

  <div class="col-lg-9">
    
    <div class="flex-between gap-16 flex-wrap mb-40">
      <span class="text-gray-900">Showing 1-20 of 85 result</span>
      <div class="position-relative flex-align gap-16 flex-wrap">
        <div class="list-grid-btns flex-align gap-16">
          <button
            type="button"
            class="w-44 h-44 flex-center border border-gray-100 rounded-6 text-2xl list-btn"
          >
            <i class="ph-bold ph-list-dashes"></i>
          </button>
          <button
            type="button"
            class="w-44 h-44 flex-center border border-main-600 text-white bg-main-600 rounded-6 text-2xl grid-btn"
          >
            <i class="ph ph-squares-four"></i>
          </button>
        </div>
        <div class="position-relative text-gray-500 flex-align gap-4 text-14">
          <label for="sorting" class="text-inherit flex-shrink-0">Sort by:</label>
          <select
            class="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
            id="sorting"
          >
            <option value="1" selected>Popular</option>
            <option value="2">Latest</option>
            <option value="3">Trending</option>
            <option value="4">Matches</option>
          </select>
        </div>
        <button
          type="button"
          class="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
        >
          <i class="ph-bold ph-funnel"></i>
        </button>
      </div>
    </div>

    <div class="list-grid-wrapper">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

  
    <ul class="pagination flex-center flex-wrap gap-16">
      <li class="page-item">
        <a
          class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
          href="#"
        >
          <i class="ph-bold ph-arrow-left"></i>
        </a>
      </li>
      <li class="page-item active" v-for="n in 7" :key="n">
        <a
          class="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
          href="#"
        >{{ n < 10 ? `0${n}` : n }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
          href="#"
        >
          <i class="ph-bold ph-arrow-right"></i>
        </a>
      </li>
    </ul>
    
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        {
          img: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          rating: 4.8,
          ratingCount: '17k',
          sold: '18/35',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          link: '/product-details',
          badgeVisible: true
        },
        {
          img: 'assets/images/thumbs/product-two-img2.png',
          badgeVisible: false,
          title: 'Taylor Farms Broccoli Florets Vegetables',
          rating: 4.8,
          ratingCount: '17k',
          sold: '18/35',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          link: '/product-details',
          
        },
        {
          img: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          rating: 4.8,
          ratingCount: '17k',
          sold: '18/35',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          link: '/product-details',
          badgeVisible: true
        }
      ]
    }
  }
}
</script>
