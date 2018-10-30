<template>
    <div class="container">
        <div class="imp-part">
            <a href=""><img :src="item.img" alt=""></a>
        </div>
        <div class="text-part">
            <h2 class="two-line"><a class="add-hover" href="">{{item.title}}</a></h2>
            <p class="three-line">{{item.txt}}</p>
            <div class="info">
                <div class="fl">
                    <em v-if="isTop==1">置顶</em>
                    <span><a class="add-hover" href="">{{item.auther + ' · ' }}{{item.creatTime  | formatData}}</a></span>
                </div>
                <div class="fr">
                    <i class="iconfont icon-yanjing"></i>
                    <span>{{item.vews}}</span>
                    <em v-if="item.extension==1">推广</em>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    created(){
        
    },
    props: ['item', 'isTop']    
}
</script>
<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 167px;
    margin-bottom: 40px;
}
.imp-part {
    width: 270px;
    height: 100%;
}
.text-part {
    width: 460px;
    text-align: left;
    height: 100%;
    position: relative;
}
.imp-part img {
    width: 100%;
    height: 100%;
}
.text-part h2 a {
    color: #333;
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
}
.text-part h2 {
    margin-bottom: 10px;
}
.text-part p {
    line-height: 22px;
    color: #666;
    font-size: 14px;
} 
.text-part .info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 14px;
}
.text-part .info i,
.text-part .info span,
.text-part .info a {
    color: #999;
}

.info .fl em {
    font-size: 14px;
    color: #e0051e;
    margin-right: 8px;
    border: 1px solid #e0051e;
    border-radius: 2px;
    width: 44px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    display: inline-block;
 }
.info .fr em {
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    margin-left: 8px;
    font-size: 14px;
    color: #bcbcbc;
    transform: scale(1)!important;
    width: 44px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    display: inline-block;
}
</style>


