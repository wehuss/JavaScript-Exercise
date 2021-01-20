<template>
  <van-nav-bar
    title="vite-shopping"
    left-text="首页"
    left-arrow
    fixed
    @click-left="changeView('/')"
    @click-right="changeView('/shopping-cart')"
  >
    <template #right>
      <van-badge :content="content || null">
        <p style="color: #1989fa; margin: 0">购物车</p>
      </van-badge>
    </template>
  </van-nav-bar>
  <div style="height: 51px" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import shopping from '@/store/modules/shopping'

export default defineComponent({
  setup() {
    const router = useRouter()
    const content = computed(() => {
      let num = 0
      Object.values(shopping.purchaseQuantity).forEach((v) => {
        num += v
      })
      return num
    })
    const changeView = (path: string) => {
      router.push(path)
    }

    return {
      changeView,
      content
    }
  }
})
</script>
