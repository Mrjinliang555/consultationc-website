<template>
  <div id="app">
    <div class="header">
      <div class="news-flash">
        <div class="right-part fr">
          简体中文
        </div>
        <div class="news-swiper-container">
         <swiper :options="swiperOption">
            <swiper-slide v-for="(v,i) in swiperList" :key="i">
              <span class="title">{{v.title}}</span>：<span class="text">{{v.text}}</span>
            </swiper-slide>
         </swiper>
        </div>  
        <!-- <div class="fr">简体中文</div> -->
      </div>
      <div class="nav-container">
        <div class="nav-userinfo">
          <div class="logo fl">
            <img src="./assets/images/logo.svg" alt="">
          </div>
          <ul class="navlist fl clearfix">
            <router-link tag="li" to="/home"><span>首页</span></router-link>
            <router-link tag="li" to="/news"><span>7*24快讯</span></router-link>
            <router-link tag="li" to="/quotation"><span>行情</span></router-link>
            <router-link tag="li" to="/information"><span>数据</span></router-link>
            <router-link tag="li" to="/activity"><span>活动</span></router-link>
            <router-link tag="li" to="/college"><span>学院</span></router-link>
            <router-link tag="li" to="/column"><span>专栏</span></router-link>
          </ul>
          <ul class="userlist fr clearfix">
            <li class="user"><i class="iconfont icon-yonghu"></i></li>
            <router-link tag="li" to="/specialcolumn"><i class="iconfont icon-shuxie"></i><span>金色专栏</span></router-link>
            <router-link tag="li" to="/login">
              <input type="text" placeholder="搜索一下">
              <i class="iconfont icon-sousuo"></i>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      swiperOption: {
            direction: 'vertical',
            autoplay: true,
            loop: true
      },
      swiperList: []
    }
  },
  created(){
      this.swiperList = [
       {
          title: '风险提示',
          text: '请谨防ICO、变相ICO | 金色财经所发表资讯不代表本公司任何投资暗示。'
       },
       {
          title: '快讯',
          text: '熊市“寒潮”犹存 交易所圈地STO前景未知？'
       },
       {
          title: '头条',
          text: '抱上淡马锡大腿 币安加紧布局新加坡背后'
       }
      ]
  },
  methods: {
   
  }
}
</script>

<style>

</style>
