<template>
  <section class="shipping py-5">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, index) in shippingItems"
          :key="index"
          :data-aos="'zoom-in'"
          :data-aos-duration="400 + index * 200"
          class="col-xxl-3 col-sm-6 aos-init aos-animate"
        >
          <div
            class="shipping-item bg-[#FDF4ED] max-h-[120px] flex-align gap-16 rounded-16 border border-white-13 border-dashed hover-bg-main-700 transition-2"
          >
            <span
              class="w-56 h-56 flex-center rounded-circle bg-[#FD603E] text-white text-32 flex-shrink-0"
            >
              <i :class="item.icon"></i>
            </span>
            <div>
              <h6 class="mb-0 text-xl fw-semibold text-[#121535]">{{ item.title }}</h6>
              <span class="text-sm text-[#121535] font-sora d-block mt-10">
                {{ item.subtitle }}
              </span>
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
          subtitle: 'For Port Harcourt Residents with orders',
        },
        {
          icon: 'ph-fill ph-hand-heart',
          title: '100% Satisfaction',
          subtitle: '100% satisfied customers',
        },
        {
          icon: 'ph-fill ph-credit-card',
          title: 'Secure Payments',
          subtitle: 'All payments are secured',
        },
        {
          icon: 'ph-fill ph-chats',
          title: '24/7 Support',
          subtitle: 'We support 24/7',
        },
      ],
    }
  },
}
</script>
