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

Vue.filter('formatData', function(value){
  if( !value ) return "";
  var num = (new Date()) - (new Date(value));
  num = parseInt(num/1000);
  num = num / (24*60*60)
  console.log( num )
  return "fffffff"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
