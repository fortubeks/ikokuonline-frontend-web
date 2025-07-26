<template>
  <section class="cart py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-lg-11">
          <div class="cart-table border border-gray-100 rounded-8">
            <div class="overflow-x-auto scroll-sm scroll-sm-horizontal">
              <table class="table rounded-8 overflow-hidden">
                <thead>
                  <tr class="border-bottom border-neutral-100">
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      Delete
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      Product Name
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      Unit Price
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      Stock Status
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartItems" :key="index">
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <button
                        type="button"
                        class="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                        @click="removeItem(index)"
                      >
                        <i class="ph ph-x-circle text-2xl d-flex"></i>
                        Remove
                      </button>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <div class="table-product d-flex align-items-center gap-24">
                        <a
                          :href="item.detailsLink"
                          class="table-product__thumb border border-gray-100 rounded-8 flex-center"
                        >
                          <img :src="item.image" :alt="item.name" />
                        </a>
                        <div class="table-product__content text-start">
                          <h6 class="title text-lg fw-semibold mb-8">
                            <a :href="item.detailsLink" class="link text-line-2" tabindex="0">{{
                              item.name
                            }}</a>
                          </h6>
                          <div class="flex-align gap-16 mb-16">
                            <div class="flex-align gap-6">
                              <span class="text-md fw-medium text-warning-600 d-flex">
                                <i class="ph-fill ph-star"></i>
                              </span>
                              <span class="text-md fw-semibold text-gray-900">{{
                                item.rating
                              }}</span>
                            </div>
                            <span class="text-sm fw-medium text-gray-200">|</span>
                            <span class="text-neutral-600 text-sm">{{ item.reviews }} Reviews</span>
                          </div>
                          <div class="flex-align gap-16">
                            <a
                              v-for="(tag, tIndex) in item.tags"
                              :key="tIndex"
                              href="cart.html"
                              class="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium"
                            >
                              {{ tag }}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <span class="text-lg h6 mb-0 fw-semibold">${{ item.price }}</span>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <span class="text-lg h6 mb-0 fw-semibold">{{ item.stock }}</span>
                    </td>
                    <td class="px-40 py-32">
                      <a href="cart.html" class="btn btn-main-two rounded-8 px-64">
                        Add To Cart <i class="ph ph-shopping-cart"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="shipping mb-24" id="shipping">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, index) in shippingItems"
          :key="index"
          class="col-xxl-3 col-sm-6"
          :data-aos="item.aos"
          :data-aos-duration="item.duration"
        >
          <div
            class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2"
          >
            <span
              class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0"
            >
              <i :class="item.icon"></i>
            </span>
            <div>
              <h6 class="mb-0">{{ item.title }}</h6>
              <span class="text-sm text-heading">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        {
          name: 'Taylor Farms Broccoli Florets Vegetables',
          image: 'assets/images/thumbs/product-two-img1.png',
          price: '125.00',
          stock: 'In Stock',
          rating: '4.8',
          reviews: '128',
          tags: ['Camera', 'Videos'],
          detailsLink: 'product-details.html',
        },
        {
          name: 'Smart Phone With Intel Celeron',
          image: 'assets/images/thumbs/product-two-img3.png',
          price: '125.00',
          stock: 'In Stock',
          rating: '4.8',
          reviews: '128',
          tags: ['Camera', 'Videos'],
          detailsLink: 'product-details.html',
        },
        {
          name: 'HP Chromebook With Intel Celeron',
          image: 'assets/images/thumbs/product-two-img14.png',
          price: '125.00',
          stock: 'In Stock',
          rating: '4.8',
          reviews: '128',
          tags: ['Camera', 'Videos'],
          detailsLink: 'product-details.html',
        },
        {
          name: 'Smart watch With Intel Celeron',
          image: 'assets/images/thumbs/product-two-img2.png',
          price: '125.00',
          stock: 'In Stock',
          rating: '4.8',
          reviews: '128',
          tags: ['Camera', 'Videos'],
          detailsLink: 'product-details.html',
        },
      ],
      shippingItems: [
        {
          title: 'Free Shipping',
          text: 'Free shipping all over the US',
          icon: 'ph-fill ph-car-profile',
          aos: 'zoom-in',
          duration: '400',
        },
        {
          title: '100% Satisfaction',
          text: 'Free shipping all over the US',
          icon: 'ph-fill ph-hand-heart',
          aos: 'zoom-in',
          duration: '600',
        },
        {
          title: 'Secure Payments',
          text: 'Free shipping all over the US',
          icon: 'ph-fill ph-credit-card',
          aos: 'zoom-in',
          duration: '800',
        },
        {
          title: '24/7 Support',
          text: 'Free shipping all over the US',
          icon: 'ph-fill ph-chats',
          aos: 'zoom-in',
          duration: '1000',
        },
      ],
    }
  },
  methods: {
    removeItem(index) {
      this.cartItems.splice(index, 1)
    },
  },
}
</script>

<style scoped></style>
