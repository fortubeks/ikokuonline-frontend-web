// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

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

import HomePageLayout from '@/layouts/HomePageLayout.vue';

import Home from '@/pages/webfront/Home.vue';

const routes = [
  { path: '/',
    component: HomePageLayout,
    children: [
      { path: 'home', name: 'home', component: Home}
    ]
   },

  // Public pages
  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword, meta: { guestOnly: true } },
  { path: '/reset-password', name: 'reset-password', component: ResetPassword, props: true, meta: { guestOnly: true } },
  { path: '/verify-account', name: 'verify-account', component: VerifyAccount, props: true, meta: { guestOnly: true } },
  { path: '/test', name: 'test', component: Test },

  // Protected pages
  {
    path: '/dashboard',
    component: DashboardLayout,
    //meta: { requiresAuth: true },
    children: [
      { path: 'products', name: 'Products', component: Products },
      { path: 'products/create', name: 'ProductCreate', component: ProductsForm },
      { path: 'products/edit/:id', name: 'ProductEdit', component: ProductsForm, props: true },

      { path: 'product-categories', name: 'ProductCategories', component: ProductCategories },
      { path: 'product-categories/create', name: 'ProductCategoriesCreate', component: ProductCategoriesForm },
      { path: 'product-categories/edit/:id', name: 'ProductCategoriesEdit', component: ProductCategoriesForm, props: true },

      { path: 'vehicle-listings', name: 'VehicleListings', component: VehicleListings },
      { path: 'vehicle-listings/create', name: 'VehicleListingCreate', component: VehicleListingsForm },
      { path: 'vehicle-listings/edit/:id', name: 'VehicleListingEdit', component: VehicleListingsForm, props: true },

      { path: 'profile', name: 'Profile', component: ProfileForm },

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

// route guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'Products' }); // or any default authenticated route
  }

  next();
});

export default router;
