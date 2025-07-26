<template>
  <div class="col-lg-9">
    
    <div class="flex-between gap-16 flex-wrap mb-40 w-full">
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
          <label for="sorting" class="text-inherit flex-shrink-0">Sort by: </label>
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
      <div
        v-for="(product, index) in paginatedProducts"
        :key="index"
        class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
        data-aos="fade-up"
      >
        <a
          href="/product-details"
          class="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
        >
          <img :src="product.image" alt="" class="w-auto max-w-unset" />
          <span
            v-if="product.badge"
            class="product-card__badge px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
            :class="product.badgeClass"
          >
            {{ product.badge }}
          </span>
        </a>
        <div class="product-card__content mt-16">
          <h6 class="title text-lg fw-semibold mt-12 mb-8">
            <a :href="product.url" class="link text-line-2">{{ product.title }}</a>
          </h6>
          <div class="flex-align mb-20 mt-16 gap-6">
            <span class="text-xs fw-medium text-gray-500">{{ product.rating }}</span>
            <span class="text-xs fw-medium text-warning-600 d-flex"
              ><i class="ph-fill ph-star"></i
            ></span>
            <span class="text-xs fw-medium text-gray-500">({{ product.reviews }})</span>
          </div>
          <div class="mt-8">
            <div
              class="progress w-100 bg-color-three rounded-pill h-4"
              role="progressbar"
              aria-valuemin="0"
              :aria-valuenow="product.progress"
              aria-valuemax="100"
            >
              <div
                class="progress-bar bg-main-two-600 rounded-pill"
                :style="`width: ${product.progress}%`"
              ></div>
            </div>
            <span class="text-gray-900 text-xs fw-medium mt-8">Sold: {{ product.sold }}</span>
          </div>
          <div class="product-card__price my-20">
            <span class="text-gray-400 text-md fw-semibold text-decoration-line-through"
              >${{ product.oldPrice }}</span
            >
            <span class="text-heading text-md fw-semibold"
              >${{ product.price }} <span class="text-gray-500 fw-normal">/Qty</span></span
            >
          </div>
          <a
            href="/cart"
            class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
          >
            Add To Cart <i class="ph ph-shopping-cart"></i>
          </a>
        </div>
      </div>
    </div>

    <ul class="pagination flex-center flex-wrap gap-16">
      <li class="page-item">
        <a
          class="page-link py-2.5 px-2.5 flex items-center justify-center flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
          href="#"
          @click.prevent="prevPage"
        >
          <i class="ph-bold ph-arrow-left"></i>
        </a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page">
        <a
          class="page-link py-2.5 px-2.5 flex items-center justify-center flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
          :class="{ active: currentPage === page }"
          href="#"
          @click.prevent="currentPage = page"
        >
          {{ page.toString().padStart(2, '0') }}
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link py-[16px] px-[16px] flex items-center justify-center flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
          href="#"
          @click.prevent="nextPage"
        >
          <i class="ph-bold ph-arrow-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductSection',
  data() {
    return {
      products: [
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Ta Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img1.png',
          badge: 'Best Sale',
          badgeClass: 'bg-primary-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img2.png',
          badge: '',
          badgeClass: '',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          url: 'product-details.html',
          image: 'assets/images/thumbs/product-two-img4.png',
          badge: 'Sale 50%',
          badgeClass: 'bg-danger-600',
          rating: '4.8',
          reviews: '17k',
          progress: 35,
          sold: '18/35',
          oldPrice: 28.99,
          price: 14.99,
        },
      ],
      currentPage: 1,
      perPage: 12,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.products.slice(start, start + this.perPage)
    },
  },
  mounted() {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
    import('aos').then((AOS) => AOS.init())
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
  },
}
</script>
