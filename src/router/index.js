import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'

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
  ],
  linkExactActiveClass: 'active'
})
