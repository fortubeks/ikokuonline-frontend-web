<template>
    <div class="row gy-4">
        <div class="col-12">
            <div class="card common-card border border-gray-five">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="title">Products</h5>
                        <div class="card-header-actions">
                            <router-link :to="{ name: 'ProductCreate' }" class="btn btn-main">
                                <i class="las la-plus"></i> Add Product
                            </router-link>
                        </div>
                    </div>
                    <div class="py-4">
                        <form class="search-input d-sm-block">
                            <span class="icon">
                            <img src="@/assets/dp-market-dashboard/images/icons/search-dark.svg" class="white-version" />
                            <img src="@/assets/dp-market-dashboard/images/icons/search-dark-white.svg" class="dark-version" />
                            </span>
                            <input type="text" class="common-input common-input--md common-input--bg pill w-100" placeholder="Search here..." />
                        </form>
                    </div>

                    <div class="table-responsive">
                        <table class="table text-body mt--24">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in paginatedProducts" :key="product.id">
                                <td data-label="Name">{{ product.name }}</td>
                                <td data-label="Price">₦ {{ product.price.toLocaleString() }}</td>
                                <td data-label="Details">
                                    <router-link :to="{ name: 'ProductEdit', params: { id: product.id } }" class="btn btn-main">
                                    <i class="far fa-eye"></i>
                                    </router-link>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <Pagination
                            :total="products.length"
                            v-model:currentPage="currentPage"
                            v-model:pageSize="pageSize"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Pagination from '@components/Pagination.vue';
import { ref, computed } from 'vue';

const products = ref([/* ... */]); // fetched or static

const currentPage = ref(1);
const pageSize = ref(5);

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const end = computed(() => Math.min(start.value + pageSize.value, products.value.length));
const paginatedProducts = computed(() =>
  products.value.slice(start.value, end.value)
);
</script>
