<template>
  <section class="account">
    <div class="container container-lg">
        <form action="#">
            <div class="row gy-4">
                <div class="col-12 col-xl-5 col-xxl-4 align-items-center justify-content-center d-none d-xl-flex p-0">
                    <div class="hover-border-main-600 transition-1 h-100">
                        <img src="@/assets/marketpro/images/login-cover.jpg" class="img-fluid auth-img-cover-login" width="650" alt="Login Image">
                    </div>
                </div>
                <!-- Login Card Start -->
                <div class="col-12 col-xl-7 col-xxl-8 auth-cover-right align-items-center justify-content-center p-0">
                    <div class="hover-border-main-600 transition-1 px-24 py-40">
                        <div class="mx-auto mb-32 text-center"><img src="@/assets/marketpro/images/logo/ikokuonline_logo.png" width="116" height="59" alt="Logo Image"></div>
                        <h6 class="mb-32 form-header">Verify your Account</h6>

                        <div class="mb-24 text-center">
                            <label for="email" class="text-neutral-900 text-lg mb-8 fw-medium">Verification code has been sent to your email address </label>
                        </div>
                        <div class="mb-24">
                            <div class="position-relative">
                                <input v-model="otp" type="text" inputmode="numeric" pattern="\d*" class="common-input" id="otp" placeholder="Enter OTP" />
                            </div>
                        </div>
                        <div class="mb-24 mt-48 text-center">
                            <button type="button" class="btn py-16 primary-btn btn-fill-499" @click="verifyAccount">Verify</button>
                        </div>
                        <div class="mt-48 text-center">
                        <label class="form-check-label flex-grow-1">
                            Didn't receive the code?
                            <a class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline" href="#" @click.prevent="resendOTP">
                            Request another
                            </a>
                        </label>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import axios from 'axios';
import api from '@/services/api';

const route = useRoute();
const router = useRouter();

const otp = ref('');
const email = ref('');

onMounted(() => {
  const storedEmail = localStorage.getItem('registered_email');
  if (!storedEmail) {
    // Redirect back if no email stored
    router.push('/register');
  } else {
    email.value = storedEmail;
  }
});

const verifyAccount = async () => {
  try {
    await api.post('/auth/email/verify', {
      email: email.value,
      otp: otp.value,
    });
    alert('Account verified successfully');
    if (localStorage.getItem('registered_email')) {
        localStorage.removeItem('registered_email');
    }
    router.push('/login');
  } catch (error) {
    alert(error.response?.data?.message || 'Verification failed');
    if (localStorage.getItem('registered_email')) {
        localStorage.removeItem('registered_email');
    }
  }
};

const resendOTP = async () => {
  try {
    await api.post('/auth/email/resend-verification', {
      email: email.value,
    });
    localStorage.setItem('registered_email', email.value);
    alert('Verification code resent');
  } catch (error) {
    // if (localStorage.getItem('reset_email')) {
    //     localStorage.removeItem('reset_email');
    // }
    alert(error.response?.data?.message || 'Failed to resend verification code');
  }
};
</script>


