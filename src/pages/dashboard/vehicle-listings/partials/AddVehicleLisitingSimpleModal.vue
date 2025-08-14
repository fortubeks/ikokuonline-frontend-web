<template>
  <div class="add-vehicle-listing-simple-modal">
    <h2>Add Vehicle Listing</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="make">Make</label>
        <input id="make" v-model="form.make" type="text" required />
      </div>
      <div class="form-group">
        <label for="model">Model</label>
        <input id="model" v-model="form.model" type="text" required />
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input id="year" v-model="form.year" type="number" min="1900" max="2100" required />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input id="price" v-model="form.price" type="number" min="0" required />
      </div>
      <div class="form-actions">
        <button type="submit">Add Listing</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  make: '',
  model: '',
  year: '',
  price: '',
})

function submitForm() {
  // Emit the form data to parent
  // You can replace 'add' with your preferred event name
  emit('add', { ...form })
  // Optionally reset the form
  form.make = ''
  form.model = ''
  form.year = ''
  form.price = ''
}
</script>

<style scoped>
.add-vehicle-listing-simple-modal {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
