<template>
  <section class="flash-sales pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="row gy-4 arrow-style-two">
        <div
          class="col-lg-6"
          v-for="(sale, index) in flashSales"
          :key="index"
          :data-aos="'fade-up'"
          :data-aos-duration="600 + index * 400"
        >
          <div class="flash-sales-item rounded-16 overflow-hidden z-1 position-relative d-flex align-items-center flex-wrap justify-content-between gap-3 ps-4">
            <img
              :src="sale.image"
              alt=""
              class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1 flash-sales-item__bg"
            />
            <div class="flash-sales-item__content ms-sm-auto">
              <h6 class="text-32 mb-2">{{ sale.title }}</h6>
              <p :class="sale.textClass + ' mb-3'">Time remaining until the end of the offer.</p>
              <div class="countdown">
                <ul class="countdown-list d-flex flex-wrap align-items-center">
                  <li
                    v-for="unit in countdownUnits"
                    :key="unit"
                    :class="['countdown-list__item py-2 px-3 d-flex align-items-center gap-2 text-sm fw-medium box-shadow-4xl rounded-5', sale.timerClass]"
                  >
                    <span class="count" :ref="el => setRef(el, index, unit)"></span> {{ unit.charAt(0).toUpperCase() }}
                  </li>
                </ul>
              </div>
              <a
                href="/product"
                :class="sale.buttonClass + ' d-inline-flex align-items-center rounded-pill gap-2 mt-4'"
              >
                Shop Now
                <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
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
  name: 'FlashSalesSection',
  data() {
    return {
      countdownUnits: ['days', 'hours', 'minutes', 'seconds'],
      refsMap: {},
      flashSales: [
        {
          title: 'X-Connect Smart Television',
          image: 'assets/images/bg/flash-sale-bg1.png',
          textClass: 'text-neutral-500',
          timerClass: '',
          buttonClass: 'btn btn-main',
        },
        {
          title: 'Vegetables Combo Box',
          image: 'assets/images/bg/flash-sale-bg2.png',
          textClass: 'text-heading',
          timerClass: 'bg-main-600 text-white',
          buttonClass: 'btn bg-success-600 hover-bg-success-700 text-white',
        },
      ],
    }
  },
  methods: {
    setRef(el, groupIndex, key) {
      if (!this.refsMap[groupIndex]) this.refsMap[groupIndex] = {}
      this.refsMap[groupIndex][key] = el
    },
    startCountdown(index, endTime) {
      const updateClock = () => {
        const now = new Date().getTime()
        const distance = endTime - now

        if (distance < 0) return clearInterval(timer)

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        const refs = this.refsMap[index]
        if (refs) {
          refs.days.innerText = days
          refs.hours.innerText = hours
          refs.minutes.innerText = minutes
          refs.seconds.innerText = seconds
        }
      }

      const timer = setInterval(updateClock, 1000)
      updateClock()
    },
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    this.flashSales.forEach((_, index) => {
      const future = new Date().getTime() + 48 * 60 * 60 * 1000 // 48 hours
      this.startCountdown(index, future)
    })
  },
}
</script>

<style scoped>
.countdown-list__item .count {
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}
</style>