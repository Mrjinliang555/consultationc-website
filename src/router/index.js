import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'

import '../config/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})