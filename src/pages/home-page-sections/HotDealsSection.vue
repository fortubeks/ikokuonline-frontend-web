<template>
  <section class="top-selling-products pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="border border-gray-100 p-24 rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0 wow fadeInLeft">Top Selling Products</h6>
            <div class="flex-align gap-16 wow fadeInRight">
              <a
                href="/products"
                class="text-sm fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >View All Products</a
              >
              <div class="flex-align gap-8">
                <button
                  id="top-selling-prev"
                  @click="scrollLeft"
                  class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1"
                >
                  <i class="ph ph-caret-left">left</i>
                </button>
                <button
                  id="top-selling-next"
                  @click="scrollRight"
                  class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1"
                >
                  <i class="ph ph-caret-right">right</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-12">
          <div class="col-md-4" data-aos="zoom-in" data-aos-duration="800">
            <div
              class="position-relative rounded-16 overflow-hidden p-28 z-1 text-center bg-main-100 h-100"
            >
              <div class="py-xl-4">
                <h6 class="mb-8 fw-bold">Polaroid Now+ Gen 2 - White</h6>
                <h6 class="mb-8 fw-bold">Get <span class="text-main-600">35%</span> off</h6>
                <a
                  href="/cart"
                  class="btn text-heading border-white bg-main-600 py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium hover-bg-main-600 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white mt-24"
                >
                  Shop Now <i class="ph ph-shopping-cart text-xl d-flex"></i>
                </a>
              </div>
              <div class="d-md-block d-none mt-36">
                <img src="@/assets/marketpro/images/thumbs/deal-img.png" alt="" />
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div ref="scrollContainer" class="scrolling-carousel d-flex gap-1.5 overflow-auto py-2">
              <div
                v-for="(item, i) in products"
                :key="i"
                class="carousel-item-static flex-shrink-0"
                style="min-width: 300px"
              >
                <div
                  class="product-card hover-card-shadows w-[90%] h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <a
                    :href="item.detailsUrl"
                    class="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <span v-if="item.badge" :class="item.badge.class">{{ item.badge.text }}</span>
                    <img :src="item.img" alt="" class="w-auto max-w-unset" />
                  </a>
                  <div class="product-card__content mt-16">
                    <div class="flex-align gap-6">
                      <span class="text-xs fw-medium text-gray-500">4.8</span>
                      <span class="text-xs fw-medium text-warning-600 d-flex">
                        <i class="ph-fill ph-star"></i>
                      </span>
                      <span class="text-xs fw-medium text-gray-500">(17k)</span>
                    </div>
                    <h6 class="title text-lg fw-semibold mt-12 mb-8">
                      <a :href="item.detailsUrl" class="link text-line-2">{{ item.title }}</a>
                    </h6>
                    <div class="flex-align gap-4">
                      <span class="text-tertiary-600 text-md d-flex">
                        <i class="ph-fill ph-storefront"></i>
                      </span>
                      <span class="text-gray-500 text-xs">{{ item.store }}</span>
                    </div>
                    <div class="mt-8">
                      <div class="progress w-100 bg-color-three rounded-pill h-4">
                        <div
                          class="progress-bar bg-tertiary-600 rounded-pill"
                          :style="{ width: item.progress + '%' }"
                        ></div>
                      </div>
                      <span class="text-gray-900 text-xs fw-medium mt-8"
                        >Sold: {{ item.sold }}</span
                      >
                    </div>
                    <div class="product-card__price my-20">
                      <span
                        class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        >{{ item.oldPrice }}</span
                      >
                      <span class="text-heading text-md fw-semibold"
                        >{{ item.newPrice }} <span class="text-gray-500 fw-normal">/Qty</span></span
                      >
                    </div>
                    <a
                      href="/cart"
                      class="product-card__cart btn bg-main-600 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-center gap-8 fw-medium"
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
  name: 'TopSellingProducts',
  data() {
    return {
      products: [
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img7.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
        },
        {
          title: 'lor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img8.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
          badge: {
            class:
              'product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0',
            text: 'Sale 50% ',
          },
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img7.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
        },
        {
          title: 'lor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img8.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
          badge: {
            class:
              'product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0',
            text: 'Sale 50% ',
          },
        },
        {
          title: 'Taylor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img7.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
        },
        {
          title: 'lor Farms Broccoli Florets Vegetables',
          store: 'By Lucky Supermarket',
          img: '@/assets/images/thumbs/product-two-img8.png',
          detailsUrl: 'product-details-two.html',
          oldPrice: '$28.99',
          newPrice: '$14.99',
          sold: '18/35',
          progress: 35,
          badge: {
            class:
              'product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0',
            text: 'Sale 50% ',
          },
        },
        // More items...
      ],
    }
  },
  mounted() {
    this.startAutoScroll()
  },
  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({ left: -200, behavior: 'smooth' })
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({ left: 300, behavior: 'smooth' })
    },
    startAutoScroll() {
      setInterval(() => {
        this.scrollRight()
      }, 3000)
    },
  },
}
</script>

<style scoped>
.top-selling-products .rounded-16 {
  border-radius: 16px;
}
.scrolling-carousel::-webkit-scrollbar {
  display: none;
}
.scrolling-carousel {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}
</style>
