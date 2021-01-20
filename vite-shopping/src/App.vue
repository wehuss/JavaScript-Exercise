<template>
  <v-header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import vHeader from '@/components/header/index.vue'
import shopping from '@/store/modules/shopping'

export default defineComponent({
  name: 'App',
  components: {
    vHeader
  },
  setup() {
    onBeforeMount(() => shopping.getProductList())
  }
})
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
