<template>
  <div>
    <van-card
      v-for="(product, key) in productList"
      :key="key"
      :price="product.price"
      :title="product.name"
      :num="purchaseQuantity[key]"
      :thumb="product.imageUrl"
    >
      <template #footer>
        <van-button
          size="mini"
          type="primary"
          @click="
            changePurchaseQuantity({
              key,
            })
          "
        >-1</van-button>
        <van-button
          size="mini"
          type="warning"
          @click="
            changePurchaseQuantity({
              key,
              add: true,
            })
          "
        >+1</van-button>
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import shopping from '@/store/modules/shopping'
export default defineComponent({
  setup() {
    const productList = shopping.productList
    const purchaseQuantity = shopping.purchaseQuantity
    const changePurchaseQuantity = shopping.changePurchaseQuantity

    return {
      productList,
      purchaseQuantity,
      changePurchaseQuantity
    }
  }
})
</script>
