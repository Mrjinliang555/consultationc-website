// JavaScript Document
$(function () {

    common.tipSystem({
        html: '9月12-23号，核保系统将进行系统升级，届时本系统将无法使用，请注意！',
        callback: function (data) {
        }
    });
    /* 清除缓存 */
    common.removelocalStorage('userInfo');
    common.removelocalStorage('proposalData');
    common.removelocalStorage('policyData');
    common.removelocalStorage('nav');
    common.removelocalStorage('answerData');
    common.removelocalStorage('docInfos');
    common.removelocalStorage('udid');
    common.removelocalStorage('times');
    common.removelocalStorage('timesZ');
    common.removelocalStorage('pendingData');
    //common.popup('.popup-new-edition'); //新版本提示
    $("[name=loginName]").on("focus", function () {
        if (common.isRunByApp) {
            ServerTime.getServerTime(onSuccess, onFail);

            function onSuccess(success) {
                $(".udid").find("span").text(success.result_udid);
            }

            function onFail() {
            }

        }
    });

    $('.popup-new-edition').on('click', '.btn-submit', function () {
        common.closePopup('.popup-new-edition');
    });

    $('.btn-login').on("click", function () {
        loginFn();
    });
    $('[name=loginName],[name=password]').on("keydown", function (e) {
        if (e.keyCode == 13) {
            loginFn();
        }
    });

    function loginFn() {
        var _a = $(".udid").find("span").html();
        common.setLocalStorage("udid", _a);
        if ($('[name=loginName]').val() == '') {
            common.alertCreate({
                html: '请输入用户代码！'
            })
            return false;
        }
        if ($('[name=password]').val() == '') {
            common.alertCreate({
                html: '请输入登录密码！'
            })
            return false;
        }
        var _data = $("#formLogin").serialize();
        _data += "&udid=" + $(".udid").find("span").text();
        var paramData = {
            ifOpenLoading: true,
            type: 'POST',
            url: 'insure/memeber/login',
            data: _data
        };
        Interface.getAsynData(paramData, function (data) {
            if (data.data.cashValue) {
                data.data.cashValue = JSON.parse(data.data.cashValue);
            }
            var s = data.data.agentAllInfo.branchs;
            var agentData = {
                agentId: data.data.agentId,
                agentName: data.data.agentName,
                cashValue: data.data.cashValue,
                familyAddress: '',
                workAddress: ''
            };
            if (s) {
                agentData.branch = s[2];
            } else {
                common.alertCreate({
                    html: '代理人信息获取失败！'
                });
                return false;
            }
            for (var key in data.data.agentAllInfo.contacts) {
                if (data.data.agentAllInfo.contacts[key].contactType == 'M') {
                    agentData.cellphone = data.data.agentAllInfo.contacts[key].contactNum
                }
            }

            for (var key in data.data.agentAllInfo.addresses) {
                var ads = data.data.agentAllInfo.addresses[key];
                if (ads.addrType == 'R') {
                    agentData.familyAddress = ads.addrProvince.toString() + ads.addrCity.toString() + ads.addrDist.toString() + ads.addrAddress1.toString();
                }
                if (ads.addrType == 'B') {
                    agentData.workAddress = ads.addrProvince.toString() + ads.addrCity.toString() + ads.addrDist.toString() + ads.addrAddress1.toString();
                }
            }
            common.setLocalStorage('userInfo', agentData, true);
            common.setLocalStorage('nav', data.data.bannerInfo, true);

            if (common.isRunByApp) {
                ServerTime.getServerTime(onSuccess, onFail);

                function onSuccess(success) {
                    common.setLocalStorage('times', success.result_data);

                }

                function onFail() {
                }
            } else {
                common.setLocalStorage('times', new Date());
            }
            return window.location.href = '../home/';
        }, function (error) {

            switch (error.code) {
                case '001': //不存在账号
                    common.alertCreate({
                        html: '<p>账号不存在！</p>',
                        callback: function (status) {
                            $('[name=loginName]').focusin();
                        }
                    });
                    break;
                case '002': //账号密码不匹配
                    common.alertCreate({
                        html: '<p>账号密码不匹配！</p>',
                        callback: function (status) {
                            $('[name=loginName]').focusin();
                        }
                    });
                    break;
                case '003': //黑名单
                    common.alertCreate({
                        html: '<p>您的账号已被禁用，请联系管理员！</p>'
                    });
                    break;
                default :
                    common.alertCreate({
                        html: error.message
                    });
            }
        });
    }
});

$.getData = function () {
    var paramData = {
        url: 'insure/common/relation/get'
    };
    Interface.getAsynData(paramData, function (data) {
    }, function (error) {
        common.alertCreate({html: error.message})
    });
}
