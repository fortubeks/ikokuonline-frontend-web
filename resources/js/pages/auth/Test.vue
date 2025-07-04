<template>
  <section class="account">
    <div class="container container-lg">
        <form action="#">
            <div class="row gy-4">
                <div class="col-12 col-xl-5 col-xxl-4 align-items-center justify-content-center d-none d-xl-flex p-0">
                    <div class="hover-border-main-600 transition-1 h-100">
                        <img src="/public/assets/images/login-cover.jpg" class="img-fluid auth-img-cover-login" width="650" alt="Login Image">
                    </div>
                </div>
                <!-- Login Card Start -->
                <div class="col-12 col-xl-7 col-xxl-8 auth-cover-right align-items-center justify-content-center p-0">
                    <div class=" hover-border-main-600 transition-1 px-24 py-40">
                        <h6 class="text-xl mb-32">Login</h6>
                        <div class="mb-24">
                            <label for="username" class="text-neutral-900 text-lg mb-8 fw-medium">Username or email address <span class="text-danger">*</span> </label>
                            <input type="text" class="common-input" id="username" placeholder="First Name">
                        </div>
                        <div class="mb-24">
                            <label for="password" class="text-neutral-900 text-lg mb-8 fw-medium">Password</label>
                            <div class="position-relative">
                                <input type="password" class="common-input" id="password" placeholder="Enter Password" value="password">
                                <span class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash" id="#password"></span>
                            </div>
                        </div>
                        <div class="mb-24 mt-48">
                            <div class="flex-align gap-48 flex-wrap">
                                <button type="button" class="btn py-16 primary-btn">Log in</button>
                                <button type="button" class="btn btn-black flex-center gap-8 rounded-8 py-16">
                                    <i class="ph ph-google-logo text-lg"></i>Sign in with google</button>
                                <div class="form-check common-check">
                                    <input class="form-check-input" type="checkbox" value="" id="remember">
                                    <label class="form-check-label flex-grow-1" for="remember">Remember me</label>
                                </div>
                            </div>
                        </div>
                        <div class="mt-48">
                            <a href="#" class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline">Forgot your password?</a>
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

