define(function (require, exports, module) {
    // require('moment');
    // require('swiper');
    // require('../../css/swiper.min.css');

    var template = require('./informationduct.html');
    template = doT.template(template);
    var userInfo = common.getLocalStorage('userInfo', true) || '';
   

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
            },
            render: function () {
                var t = this;
                t.obj.html(template(userInfo));
            },
            bindEvents: function(){

                common.bindEvent('click', '#informationduct .i-nav li:not(.cur)', function($this){
                    $this.addClass('cur').siblings().removeClass('cur');
                    var idx = $this.index();

                    $('#informationduct .item').eq(idx).removeClass('hide').siblings().addClass('hide');
                })


            }
        }).init(opt)
    }
});