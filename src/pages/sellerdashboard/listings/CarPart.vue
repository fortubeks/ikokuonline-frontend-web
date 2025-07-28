<template>
  <div class="dashboard-body__content">
    
    <div class="welcome-balance mt-2 mb-40 flx-between gap-2">
      <div class="welcome-balance__left">
        <h4 class="welcome-balance__title mb-0">Welcome back! Michel</h4>
      </div>
      <div class="welcome-balance__right flx-align gap-2">
        <span class="welcome-balance__text fw-500 text-heading">Available Balance:</span>
        <h4 class="welcome-balance__balance mb-0">$580.00</h4>
      </div>
    </div>

    <div class="dashboard-body__item-wrapper">
      
      <div class="dashboard-body__item">
        <div class="row gy-4">
          <div class="col-xl-3 col-sm-6" v-for="(widget, index) in widgets" :key="index">
            <div class="dashboard-widget">
              <img :src="widget.shape1" alt="" class="dashboard-widget__shape one">
              <img :src="widget.shape2" alt="" class="dashboard-widget__shape two">
              <span class="dashboard-widget__icon">
                <img :src="widget.icon" alt="">
              </span>
              <div class="dashboard-widget__content flx-between gap-1 align-items-end">
                <div>
                  <h4 class="dashboard-widget__number mb-1 mt-3">{{ widget.number }}</h4>
                  <span class="dashboard-widget__text font-14">{{ widget.text }}</span>
                </div>
                <img src="@/assets/dp-market-dashboard/images/icons/chart-icon.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div class="dashboard-body__item">
        <div class="row gy-4">
          <div class="col-xl-8">
            <div class="dashboard-card">
              <div class="dashboard-card__header flx-between gap-2">
                <h6 class="dashboard-card__title mb-0">Sales History</h6>
                <div class="select-has-icon d-inline-block">
                  <select class="select common-input select-sm">
                    <option value="1">Monthly</option>
                    <option value="2">Daily</option>
                    <option value="3">Yearly</option>
                  </select>
                </div>
              </div>
              <div class="dashboard-card__chart">
                <div id="chart"></div>
              </div>
            </div>
          </div>

          <div class="col-xl-4">
            <div class="dashboard-card">
              <div class="dashboard-card__header">
                <h6 class="dashboard-card__title mb-0">Top Countries</h6>
              </div>
              <ul class="country-list">
                <li class="country-list__item flx-between gap-2" v-for="(country, index) in countries" :key="index">
                  <div class="country-list__content flx-align gap-2">
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
              <tr v-for="(sale, index) in sales" :key="index">
                <td>{{ sale.date }}</td>
                <td>{{ sale.items }}</td>
                <td>{{ sale.earning }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      widgets: [
        {
          shape1: '@/assets/dp-market-dashboard/images/shapes/widget-shape1.png',
          shape2: '@/assets/dp-market-dashboard/images/shapes/widget-shape2.png',
          icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon1.svg',
          number: '2M+',
          text: 'Total Products'
        },
        {
          shape1: '@/assets/dp-market-dashboard/images/shapes/widget-shape1.png',
          shape2: '@/assets/dp-market-dashboard/images/shapes/widget-shape2.png',
          icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon2.svg',
          number: '$5289.00',
          text: 'Total Earnings'
        },
        {
          shape1: '@/assets/dp-market-dashboard/images/shapes/widget-shape1.png',
          shape2: '@/assets/dp-market-dashboard/images/shapes/widget-shape2.png',
          icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon3.svg',
          number: '5,2458',
          text: 'Total Downloads'
        },
        {
          shape1: '@/assets/dp-market-dashboard/images/shapes/widget-shape1.png',
          shape2: '@/assets/dp-market-dashboard/images/shapes/widget-shape2.png',
          icon: '@/assets/dp-market-dashboard/images/icons/dashboard-widget-icon4.svg',
          number: '2,589',
          text: 'Total Sales'
        }
      ],
      countries: [
        { name: 'United States', flag: '@/assets/dp-market-dashboard/images/thumbs/flag1.png', amount: '$58.00' },
        { name: 'Maxico', flag: '@/assets/dp-market-dashboard/images/thumbs/flag2.png', amount: '$69.00' },
        { name: 'Brazil', flag: '@/assets/dp-market-dashboard/images/thumbs/flag3.png', amount: '$120.00' },
        { name: 'Canada', flag: '@/assets/dp-market-dashboard/images/thumbs/flag4.png', amount: '$25.00' },
        { name: 'Ireland', flag: '@/assets/dp-market-dashboard/images/thumbs/flag5.png', amount: '$85.00' },
        { name: 'Newzealand', flag: '@/assets/dp-market-dashboard/images/thumbs/flag6.png', amount: '$99.00' },
        { name: 'Spain', flag: '@/assets/dp-market-dashboard/images/thumbs/flag7.png', amount: '$89.00' },
        { name: 'Turkey', flag: '@/assets/dp-market-dashboard/images/thumbs/flag8.png', amount: '$72.00' },
        { name: 'Italy', flag: '@/assets/dp-market-dashboard/images/thumbs/flag9.png', amount: '$465.00' },
        { name: 'Argentina', flag: '@/assets/dp-market-dashboard/images/thumbs/flag10.png', amount: '$45.00' },
        { name: 'Maxico', flag: '@/assets/dp-market-dashboard/images/thumbs/flag11.png', amount: '$42.00' },
        { name: 'Newzealand', flag: '@/assets/dp-market-dashboard/images/thumbs/flag12.png', amount: '$89.00' }
      ],
      sales: [
        { date: 'Saturday, 10', items: 2, earning: '$89.00' },
        { date: 'Sunday, 11', items: 3, earning: '$150.00' },
        { date: 'Monday, 12', items: 2, earning: '$15.00' },
        { date: 'Tuesday, 15', items: 2, earning: '$25.00' },
        { date: 'Wednesday, 16', items: 5, earning: '$20.00' },
        { date: 'Thursday, 17', items: 3, earning: '$35.00' },
        { date: 'Wednesday, 18', items: 1, earning: '$15.00' },
        { date: 'Thursday, 20', items: 5, earning: '$22.00' },
        { date: 'Wednesday, 22', items: 8, earning: '$10.00' },
        { date: 'Tuesday, 23', items: 6, earning: '$125.00' },
        { date: 'Wednesday, 24', items: 3, earning: '$15.00' },
        { date: 'Tuesday, 23', items: 9, earning: '$15.00' },
        { date: 'Wednesday, 24', items: 5, earning: '$23.00' }
      ]
    };
  }
};
</script>

<style scoped>
</style>