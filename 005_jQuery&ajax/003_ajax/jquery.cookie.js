/**
 * 制作jQuery插件
 */
(function ($, window) {
    $.extend({
        addCookie: function (key, value, day, path, domain) {
            // 1.处理默认保存的路径
            if (!path) {
                var index = window.location.pathname.lastIndexOf("/");
                path = window.location.pathname.slice(0, index);
            }
            // 2.处理默认保存的domain
            domain = domain || document.domain;
            // 3.处理默认的过期时间
            if (!day) {
                document.cookie = key + "=" + value + ";path=" + path + ";domain=" + domain + ";";
            } else {
                var date = new Date();
                date.setDate(date.getDate() + day);
                document.cookie = key + "=" + value + ";expires=" + date.toGMTString() + ";path=" + path + ";domain=" + domain + ";";
            }
        },
        getCookie: function (key) {
            var arrRes = document.cookie.split(";");
            for (var i = 0; i < arrRes.length; i++) {
                var arrTemp = arrRes[i].split("=");
                if (arrTemp[0].trim() === key) {
                    return arrTemp[1];
                }
            }
        },
        // 默认情况下只能删除默认路径中保存的cookie，若想删除指定路径保存的cookie，那么必须在删除时指定路径才可以
        delCookie: function (key, path) {
            $.addCookie(key, $.getCookie(key), -1, path);
        }
    })
})(jQuery, window);