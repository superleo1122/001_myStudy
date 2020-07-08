function obj2str(obj) {
    // 生成随机因子
    obj.t = (Math.random() + "").replace(".","");
    let arr = [];
    for (let key in obj){
        // encodeURI对中文进行编码
        arr.push(key + "=" + encodeURI(obj[key]));
    }
    return arr.join("&");
}

function myJSONP(options) {
    options = options || {};
    // http://127.0.0.1/jQuery/Ajax/22-jsonp.php?cb=lnj&teacher=lnj&age=34&_=1559735634387
    // http://127.0.0.1/jQuery/Ajax/22-jsonp.php?cb=lnj&teacher=lnj&age=34&t=08520581619221432

    // 1.生成URL地址
    let url = options.url;
    if (options.jsonp) {
        url += "?" + options.jsonp + "=";
    } else {
        url += "?callback=";
    }

    let callbackName;
    if (options.jsonpCallback){
        callbackName = options.jsonpCallback;
    } else {
        callbackName = ("jQuery" + Math.random()).replace(".", "");
    }
    url += callbackName;

    if (options.data){
        let str = obj2str(options.data);
        url += "&" + str;
    }

    // 2.获取跨域数据
    let oScript = document.createElement("script");
    oScript.src = url;
    document.body.appendChild(oScript);

    // 3.定义回调函数
    window[callbackName] = function (data) {
        // 删除已经获取了数据的script标签
        document.body.removeChild(oScript);
        // 将获取到的数据返回给外界
        options.success(data);
    }
}