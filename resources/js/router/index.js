import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
import Test from '../pages/auth/Test.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/test', name: 'test', component: Test },
];

const base = import.meta.env.VITE_APP_BASE_URL || '/';

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;
