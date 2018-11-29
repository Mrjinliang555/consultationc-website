import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import {post,fetch,patch,put} from '@/http/http'

import Filters from './filters/index'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;


import '@/assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/style.css' 
import '@/assets/css/page.css'
import '@/assets/iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
    Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false

// 注册过滤器
for( let k in Filters ){
  Vue.filter(k, Filters[k])
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
