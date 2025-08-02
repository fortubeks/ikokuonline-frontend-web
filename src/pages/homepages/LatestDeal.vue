<template>
  <section class="promotional-banner mt-32">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(promo, index) in promoSections"
          :key="index"
          class="col-lg-4 col-sm-6"
          :data-aos="promo.aos"
          :data-aos-duration="promo.duration"
        >
          <div class="position-relative rounded-16 overflow-hidden z-1 p-32">
            <img
              :src="promo.bgImage"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
            />
            <div class="flex-between flex-wrap gap-16">
              <div>
                <span class="fw-semibold text-sm mb-8" :class="promo.titleClass">
                  {{ promo.titleText }}
                  <span :class="promo.highlightClass" v-if="promo.highlightText">{{
                    promo.highlightText
                  }}</span>
                  {{ promo.afterText }}
                </span>
                <h6 class="mb-0">{{ promo.subtitle }}</h6>
                <a
                  :href="promo.link"
                  class="d-inline-flex align-items-center gap-8 mt-16 text-heading text-md fw-medium border border-top-0 border-end-0 border-start-0 border-gray-900 hover-text-main-two-600 hover-border-main-two-600"
                >
                  Shop Now
                  <span class="icon text-md d-flex"><i class="ph ph-plus"></i></span>
                </a>
              </div>
              <div class="pe-xxl-2">
                <img :src="promo.thumb" :alt="promo.alt" />
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
  name: 'PromotionalBanner',
  data() {
    return {
      promoSections: [
        {
          aos: 'fade-up',
          duration: '600',
          bgImage: '@/assets/images/bg/promo-bg-img1.png',
          thumb: '@/assets/images/thumbs/promo-img1.png',
          alt: 'iPhone 15 Pro Max',
          titleText: 'Latest Deal',
          highlightText: '',
          afterText: '',
          titleClass: 'text-main-600',
          highlightClass: '',
          subtitle: 'iPhone 15 Pro Max',
          link: 'shop.html',
        },
        {
          aos: 'fade-up',
          duration: '800',
          bgImage: '@/assets/images/bg/promo-bg-img2.png',
          thumb: '@/assets/images/thumbs/promo-img2.png',
          alt: 'Instax Mini 11 Camera',
          titleText: 'Get ',
          highlightText: '60%',
          afterText: ' Off',
          titleClass: 'text-heading',
          highlightClass: 'text-info',
          subtitle: 'Instax Mini 11 Camera',
          link: 'shop.html',
        },
        {
          aos: 'fade-up',
          duration: '1000',
          bgImage: '@/assets/images/bg/promo-bg-img3.png',
          thumb: '@/assets/images/thumbs/promo-img3.png',
          alt: 'Airpod Headphone',
          titleText: 'Start From ',
          highlightText: '$250',
          afterText: '',
          titleClass: 'text-heading',
          highlightClass: 'text-main-600',
          subtitle: 'Airpod Headphone',
          link: 'shop.html',
        },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()
  },
}
</script>

<style scoped>
/* All styling preserved via Bootstrap classes */
</style>
