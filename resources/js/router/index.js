import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
import Test from '../pages/auth/Test.vue';
import ForgotPassword from '../pages/auth/ForgotPassword.vue';
import ResetPassword from '../pages/auth/ResetPassword.vue';
import VerifyAccount from '../pages/auth/VerifyAccount.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import Refund from '../pages/dashboard/Refund.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword },
    { path: '/reset-password/:token', name: 'reset-password', component: ResetPassword, props: true },
    { path: '/verify-account/:id', name: 'verify-account', component: VerifyAccount, props: true },
    { path: '/test', name: 'test', component: Test },
    {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: 'refund',
                name: 'Refund',
                component: Refund,
            },
        ],
    },
];

const base = import.meta.env.VITE_APP_BASE_URL || '/';

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;

