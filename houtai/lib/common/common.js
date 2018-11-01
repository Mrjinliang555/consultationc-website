var common = common || {};

common.loading = {};

common.bindEvent = function (events, selector, callback) {
    $(document).off(events, selector).on(events, selector, function (e) {
        e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        callback($(this))
    });
}

common.confirmCreate = function (params) {
    var options = {
        html: params.html,
        callback: function (number) {
        }
    };

    var pa = $.extend({}, options, params);
    var _popup = '\
    <div class="popup-bg">\
		<div class="popup-box popup-confirm">\
			<div class="popup-header">\
                <h2>提示</h2>\
			</div>\
			<div class="popup-content">\
				<div class="text">' + pa.html + '</div>\
				<div class="button">\
					<button type="button" class="btn btn-default btn-confirm-cancel">取消</button>\
					<button type="button" class="btn btn-success btn-confirm-confirm">确定</button>\
				</div>\
			</div>\
        </div></div>';
    $("body").append($(_popup));
    $('.btn-confirm-cancel').one('click', function () {
        $.isFunction(pa.callback) && pa.callback(0);
        $('.popup-bg').remove();
    });
    $('.btn-confirm-confirm').one('click', function () {
        $.isFunction(pa.callback) && pa.callback(1);
        $('.popup-bg').remove();
    });
};
common.confirm = function (params) {
    var options = {
        html: params.html,
        callback: function (number) {
        }
    };

    var pa = $.extend({}, options, params);
    var _popup = '\
    <div class="popup-bg">\
		<div class="popup-box popup-confirm">\
			<div class="popup-header">\
                <h2>提示</h2>\
			</div>\
			<div class="popup-content">\
				<div class="text">' + pa.html + '</div>\
				<div class="button">\
					<button type="button" class="btn btn-success btn-confirm-confirm">确定</button>\
				</div>\
			</div>\
        </div></div>';
    $("body").append($(_popup));
    $('.btn-confirm-confirm').one('click', function () {
        $.isFunction(pa.callback) && pa.callback();
        $('.popup-bg').remove();
    });
};


common.getRandomCode = function () {
    var date = new Date();
    return date.getTime() + common.getMathRand(5);
};

common.getSignature = function (randomcode) {
    var openname = 'fwd';
    var openkey = 'fairyland';
    return $.md5($.md5(openname + openkey) + randomcode);
}

common.toast = function (params) {
    var options = {
        html: params.html,
        time: 1500
    };

    var pa = $.extend({}, options, params);
    if ($('.popup-toast').size() > 0) {
        $('.popup-toast').remove();
    }
    var _popup = '\
        <div class="popup-toast" style="opacity: 0;">\
            <div class="toast-content">\
                <div class="text">' + pa.html + '</div>\
            </div>\
        </div>';
    $("body").append($(_popup));
    $('.popup-toast').animate({opacity: 1}, 300);
    var toastTimer = setTimeout(function () {
        $('.popup-toast').remove();
        clearTimeout(toastTimer);
    }, pa.time);
}
//加载框
common.loading.create = function (msg) {
    var h = new Array();
    h.push("<div id='cpic_ui_mask1' type='loading_type' class='cpic_ui_mask' style='display:none'></div>");
    h.push("<div id='cpic_ui_loading1' type='loading_type' style='display:none;position:fixed;z-index:6000;text-align:center;'><div class='cpic_ui_loading' style='left:50%;margin-left:-95px'></div><div id='loadingMessage' style='margin-top:5em;color:#bbb'>" + msg + "</div></div>");
    h = $(h.join(""));
    $("body").append(h);
};

common.isNull = function (value) {
    return typeof value == 'undefined' || value === "" || value == null || value == undefined;
};
common.isNotNull = function (value) {
    return !common.isNull(value);
};
common.loading.open = function (msg) {
    if (common.isNull(msg)) {
        msg = "";
    } else {
        msg += "...";
    }
    var _html = '<div class="system-loading"><p></p></div>';
    if ($('.system-loading').size() > 0) $('.system-loading').remove();
    $('body').append(_html);
};
common.loading.refresh = function () {
    $win = $(window);
    var ret = {
        top: (($win.height() - 180) / 2 + 5) + "px",
        //left : (($win.width()-100)/2)+"px",
        display: 'block'
    };
};
common.loading.close = function () {
    $('.system-loading').animate({opacity: 0}, 300, function () {
        $(this).remove();
    })
};

