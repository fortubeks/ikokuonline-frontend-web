import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
import Test from '../pages/auth/Test.vue';
import ForgotPassword from '../pages/auth/ForgotPassword.vue';
import ResetPassword from '../pages/auth/ResetPassword.vue';
import VerifyAccount from '../pages/auth/VerifyAccount.vue';

import DashboardLayout from '../layouts/DashboardLayout.vue';

import ProfileForm from '../pages/dashboard/profile/Form.vue';

import VehicleListings from '../pages/dashboard/vehicle-listings/VehicleListings.vue';
import VehicleListingsForm from '../pages/dashboard/vehicle-listings/Form.vue';

import Products from '../pages/dashboard/products/Products.vue';
import ProductsForm from '../pages/dashboard/products/Form.vue';

import ProductCategories from '../pages/dashboard/product-categories/ProductCategories.vue';
import ProductCategoriesForm from '../pages/dashboard/product-categories/Form.vue';

import Orders from '../pages/dashboard/orders/Orders.vue';
import OrderShow from '../pages/dashboard/orders/Show.vue';

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
            // Products
            { path: 'products', name: 'Products', component: Products },
            { path: 'products/create', name: 'ProductCreate', component: ProductsForm },
            { path: 'products/edit/:id', name: 'ProductEdit', component: ProductsForm, props: true },

            // Product Categories
            { path: 'product-categories', name: 'ProductCategories', component: ProductCategories },
            { path: 'product-categories/create', name: 'ProductCategoriesCreate', component: ProductCategoriesForm },
            { path: 'product-categories/edit/:id', name: 'ProductCategoriesEdit', component: ProductCategoriesForm, props: true },

            // Vehicle Listings
            { path: 'vehicle-listings', name: 'VehicleListings', component: VehicleListings },
            { path: 'vehicle-listings/create', name: 'VehicleListingCreate', component: VehicleListingsForm },
            { path: 'vehicle-listings/edit/:id', name: 'VehicleListingEdit', component: VehicleListingsForm, props: true },

            // Profile
            { path: 'profile', name: 'Profile', component: ProfileForm },

            // Orders
            { path: 'orders', name: 'Orders', component: Orders },
            { path: 'orders/:id', name: 'OrderShow', component: OrderShow, props: true },
        ],
    },
];

const base = import.meta.env.VITE_APP_BASE_URL || '/';

const router = createRouter({
    history: createWebHistory(base),
    routes,
});

export default router;