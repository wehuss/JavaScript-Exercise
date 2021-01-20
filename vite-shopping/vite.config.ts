import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

export default defineConfig({
  plugins: [vue(),
    viteMockServe({
      mockPath: 'mock'
    })],
  alias: {
    '@/': `${pathResolve('src')}/`
  }
})
