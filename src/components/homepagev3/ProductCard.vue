<template>
  <a
    :href="`/product/${slug}`"
    class="!block"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- List View -->
    <div
      v-if="view === 'list'"
      class="!bg-white !rounded-lg !overflow-hidden !mb-3 !flex hover:!shadow-md !transition-shadow !relative"
    >
      <div class="!relative !w-1/3">
        <img
          :src="image"
          :alt="name"
          class="!w-full !h-full !object-cover"
          style="height: 120px"
        />
        <div
          v-if="isVerified"
          class="!absolute !top-2 !left-2 !bg-white !px-2 !py-0.5 !rounded-md !flex !items-center"
        >
          <CheckCircleIcon class="!w-3 !h-3 !text-blue-500 !mr-1" />
          <span class="!text-xs !text-blue-500 !font-medium">Verified</span>
        </div>
        <div
          v-if="isFeatured"
          class="!absolute !top-2 !right-2 !bg-pink-100 !px-2 !py-0.5 !rounded-md"
        >
          <span class="!text-xs !text-pink-600 !font-medium">POPULAR</span>
        </div>
        <div
          v-if="discount"
          class="!absolute !bottom-2 !left-2 !bg-primary-500 !text-white !px-2 !py-0.5 !rounded-md"
        >
          <span class="!text-xs !font-bold">-{{ discount }}%</span>
        </div>
      </div>

      <div class="!p-3 !w-2/3 !relative">
        <div class="!flex !items-baseline">
          <div class="!font-bold !text-primary-500">
            {{ formattedDiscountedPrice || formattedPrice }}
          </div>
          <div v-if="discount" class="!ml-2 !text-sm !text-gray-400 !line-through">
            {{ formattedPrice }}
          </div>
        </div>
        <h3 class="!mt-1 !text-sm !font-medium line-clamp-2">{{ title }}</h3>
        <div class="!flex !items-center !mt-1 !text-xs !text-gray-500">
          <MapPinIcon class="!w-3 !h-3 !mr-1" />
          <span>{{ location }}</span>
          <span class="!mx-1">•</span>
          <span>{{ postedTime }}</span>
        </div>
        <div class="!flex !justify-between !items-center !mt-1">
          <span class="!text-xs !text-gray-500">{{ condition }}</span>
          <div v-if="rating" class="!flex !items-center">
            <StarIcon class="!w-3 !h-3 !text-yellow-400 fill-yellow-400" />
            <span class="!text-xs !ml-1">{{ rating }}</span>
          </div>
        </div>
        <button
          @click.stop.prevent="toggleSave"
          class="!absolute !top-3 !right-3 !transition-transform !transform hover:!scale-110"
        >
          <HeartIcon
            :class="[
              '!w-5 !h-5',
              isSaved ? '!fill-primary-500 !text-primary-500' : '!text-gray-400',
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <div
      v-else
      class="!relative !bg-white !rounded-lg !overflow-hidden hover:!shadow-md !transition-shadow"
    >
      <div class="!relative !pb-[75%]">
        <img
          :src="display_image_url"
          :alt="title"
          class="!absolute !inset-0 !w-full !h-full !object-cover !transition-transform !duration-300"
          :class="isHovered ? '!scale-105' : ''"
        />
        <div
          v-if="isVerified"
          class="!absolute !top-2 !left-2 !bg-white !px-2 !py-0.5 !rounded-md !flex !items-center"
        >
          <CheckCircleIcon class="!w-4 !h-4 !text-blue-500 !mr-1" />
          <span class="!text-xs !text-blue-500 !font-medium">Verified</span>
        </div>
        <div
          v-if="isFeatured"
          class="!absolute !top-2 !right-2 !bg-pink-100 !px-2 !py-0.5 !rounded-md"
        >
          <span class="!text-xs !text-pink-600 !font-medium">POPULAR</span>
        </div>
        <div
          v-if="discount"
          class="!absolute !bottom-2 !left-2 !bg-primary-500 !text-white !px-2 !py-0.5 !rounded-md"
        >
          <span class="!text-xs !font-bold">-{{ discount }}%</span>
        </div>
        <button
          @click.stop.prevent="toggleSave"
          class="!absolute !bottom-2 !right-2 !bg-white !rounded-full !p-1.5 !shadow !transition-transform !transform hover:!scale-110"
        >
          <HeartIcon
            :class="[
              '!w-5 !h-5',
              isSaved ? '!fill-primary-500 !text-primary-500' : '!text-gray-400',
            ]"
          />
        </button>
      </div>
      <div class="!p-3">
        <div class="!flex !items-baseline">
          <div class="!font-bold !text-primary-500">
            {{ formattedDiscountedPrice || formattedPrice }}
          </div>
          <div v-if="discount" class="!ml-2 !text-sm !text-gray-400 !line-through">
            {{ formattedPrice }}
          </div>
        </div>
        <h3 class="!mt-1 !text-sm !font-medium line-clamp-2">{{ name }}</h3>
        <div class="!flex !items-center !mt-1 !text-xs !text-gray-500">
          <MapPinIcon class="!w-3 !h-3 !mr-1" />
          <span>{{ location }}</span>
        </div>
        <div class="!flex !justify-between !items-center !mt-1">
          <span class="!text-xs !text-gray-500">{{ condition }}</span>
          <div class="!flex !items-center">
            <template v-if="rating">
              <StarIcon class="!w-3 !h-3 !text-yellow-400 fill-yellow-400" />
              <span class="!text-xs !ml-1 !mr-2">{{ rating }}</span>
            </template>
            <span class="!text-xs !text-gray-500">{{ postedTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CheckCircleIcon, MapPinIcon, HeartIcon, StarIcon } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'

const props = defineProps({
  id: String,
  slug: String,
  name: String,
  price: Number,
  location: String,
  display_image_url: String,
  isVerified: Boolean,
  isFeatured: Boolean,
  view: String,
  condition: String,
  postedTime: String,
  rating: Number,
  discount: Number,
})

const isSaved = ref(false)
const isHovered = ref(false)
const toast = useToast()

onMounted(() => {
  const saved = localStorage.getItem('wishlist')
  const list = saved ? JSON.parse(saved) : []
  isSaved.value = list.includes(props.id)
})

const toggleSave = () => {
  const saved = localStorage.getItem('wishlist')
  let list = saved ? JSON.parse(saved) : []
  if (isSaved.value) {
    list = list.filter((item) => item !== props.id)
  } else {
    list.push(props.id)
    toast.success('Added to wishlist', { timeout: 2000 })
  }
  localStorage.setItem('wishlist', JSON.stringify(list))
  isSaved.value = !isSaved.value
}

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(props.price)
    .replace('NGN', '₦')
})

const formattedDiscountedPrice = computed(() => {
  if (!props.discount) return null
  const discounted = props.price - (props.price * props.discount) / 100
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(discounted)
    .replace('NGN', '₦')
})
</script>
