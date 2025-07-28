/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

import AOS from 'aos'
import 'aos/dist/aos.css'

// ApexCharts
import VueApexCharts from 'vue3-apexcharts'

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Tailwind + Fonts
import './assets/tailwind.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

// MarketPro Styles
import '@/assets/marketpro/css/bootstrap.min.css'
import '@/assets/marketpro/css/select2.min.css'
import '@/assets/marketpro/css/slick.css'
import '@/assets/marketpro/css/jquery-ui.css'
import '@/assets/marketpro/css/animate.css'
import '@/assets/marketpro/css/aos.css'
import '@/assets/marketpro/css/main.css'

// Dashboard Styles
import '@/assets/dp-market-dashboard/css/bootstrap.min.css'
import '@/assets/dp-market-dashboard/css/fontawesome-all.min.css'
import '@/assets/dp-market-dashboard/css/slick.css'
import '@/assets/dp-market-dashboard/css/magnific-popup.css'
import '@/assets/dp-market-dashboard/css/line-awesome.min.css'
import '@/assets/dp-market-dashboard/css/main.css'

// JS Libraries (Global Scripts)
import 'jquery'
import '@/assets/marketpro/js/jquery-3.7.1.min.js'
import '@/assets/marketpro/js/phosphor-icon.js'
import '@/assets/marketpro/js/select2.min.js'
import '@/assets/marketpro/js/slick.min.js'
import '@/assets/marketpro/js/count-down.js'
import '@/assets/marketpro/js/jquery-ui.js'
import '@/assets/marketpro/js/marque.min.js'
import '@/assets/marketpro/js/vanilla-tilt.min.js'
import '@/assets/marketpro/js/counter.min.js'
import '@/assets/marketpro/js/main.js'

// Create App
const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.use(VueApexCharts) 
app.component('apexchart', VueApexCharts) 

app.mount('#app')
AOS.init()
