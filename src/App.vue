<template>
  <div>
    <PreLoader ref="preloaderRef" />
    <router-view v-slot="{ Component, route }">
      <component
        :is="Component"
        v-bind="route.meta?.layoutProps || {}"
      />
    </router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PreLoader from './components/utils/PreLoader.vue'
import { provideCart } from './components/homepagev3/CartProvider'

provideCart()

const preloaderRef = ref(null)
const router = useRouter()

onMounted(() => {
  router.beforeEach((to, from, next) => {
    preloaderRef.value?.show?.()
    next()
  })

  router.afterEach(() => {
    preloaderRef.value?.hide?.()
  })
})
</script>
