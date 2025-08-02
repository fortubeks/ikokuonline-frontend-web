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
import TyresPage from '../pages/products/product-pages/TirePage.vue';
import BatteriesPage from '../pages/products/product-pages/BatteryPage.vue';
import FluidsPage from '../pages/products/product-pages/FluidsPage.vue';
import AudioPage from '../pages/products/product-pages/AudioPage.vue';
import AccessoriesPage from '../pages/products/product-pages/AccessoryPage.vue';
import VehiclesPage from '../pages/products/product-pages/VehiclePage.vue';

import EnginePartsPage from '../pages/products/product-pages/EnginePartsPage.vue';
import SuspensionPage from '../pages/products/product-pages/SuspensionPage.vue';
import BrakesPage from '../pages/products/product-pages/BrakesPage.vue';

// import Home from '@/pages/webfront/Home.vue';

import Home from '@/pages/webfront/HomeView.vue';
import ProductHome from '@/pages/products/products-list/ProductHome.vue';
import ContactUs from '@/pages/contact-us/ContactUs.vue';
import CartPage from '@/pages/shop-pages/cart/CartPage.vue';
import CheckoutPage from '@/pages/shop-pages/checkoutpage/CheckoutPage.vue';
import ProductDetail from '@/pages/products/single-product-view/ProductDetail.vue';
import WishList from '@/pages/wishlists/WishList.vue';
import SellerDashboardLayout from '@/layouts/SellerDashboardLayout.vue';
import DashBoardHome from '@/pages/sellerdashboard/DashBoardHome.vue';
import SellerProfile from '@/pages/sellerdashboard/SellerProfile.vue';
import CarPart from '@/pages/sellerdashboard/listings/CarPart.vue';
import VehiclesList from '@/pages/sellerdashboard/listings/VehiclesList.vue';

import { useAuthStore } from '@/stores/auth';
import ShopLayout from '@/layouts/ShopLayout.vue';


const routes = [
  {
    path: '',
    component: HomePageLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'tyres', name: 'tyres', component: TyresPage },
      { path: 'batteries', name: 'batteries', component: BatteriesPage },
      { path: 'fluids', name: 'fluids', component: FluidsPage },
      { path: 'audio', name: 'audio', component: AudioPage },
      { path: 'accessories', name: 'accessories', component: AccessoriesPage },
      { path: 'vehicles', name: 'vehicles', component: VehiclesPage },
      {
        path: 'replacement',
        children: [
          { path: 'engine', name: 'engine-parts', component: EnginePartsPage },
          { path: 'suspension', name: 'suspension', component: SuspensionPage },
          { path: 'brakes', name: 'brakes', component: BrakesPage },
        ],
      },
    ],
  },
  {
    path: '',
    component: ShopLayout,
    children: [
      { path: '/cart', name: 'cart', component: CartPage },
      { path: '/checkout', name: 'checkout', component: CheckoutPage },
      { path: '/contact-us', name: 'contact-us', component: ContactUs },
      { path: '/wishlist', name: 'wishlist', component: WishList },
      { path: '/products', name: 'products', component: ProductHome },
      { path: '/products/:id', name: 'single-product-view', component: ProductDetail },
    ],
  },


  { path: '/login', name: 'login', component: Login, meta: { guestOnly: true } },
  { path: '/register', name: 'register', component: Register, meta: { guestOnly: true } },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPassword, meta: { guestOnly: true } },
  { path: '/reset-password', name: 'reset-password', component: ResetPassword, props: true, meta: { guestOnly: true } },
  { path: '/verify-account', name: 'verify-account', component: VerifyAccount, props: true, meta: { guestOnly: true } },
  { path: '/test', name: 'test', component: Test },


  {
    path: '/seller-dashboard',
    component: SellerDashboardLayout,

    children: [
       {
      path: '',
      name: 'seller-dashboard',
      component: DashBoardHome,
    },
      { path: '/sellerprofile', name: 'seller-profile', component: SellerProfile },
      { path: '/listingscarparts', name: 'carpart', component: CarPart },
      { path: '/listingsvehicleslist', name: 'vehicle list', component: VehiclesList,  },


    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: Products,
      },
      { path: 'products', name: 'Products', component: Products },
      { path: 'products/create', name: 'ProductCreate', component: ProductsForm },
      { path: 'products/edit/:id', name: 'ProductEdit', component: ProductsForm, props: true },

      { path: 'product-categories', name: 'ProductCategories', component: ProductCategories },
      { path: 'product-categories/create', name: 'ProductCategoriesCreate', component: ProductCategoriesForm },
      { path: 'product-categories/edit/:id', name: 'ProductCategoriesEdit', component: ProductCategoriesForm, props: true },

      { path: 'vehicle-listings', name: 'VehicleListings', component: VehicleListings },
      { path: 'vehicle-listings/create', name: 'VehicleListingCreate', component: VehicleListingsForm },
      { path: 'vehicle-listings/edit/:id', name: 'VehicleListingEdit', component: VehicleListingsForm, props: true },

      { path: 'orders', name: 'Orders', component: Orders },
      { path: 'orders/:id', name: 'OrderShow', component: OrderShow, props: true },

      { path: 'profile', name: 'Profile', component: ProfileForm },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: async (to, from, next) => {
      const auth = useAuthStore();
      try {
        await auth.logout();
      } catch (error) {
        console.error('Logout failed', error);
      }
      next('/login');
    },
    meta: { requiresAuth: true }
  }
];


const base = import.meta.env.VITE_APP_BASE_URL || '/';

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
