<template>
  <section class="hot-deals pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0 wow fadeInLeft">Hot Deals Todays</h5>
          <div class="flex-align gap-16 wow fadeInRight">
            <a
              href="shop.html"
              class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >View All Deals</a
            >
            <div class="flex-align gap-8">
              <button
                type="button"
                id="deals-prev"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                type="button"
                id="deals-next"
                class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-12">
        <div class="col-md-4" data-aos="zoom-in">
          <div
            class="hot-deals position-relative rounded-16 bg-main-600 overflow-hidden ps-40 pe-24 pt-80 pb-120 z-1"
          >
            <img
              src="@/assets/images/shape/offer-shape.png"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
            />

            <img
              src="@/assets/images/thumbs/basket-img.png"
              alt="Basket Thumb"
              class="position-absolute inset-inline-end-0 inset-block-end-0"
            />

            <span
              class="text-primary-600 bg-yellow text-heading py-4 px-12 rounded-4 text-sm fw-medium"
              >Medical equipment</span
            >
            <div class="">
              <h5 class="text-white mb-8 mt-12">Deals of the day</h5>
              <p class="fw-semibold text-success-600">Save up to 50% off on your first order</p>
              <div class="countdown mt-24 mb-24" id="countdown4">
                <ul class="countdown-list d-flex align-items-center flex-wrap">
                  <li
                    class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                  >
                    <span class="days"></span> D
                  </li>
                  <li
                    class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                  >
                    <span class="hours"></span> H
                  </li>
                  <li
                    class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                  >
                    <span class="minutes"></span> M
                  </li>
                  <li
                    class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                  >
                    <span class="seconds"></span> S
                  </li>
                </ul>
              </div>
              <a
                href="/product"
                class="mt-16 btn bg-white hover-text-white hover-bg-main-800 text-main-600 fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                tabindex="0"
              >
                Explore Shop
                <span class="icon text-xl d-flex"><i class="ph-bold ph-shopping-cart"></i></span>
              </a>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="hot-deals-slider arrow-style-two">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HotDealsSection',
  mounted() {
    if (window.AOS) window.AOS.init()
  },
}
</script>

<style scoped></style>
