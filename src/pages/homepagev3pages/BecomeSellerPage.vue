<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Become a Seller" />

    <div class="!container !mx-auto !px-4 !py-6">
      <div class="!bg-white !rounded-lg !shadow-sm !p-6 !max-w-3xl !mx-auto">
        <!-- Title -->
        <h1 class="!text-2xl !font-bold !text-center !mb-6">Join IkokuOnline as a Seller</h1>

        <!-- Progress Steps -->
        <div class="!flex !justify-between !items-center !mb-8">
          <template v-for="num in [1, 2, 3]" :key="num">
            <div class="!flex !flex-col !items-center">
              <div
                :class="[
                  '!w-8 !h-8 !rounded-full !flex !items-center !justify-center',
                  step >= num ? '!bg-primary-500 !text-white' : '!bg-gray-200',
                ]"
              >
                {{ num }}
              </div>
              <span class="!text-xs !mt-1">
                {{ num === 1 ? 'Information' : num === 2 ? 'Business' : 'Confirmation' }}
              </span>
            </div>
            <div v-if="num < 3" class="!flex-1 !h-1 !mx-2 !bg-gray-200">
              <div
                class="!h-full"
                :class="step > num ? '!bg-primary-500' : '!bg-gray-200'"
                :style="{ width: step > num ? '100%' : '0' }"
              ></div>
            </div>
          </template>
        </div>

        <!-- Step 1: Personal Information -->
        <form v-if="step === 1" @submit.prevent="nextStep">
          <h2 class="!text-xl !font-semibold !mb-4">Personal Information</h2>
          <FormField label="Full Name" name="fullName" v-model="formData.fullName" required />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            v-model="formData.email"
            required
          />
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            v-model="formData.phone"
            required
          />
          <FormField label="Address" name="address" v-model="formData.address" required />
          <div class="!grid !grid-cols-2 !gap-4 !mb-6">
            <FormField label="City" name="city" v-model="formData.city" required />
            <SelectField
              label="State"
              name="state"
              v-model="formData.state"
              :options="states"
              required
            />
          </div>
          <div class="!flex !justify-end">
            <button
              type="submit"
              class="!px-6 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600"
            >
              Next
            </button>
          </div>
        </form>

        <!-- Step 2: Business Information -->
        <form v-else-if="step === 2" @submit.prevent="nextStep">
          <h2 class="!text-xl !font-semibold !mb-4">Business Information</h2>
          <FormField
            label="Business Name"
            name="businessName"
            v-model="formData.businessName"
            required
          />
          <SelectField
            label="Business Type"
            name="businessType"
            v-model="formData.businessType"
            :options="businessTypes"
            required
          />
          <TextAreaField
            label="Business Description"
            name="description"
            v-model="formData.description"
            rows="4"
            required
          >
            Tell potential customers about your business and what you sell.
          </TextAreaField>
          <CheckboxField name="agreeTerms" v-model="formData.agreeTerms" required>
            I agree to the
            <RouterLink to="/terms" class="!text-primary-500 hover:!underline"
              >Terms of Service</RouterLink
            >
            and
            <RouterLink to="/privacy" class="!text-primary-500 hover:!underline"
              >Privacy Policy</RouterLink
            >
          </CheckboxField>
          <div class="!flex !justify-between">
            <button
              type="button"
              @click="prevStep"
              class="!px-6 !py-2 !border !border-gray-300 !rounded-md hover:!bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              class="!px-6 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600"
              :disabled="!formData.agreeTerms"
            >
              Next
            </button>
          </div>
        </form>

        <!-- Step 3: Confirmation -->
        <div v-else>
          <div class="!text-center !mb-6">
            <div
              class="!inline-flex !items-center !justify-center !w-16 !h-16 !bg-green-100 !rounded-full"
            >
              <CheckCircleIcon class="!w-8 !h-8 !text-green-500" />
            </div>
            <h2 class="!text-xl !font-semibold !mt-4">Almost Done!</h2>
            <p class="!text-gray-600 !mt-2">Please review your information before submitting</p>
          </div>
          <ReviewSection :data="formData" />
          <div class="!flex !justify-between">
            <button
              type="button"
              @click="prevStep"
              class="!px-6 !py-2 !border !border-gray-300 !rounded-md hover:!bg-gray-50"
            >
              Back
            </button>
            <button
              @click="handleSubmit"
              class="!px-6 !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircleIcon } from 'lucide-vue-next'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'

const states = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Enugu']
const businessTypes = ['Retailer', 'Wholesaler', 'Manufacturer', 'Importer', 'Individual Seller']

const step = ref(1)
const formData = ref({
  businessName: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  businessType: '',
  description: '',
  agreeTerms: false,
})

const nextStep = () => {
  step.value += 1
  window.scrollTo(0, 0)
}
const prevStep = () => {
  step.value -= 1
  window.scrollTo(0, 0)
}
const handleSubmit = () => {
  alert('Form submitted successfully!')
}
</script>
