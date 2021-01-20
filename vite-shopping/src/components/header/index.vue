<template>
  <van-nav-bar
    title="vite-shopping"
    left-text="首页"
    right-text="购物车"
    left-arrow
    fixed
    @click-left="changeView('/')"
    @click-right="changeView('/shopping-cart')"
  />
  <div style="height:51px" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const changeView = (path: string) => {
      router.push(path)
    }

    return {
      changeView
    }
  }
})
</script>
