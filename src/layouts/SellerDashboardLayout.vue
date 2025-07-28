<template>
  <section class="dashboard h-screen overflow-hidden">
    <div class="dashboard__inner d-flex h-full">
      <Suspense>
        <template #default>
          <AsyncSidebar />
        </template>
        <template #fallback>
          <div>Loading sidebar...</div>
        </template>
      </Suspense>

      <div class="dashboard-body flex-grow overflow-y-auto d-flex flex-column">
        <Suspense>
          <template #default>
            <AsyncHeader />
          </template>
          <template #fallback>
            <div>Loading header...</div>
          </template>
        </Suspense>

        <div class="dashboard-body__content flex-grow">
          <router-view />
        </div>

        <Footer />
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Footer from '../components/Footer.vue'

const AsyncHeader = defineAsyncComponent(
  () => import('@/components/sellerdashboard/DashboardHeader.vue'),
)
const AsyncSidebar = defineAsyncComponent(
  () => import('@/components/sellerdashboard/SellerSideBar.vue'),
)
</script>

<style scoped>
.dashboard {
  height: 100vh;
  overflow: hidden;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
.dashboard__inner {
  height: 100%;
}
.dashboard-body {
  width: 100%;
  height: 100%;
}

.dark .dashboard {
  background-color: #1e1e1e;
  color: #eee;
}
</style>
