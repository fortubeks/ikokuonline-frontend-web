<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard-body__content">
    <div class="welcome-balance mt-2 mb-40 d-flex justify-content-between gap-2">
      <div class="welcome-balance__left">
        <h4 class="welcome-balance__title mb-0">Welcome back! Michel</h4>
      </div>
      <div class="welcome-balance__right d-flex align-items-center gap-2">
        <span class="welcome-balance__text fw-500 text-heading">Available Balance:</span>
        <h4 class="welcome-balance__balance mb-0">$580.00</h4>
      </div>
    </div>

    <div class="dashboard-body__item-wrapper">
      <div class="dashboard-body__item">
        <div class="row gy-4">
          <div v-for="(widget, i) in widgets" :key="i" class="col-xl-3 col-sm-6">
            <div class="dashboard-widget">
              <img
                src="@/assets/dp-market-dashboard/images/shapes/widget-shape1.png"
                alt=""
                class="dashboard-widget__shape one"
              />
              <img
                src="@/assets/dp-market-dashboard/images/shapes/widget-shape2.png"
                alt=""
                class="dashboard-widget__shape two"
              />
              <span class="dashboard-widget__icon">
                <img :src="widget.icon" alt="" />
              </span>
              <div
                class="dashboard-widget__content d-flex justify-content-between gap-1 align-items-end"
              >
                <div>
                  <h4 class="dashboard-widget__number mb-1 mt-3">{{ widget.value }}</h4>
                  <span class="dashboard-widget__text font-14">{{ widget.label }}</span>
                </div>
                <img src="@/assets/dp-market-dashboard/images/icons/chart-icon.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-body__item">
        <div class="row gy-4">
          <div class="col-xl-8">
            <div class="dashboard-card">
              <div class="dashboard-card__header d-flex justify-content-between gap-2">
                <h6 class="dashboard-card__title mb-0">Sales History</h6>
                <div class="select-has-icon d-inline-block">
                  <select class="select common-input select-sm">
                    <option value="1">Monthly</option>
                    <option value="2">Daily</option>
                    <option value="3">Yearly</option>
                  </select>
                </div>
              </div>
              <div class="dashboard-card__chart w-full h-full">
                <apexchart
                  height="100%"
                  width="90%"
                  type="area"
                  :options="chartOptions"
                  :series="chartSeries"
                />
              </div>
            </div>
          </div>

          <div class="col-xl-4">
            <div class="dashboard-card">
              <div class="dashboard-card__header">
                <h6 class="dashboard-card__title mb-0">Top Countries</h6>
              </div>
              <ul class="country-list">
                <li
                  v-for="(country, i) in countries"
                  :key="i"
                  class="country-list__item d-flex justify-content-between gap-2"
                >
                  <div class="country-list__content d-flex align-items-center gap-2">
                    <span class="country-list__flag">
                      <img :src="country.flag" alt="" />
                    </span>
                    <span class="country-list__name">{{ country.name }}</span>
                  </div>
                  <span class="country-list__amount">{{ country.amount }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-body__item">
        <div class="table-responsive">
          <table class="table style-two">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item Sales</th>
                <th>Earning</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in earnings" :key="i">
                <td>{{ row.date }}</td>
                <td>{{ row.sales }}</td>
                <td class="">
                  <div class="px-[20px]">{{ row.amount }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import ApexChart from 'vue3-apexcharts'
import { computed } from 'vue'

const widgets = [
  {
    value: '2M+',
    label: 'Total Products',
    icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon1.svg',
  },
  {
    value: '$5289.00',
    label: 'Total Earnings',
    icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon2.svg',
  },
  {
    value: '5,2458',
    label: 'Total Downloads',
    icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon3.svg',
  },
  {
    value: '2,589',
    label: 'Total Sales',
    icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon4.svg',
  },
]

const countries = [
  {
    name: 'United States',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag1.png',
    amount: '$58.00',
  },
  {
    name: 'Maxico',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag2.png',
    amount: '$69.00',
  },
  {
    name: 'Brazil',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag3.png',
    amount: '$120.00',
  },
  {
    name: 'Canada',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag4.png',
    amount: '$25.00',
  },
  {
    name: 'Ireland',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag5.png',
    amount: '$85.00',
  },
  {
    name: 'Newzealand',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag6.png',
    amount: '$99.00',
  },
  { name: 'Spain', flag: '@/assets/dp-market-dashboard/images/thumbs/flag7.png', amount: '$89.00' },
  {
    name: 'Turkey',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag8.png',
    amount: '$72.00',
  },
  {
    name: 'Italy',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag9.png',
    amount: '$465.00',
  },
  {
    name: 'Argentina',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag10.png',
    amount: '$45.00',
  },
  {
    name: 'Maxico',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag11.png',
    amount: '$42.00',
  },
  {
    name: 'Newzealand',
    flag: '@/assets/dp-market-dashboard/images/thumbs/flag12.png',
    amount: '$89.00',
  },
]

const earnings = [
  { date: 'Saturday, 10', sales: 2, amount: '$89.00' },
  { date: 'Sunday, 11', sales: 3, amount: '$150.00' },
  { date: 'Monday, 12', sales: 2, amount: '$15.00' },
  { date: 'Tuesday, 15', sales: 2, amount: '$25.00' },
  { date: 'Wednesday, 16', sales: 5, amount: '$20.00' },
  { date: 'Thursday, 17', sales: 3, amount: '$35.00' },
  { date: 'Wednesday, 18', sales: 1, amount: '$15.00' },
  { date: 'Thursday, 20', sales: 5, amount: '$22.00' },
  { date: 'Wednesday, 22', sales: 8, amount: '$10.00' },
  { date: 'Tuesday, 23', sales: 6, amount: '$125.00' },
  { date: 'Wednesday, 24', sales: 3, amount: '$15.00' },
  { date: 'Tuesday, 23', sales: 9, amount: '$15.00' },
  { date: 'Wednesday, 24', sales: 5, amount: '$23.00' },
]

const chartOptions = computed(() => ({
  chart: { id: 'sales-chart', toolbar: { show: false } },
  xaxis: { categories: earnings.map((e) => e.date) },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0 } },
  colors: ['#4e73df'],
  tooltip: { y: { formatter: (val) => `$${val}` } },
}))

const chartSeries = computed(() => [
  {
    name: 'Earning',
    data: earnings.map((e) => parseFloat(e.amount.replace('$', ''))),
  },
])
</script>

<style scoped>
.dark .white-version {
  display: none !important;
}
.dark-version {
  display: none;
}
.dark .dark-version {
  display: inline !important;
}
</style>
