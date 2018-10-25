<template>
    <div class="home-template">
        <div class="market-container">
            <div class="main">
                <div class="trend-chart" v-for="(v,i) in chartList" :key="i">
                <div><img :src="v.logo" alt=""><span>{{v.currency_name}}</span></div>
                <div>{{v.degree}}%</div>
                <canvas height="100"></canvas>
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
      chartList: [
        {
          currency_name: "BCD",
          currency_code: "bcd",
          exchange_code: "huobipro",
          last: "26.60",
          degree: "-1.83",
          logo: "https://resource.jinse.com/www/img/cslogo/BCD.png?v=1327",
          line: [
            "28.36",
            "27.91",
            "27.19",
            "26.47",
            "26.24",
            "26.51",
            "26.47",
            "26.47",
            "26.78",
            "27.23",
            "27.50",
            "27.05",
            "26.33",
            "26.47",
            "26.51",
            "26.60",
            "26.42",
            "26.83",
            "26.47",
            "27.10",
            "26.60",
            "26.69",
            "26.29",
            "26.60"
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
      ]
    };
  },
  created() {}
};
</script>
<style scoped>
.market-container {
  background: #292b32;
}
.market-container .main {
    height: 150px;
    width: 1170px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
}
.trend-chart {
    border-left: #5A5C65 1px solid;
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
}
.trend-chart canvas {
    position: absolute;
    left: 0;
    bottom: 0;
    background: pink;
    width: 100%;
}
</style>


