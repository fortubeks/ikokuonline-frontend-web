<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header :show-back-button="true" :title="product?.title ?? 'Product Detail'" />
    <div
      v-if="isLoading"
      class="!flex !flex-col !items-center !h-[calc(100vh_-_200px)] !justify-center"
    >
      <div
        class="!animate-spin !rounded-full !h-16 !w-16 !border-t-2 !border-b-2 !border-primary-500"
      ></div>
    </div>
    <div v-else-if="!product" class="!container !mx-auto !px-4 !py-12 !text-center">
      <h1 class="!text-2xl !font-bold !mb-4">Product Not Found</h1>
      <p class="!mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <RouterLink
        to="/"
        class="!px-6 !py-3 !bg-primary-500 !text-white !rounded-md hover:!bg-primary-600 transition-colors"
      >
        Return to Homepage
      </RouterLink>
    </div>
    <div v-else class="!md:container !md:mx-auto !md:px-4 !md:py-6">
      <!-- Breadcrumb Navbar (desktop only) -->
      <div class="hidden md:block !bg-white !border-b">
        <div class="!container !mx-auto !px-4 !py-2">
          <div class="!flex !items-center !text-sm">
            <RouterLink to="/" class="!text-gray-500 hover:!text-primary-500 transition-colors"
              >Home</RouterLink
            >
            <span class="!mx-2 !text-gray-400">/</span>
            <RouterLink
              :to="`/category/${categoryLowercase}`"
              class="!text-gray-500 hover:!text-primary-500 transition-colors"
              >{{ category }}</RouterLink
            >
            <span class="!mx-2 !text-gray-400">/</span>
            <span class="!text-gray-700 !truncate">{{ product.title }}</span>
          </div>
        </div>
      </div>

      <div class="md:flex !px-5 md:gap-6">
        <!-- Image Carousel -->
        <div class="md:w-1/2 py-2.5 rounded-xl">
          <div class="!relative !bg-black">
            <div class="!relative !md:rounded-lg overflow-hidden" style="padding-bottom: 75%">
              <img
                :src="product.images[currentImageIndex]"
                :alt="product.title"
                class="!absolute !inset-0 !w-full !h-full !object-contain"
              />
              <div
                class="!absolute !bottom-2 !left-1/2 !transform !-translate-x-1/2 !bg-black !bg-opacity-50 !px-2 !py-1 !rounded-full !text-white !text-xs"
              >
                {{ currentImageIndex + 1 }}/{{ product.images.length }}
              </div>
              <button
                @click="prevImage"
                class="!absolute !left-2 !top-1/2 !transform !-translate-y-1/2 !bg-white !bg-opacity-50 !rounded-full !p-1 hover:!bg-opacity-70 transition-all"
              >
                <ChevronLeftIcon class="!w-6 !h-6" />
              </button>
              <button
                @click="nextImage"
                class="!absolute !right-2 !top-1/2 !transform !-translate-y-1/2 !bg-white !bg-opacity-50 !rounded-full !p-1 hover:!bg-opacity-70 transition-all"
              >
                <ChevronRightIcon class="!w-6 !h-6" />
              </button>
              <div class="!absolute !top-3 !right-3 !flex !space-x-2">
                <button
                  @click="toggleWishlist"
                  class="!bg-white !rounded-full !p-2 hover:!bg-gray-100 transition-colors"
                >
                  <HeartIcon
                    class="!w-5 !h-5"
                    :class="isSaved ? 'fill-primary-500 text-primary-500' : ''"
                  />
                </button>
                <button
                  @click="handleShare"
                  class="!bg-white !rounded-full !p-2 hover:!bg-gray-100 transition-colors"
                >
                  <ShareIcon class="!w-5 !h-5" />
                </button>
              </div>
              <div
                class="!absolute !bottom-3 !left-3 !text-white !text-sm !bg-black !bg-opacity-50 !px-2 !py-1 !rounded-md"
              >
                Posted {{ product.postedTime }}
              </div>
              <div
                v-if="shareMessage"
                class="!absolute !top-16 !right-3 !bg-black !bg-opacity-70 !text-white !px-3 !py-2 !rounded-md !animate-fadeIn"
              >
                {{ shareMessage }}
              </div>
            </div>

            <div class="hidden md:flex !justify-center !mt-4 !space-x-2">
              <button
                v-for="(img, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                :class="[
                  '!w-16 !h-16 !border-2 !rounded !transition-all',
                  currentImageIndex === index ? '!border-primary-500' : '!border-transparent',
                ]"
              >
                <img
                  :src="img"
                  :alt="`Thumbnail ${index + 1}`"
                  class="!w-full !h-full !object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Product Details -->
        <div class="!md:w-1/2">
          <div class="!bg-white !p-4 !md:rounded-lg !mt-3 md:mt-0 !animate-fadeIn">
            <div class="!flex !items-center">
              <h1 class="!text-xl md:!text-2xl !font-bold !flex-1">{{ product.title }}</h1>
              <div class="!flex !items-center !bg-green-50 !text-green-600 !px-2 !py-1 !rounded-md">
                <StarIcon class="!w-4 !h-4 fill-yellow-400 text-yellow-400 !mr-1" />
                <span class="!font-bold">4.7</span>
                <span class="!text-xs !ml-1">(42 reviews)</span>
              </div>
            </div>
            <div class="!flex !items-center !mt-2 !text-sm !text-gray-500">
              <MapPinIcon class="!w-4 !h-4 !mr-1" />
              <span>{{ product.location }}</span>
              <span class="!mx-2">•</span>
              <span>ID: {{ product.id }}</span>
            </div>
            <div class="!mt-4">
              <div class="!flex !items-center">
                <div class="!text-3xl !font-bold !text-primary-500">
                  {{ formatPrice(product.price) }}
                </div>
                <div
                  v-if="product.negotiable"
                  class="!ml-3 !text-sm !text-green-600 !bg-green-50 !px-2 !py-1 !rounded"
                >
                  Negotiable
                </div>
              </div>
              <div class="!mt-1 !text-sm !text-gray-600 !flex !items-center">
                Market price: {{ formatPrice(product.marketPrice.min) }} ~
                {{ formatPrice(product.marketPrice.max) }}
                <span class="!inline-block !ml-2 !text-green-600">(Good deal)</span>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="!flex !items-center !space-x-4 !mt-4">
              <div>
                <label for="qty" class="!block !text-sm !text-gray-600 !mb-1">Quantity:</label>
                <div class="!flex !border !rounded-md">
                  <button
                    class="!px-3 !py-1 !border-r hover:!bg-gray-100 transition-colors"
                    @click="decrementQty"
                  >
                    -
                  </button>
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    v-model.number="quantity"
                    class="!w-12 !text-center !focus:outline-none"
                  />
                  <button
                    class="!px-3 !py-1 !border-l hover:!bg-gray-100 transition-colors"
                    @click="incrementQty"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="!flex-1">
                <button
                  class="!w-full !py-2 !bg-primary-500 !rounded-md !text-white !font-medium hover:!bg-primary-600 transition-colors !flex !items-center !justify-center !relative"
                  @click="addToCart"
                  :disabled="isAdding"
                >
                  <span v-if="isAdding" class="!flex !items-center">
                    <svg
                      class="!animate-spin !-ml-1 !mr-2 !h-4 !w-4 !text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="!opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="!opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                  <span v-else>Add to Cart</span>
                  <div
                    v-if="showCartMsg"
                    class="!absolute !-top-10 !left-0 !right-0 !bg-green-500 !text-white !py-2 !px-3 !rounded-md !flex !items-center !justify-center !animate-slideUp"
                  >
                    <CheckIcon class="!w-4 !h-4 !mr-1" /> Added to cart!
                  </div>
                </button>
              </div>
            </div>

            <!-- Seller Info & Interaction -->
            <div
              class="!grid !grid-cols-3 !gap-3 !mt-4 !pt-4 !border-t !text-center !text-xs !text-gray-600"
            >
              <div class="!flex !flex-col !items-center">
                <ShieldCheckIcon class="!w-5 !h-5 !text-green-500 !mb-1" />
                <span>Verified Seller</span>
              </div>
              <div class="!flex !flex-col !items-center">
                <TruckIcon class="!w-5 !h-5 !text-blue-500 !mb-1" />
                <span>Delivery Available</span>
              </div>
              <div class="!flex !flex-col !items-center">
                <CheckCircleIcon class="!w-5 !h-5 !text-amber-500 !mb-1" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>

          <!-- Seller Panel -->
          <div class="!mt-3 !bg-white !p-4 !md:rounded-lg !animate-fadeIn !animation-delay-200">
            <div class="!flex !items-center">
              <img
                :src="product.seller.image"
                :alt="product.seller.name"
                class="!w-12 !h-12 !rounded-full !object-cover"
              />
              <div class="!ml-3 !flex-1">
                <div class="!flex !items-center">
                  <h3 class="!font-medium">{{ product.seller.name }}</h3>
                  <div
                    v-if="product.seller.isVerified"
                    class="!ml-2 !flex !items-center !text-blue-500"
                  >
                    <CheckCircleIcon class="!w-4 !h-4 !mr-1" />
                    <span class="!text-xs">Verified ID</span>
                  </div>
                </div>
                <div class="!text-xs !text-gray-500 !mt-1">
                  <div>{{ product.seller.responseTime }}</div>
                  <div>{{ product.seller.memberSince }}</div>
                </div>
              </div>
              <RouterLink
                :to="`/seller/${product.seller.id}`"
                class="!text-primary-500 !text-sm hover:!underline"
              >
                View Profile
              </RouterLink>
            </div>

            <div class="!flex !space-x-3 !mt-4">
              <button
                class="!flex-1 !py-2 !border !border-primary-500 !rounded-md !text-primary-500 !font-medium hover:!bg-primary-50 transition-colors !flex !items-center !justify-center"
              >
                <MessageCircleIcon class="!w-4 !h-4 !mr-2" /> Start chat
              </button>
              <RouterLink
                :to="`/seller/${product.seller.id}`"
                class="!flex-1 !py-2 !bg-gray-100 !rounded-md !text-gray-700 !font-medium hover:!bg-gray-200 transition-colors !flex !items-center !justify-center"
              >
                View all ads
              </RouterLink>
            </div>
          </div>

          <!-- Product Details -->
          <div class="!mt-3 !bg-white !p-4 !md:rounded-lg !animate-fadeIn !animation-delay-300">
            <h2 class="!text-lg !font-bold !mb-3">Details</h2>
            <div class="!space-y-2">
              <div
                v-for="(detail, i) in product.details"
                :key="i"
                class="!flex !py-1 !border-b !border-gray-100"
              >
                <span class="!w-1/3 !text-gray-500">{{ detail.label }}:</span>
                <span class="!w-2/3 !font-medium">{{ detail.value }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="!mt-3 !bg-white !p-4 !md:rounded-lg !animate-fadeIn !animation-delay-400">
            <h2 class="!text-lg !font-bold !mb-3">Description</h2>
            <p class="!text-gray-800 !whitespace-pre-line">{{ product.description }}</p>
          </div>

          <!-- Similar Products -->
          <div class="!mt-6 !animate-fadeIn !animation-delay-500">
            <div class="!flex !justify-between !items-center !mb-4 !px-4 md:!px-0">
              <h2 class="!text-xl !font-bold">Similar Products</h2>
              <RouterLink
                :to="`/category/${categoryLowercase}`"
                class="!text-primary-500 !text-sm !font-medium hover:!underline"
                >View All</RouterLink
              >
            </div>
            <div class="!grid !grid-cols-2 md:!grid-cols-4 !gap-4 !px-4 md:!px-0">
              <div
                v-for="p in similarProducts"
                :key="p.id"
                class="!bg-white !rounded-lg overflow-hidden hover:!shadow-md transition-shadow"
              >
                <RouterLink :to="`/product/${p.id}`">
                  <div class="!relative !pb-[75%]">
                    <img
                      :src="p.image"
                      :alt="p.title"
                      class="!absolute !inset-0 !w-full !h-full !object-cover hover:!scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div class="!p-3">
                    <div class="!font-bold !text-primary-500">{{ formatPrice(p.price) }}</div>
                    <h3 class="!text-sm !font-medium !line-clamp-2">{{ p.title }}</h3>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Report & Safety Tips -->
          <div class="!mt-3 !bg-white !p-4 !md:rounded-lg !animate-fadeIn !animation-delay-600">
            <div class="!flex !items-center !justify-between">
              <button
                class="!py-2 !px-4 !border !rounded-md !text-gray-600 !text-sm hover:!bg-gray-50 transition-colors"
              >
                Mark unavailable
              </button>
              <button
                class="!py-2 !px-4 !border !rounded-md !text-red-500 !text-sm !flex !items-center hover:!bg-red-50 transition-colors"
              >
                <FlagIcon class="!w-4 !h-4 !mr-1" /> Report Abuse
              </button>
            </div>
          </div>

          <div
            class="!mt-3 !bg-white !p-4 !md:rounded-lg !mb-4 !animate-fadeIn !animation-delay-700"
          >
            <h2 class="!text-lg !font-bold !mb-3">Safety tips</h2>
            <ul class="!space-y-2">
              <li v-for="(tip, i) in product.safetyTips" :key="i" class="!flex !items-start">
                <AlertTriangleIcon class="!w-4 !h-4 !text-yellow-500 !mt-1 !mr-2" />
                <span class="!text-sm">{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import Header from '../../components/homepagev3/Header.vue'
import Footer from '../../components/homepagev3/Footer.vue'
import BottomNavigation from '../../components/homepagev3/BottomNavigation.vue'
import { useCart } from '../../components/homepagev3/CartProvider.js'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  MapPinIcon,
  CheckCircleIcon,
  MessageCircleIcon,
  AlertTriangleIcon,
  FlagIcon,
  HeartIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  CheckIcon,
} from 'lucide-vue-next'
import { products } from '../../components/utils/homepagev3utils/data'

const route = useRoute()
// const router = useRouter()
const cart = useCart()

const id = route.params.id
const product = ref(null)
const isLoading = ref(true)
const currentImageIndex = ref(0)
const isSaved = ref(false)
const quantity = ref(1)
const isAdding = ref(false)
const showCartMsg = ref(false)
const shareMessage = ref('')

const similarProducts = ref([])

onMounted(() => {
  window.scrollTo(0, 0)
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  isSaved.value = wishlist.includes(id)
  setTimeout(() => {
    const found = products.find((p) => p.id === id)
    if (!found) {
      product.value = null
      isLoading.value = false
      return
    }
    product.value = {
      ...found,
      images: [found.image /* Placeholder images... */],
      negotiable: true,
      marketPrice: { min: found.price * 0.95, max: found.price * 1.05 },
      seller: {
        id: 's' + Math.random().toString(36).substr(2, 5),
        name: found.sellerName || 'Auto Parts Seller',
        image: found.sellerImage || 'https://randomuser.me/api/portraits/men/32.jpg',
        isVerified: found.isVerified || false,
        responseTime: 'Typically replies within a few hours',
        memberSince: '1 year on IkokuOnline',
      },
      details: found.details || [],
      safetyTips: ['Avoid prepayments', 'Meet in public', 'Inspect item', 'Pay after receiving'],
      postedTime: found.postedTime || '3 days ago',
    }
    similarProducts.value = products
      .filter((p) => p.category === found.category && p.id !== id)
      .slice(0, 4)
    isLoading.value = false
  }, 800)
})

const nextImage = () => {
  const len = product.value.images.length
  currentImageIndex.value = (currentImageIndex.value + 1) % len
}
const prevImage = () => {
  const len = product.value.images.length
  currentImageIndex.value = (currentImageIndex.value - 1 + len) % len
}
const formatPrice = (val) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(val)

const toggleWishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  // eslint-disable-next-line no-const-assign
  if (isSaved.value) wishlist = wishlist.filter((i) => i !== id)
  else wishlist.push(id)
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
  isSaved.value = !isSaved.value
}

const handleShare = async () => {
  if (!product.value) return
  try {
    if (navigator.share) {
      await navigator.share({ title: product.value.title, url: window.location.href })
      shareMessage.value = 'Shared successfully!'
    } else {
      await navigator.clipboard.writeText(window.location.href)
      shareMessage.value = 'Link copied to clipboard!'
    }
  } catch {
    shareMessage.value = 'Could not share, try copying the URL manually.'
  }
  setTimeout(() => (shareMessage.value = ''), 2000)
}

const addToCart = () => {
  if (!product.value) return
  isAdding.value = true
  cart.addItem({
    id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.images[0],
    quantity: quantity.value,
  })
  setTimeout(() => {
    isAdding.value = false
    showCartMsg.value = true
    setTimeout(() => (showCartMsg.value = false), 3000)
  }, 800)
}

// eslint-disable-next-line no-unused-vars
const formatDate = (str) =>
  new Date(str).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
const category = computed(
  () => product.value?.details.find((d) => d.label === 'Category')?.value || '',
)
const categoryLowercase = computed(() => category.value.toLowerCase())
</script>
