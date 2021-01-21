import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/set',
    name: 'SetInfo',
    component: () => import('../views/set-user-info.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
