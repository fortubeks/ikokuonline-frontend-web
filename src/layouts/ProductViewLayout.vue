<template>
  <div class=" ">
    <Header />
    <HeaderMiddle />
    <ShopNav
      title="Shop"
      current="Product Shop"
      :links="[{ label: 'Home', href: '/', icon: 'ph ph-house' }]"
    />

    <section class="shop py-80">
      <div class="container container-lg">
        <div class="row w-full d-flex">
          <div class="d-flex gap-[24px] h-full">
            <ProductSideBar />
            <router-view />
          </div>
        </div>
      </div>
    </section>

    <ProductShipping />
    <ProductFooter />
  </div>
</template>

<script setup>
import Header from '@/components/home/Header.vue'
import HeaderMiddle from '@/pages/homepages/HeaderMiddle.vue'
import ShopNav from '@/pages/productview/ShopNav.vue'
import ProductSideBar from '@/pages/productview/ProductSideBar.vue'
import ProductShipping from '@/pages/productview/ProductShipping.vue'
import ProductFooter from '@/pages/productview/ProductFooter.vue'
</script>
