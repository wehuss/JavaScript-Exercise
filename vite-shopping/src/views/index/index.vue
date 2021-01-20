<template>
  <div>
    <van-card
      v-for="(product, i) in productList"
      :key="i"
      :price="product.price"
      :title="product.name"
      :thumb="product.imageUrl"
    >
      <template #footer>
        <van-button size="mini">加入购物车</van-button>
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import shopping from '@/store/modules/shopping'
export default defineComponent({
  setup() {
    const productList = computed(() => shopping.productList)

    return {
      productList
    }
  }
})
</script>
