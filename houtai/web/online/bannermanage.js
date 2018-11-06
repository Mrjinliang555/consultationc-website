define(function (require, exports, module) {
    // require('moment');
    require('cropper');
    require('../../css/cropper.min.css');

    var template = require('./bannermanage.html');
    template = doT.template(template);
   
   

    exports.back = function () {
        return '';
    };

    exports.show = function (opt) {
        ({
            init: function (opt) {
                var t = this;
                t.obj = opt.body;
                 // 渲染左边菜单
                common.renderNav(0,0,1);
                t.render();
                t.bindEvents();
    
            },
            render: function () {
                var t = this;

                Interface.getAsynData({
                    url: "select.php?index=0",
                    ifOpenLoading: true,
                },function(res){
                    console.log(res)
                    if( res.code == "000" ){
                        t.obj.html(template({list: res.data}));
                    }
                    
                },function(err){
                    console.log(err)
                })
            },
            bindEvents: function(){

                var t = this;

                common.bindEvent("click", "#bannermanage .add-sort", function($this){
                    var template = require('./component/addbanner.html');
                    $("body").append(template);

                })

                common.bindEvent("click",".popup-bg .btn-close", function($this){
                    $this.parents(".popup-bg").remove();
                })
                common.bindEvent("change", ".popup-bg .file-btn", function($this){
                    var $file = $this;
                    var fileObj = $file[0];
                    var windowURL = window.URL || window.webkitURL;
                    var dataURL;
                    var $img = $("#picture-preview");
                    if(fileObj && fileObj.files && fileObj.files[0]){
                        dataURL = windowURL.createObjectURL(fileObj.files[0]);
                        $img.attr('src',dataURL);
                    }else{
                        dataURL = $file.val();
                        var imgObj = document.getElementById("picture-preview");
                        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                    }
                    $img.cropper({
                        aspectRatio: 1.98/1,         //1 / 1,  //图片比例,1:1
                        autoCropArea: 1,
                        cropBoxResizable:false,
                        cropBoxMovable:false,//是否拖动裁剪框
                        dragMode: 'move',
                        restore: false,
                        guides:false
                    });
                    $img.cropper('replace',dataURL);
                    $("body").unbind("click").on("click","#saveBannerPhoto",function(){
                        var $pa = $(this).parents('.popup-bg');

                        var link = $pa.find("input[name=link]").val();
                        var title = $pa.find("input[name=title]").val();

                        if( link.trim().length === 0 ){
                            common.toast({html: "活动链接不能为空"})
                            return false;
                        }
                        var $imgData=$img.cropper('getCroppedCanvas');
                        var dataurl = $imgData.toDataURL('image/png');  //dataurl便是base64图片

                        Interface.getAsynData({
                            url: "addbanner.php",
                            type: "post",
                            data: {
                                imgdata: dataurl,
                                link: link,
                                title: title
                            },
                            ifOpenLoading: true,
                        },function(res){
                            console.log(res)
                            if( res.code == "000" ){
                                t.render();
                                $(".popup-bg").remove();
                            }
                        },function(err){
                            console.log(err)
                        })

                    })
    
                })

                common.bindEvent("click", "#bannermanage .delete-item", function($this){
                    var id = $this.parent("td").data("id");
                    common.confirmCreate({
                        html: "是否确认删除",
                        callback: function(statu){
                            if( statu == 1 ){
                                Interface.getAsynData({
                                    url: "delete.php?index=0&id=" + id,
                                    ifOpenLoading: true,
                                },function(res){
                                    if( res.code == "000" ){
                                        t.render();
                                    }

                                },function(err){

                                })




                            }
                        }
                    })
                })
                
            }
        }).init(opt)
    }
});