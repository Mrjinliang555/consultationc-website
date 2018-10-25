import Vue from 'vue'
import App from './App'
import router from './router'


import '@/assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/style.css' 
import '@/assets/css/page.css'
import '@/assets/iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
    Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
