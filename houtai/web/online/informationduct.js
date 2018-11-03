define(function (require, exports, module) {
    // require('moment');
    require('cropper');
    require('../../css/cropper.min.css');

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
                $('.menu-bar .first-order li').eq(5).addClass('active').siblings().removeClass('active');
                $('.menu-bar .secont-order .item').eq(5).show().siblings().hide();
                if( !window.onlyInitOnec ) {
                    window.onlyInitOnec = true;
                   $('.menu-bar .show-hide-btn').addClass('current');
                }
            },
            bindEvents: function(){

                var t = this;

                common.bindEvent('click', '#informationduct .i-nav li:not(.cur)', function($this){
                    $this.addClass('cur').siblings().removeClass('cur');
                    var idx = $this.index();
                    $('#informationduct .item').eq(idx).removeClass('hide').siblings().addClass('hide');
                })
                    // 保存头像
                common.bindEvent('change', "#informationduct #chooseImg" ,t.cropperConfig);

                // 修改信息
                common.bindEvent('click', "#informationduct .info-part .btn-info" ,function(){
                   
                    var phone = $("#informationduct [name=phone]").val();
                    var addr = $("#informationduct [name=addr]").val()||null;
                    var email = $("#informationduct [name=email]").val()||null;
                    // console.log(phone)
                    if( phone.trim().length === 0 || phone.length != 11 ){
                        common.toast({html: '请输入长度11位的手机号码'})
                        return false;
                    }
                    // console.log( userInfo.phone == phone,userInfo.addr==addr,userInfo.email == email )
                    if( userInfo.phone == phone && userInfo.addr==addr && userInfo.email == email  ){
                        common.toast({html: '您还没有修改信息'})
                        return false;
                    }

                    var paramData = {
                        data: {
                            phone: phone,
                            id: userInfo.id
                        },
                        url: 'updateuserinfo.php',
                        type: 'post'
                    }
                    if( addr ) paramData.data.addr = addr;
                    if( email ) paramData.data.email = email;

                    Interface.getAsynData(paramData, function(res){
                        if( res.code == "000" ){
                            userInfo.phone = phone;
                            if( addr ) userInfo.addr = addr;;
                            if( email ) userInfo.email = email;
                            common.setLocalStorage('userInfo', userInfo, true); 
                            common.confirm({html: '修改成功'})   
                        }else {
                            common.confirm({html: '修改失败'}) 
                        }
                    },function(){
                        common.confirm({html: '修改失败'}) 
                    })

                });
                //修改密码
                common.bindEvent('click', "#informationduct .password-part .btn-info" ,function(){
                    var oldPwd = $('.old-pwd').val();
                    var newPwd = $('.new-pwd').val();
                    var repeatPwd = $('.repeat-pwd').val();

                    if( oldPwd != userInfo.password ){
                        common.toast({html: '原密码不正确!'})
                        return false;
                    }

                    var len = newPwd.trim().length;

                    if( len === 0 || len < 6 || len > 12){
                        common.toast({html: '新密码长度为6-12位!'})
                        return false;
                    }
                    if( newPwd == oldPwd ){
                        common.toast({html: '新密码不能与原密码相同!'})
                        return false;
                    }
                    
                    if( newPwd != repeatPwd ){
                        common.toast({html: '两次输入的密码不一样!'})
                        return false;
                    }

                    var paramData = {
                        data: {
                            password: newPwd,
                            id: userInfo.id
                        },
                        url: 'updateuserinfo.php',
                        type: 'post'
                    }
                    Interface.getAsynData(paramData, function(res){
                        if( res.code == "000" ){
                            userInfo.password = newPwd;
                            common.setLocalStorage('userInfo', userInfo, true); 
                            $('.old-pwd').val('');
                            $('.new-pwd').val('');
                            $('.repeat-pwd').val('');

                            common.confirm({html: '修改成功'})   
                        }else {
                            common.confirm({html: '修改失败'}) 
                        }
                    },function(){
                        common.confirm({html: '修改失败'}) 
                    })



                })

                
            },
            cropperConfig: function($this){
                var $file = $this;
                var fileObj = $file[0];
                var windowURL = window.URL || window.webkitURL;
                var dataURL;
                var $img = $("#preview");

                if(fileObj && fileObj.files && fileObj.files[0]){
                    dataURL = windowURL.createObjectURL(fileObj.files[0]);
                    $img.attr('src',dataURL);
                }else{
                    dataURL = $file.val();
                    var imgObj = document.getElementById("preview");
                    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                }

                $img.cropper({
                    aspectRatio: 1/1 ,         //1 / 1,  //图片比例,1:1
                    autoCropArea: 0.9,
                    cropBoxResizable:false,
                    cropBoxMovable:false,//是否拖动裁剪框
                    dragMode: 'move',
                    restore: false,
                    guides:false,
                      crop: function(data) {
                          var $imgData=$img.cropper('getCroppedCanvas')
                          var dataurl = $imgData.toDataURL('image/png');
                          $("#previewyulan").attr("src",dataurl);
                      },
                });
                $img.cropper('replace',dataURL);
                $("body").unbind("click").on("click","#saveUserPhoto",function(){
                    var $imgData=$img.cropper('getCroppedCanvas')
                    var dataurl = $imgData.toDataURL('image/png');  //dataurl便是base64图片
                    // console.log( dataurl )
                    Interface.getAsynData({
                        type: 'post',
                        url: 'updatephoto.php',
                        data: {
                            id: userInfo.id,
                            filedate: dataurl
                        },
                        ifOpenLoading: true,
                    }, function(res){
                        console.log( res )
                        if( res.code == "000" ){
                            // userInfo = res.data;
                            $('#informationduct .img-part img').attr('src', '/mynameisljl/consultationc-website/phptest/upload/'+res.data.photo);
                            $('.header img').attr('src', '/mynameisljl/consultationc-website/phptest/upload/' + res.data.photo);
                            $('#informationduct .item').eq(0).removeClass('hide').siblings().addClass('hide');
                            $('#informationduct .i-nav li').eq(0).addClass('cur').siblings().removeClass('cur');
                            common.toast({html: '上传成功！'})
                        }else {
                            common.toast({html: '保存失败！'})
                        }
                    }, function(err){
                        console.log(err)
                        common.toast({html: '保存失败！'})
                    })
                    // $('.layui-circle', window.parent.document).attr("src",dataurl);
                    
                });
               
            }
        }).init(opt)
    }
});