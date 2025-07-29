<template>
  <div class="col-lg-3">
    <div class="shop-sidebar w-full">
      <button
        type="button"
        class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
        @click="$emit('close')"
      >
        <i class="ph ph-x"></i>
      </button>

      
      <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm">
          <li v-for="(item, i) in categories" :key="i" class="mb-24">
            <a :href="item.link" class="text-gray-900 hover-text-main-600">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      
      <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Price</h6>
        <div class="custom--range">
          <div id="slider-range"></div>
          <div class="flex-between flex-wrap-reverse gap-8 mt-24">
            <button type="button" class="btn btn-main h-40 flex-align">Filter</button>
            <div class="custom--range__content flex-align gap-8">
              <span class="text-gray-500 text-md flex-shrink-0">Price:</span>
              <input
                type="text"
                class="custom--range__prices text-neutral-600 text-start text-md fw-medium"
                id="amount"
                readonly
              />
            </div>
          </div>
        </div>
      </div>


      <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Rating</h6>
        <div
          v-for="(rating, i) in ratings"
          :key="i"
          class="flex-align gap-8 position-relative mb-20"
        >
          <label
            class="position-absolute w-100 h-100 cursor-pointer"
            :for="'rating' + rating.stars"
          ></label>
          <div class="common-check common-radio mb-0">
            <input
              class="form-check-input"
              type="radio"
              name="rating"
              :id="'rating' + rating.stars"
            />
          </div>
          <div
            class="progress w-100 bg-gray-100 rounded-pill h-8"
            role="progressbar"
            aria-label="Basic example"
            :aria-valuenow="rating.value"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar bg-main-600 rounded-pill"
              :style="`width: ${rating.value}%`"
            ></div>
          </div>
          <div class="flex-align gap-4">
            <span
              v-for="j in 5"
              :key="j"
              class="text-xs fw-medium d-flex"
              :class="j <= rating.stars ? 'text-warning-600' : 'text-gray-400'"
              ><i class="ph-fill ph-star"></i
            ></span>
          </div>
          <span class="text-gray-900 flex-shrink-0">{{ rating.count }}</span>
        </div>
      </div>

    
      <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Color</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm">
          <li v-for="(color, i) in colors" :key="i" class="mb-24">
            <div class="form-check common-check common-radio" :class="color.class">
              <input class="form-check-input" type="radio" name="color" :id="'color' + i" />
              <label class="form-check-label" :for="'color' + i">{{ color.label }}</label>
            </div>
          </li>
        </ul>
      </div>

      
      <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Brand</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm">
          <li v-for="(brand, i) in brands" :key="i" class="mb-24">
            <div class="form-check common-check common-radio">
              <input class="form-check-input" type="radio" name="brand" :id="'brand' + i" />
              <label class="form-check-label" :for="'brand' + i">{{ brand }}</label>
            </div>
          </li>
        </ul>
      </div>

    
      <div class="shop-sidebar__box rounded-8">
        <img src="@/assets/images/thumbs/advertise-img1.png" alt="Advertise" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarFilter',
  data() {
    return {
      categories: [
        { label: 'Mobile & Accessories (12)', link: 'product-details-two.html' },
        { label: 'Laptop (12)', link: 'product-details-two.html' },
        { label: 'Electronics (12)', link: 'product-details-two.html' },
        { label: 'Smart Watch (12)', link: 'product-details-two.html' },
        { label: 'Storage (12)', link: 'product-details-two.html' },
        { label: 'Portable Devices (12)', link: 'product-details-two.html' },
        { label: 'Action Camera (12)', link: 'product-details-two.html' },
        { label: 'Smart Gadget (12)', link: 'product-details-two.html' },
        { label: 'Monitor (12)', link: 'product-details-two.html' },
        { label: 'Smart TV (12)', link: 'product-details-two.html' },
        { label: 'Camera (12)', link: 'product-details-two.html' },
        { label: 'Monitor Stand (12)', link: 'product-details-two.html' },
        { label: 'Headphone (12)', link: 'product-details-two.html' },
      ],
      ratings: [
        { stars: 5, value: 70, count: 124 },
        { stars: 4, value: 50, count: 52 },
        { stars: 3, value: 35, count: 12 },
        { stars: 2, value: 20, count: 5 },
        { stars: 1, value: 5, count: 2 },
      ],
      colors: [
        { label: 'Black(12)', class: 'checked-black' },
        { label: 'Blue (12)', class: 'checked-primary' },
        { label: 'Gray (12)', class: 'checked-gray' },
        { label: 'Green (12)', class: 'checked-success' },
        { label: 'Red (12)', class: 'checked-danger' },
        { label: 'White (12)', class: 'checked-white' },
        { label: 'Purple (12)', class: 'checked-purple' },
      ],
      brands: ['Apple', 'Samsung', 'Microsoft', 'Apple', 'HP', 'DELL', 'Redmi'],
    }
  },
  mounted() {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  },
}
</script>
