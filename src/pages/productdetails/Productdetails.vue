<template>
  <section class="product-details py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-lg-9">
          <div class="row gy-4">
    
            <div class="col-xl-6">
              <div class="product-details__left">
                <div class="product-details__thumb-slider border border-gray-100 rounded-16">
                  <div v-for="(thumb, index) in thumbs" :key="index">
                    <div class="product-details__thumb flex-center h-100">
                      <img :src="thumb" alt="Product Thumbnail" />
                    </div>
                  </div>
                </div>
                <div class="mt-24">
                  <div class="product-details__images-slider">
                    <div v-for="(img, index) in images" :key="index">
                      <div class="max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8">
                        <img :src="img" alt="Product Image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        
            <div class="col-xl-6">
              <div class="product-details__content">
                <h5 class="mb-12">Lay's Potato Chips Onion Flavored</h5>
                <div class="flex-align flex-wrap gap-12">
                  <div class="flex-align gap-12 flex-wrap">
                    <div class="flex-align gap-8">
                      <span v-for="n in 5" :key="n" class="text-xs fw-medium text-warning-600 d-flex">
                        <i class="ph-fill ph-star"></i>
                      </span>
                    </div>
                    <span class="text-sm fw-medium text-neutral-600">4.7 Star Rating</span>
                    <span class="text-sm fw-medium text-gray-500">(21,671)</span>
                  </div>
                  <span class="text-sm fw-medium text-gray-500">|</span>
                  <span class="text-gray-900">
                    <span class="text-gray-400">SKU:</span> EB4DRP
                  </span>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>
                <p class="text-gray-700">
                  Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent
                </p>

                <div class="mt-32 flex-align flex-wrap gap-32">
                  <div class="flex-align gap-8">
                    <h4 class="mb-0">$25.00</h4>
                    <span class="text-md text-gray-500">$38.00</span>
                  </div>
                  <a href="#" class="btn btn-main rounded-pill">Order on What'sApp</a>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>
                <div class="flex-align flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24">
                  <div class="flex-align gap-16">
                    <span class="text-main-600 text-sm">Special Offer:</span>
                  </div>
                  <div class="countdown" id="countdown11">
                    <ul class="countdown-list flex-align flex-wrap">
                      <li class="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center" v-for="unit in countdownUnits" :key="unit">
                        <span :class="unit"></span>
                      </li>
                    </ul>
                  </div>
                  <span class="text-gray-900 text-xs">Remains until the end of the offer</span>
                </div>

                <div class="mb-24">
                  <div class="mt-32 flex-align gap-12 mb-16">
                    <span class="w-32 h-32 bg-white flex-center rounded-circle text-main-600 box-shadow-xl">
                      <i class="ph-fill ph-lightning"></i>
                    </span>
                    <h6 class="text-md mb-0 fw-bold text-gray-900">Products are almost sold out</h6>
                  </div>
                  <div class="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-main-two-600 rounded-pill" style="width: 32%"></div>
                  </div>
                  <span class="text-sm text-gray-700 mt-8">Available only: 45</span>
                </div>

                <span class="text-gray-900 d-block mb-8">Quantity:</span>
                <div class="flex-between gap-16 flex-wrap">
                  <div class="flex-align flex-wrap gap-16">
                    <div class="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                      <button type="button" class="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center">
                        <i class="ph ph-minus"></i>
                      </button>
                      <input type="number" class="quantity__input border-0 text-center w-32" v-model="quantity" />
                      <button type="button" class="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center">
                        <i class="ph ph-plus"></i>
                      </button>
                    </div>
                    <a href="#" class="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-48">
                      <i class="ph ph-shopping-cart"></i> Add To Cart
                    </a>
                  </div>
                  <div class="flex-align gap-12">
                    <a v-for="icon in [
                      'ph-heart',
                      'ph-shuffle',
                      'ph-share-network']" :key="icon" href="#" class="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle">
                      <i :class="`ph ${icon}`"></i>
                    </a>
                  </div>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                <div class="flex-between gap-16 p-12 border border-main-two-600 border-dashed rounded-8 mb-16">
                  <div class="flex-align gap-12">
                    <button type="button" class="w-18 h-18 flex-center border border-gray-900 text-xs rounded-circle hover-bg-gray-100">
                      <i class="ph ph-plus"></i>
                    </button>
                    <span class="text-gray-900 fw-medium text-xs">Mfr. coupon. $3.00 off 5</span>
                  </div>
                  <a href="/cart" class="text-xs fw-semibold text-main-two-600 text-decoration-underline hover-text-main-two-700">View Details</a>
                </div>

                <ul class="list-inside ms-12">
                  <li class="text-gray-900 text-sm mb-8">Buy 1, Get 1 FREE</li>
                  <li class="text-gray-900 text-sm mb-0">Buy 1, Get 1 FREE</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      
        <div class="col-lg-3">
          <slot name="sidebar" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductDetails',
  data() {
    return {
      thumbs: [
        'assets/images/thumbs/product-details-thumb1.png',
        'assets/images/thumbs/product-details-thumb2.png',
        'assets/images/thumbs/product-details-thumb3.png',
        'assets/images/thumbs/product-details-thumb1.png',
        'assets/images/thumbs/product-details-thumb2.png'
      ],
      images: [
        'assets/images/thumbs/product-details-img1.png',
        'assets/images/thumbs/product-details-img2.png',
        'assets/images/thumbs/product-details-img3.png',
        'assets/images/thumbs/product-details-img1.png',
        'assets/images/thumbs/product-details-img2.png'
      ],
      countdownUnits: ['days', 'hours', 'minutes', 'seconds'],
      quantity: 1
    }
  }
}
</script>

<style scoped>
</style>
