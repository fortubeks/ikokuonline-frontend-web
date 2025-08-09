<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="!bg-dark-900 !text-white !pt-12 !pb-6 !hidden md:!block">
    <div class="!container !mx-auto !px-4">
      <div class="!grid !grid-cols-1 md:!grid-cols-4 !gap-8">
        <!-- Brand Info -->
        <div>
          <a href="/" class="!inline-block !mb-4">
            <img src="/ikokuonline.svg" alt="IkokuOnline" />
          </a>
          <p class="!text-gray-400 !mb-4">
            Nigeria's #1 marketplace for car parts and tires. Find the best deals on automotive
            parts or sell your own.
          </p>
          <div class="!flex !space-x-4">
            <a href="#" class="!text-gray-400 hover:!text-primary-500 !transition-colors">
              <Facebook :size="20" />
            </a>
            <a href="#" class="!text-gray-400 hover:!text-primary-500 !transition-colors">
              <Instagram :size="20" />
            </a>
            <a href="#" class="!text-gray-400 hover:!text-primary-500 !transition-colors">
              <Twitter :size="20" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="!text-lg !font-bold text-white !mb-4">Quick Links</h3>
          <ul class="!space-y-2">
            <li><a href="/" class="link">Home</a></li>
            <li><a href="/about" class="link">About Us</a></li>
            <li><a href="/contact" class="link">Contact Us</a></li>
            <li><a href="/blog" class="link">Blog</a></li>
            <li><a href="/register" class="link">Become a Seller</a></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="!text-lg !font-bold text-white !mb-4">Categories</h3>
          <ul class="!space-y-2">
            <li><a href="/category/engines" class="link">Engines</a></li>
            <li><a href="/category/tires" class="link">Tires</a></li>
            <li><a href="/category/body-parts" class="link">Body Parts</a></li>
            <li><a href="/category/lights" class="link">Lights</a></li>
            <li><a href="/category/batteries" class="link">Batteries</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="!text-lg !font-bold text-white !mb-4">Contact</h3>
          <ul class="!space-y-4">
            <li class="!flex">
              <MapPin class="!w-5 !h-5 !mr-3 !text-primary-500" />
              <span class="!text-gray-400">123 Main Street, Lagos, Nigeria</span>
            </li>
            <li class="!flex">
              <PhoneCall class="!w-5 !h-5 !mr-3 !text-primary-500" />
              <span class="!text-gray-400">+234 123 456 7890</span>
            </li>
            <li class="!flex">
              <Mail class="!w-5 !h-5 !mr-3 !text-primary-500" />
              <span class="!text-gray-400">info@ikokuonline.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="!border-t !border-gray-800 !mt-8 !pt-6 !flex !flex-col md:!flex-row !justify-between"
      >
        <p class="!text-gray-400 !text-sm">
          &copy; {{ currentYear }} IkokuOnline. All rights reserved.
        </p>
        <div class="!mt-4 md:!mt-0">
          <a href="/terms" class="link !mr-4">Terms of Service</a>
          <a href="/privacy" class="link">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin } from 'lucide-vue-next'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.link {
  @apply !text-white hover:!text-primary-500 !transition-colors !text-sm;
}
</style>
