<template>
    <div class="home-template">
        <div class="market-container">
           <div class="box">
             <swiper :options="swiperOption" class="main">
                <swiper-slide  v-for="(v,i) in 3" :key="i">
                      <div class="trend-chart" v-for="(v,i) in chartList" :key="i">
                        <div><img :src="v.logo" alt="">{{v.currency_name}}</div>
                        <div class="txt"><span :class="+v.degree>0?'red first':'first'">{{v.degree}}%</span><i>今日价格：¥{{v.last}}</i></div>
                        <canvas v-renderEcharts:link="v.line" height="90"></canvas>
                      </div> 
                  </swiper-slide>
                </swiper> 
             <div class="hover-box">
              <div class="swiper-pagination"></div>
              <div class="swiper-allows button-prev"><i class="iconfont icon-jiantou_up"></i></div> <!-- 黑色 -->
              <div class="swiper-allows button-next"><i class="iconfont icon-jiantou_down"></i></div> <!-- 白色 -->
             </div>
           </div>
        </div>
        <div class="home-main-new">
          <div class="container">
              <div class="left-part">
                <div class="banner">
                  <div class="swiper-img">
                      <swiper :options="bannerOption">
                          <swiper-slide v-for="(v,i) in bannerList.swiper" :key="i">
                            <img :src="v.link" alt="">
                          </swiper-slide>
                      </swiper>
                  </div>
                  <div class="static-img">
                      <img :src="bannerList.static[0].link" alt="">
                      <img :src="bannerList.static[1].link" alt="">
                  </div>
                </div>
                <div class="news-nav clearfix">
                  <ul>
                    <li v-on:click="tabNav(i)" :class="i===newsNavData.curIdx?'active':''" v-for="(v,i) in newsNavData.arr" :key="i">{{v}}</li>
                  </ul>
                </div>
                <div class="content">
                  <hotspot :isTop="i<=2?1:0" v-for="(v,i) in nwesList" :key="i" :item="v" /> 
                </div>
              </div>
              <div class="right-part">
                <div class="dynamic">
                  <div class="title clearfix">
                    <span v-on:click="tabNews(1)" :class="dynamicData.tapIdx == 1 ?'cur':''">快讯</span>
                    <span v-on:click="tabNews(2)" :class="dynamicData.tapIdx == 2 ?'cur':''">动态</span>
                    <i class="iconfont"></i>
                  </div>
                  <div class="content">
                      <ul class="fast-news" v-show="dynamicData.tapIdx == 1">
                        <li v-for="(v,i) in dynamicData.fastList" :key="i">
                          <h4>{{v.tit}}</h4>
                          <div class="clearfix">
                            <span class="fl"></span>
                            <span class="fr"><i class="iconfont"></i>利空</span>
                            <span class="fr"><i class="iconfont"></i>利好</span>
                          </div>
                        </li>
                      </ul>
                      <ul class="move-news" v-show="dynamicData.tapIdx == 2">
                        <li>动态</li>
                      </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>

import hotspot from '@/components/hotspot'

