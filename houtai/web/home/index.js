var modelPage = null;


define(['seajsText', 'seajsCss',  'doT', 'interface', 'validation', 'bootstrap'], function (require, exports) {

    seajs.use(['../../css/page.css']); //加载样式表

    $(window).bind("hashchange", $.loadPanel).trigger("hashchange");
    // 初始化进入页面href='http://localhost/web/home/'，此时不会触发hashchange事件，所以不会引入首页

    // userInfo = common.getLocalStorage('userInfo', true) || '';

    // if (!userInfo) {
    //     common.alertCreate({
    //         html: '<p>登录超时，请重新登录</p>',
    //         callback: function () {
    //             return window.location.href = '../login/login.html';
    //         }
    //     });
    //     return false;
    // } else {
      
    } )

// $.checkTime = function () {
//     var tTime = 0;
//     checkLogout = window.setInterval(function () {
//         tTime++;
//         if (tTime == 9000000000) {
//             common.alertCreate({
//                 html: '<p>长时间未操作，请重新登录！</p>',
//                 callback: function () {
//                     var paramData = {
//                         ifOpenLoading: true,
//                         url: 'insure/memeber/logout',
//                         data: {
//                             "loginName": userInfo.agentId
//                         }
//                     }
//                     Interface.getAsynData(paramData, function (data) {
//                         if (data.code == "000") {
//                             return window.location.href = '../login/login.html';
//                         }
//                     }, function (error) {
//                         common.alertCreate({
//                             html: error.message
//                         })
//                     });
//                 }
//             });
//             window.clearInterval(checkLogout);
//         }
//     }, 1000);
// }

$.pageInit = function () {
    
// 切换一级标题
    common.bindEvent('click', '.menu-bar .first-order li', function($this){
        if( $this.hasClass('active') ) return;
        if( !window.onlyInitOnec ) {
            window.onlyInitOnec = true;
            $('.menu-bar .secont-order').css('left',0);
            $('.wrapper').css('padding-left',207)
        }
        $this.addClass('active').siblings().removeClass('active');
        $('.menu-bar .secont-order .title').text( $this.find('p').text() );
        var idx = $this.index();
        $('.menu-bar .secont-order .item').eq(idx).show().siblings().hide();
    })

    // 切换二级标题
    common.bindEvent('click', '.menu-bar .small-nav li', function($this){
        if( $this.hasClass('cur') ) return;
        $this.addClass('cur').siblings().removeClass('cur');
    })

    //展开与隐藏
    common.bindEvent('click', '.menu-bar .show-hide-btn', function($this){
        if($this.hasClass('current')){
            $this.removeClass('current');
            $('.menu-bar .secont-order').css('left',0);
            $('.wrapper').css('padding-left',207)
        }else{
            $this.addClass('current');
            $('.menu-bar .secont-order').css('left',-162);
            $('.wrapper').css('padding-left',45)
        }
    })
};

$.loadPanel = function () {
    window.isFirstImplement = null;
    var page = common.getHash("page");

    $.pageInit();

    switch (page) {
        case '':
        case 'main':
        case null:
        case undefined:
            $.showPanel('../online/home.js'); //首页
            break;
    }

};

$.showPanel = function (file) {
    var mainbody = $('.main');
    seajs.use(file, function (account) {
        // 参数account就指代file模块
        modelPage = account;
        account.show({
            body: mainbody
        });
        window.scrollTo(0, 0);
    });
};
