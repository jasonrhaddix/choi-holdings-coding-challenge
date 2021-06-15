import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wallet.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isConnected) next()
      else router.push({ path: from.path })
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
