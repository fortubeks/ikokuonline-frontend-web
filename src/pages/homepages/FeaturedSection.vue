<template>
  <section class="feature" id="featureSection">
    <div class="container container-lg">
      <div class="position-relative arrow-center gradient-shadow">
        <!-- Navigation Arrows -->
        <div class="flex-align">
          <button
            type="button"
            id="feature-item-wrapper-prev"
            class="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-left"></i>
          </button>
          <button
            type="button"
            id="feature-item-wrapper-next"
            class="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-right"></i>
          </button>
        </div>

        <!-- Feature Slider -->
        <div class="feature-item-wrapper">
          <div
            v-for="(item, index) in features"
            :key="index"
            class="feature-item text-center wow bounceIn"
            data-aos="fade-up"
            :data-aos-duration="400 + index * 200"
          >
            <div class="feature-item__thumb rounded-circle">
              <a :href="item.link" class="w-100 h-100 flex-center">
                <img :src="item.image" :alt="item.title" />
              </a>
            </div>
            <div class="feature-item__content mt-16">
              <h6 class="text-lg mb-8">
                <a :href="item.link" class="text-inherit">{{ item.title }}</a>
              </h6>
              <span class="text-sm text-gray-400">{{ item.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Feature items (static, but could come from API later)
const features = ref([
  {
    title: 'Vegetables',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img1.png',
    link: 'shop.html',
  },
  {
    title: 'Fish & Meats',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img2.png',
    link: 'shop.html',
  },
  {
    title: 'Desserts',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img3.png',
    link: 'shop.html',
  },
  {
    title: 'Drinks & Juice',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img4.png',
    link: 'shop.html',
  },
  {
    title: 'Animals Food',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img5.png',
    link: 'shop.html',
  },
  {
    title: 'Fresh Fruits',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img6.png',
    link: 'shop.html',
  },
  {
    title: 'Yummy Candy',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img7.png',
    link: 'shop.html',
  },
  {
    title: 'Fish & Meats',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img2.png',
    link: 'shop.html',
  },
  {
    title: 'Dairy & Eggs',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img8.png',
    link: 'shop.html',
  },
  {
    title: 'Snacks',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img9.png',
    link: 'shop.html',
  },
  {
    title: 'Frozen Foods',
    subtitle: '125+ Products',
    image: 'assets/images/thumbs/feature-img10.png',
    link: 'shop.html',
  },
])

onMounted(() => {
  const $ = window.$
  if ($ && $('.feature-item-wrapper')?.slick) {
    $('.feature-item-wrapper').slick({
      arrows: true,
      prevArrow: $('#feature-item-wrapper-prev'),
      nextArrow: $('#feature-item-wrapper-next'),
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 4 } },
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    })
  }

  // AOS animations
  if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init()
  }

  // WOW.js animations
  if (window.WOW && typeof window.WOW === 'function') {
    new window.WOW().init()
  }
})
</script>
