<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Help & Support" />

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Contact Options -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-6 !mb-6">
        <h2 class="!text-xl !font-bold !mb-6">How can we help you?</h2>

        <div class="!grid !grid-cols-1 md:!grid-cols-3 !gap-4 !mb-8">
          <button
            class="!bg-primary-50 !border !border-primary-100 !rounded-lg !p-4 !flex !flex-col !items-center hover:!bg-primary-100 !transition-colors"
            @click="handleWhatsAppSupport"
          >
            <MessageCircleIcon class="!w-10 !h-10 !text-primary-500 !mb-3" />
            <h3 class="!font-medium">WhatsApp Support</h3>
            <p class="!text-sm !text-gray-600 !mt-1">Chat with our team</p>
          </button>

          <a
            href="tel:+2348123456789"
            class="!bg-blue-50 !border !border-blue-100 !rounded-lg !p-4 !flex !flex-col !items-center hover:!bg-blue-100 !transition-colors"
          >
            <PhoneIcon class="!w-10 !h-10 !text-blue-500 !mb-3" />
            <h3 class="!font-medium">Call Us</h3>
            <p class="!text-sm !text-gray-600 !mt-1">+234 812 345 6789</p>
          </a>

          <a
            href="mailto:support@ikokuonline.com"
            class="!bg-amber-50 !border !border-amber-100 !rounded-lg !p-4 !flex !flex-col !items-center hover:!bg-amber-100 !transition-colors"
          >
            <MailIcon class="!w-10 !h-10 !text-amber-500 !mb-3" />
            <h3 class="!font-medium">Email Support</h3>
            <p class="!text-sm !text-gray-600 !mt-1">support@ikokuonline.com</p>
          </a>
        </div>

        <!-- FAQ Section -->
        <h3 class="!font-bold !text-lg !mb-4">Frequently Asked Questions</h3>
        <div class="!space-y-3">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="!border !rounded-lg !overflow-hidden"
          >
            <button
              class="!w-full !flex !justify-between !items-center !p-4 !text-left focus:!outline-none"
              @click="toggleQuestion(faq.id)"
            >
              <span class="!font-medium">{{ faq.question }}</span>
              <ChevronDownIcon
                class="!w-5 !h-5 !transition-transform"
                :class="{
                  'rotate-180': activeQuestion === faq.id
                }"
              />
            </button>

            <div v-if="activeQuestion === faq.id" class="!p-4 !pt-0 !border-t">
              <p class="!text-gray-700">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Final Support Callout -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-6">
        <h3 class="!font-bold !mb-4">Still need help?</h3>
        <p class="!text-gray-700 !mb-4">
          If you couldn't find the answer to your question, please contact our
          customer support team using any of the methods above. We're available
          Monday to Friday, 9:00 AM to 6:00 PM.
        </p>
        <button
          class="!w-full !py-3 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors !flex !items-center !justify-center"
          @click="handleWhatsAppSupport"
        >
          <MessageCircleIcon class="!w-5 !h-5 !mr-2" />
          Contact Support via WhatsApp
        </button>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ChevronDownIcon,
  PhoneIcon,
  MailIcon,
  MessageCircleIcon
} from 'lucide-vue-next'

import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'

const activeQuestion = ref(null)

const faqs = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer:
      'You can track your order by going to My Account > My Orders and selecting the order you want to track. You will see the current status of your order and tracking information once it has been shipped.'
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer:
      'We accept various payment methods including credit/debit cards, bank transfers, and payment on delivery for eligible items. You can view all available payment options during checkout.'
  },
  {
    id: '3',
    question: 'How do I return an item?',
    answer:
      'To return an item, go to My Account > My Orders, find the order containing the item you want to return, and click on "Return Item". Follow the instructions to complete your return request. Returns must be initiated within 7 days of delivery.'
  },
  {
    id: '4',
    question: 'Are the car parts original?',
    answer:
      'We offer both genuine OEM (Original Equipment Manufacturer) parts and high-quality aftermarket parts. The product description will clearly indicate whether a part is genuine OEM or aftermarket.'
  },
  {
    id: '5',
    question: 'How long does delivery take?',
    answer:
      'Delivery times vary depending on your location and the seller. Typically, delivery within Lagos takes 1-3 business days, while delivery to other states in Nigeria takes 3-7 business days. Exact delivery estimates are shown at checkout.'
  }
]

const toggleQuestion = (id) => {
  activeQuestion.value = activeQuestion.value === id ? null : id
}

const handleWhatsAppSupport = () => {
  window.open(
    'https://wa.me/2348123456789?text=I%20need%20help%20with%20my%20order%20on%20IkokuOnline',
    '_blank'
  )
}
</script>
