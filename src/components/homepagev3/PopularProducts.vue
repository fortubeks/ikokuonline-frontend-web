<template>
  <div class="!bg-white/40 !rounded-lg !shadow-sm !overflow-hidden !mb-6">
    <div class="!flex !items-center !justify-between !px-4 !py-3 !border-b">
      <div class="!flex !items-center">
        <TrendingUpIcon class="!w-5 !h-5 !text-primary-500 !mr-2" />
        <h2 class="!text-lg !font-bold">Popular Products</h2>
      </div>
      <a :href="viewAllLink" class="!text-primary-500 !text-sm !font-medium hover:!underline">
        View All
      </a>
    </div>

    <div class="!grid !grid-cols-2 md:!grid-cols-4 !gap-4 !p-4">
      <a
        v-for="product in products"
        :key="product.id"
        :href="`/product/${product.id}`"
        class="!block bg-white shadow-sm rounded-md p-2 group"
      >
        <div class="!relative !overflow-hidden !rounded-md">
          <img
            :src="product.image"
            :alt="product.title"
            class="!w-full !aspect-square text-slate-600 !object-cover group-hover:!scale-105 !transform !transition-transform !duration-300"
          />
          <div
            class="!absolute !inset-0 !bg-gradient-to-t from-black/70 to-transparent !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-300 !flex !items-end"
          >
            <div class="!p-3 !w-full">
              <p class="!text-white !text-sm line-clamp-1">
                {{ product.title }}
              </p>
            </div>
          </div>
        </div>
        <div class="!mt-2">
          <p class="!font-bold !text-primary-500">₦{{ product.price.toLocaleString() }}</p>
          <p class="!text-sm !text-black line-clamp-1">
            {{ product.title }}
          </p>
          <p v-if="product.views" class="!text-xs !text-gray-500 !mt-1">
            {{ product.views.toLocaleString() }} views
          </p>
        </div>
      </a>
    </div>

    <div class="!px-4 !py-3 !border-t">
      <a
        :href="viewAllLink"
        class="!text-primary-500 !font-medium !text-sm !flex !items-center !justify-center hover:!underline"
      >
        View all popular products
      </a>
    </div>
  </div>
</template>

<script setup>
import { TrendingUpIcon } from 'lucide-vue-next'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  viewAllLink: {
    type: String,
    default: '/popular',
  },
})
</script>
