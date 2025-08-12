<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="account">
    <div class=" ">
      <form @submit.prevent="login">
        <div class="row gy-4">
          <!-- Left side image -->
          <div class="col-12 col-xl-5 col-xxl-4 d-none d-xl-flex p-0">
            <div class="!h-dvh">
              <img
                src="@/assets/marketpro/images/login-cover.jpg"
                class="object-cover h-full w-[800px]"
                width="650"
                alt="Login Image"
              />
            </div>
          </div>

          <!-- Right side form -->
          <div class="col-12 col-xl-7 col-xxl-8 p-0">
            <div class="md:px-[120px] px-[24px] py-40">
              <div class="mx-auto mb-32" style="width: fit-content">
                <img
                  src="@/assets/marketpro/images/logo/ikokuonline_logo.png"
                  width="116"
                  height="59"
                  alt="Logo Image"
                />
              </div>
              <h6 class="mb-32 form-header">Welcome Back!</h6>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium"
                  >Email <span class="text-danger">*</span></label
                >
                <input
                  v-model="form.email"
                  type="email"
                  class="common-input"
                  placeholder="Email address"
                  required
                />
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="common-input"
                  placeholder="Enter Password"
                  required
                />
              </div>

              <div class="mb-24 mt-48">
                <div class="flex-align gap-48 flex-wrap">
                  <button type="submit" class="btn py-16 primary-btn">Log in</button>
                  <!-- <button type="button" class="btn btn-black flex-center gap-8 rounded-8 py-16">
                    <i class="ph ph-google-logo text-lg"></i>Sign in with Google
                  </button> -->
                  <div id="google-signin-btn"></div>
                  <div class="form-check common-check">
                    <input class="form-check-input" type="checkbox" id="remember" />
                    <label class="form-check-label flex-grow-1" for="remember">Remember me</label>
                  </div>
                </div>
              </div>

              <div class="mt-48">
                <router-link
                  to="/forgot-password"
                  class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                >
                  Forgot your password?
                </router-link>
              </div>
            </div>
            <div class="mt-10 !flex !items-center gap-1 !justify-center">
              Dont have an account?
              <router-link to="/register" class="text-danger-600">Register</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
//import axios from 'axios';
import router from '../../router'

import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'

onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: '477573067979-uvj8q3o1r49i69qqjn8ssp1ppuuqcs5h.apps.googleusercontent.com',
      callback: handleGoogleCredential,
    })

    window.google.accounts.id.renderButton(document.getElementById('google-signin-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      text: 'continue_with',
    })
  }
})

const handleGoogleCredential = async (response) => {
  const idToken = response.credential

  try {
    await api.get('/sanctum/csrf-cookie')
    const res = await api.post('/api/auth/google', { id_token: idToken })

    localStorage.setItem('user', JSON.stringify(res.data.user))

    const auth = useAuthStore()
    auth.setUser(res.data.user)

    console.log('is_authenticated: ' + auth.isAuthenticated)
    // alert('Signed in with Google!');
    router.push('/dashboard') // or any route after login
  } catch (error) {
    console.error('Google login failed:', error.response?.data)
    alert(error.response?.data?.message || 'Google login failed')
  }
}

const form = ref({
  email: '',
  password: '',
})

// const login = async () => {
//   try {
//     //const res = await api.post('/auth/login', form.value);

//     //const token = res.data.token || res.data.access_token;

//     //if (!token) {
//         //throw new Error('Token not returned from API');
//     //}

//     // Save token (adjust key based on your API)
//     //localStorage.setItem('token', token);

//     // Set default Authorization header for future requests
//     //api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//     api.get('/sanctum/csrf-cookie').then(response => {
//         const res = await api.post('/auth/login', form.value);
//     });

//     // Redirect to dashboard or home
//     router.push('/dashboard');
//   } catch (error) {
//     console.error(error);
//     alert(error.response?.data?.message || 'Login failed');
//   }
// };
const login = async () => {
  try {
    // Get CSRF cookie first (required by Sanctum)
    await api.get('/sanctum/csrf-cookie')

    // Then perform login
    const res = await api.post('/api/auth/login', form.value)
    const auth = useAuthStore()
    auth.setUser(res.data.user)

    console.log('is_authenticated: ' + auth.isAuthenticated)

    // Redirect to dashboard or home
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
    alert(error.response?.data?.message || 'Login failed')
  }
}
</script>
