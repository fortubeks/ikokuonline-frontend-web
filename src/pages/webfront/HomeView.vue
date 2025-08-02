<template>
  <section
    class="banner-three bg-img position-relative"
    data-background-image="@/assets/images/shape/line-pattern.png"
    style="background-image: url('@/assets/images/shape/line-pattern.png')"
  >
    <img
      src="@/assets/images/shape/tiresvg.svg"
      alt="Shape"
      width="50"
      height="50"
      class="animation star-shape animation-rotate"
    />
    <img
      src="@/assets/images/shape/star-shape.png"
      alt="Shape"
      class="animation star-shape style-two animation-rotate"
    />
    <img
      src="@/assets/images/shape/line-shape.png"
      alt="Shape"
      class="animation line-shape opacity-75 animation-rotate"
    />

    <div class="container container-lg">
      <div class="banner-three-slider slick-initialized slick-slider">
        <div class="slick-list draggable">
          <div class="slick-track" style="opacity: 1">
            <div
              class="slick-slide slick-current slick-active"
              data-slick-index="0"
              aria-hidden="false"
              style="position: relative; left: 0px; top: 0px; z-index: 999; opacity: 1"
            >
              <div>
                <div class="" style="width: 100%; display: inline-block">
                  <div class="row align-items-center gy-4">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="span3">
                        <p
                          class="text-white max-w-472 text-2xl mb-24Up animate-left-right animation-delay-12 text-center"
                        >
                          Welcome To The Biggest Marketplace in Nigeria For Your Car Parts &
                          Vehicles
                        </p>
                        <p
                          class="mb-24Up px-3 flex items-center gap-3 animate-left-right animation-delay-12 text-center mt-4"
                        >
                          <a
                            href="/products"
                            class="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-lg-4 mt-sm-1 animate-left-right animation-delay-15"
                            tabindex="0"
                          >
                            Car Parts
                            <span class="icon text-xl d-flex">
                              <i class="ph ph-shopping-cart-simple"></i>
                            </span>
                          </a>
                          <a
                            href="/vehicles"
                            class="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-lg-4 mt-sm-1 animate-left-right animation-delay-15"
                            tabindex="0"
                          >
                            Vehicles
                            <span class="icon text-xl d-flex">
                              <i class="ph ph-shopping-cart-simple"></i>
                            </span>
                          </a>
                        </p>
                      </div>
                      <!-- /.span3 -->
                    </div>
                    <!-- /.col -->
                  </div>
                  <!-- /.row -->
                </div>
                <!-- /anonymous wrapper -->
              </div>
            </div>
            <!-- /.slick-slide -->
          </div>
          <!-- /.slick-track -->
        </div>
        <!-- /.slick-list -->
      </div>
      <!-- /.banner-three-slider -->
    </div>
    <!-- /.container -->
  </section>

  <FlashSalesToday />
</template>

<script setup>
import FlashSalesToday from '../home-page-sections/FlashSalesToday.vue'
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
