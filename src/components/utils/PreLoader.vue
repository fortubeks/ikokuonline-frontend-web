<template>
  <div v-if="visible" class="preloader fixed inset-0 z-[9999] flex items-center justify-center bg-white">
    <img src="@/assets/images/icon/preloader.gif" alt="Loading..." />
  </div>
</template>

<script setup>
import { ref, } from 'vue'

const visible = ref(false)

function show() {
  visible.value = true
}

function hide() {
  setTimeout(() => {
    visible.value = false
  }, 300) 
}

defineExpose({ show, hide })
</script>

<style scoped>
.preloader {
  transition: opacity 0.2s ease-in-out;
}
</style>
