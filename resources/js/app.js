import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '/public/assets/css/bootstrap.min.css';
import '/public/assets/css/select2.min.css';
import '/public/assets/css/slick.css';
import '/public/assets/css/jquery-ui.css';
import '/public/assets/css/aos.css';
import '/public/assets/css/main.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.mount('#app');
