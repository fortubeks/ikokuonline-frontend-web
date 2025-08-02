<template>
  <div class="short-product pt-110">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="col-xxl-3 col-lg-4 col-sm-6"
          :data-aos="section.aos"
          :data-aos-duration="section.duration"
        >
          <div
            class="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
          >
            <div class="p-16 bg-main-50 rounded-16 mb-32">
              <h6 class="underlined-line position-relative mb-0 pb-16 d-inline-block">
                {{ section.title }}
              </h6>
            </div>

            <!-- Bootstrap carousel: only one product per slide -->
            <div class="carousel slide" :id="`carousel-${index}`" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div
                  class="carousel-item"
                  v-for="(product, pIndex) in section.products"
                  :key="pIndex"
                  :class="{ active: pIndex === 0 }"
                >
                  <div class="d-flex gap-16 align-items-start">
                    <div class="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                      <a :href="product.link" class="link">
                        <img :src="product.img" :alt="product.name" />
                      </a>
                    </div>
                    <div class="product-card__content mt-12">
                      <div class="d-flex gap-6 align-items-center">
                        <span class="text-xs fw-bold text-gray-500">{{ product.rating }}</span>
                        <span class="text-15 fw-bold text-warning-600 d-flex">
                          <i class="ph-fill ph-star"></i>
                        </span>
                        <span class="text-xs fw-bold text-gray-500">({{ product.reviews }})</span>
                      </div>
                      <h6 class="title text-lg fw-semibold mt-8 mb-8">
                        <a :href="product.link" class="link text-line-1">{{ product.name }}</a>
                      </h6>
                      <div class="product-card__price d-flex gap-8 align-items-center">
                        <span class="text-heading text-md fw-semibold">{{ product.price }}</span>
                        <span class="text-gray-400 text-md fw-semibold">{{
                          product.oldPrice
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                class="carousel-control-prev"
                type="button"
                :data-bs-target="`#carousel-${index}`"
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                :data-bs-target="`#carousel-${index}`"
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Deals of the Week Card (unchanged) -->
        <div class="col-xxl-3 col-lg-4 col-sm-6" data-aos="fade-up" data-aos-duration="900">
          <div
            class="product-card h-100 p-24 pt-32 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item"
          >
            <button type="button" class="wishlist-btn-two">
              <i class="ph-bold ph-heart"></i>
            </button>

            <div>
              <h6 class="position-relative mb-0 pb-12 d-inline-block">Deals of the week</h6>
              <div class="countdown mb-10" id="countdown26">
                <ul class="countdown-list flex-align flex-wrap">
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="days"></span> D
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="hours"></span> H
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="minutes"></span> M
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="seconds"></span> S
                  </li>
                </ul>
              </div>
              <p class="text-neutral-300 fw-medium text-sm">
                Don't miss this opportunity at a special
              </p>
            </div>

            <a href="product-details.html" class="product-card__thumb flex-center overflow-hidden">
              <img src="@/assets/images/thumbs/product-img32.png" alt="" />
            </a>

            <div class="product-card__content w-100">
              <div class="flex-align gap-4">
                <div class="flex-align gap-2 me-4">
                  <i
                    class="ph-fill ph-star text-12 fw-medium text-warning-600 d-flex"
                    v-for="n in 5"
                    :key="n"
                  ></i>
                </div>
                <span class="text-xs fw-medium text-heading">(3)</span>
              </div>
              <div class="d-flex align-items-center gap-12 mt-6">
                <h6 class="text-danger-600 mb-0 text-lg">$60.99</h6>
                <h6 class="text-neutral-300 fw-medium mb-0 text-lg">$79.99</h6>
              </div>
              <h6 class="title text-md fw-semibold mt-10 mb-0">
                <a href="product-details.html" class="link text-line-2 fw-bold">
                  Perfectly Packed Meat Combos for Delicious and Flavorful Meals Every Day
                </a>
              </h6>
              <p class="text-gray-500 text-sm mt-12 pb-12 border-bottom border-neutral-100 mb-8">
                This product is about to run out
              </p>
              <div
                class="progress w-100 bg-gray-100 rounded-pill h-8"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="35"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-bar bg-success-600 rounded-pill" style="width: 35%"></div>
              </div>
              <div class="d-flex align-items-center gap-6 mt-6">
                <span class="text-sm text-gray-500">available only:</span>
                <h6 class="text-danger-600 mb-0 text-md fw-semibold">$60.99</h6>
              </div>
              <a
                href="cart.html"
                class="product-card__cart btn bg-success-600 text-white hover-bg-success-700 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-16 w-100 justify-content-center"
              >
                Add To Cart <i class="ph ph-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()
  },
  data() {
    return {
      sections: [
        {
          title: 'Featured Products',
          aos: 'fade-up',
          duration: 600,
          products: [
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            // ... more
          ],
        },
        {
          title: 'Top Selling Products',
          aos: 'fade-up',
          duration: 600,
          products: [
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            // ... more
          ],
        },
        {
          title: 'Onsale products',
          aos: 'fade-up',
          duration: 600,
          products: [
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img1.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            {
              img: '@/assets/images/thumbs/short-product-img2.png',
              name: 'Taylor Farms Broccoli Florets Vegetables',
              rating: '4.8',
              reviews: '17k',
              price: '$1500.00',
              oldPrice: '$1500.00',
              link: 'product-details.html',
            },
            // ... more
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
/* Carousel styling is assumed from Bootstrap 5 */
</style>
