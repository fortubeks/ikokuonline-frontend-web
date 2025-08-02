<template>
  <section class="promotional-banner pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          :data-aos="banner.animation"
          :data-aos-duration="banner.duration"
          class="col-xl-3 col-sm-6 col-xs-6 wow bounceIn"
        >
          <div
            class="promotional-banner-item position-relative rounded-24 overflow-hidden z-1 py-52 ps-40 pe-24 h-100"
          >
            <img
              :src="banner.image"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
            />
            <div class="promotional-banner-item__content">
              <h6 class="promotional-banner-item__title text-2xl max-w-184">
                {{ banner.title }}
              </h6>

              <div
                v-if="banner.price"
                class="d-flex align-items-end gap-8"
              >
                <span class="text-heading fst-italic text-sm">Starting at</span>
                <h6 class="text-danger-600 mb-0 text-xl">{{ banner.price }}</h6>
              </div>

              <a
                :href="banner.link"
                class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
              >
                {{ banner.buttonText }}
                <span class="icon text-xl d-flex">
                  <i class="ph ph-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const banners = [
  {
    title: 'Everyday Fresh Meat',
    price: '$60.99',
    image: 'assets/images/thumbs/promotional-banner-img1.png',
    link: 'shop.html',
    buttonText: 'Shop Now',
    animation: 'fade-up',
    duration: '400',
  },
  {
    title: 'Daily Fresh Vegetables',
    price: '$60.99',
    image: 'assets/images/thumbs/promotional-banner-img2.png',
    link: 'shop.html',
    buttonText: 'Shop Now',
    animation: 'fade-up',
    duration: '600',
  },
  {
    title: 'Everyday Fresh Milk',
    price: '$60.99',
    image: 'assets/images/thumbs/promotional-banner-img3.png',
    link: 'shop.html',
    buttonText: 'Shop Now',
    animation: 'fade-up',
    duration: '800',
  },
  {
    title: 'Everyday Fresh Fruits',
    price: null,
    image: 'assets/images/thumbs/promotional-banner-img4.png',
    link: 'shop.html',
    buttonText: 'Shop Now',
    animation: 'fade-up',
    duration: '1000',
  },
];
</script>
