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
                t.userInfo = common.getLocalStorage("userInfo", true) || [];
                t.keyWordArr = [];
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

                    var error = {
                        title: '请输入文章标题',
                        category: '请选择文章所属分类',
                        content: '请填写文章内容'
                    }
                   
                    var parmeat = {},$form = $("#addnews");

                    // 文章标题
                    parmeat.title = $form.find('[name=title]').val().trim();
                    // 所属分类
                    parmeat.category = $form.find('[name=category]').val();
                    
                    //文章内容 // 获取编辑框内容的方法：
                    parmeat.content = $('#summernote').summernote('code');

                    for(var k in parmeat){
                        if(  !parmeat[k] ){
                            common.toast({html:error[k]});
                            return false;
                        }
                    }
                    //状态
                    parmeat.status = $form.find('[name=status]:checked').val();
                    // 是否原创
                    parmeat.only = $form.find('[name=only]:checked').val();

                    if( parmeat.only === '1' ){
                        parmeat.source = t.userInfo.nickname;
                    }else {
                        parmeat.source = $form.find('[name=source]').val().trim();
                        if( parmeat.source.length === 0  ){
                            common.toast({html:'请输入文章来源'});
                            return false;
                        }
                    }

                    // 是否置顶
                    parmeat.isTop = $form.find('[name=istop]:checked').val();
                     // 有效时间
                    parmeat.effectiveTime = $form.find('#effectiveTime').val().trim() || '2118-11-23';

                    if( parmeat.effectiveTime !== '2118-11-23'  ){
                        var now = new Date();
                        // console.log(new Date(parmeat.effectiveTime).getHours());
                        var timeF = (new Date(parmeat.effectiveTime))/1;
                        if( (timeF - now) < 86400000){
                            common.toast({html:'有效时间最少为一天'});
                            return false;
                        }
                        
                    }
                  
                    // 是否为定时发布
                    parmeat.isTiming = $('.set-time-btns input').prop('checked');
                    var now1 = new Date();
                    
                    if( parmeat.isTiming ){
                        var date = $form.find("#effectiveTimeOfData").val().trim();
                        var hour = $form.find("#effectiveTimeOfHour").val().trim();
                        if( !date.length || !hour.length ){
                            common.toast({html: '请选择定时发布时间'});
                            return ;
                        }
                        var dateArr = date.split('-');
                        var hourArr = hour.split(':');

                        var timeNumber = new Date(parseInt(dateArr[0]),parseInt(dateArr[1]-1),parseInt(dateArr[2]),parseInt(hourArr[0]),parseInt(hourArr[1]),parseInt(hourArr[2]));
                       
                        if( (timeNumber - now1) < 3600000 ){
                            common.toast({html:'定时时间不得小于一小时'});
                            return false;
                        }
                        parmeat.creatTime = date + " " + hour;
                    }else {
                        parmeat.creatTime = "";
                    }
                    parmeat.author = t.userInfo.nickname;
                    parmeat.authorPto = t.userInfo.photo;
                    parmeat.keyWord = t.keyWordArr.join();
                   
                    Interface.getAsynData({
                        url: 'savearticle.php',
                        data: parmeat,
                        type: 'post'
                    }, function(res){
                        console.log(res)
                    },function(err){
                        console.log(err)
                    })

                })
                common.bindEvent("click", "#infodiffusion .add-article", function($this){
                    var template = require('./component/addnews.html');
                    template = doT.template(template);
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
                });

                common.bindEvent("change", "#addnews [name=only]", function($this){
                    var val = $this.val();
                    if( val === '1' ){
                        $('#addnews #source').addClass('hide');
                    }else {
                        $('#addnews #source').removeClass('hide');
                    }
                });

                common.bindEvent("click", "#addnews .add-key-word-btn", function($this){
                    $("#keylabel .add-key-word").toggleClass("hide");
                });

                common.bindEvent("click", "#addnews .add-keyword-btn", function($this){
                    if( t.keyWordArr.length === 4 ){
                        common.toast({html:'最多只能添加4组关键词'});
                        return false;
                    }
                    var $parent = $("#keylabel");
                    var str = $parent.find('.add-key-word input').val().trim();
                    if( str.length > 0 || str.length > 8){
                        t.keyWordArr.push( str );
                        $parent.find('.keyword-box').append('<li><span>' + str + '</span><em>x</em></li>');
                        $parent.find('input').val('');
                    }else {
                        common.toast({html:'关键词长度在8个字符以内'});
                        return false;
                    }
                    $parent.find('.add-key-word').addClass('hide'); 
                });

                common.bindEvent("click", "#addnews .keyword-box em", function($this){
                    var idx = $this.index();
                    $this.parent().remove();
                    if(  t.keyWordArr.length === 1 ){
                        t.keyWordArr.length = [];
                    }else {
                        t.keyWordArr.splice(idx,1);
                    }
                    console.log(  t.keyWordArr );
                   
                });

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
                                // console.log(res)
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