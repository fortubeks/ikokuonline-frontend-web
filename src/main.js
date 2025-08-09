/* eslint-disable vue/multi-word-component-names */
// Tailwind + Fonts
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia';

import AOS from 'aos'
import 'aos/dist/aos.css'

// ApexCharts
import VueApexCharts from 'vue3-apexcharts'

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Dashboard Styles
import '@/assets/dp-market-dashboard/css/bootstrap.min.css'
import '@/assets/dp-market-dashboard/css/fontawesome-all.min.css'
import '@/assets/dp-market-dashboard/css/slick.css'
import '@/assets/dp-market-dashboard/css/magnific-popup.css'
import '@/assets/dp-market-dashboard/css/line-awesome.min.css'
import '@/assets/dp-market-dashboard/css/main.css'

// (Dashboard Scripts)
// import '@/assets/dp-market-dashboard/js/countdown.js'
// import '@/assets/dp-market-dashboard/js/counterup.min.js'
// import '@/assets/dp-market-dashboard/js/slick.min.js'
// import '@/assets/dp-market-dashboard/js/jquery.magnific-popup.js'
// import '@/assets/dp-market-dashboard/js/apexchart.js'
// import '@/assets/dp-market-dashboard/js/main.js'

import { useAuthStore } from '@/stores/auth';

// Create App
const app = createApp(App)
const pinia = createPinia()
app.use(pinia);


const auth = useAuthStore();
auth.checkAuth();
auth.hydrate();

app.use(router)
app.use(MotionPlugin)
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)

app.mount('#app')
AOS.init()
