(function (window) {
    function Tap(dom, fn) {
        if (!(dom instanceof HTMLElement)){
            throw new Error("请传入一个DOM元素");
        }
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        dom.ontouchstart = function (event) {
            // 1.判断当前元素中有几根手指
            if(event.targetTouches.length > 1){
                return;
            }
            // 2.拿到手指按下的位置
            startX = event.targetTouches[0].clientX;
            startY = event.targetTouches[0].clientY;
            // 3.拿到手指按下的时间
            startTime = Date.now();
        };
        dom.ontouchend = function (event) {
            // 1.判断有几根手指离开了
            if(event.changedTouches.length > 1){
                return;
            }
            // 2.拿到离开手指的位置
            let endX = event.changedTouches[0].clientX;
            let endY = event.changedTouches[0].clientY;
            // 3.判断手指离开的位置和按下位置的距离
            if(Math.abs(endX - startX) > 5 ||
                Math.abs(endY - startY) > 5){
                return;
            }
            // 4.拿到手指离开的时间
            let endTime = Date.now();
            // 5.判断手指离开的时间和按下的时间
            if(endTime - startTime > 100){
                return;
            }
            // 安全校验，这是咋个检验的呢
            fn && fn();
        }
    }
    window.Tap = Tap;
})(window);