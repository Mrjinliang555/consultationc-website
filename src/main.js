import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import {post,fetch,patch,put} from '@/http/http'
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

Vue.filter('formatData', function(value){
  if( !value ) return "";
  var chazhi = (  new Date() - value/1 );
  var num =  chazhi / (24*60*60*1000) 

  if( num > 5 ) return format(value);
  if( num >= 1 ) return ( parseInt(num) + '天前' );

  num = chazhi / ( 60*60*1000 );
  if( num >= 1 ) return ( parseInt(num) + '小时前' );
  
  num = chazhi / ( 60*1000 );

  if( num > 10 ) return (parseInt(num) + '分钟前')

  return '刚刚'

  function format( str ){
    var date = new Date( +str );
    var y = date.getFullYear();
    var m = addZero(date.getMonth() + 1);
    var d = addZero(date.getDate());
    var h = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    return ( y + '-' + m + '-' + d + ' ' + h + ":" + min );
  }
  function addZero(num){
    return num < 10 ? ('0'+num):num;
  }
})

Vue.filter('getDataFromStr', function(value, arg1){
    var date = new Date( +value );
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var xq = date.getDay();
    var h = addZero(date.getHours());
    var min = addZero(date.getMinutes());
   
    switch( arg1 ){
      case 'y' :
        return y;
      case 'm' : 
        return m;
      case 'd' : 
        return d;
      case 'xq' : 
        return  zhongwenhua(xq);
      case 'time' :
        return (h + ':' + min)
    }

    function addZero(num){
      return num < 10 ? ('0'+num):num;
    }

    function zhongwenhua( n ){
      switch (n){
        case 0 : return '日';
        case 1 : return '一';
        case 2 : return '二';
        case 3 : return '三';
        case 4 : return '四';
        case 5 : return '五';
        case 6 : return '六';
      }
    }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
