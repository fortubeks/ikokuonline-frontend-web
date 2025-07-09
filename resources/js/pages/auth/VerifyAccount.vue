<template>
  <section class="account">
    <div class="container container-lg">
        <form action="#">
            <div class="row gy-4">
                <div class="col-12 col-xl-5 col-xxl-4 align-items-center justify-content-center d-none d-xl-flex p-0">
                    <div class="hover-border-main-600 transition-1 h-100">
                        <img src="/public/assets/marketpro/images/login-cover.jpg" class="img-fluid auth-img-cover-login" width="650" alt="Login Image">
                    </div>
                </div>
                <!-- Login Card Start -->
                <div class="col-12 col-xl-7 col-xxl-8 auth-cover-right align-items-center justify-content-center p-0">
                    <div class="hover-border-main-600 transition-1 px-24 py-40">
                        <div class="mx-auto mb-32 text-center"><img src="/public/assets/marketpro/images/logo/ikokuonline_logo.png" width="116" height="59" alt="Logo Image"></div>
                        <h6 class="mb-32 form-header">Verify your Account</h6>

                        <div class="mb-24 text-center">
                            <label for="email" class="text-neutral-900 text-lg mb-8 fw-medium">Verification code has been sent to your registered phone number </label>
                        </div>
                        <div class="mb-24">
                            <div class="position-relative">
                                <input type="number" class="common-input" id="otp" placeholder="Enter OTP">
                            </div>
                        </div>
                        <div class="mb-24 mt-48 text-center">
                            <button type="button" class="btn py-16 primary-btn btn-fill-499">Verify</button>
                        </div>
                        <div class="mt-48 text-center">
                            <label class="form-check-label flex-grow-1" for="terms-condition">Didn't receive the code? <a class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline" href="#">Request another</a></label>
                        </div>
                    </div>
                </div>
                <!-- Login Card End -->

            </div>
        </form>
    </div>
 </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../../router';

const form = ref({
  email: '',
  password: '',
});

const login = async () => {
  try {
    const res = await axios.post('http://your-backend-domain.com/api/login', form.value);
    localStorage.setItem('token', res.data.token); // Save token
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    router.push('/dashboard'); // or wherever you want
  } catch (error) {
    alert('Login failed');
  }
};
</script>

