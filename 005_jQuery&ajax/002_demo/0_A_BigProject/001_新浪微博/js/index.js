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
    })

    // 监听发布按钮的点击
    $(".send").click(function () {
        // 拿到用户的输入内容
        let $text = $(".comment").val();
        // 根据内容创建节点
        let $oEle = createEle($text);
        // 插入节点
        $(".messageList").prepend($oEle);
        // 清空输入框内容
        $(".comment").val(null);
    });

    // 监听顶部点击 对动态增加的元素进行事件绑定都需要使用事件委托
    $("body").delegate(".infoUp", "click" , function () {
        // 这里的this其实指的就是当前被点击的元素，即event.target
        $(this).text(parseInt($(this).text()) + 1);
    });
    // 监听down点击
    $("body").delegate(".infoDown", "click", function () {
        $(this).text(parseInt($(this).text()) + 1);
    });
    // 监听删除点击
    $("body").delegate(".infoDel", "click", function () {
       $(this).parents(".info").remove();
    });

    // 创建节点方法
    function createEle(text) {
        let $oEle = $("<div class=\"info\">\n" +
            "                <p class=\"infoText\">"+text+"</p>\n" +
            "                <p class=\"infoOperation\">\n" +
            "                    <span class=\"infoTime\">"+formatDate()+"</span>\n" +
            "                    <span class=\"infoHandle\">\n" +
            "                        <a href=\"javascript:;\" class='infoUp'>0</a>\n" +
            "                        <a href=\"javascript:;\" class='infoDown'>0</a>\n" +
            "                        <a href=\"javascript:;\" class='infoDel'>删除</a>\n" +
            "                    </span>\n" +
            "                </p>\n" +
            "            </div>");

        return $oEle;
    }

    // 生成时间方法
    function formatDate() {
        let date = new Date();
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