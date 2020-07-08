function obj2Str(obj) {
    obj = obj || {};
    obj.t = new Date().getTime(); // 添加随机因子，防止缓存
    var res = [];
    for (var key in obj) {
        /*
            在URL中不可以出现中文，若出现中文需要进行转码
                可以调用encodeURIComponent()方法
                URL中只可以出现字母/数字/下划线/ASCII码
         */
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]));
    }
    return res.join("&");
}

function ajax(url, obj, timeout ,success, error) {
    // 0.将对象转换为字符串
    var str = obj2Str(obj); // key=value&key1=value1

    // 1.创建一个异步对象
    var xmlHttp, timer;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp = new XMLHttpRequest();
    } else {
        // code for IE6,IE5
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 2.设置请求方式和请求地址
    /*
        open(method,url,async);
        method: 请求方式
        url:请求地址
        async: true 异步 false 同步 (ajax存在的意义就是异步发送请求，所有永远为true)
     */
    xmlHttp.open("GET",url + "?" + str, true);

    // 3.发送请求
    xmlHttp.send();

    // 4.监听状态变化
    xmlHttp.onreadystatechange = function () {
        /*
            readyState状态值
                0: 请求未初始化
                1: 服务器连接已建立
                2: 请求已接收
                3: 请求处理中
                4: 请求已完成，且响应已就绪
         */
        if (xmlHttp.readyState === 4){
            clearInterval(timer);
            // 判断请求是否成功
            if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status === 304) {
                // 5.处理成功返回结果
                success(xmlHttp);
            } else {
                // 5.处理失败返回结果
                error(xmlHttp);
            }
        }
    };

    // 判断外界是否传入了超时时间
    if (timeout) {
        timer = setInterval(function () {
            console.log("请求超时，已中断连接");
            xmlHttp.abort();
            clearInterval(timer);
        }, timeout);
    }
}