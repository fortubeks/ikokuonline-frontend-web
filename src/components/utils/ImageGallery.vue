<!-- ImageGallery.vue -->
<template>
  <div :class="className">
    <!-- Upload Area -->
    <div class="!mb-4">
      <div
        class="!mt-1 !flex !justify-center !px-6 !pt-5 !pb-6 !border-2 !border-dashed !rounded-md !cursor-pointer !transition-colors"
        :class="isDragging ? '!border-blue-500 !bg-blue-50' : '!border-gray-300'"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDrop"
        @click="() => fileInput.value?.click()"
      >
        <div class="!space-y-1 !text-center">
          <UploadIcon class="!mx-auto !h-12 !w-12 !text-gray-400" />
          <div class="!flex !text-sm !text-gray-600 !justify-center">
            <label
              for="gallery-file-upload"
              class="!relative !cursor-pointer !bg-white !rounded-md !font-medium !text-blue-600 hover:!text-blue-500 focus-within:!outline-none focus-within:!ring-2 focus-within:!ring-offset-2 focus-within:!ring-blue-500"
            >
              <span>Upload images</span>
              <input
                ref="fileInput"
                id="gallery-file-upload"
                name="gallery-file-upload"
                type="file"
                class="!sr-only"
                multiple
                accept="image/*"
                @change="handleFileInputChange"
              />
            </label>
            <p class="!pl-1">or drag and drop</p>
          </div>
          <p class="!text-xs !text-gray-500">
            PNG, JPG, GIF up to 10MB each ({{ images.length }}/{{ maxImages }})
          </p>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div v-if="images.length > 0">
      <p class="!text-sm !font-medium !text-gray-700 !mb-2">Drag to reorder images:</p>
      <div class="!grid !grid-cols-2 sm:!grid-cols-3 md:!grid-cols-4 lg:!grid-cols-5 !gap-4">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="!relative !group !border !rounded-lg !overflow-hidden !cursor-move"
          draggable="true"
          @dragstart="(e) => handleDragStart(e, index)"
          @dragend="handleDragEnd"
          @dragover.prevent="handleImageDragOver"
          @dragleave="handleImageDragLeave"
          @drop="(e) => handleImageDrop(e, index)"
        >
          <img
            :src="image.url"
            :alt="`Image ${index + 1}`"
            class="!h-24 !w-full !object-cover"
            style="min-width: 100px; min-height: 100px"
          />
          <div
            class="!absolute !inset-0 !bg-black !bg-opacity-50 !opacity-0 group-hover:!opacity-100 !flex !items-center !justify-center !transition-opacity"
          >
            <button
              type="button"
              @click="() => removeImage(image.id)"
              class="!text-white !p-1 !rounded-full !bg-red-600 hover:!bg-red-700"
            >
              <XIcon class="!h-4 !w-4" />
            </button>
          </div>
          <div
            v-if="index === 0"
            class="!absolute !top-0 !left-0 !bg-blue-500 !text-white !text-xs !px-2 !py-1"
          >
            Primary
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XIcon, UploadIcon } from 'lucide-vue-next'

const props = defineProps({
  images: { type: Array, default: () => [] },
  onImagesChange: { type: Function, required: true },
  maxImages: { type: Number, default: 10 },
  className: { type: String, default: '' },
})

const isDragging = ref(false)
const fileInput = ref(null)

const generateId = () => Math.random().toString(36).substring(2, 9)

const handleDragOver = () => {
  isDragging.value = true
}
const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer.files?.length > 0) {
    handleNewImages(Array.from(e.dataTransfer.files))
  }
}

const handleFileInputChange = (e) => {
  if (e.target.files?.length > 0) {
    handleNewImages(Array.from(e.target.files))
    e.target.value = ''
  }
}

const handleNewImages = (files) => {
  if (props.images.length >= props.maxImages) return
  const allowedCount = props.maxImages - props.images.length
  const newImages = files
    .slice(0, allowedCount)
    .filter((file) => file.type.startsWith('image/'))
    .map((file) => ({
      id: generateId(),
      url: URL.createObjectURL(file),
      file,
    }))
  props.onImagesChange([...props.images, ...newImages])
}

const removeImage = (id) => {
  const img = props.images.find((i) => i.id === id)
  if (img?.url?.startsWith('blob:')) URL.revokeObjectURL(img.url)
  props.onImagesChange(props.images.filter((i) => i.id !== id))
}

const reorderImages = (startIndex, endIndex) => {
  const result = Array.from(props.images)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  props.onImagesChange(result)
}

const handleDragStart = (e, index) => {
  e.dataTransfer.setData('text/plain', index.toString())
  e.currentTarget.classList.add('opacity-50')
}
const handleDragEnd = (e) => {
  e.currentTarget.classList.remove('opacity-50')
}
const handleImageDragOver = (e) => {
  e.currentTarget.classList.add('bg-blue-50')
}
const handleImageDragLeave = (e) => {
  e.currentTarget.classList.remove('bg-blue-50')
}
const handleImageDrop = (e, dropIndex) => {
  e.currentTarget.classList.remove('bg-blue-50')
  const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
  if (dragIndex !== dropIndex) reorderImages(dragIndex, dropIndex)
}
</script>

<style scoped>
* {
  box-sizing: border-box !important;
}
</style>
