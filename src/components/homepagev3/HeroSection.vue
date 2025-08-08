<template>
  <div class="!bg-dark-900 !text-white">
    <div class="!container !mx-auto !px-4 !py-8 md:!py-16">
      <div class="md:!flex md:!items-center md:!justify-between">
        <div class="md:!w-1/2 !mb-8 md:!mb-0">
          <h1 class="!text-3xl !text-white md:!text-5xl !font-bold !mb-4 animate-fadeIn">
            Find The Best Car Parts At The Best Prices
          </h1>
          <p class="!text-lg md:!text-xl !mb-6 !text-gray-300 animate-fadeIn animation-delay-200">
            Nigeria's #1 marketplace for auto parts and accessories. Connect with verified sellers
            nationwide.
          </p>
          <div class="!flex !flex-col md:!flex-row !gap-4 animate-fadeIn animation-delay-400">
            <a
              href="/category/all"
              class="!bg-primary-500 hover:!bg-primary-600 !text-white !font-bold !py-3 !px-6 !rounded-md !flex !items-center !justify-center !transition-all hover:!translate-y-[-2px]"
            >
              <Search class="!mr-2 !w-5 !h-5" />
              Browse Parts
            </a>

            <a
              :href="'/login'"
              class="!border !border-primary-500 !text-primary-500 hover:!bg-primary-500 hover:!text-white !font-bold !py-3 !px-6 !rounded-md !flex !items-center !justify-center !transition-all hover:!translate-y-[-2px]"
            >
              <ShoppingBag class="!mr-2 !w-5 !h-5" />
              Sell Your Parts
            </a>
          </div>

          <div class="!mt-8 !hidden md:!block">
            <div class="!flex !items-center">
              <span class="!text-primary-500 !font-bold !mr-4">Popular Searches:</span>
              <div class="!flex !flex-wrap !gap-2">
                <a
                  v-for="item in popularSearches"
                  :key="item.term"
                  :href="item.path"
                  class="!bg-dark-800 text-white hover:!bg-dark-700 !px-3 !py-1 !rounded-full !text-sm !flex !items-center !transition-colors"
                >
                  {{ item.term }}
                  <ChevronRightIcon class="!ml-1 !w-4 !h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="md:!w-1/2 !hidden md:!block !relative">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Car Parts"
            class="!rounded-lg !shadow-lg animate-fadeIn animation-delay-300"
          />
          <div
            class="!absolute !-bottom-6 !-left-6 !bg-primary-500 !rounded-lg !p-4 !shadow-lg animate-fadeIn animation-delay-500"
          >
            <div class="!text-2xl !font-bold">25,000+</div>
            <div class="!text-sm">Verified Sellers</div>
          </div>
          <div
            class="!absolute !-top-6 !-right-6 !bg-white !text-dark-900 !rounded-lg !p-4 !shadow-lg animate-fadeIn animation-delay-600"
          >
            <div class="!text-2xl !font-bold">100,000+</div>
            <div class="!text-sm">Parts Available</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, ShoppingBag, ChevronRightIcon } from 'lucide-vue-next'

const popularSearches = [
  { term: 'Toyota Engine', path: '/category/engines' },
  { term: 'BMW Parts', path: '/category/all' },
  { term: 'Honda Headlights', path: '/category/lights' },
  { term: 'Tires', path: '/category/tires' },
  { term: 'Batteries', path: '/category/batteries' },
]
</script>

<style scoped>
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}
.animation-delay-500 {
  animation-delay: 0.5s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>
