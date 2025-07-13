// import '@/assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/marketpro/css/bootstrap.min.css';
import '@/assets/marketpro/css/select2.min.css';
import '@/assets/marketpro/css/slick.css';
import '@/assets/marketpro/css/jquery-ui.css';
import '@/assets/marketpro/css/aos.css';
import '@/assets/marketpro/css/main.css';

//dashboard
import '@/assets/dp-market-dashboard/css/bootstrap.min.css';
import '@/assets/dp-market-dashboard/css/fontawesome-all.min.css';
import '@/assets/dp-market-dashboard/css/slick.css';
import '@/assets/dp-market-dashboard/css/magnific-popup.css';
import '@/assets/dp-market-dashboard/css/line-awesome.min.css';
import '@/assets/dp-market-dashboard/css/main.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.mount('#app');
