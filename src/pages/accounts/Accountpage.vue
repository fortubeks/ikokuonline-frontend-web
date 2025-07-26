<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="account py-80">
    <div class="container container-lg">
      <form @submit.prevent>
        <div class="row gy-4">

          <!-- Login Card -->
          <div class="col-xl-6 pe-xl-5">
            <div class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
              <h6 class="text-xl mb-32">Login</h6>
              <div class="mb-24">
                <label for="username" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Username or email address <span class="text-danger">*</span>
                </label>
                <input type="text" class="common-input" id="username" placeholder="First Name" v-model="login.username" />
              </div>
              <div class="mb-24">
                <label for="password" class="text-neutral-900 text-lg mb-8 fw-medium">Password</label>
                <div class="position-relative">
                  <input :type="login.showPassword ? 'text' : 'password'" class="common-input" id="password" placeholder="Enter Password" v-model="login.password" />
                  <span @click="login.showPassword = !login.showPassword" class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph" :class="login.showPassword ? 'ph-eye' : 'ph-eye-slash'"></span>
                </div>
              </div>
              <div class="mb-24 mt-48">
                <div class="flex-align gap-48 flex-wrap">
                  <button type="submit" class="btn btn-main py-18 px-40">Log in</button>
                  <div class="form-check common-check">
                    <input class="form-check-input" type="checkbox" id="remember" v-model="login.remember" />
                    <label class="form-check-label flex-grow-1" for="remember">Remember me</label>
                  </div>
                </div>
              </div>
              <div class="mt-48">
                <a href="#" class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline">Forgot your password?</a>
              </div>
            </div>
          </div>

          <div class="col-xl-6">
            <div class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
              <h6 class="text-xl mb-32">Register</h6>
              <div class="mb-24">
                <label for="usernameTwo" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Username <span class="text-danger">*</span>
                </label>
                <input type="text" class="common-input" id="usernameTwo" placeholder="Write a username" v-model="register.username" />
              </div>
              <div class="mb-24">
                <label for="emailTwo" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Email address <span class="text-danger">*</span>
                </label>
                <input type="email" class="common-input" id="emailTwo" placeholder="Enter Email Address" v-model="register.email" />
              </div>
              <div class="mb-24">
                <label for="enter-password" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Password <span class="text-danger">*</span>
                </label>
                <div class="position-relative">
                  <input :type="register.showPassword ? 'text' : 'password'" class="common-input" id="enter-password" placeholder="Enter Password" v-model="register.password" />
                  <span @click="register.showPassword = !register.showPassword" class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph" :class="register.showPassword ? 'ph-eye' : 'ph-eye-slash'"></span>
                </div>
              </div>
              <div class="my-48">
                <p class="text-gray-500">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our
                  <a href="#" class="text-main-600 text-decoration-underline">privacy policy</a>.
                </p>
              </div>
              <div class="mt-48">
                <button type="submit" class="btn btn-main py-18 px-40">Register</button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  </section>


  <section class="shipping mb-24" id="shipping">
    <div class="container container-lg">
      <div class="row gy-4">
        <div v-for="(item, index) in shippingItems" :key="index" class="col-xxl-3 col-sm-6" :data-aos="item.aos" :data-aos-duration="item.duration">
          <div class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
            <span class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
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
      login: {
        username: '',
        password: '',
        remember: false,
        showPassword: false
      },
      register: {
        username: '',
        email: '',
        password: '',
        showPassword: false
      },
      shippingItems: [
        { title: 'Free Shipping', text: 'Free shipping all over the US', icon: 'ph-fill ph-car-profile', aos: 'zoom-in', duration: '400' },
        { title: '100% Satisfaction', text: 'Free shipping all over the US', icon: 'ph-fill ph-hand-heart', aos: 'zoom-in', duration: '600' },
        { title: 'Secure Payments', text: 'Free shipping all over the US', icon: 'ph-fill ph-credit-card', aos: 'zoom-in', duration: '800' },
        { title: '24/7 Support', text: 'Free shipping all over the US', icon: 'ph-fill ph-chats', aos: 'zoom-in', duration: '1000' }
      ]
    };
  }
};
</script>

<style scoped>

</style>
