define(function (require, exports, module) {
    // require('moment');
    // require('swiper');
    // require('../../css/swiper.min.css');

    var template = require('./informationduct.html');
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
            },
            render: function () {
                var t = this;
                t.obj.html(template({}));
            }
        }).init(opt)
    }
});