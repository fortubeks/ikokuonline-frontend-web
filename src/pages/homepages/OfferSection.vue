<template>
  <section class="offer pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          class="col-sm-6"
          v-for="(offer, index) in offers"
          :key="index"
          :data-aos="offer.aos"
          :data-aos-duration="offer.duration"
        >
          <div class="offer-card position-relative rounded-16 overflow-hidden p-16 ps-56-px">
            <img
              :src="offer.bg"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100"
            />
            <div class="py-xl-4 max-w-392" :class="{ 'ms-auto': index === 0 }">
              <div class="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                <img :src="offer.logo" alt="" />
              </div>
              <h5 class="mb-8">{{ offer.title }}</h5>
              <div class="flex-align gap-8">
                <span class="text-sm fw-medium text-heading">{{ offer.delivery }}</span>
                <span :class="offer.expireClass">{{ offer.expire }}</span>
              </div>
              <a
                href="/product"
                class="mt-16 btn d-inline-flex align-items-center rounded-pill gap-8"
                :class="offer.btnClass"
                tabindex="0"
              >
                Shop Now
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

<script>
export default {
  name: 'OfferSection',
  data() {
    return {
      offers: [
        {
          bg: 'assets/images/bg/offer-bg-img1.png',
          logo: 'assets/images/thumbs/offer-logo.png',
          title: '$5 off your first order',
          delivery: 'Delivery by 6:15am',
          expire: 'Expire Aug 5',
          expireClass: 'text-xs text-heading',
          btnClass: 'bg-success-600 hover-text-white hover-bg-success-700 text-white fw-medium',
          aos: 'zoom-in',
          duration: '600',
        },
        {
          bg: 'assets/images/bg/offer-bg-img2.png',
          logo: 'assets/images/thumbs/offer-logo.png',
          title: '$5 off your first order',
          delivery: 'Delivery by 6:15am',
          expire: 'Expire Aug 5',
          expireClass: 'text-sm text-success-600',
          btnClass: 'bg-white hover-text-white hover-bg-main-800 text-heading fw-medium',
          aos: 'zoom-in',
          duration: '800',
        },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
  },
}
</script>
