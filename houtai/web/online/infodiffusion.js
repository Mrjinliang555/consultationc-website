define(function (require, exports, module) {
    // require('moment');
    require('../../css/summernote.css');
    require('summernote');
    require('laydate');

    var template = require('./infodiffusion.html');
    template = doT.template(template);
 

    exports.back = function () {
        return '';
    };

    exports.show = function (opt) {
        ({
            init: function (opt) {
                var t = this;
                t.obj = opt.body;
                t.newsList = common.getLocalStorage("newsList", true) || [];
                 // 渲染左边菜单
                common.renderNav(0,0,2);
                t.render();
                t.bindEvents();
            },
            render: function () {
                var t = this;
                t.obj.html(template());
            },
            bindEvents: function(){
                var t = this;
                common.bindEvent("click", "#infodiffusion .btn-release", function($this){
                    // 获取编辑框内容的方法：
                    var markupStr = $('#summernote').summernote('code');
                    console.log( markupStr )
                })
                common.bindEvent("click", "#infodiffusion .add-article", function($this){
                    var template = require('./component/addnews.html');
                    template = doT.template(template);
                    console.log( t.newsList )
                    $("#infodiffusion").append(template({newsList:t.newsList}));
                    t.renderSummernote();
                    laydate.render({elem: '#effectiveTime'});
                    laydate.render({elem: '#effectiveTimeOfData'});
                    laydate.render({elem: '#effectiveTimeOfHour',type: 'time'});
                });

                common.bindEvent("click", "#addnews .remove-btn", function($this){
                    $(".alert-popup-bg").remove();
                });

                common.bindEvent("change", "#addnews .set-time-btns [type=checkbox]", function($this){
                    // console.log( $this.prop("checked"))
                    $("#set-time-item").toggleClass("hide");
                })
            },
            renderSummernote: function(){
                $('#summernote').summernote({
                    minHeight:300,
                    disableDragAndDrop: true ,//禁用拖放功能
                    shortcuts: false ,//禁用快捷键
                    callbacks: { 
                        onImageUpload: function(file) { //图片默认以二进制的形式存储到数据库，调用此方法将请求后台将图片存储到服务器，返回图片请求地址到前端
                         //将图片放入Formdate对象中      
                            var formData = new FormData(); 
                            //‘picture'为后台获取的文件名，file[0]是要上传的文件
                            formData.append("picture", file[0]); 
                            Interface.getAsynData({    
                                type:'post', 
                                url:'saveimg.php',   
                                cache: false,
                                data:formData, 
                                processData: false,
                                contentType: false,
                            },function (res) {
                                console.log(res)
                                if( res.code == "000" ){
                                    var picture = "/xt-website/consultationc-website/phptest/upload/" + res.data;
                                    $('#summernote').summernote('insertImage',picture);
                                }
                            }, function(err){
                                console.log(err)
                            })
                        } 
                    }
                });
            }
        }).init(opt)
    }
});