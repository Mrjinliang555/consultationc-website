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
        <p>11</p>n
    </div>
</template>
<script>
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
  }
};
</script>
<style scoped>
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
</style>


