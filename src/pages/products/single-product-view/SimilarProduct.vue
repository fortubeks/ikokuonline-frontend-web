<template>
  <section class="new-arrival pb-80">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">You Might Also Like</h5>
          <div class="flex-align gap-16">
            <router-link to="/shop" class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline">
              All Products
            </router-link>
            <div class="flex-align gap-8">
              <button type="button" id="new-arrival-prev" class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1">
                <i class="ph ph-caret-left"></i>
              </button>
              <button type="button" id="new-arrival-next" class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="new-arrival__slider arrow-style-two">
        <slot name="products" />
      </div>
    </div>
  </section>

  <section class="shipping mb-24" id="shipping">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-xxl-3 col-sm-6" v-for="(item, idx) in shipping" :key="idx" :data-aos="item.aos" :data-aos-duration="item.duration">
          <div class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
            <span class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
              <i :class="item.icon"></i>
            </span>
            <div>
              <h6 class="mb-0">{{ item.title }}</h6>
              <span class="text-sm text-heading">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SimilarProductSection',
  data() {
    return {
      shipping: [
        {
          title: 'Free Shipping',
          desc: 'Free shipping all over the US',
          icon: 'ph-fill ph-car-profile',
          aos: 'zoom-in',
          duration: 400
        },
        {
          title: '100% Satisfaction',
          desc: 'Free shipping all over the US',
          icon: 'ph-fill ph-hand-heart',
          aos: 'zoom-in',
          duration: 600
        },
        {
          title: 'Secure Payments',
          desc: 'Free shipping all over the US',
          icon: 'ph-fill ph-credit-card',
          aos: 'zoom-in',
          duration: 800
        },
        {
          title: '24/7 Support',
          desc: 'Free shipping all over the US',
          icon: 'ph-fill ph-chats',
          aos: 'zoom-in',
          duration: 1000
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
