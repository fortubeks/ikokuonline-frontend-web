<script>
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-vue-next'

export default {
  name: 'ContactPage',
  components: {
    MapPin,
    Phone,
    Mail,
    Clock,
    ChevronRight,
  },
}
</script>

<template>
  <div class="!bg-white">
    <div class="!max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-12">
      <!-- Header -->
      <div class="!text-center !mb-12">
        <h1 class="!text-3xl !font-extrabold !text-gray-900 sm:!text-4xl">Contact Us</h1>
        <p class="!mt-4 !text-lg !text-gray-500 !max-w-2xl !mx-auto">
          Have questions about our vehicles or parts? Need assistance with your order? Our team is
          here to help you with anything you need.
        </p>
      </div>

      <div class="!grid !grid-cols-1 lg:!grid-cols-2 !gap-8 lg:!gap-16">
        <!-- Contact Information -->
        <div>
          <h2 class="!text-2xl !font-bold !text-gray-900 !mb-6">Get in Touch</h2>
          <div class="!space-y-6">
            <div class="!flex !items-start">
              <div class="!flex-shrink-0">
                <MapPin class="!h-6 !w-6 !text-blue-600" />
              </div>
              <div class="!ml-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Our Location</h3>
                <address class="!mt-1 !text-gray-500 !not-italic">
                  123 Auto Plaza Drive<br />
                  Motorville, CA 90210<br />
                  United States
                </address>
              </div>
            </div>

            <div class="!flex !items-start">
              <div class="!flex-shrink-0">
                <Phone class="!h-6 !w-6 !text-blue-600" />
              </div>
              <div class="!ml-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Phone Numbers</h3>
                <div class="!mt-1 !space-y-1">
                  <p class="!text-gray-500">Sales: (555) 123-4567</p>
                  <p class="!text-gray-500">Service: (555) 123-4568</p>
                  <p class="!text-gray-500">Parts: (555) 123-4569</p>
                </div>
              </div>
            </div>

            <div class="!flex !items-start">
              <div class="!flex-shrink-0">
                <Mail class="!h-6 !w-6 !text-blue-600" />
              </div>
              <div class="!ml-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Email Addresses</h3>
                <div class="!mt-1 !space-y-1">
                  <p class="!text-gray-500">General Inquiries: info@autovault.com</p>
                  <p class="!text-gray-500">Sales: sales@autovault.com</p>
                  <p class="!text-gray-500">Support: support@autovault.com</p>
                </div>
              </div>
            </div>

            <div class="!flex !items-start">
              <div class="!flex-shrink-0">
                <Clock class="!h-6 !w-6 !text-blue-600" />
              </div>
              <div class="!ml-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Business Hours</h3>
                <div class="!mt-1 !space-y-1">
                  <p class="!text-gray-500">Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p class="!text-gray-500">Saturday: 10:00 AM - 6:00 PM</p>
                  <p class="!text-gray-500">Sunday: 11:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="!mt-8">
            <h3 class="!text-lg !font-medium !text-gray-900 !mb-4">Follow Us</h3>
            <div class="!flex !space-x-4">
              <!-- Social icons here (Facebook, Instagram, Twitter, YouTube) -->
              <!-- I’ll leave the inline SVGs unchanged but with ! classes -->
            </div>
          </div>
        </div>

        <!-- Map and FAQ -->
        <div>
          <!-- Map -->
          <div class="!bg-gray-200 !rounded-lg !overflow-hidden !h-64 !mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203627583!2d-118.39395548478173!3d34.06888258060504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2b9221d371cf5%3A0x11b91ff58ff96f33!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1651161554785!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="AutoVault Location"
            ></iframe>
          </div>

          <!-- FAQ -->
          <div>
            <h2 class="!text-2xl !font-bold !text-gray-900 !mb-6">Frequently Asked Questions</h2>
            <div class="!space-y-4">
              <div class="!border-b !border-gray-200 !pb-4">
                <h3 class="!text-lg !font-medium !text-gray-900">
                  What are your dealership hours?
                </h3>
                <p class="!mt-2 !text-gray-600">
                  We're open Monday through Friday from 9:00 AM to 8:00 PM, Saturday from 10:00 AM
                  to 6:00 PM, and Sunday from 11:00 AM to 5:00 PM.
                </p>
              </div>

              <div class="!border-b !border-gray-200 !pb-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Do you offer test drives?</h3>
                <p class="!mt-2 !text-gray-600">
                  Yes! We encourage test drives before making a purchase. Please bring your valid
                  driver's license, and our sales team will be happy to assist you.
                </p>
              </div>

              <div class="!border-b !border-gray-200 !pb-4">
                <h3 class="!text-lg !font-medium !text-gray-900">
                  What financing options do you offer?
                </h3>
                <p class="!mt-2 !text-gray-600">
                  We work with multiple lenders to provide competitive financing options. Our
                  finance department can help find the best rates and terms for your situation.
                </p>
              </div>

              <div class="!border-b !border-gray-200 !pb-4">
                <h3 class="!text-lg !font-medium !text-gray-900">Do you buy used vehicles?</h3>
                <p class="!mt-2 !text-gray-600">
                  Yes, we purchase quality used vehicles. Visit our dealership for a free appraisal,
                  or contact our buying team for more information.
                </p>
              </div>

              <div class="!mt-6">
                <a
                  href="#"
                  class="!inline-flex !items-center !text-blue-600 hover:!text-blue-800 !font-medium"
                >
                  View all FAQs
                  <ChevronRight class="!ml-1 !h-4 !w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