/**
 * 加密方法
 */
common.encrypt = function (key, value) {
    localStorage.setItem(key, (Base64.encode(value)));
}

/**
 * 解密方法
 */
common.decipher = function (key) {
    var rerunValue = localStorage.getItem(key);
    if (common.isNull(rerunValue)) {
        rerunValue = null;
    } else {
        rerunValue = Base64.decode(rerunValue);
    }

    return rerunValue;
}



//设置本地缓存
common.setLocalStorage = function (key, value, isJson) {
    if (window.localStorage) {
        if (isJson) {
            value = JSON.stringify(value);
        }
        window.localStorage[key] = value;
    } else {
        console.log("当前浏览器不支持localStorage");
    }
};

//获取本地缓存
common.getLocalStorage = function (key, isJson) {
    if (window.localStorage) {
        var value = window.localStorage[key] || "";
        if (isJson && value) {
            value = JSON.parse(value);
        }
        return value;
    } else {
        console.log("当前浏览器不支持localStorage");
    }
};

//清除本地缓存
common.removelocalStorage = function (key) {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
    }
};

//设置运行时缓存
common.setSessionStorage = function (key, content) {
    if (window.sessionStorage) {
        window.sessionStorage[key] = content;
    } else {
        console.log('您的浏览器不支持setSessionStorage方法');
    }
};

//获取运行时缓存
common.getSessionStorage = function (key) {
    if (window.sessionStorage) {
        return window.sessionStorage[key] ? JSON.parse(window.sessionStorage[key]) : '';
    } else {
        console.log('您的浏览器不支持getSessionStorage方法');
    }
};

//清除运行时缓存
common.removeSessionStorage = function (key) {
    if (window.sessionStorage) {
        window.sessionStorage.removeItem(key);
    }
};

//获取某个cookie
common.getCookie = function (cookie_name, decode) {
    decode = decode || true;
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);
    var value = '';
    if (cookie_pos > -1) {
        cookie_pos += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }
        value = allcookies.substring(cookie_pos, cookie_end);
        if (decode) {
            try {
                value = decodeURIComponent(value);
            } catch (e) {
                return "";
            }
        }
    }
    return value;
};

//设置某个cookie
common.setCookie = function (cookie_name, cookie_value, domain, isencode, expTime) {
    var exp = new Date();
    var expires = "";
    if (expTime) {
        exp.setTime(exp.getTime() + expTime);
        expires = ";expires=" + exp.toGMTString();
    }
    if (!domain) {
        domain = document.domain;
        if (/^[a-z]/i.test(document.domain)) {
            domain = document.domain.substring(document.domain.indexOf("."));
        }
    }

    isencode = typeof isencode == 'undefined' ? true : isencode;
    if (isencode) {
        cookie_value = encodeURIComponent(cookie_value);
    }
    document.cookie = cookie_name + "=" + cookie_value + "; path=/; domain=" + domain + ";" + expires;
};

/**
 *得到地址栏参数
 *@param names 参数名称
 *@param urls 从指定的urls获取参数
 *@param cn 是否中文
 *@returns string
 **/
common.getQueryString = function (names, urls, cn) {
    if (urls) {
        if (urls.indexOf('?') > -1) {
            urls = urls.substring(urls.indexOf('?') + 1);
        } else {
            return '';
        }
    } else {
        urls = window.location.search.substr(1);
    }

    var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
    var r = urls.match(reg);
    if (r && r[2]) {
        var ms = r[2].match(/(\<)|(\>)|(%3C)|(%3E)/g);
        if (ms && ms.length >= 4) {
            //如果检测到有2对及以上开始和结束尖括号
            r[2] = r[2].replace(/(\<)|(%3C)/g, '');
        }
        if (cn) {
            return r[2];
        }
        return unescape(r[2]);
    }
    return '';
};

