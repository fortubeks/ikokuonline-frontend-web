<template>
  <div class="pt-80">
    <div class="container container-lg">
      <div
        class="border border-main-500 bg-main-50 border-dashed rounded-8 py-20 d-flex align-items-center justify-content-evenly"
      >
        <p class="h6 text-main-600 fw-normal">
          Super discount for your
          <a
            href="javascript:void(0)"
            class="fw-bold text-decoration-underline text-main-600 hover-text-decoration-none hover-text-primary-600"
            >first purchase</a
          >
        </p>
        <div class="position-relative">
          <button
            class="copy-coupon-btn px-32 py-10 text-white text-uppercase bg-main-600 rounded-pill border-0 hover-bg-main-800"
            @click="copyCode"
          >
            {{ couponCode }}
            <i class="ph ph-file-text text-lg line-height-1"></i>
          </button>
          <span
            class="copy-text bg-main-600 text-white fw-normal position-absolute px-16 py-6 rounded-pill bottom-100 start-50 translate-middle-x min-w-max mb-8 text-xs"
            v-if="copied"
          >
            Copied!
          </span>
        </div>
        <p class="text-md text-main-600 fw-normal">
          Use discount code to get
          <span class="fw-bold text-main-600">20%</span> discount for any item
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuperDiscount',
  data() {
    return {
      couponCode: 'FREE25BAC',
      copied: false,
    }
  },
  methods: {
    copyCode() {
      navigator.clipboard.writeText(this.couponCode).then(() => {
        this.copied = true
        setTimeout(() => (this.copied = false), 2000)
      })
    },
  },
}
</script>

<style scoped>
.min-w-max {
  min-width: max-content;
}
</style>