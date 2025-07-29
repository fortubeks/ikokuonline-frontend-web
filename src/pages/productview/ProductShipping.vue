<template>
  <section class="shipping mb-24" id="shipping">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, index) in shippingItems"
          :key="index"
          class="col-xxl-3 col-sm-6"
          :data-aos="'zoom-in'"
          :data-aos-duration="item.duration"
        >
          <div
            class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2"
          >
            <span
              class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0"
              :class="item.icon"
            >
              <i :class="item.icon"></i>
            </span>
            <div>
              <h6 class="mb-0">{{ item.title }}</h6>
              <span class="text-sm text-heading">{{ item.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShippingSection',
  data() {
    return {
      shippingItems: [
        {
          icon: 'ph-fill ph-car-profile',
          title: 'Free Shipping',
          subtitle: 'Free shipping all over the US',
          duration: 400,
        },
        {
          icon: 'ph-fill ph-hand-heart',
          title: '100% Satisfaction',
          subtitle: 'Free shipping all over the US',
          duration: 600,
        },
        {
          icon: 'ph-fill ph-credit-card',
          title: 'Secure Payments',
          subtitle: 'Free shipping all over the US',
          duration: 800,
        },
        {
          icon: 'ph-fill ph-chats',
          title: '24/7 Support',
          subtitle: 'Free shipping all over the US',
          duration: 1000,
        },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
  },
}
</script>

<style scoped>
</style>