//获取路径参数 #
common.getHash = function (key, url) {
    var hash;
    if (!!url) {
        hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        hash = (hash == url) ? "" : hash;
    } else {
        hash = self.location.hash;
    }

    hash = "" + hash;
    hash = hash.replace(/^[?#]/, '');
    hash = "&" + hash;
    var val = hash.match(new RegExp("[\&]" + key + "=([^\&]+)", "i"));
    if (val == null || val.length < 1) {
        return null;
    } else {
        return decodeURIComponent(val[1]);
    }
}

//获取路径参数 ?
common.getQuery = function (name) {
    var u = window.location.search.slice(1);
    var re = new RegExp(name + '=([^&\\s+]+)');
    var m = u.match(re);
    return m ? m[1] : '';
};

common.changeApplicationProgress = function (status) {
    return common.applicationProgress[status];
}

/* 上传图片 */
common.uploadPic = function (info, callback) {
    info = info || {};
    var init = {
        width: 200,
        height: 200,
        quality: 50,
        type: 0, //0: 单张,  1: 多张
        maxImages: 1,
        allowEdit: 0 //0:不可编辑  ， 1： 可编辑
    };
    init.width = info.width || init.width;
    init.height = info.height || init.height;
    init.quality = info.quality || init.quality;
    init.type = info.type || init.type;
    init.maxImages = info.maxImages || init.maxImages;
    init.allowEdit = info.allowEdit || init.allowEdit;
    if (actionsheet) {
        var options = {
            androidTheme: actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
            title: '选择图片',
            subtitle: '', // supported on iOS only
            buttonLabels: ['从图库选择', '拍照'],
            androidEnableCancelButton: true, // default false
            winphoneEnableCancelButton: true, // default false
            addCancelButtonWithLabel: '取消',
            position: [20, 0], // for iPad pass in the [x, y] position of the popover
            destructiveButtonLast: true // you can choose where the destructive button is shown
        };
        actionsheet.show(options, function (bIndex) {
            if (init.type == 0) {  //单选
                if (bIndex != 3) {
                    common.imagePick(bIndex, init, function (data) {
                        callback(data);
                    });
                }
            } else {  //多选
                switch (bIndex) {
                    case 1:
                        imagePicker.getPictures(function (result) {
                            var data = {
                                fileList: result,
                                resultCode: 1
                            };
                            callback(data);
                        }, function (error) {
                            var data = {
                                message: error,
                                resultCode: 0
                            };
                            callback(data);
                        }, init);
                        break;
                    case 2:
                        common.imagePick(bIndex, init, function (data) {
                            var newFileList = {
                                resultCode: data.resultCode,
                                fileList: [
                                    {src: data.fileList.src, name: data.fileList.name}
                                ]
                            }
                            callback(newFileList);
                        });
                        break;
                }
            }
            ;
        });
    } else {
        showTips('接口调用错误！Step: 1');
    }
};

common.imagePick = function (bIndex, init, callback) {
    camera.getPicture(function (data) {
        var fileList = JSON.parse(data);
        callback({fileList: fileList, resultCode: 1});
    }, function (error) {
        callback({message: error, resultCode: 0});
    }, {
        quality: init.quality,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: bIndex - 1,
        targetWidth: init.width,
        targetHeight: init.height,
        encodingType: Camera.EncodingType.JPEG,
        allowEdit: init.allowEdit

    });
};


/* 转换表单Array为JSON */
common.getFormJson = function (array) {
    var _json = {};
    for (var i in array) {
        _json[array[i].name] = array[i].value;
    }
    ;
    return _json;
}

/**
 * 获取指定的对象
 * @param arr
 * @param propsKey
 * @param propsVal
 * @returns {Array}
 */
common.getObjectByProps = function (arr, propsKey, propsVal) {
    if (!(arr && arr.length)) return null;
    return arr.filter(function (item) {
        return item[propsKey] == propsVal;
    })[0];
}
/**
 * 获取指定的对象下标
 * @param arr
 * @param propsKey
 * @param propsVal
 * @returns {Array}
 */
common.getArrIndexByProps = function (arr, propsKey, propsVal) {
    var rIndex = -1;
    if (arr && arr.length) {
        arr.map(function (item, index) {
            if (item[propsKey] == propsVal) {
                rIndex = index
            }
        });
    }
    return rIndex;
}


$.fn.scrollTo = function (options) {
    var defaults = {
        toT: 0,    //滚动目标位置
        durTime: 500,  //过渡动画时间
        delay: 30,     //定时器时间
        callback: null   //回调函数
    };
    var opts = $.extend(defaults, options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function (t) {
            index++;
            var per = Math.round(subTop / dur);
            if (index >= dur) {
                _this.scrollTop(t);
                window.clearInterval(timer);
                if (opts.callback && typeof opts.callback == 'function') {
                    opts.callback();
                }
                return;
            } else {
                _this.scrollTop(curTop + index * per);
            }
        };
    timer = window.setInterval(function () {
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};





