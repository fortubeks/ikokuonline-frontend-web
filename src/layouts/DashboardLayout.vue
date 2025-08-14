<!-- layouts/DashboardLayout.vue -->
<template>
  <section class="dashboard">
    <div class="dashboard__inner d-flex">
      <Sidebar />

      <div class="dashboard-body !overflow-y-auto !h-screen">
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
</script>
