define(function (require, exports, module) {
    // require('moment');

    var template = require('./newsclassification.html');
    template = doT.template(template);
 

    exports.back = function () {
        return '';
    };

    exports.show = function (opt) {
        ({
            init: function (opt) {
                var t = this;
                t.obj = opt.body;
                t.render();
                t.bindEvents();
                t.getNewsList();
            },
            render: function () {
                var t = this;
                $('.menu-bar .first-order li').eq(0).addClass('active').siblings().removeClass('active');
                $('.menu-bar .secont-order .item').eq(0).show().siblings().hide();
                if( !window.onlyInitOnec ) {
                    window.onlyInitOnec = true;
                   $('.menu-bar .show-hide-btn').addClass('current');
                }
            },
            bindEvents: function(){


                
            },
            getNewsList: function(){
                Interface.getAsynData({
                    url: 'getnewsclassificationlist.php',
                    ifOpenLoading: true,
                }, function(res){
                    t.obj.html(template(userInfo));
                })
            }
        }).init(opt)
    }
});