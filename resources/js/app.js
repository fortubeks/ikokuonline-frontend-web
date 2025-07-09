import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '/public/assets/marketpro/css/bootstrap.min.css';
import '/public/assets/marketpro/css/select2.min.css';
import '/public/assets/marketpro/css/slick.css';
import '/public/assets/marketpro/css/jquery-ui.css';
import '/public/assets/marketpro/css/aos.css';
import '/public/assets/marketpro/css/main.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.mount('#app');
