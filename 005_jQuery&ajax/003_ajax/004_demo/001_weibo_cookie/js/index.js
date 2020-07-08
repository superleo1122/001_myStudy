$(function () {
    // 监听内容的时时输入
    $("body").delegate(".comment", "propertychange input", function () {
        // 判断是否输入了内容
        if ($(this).val().length > 0){
            // 让按钮可用
            $(".send").prop("disabled", false);
        } else {
            // 让按钮不可用
            $(".send").prop("disabled", true);
        }
    });

    var number = $.getCookie("pageNumber") || 1;

    getMsgPage();
    function getMsgPage(){
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=get_page_count",
            success: function (msg) {
                var obj = eval("("+msg+")");
                // 添加前清空内容
                $(".page").html("");
                for (var i=0; i<obj.count; i++){
                    var $a = $("<a href=\"javascript:;\">"+(i+1)+"</a>");
                    if (i === (number-1)){
                        $a.addClass("cur");
                    }
                    $(".page").append($a);
                }
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        })
    }

    getMsgList(number);
    function getMsgList(number){
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=get&page="+number,
            success: function (msg) {
                var obj = eval("("+msg+")");
                $(".messageList").html("");
                $.each(obj, function (key, value) {
                    // 根据内容创建节点
                    let $oEle = createEle(value);
                    $oEle.get(0).obj = value;
                    // 插入节点
                    $(".messageList").append($oEle);
                })
            },
            error: function(xhr) {
                console.log(xhr.status);
            }
        })
    }

    // 监听发布按钮的点击
    $(".send").click(function () {
        // 拿到用户的输入内容
        let $text = $(".comment").val();

        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=add&content=" + $text,
            success: function (msg) {
                console.log(msg);
                /*
                    非标准的JSON字符串: {error: 0, id: 1, time: 1586296038, acc: 0, ref: 0}
                    标准的JSON字符串: {"error": "0", "id": "1", "time": "1586296038", "acc": "0", "ref": "0"}  重点在于key一定要用""括起来
                    如果字符串不是标准的json字符串格式，那么在使用JSON.parse()解析时就会出现下面这行错误
                    VM2415:1 Uncaught SyntaxError: Unexpected token e in JSON at position 1
                 */
                // 对于非标准JSON字符串，可以使用eval()方法进行转换
                var obj = eval("(" + msg + ")");
                obj.content = $text;

                // 根据内容创建节点
                let $oEle = createEle(obj);
                $oEle.get(0).obj = obj;
                // 插入节点
                $(".messageList").prepend($oEle);
                // 重新获取页面
                getMsgPage();
                // 删除最前面一条微博
                if ($(".info").length > 6) {
                    $(".info:last-child").remove();
                }
            },
            error: function (xmlHttpRequest) {
                console.log(xmlHttpRequest.status);
            }
        });

        // 清空输入框内容
        $(".comment").val(null);
    });

    // 监听顶部点击 对动态增加的元素进行事件绑定都需要使用事件委托
    $("body").delegate(".infoUp", "click" , function () {
        // 这里的this其实指的就是当前被点击的元素，即event.target
        $(this).text(parseInt($(this).text()) + 1);
        let obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=acc&id=" + obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        })
    });
    // 监听down点击
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
        let obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=ref&id=" + obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        })
    });
    // 监听删除点击
    $("body").delegate(".infoDel", "click", function () {
       $(this).parents(".info").remove();
        let obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=del&id=" + obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                alert(xhr.status);
            }
        });
        // 重新获取当前数据
        getMsgList($(".cur").html());
    });

    // 监听页码点击
    $("body").delegate(".page>a", "click", function () {
        $(this).addClass("cur");
        $(this).siblings().removeClass("cur");
        var number = parseInt($(this).html());
        getMsgList(number);
        // 保存当前点击的页码
        $.addCookie("pageNumber", $(this).html());
    });

    // 创建节点方法
    function createEle(obj) {
        let $oEle = $("<div class=\"info\">\n" +
            "                <p class=\"infoText\">"+obj.content+"</p>\n" +
            "                <p class=\"infoOperation\">\n" +
            "                    <span class=\"infoTime\">"+formatDate(obj.time)+"</span>\n" +
            "                    <span class=\"infoHandle\">\n" +
            "                        <a href=\"javascript:;\" class='infoUp'>"+obj.acc+"</a>\n" +
            "                        <a href=\"javascript:;\" class='infoDown'>"+obj.ref+"</a>\n" +
            "                        <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                    </span>\n" +
            "                </p>\n" +
            "            </div>");

        return $oEle;
    }

    // 生成时间方法
    function formatDate(time) {
        let date = new Date(time * 1000);
        // 2018-4-3 21:30:23
        let arr = [
            date.getFullYear()+"-",
            date.getMonth()+"-",
            date.getDate()+" ",
            date.getHours()+":",
            date.getMinutes()+":",
            date.getSeconds()
        ];
        return arr.join("");
    }
});