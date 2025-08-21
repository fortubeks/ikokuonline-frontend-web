<!-- layouts/DashboardLayout.vue -->
<template>
  <section class="dashboard">
    <div class="dashboard__inner d-flex">
      <Sidebar />

      <div class="dashboard-body">
        <Header />
        <div class="dashboard-body__content">
          <router-view />
          <!-- renders page content -->
        </div>
        <Footer />
      </div>
    </div>
  </section>
</template>

<script setup>
import Sidebar from '../components/dashboard/Sidebar.vue'
import Header from '../components/dashboard/Header.vue'
import Footer from '../components/dashboard/Footer.vue'

import { onMounted } from 'vue'
import { useCart } from '../components/homepagev3/CartProvider.js'
const { mergeGuestIntoUser, removeGuestCartFromStorage, readGuestCartFromStorage } = useCart()

// Merge cart 
onMounted(async () => {
  try {
    const guestCart = readGuestCartFromStorage()
    if (guestCart?.items?.length > 0) {
      await mergeGuestIntoUser()
      //removeGuestCartFromStorage()
      //await loadCart()
    }  
  } catch (mergeErr) {
    console.error('Cart merge failed:', mergeErr)
  }
})

</script>
