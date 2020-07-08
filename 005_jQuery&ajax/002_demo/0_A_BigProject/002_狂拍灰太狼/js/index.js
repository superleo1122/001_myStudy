$(function () {
   // 1.监听游戏规则的点击
   $(".rules").click(function () {
       // $(".rule").css("display", "block"); 这里使用淡入效果
       $(".rule").stop().fadeIn(400);
   });

    // 2.监听关闭按钮的点击
    $(".rule>a").click(function () {
        $(".rule").stop().fadeOut(400);
    });

    // 3.监听开始按钮点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        // 进度条减少
        progressHandler();
        startWolfAnimation();
    });

    // 4.监听重新开始按钮
    $(".reStart").click(function () {
        $(".mask").stop().fadeOut(400);
        // 进度条处理
        progressHandler();
        // 处理灰太狼动画
        startWolfAnimation();
    });

    let wolfTimer;
    // 灰太狼逻辑处理函数
    function startWolfAnimation() {
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];

        // 3.创建一个图片
        let $img = $("<img src='' class='wolfImage'/>");
        // 4.随机获取图片的位置
        let posIndex = Math.round(Math.random() * 8);
        // 5.设置图片的位置
        $img.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });
        // 随机获取数组类型 Math.round(Math.random()) 非0即1
        let wolfType = Math.round(Math.random()) === 0 ? wolf_1 : wolf_2;
        // 设置图片内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if (wolfIndex > wolfIndexEnd) {
                $img.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $img.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 300);

        // 6.将图片添加到界面上
        $(".container").append($img);

        // 7.调用处理游戏规则的方法
        gameRules($img);
    }

    function gameRules($wolfImage) {
        // one方法能保证事件只触发一次
        $wolfImage.one("click", function () {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            // 拿到当前点击图片地址
            let $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            let flag = $src.indexOf("h") >= 0
            if (flag){
                // + 10
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                // - 10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        })
    }

    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }

    // 进度条处理函数
    function progressHandler() {
        // 初始化进度条宽度
        $(".progress").css({
            width: 180
        });

        // 开启一个定时器，定时减少进度条的宽度
        let timer = setInterval(function () {
            // 通过css方法获取的css属性带单位，比如这里为180px
            // console.log($(".progress").css("width"));
            // 通过width()方法获取的width不带单位，只是数值
            let width = $(".progress").width();
            width -= 1;
            $(".progress").css({
                width: width
            });

            // 当进度条走完时，打开重新开始页面，并关闭定时器
            if (width <= 0) {
                clearInterval(timer);
               $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        }, 50)
    }

});