<template>
  <div class="breadcrumb mb-0 py-26 bg-main-two-50">
    <div class="container container-lg">
      <div class="breadcrumb-wrapper flex-between flex-wrap gap-16">
        <h6 class="mb-0">{{ title }}</h6>
        <ul class="flex-align gap-8 flex-wrap">
          <li v-for="(link, index) in links" :key="index" class="text-sm flex-align gap-8">
            <a :href="link.href" class="text-gray-900 flex-align gap-8 hover-text-main-600">
              <i :class="link.icon"></i>
              {{ link.label }}
            </a>
            <p>></p>
          </li>
          <li class="text-sm text-main-600">{{ current }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopNav',
  props: {
    title: {
      type: String,
      required: true,
    },
    current: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
