;(function (window, te$, undefined) {
    var _browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {         //移动终端浏览器版本信息
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }()
    };

    /**
     * 是否为www
     * @returns {boolean}
     */
    te$.isWWW = function() {
        var h = window.location.host.split('.');
        if (h[0] == 'www') {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * 是否为手机
     * @returns {boolean|*}
     */
    te$.isMobile = function () {
        return _browser.versions.mobile
    };

    /**
     * 是否为ios
     * @returns {*}
     */
    te$.isIos = function () {
        return _browser.versions.ios
    };

    /**
     * 是否为android
     * @returns {boolean|*}
     */
    te$.isAndroid = function () {
        return _browser.versions.android
    }

    /**
     * 是否为微信
     * @returns {boolean}
     */
    te$.isWechat = function () {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 微信版本号是否小于xxx cmpVer
     * @param cmpVer
     * @returns {boolean}
     */
    te$.isLowerWechat = function (cmpVer) {
        var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i),
            v_arr = wechatInfo.split('.');

        var cmpVerArr = cmpVer.split('.');
        return (parseInt(v_arr[0]) * 1000000 + parseInt(v_arr[1]) * 1000 + parseInt(v_arr[2])) <= (cmpVerArr[0] * 1000000 + cmpVerArr[1] * 1000 + cmpVerArr[2]);
    };

    /**
     * 获取ios版本号
     * @returns {string}
     */

    te$.iosVersion = function () {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt((v[2], 10)), parseInt(v[3] || 0, 10)].join('.');
        }
    };

    
})(window, te$);