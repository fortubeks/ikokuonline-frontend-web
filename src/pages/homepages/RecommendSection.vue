<template>
  <section class="recommended overflow-hidden pt-80">
    <div class="container container-lg">
      <div class="section-heading d-flex justify-content-between flex-wrap gap-3">
        <h5 class="mb-0 wow fadeInLeft">Recommended for you</h5>
        <ul class="nav common-tab nav-pills wow fadeInRight" id="pills-tab" role="tablist">
          <li class="nav-item" v-for="tab in tabs" :key="tab.id" role="presentation">
            <button
              class="nav-link fw-medium text-sm border border-white hover-border-main-600"
              :class="{ active: activeTab === tab.id }"
              :id="`${tab.id}-tab`"
              type="button"
              role="tab"
              :aria-selected="activeTab === tab.id"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content mt-4">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-pane fade"
          :class="{ show: activeTab === tab.id, active: activeTab === tab.id }"
          :id="tab.id"
          role="tabpanel"
          :aria-labelledby="`${tab.id}-tab`"
        >
          <div class="recommended-carousel">
            <div
              v-for="(product, i) in products"
              :key="i"
              class="px-2"
              :data-aos="'fade-up'"
              :data-aos-duration="200 + i * 200"
            >
              <div
                class="product-card h-100 p-3 border border-gray-100 hover-border-main-600 rounded-3 position-relative transition-2"
              >
                <button type="button" class="wishlist-btn-two">
                  <i class="ph-bold ph-heart"></i>
                </button>
                <span v-if="product.badge" :class="product.badgeClass">{{ product.badge }}</span>
                <a
                  href="product-details.html"
                  class="product-card__thumb d-flex justify-content-center overflow-hidden"
                >
                  <img :src="product.image" alt="" />
                </a>
                <div class="product-card__content p-sm-2 w-100">
                  <h6 class="title text-lg fw-semibold my-3">
                    <a href="product-details.html" class="link text-line-2">{{ product.title }}</a>
                  </h6>
                  <div class="d-flex align-items-center gap-2">
                    <span class="text-main-600 text-md d-flex">
                      <i class="ph-fill ph-storefront"></i>
                    </span>
                    <span class="text-gray-500 text-xs">{{ product.vendor }}</span>
                  </div>
                  <div class="mt-3">
                    <div class="product-card__price mb-2">
                      <span class="text-heading text-md fw-semibold">
                        ${{ product.price }} <span class="text-gray-500 fw-normal">/Qty</span>
                      </span>
                      <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
                        ${{ product.oldPrice }}
                      </span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <span class="text-xs fw-bold text-gray-600">{{ product.rating }}</span>
                      <span class="text-15 fw-bold text-warning-600 d-flex">
                        <i class="ph-fill ph-star"></i>
                      </span>
                      <span class="text-xs fw-bold text-gray-600">({{ product.reviews }})</span>
                    </div>
                    <a
                      href="cart.html"
                      class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-2 px-3 rounded-pill d-flex align-items-center gap-2 mt-3 w-100 justify-content-center"
                    >
                      Add To Cart <i class="ph ph-shopping-cart"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecommendedSection',
  data() {
    return {
      activeTab: 'pills-all',
      tabs: [
        { id: 'pills-all', label: 'All' },
        { id: 'pills-popular', label: 'Popular' },
        { id: 'pills-featured', label: 'Featured' },
      ],
      products: [
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
        {
          image: 'assets/images/thumbs/product-img1.png',
          title: 'Fresh Avocados',
          vendor: 'GreenFarm',
          price: 10.99,
          oldPrice: 14.99,
          rating: 4.8,
          reviews: 124,
          badge: 'Hot',
          badgeClass: 'badge bg-danger text-white',
        },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    this.initSlick(`#${this.activeTab} .recommended-carousel`)
  },
  watch: {
    activeTab() {
      this.$nextTick(() => {
        this.initSlick(`#${this.activeTab} .recommended-carousel`)
      })
    },
  },
  methods: {
    initSlick(selector) {
      const $slider = window.$(selector)
      if ($slider.hasClass('slick-initialized')) $slider.slick('unslick')
      $slider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        dots: false,
        infinite: false,
        prevArrow:
          '<button type="button" class="slick-prev btn btn-outline-light rounded-circle"><i class="ph ph-caret-left"></i></button>',
        nextArrow:
          '<button type="button" class="slick-next btn btn-outline-light rounded-circle"><i class="ph ph-caret-right"></i></button>',
        responsive: [
          { breakpoint: 1400, settings: { slidesToShow: 4 } },
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
      })
    },
  },
}
</script>

<style scoped>
.product-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}
</style>
