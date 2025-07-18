<template>
  <div class="flx-between gap-2 mt-3">
    <div class="paginate-content flx-align flex-nowrap gap-3">
      <select
        v-model.number="localPageSize"
        @change="$emit('update:pageSize', localPageSize)"
        >
        <option v-for="n in pageSizes" :key="n" :value="n">{{ n }}</option>
      </select>
      <span class="paginate-content__text fs-14">
        Showing {{ start + 1 }} - {{ end }} of {{ total }}
      </span>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination common-pagination mt-0">
        <li
            v-for="page in pages"
            :key="page"
            :class="['page-item', { active: localCurrentPage === page }]"
            @click="$emit('update:currentPage', page)"
            >
          <a class="page-link" href="javascript:void(0)">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === pages.length }"
          @click="nextPage"
        >
          <a class="page-link flx-align gap-2 flex-nowrap" href="javascript:void(0)">
            Next <i class="las la-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, computed } from 'vue';
const props = defineProps({
  total: Number,
  currentPage: Number,
  pageSize: Number,
  pageSizes: {
    type: Array,
    default: () => [5, 10, 20],
  },
});
const localPageSize = ref(props.pageSize);
const localCurrentPage = ref(props.currentPage);

watch(() => props.pageSize, (newVal) => {
  localPageSize.value = newVal;
});
watch(() => props.currentPage, (newVal) => {
  localCurrentPage.value = newVal;
});

const start = computed(() => (localCurrentPage.value - 1) * localPageSize.value);
const end = computed(() => Math.min(start.value + localPageSize.value, props.total));

const pages = computed(() =>
  Array.from({ length: Math.ceil(props.total / localPageSize.value) }, (_, i) => i + 1)
);

function nextPage() {
  if (localCurrentPage.value < pages.value.length) {
    emit('update:currentPage', localCurrentPage.value + 1);
  }
}
</script>
