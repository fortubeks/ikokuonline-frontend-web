<template>
  <section class="cart py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <!-- Cart Table -->
        <div class="col-xl-9 col-lg-8">
          <div class="cart-table border border-gray-100 rounded-8 px-40 py-48">
            <div class="overflow-x-auto scroll-sm scroll-sm-horizontal">
              <table class="table style-three">
                <thead>
                  <tr>
                    <th class="h6 mb-0 text-lg fw-bold">Delete</th>
                    <th class="h6 mb-0 text-lg fw-bold">Product Name</th>
                    <th class="h6 mb-0 text-lg fw-bold">Price</th>
                    <th class="h6 mb-0 text-lg fw-bold">Quantity</th>
                    <th class="h6 mb-0 text-lg fw-bold">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in cartItems" :key="i">
                    <td>
                      <button type="button" class="remove-tr-btn flex-align gap-12 hover-text-danger-600" @click="removeItem(i)">
                        <i class="ph ph-x-circle text-2xl d-flex"></i>
                        Remove
                      </button>
                    </td>
                    <td>
                      <div class="table-product d-flex align-items-center gap-24">
                        <a :href="item.detailsUrl" class="table-product__thumb border border-gray-100 rounded-8 flex-center">
                          <img :src="item.img" alt="" />
                        </a>
                        <div class="table-product__content text-start">
                          <h6 class="title text-lg fw-semibold mb-8">
                            <a :href="item.detailsUrl" class="link text-line-2">{{ item.name }}</a>
                          </h6>
                          <div class="flex-align gap-16 mb-16">
                            <div class="flex-align gap-6">
                              <span class="text-md fw-medium text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                              <span class="text-md fw-semibold text-gray-900">{{ item.rating }}</span>
                            </div>
                            <span class="text-sm fw-medium text-gray-200">|</span>
                            <span class="text-neutral-600 text-sm">{{ item.reviews }} Reviews</span>
                          </div>
                          <div class="flex-align gap-16">
                            <a v-for="tag in item.tags" :key="tag" href="#" class="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium">{{ tag }}</a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="text-lg h6 mb-0 fw-semibold">${{ item.price }}</span>
                    </td>
                    <td>
                      <div class="d-flex rounded-4 overflow-hidden">
                        <button type="button" class="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white" @click="decreaseQty(i)"><i class="ph ph-minus"></i></button>
                        <input type="number" class="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-4" v-model.number="item.quantity" min="1" />
                        <button type="button" class="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white" @click="increaseQty(i)"><i class="ph ph-plus"></i></button>
                      </div>
                    </td>
                    <td>
                      <span class="text-lg h6 mb-0 fw-semibold">${{ item.quantity * item.price }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex-between flex-wrap gap-16 mt-16">
              <div class="flex-align gap-16">
                <input type="text" class="common-input" placeholder="Coupon Code" />
                <button type="submit" class="btn btn-main py-18 w-100 rounded-8">Apply Coupon</button>
              </div>
              <button type="submit" class="text-lg text-gray-500 hover-text-main-600">Update Cart</button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-xl-3 col-lg-4">
          <div class="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
            <h6 class="text-xl mb-32">Cart Totals</h6>
            <div class="bg-color-three rounded-8 p-24">
              <div class="mb-32 flex-between gap-8">
                <span class="text-gray-900 font-heading-two">Subtotal</span>
                <span class="text-gray-900 fw-semibold">${{ subtotal }}</span>
              </div>
              <div class="mb-32 flex-between gap-8">
                <span class="text-gray-900 font-heading-two">Extimated Delivery</span>
                <span class="text-gray-900 fw-semibold">Free</span>
              </div>
              <div class="mb-0 flex-between gap-8">
                <span class="text-gray-900 font-heading-two">Extimated Taxs</span>
                <span class="text-gray-900 fw-semibold">USD 10.00</span>
              </div>
            </div>
            <div class="bg-color-three rounded-8 p-24 mt-24">
              <div class="flex-between gap-8">
                <span class="text-gray-900 text-xl fw-semibold">Total</span>
                <span class="text-gray-900 text-xl fw-semibold">${{ subtotal + 10 }}</span>
              </div>
            </div>
            <a href="checkout.html" class="btn btn-main mt-40 py-18 w-100 rounded-8">Proceed to checkout</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Shipping Section -->
  <section class="shipping mb-24" id="shipping">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-xxl-3 col-sm-6" v-for="(s, i) in shippingItems" :key="i" :data-aos="s.aos" :data-aos-duration="s.duration">
          <div class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
            <span class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
              <i :class="s.icon"></i>
            </span>
            <div>
              <h6 class="mb-0">{{ s.title }}</h6>
              <span class="text-sm text-heading">{{ s.subtitle }}</span>
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
          detailsUrl: 'product-details.html',
          img: 'assets/images/thumbs/product-two-img1.png',
          price: 125,
          quantity: 1,
          rating: 4.8,
          reviews: 128,
          tags: ['Camera', 'Videos']
        },
        {
          name: 'Taylor Farms Broccoli Florets Vegetables',
          detailsUrl: 'product-details.html',
          img: 'assets/images/thumbs/product-two-img2.png',
          price: 125,
          quantity: 1,
          rating: 4.8,
          reviews: 128,
          tags: ['Camera', 'Videos']
        }
      ],
      shippingItems: [
        { title: 'Free Shipping', subtitle: 'Free shipping all over the US', icon: 'ph-fill ph-car-profile', aos: 'zoom-in', duration: 400 },
        { title: '100% Satisfaction', subtitle: 'Free shipping all over the US', icon: 'ph-fill ph-hand-heart', aos: 'zoom-in', duration: 600 },
        { title: 'Secure Payments', subtitle: 'Free shipping all over the US', icon: 'ph-fill ph-credit-card', aos: 'zoom-in', duration: 800 },
        { title: '24/7 Support', subtitle: 'Free shipping all over the US', icon: 'ph-fill ph-chats', aos: 'zoom-in', duration: 1000 }
      ]
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
    }
  },
  methods: {
    increaseQty(i) {
      this.cartItems[i].quantity++
    },
    decreaseQty(i) {
      if (this.cartItems[i].quantity > 1) this.cartItems[i].quantity--
    },
    removeItem(i) {
      this.cartItems.splice(i, 1)
    }
  }
}
</script>

<style scoped>
/* optional scoped additions */
</style>
