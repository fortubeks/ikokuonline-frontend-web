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

// import HomePageLayout from '@/layouts/HomePageLayout.vue';

// import Home from '@/pages/webfront/HomeView.vue';
import ProductHome from '@/pages/products/ProductHome.vue';
import ContactUs from '@/pages/contact-us/ContactUs.vue';
// import CartPages from '@/pages/shop-pages/cart/CartPage.vue';
// import CheckoutPages from '@/pages/shop-pages/checkoutpage/CheckoutPage.vue';
// import ProductDetails from '@/pages/products/single-product-view/ProductDetail.vue';
import WishList from '@/pages/wishlists/WishList.vue';
import SellerDashboardLayout from '@/layouts/SellerDashboardLayout.vue';
import DashBoardHome from '@/pages/sellerdashboard/DashBoardHome.vue';
import SellerProfile from '@/pages/sellerdashboard/SellerProfile.vue';
import CarPart from '@/pages/sellerdashboard/listings/CarPart.vue';
import VehiclesList from '@/pages/sellerdashboard/listings/VehiclesList.vue';

import { useAuthStore } from '@/stores/auth';
import ShopLayout from '@/layouts/ShopLayout.vue';


import ProductDetail from '../pages/homepagev3pages/ProductDetail.vue'
import BecomeSellerPage from '../pages/homepagev3pages/BecomeSellerPage.vue'
import CartPage from '../pages/homepagev3pages/CartPage.vue'
import CheckoutPage from '../pages/homepagev3pages/CheckoutPage.vue'
import OrderConfirmationPage from '../pages/homepagev3pages/OrderConfirmationPage.vue'
import OrderHistoryPage from '../pages/homepagev3pages/OrderHistoryPage.vue'
import CategoryPage from '../pages/homepagev3pages/CategoryPage.vue'
import ProfilePage from '../pages/homepagev3pages/ProfilePage.vue'
import EditProfilePage from '../pages/homepagev3pages/EditProfilePage.vue'
import WishlistPage from '../pages/homepagev3pages/WishlistPage.vue'
import FeaturedDealsPage from '../pages/homepagev3pages/FeaturedDealsPage.vue'
import SellerProfilePage from '../pages/homepagev3pages/SellerProfilePage.vue'
import BrandsPage from '../pages/homepagev3pages/BrandsPage.vue'
import BrandProductsPage from '../pages/homepagev3pages/BrandsProductsPage.vue'
import PaymentMethodsPage from '../pages/homepagev3pages/PaymentMethodsPage.vue'
import AddressesPage from '../pages/homepagev3pages/AddressesPage.vue'
import NotificationsPage from '../pages/homepagev3pages/NotificationsPage.vue'
import SecurityPage from '../pages/homepagev3pages/SecurityPage.vue'
import SettingsPage from '../pages/homepagev3pages/SettingsPage.vue'
import HelpSupportPage from '../pages/homepagev3pages/HelpSupportPage.vue'
import HomePage from "../pages/homepagev3pages/HomePage.vue"



const routes = [

    { path: '', name: 'Home', component: HomePage },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/become-seller', name: 'BecomeSeller', component: BecomeSellerPage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/order-confirmation', name: 'OrderConfirmation', component: OrderConfirmationPage },
  { path: '/account/orders', name: 'OrderHistory', component: OrderHistoryPage },
  { path: '/category/:id', name: 'CategoryPage', component: CategoryPage },
  { path: '/categories', name: 'AllCategories', component: CategoryPage },
  { path: '/profilepage', name: 'Profile', component: ProfilePage },
  { path: '/edit-profile', name: 'EditProfile', component: EditProfilePage },
  { path: '/wishlist', name: 'Wishlist', component: WishlistPage },
  { path: '/featured', name: 'FeaturedDeals', component: FeaturedDealsPage },
  { path: '/seller/:id', name: 'SellerProfile', component: SellerProfilePage },
  { path: '/brands', name: 'Brands', component: BrandsPage },
  { path: '/brand/:id', name: 'BrandProducts', component: BrandProductsPage },
  { path: '/payment-methods', name: 'PaymentMethods', component: PaymentMethodsPage },
  { path: '/addresses', name: 'Addresses', component: AddressesPage },
  { path: '/notifications', name: 'Notifications', component: NotificationsPage },
  { path: '/security', name: 'Security', component: SecurityPage },
  { path: '/settings', name: 'Settings', component: SettingsPage },
  { path: '/help', name: 'HelpSupport', component: HelpSupportPage },

  // {
  //   path: '',
  //   component: HomePageLayout,
  //   children: [
  //     { path: '', name: 'home', component: Home },

  //   ],
  // },
  {
  path: '',
  component: ShopLayout,
  children: [
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
      meta: {
        title: 'Cart',
        current: 'Product Cart',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
        ],
      },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
      meta: {
        title: 'Checkout',
        current: 'Payment & Shipping',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
          { label: 'Cart', href: '/cart', icon: 'ph ph-shopping-cart' },
        ],
      },
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: ContactUs,
      meta: {
        title: 'Contact Us',
        current: 'Get in Touch',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
        ],
      },
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishList,
      meta: {
        title: 'Wishlist',
        current: 'Saved Products',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
        ],
      },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductHome,
      meta: {
        title: 'Products',
        current: 'Browse All Products',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
        ],
      },
    },
    {
      path: '/products/:id',
      name: 'single-product-view',
      component: ProductDetail,
      meta: {
        title: 'Product Details',
        current: 'View Product',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
          { label: 'Products', href: '/products', icon: 'ph ph-grid-four' },
        ],
      },
    },
    {
      path: '/product-categories/:category',
      name: 'product-category',
      component: ProductHome,
      meta: {
        title: 'Product Category',
        current: 'Browse Category',
        links: [
          { label: 'Home', href: '/', icon: 'ph ph-house' },
        ],
      },
    },
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
