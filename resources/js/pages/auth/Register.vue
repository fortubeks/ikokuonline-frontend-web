<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="form.name" type="text" placeholder="Full Name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
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
