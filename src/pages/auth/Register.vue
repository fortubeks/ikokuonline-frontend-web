<template>
  <section class="account">
    <div class="container container-lg">
      <form @submit.prevent="register">
        <div class="row gy-4">
          <!-- Left side image -->
          <div class="col-12 col-xl-5 col-xxl-4 d-none d-xl-flex p-0">
            <div class="h-100">
              <img src="@/assets/marketpro/images/login-cover.jpg" class="img-fluid auth-img-cover-login" width="650" alt="Login Image">
            </div>
          </div>

          <!-- Right side form -->
          <div class="col-12 col-xl-7 col-xxl-8 p-0">
            <div class="px-24 py-40">
              <div class="mx-auto mb-32" style="width: fit-content;">
                <img src="@/assets/marketpro/images/logo/ikokuonline_logo.png" width="116" height="59" alt="Logo">
              </div>
              <h6 class="mb-32 form-header">Create A Free Account</h6>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">First Name</label>
                <input v-model="form.first_name" type="text" class="common-input" placeholder="First Name*" required>
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Last Name</label>
                <input v-model="form.last_name" type="text" class="common-input" placeholder="Last Name*" required>
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Phone Number</label>
                <input v-model="form.phone" type="tel" class="common-input" placeholder="Phone Number for OTP*" required>
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Email</label>
                <input v-model="form.email" type="email" class="common-input" placeholder="Email address" required>
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Account Type</label>
                <select v-model="form.account_type" class="common-input form-select" required>
                  <option value="customer">Individual</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <div class="mb-24">
                <label class="text-neutral-900 text-lg mb-8 fw-medium">Password</label>
                <input v-model="form.password" type="password" class="common-input" placeholder="Enter Password" required>
              </div>

              <div class="mb-24 mt-48">
                <div class="flex-align gap-48 flex-wrap">
                  <button type="submit" class="btn py-16 primary-btn">Register</button>
                  <div id="google-signin-btn"></div>
                  <!-- <button type="button" class="btn btn-black">Sign up with Google</button> -->
                </div>
              </div>

              <div class="mt-48">
                Already have an account?
                <router-link to="/login" class="text-danger-600">Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
//import axios from 'axios';
import api from '@/services/api';
import router from '../../router';

onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: '477573067979-uvj8q3o1r49i69qqjn8ssp1ppuuqcs5h.apps.googleusercontent.com',
      callback: handleGoogleCredential,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        text: 'continue_with',
      }
    );
  }
});

const form = ref({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  account_type: 'customer',
});

const handleGoogleCredential = async (response) => {
  const idToken = response.credential;

  try {
    const res = await api.post('/auth/google', { id_token: idToken });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    alert('Signed in with Google!');
    router.push({ name: 'dashboard' }); // or any route after login
  } catch (error) {
    console.error('Google login failed:', error.response?.data);
    alert(error.response?.data?.message || 'Google login failed');
  }
};

const register = async () => {
  try {
    //await axios.post('http://127.0.0.1:8000/api/auth/register', form.value);
    const res = await api.post('/auth/register', form.value);
    alert('Registered successfully');
    //router.push('/login');
    const email = form.value.email;

    //console.log(email);

    localStorage.setItem('registered_email', email);

    // Redirect to verification page with query param
    router.push({ name: 'verify-account'});
  } catch (error) {
    //console.error(error);
    //alert('Registration failed');
    if (localStorage.getItem('registered_email')) {
        localStorage.removeItem('registered_email');
    }
    alert(error.response?.data?.message || 'Registration failed');
  }
};
</script>
