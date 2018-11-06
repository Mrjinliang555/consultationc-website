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
                 // 渲染左边菜单
                 common.renderNav()
                t.render();
                t.bindEvents();
                t.getNewsList();
            },
            render: function () {
                var t = this;
                ;
            },
            bindEvents: function(){
                var t = this;
                common.bindEvent('click', '#newsclassification .delete-item', function($this){
                    var id = $this.data("id");
                    common.confirmCreate({
                        html: "是否确认删除该分类",
                        callback: function(statu){
                            if( statu == 1 ){
                                // console.log(id);
                                Interface.getAsynData({
                                    // type 1、查询 2、删除 3、修改 4、添加
                                    url: 'updatenewsclassificationlist.php',
                                    type: 'get',
                                    data: {type: 2,id: id},
                                    ifOpenLoading: true,
                                }, function(res){
                                    if( res.code == "000" ){
                                        t.getNewsList();
                                        common.toast({
                                            html: "删除成功"
                                        })
                                    }
                                })
                            }
                        }
                    })
                });
                common.bindEvent('click', '#newsclassification .add-sort', function($this){
                    common.confirmCreate({
                        html:"<input type='text' name='addsort' placeholder='请输入分类名称' />",
                        title:"添加分类",
                        callback: function(status,$t){
                            if( status == 1 ){
                                if( $t ){
                                    var val = $t.parents('.popup-box').find("input").val();
                                    // console.log(val);
                                    if ( val.trim().length >= 2 ){
                                        Interface.getAsynData({
                                            // type 1、查询 2、删除 3、修改 4、添加
                                            url: 'updatenewsclassificationlist.php',
                                            type: 'get',
                                            data: {type: 4, value: val},
                                            ifOpenLoading: true,
                                        }, function(res){
                                            // console.log( res )
                                            if( res.code == "000" ){
                                                t.getNewsList();
                                                common.toast({
                                                    html: "添加成功"
                                                })
                                            }else {
                                                common.toast({
                                                    html: res.msg || "添加失败"
                                                })
                                            }
                                        }, function(err){
                                            common.toast({
                                                html: err.msg || "添加失败"
                                            })
                                        })

                                    }else {
                                        common.toast({html: '不能为空'})
                                    }
                                }
                            }
                        }
                    })
                })
                
                
            },
            getNewsList: function(){
                var t = this;
                Interface.getAsynData({
                    // type 1、查询 2、删除 3、修改 4、添加
                    url: 'updatenewsclassificationlist.php',
                    type: 'get',
                    data: {type: 1},
                    ifOpenLoading: true,
                }, function(res){
                    // console.log( res )
                    if( res.code == "000" ){
                        common.setLocalStorage("newsList", res.data, true);
                        t.obj.html(template({list: res.data}));
                    }
                })
            }
        }).init(opt)
    }
});