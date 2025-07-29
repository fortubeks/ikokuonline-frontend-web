<template>
  <footer class="footer py-120">
    <div class="container container-lg">
      <div class="footer-item-wrapper d-flex align-items-start text-black flex-wrap">
        <div class="footer-item" data-aos="fade-up" data-aos-duration="200">
          <div class="max-w-340">
            <div class="footer-item__logo">
              <a href="index.html">
                <img src="@/assets/images/logo/ikokuonline_logo.png" alt="" />
              </a>
            </div>
            <p class="mb-28 text-heading text-black">
              We're Grocery Shop, an innovative team of food supliers.
            </p>
            <div class="d-flex flex-column text-black gap-8">
              <p class="text-heading fw-medium">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
              <a
                href="mailto:support@example.com"
                class="text-heading text-black fw-medium hover-text-main-600"
                >support@example.com</a
              >
              <a
                href="tel:+(406)555-0120"
                class="text-heading text-black fw-medium hover-text-main-600"
                >+ (406) 555-0120</a
              >
            </div>
          </div>
        </div>

        <div
          v-for="(menu, index) in menus"
          :key="index"
          class="footer-item"
          :data-aos="'fade-up'"
          :data-aos-duration="400 + index * 200"
        >
          <h6 class="footer-item__title text-black">{{ menu.title }}</h6>
          <ul class="footer-menu">
            <li
              v-for="(item, idx) in menu.links"
              :key="idx"
              :class="{ 'mb-16': idx !== menu.links.length - 1 }"
            >
              <a :href="item.href" class="text-heading text-black hover-text-main-600">{{
                item.label
              }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-item" data-aos="fade-up" data-aos-duration="1200">
          <h6 class="">Shop on The Go</h6>
          <p class="mb-16">MarketPro App is available. Get it now</p>
          <div class="my-32">
            <div class="flex-align gap-8">
              <div class="bg-white rounded-10 p-1 box-shadow-5xl">
                <img src="@/assets/images/thumbs/qr-code.png" alt="QR Code" />
              </div>
              <div class="d-flex flex-column gap-16">
                <a
                  href="https://www.apple.com/app-store"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6"
                >
                  <i class="ph-fill ph-apple-logo"></i>
                  Google play
                </a>
                <a
                  href="https://www.apple.com/app-store"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6"
                >
                  <img src="@/assets/images/icon/google-play.svg" alt="Play Store" />
                  Google play
                </a>
              </div>
            </div>
            <div class="mt-24">
              <img src="@/assets/images/thumbs/method.png" alt="Method" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <div class="bottom-footer py-8">
    <div class="container container-lg">
      <div
        class="bottom-footer__inner flex-between flex-wrap gap-16 py-16 border-top border-neutral-50"
      >
        <p class="bottom-footer__text text-heading wow fadeInLeft fw-medium">
          Copyright &copy;
          <span class="text-success-600 fw-semibold">2025</span>
          Ui-drops All Rights Reserved
        </p>
        <div class="flex-align gap-8 flex-wrap wow fadeInRight">
          <ul class="flex-align gap-16">
            <li v-for="(icon, idx) in socials" :key="idx">
              <a
                :href="icon.href"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
              >
                <i :class="icon.class"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: 'Information',
          links: [
            { label: 'Become a Vendor', href: 'shop.html' },
            { label: 'Affiliate Program', href: 'shop.html' },
            { label: 'Privacy Policy', href: 'shop.html' },
            { label: 'Our Suppliers', href: 'shop.html' },
            { label: 'Extended Plan', href: 'shop.html' },
            { label: 'Community', href: 'shop.html' },
          ],
        },
        {
          title: 'Customer Support',
          links: [
            { label: 'Help Center', href: 'shop.html' },
            { label: 'Contact Us', href: 'contact.html' },
            { label: 'Report Abuse', href: 'shop.html' },
            { label: 'Submit and Dispute', href: 'shop.html' },
            { label: 'Policies & Rules', href: 'shop.html' },
            { label: 'Online Shopping', href: 'shop.html' },
          ],
        },
        {
          title: 'My Account',
          links: [
            { label: 'My Account', href: 'shop.html' },
            { label: 'Order History', href: 'shop.html' },
            { label: 'Shoping Cart', href: 'shop.html' },
            { label: 'Compare', href: 'shop.html' },
            { label: 'Help Ticket', href: 'shop.html' },
            { label: 'Wishlist', href: 'shop.html' },
          ],
        },
        {
          title: 'Daily Groceries',
          links: [
            { label: 'Dairy & Eggs', href: 'shop.html' },
            { label: 'Meat & Seafood', href: 'shop.html' },
            { label: 'Breakfast Food', href: 'shop.html' },
            { label: 'Household Supplies', href: 'shop.html' },
            { label: 'Bread & Bakery', href: 'shop.html' },
            { label: 'Pantry Staples', href: 'shop.html' },
          ],
        },
      ],
      socials: [
        { href: 'https://www.facebook.com', class: 'ph-fill ph-facebook-logo' },
        { href: 'https://www.twitter.com', class: 'ph-fill ph-twitter-logo' },
        { href: 'https://www.linkedin.com', class: 'ph-fill ph-instagram-logo' },
        { href: 'https://www.pinterest.com', class: 'ph-fill ph-linkedin-logo' },
      ],
    }
  },
  mounted() {
    if (window.AOS) window.AOS.init()
    if (window.WOW) new window.WOW().init()
  },
}
</script>

<style scoped></style>
