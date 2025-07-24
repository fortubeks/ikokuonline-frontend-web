<template>
  <div class="product pt-60">
    <div class="container container-lg">
      <div class="section-heading w-full">
        <div class="d-flex justify-content-between flex-wrap gap-3">
          <h5 class="mb-0 wow fadeInLeft">Flash Sales Today</h5>
          <div class="d-flex align-items-center gap-3 wow fadeInRight">
            <a
              href="shop.html"
              class="text-sm fw-medium text-gray-700 hover-text-main-600 text-decoration-underline"
            >
              View All Deals
            </a>
            <div class="d-flex  align-items-center gap-2">
              <button
                ref="prevBtn"
                type="button"
                class="rounded-circle h-[40px] w-[40px] d-flex align-items-center justify-content-center border border-green-400"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextBtn"
                type="button"
                class="rounded-circle h-[40px] w-[40px] d-flex align-items-center justify-content-center border border-green-400"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="product-one-slider">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="px-2"
          :data-aos="'fade-up'"
          :data-aos-duration="200 + index * 100"
        >
          <div
            class="product-card p-3 border border-gray-100 rounded-3 position-relative transition"
          >
            <a
              href="cart.html"
              class="btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-2 px-3 rounded-pill d-flex align-items-center gap-2 position-absolute top-0 end-0 m-2"
            >
              Add <i class="ph ph-shopping-cart"></i>
            </a>
            <a
              href="product-details.html"
              class="product-card__thumb d-flex justify-content-center overflow-hidden"
            >
              <img :src="product.img" alt="" />
            </a>
            <div class="product-card__content mt-3">
              <div class="product-card__price mb-2 d-flex align-items-center gap-2">
                <span class="fw-semibold text-md">
                  ${{ product.price }} <span class="text-gray-500 fw-normal">/Qty</span>
                </span>
                <span class="text-gray-400 fw-semibold text-decoration-line-through">
                  ${{ product.oldPrice }}
                </span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="text-xs fw-bold text-gray-600">{{ product.rating }}</span>
                <span class="text-15 fw-bold text-warning-600 d-flex">
                  <i class="ph-fill ph-star"></i>
                </span>
                <span class="text-xs fw-bold text-gray-600">({{ product.votes }})</span>
              </div>
              <h6 class="title text-lg fw-semibold mt-3 mb-3">
                <a href="product-details.html" class="link text-wrap">{{ product.title }}</a>
              </h6>
              <div class="mt-3">
                <div
                  class="progress w-100 bg-color-three rounded-pill"
                  role="progressbar"
                  :aria-valuenow="product.sold"
                  aria-valuemin="0"
                  :aria-valuemax="product.total"
                >
                  <div
                    class="progress-bar bg-main-600 rounded-pill"
                    :style="{ width: soldPercent(product) + '%' }"
                  ></div>
                </div>
                <span class="text-gray-900 text-xs fw-medium d-block mt-2">
                  Sold: {{ product.sold }}/{{ product.total }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlashSales',
  data() {
    return {
      products: [
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
        {
          img: 'assets/images/thumbs/product-img26.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '20.99',
          oldPrice: '28.99',
          rating: '2.8',
          votes: '30k',
          sold: 18,
          total: 35,
        },

        {
          img: 'assets/images/thumbs/product-img3.png',
          title: 'Taylor Farms Broccoli Florets Vegetables',
          price: '14.99',
          oldPrice: '28.99',
          rating: '4.8',
          votes: '17k',
          sold: 18,
          total: 35,
        },
      ],
    }
  },
  methods: {
    soldPercent(product) {
      return ((product.sold / product.total) * 100).toFixed(0)
    },
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()

    this.$nextTick(() => {
      const $slider = window.$('.product-one-slider')
      $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        prevArrow: window.$(this.$refs.prevBtn),
        nextArrow: window.$(this.$refs.nextBtn),
        responsive: [
          {
            breakpoint: 992,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 1 },
          },
        ],
      })
    })
  },
}
</script>

<style scoped>
/* Optional fallback if Tailwind isn't being processed correctly */
button.rounded-circle {
  width: 40px;
  height: 40px;
}
</style>