export default {
  data() {
    return {
      swiperOption: {
            direction: 'vertical',
            // autoplay: true,
            // loop: true,
            pagination:{
              el: '.swiper-pagination'
            },
            navigation: {
              nextEl: '.button-next',
              prevEl: '.button-prev'
            }
      },
      bannerOption: {
          autoplay: true,
          loop: true,
      },
      chartList: [
        {
          currency_name: "BCD",
          currency_code: "bcd",
          exchange_code: "huobipro",
          last: "26.60",
          degree: "-1.83",
          logo: "https://resource.jinse.com/www/img/cslogo/BCD.png?v=1327",
          line: [
            "2228.36",
            "2227.91",
            "1127.19",
            "3326.47",
            "4426.24",
            "5526.51",
            "6626.47",
            "7726.47",
            "3226.78",
            "4427.23",
            "6627.50",
            "3427.05",
            "4426.33",
            "3126.47",
            "1126.51",
            "7726.60",
            "2226.42",
            "1326.83",
            "9826.47",
            "4427.10",
            "4426.60",
            "4426.69",
            "4426.29",
            "5526.60"
          ]
        },
        {
          currency_name: "ELF",
          currency_code: "elf",
          exchange_code: "huobipro",
          last: "2.31",
          degree: "0.47",
          logo: "https://resource.jinse.com/www/img/cslogo/ELF.png?v=1327",
          line: [
            "2.31",
            "2.31",
            "2.30",
            "2.30",
            "2.31",
            "2.31",
            "2.31",
            "2.31",
            "2.31",
            "2.31",
            "2.30",
            "2.30",
            "2.31",
            "2.29",
            "2.30",
            "2.30",
            "2.30",
            "2.30",
            "2.30",
            "2.30",
            "2.30",
            "2.30",
            "2.31",
            "2.31"
          ]
        },
        {
          currency_name: "TNB",
          currency_code: "tnb",
          exchange_code: "huobipro",
          last: "0.0744",
          degree: "-4.07",
          logo: "https://resource.jinse.com/www/img/cslogo/TNB.png?v=1327",
          line: [
            "0.0771",
            "0.0776",
            "0.0776",
            "0.0771",
            "0.0762",
            "0.0762",
            "0.0757",
            "0.0757",
            "0.0762",
            "0.0757",
            "0.0762",
            "0.0757",
            "0.0753",
            "0.0735",
            "0.0726",
            "0.0730",
            "0.0730",
            "0.0735",
            "0.0735",
            "0.0744",
            "0.0735",
            "0.0739",
            "0.0739",
            "0.0744"
          ]
        },
        {
          currency_name: "TRX",
          currency_code: "trx",
          exchange_code: "huobipro",
          last: "0.16",
          degree: "-0.55",
          logo: "https://resource.jinse.com/www/img/cslogo/TRX.png?v=1327",
          line: [
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16",
            "0.16"
          ]
        },
        {
          currency_name: "AIDOC",
          currency_code: "aidoc",
          exchange_code: "huobipro",
          last: "0.0699",
          degree: "-10.92",
          logo: "https://resource.jinse.com/www/img/cslogo/AIDOC.png?v=1327",
          line: [
            "0.0780",
            "0.0780",
            "0.0776",
            "0.0776",
            "0.0753",
            "0.0753",
            "0.0762",
            "0.0757",
            "0.0762",
            "0.0767",
            "0.0776",
            "0.0776",
            "0.0762",
            "0.0767",
            "0.0776",
            "0.0767",
            "0.0767",
            "0.0767",
            "0.0771",
            "0.0767",
            "0.0757",
            "0.0735",
            "0.0726",
            "0.0726"
          ]
        }
      ],
      // 轮播图数据
      bannerList : {
        swiper: [
          {
            link: require('../../assets/images/1244581.png')
          },
          {
            link: require('../../assets/images/1249704.jpg')
          },
          {
            link: require('../../assets/images/1254693.jpg')
          },
          {
            link: require('../../assets/images/1255881.png')
          },
          {
            link: require('../../assets/images/1255973.jpg')
          },
          {
            link: require('../../assets/images/1256588.jpg')
          },
          {
            link: require('../../assets/images/1261175.jpg')
          },
          {
            link: require('../../assets/images/1263330.jpg')
          }
        ],
        static : [
         {link: require('../../assets/images/1228618.png')} ,
         {link: require('../../assets/images/1248368.jpg')}
        ]
      },
      newsNavData: {
        curIdx: 0,
        arr: ['头条','新闻','政策','人物','行情','引用','投研','技术','百科']
      },
      nwesList: [
        {
          img: require('../../assets/images/1159955_small.jpg'),
          title: '比特币十周年 | 最自由的货币与最曲折的监管',
          txt:'自2008年中本聪第一次发布比特币白皮书以来，已经有十年的时间，这十年之间比特币价格的每一次波动都牵动着市场投资者的心，价格剧烈波动的背后，各国政策是怎样变化的？',
          creatTime: '2018/10/27 22:41',
          auther: '扎NGSAN',
          vews: 12344,
          extension: 1,
          sole: 1
        },
        {
          img: require('../../assets/images/1266315_small.jpg'),
          title: '游戏新经济的开创者',
          txt: '你是否愿意同我们一道，一起迎接财富自由浪潮的到来呢？',
          creatTime: '2018/10/27 22:41',
          auther: '相爱乡亲',
          vews: 12344,
          extension: 0,
          sole: 0
        },
        {
          img: require('../../assets/images/1267656_small.jpg'),
          title: '知名律所Morgan Lewis＆Blockius发布欧美加密货币市场监管报告莫斯科市法院驳回Telegram恢复业务上诉 坚持要求其提供解密密钥',
          txt: 'Morgan Lewis＆Blockius律师事务所认为全球各国政府也都在努力跟上金融技术创新发展的节奏，但市场上的加密货币监管法规仍然需要不断审查、更新和监督。',
          creatTime: '2018/10/27 22:41',
          auther: '不是江湖人',
          vews: 12344,
          extension: 0,
          sole: 0
        },
        {
          img: require('../../assets/images/1268012_small.jpg'),
          title: '莫斯科市法院驳回Telegram恢复业务上诉 坚持要求其提供解密密钥',
          txt: '法院要求Telegram停止提供消息发送和接收服务，直到他们能够履行俄罗斯监管法律义务、提供解密密钥为止。',
          creatTime: '2018/10/27 22:41',
          auther: 'jason',
          vews: 12344,
          extension: 0,
          sole: 0
        },
        {
          img: require('../../assets/images/1159955_small.jpg'),
          title: '比特币十周年 | 最自由的货币与最曲折的监管',
          txt:'自2008年中本聪第一次发布比特币白皮书以来，已经有十年的时间，这十年之间比特币价格的每一次波动都牵动着市场投资者的心，价格剧烈波动的背后，各国政策是怎样变化的？',
          creatTime: '2018/10/27 22:41',
          auther: '扎NGSAN',
          vews: 12344,
          extension: 1,
          sole: 1
        },
        {
          img: require('../../assets/images/1266315_small.jpg'),
          title: '游戏新经济的开创者',
          txt: '你是否愿意同我们一道，一起迎接财富自由浪潮的到来呢？',
          creatTime: '2018/10/27 22:41',
          auther: '相爱乡亲',
          vews: 12344,
          extension: 0,
          sole: 0
        },
        {
          img: require('../../assets/images/1267656_small.jpg'),
          title: '知名律所Morgan Lewis＆Blockius发布欧美加密货币市场监管报告莫斯科市法院驳回Telegram恢复业务上诉 坚持要求其提供解密密钥',
          txt: 'Morgan Lewis＆Blockius律师事务所认为全球各国政府也都在努力跟上金融技术创新发展的节奏，但市场上的加密货币监管法规仍然需要不断审查、更新和监督。',
          creatTime: '2018/10/27 22:41',
          auther: '不是江湖人',
          vews: 12344,
          extension: 0,
          sole: 0
        },
        {
          img: require('../../assets/images/1268012_small.jpg'),
          title: '莫斯科市法院驳回Telegram恢复业务上诉 坚持要求其提供解密密钥',
          txt: '法院要求Telegram停止提供消息发送和接收服务，直到他们能够履行俄罗斯监管法律义务、提供解密密钥为止。',
          creatTime: '2018/10/27 22:41',
          auther: 'jason',
          vews: 12344,
          extension: 0,
          sole: 0
        }
      ],
      // 快讯动态
      dynamicData: {
        tapIdx: 1,
        fastList: [
          {
            tit: '声音 | 张首晟：区块链技术可以通过新的方式建立信任',
            creatTime: '2018-03-09',
            good: 33,
            empty: 55
          },
          {
            tit: '动态 | TAC溯源链获得火币全球热门项目推荐',
            creatTime: '2018-03-09',
            good: 33,
            empty: 55
          },
          {
            tit: '声音 | 张首晟：区块链技术可以通过新的方式建立信任',
            creatTime: '2018-03-09',
            good: 33,
            empty: 55
          },
          {
            tit: '声音 | 肖飒：区块链等行业的发展必然带来更多法律挑战',
            creatTime: '2018-03-09',
            good: 33,
            empty: 55
          },
          {
            tit: '声音 | 张首晟：区块链技术可以通过新的方式建立信任',
            creatTime: '2018-03-09',
            good: 33,
            empty: 55
          }
        ]
      } 
    };
  },
  created() {},
  directives: {
    renderEcharts:{
      inserted(el,binding){
        var w = el.offsetWidth+60;
        
      
        var h = el.offsetHeight+18;
        var arr = binding.value;

        var len = w / arr.length;

        var last;
      
        var ctx = el.getContext("2d");

        arr.forEach((element,index) => {
          
          while( element < 10 ){
            element = element * 10
          }
          while ( element > h  ){
            element = element/10
          }
          var y = (h - element);
          var x = index * len;
          last = x;
          if( !index ) ctx.moveTo(x,y)
          else ctx.lineTo(x,y);
        });
       
        ctx.lineTo(last,h);
        ctx.lineTo(0,h);
        ctx.strokeStyle = "#5A5C65"
        ctx.fillStyle = "#3B3D42"
        ctx.stroke();
        ctx.fill();
      }
    }
  },
  methods: {
    tabNav(i){
      this.newsNavData.curIdx = i;
    },
    tabNews(i){
      this.dynamicData.tapIdx = i
    }
  },
  components: {
    hotspot: hotspot
  }
};
</script>
<style scoped>
.home-template {
  min-width: 1200px;
}
.market-container {
  background: #292b32;
}
.market-container .main {
    height: 150px;
    box-sizing: border-box;
    border-right: #5A5C65 1px solid;
}
.market-container .box {
    width: 1170px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
}
.market-container .swiper-pagination {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 222;
}
.swiper-allows {
  position: absolute;
  right: -27px;
  z-index: 222;
  color: #e9e9e9;
  width: 20px;
  height: 20px;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: .2;
}
.hover-box:hover .swiper-allows{
  opacity: 1;
}
.swiper-allows.button-prev {
  margin-top: -40px;
  line-height: 18px;
  outline:none;
}
.swiper-allows.button-next {
  margin-top: 40px;
  outline:none;
}
.swiper-slide {
  display: flex;
}
.trend-chart {
    border-left: #5A5C65 1px solid;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 10px 0 0 20px;
    color: #fff;
}
.trend-chart img {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-bottom: 10px;
}
.trend-chart canvas {
    position: absolute;
    left: 0;
    bottom: 0;
    background:  #292B32;
    width: 100%;
}
.trend-chart .txt {
  font-size: 14px;
}
.trend-chart .txt i {
  display: none;
}
.trend-chart .txt span {
  background: green;
  padding: 3px 6px;
  border-radius: 3px;
}
.trend-chart:hover .txt i {
  display: inline;
}
.trend-chart:hover .txt span {
  display: none;
}
.trend-chart .txt .red {
  background: red;
}
.home-main-new {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee; 
}
.container {
  width: 1170px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.left-part {
  width: 770px;
}
.right-part {
  width: 370px;
}
.banner {
  display: flex;
  height: 275px;
  justify-content: space-between;
}
.banner .swiper-img {
  width: 550px;
  border-radius: 8px;
  overflow: hidden;
}
.banner .swiper-img img{
  width: 550px;
  height: 275px;
  transition: transform 0.3s;
}
.banner .swiper-slide:hover img {
  transform: scale(1.03);
}
.static-img {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.static-img img {
  width: 200px;
  height: 127px;
  border-radius: 5px;
}
.news-nav {
  padding: 60px 0 40px;
}
.news-nav li {
  float: left;
  color: #999;
  font-size: 22px;
  margin-left: 20px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  padding-bottom: 5px;
}
.news-nav li:hover {
  color: orangered;
}
.news-nav .active {
  color: #333;
  font-weight: bold;
  border-bottom: 3px solid orangered;
}
.left-part .content {
  width: 100%;
}
.right-part .title {
  font-size: 18px;
  height: 65px;
}
.right-part .title span{
  margin-right: 20px;
  float: left;
  color: #999;
  padding-bottom: 5px;
}
.right-part span:hover {
  color: goldenrod;
}
.right-part .title .cur {
  color: #333;
  font-weight: bold;
  border-bottom: 3px solid orangered;
}
.right-part .content {
  padding-top: 8px;
  width: 100%;
  height: 450px;
  overflow-y: auto;
}
</style>


