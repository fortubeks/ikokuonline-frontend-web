<template>
  <div class="brand py-80 overflow-hidden">
    <div class="container container-lg">
      <div class="brand-inner p-24 rounded-16">
        <div class="section-heading">
          <div class="flex-between flex-wrap gap-8">
            <h5 class="mb-0 wow fadeInLeft">Shop by Brands</h5>
            <div class="flex-align gap-16 wow fadeInRight">
              <a
                href="shop.html"
                class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </a>
              <div class="flex-align gap-8">
                <button
                  type="button"
                  id="brand-prev"
                  class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                  @click="slidePrev"
                >
                  <i class="ph ph-caret-left"></i>
                </button>
                <button
                  type="button"
                  id="brand-next"
                  class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                  @click="slideNext"
                >
                  <i class="ph ph-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="brand-slider arrow-style-two d-flex transition" ref="brandSlider">
          <div
            v-for="(brand, index) in brands"
            :key="index"
            class="brand-item flex-shrink-0"
            style="width: 160px"
            :data-aos="brand.aos"
            :data-aos-duration="brand.duration"
          >
            <img :src="brand.img" alt="brand" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import brandImg1 from '@/assets/images/thumbs/brand-img1.png'
import brandImg2 from '@/assets/images/thumbs/brand-img2.png'
import brandImg3 from '@/assets/images/thumbs/brand-img3.png'
import brandImg4 from '@/assets/images/thumbs/brand-img4.png'
import brandImg5 from '@/assets/images/thumbs/brand-img5.png'
import brandImg6 from '@/assets/images/thumbs/brand-img6.png'
import brandImg7 from '@/assets/images/thumbs/brand-img7.png'
import brandImg8 from '@/assets/images/thumbs/brand-img8.png'

export default {
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()
    this.startAutoScroll()
  },
  beforeUnmount() {
    clearInterval(this.autoScrollInterval)
  },
  data() {
    return {
      autoScrollInterval: null,
      brands: [
        { img: brandImg1, aos: 'zoom-in', duration: 200 },
        { img: brandImg2, aos: 'zoom-in', duration: 400 },
        { img: brandImg3, aos: 'zoom-in', duration: 600 },
        { img: brandImg4, aos: 'zoom-in', duration: 800 },
        { img: brandImg5, aos: 'zoom-in', duration: 1000 },
        { img: brandImg6, aos: 'zoom-in', duration: 1200 },
        { img: brandImg7, aos: 'zoom-in', duration: 1400 },
        { img: brandImg8, aos: 'zoom-in', duration: 1600 },
        { img: brandImg3, aos: 'zoom-in', duration: 1800 },
      ],
    }
  },
  methods: {
    slideNext() {
      const el = this.$refs.brandSlider
      const scrollAmount = el.querySelector('.brand-item').offsetWidth + 16
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    },
    slidePrev() {
      const el = this.$refs.brandSlider
      const scrollAmount = el.querySelector('.brand-item').offsetWidth + 16
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    },
    startAutoScroll() {
      this.autoScrollInterval = setInterval(() => {
        this.slideNext()
      }, 3000)
    },
  },
}
</script>

<style scoped>
.brand-slider {
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 16px;
}
.brand-slider::-webkit-scrollbar {
  display: none;
}
.brand-item {
  padding: 12px;
  transition: transform 0.3s;
}
</style>