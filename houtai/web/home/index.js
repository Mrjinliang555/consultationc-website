var uaseinfo = null;


define(['seajsText', 'seajsCss',  'doT', 'interface', 'validation', 'bootstrap'], function (require, exports) {

    seajs.use(['../../css/page.css']); //加载样式表

    $(window).bind("hashchange", $.loadPanel).trigger("hashchange");
    // 初始化进入页面href='http://localhost/web/home/'，此时不会触发hashchange事件，所以不会引入首页

    userInfo = common.getLocalStorage('userInfo', true) || '';

    if (!userInfo) {
        common.confirm({
            html: '登录超时，请重新登录',
            callback: function(){
                return window.location.href = '../login/login.html';

            }
        });
        return false;
    }else {
        // $('.header img').attr('src', '/mynameisljl/consultationc-website/phptest/upload/' + userInfo.photo);
        $('.header img').attr('src', common.addUrlStr(userInfo.photo));
        $('.header .uname').text(userInfo.nickname);
    } 
      
    })

$.pageInit = function () {
    
// 切换一级标题
    common.bindEvent('click', '.menu-bar .first-order li:not(.active)', function($this){
        if( !window.onlyInitOnec ) {
            window.onlyInitOnec = true;
           $('.menu-bar .show-hide-btn').addClass('current');
        }
        $this.addClass('active').siblings().removeClass('active');
        $('.menu-bar .secont-order .title').text( $this.find('p').text() );
        var idx = $this.index();
        $('.menu-bar .secont-order .item').eq(idx).show().siblings().hide();
        return window.location.href =  $this.data('default');
    })

    // 切换二级标题
    common.bindEvent('click', '.menu-bar .small-nav li:not(.cur)', function($this){
        if( $this.hasClass('cur') ) return;
        $this.addClass('cur').siblings().removeClass('cur');
        return window.location.href =  $this.data('link');
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
    // 退出
    common.bindEvent('click', '.header .sign-out', function($this){
        common.confirmCreate({
            html: '是否确认退出?',
            callback: function(type){
                if( type == 1 ) {
                    common.removelocalStorage('userInfo');
                    window.location.href = '../login/login.html';
                }
            }
        })
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
        case 'informationduct':
        $.showPanel('../online/informationduct.js'); //基础信息
            break; 
        case 'newsclassification':
        $.showPanel('../online/newsclassification.js'); //基础信息
            break;   
        case 'bannermanage':
        $.showPanel('../online/bannermanage.js'); //轮播图管理
            break; 
        case 'infodiffusion':
        $.showPanel('../online/infodiffusion.js'); //信息发布
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
