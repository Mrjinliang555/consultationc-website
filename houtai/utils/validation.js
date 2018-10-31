var validation = validation || {};

!function ($, e) {
    /* 全角转半角 */
    e.toCDB = function (str) {
        var tmp = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
            }
            else {
                tmp += String.fromCharCode(str.charCodeAt(i));
            }
        }
        return tmp
    };
    /* 获取字符串长度（中文+字符） */
    e.getByteLen = function (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    };

    /* 验证是否为空 */
    e.isNull = function (val) {
        return ($.trim(val) === '');
    };

    /* 验证字符串中包含空格 */
    e.hasNull = function (val) {
        if (e.isNull(val)) return false;
        return /\s/.test(val);
    };

    /* 验证保额 */
    e.coverage = function (val) {
        var reg = /\./g, int = /^\d$/g, zero = /^[1-9]{1}\d+$/g, legalNum = /\d+/g;
        if (reg.test(val)) { // 有小数
            var ret = val.toString().split('.');
            if (int.test(ret[0] + '' + ret[1])) { // 是否是数字
                return false;
            } else {
                return true;
            }
        } else { // 无小数
            if (!legalNum.test(val)) { // 是否是数字
                return false;
            } else if (!zero.test(val)) { // 是否以0开头
                return false;
            } else {
                return true;
            }
        }
    };

    /* 验证日期 2010-1-1 */
    e.date = function (val) {
        return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(val));
    };

    /* 验证时间 12:23:42 */
    e.time = function (val) {
        return (/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/.test(val));
    };

    /* 银行卡卡号验证 */
    e.bankNoValidate = function (val) {
        return (/^\d{6,19}$/g.test(val));
    };

    /* 验证日期时间 */
    e.datetime = function (val) {
        return (/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(val));
    };

    /* 验证邮箱地址 */
    e.email = function (val) {
        if (e.hasNull(val)) return false;
        return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
    };

    /* 验证手机号码 */
    e.mobile = function (val) {
        return (/1\d{10}/.test($.trim(val)));
    };

    /* 验证座机号码 */
    e.telephone = function (val) {
        return (/^\(?(0\d{2,3}-?)?\)?\d{7,8}$/.test(val));
    };

    /* 邮政编码校验 */
    e.postCode = function (val) {
        return (/^\d{6}$/.test(val));
    };

    /* 验证字符长度范围 */
    e.range = function (val, _min, _max) {
        return (eval('/^.{' + _min + ',' + _max + '}$/').test(val));
    };

    /* 身份证验证  */
    e.idcard = function (val) {
        var idcard = val.toUpperCase();
        var area = {
            "11": "北京",
            "12": "天津",
            "13": "河北",
            "14": "山西",
            "15": "内蒙古",
            "21": "辽宁",
            "22": "吉林",
            "23": "黑龙江",
            "31": "上海",
            "32": "江苏",
            "33": "浙江",
            "34": "安徽",
            "35": "福建",
            "36": "江西",
            "37": "山东",
            "41": "河南",
            "42": "湖北",
            "43": "湖南",
            "44": "广东",
            "45": "广西",
            "46": "海南",
            "50": "重庆",
            "51": "四川",
            "52": "贵州",
            "53": "云南",
            "54": "西藏",
            "61": "陕西",
            "62": "甘肃",
            "63": "青海",
            "64": "宁夏",
            "65": "新疆",
            "71": "台湾",
            "81": "香港",
            "82": "澳门",
            "91": "国外"
        };
        var Y, JYM;
        var S, M;
        var idcard_array = [];
        idcard_array = idcard.split("");
        var ereg, eregNow;
        if (area[parseInt(idcard.substr(0, 2))] == null) {
            return false;
        }
        ;
        if (idcard.length === 18) {
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
                eregNow = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
                eregNow = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
            }
            ;

            if (ereg.test(idcard) || eregNow.test(idcard)) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);
                return M == idcard_array[17] ? true : false;
            } else {
                return false;
            }
        }
        return false;
    };

    /*护照验证*/
    e.passport = function (val) {
        return /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,18}$/.test(val);
    }

    /*出生证验证*/
    e.birth = function (val) {
        return /^[A-Z]{1}[0-9]{7}(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65)$/g.test(val);
    }

    /*军人证验证*/
    e.armyman = function (val) {
        var flag;
        if (/^[A-Za-z]{10,18}$/g.test(val) || /^[0-9]{10,18}$/g.test(val)) {
            flag = false;
        } else {
            flag = /[a-zA-Z0-9]{10,18}/g.test(val);
        }
        return flag;
    }

    /*台胞证验证*/
    e.Taiwan = function (val) {
        return (/^[0-9]{8}$/g.test(val));
    }

    /*回乡证验证*/
    e.goHome = function (val) {
        if (val.length == 9) {
            return (/^[a-zA-Z]{1}[0-9]{8}/g.test(val));
        } else if (val.length == 11) {
            return (/^[a-zA-Z]{1}[0-9]{10}$/g.test(val));
        }
    }

    /*姓名验证*/
    e.name = function (val) {
        return (!/[\·*]/g.test(val)&&(/^[\u4e00-\u9fa5|\u3400-\u4DB5|\u9FA6-\u9FBB|\uF900-\uFA2D|\uFA30-\uFA6A|\uFA70-\uFAD9|\ud852\udcf1\·]{2,30}$/g.test(val) || /^[a-zA-Z\'\s*]{2,50}$/g.test(val)));
    }
    6
    /*整数金额验证*/
    e.money = function (val) {
        return (/^([1-9][0-9]*)$/g.test(val));
    }

    /*年收入验证*/
    e.income = function (val) {
        return val.length == 1 ? /^[0-9]{0,6}$/g.test(val) : /^[1-9]{1}[0-9]{0,5}$/g.test(val);
    }

    /*年龄验证*/
    e.age = function (val) {
        if (e.hasNull(val)) return false;
        return /^0$|(^[1-9][0-9]{0,2}$)/g.test(val);
    }

    /*详细地址验证*/
    e.address = function (val) {
        return this.getByteLen(val) > 50 ? false : true;
    }

    /*职业代码*/
    e.jobCode = function (val) {
        return (/[0-9]{4}/g.test(val));
    }

    /* 证件类型与号码匹配验证 */
    e.checkCard = function (val, type) {
        var _status = true;
        var _message = '';
        if (!val) {
            return {'status': _status, 'message': _message};
        }
        switch (type) {
            case "111":
                if (!validation.idcard(val)) {
                    _status = false;
                }
                break;
            case "113":
                if (!validation.idcard(val)) {
                    _status = false;
                }
                break;
            case "414":
                if (!validation.passport(val)) {
                    _status = false;
                }
                break;
            case "117":
                if (!validation.birth(val)) {
                    _status = false;
                }
                break;
            case "114":
                if (!validation.armyman(val)) {
                    _status = false;
                }
                break;
            case "511":
                if (!validation.Taiwan(val)) {
                    _status = false;
                }
                break;
            case "516":
                if (!validation.goHome(val)) {
                    _status = false;
                }
                break;
            default:
                break;
        }
        _message = _status ? '' : '证件号码格式不正确，请重新填写！';
        return {'status': _status, 'message': _message};
    };
    e.checkEmail = function (ipt, callback) {
        var _name = ipt.attr('name');  //获取 name值
        var _val = $.trim(ipt.val());  //获取 value值
        var _type = $('input[name=identityType]:checked').val(); // 表单提交时获取当前证件类型
        var _status = true;
        var message = '';
        if (_val === '') {
            return {"obj": ipt, "status": _status, "message": message};
        }
        switch (_name) {

            case 'email':
                _status = validation.email(_val);
                message = '邮箱格式不正确，请重新填写！';
                break;

        }
        return {"obj": ipt, "status": _status, "message": message};
    };
    e.checkVali = function (ipt, callback) {
        var _name = ipt.attr('name');  //获取 name值
        var _val = $.trim(ipt.val());  //获取 value值
        var _type = $('input[name=identityType]:checked').val(); // 表单提交时获取当前证件类型
        var _status = true;
        var message = '';
        if (_val === '') {
            return {"obj": ipt, "status": _status, "message": message};
        }
        switch (_name) {
            case 'name':
                if (validation.getByteLen(_val) > 50) {
                    _status = false;
                    message = '姓名长度超出范围，请重新填写！';
                    break;
                }
                _status = validation.name(_val);
                message = '姓名应为2位至30位字符的中文或英文，请重新填写！';
                break;
            case 'birthday':
                _status = validation.date(_val);
                message = '出生日期格式不正确，请重新选择！';
                break;
            case 'age':
                _status = validation.age(_val);
                // message = '年龄应为3位以下的整数';
                 var birdthday = ipt.parents('.ui-form').find('[name=birthday]').val();
                 //_status = false;
                //  if(birdthday && _val != common.getAge(birdthday)){
                //  	_status = false;
                //  	message = '年龄与出生日期不相符，请确认！';
                //  }
                break;
            case 'identityCode':
                _val = validation.toCDB(_val);
                _val = _val.toUpperCase();
                ipt.val(_val);
                _status = validation.checkCard(_val, _type).status;
                message = validation.checkCard(_val, _type).message;
                break;
            case 'cellphone':
                _status = validation.mobile(_val);
                message = '手机号格式不正确，请重新填写！';
                if (_status && _val == userInfo.cellphone) {
                    _status = false;
                    message = '手机号码不可与营销员手机号一致';
                }
                break;
            // case 'email':
            //     _status = validation.email(_val);
            //     message = '邮箱格式不正确，请重新填写！';
            //     break;
            case 'jobCode':
                _status = validation.jobCode(_val);
                message = '请输入正确的职业代码！';
                break;
            case 'familyIncome':
                _status = validation.income(_val);
                message = '家庭全年收入最多仅支持6位正整数数字！';
                break;
            case 'personalIncome':
                _status = validation.income(_val);
                message = '个人全年收入最多仅支持6位正整数数字！';
                break;
            case 'familyAddrDetail':
                _status = validation.address(_val);
                message = '详细地址长度超出范围！';
                break;
            case 'workAddrDetail':
                _status = validation.address(_val);
                message = '详细地址长度超出范围！';
                break;
            case 'familyPostcode':
                _status = validation.postCode(_val);
                message = '仅支持6位数字！';
                break;
            case 'workPostcode':
                _status = validation.postCode(_val);
                message = '仅支持6位数字！';
                break;
            case 'unitName':
                _status = validation.address(_val);
                message = '单位名称长度超出范围！';
                break;
            case 'bankNo':
                _status = validation.bankNoValidate(_val);
                message = '请输入正确的银行卡号！'
                break;
        }
        return {"obj": ipt, "status": _status, "message": message};
    };

    e.checkValiMust = function (form, callback) {
        var _status = true;
        var arr = form.serializeArray();
        for (var i in arr) {

            var _obj = form.find('[name=' + arr[i].name + ']');
            console.log(_obj.attr('id'))
            if (_obj.data('must') === 1 && $.trim(_obj.val()) === '' && _obj.attr('id') != 'birthday') {
                var _name = _obj.data('mustname');
                common.alertCreate({
                    html: _name + '是必填项，不能为空！',
                    callback: function () {
                        _obj.focus();
                    }
                });
                _status = false;
                break;
            }
            var _ipt = e.checkVali(_obj);
            if (!_ipt.status) {
                _status = _ipt.status;
                common.alertCreate({
                    html: _ipt.message,
                    callback: function () {
                        _obj.focus();
                    }
                });
                break;
            }
        }
        return _status;
    }

}(window.Zepto, window.validation);
