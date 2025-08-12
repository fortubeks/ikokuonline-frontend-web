<template>
  <div class="newsletter">
    <div class="container container-lg">
      <div class="newsletter-box position-relative rounded-16 flex-align gap-16 flex-wrap z-1">
        <img
          src="@/assets/images/bg/newsletter-bg.png"
          alt="Newsletter Background"
          class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
        />
        <div class="row align-items-center">
          <div class="col-xl-6">
            <div>
              <h1 class="text-white mb-12" data-aos="fade-down" data-aos-duration="800">
                Don't Miss Out on Grocery Deals
              </h1>
              <p class="text-white h5 mb-0" data-aos="fade-up" data-aos-duration="800">
                SING UP FOR THE UPDATE NEWSLETTER
              </p>
              <form
                @submit.prevent="subscribe"
                class="position-relative mt-40"
                data-aos="zoom-in"
                data-aos-duration="800"
              >
                <input
                  v-model="email"
                  type="email"
                  class="form-control common-input rounded-pill text-white py-22 px-16 pe-144"
                  placeholder="Your email address..."
                  required
                />
                <button
                  type="submit"
                  class="btn btn-main-two rounded-pill position-absolute top-50 translate-middle-y inset-inline-end-0 me-10"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div class="col-xl-6 text-center d-xl-block d-none">
            <img
              src="@/assets/images/thumbs/newsletter-img.png"
              alt="Newsletter Illustration"
              data-aos="zoom-in"
              data-aos-duration="800"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

function subscribe() {
  if (!email.value.trim()) return
  console.log('Subscribed with:', email.value)
  email.value = ''
}
</script>
