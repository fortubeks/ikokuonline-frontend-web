<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :show-back-button="true" title="Security Settings" />

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Account Security Section -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-6 !mb-6">
        <div class="!flex !items-center !mb-4">
          <ShieldCheckIcon class="!w-6 !h-6 !text-primary-500 !mr-3" />
          <h2 class="!text-lg !font-bold">Account Security</h2>
        </div>
        <div class="!space-y-6">
          <!-- Two-Factor Authentication -->
          <div class="!flex !justify-between !items-center !py-3 !border-b">
            <div>
              <h3 class="!font-medium">Two-Factor Authentication</h3>
              <p class="!text-sm !text-gray-600 !mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <label class="!relative !inline-flex !items-center !cursor-pointer">
              <input type="checkbox" class="!sr-only peer" v-model="twoFactorEnabled" />
              <div
                class="!w-11 !h-6 !bg-gray-200 !rounded-full peer-peer-checked:bg-primary-500 !relative"
              >
                <span
                  class="!absolute !h-5 !w-5 !bg-white !rounded-full !left-[2px] !top-0.5 !transition-all peer-peer-checked:!translate-x-full"
                ></span>
              </div>
            </label>
          </div>
          <!-- Login Notifications -->
          <div class="!flex !justify-between !items-center !py-3 !border-b">
            <div>
              <h3 class="!font-medium">Login Notifications</h3>
              <p class="!text-sm !text-gray-600 !mt-1">
                Get notified when someone logs into your account
              </p>
            </div>
            <label class="!relative !inline-flex !items-center !cursor-pointer">
              <input type="checkbox" class="!sr-only peer" v-model="loginNotifications" />
              <div
                class="!w-11 !h-6 !bg-gray-200 !rounded-full peer-peer-checked:bg-primary-500 !relative"
              >
                <span
                  class="!absolute !h-5 !w-5 !bg-white !rounded-full !left-[2px] !top-0.5 !transition-all peer-peer-checked:!translate-x-full"
                ></span>
              </div>
            </label>
          </div>
          <!-- Recent Login Activity -->
          <div class="!py-3">
            <h3 class="!font-medium !mb-3">Recent Login Activity</h3>
            <div class="!space-y-3">
              <div class="!flex !justify-between !items-center !text-sm">
                <div>
                  <p class="!font-medium">Lagos, Nigeria</p>
                  <p class="!text-gray-600">Chrome on Windows • Today at 10:45 AM</p>
                </div>
                <span class="!bg-green-100 !text-green-800 !px-2 !py-1 !rounded !text-xs"
                  >Current</span
                >
              </div>
              <div class="!flex !justify-between !items-center !text-sm">
                <div>
                  <p class="!font-medium">Abuja, Nigeria</p>
                  <p class="!text-gray-600">Safari on iPhone • Yesterday at 3:20 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password Section -->
      <div class="!bg-white !rounded-lg !shadow-sm !p-6">
        <div class="!flex !items-center !mb-4">
          <LockIcon class="!w-6 !h-6 !text-primary-500 !mr-3" />
          <h2 class="!text-lg !font-bold">Change Password</h2>
        </div>
        <form @submit.prevent="handleChangePassword">
          <div class="!space-y-4">
            <!-- Current Password -->
            <div>
              <label class="!block !text-sm !font-medium !text-gray-700 !mb-1"
                >Current Password</label
              >
              <div class="!relative">
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  name="currentPassword"
                  v-model="passwordForm.currentPassword"
                  class="!w-full !px-4 !py-2 !border !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-primary-500"
                  required
                />
                <button
                  type="button"
                  class="!absolute !inset-y-0 !right-0 !px-3 !flex !items-center"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <component
                    :is="showCurrentPassword ? EyeOffIcon : EyeIcon"
                    class="!w-5 !h-5 !text-gray-400"
                  />
                </button>
              </div>
            </div>
            <!-- New Password -->
            <div>
              <label class="!block !text-sm !font-medium !text-gray-700 !mb-1">New Password</label>
              <div class="!relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  name="newPassword"
                  v-model="passwordForm.newPassword"
                  class="!w-full !px-4 !py-2 !border !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-primary-500"
                  required
                />
                <button
                  type="button"
                  class="!absolute !inset-y-0 !right-0 !px-3 !flex !items-center"
                  @click="showNewPassword = !showNewPassword"
                >
                  <component
                    :is="showNewPassword ? EyeOffIcon : EyeIcon"
                    class="!w-5 !h-5 !text-gray-400"
                  />
                </button>
              </div>
              <p class="!text-xs !text-gray-500 !mt-1">
                Password must be at least 8 characters with a mix of letters, numbers, and symbols.
              </p>
            </div>
            <!-- Confirm Password -->
            <div>
              <label class="!block !text-sm !font-medium !text-gray-700 !mb-1"
                >Confirm New Password</label
              >
              <div class="!relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  name="confirmPassword"
                  v-model="passwordForm.confirmPassword"
                  class="!w-full !px-4 !py-2 !border !rounded-md focus:!outline-none focus:!ring-2 focus:!ring-primary-500"
                  required
                />
                <button
                  type="button"
                  class="!absolute !inset-y-0 !right-0 !px-3 !flex !items-center"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <component
                    :is="showConfirmPassword ? EyeOffIcon : EyeIcon"
                    class="!w-5 !h-5 !text-gray-400"
                  />
                </button>
              </div>
            </div>
            <!-- Submit Button -->
            <button
              type="submit"
              class="!w-full !py-2 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 !transition-colors !mt-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import { ShieldCheckIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const twoFactorEnabled = ref(false)
const loginNotifications = ref(true)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const handleChangePassword = () => {
  alert('Password changed successfully!')
  passwordForm.value.currentPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
}
</script>
