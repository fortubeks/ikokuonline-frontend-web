<template>
  <footer class="footer py-80 bg-[#000000] overflow-hidden">
    <div class="container container-lg">
      <div
        class="footer-item-two-wrapper d-flex lg:!gap-[120px] !gap-8 align-items-start flex-wrap"
      >
        <div class="footer-item !max-w-[407px]" data-aos="fade-up" data-aos-duration="200">
          <div class="footer-item__logo">
            <a href="/"> <img src="@/assets/svgs/ikokuonline.svg" alt="logo" /></a>
          </div>
          <p class="mb-24 flex flex-col font-sora text-white gap-3">
            Ikokuonline.com is the No.1 online shop for your car batteries, tyres, car parts and
            accessories in Nigeria.
            <span>
              We aim to deliver the best competitive price while assuring you of genuine brands,
              best quality products, excellent customer service and fast delivery nationwide.</span
            >
          </p>
        </div>

        <div class="footer-item" data-aos="fade-up" data-aos-duration="1000">
          <h6 class="footer-item__title text-white">Information</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in infoLinks" :key="i" class="mb-16">
              <a href="/products" class="text-white hover-text-main-600">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-item" data-aos="fade-up" data-aos-duration="400">
          <h6 class="footer-item__title text-white">Products</h6>
          <ul class="footer-menu">
            <li v-for="(item, i) in aboutLinks" :key="i" class="mb-16">
              <a href="/products" class="text-white hover-text-main-600">{{ item }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-item" data-aos="fade-up" data-aos-duration="1200">
          <div class="flex-align gap-16 mb-16">
            <span
              class="h-32 w-32 flex-center rounded-circle border border-[#FD603E] text-main-two-600 text-md flex-shrink-0"
            >
              <i class="ph-fill ph-phone-call text-[#FD603E]"></i>
            </span>
            <a href="tel:+00123456789" class="text-md text-white hover-text-main-600"
              >+00 123 456 789</a
            >
          </div>
          <div class="flex-align gap-16 mb-16">
            <span
              class="w-32 h-32 flex-center rounded-circle border border-[#FD603E] text-main-two-600 text-md flex-shrink-0"
            >
              <i class="ph-fill ph-envelope text-[#FD603E]"></i>
            </span>
            <a
              href="mailto:support24@marketpro.com"
              class="text-md whitespace-nowrap text-white hover-text-main-600"
              >support24@marketpro.com</a
            >
          </div>
          <div class="flex-align gap-16 mb-16">
            <span
              class="w-32 h-32 flex-center rounded-circle border border-[#FD603E] text-main-two-600 text-md flex-shrink-0"
            >
              <i class="ph-fill ph-map-pin text-[#FD603E]"></i>
            </span>
            <span class="text-md text-white whitespace-nowrap"
              >789 Inner Lane, California, USA</span
            >
          </div>

          <ul class="flex-align gap-16">
            <li v-for="(social, i) in socialLinks" :key="i">
              <a
                :href="social.href"
                class="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
              >
                <i :class="social.icon"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <div class="bottom-footer !bg-[#7D7D7D] py-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
        <p class="bottom-footer__text wow !text-[#FFFFFF] text-sm font-sora fadeInLeftBig">
          Ikokuonline © 2025. All Rights Reserved
        </p>
        <div class="flex-align gap-8 flex-wrap wow fadeInRightBig">
          <span class="text-heading text-[#FFFFFF] text-sm">We Are Accepting</span>
          <img src="@/assets/svgs/paymenticon.svg" alt="payments" />
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
        'Tyres',
        'Batteries',
        'Fluids and Lubricants',
        'Accessories',
        'Audio and DND',
        'Replacement parts',
      ],
      supportLinks: [
        { text: 'Help Center', href: '/' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'TYres', href: '/' },
        { text: 'Report Abuse', href: '/' },
        { text: 'Submit and Dispute', href: '/p' },
        { text: 'Policies & Rules', href: '/' },
        { text: 'Online Shopping', href: '/' },
        { text: 'Redeem Voucher', href: '/' },
      ],
      accountLinks: [
        'My Account',
        'Order History',
        'Shoping Cart',
        'Compare',
        'Help Ticket',
        'Wishlist',
        'Order History',
        'Product Support',
      ],
      infoLinks: [
        'My Account',
        'Become a Vendor',
        'Return Policy',
        'Wishlist',
        'Order History',
        'Product Support',
      ],
      socialLinks: [
        { href: 'https://www.facebook.com', icon: 'ph-fill ph-facebook-logo' },
        { href: 'https://www.twitter.com', icon: 'ph-fill ph-twitter-logo' },
        { href: 'https://www.linkedin.com', icon: 'ph-fill ph-instagram-logo' },
        { href: 'https://www.pinterest.com', icon: 'ph-fill ph-linkedin-logo' },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
  },
}
</script>

<style scoped>
.footer-item {
  max-width: 220px;
}
</style>
