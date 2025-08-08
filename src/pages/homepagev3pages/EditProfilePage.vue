<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :showBackButton="true" title="Edit Profile" />

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="!flex !justify-center !items-center !py-20">
        <div class="!animate-spin !rounded-full !h-12 !w-12 !border-t-2 !border-b-2 !border-primary-500"></div>
      </div>

      <!-- Main Form -->
      <form v-else @submit.prevent="handleSubmit" class="!space-y-6">
        <!-- Avatar Upload -->
        <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !p-6 !text-center">
          <div class="!relative !inline-block">
            <img
              :src="formData.image"
              :alt="formData.name"
              class="!w-28 !h-28 !rounded-full !object-cover !mx-auto"
            />
            <label class="!absolute !bottom-0 !right-0 !bg-primary-500 !text-white !p-2 !rounded-full !cursor-pointer">
              <CameraIcon class="!w-5 !h-5" />
              <input type="file" accept="image/*" class="!hidden" @change="handleImageChange" />
            </label>
          </div>
          <p class="!mt-2 !text-sm !text-gray-500">
            Click the camera to change your profile picture
          </p>
        </div>

        <!-- Personal Info -->
        <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !p-6">
          <h2 class="!text-lg !font-bold !mb-4">Personal Information</h2>
          <div class="!space-y-4">
            <FormInput label="Full Name" name="name" v-model="formData.name" required />
            <FormInput label="Email Address" name="email" type="email" v-model="formData.email" required />
            <FormInput label="Phone Number" name="phone" type="tel" v-model="formData.phone" required />
            <FormTextarea
              label="Bio (Optional)"
              name="bio"
              v-model="formData.bio"
              placeholder="Tell others a bit about yourself"
              rows="3"
            />
          </div>
        </div>

        <!-- Address Info -->
        <div class="!bg-white !rounded-lg !shadow-sm !overflow-hidden !p-6">
          <h2 class="!text-lg !font-bold !mb-4">Address Information</h2>
          <div class="!space-y-4">
            <FormInput label="Street Address" name="address" v-model="formData.address" />
            <div class="!grid !grid-cols-2 !gap-4">
              <FormInput label="City" name="city" v-model="formData.city" />
              <FormSelect label="State" name="state" v-model="formData.state">
                <option disabled value="">Select State</option>
                <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
              </FormSelect>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="!flex !space-x-4">
          <button
            type="button"
            @click="navigateToProfile"
            class="!flex-1 !py-3 !border !border-gray-300 !rounded-md !font-medium !text-gray-700 hover:!bg-gray-50 !transition-colors"
          >
            <XIcon class="!w-5 !h-5 !mr-2" /> Cancel
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="!flex-1 !py-3 !bg-primary-500 !text-white !rounded-md !font-medium hover:!bg-primary-600 !transition-colors !flex !items-center !justify-center !relative"
          >
            <template v-if="isSaving">
              <div class="!flex !items-center">
                <div class="!animate-spin !rounded-full !h-5 !w-5 !border-2 !border-white !border-t-transparent !mr-2"></div>
                Saving...
              </div>
            </template>
            <template v-else>
              <SaveIcon class="!w-5 !h-5 !mr-2" />
              Save Changes
            </template>
            <div
              v-if="showSuccessMessage"
              class="!absolute !-top-12 !left-0 !right-0 !bg-green-500 !text-white !py-2 !px-3 !rounded-md !flex !items-center !justify-center !animate-slideUp"
            >
              <CheckIcon class="!w-4 !h-4 !mr-2" /> Profile updated successfully!
            </div>
          </button>
        </div>
      </form>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CameraIcon, SaveIcon, XIcon, CheckIcon } from 'lucide-vue-next'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'


// Reusable form components
const FormInput = {
  props: ['label', 'name', 'modelValue', 'type', 'required'],
  emits: ['update:modelValue'],
  template: `
    <div>
      <label :for="name" class="!block !text-sm !font-medium !text-gray-700 !mb-1">{{ label }}</label>
      <input
        :type="type || 'text'"
        class="!w-full !px-4 !py-2 !border !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
        :required="required"
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>`
}

const FormTextarea = {
  props: ['label', 'name', 'modelValue', 'rows', 'placeholder'],
  emits: ['update:modelValue'],
  template: `
    <div>
      <label :for="name" class="!block !text-sm !font-medium !text-gray-700 !mb-1">{{ label }}</label>
      <textarea
        :id="name"
        class="!w-full !px-4 !py-2 !border !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-primary-500"
        :rows="rows"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>`
}

const router = useRouter()
const isLoading = ref(true)
const isSaving = ref(false)
const showSuccessMessage = ref(false)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  image: '',
  address: '',
  city: '',
  state: '',
  bio: ''
})

onMounted(() => {
  setTimeout(() => {
    formData.value = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234 801 234 5678',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      address: '123 Main Street',
      city: 'Ikeja',
      state: 'Lagos',
      bio: 'Car enthusiast and collector of vintage car parts.'
    }
    isLoading.value = false
  }, 800)
})

function handleImageChange(e) {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => ev.target?.result && (formData.value.image = ev.target.result)
    reader.readAsDataURL(file)
  }
}

function handleSubmit() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    showSuccessMessage.value = true
    setTimeout(() => {
      router.push('/profile')
    }, 2000)
  }, 1500)
}

function navigateToProfile() {
  router.push('/profile')
}

const states = ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna']
</script>
