<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <div class="!bg-white !p-4 !shadow !mb-4">
      <h1 class="!text-xl !font-bold">Settings</h1>
    </div>

    <div class="!container !mx-auto !px-4 !py-6">
      <!-- Regional Settings -->
      <div class="!bg-white !rounded-lg !shadow-sm !mb-6">
        <div class="!p-4 !border-b !flex !items-center">
          <Globe class="!w-5 !h-5 !text-primary-500 !mr-3" />
          <h2 class="!text-lg !font-medium">Regional Settings</h2>
        </div>
        <div class="!p-4 !space-y-4">
          <div>
            <label class="!block !text-sm !font-medium !text-gray-700 !mb-1">Language</label>
            <select
              v-model="settings.language"
              class="!w-full !px-4 !py-2 !border !rounded-md !focus:!ring-2 !focus:!ring-primary-500"
            >
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="yoruba">Yoruba</option>
              <option value="hausa">Hausa</option>
              <option value="igbo">Igbo</option>
            </select>
          </div>
          <div>
            <label class="!block !text-sm !font-medium !text-gray-700 !mb-1">Currency</label>
            <select
              v-model="settings.currency"
              class="!w-full !px-4 !py-2 !border !rounded-md !focus:!ring-2 !focus:!ring-primary-500"
            >
              <option value="ngn">Nigerian Naira (₦)</option>
              <option value="usd">US Dollar ($)</option>
              <option value="gbp">British Pound (£)</option>
              <option value="eur">Euro (€)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="!bg-white !rounded-lg !shadow-sm !mb-6">
        <div class="!p-4 !border-b !flex !items-center">
          <Sun class="!w-5 !h-5 !text-primary-500 !mr-3" />
          <h2 class="!text-lg !font-medium">Appearance</h2>
        </div>
        <div class="!p-4">
          <label class="!block !text-sm !font-medium !text-gray-700 !mb-2">Theme</label>
          <div class="!flex !space-x-4">
            <button :class="buttonClass('light')" @click="settings.theme = 'light'">
              <Sun class="!w-5 !h-5 !mr-2" /> Light
            </button>
            <button :class="buttonClass('dark')" @click="settings.theme = 'dark'">
              <Moon class="!w-5 !h-5 !mr-2" /> Dark
            </button>
            <button :class="buttonClass('system')" @click="settings.theme = 'system'">
              <Smartphone class="!w-5 !h-5 !mr-2" /> System
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="!bg-white !rounded-lg !shadow-sm">
        <div class="!p-4 !border-b !flex !items-center">
          <Bell class="!w-5 !h-5 !text-primary-500 !mr-3" />
          <h2 class="!text-lg !font-medium">Notifications</h2>
        </div>
        <div class="!p-4 !space-y-4">
          <div
            v-for="(desc, key) in notifications"
            :key="key"
            class="!flex !items-center !justify-between !py-2"
          >
            <div>
              <h3 class="!font-medium">{{ desc.title }}</h3>
              <p class="!text-sm !text-gray-500">{{ desc.subtitle }}</p>
            </div>
            <label class="!relative !inline-flex !items-center !cursor-pointer">
              <input
                type="checkbox"
                class="!sr-only peer"
                :checked="settings[key]"
                @change="settings[key] = !settings[key]"
              />
              <div
                class="!w-11 !h-6 !bg-gray-200 !rounded-full peer peer-checked:after:translate-x-full peer-checked:after:!border-white after:!content-[''] after:!absolute after:!top-0.5 after:!left-[2px] after:!bg-white after:!border-gray-300 after:!border after:!rounded-full after:!h-5 after:!w-5 after:!transition-all peer-checked:!bg-primary-500"
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="!bg-white !p-4 !text-center !fixed !bottom-0 !w-full !border-t">
      <p class="!text-xs !text-gray-400">Bottom Navigation Placeholder</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Globe, Bell, Moon, Sun, Smartphone } from 'lucide-vue-next'

const settings = ref({
  language: 'english',
  currency: 'ngn',
  theme: 'light',
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
})

const notifications = {
  pushNotifications: {
    title: 'Push Notifications',
    subtitle: 'Receive notifications on your device',
  },
  emailNotifications: {
    title: 'Email Notifications',
    subtitle: 'Receive order updates via email',
  },
  smsNotifications: {
    title: 'SMS Notifications',
    subtitle: 'Receive text messages for important updates',
  },
  marketingEmails: {
    title: 'Marketing Emails',
    subtitle: 'Receive promotional offers and updates',
  },
}

const buttonClass = (type) =>
  settings.value.theme === type
    ? '!flex-1 !py-3 !px-4 !border !rounded-md !flex !items-center !justify-center !bg-primary-50 !border-primary-500 !text-primary-500'
    : '!flex-1 !py-3 !px-4 !border !rounded-md !flex !items-center !justify-center !border-gray-300'
</script>

<style scoped>
/* All overrides handled inline using Tailwind's `!` */
</style>
