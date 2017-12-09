; (function (window, document, undefined) {
    "use strict";

    var te$ = window.te$ || {};
    
    function empty() { }
    function isWindow(obj) { return obj != null && obj == obj.window }
    function isObject(obj) { return typeof (obj) == 'object' }
    function isPlainObject(obj) { return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype }
    te$.isArray = Array.isArray || function isArray(obj) { return obj instanceof Array }

    /*document.createElement替代*/
    te$.c$ = function (a) {
        return document.createElement(a)
    };

    /**
     * 获取某个don下为p的子元素
     * @param {String} p child className
     * @param {String} j child tagName 
     * @param {object} m container
     * @return array
     */
    te$.getByClass = function (p, j, m) {
        //p: class, j: element, m: container
        p = te$.trim(p);
        j = j || "*";
        if (!m) {
            return []
        }

        var n = [],
            q = m.getElementsByTagName(j);

        for (var o = 0, h = q.length; o < h; ++o) {
            if (te$.hasClass(q[o], p)) {
                n[n.length] = q[o];
            }
        }
        return n
    };

    /**
     * document.getElementById()
     * @param {*} b 
     */
    te$.t$ = function (b) {
        var a = typeof b == "string" ? document.getElementById(b) : b;
        if (a != null) {
            return a;
        }
        return null;
    };

    /**
     * 检测是否为手机
     * @return 手机true, ipad false, pc false
     */
    te$.detectMobile = function () {
        var agent = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(agent.substr(0, 4)))
            return true
        else return false;
    };

    /**
     * 去字符串首尾空格
     * @param {String} h 
     */
    te$.trim = function (h) {
        try {
            return h.replace(/^\s+|\s+$/g, "")
        } catch (j) {
            return h
        }
    };

    /**
     * 是否含有某个子元素
     * @param {Object} p 父级dom
     * @param {String} c 子级dom
     */
    te$.hasChild = function (p, c) {
        if (p.tagName.toLowerCase() == 'body') {
            return true;
        }
        else {
            if (p == c) {
                return false;
            }
            else {
                while (c.tagName.toLowerCase() !== 'body') {
                    c = c.parentNode;
                    if (p == c) return true;
                }
                return false;
            }
        }
    };

    /**
     * 是否含有某个className
     * @param {Object} ele domElement 
     * @param {String} cls className
     */
    te$.hasClass = function (ele, cls) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    /**
     * 添加className
     * @param {Object} ele domElement 
     * @param {String} cls className
     */
    te$.addClass = function (ele, cls) {
        if (!te$.hasClass(ele, cls)) ele.className += " " + cls;
    };

    /**
     * 移除className
     * @param {Object} ele domElement 
     * @param {String} cls className
     */
    te$.removeClass = function (ele, cls) {
        if (te$.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    };

    /**
     * 获取某个queryString
     * @param {String} queryName 
     */
    te$.getQueryParam = function (queryName) {
        if (!queryName) return '';

        var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return '';
    };

    /**
     * queryString(key=value&...)
     */
    te$.jsonToUrl = function (data) {
        var params = [];
        for (var k in data) {
            var value = data[k] !== undefined ? data[k] : '';
            params.push(k + '=' + value)
        }
        return params.join('&')
    }
    // ---------------------- ajax --------------------------------
    var ajaxSettings = {
        // 默认请求方式
        type: 'GET',
        url: '',
        data: null,
        dataType: 'json',
        async: true,
        xhr: function () {
            if (XMLHttpRequest) {
                return new window.XMLHttpRequest();
            } else {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        },
        // 发起请求之前触发(未完成)
        beforeSend: empty,
        // 成功回调（res, xhr）
        success: empty,
        // 失败回调 type: "timeout", "error", "abort", "parsererror" (statusText, type, xhr)
        error: empty,
        // 成功或者失败都触发(未完成)
        complete: empty,
        // 超时
        timeout: 0,
        // 是否对返回的数据进行缓存(未完成)
        cache: true
    }

    /**
     * ajax
     * @param {object} options 
     */
    te$.ajax = function (options) {
        var options = te$.extend({}, ajaxSettings, options || {}, true);

        var xhr = options.xhr(),
            abortTimeout = null;

        var postData = this.jsonToUrl(options.data);

        if (options.type.toUpperCase() === 'POST') {
            xhr.open(options.type, options.url, options.async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            xhr.send(postData);
        } else if (options.type.toUpperCase() === 'GET') {
            xhr.open(options.type, (options.url + '?' + postData), options.async);
            xhr.send(null);
        }

        xhr.onreadystatechange = function () {
            /**
             * 监听readyState改变
             * 0: 请求初始化
             * 1: 服务器连接已建立
             * 2: 请求已接收
             * 3: 请求处理中
             * 4: 请求已完成
             */
            if (xhr.readyState == 4) {
                xhr.onreadystatechange = empty;
                clearTimeout(abortTimeout);
                var res, error = false;
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    // 304 重定向
                    if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
                        res = xhr.response
                    else {
                        res = xhr.responseText
                        try {
                            if (options.dataType == 'xml') res = xhr.responseXML
                            if (options.dataType == 'json') res = JSON.parse(res)
                        } catch (e) { error = e }

                        if (error) return options.error(error, 'parsererror', xhr)
                    }
                    options.success(res, xhr)
                } else {
                    options.error(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr)
                }
            }
        }
        if (options.timeout > 0) {
            abortTimeout = setTimeout(function () {
                xhr.onreadystatechange = empty;
                xhr.abort(); // 终止请求
                options.error(null, 'timeout', xhr);
            }, options.timeout);
        }


    };

    /**
     * cookie的set and get
     * @param name
     * @param value
     * @param options
     * @returns {*}
     */
    te$.cookie = function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }

            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // 获取cookie , cookie(name)
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = te$.trim(cookies[i]);
                    // 截取name后的
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
    // --------------------------- extend ------------------------------
    function extend(target, source, deep) {
        for (var key in source) {
            if (deep && (isPlainObject(source[key]) || te$.isArray(source[key]))) {
                // 深拷贝
                if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                    // 源对象是obj而目标对象不是，则
                    target[key] = {}
                }
                if (te$.isArray(source[key]) && !te$.isArray(target[key])) {
                    // 源对象是array而目标对象不是，则
                    target[key] = []
                }
                extend(target[key], source[key], deep) // 递归调用
            }
            else if (source[key] !== undefined) {
                // 浅拷贝
                target[key] = source[key]
            }
        }
        return target
    }

    /**
     * 扩展Object
     * @param {*} target 
     */
    te$.extend = function (target) {
        // args除了第一个参数, 例如传入的参数为te$.extend({}, {name: 1}, {name: 2}, {name: 'ma'}, true)
        var deep, args = Array.prototype.slice.call(arguments, 1);
        if (typeof target == 'boolean') {
            // 将target值为undefined
            deep = target
            target = args.shift()
        }

        args.forEach(function (arg) {
            // eg: args为({name: 1}, {name: 2}, {name: 'ma'}, true)
            // arg为true时, 默认不处理
            extend(target, arg, deep)
        })
        return target
    };
    window.te$ = te$;
})(window, document);