<template>
  <section class="newsletter-new">
    <div class="container container-lg">
      <div class="py-20 px-80-px bg-neutral-100 rounded-12 d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap gap-32">
        <div class="max-w-700">
          <h3 class="mb-30">Stay home & get your daily needs from our shop</h3>
          <form @submit.prevent="submitForm" class="d-flex gap-8 flex-wrap flex-sm-nowrap">
            <input
              v-model="email"
              type="email"
              required
              class="form-control bg-white px-20 shadow-none py-16 rounded placeholder-text-14 flex-grow-1"
              placeholder="Enter your mail"
            />
            <button type="submit" class="btn py-20 px-32 bg-success-600 flex-shrink-0 hover-bg-success-700 flex-grow-1">
              Subscribe now
            </button>
          </form>
          <p class="text-heading text-sm mt-20 fw-medium">
            I agree that my submitted data is being collected and stored.
          </p>
        </div>
        <div class="d-lg-block d-none">
          <img :src="newsletterImg" alt="Thumbnail" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import newsletterImg from '@/assets/images/thumbs/newsletter-img.png'

export default {
  data() {
    return {
      email: '',
      newsletterImg,
    }
  },
  methods: {
    submitForm() {
      alert(`Subscribed with: ${this.email}`)
      this.email = ''
    },
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()
  },
}
</script>

<style scoped>
/* Exact Bootstrap-based layout, no style overrides unless needed */
</style>
