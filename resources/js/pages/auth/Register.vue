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
                        <div class="mx-auto mb-32" style="width: fit-content;"><img src="/public/assets/marketpro/images/logo/ikokuonline_logo.png" width="116" height="59" alt="Logo Image"></div>
                        <h6 class="mb-32 form-header">Create A Free Account</h6>
                        <div class="mb-24">
                            <label for="firstName" class="text-neutral-900 text-lg mb-8 fw-medium">First Name <span class="text-danger">*</span> </label>
                            <input type="text" class="common-input" id="firstName" placeholder="First Name*">
                        </div>
                        <div class="mb-24">
                            <label for="lastName" class="text-neutral-900 text-lg mb-8 fw-medium">Last Name <span class="text-danger">*</span> </label>
                            <input type="text" class="common-input" id="lastName" placeholder="Last Name*">
                        </div>
                        <div class="mb-24">
                            <label for="firstName" class="text-neutral-900 text-lg mb-8 fw-medium">Phone Number <span class="text-danger">*</span> </label>
                            <input type="number" class="common-input" id="phone" placeholder="Phone Number for OTP*">
                        </div>
                        <div class="mb-24">
                            <label for="email" class="text-neutral-900 text-lg mb-8 fw-medium">Email <span class="text-danger">*</span> </label>
                            <input type="email" class="common-input" id="email" placeholder="Email address">
                        </div>
                        <div class="mb-24">
                            <label for="email" class="text-neutral-900 text-lg mb-8 fw-medium">Account Type <span class="text-danger">*</span> </label>
                            <select class="common-input form-select border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium">
                                <option value="customer">Individual</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        
                        <div class="mb-24">
                            <label for="password" class="text-neutral-900 text-lg mb-8 fw-medium">Password</label>
                            <div class="position-relative">
                                <input type="password" class="common-input" id="password" placeholder="Enter Password">
                                <span class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash" id="#password"></span>
                            </div>
                        </div>
                        <div class="mb-24">
                            <div class="form-check common-check">
                                <input class="form-check-input" type="checkbox" name="terms-condition" value="" id="terms-condition">
                                <label class="form-check-label flex-grow-1" for="terms-condition">I have read and agree to <a class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline" href="#">Terms and Condition</a></label>
                            </div>
                        </div>
                        <div class="mb-24 mt-48">
                            <div class="flex-align gap-48 flex-wrap">
                                <button type="button" class="btn py-16 primary-btn">Register</button>
                                <button type="button" class="btn btn-black flex-center gap-8 rounded-8 py-16">
                                    <i class="ph ph-google-logo text-lg"></i>Sign up with google</button>
                                <div class="form-check common-check">
                                    <input class="form-check-input" type="checkbox" value="" id="remember">
                                    <label class="form-check-label flex-grow-1" for="remember">Remember me</label>
                                </div>
                            </div>
                        </div>
                        <div class="mt-48">
                            Already have an account?
                            <router-link to="/login" class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline">
                                Login
                            </router-link>
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
  name: '',
  email: '',
  password: '',
});

const register = async () => {
  try {
    await axios.post('http://your-backend-domain.com/api/register', form.value);
    router.push('/login');
  } catch (error) {
    alert('Registration failed');
  }
};
</script>
