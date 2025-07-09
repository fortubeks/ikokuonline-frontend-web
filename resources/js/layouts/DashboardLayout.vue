<!-- layouts/DashboardLayout.vue -->
<template>
  <section class="dashboard">
    <div class="dashboard__inner d-flex">
      <Sidebar />

      <div class="dashboard-body">
        <Header />
        <div class="dashboard-body__content">
          <router-view /> <!-- renders page content -->
        </div>
        <Footer />
      </div>
    </div>
  </section>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
</script>
