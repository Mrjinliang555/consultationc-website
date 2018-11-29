define(function (require, exports, module) {
    // require('moment');
    require('../../css/cropper.min.css');
    require('../../css/summernote.css');
    require('../../css/pagination.css');
    require('summernote');
    require('laydate');
    require('cropper');
    require('pagination');

    var template = require('./infodiffusion.html');
    template = doT.template(template);

        // 第几页
    var curPage = 1;
        //每页条数
    var pageSize = 5;
        // 总条数
    var totalPage = 0;
        // 总页码数
    var pageNum = 0;
        // 文章列表
    var articleList = [];
 

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
                t.articleList = [];
                t.keyWordArr = [];
                 // 渲染左边菜单
                common.renderNav(0,0,2);
                t.render();
                t.bindEvents();
            },
            render: function () {
                var t = this;
                Interface.getAsynData({
                    url: 'queryarticle.php',
                    data: {
                        page:curPage,
                        size:pageSize
                    }
                }, function(res){
                    if(res.code=='000'&&res.data.length) {
                        pageNum = Math.ceil( res.count/pageSize );
                        totalPage = res.count;
                        articleList = res.data;
                        t.obj.html(template({list:res.data,user: t.userInfo.nickname}));
                        t.setPagination(res.count, 0, pageSize);
                    }
                },function(err){
                    console.log(err)
                })
            },
            pageJump: function(idx, user){
                if( idx !== undefined ){
                    curPage = idx + 1;
                }
                Interface.getAsynData({
                    url: 'queryarticle.php',
                    data: {
                        page:curPage,
                        size:pageSize
                    }
                }, function(res){
                    if(res.code=='000' && res.data.length) {
                        totalPage = res.count;
                        pageNum = Math.ceil( res.count/pageSize );
                        // console.log( pageNum );
                        articleList = res.data;
                        if( res.count <= pageSize ) $('#infodiffusion .pagination-container').html('');
                        var temp = '{{~it.list :val:idx }}\
                        <tr>\
                            <td width="3%"><input type="checkbox"></td>\
                            <td width="2%">{{=val.isTop==1?\'是\':\'否\'}}</td>\
                            <td width="2%">{{=val.extension==1?\'是\':\'否\'}}</td>\
                            <td width="5%">{{=val.author}}</td>\
                            <td width="10%"><input type="text" value="{{=val.title}}" readonly></td>\
                            <td width="5%">{{=common.formatTime(val.creatTime)}}</td>\
                            <td width="5%">{{=common.formatTime(val.effectiveTime)}}</td>\
                            <td width="3%" style="{{= \'color:\' + (val.status == 1 ? \'green\':\'red\')}}">{{=val.status == 1 ? \'发布中\':\'草稿箱\'}}</td>\
                            <td width="5%">\
                            {{? it.user == val.author }}\
                                <button data-id="{{=val.id}}" type="button" class="btn btn-primary extents-item" >\
                                        编辑\
                                </button>\
                                <button data-id="{{=val.id}}" class="btn btn-danger delete-item">删除</button>\
                            </td>\
                            {{??}}\
                            <p>您无权操作</p>\
                        {{?}}\
                        </tr>\
                        {{~}}'
                        temp = doT.template(temp);
                        $("#infodiffusion tbody").html(temp({list: res.data,user: user}));
                    };
                })
            },
            bindEvents: function(){
                var t = this;
                common.bindEvent("click", "#infodiffusion .btn-release", function($this){
                    // t.keyWordArr = [];
                    var error = {
                        title: '请输入文章标题',
                        category: '请选择文章所属分类',
                        content: '请填写文章内容',
                        abstract: '请填写文章摘要'
                    }
                   
                    var parmeat = {},$form = $("#addnews");

                    // 文章标题
                    parmeat.title = $form.find('[name=title]').val().trim();
                    // 所属分类
                    parmeat.category = $form.find('[name=category]').val();
                    
                    //文章内容 // 获取编辑框内容的方法：
                    parmeat.content = $('#summernote').summernote('code');
                    parmeat.abstract = $form.find('#abstract').val();
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
                    //是否推广
                    parmeat.extension = $form.find('[name=extension]:checked').val();
                     // 有效时间
                    parmeat.effectiveTime = $form.find('#effectiveTime').val().trim() || 2147483647;

                    if( parmeat.effectiveTime !== 2147483647  ){
                        var now = new Date();
                        // console.log(new Date(parmeat.effectiveTime).getHours());
                        var timeF = (new Date(parmeat.effectiveTime))/1;
                        if( (timeF - now) < 86400000){
                            common.toast({html:'有效时间最少为一天'});
                            return false;
                        }
                        parmeat.effectiveTime = parseInt(timeF/1000);
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
                        
                        // var dateArr = date.split('-');
                        // var hourArr = hour.split(':');

                        var timeNumber = (new Date(date + " " + hour))/1;
                       
                        if( (timeNumber - now1) < 3600000 ){
                            common.toast({html:'定时时间不得小于一小时'});
                            return false;
                        }
                        parmeat.creatTime = timeNumber/1000;
                    }else {
                        var creatTM = $this.data('crearttime');
                        parmeat.creatTime = creatTM || parseInt(now1/1000);
                    }
                   
                    parmeat.keyWord = t.keyWordArr.join();

                    var $img = $("#picture-preview-fengmian");
                    
                    if( $img.length ){
                        var $imgData=$img.cropper('getCroppedCanvas');
                        if( $imgData.toDataURL ){
                            parmeat.coverImg = $imgData.toDataURL('image/png');  //dataurl便是base64图片
                        }else {
                            var oldSrc = $img.attr('src');
                            if( oldSrc ){
                                var idx = oldSrc.lastIndexOf('/')+1;
                                oldSrc = oldSrc.substr(idx);
                            }
                            parmeat.coverImg = oldSrc;
                        }
                    }else {
                        parmeat.coverImg = "";
                    }

                    var arcId = $this.data('id');

                    if( arcId && arcId != "undefined"){
                        reqUrl = 'uapdatearticle.php';
                        parmeat.arcId = arcId;
                    }else{
                        reqUrl = 'savearticle.php';
                        parmeat.author = t.userInfo.nickname;
                        parmeat.authorPto = t.userInfo.photo;
                    }

                    console.log( parmeat );
                    return false;

                    Interface.getAsynData({
                        url: reqUrl,
                        data: parmeat,
                        type: 'post'
                    }, function(res){
                        if( res.code == "000" ){
                            $('.alert-popup-bg').remove();
                            common.toast({html: res.msg});
                            if( !parmeat.arcId ){
                                if( Math.ceil((totalPage+1)/pageSize) > pageNum ){
                                    pageNum++;
                                }
                                curPage = pageNum;
                                // console.log( totalPage+1,curPage-1,pageSize );
                                t.setPagination(totalPage+1,curPage-1,pageSize);
                            }
                            t.pageJump(undefined,t.userInfo.nickname);
                            t.keyWordArr = [];
                            // $form.find('form')[0].reset();
                            // $form.find('#source').addClass('hide');
                            // $form.find('#set-time-item').addClass('hide');
                            // $form.find('.panel-body').text('');
                            // t.keyWordArr = [];
                            // $form.find('ul').html('');
                            // $form.find('.picture-preview-box').html('<img id="picture-preview-fengmian" src="" alt="">');
                        }
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
                // 编辑文章
                common.bindEvent('click', '#infodiffusion .extents-item', function($this){
                    var id = $this.data("id");
                    var info = articleList.filter(function(v){
                        return v.id == id;
                    })[0];
                    t.keyWordArr = [];
                    if( info.keyWord.length ){
                        t.keyWordArr = info.keyWord = info.keyWord.split(',');
                    }
                    console.log( info );
                    var template = require('./component/addnews.html');
                    template = doT.template(template);
                    $("#infodiffusion").append(template({newsList:t.newsList,info: info}));
                    t.renderSummernote();
                    laydate.render({elem: '#effectiveTime'});
                    laydate.render({elem: '#effectiveTimeOfData'});
                    laydate.render({elem: '#effectiveTimeOfHour',type: 'time'});
                })
                // 删除文章
                common.bindEvent('click', '#infodiffusion .delete-item', function($this){
                    var id = $this.data("id");
                    common.confirmCreate({
                        html: "是否确认删除这条内容",
                        callback: function(statu){
                            if( statu == 1 ){
                                // console.log(id);
                                Interface.getAsynData({
                                    // type 1、查询 2、删除 3、修改 4、添加
                                    url: 'deletearticle.php?id=' + id,
                                    type: 'get',
                                    ifOpenLoading: true,
                                }, function(res){
                                    if( res.code == "000" ){
                                        if( Math.ceil((totalPage-1)/pageSize) < pageNum ){
                                            // console.log(6666)
                                            if( curPage ==  pageNum){
                                                curPage--;
                                            }
                                            pageNum--;
                                            t.setPagination(totalPage-1,curPage&&curPage-1,pageSize);
                                        }
                                        t.pageJump(undefined,t.userInfo.nickname);
                                        common.toast({
                                            html: "删除成功"
                                        })
                                    }
                                })
                            }
                        }
                    })
                });

                common.bindEvent("input", "#addnews #abstract", function($this){
                    var val = $this.val();
                    if( val && val.length > 200 ){
                        $this.val( val.substr(0,200)  );
                        return false;
                    }
                    var $span = $this.next().find('span');
                    $span.text( val.length );
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
                });

                common.bindEvent("change", "#addnews .fengmian-btn", function($this){
                    var $file = $this;
                    var fileObj = $file[0];
                    var windowURL = window.URL || window.webkitURL;
                    var dataURL;
                    var $img = $("#picture-preview-fengmian");
                    if(fileObj && fileObj.files && fileObj.files[0]){
                        dataURL = windowURL.createObjectURL(fileObj.files[0]);
                        $img.attr('src',dataURL);
                    }else{
                        dataURL = $file.val();
                        var imgObj = document.getElementById("picture-preview-fengmian");
                        imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
                    }
                    $img.cropper({
                        aspectRatio: 1.611/1,         //1 / 1,  //图片比例,1:1
                        autoCropArea: 1,
                        cropBoxResizable:false,
                        cropBoxMovable:false,//是否拖动裁剪框
                        dragMode: 'move',
                        restore: false,
                        guides:false
                    });
                    $img.cropper('replace',dataURL);
                });

            },
            // 富文本的图片上传到服务器
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
            },
            setPagination: function(total, idx, pageSize){
                var t = this;
                console.log( t.userInfo.nickname )
                $('#infodiffusion .pagination-container').pagination(total,    //分布总数量，必须参数
                {
　　　　　　　　　　  callback: function(idx){
                        t.pageJump(idx, t.userInfo.nickname);
                    },  //PageCallback() 为翻页调用次函数。
                    prev_text: "上一页",
                    next_text: "下一页",
                    link_to:"javascript:;",
                    items_per_page:pageSize,
                    load_first_page:false, //是后执行一次callback
                    num_edge_entries: 2,       //两侧首尾分页条目数
                    //num_display_entries: 10,    //连续分页主体部分分页条目数
                    current_page: idx,   //当前页索引
                    //link_to: "?id=__id__"  //分页的js中会自动把"__id__"替换为当前的数。0　
　　　        });
            },
        }).init(opt);
    }
});