<template>
  <footer class="footer py-80 overflow-hidden">
    <div class="container container-lg">
      <div class="footer-item-two-wrapper d-flex align-items-start flex-wrap">

        <!-- Logo + Contact -->
        <div class="footer-item max-w-275" data-aos="fade-up" data-aos-duration="200">
          <div class="footer-item__logo">
            <a href="/"> <img src="@/assets/images/logo/ikokuonline_logo.png" alt="logo" /></a>
          </div>
          <p class="mb-24">
            Marketpro become the largest computer parts, gaming pc parts, and other IT related products.
          </p>
          <div class="flex-align gap-16 mb-16">
            <span class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
              <i class="ph-fill ph-phone-call"></i>
            </span>
            <a href="tel:+00123456789" class="text-md text-gray-900 hover-text-main-600">+00 123 456 789</a>
          </div>
          <div class="flex-align gap-16 mb-16">
            <span class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
              <i class="ph-fill ph-envelope"></i>
            </span>
            <a href="mailto:support24@marketpro.com" class="text-md text-gray-900 hover-text-main-600">support24@marketpro.com</a>
          </div>
          <div class="flex-align gap-16 mb-16">
            <span class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0">
              <i class="ph-fill ph-map-pin"></i>
            </span>
            <span class="text-md text-gray-900">789 Inner Lane, California, USA</span>
          </div>
        </div>

        
        <div class="footer-item" data-aos="fade-up" data-aos-duration="400">
          <h6 class="footer-item__title">About us</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in aboutLinks" :key="i" class="mb-16">
              <a href="/product" class="text-gray-600 hover-text-main-600">{{ item }}</a>
            </li>
          </ul>
        </div>

      
        <div class="footer-item" data-aos="fade-up" data-aos-duration="600">
          <h6 class="footer-item__title">Customer Support</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in supportLinks" :key="i" class="mb-16">
              <a :href="item.href" class="text-gray-600 hover-text-main-600">{{ item.text }}</a>
            </li>
          </ul>
        </div>

        
        <div class="footer-item" data-aos="fade-up" data-aos-duration="800">
          <h6 class="footer-item__title">My Account</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in accountLinks" :key="i" class="mb-16">
              <a href="/shop" class="text-gray-600 hover-text-main-600">{{ item }}</a>
            </li>
          </ul>
        </div>

      
        <div class="footer-item" data-aos="fade-up" data-aos-duration="1000">
          <h6 class="footer-item__title">Information</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in infoLinks" :key="i" class="mb-16">
              <a href="/shop" class="text-gray-600 hover-text-main-600">{{ item }}</a>
            </li>
          </ul>
        </div>

        
        <div class="footer-item" data-aos="fade-up" data-aos-duration="1200">
          <h6>Shop on The Go</h6>
          <p class="mb-16">Marketpro App is available. Get it now</p>
          <div class="flex-align gap-8 my-32">
            <a href="https://www.apple.com/store">
              <img src="@/assets/images/thumbs/store-img1.png" alt="App Store" />
            </a>
            <a href="https://play.google.com/store/apps?hl=en">
              <img src="@/assets/images/thumbs/store-img2.png" alt="Google Play" />
            </a>
          </div>
          <ul class="flex-align gap-16">
            <li v-for="(social, i) in socialLinks" :key="i">
              <a :href="social.href" class="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white">
                <i :class="social.icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <div class="bottom-footer bg-color-three py-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
        <p class="bottom-footer__text wow fadeInLeftBig">
          Marketpro eCommerce &copy; 2024. All Rights Reserved
        </p>
        <div class="flex-align gap-8 flex-wrap wow fadeInRightBig">
          <span class="text-heading text-sm">We Are Accepting</span>
          <img src="@/assets/images/thumbs/payment-method.png" alt="payments" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterFull',
  data() {
    return {
      aboutLinks: [
        'Company Profile', 'All Retail Store', 'Merchant Center', 'Affiliate',
        'Contact Us', 'Feedback', 'Huawei Group', 'Rules & Policy'
      ],
      supportLinks: [
        { text: 'Help Center', href: '/' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'Gift Card', href: '/' },
        { text: 'Report Abuse', href: '/' },
        { text: 'Submit and Dispute', href: '/p' },
        { text: 'Policies & Rules', href: '/' },
        { text: 'Online Shopping', href: '/' },
        { text: 'Redeem Voucher', href: '/' },
      ],
      accountLinks: [
        'My Account', 'Order History', 'Shoping Cart', 'Compare',
        'Help Ticket', 'Wishlist', 'Order History', 'Product Support'
      ],
      infoLinks: [
        'Become a Vendor', 'Affiliate Program', 'Privacy Policy', 'Our Suppliers',
        'Extended Plan', 'Extended Plan', 'Community', 'Community'
      ],
      socialLinks: [
        { href: 'https://www.facebook.com', icon: 'ph-fill ph-facebook-logo' },
        { href: 'https://www.twitter.com', icon: 'ph-fill ph-twitter-logo' },
        { href: 'https://www.linkedin.com', icon: 'ph-fill ph-instagram-logo' },
        { href: 'https://www.pinterest.com', icon: 'ph-fill ph-linkedin-logo' }
      ]
    };
  },
  mounted() {
    if (window.AOS) window.AOS.init();
  }
};
</script>

<style scoped>
.footer-item {
  max-width: 220px;
}
</style>
