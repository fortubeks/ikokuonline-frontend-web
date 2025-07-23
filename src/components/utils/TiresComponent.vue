<template>
  <section
    class="py-[48px] rounded-2xl px-[35px] bg-cover font-sora bg-center h-[149px]"
    :style="{ backgroundImage: props.bgimage }"
  >
    <div class="w-full flex items-center justify-between h-full">
      <div class="flex flex-col w-fit gap-4">
        <p class="lg:text-[24px] text-[16px] leading-[120%] text-[#121535] font-semibold">
          {{ props.title }}
        </p>

        <div class="border-b-2 border-[#121535] w-fit">
          <button
            class="flex gap-2 items-center lg:text-base font-medium text-sm text-[#121535] hover:border-b-2 transition-all duration-200"
          >
            Shop Now <img :src="plussign" alt="plus" />
          </button>
        </div>
      </div>

      <div>
        <img :src="props.image" alt="tire" />
      </div>
    </div>
  </section>
</template>

<script setup>
// import tirecomp from '@/assets/svgs/tirecomp.svg'
import plussign from '@/assets/svgs/plussign.svg'

const props = defineProps(['bgimage', 'title', 'image'])
</script>

<style scoped></style>
