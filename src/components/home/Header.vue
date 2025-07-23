<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="bg-black">
    <div>
      <nav class="flex items-center py-[26.5px] px-[100px] justify-between gap-[32px]">
        <motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 0.5 } }"
        >
          <router-link to="/">
            <img :src="logoWhite" alt="Logo" class="w-[150px] h-[70px] object-contain" />
          </router-link>
        </motion>

      
        <motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }"
          class="hidden py-[18.5px] lg:block"
        >
          <ul class="flex items-center space-x-6">
            <li v-for="(item, index) in navItems" :key="item.label" class="relative">
              <!-- Dropdown Menu -->
              <template v-if="item.dropdown">
                <button
                  @click="toggleDropdown(index)"
                  class="text-base font-medium focus:outline-none"
                  :class="[
                    isDropdownOpen === index ||
                    item.children.some((child) => route.path === child.path)
                      ? 'text-[#22C55E]'
                      : 'text-white',
                    'hover:text-gray-300',
                  ]"
                >
                  {{ item.label }}
                </button>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-2"
                >
                  <ul
                    v-if="isDropdownOpen === index"
                    class="absolute left-0 mt-2 w-full rounded-md bg-white shadow-lg z-50"
                  >
                    <li v-for="child in item.children" :key="child.label" class="hover:bg-gray-100">
                      <router-link
                        :to="child.path"
                        class="block px-4 py-2 text-sm"
                        :class="[
                          route.path === child.path
                            ? 'text-[#22C55E] font-semibold'
                            : 'text-gray-700',
                        ]"
                        @click="isDropdownOpen = null"
                      >
                        {{ child.label }}
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </template>

              
              <template v-else>
                <router-link
                  :to="item.path"
                  class="text-base font-medium hover:text-gray-300"
                  :class="[route.path === item.path ? 'text-[#22C55E]' : 'text-white']"
                >
                  {{ item.label }}
                </router-link>
              </template>
            </li>
          </ul>
        </motion>

        
        <motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.4 } }"
        >
          <a
            href="javascript:void(0)"
            class="hidden sm:flex items-center gap-[15px] font-medium text-base text-white bg-[#FD603E] py-[22px] px-[24px] rounded transition"
          >
            <img :src="buttondot" alt="dot" />
            Become a seller
          </a>
        </motion>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
// import { useAppConfig } from '@/composables/useAppConfig';
import { useRoute } from 'vue-router'
import logoWhite from '@/assets/images/logo/ikokuonline_white_logo.png'
import buttondot from '@/assets/svgs/buttondot.svg'

const route = useRoute()
const isDropdownOpen = ref(null)

function toggleDropdown(index) {
  isDropdownOpen.value = isDropdownOpen.value === index ? null : index
}

const navItems = [
  { label: 'Tyres', path: '/tyres' },
  { label: 'Batteries', path: '/batteries' },
  { label: 'Fluids', path: '/fluids' },
  { label: 'Audio and DnD', path: '/audio' },
  { label: 'Accessories', path: '/accessories' },
  {
    label: 'Replacement Parts',
    dropdown: true,
    children: [
      { label: 'Engine Parts', path: '/replacement/engine' },
      { label: 'Suspension', path: '/replacement/suspension' },
      { label: 'Brakes', path: '/replacement/brakes' },
    ],
  },
  { label: 'Vehicles', path: '/vehicles' },
]
</script>
