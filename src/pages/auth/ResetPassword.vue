<template>
  <section class="account">
    <div class="container container-lg">
      <form action="#">
        <div class="row gy-4">
          <div
            class="col-12 col-xl-5 col-xxl-4 align-items-center justify-content-center d-none d-xl-flex p-0"
          >
            <div class="hover-border-main-600 transition-1 h-100">
              <img
                src="@/assets/dp-market-dashboard/images/login-cover.jpg"
                class="img-fluid auth-img-cover-login"
                width="650"
                alt="Login Image"
              />
            </div>
          </div>
          <!-- Login Card Start -->
          <div
            class="col-12 col-xl-7 col-xxl-8 auth-cover-right align-items-center justify-content-center p-0"
          >
            <div class="hover-border-main-600 transition-1 px-24 py-40">
              <div class="mx-auto mb-32 text-center">
                <img
                  src="@/assets/dp-market-dashboard/images/logo/ikokuonline_logo.png"
                  width="116"
                  height="59"
                  alt="Logo Image"
                />
              </div>
              <h6 class="mb-32 form-header">Account Recovery</h6>

              <div class="mb-24">
                <div class="position-relative">
                  <input
                    type="text"
                    v-model="otp"
                    inputmode="numeric"
                    pattern="\d*"
                    class="common-input"
                    id="otp"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
              <div class="mb-24">
                <label for="newPassword" class="text-neutral-900 text-lg mb-8 fw-medium"
                  >New Password</label
                >
                <div class="position-relative">
                  <input
                    type="password"
                    v-model="newPassword"
                    class="common-input"
                    id="newPassword"
                    placeholder="Enter New Password"
                  />
                  <span
                    class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph ph-eye-slash"
                    id="#password"
                  ></span>
                </div>
              </div>
              <div class="mb-24 mt-48 text-center">
                <button
                  type="button"
                  class="btn py-16 primary-btn btn-fill-499"
                  @click="resetPassword"
                >
                  Reset password
                </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
//import axios from 'axios';
import api from '@/services/api'

const router = useRouter()
const email = ref('')
const otp = ref('')
const newPassword = ref('')

onMounted(() => {
  const storedEmail = localStorage.getItem('reset_email')
  if (!storedEmail) {
    // Redirect back if no email stored
    router.push('/forgot-password')
  } else {
    email.value = storedEmail
  }
})

const resetPassword = async () => {
  if (!otp.value || !newPassword.value) {
    alert('OTP and new password are required')
    return
  }

  try {
    await api.post('/api/auth/reset-password', {
      email: email.value,
      otp: otp.value,
      password: newPassword.value,
    })

    if (localStorage.getItem('reset_email')) {
      localStorage.removeItem('reset_email')
    }

    alert('Password has been reset successfully')
    router.push('/login')
  } catch (error) {
    alert(error.response?.data?.message || 'Reset failed')
    if (localStorage.getItem('reset_email')) {
      localStorage.removeItem('reset_email')
    }
  }
}
</script>
