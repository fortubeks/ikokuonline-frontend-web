<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="!min-h-screen !bg-gray-100 !pb-16 md:!pb-0">
    <Header
      :showBackButton="true"
      title="IkokuOnline"
      :showBookmark="true"
      :bookmarked="true"
      searchPlaceholder="Search in Car Parts"
      :onSearch="handleSearch"
    />
    <main class="!overflow-x-hidden w-full">
      <slot />
    </main>
    <Footer />
    <BottomNavigation />
  </div>
</template>

<script setup>
import Header from '../components/homepagev3/Header.vue'
import Footer from '../components/homepagev3/Footer.vue'
import BottomNavigation from '../components/homepagev3/BottomNavigation.vue'

defineProps({
  showBackButton: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  showBookmark: {
    type: Boolean,
    default: false,
  },
  bookmarked: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: '',
  },
  onSearch: Function,
})
</script>
