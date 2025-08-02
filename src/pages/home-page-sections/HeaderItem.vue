<template>
  <a :href="item.link" class="flex-align gap-3 item-hover">
    <span class="text-xl text-gray-700 d-flex position-relative items-center item-hover__text">
      <img :src="item.icon" class="w-24 h-24" alt="icon" />
      <span
        v-if="item.count"
        class="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4"
      >
        {{ item.count }}
      </span>
    </span>
    <span class="text-md text-heading-three item-hover__text d-none d-lg-flex">{{
      item.label
    }}</span>
  </a>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
