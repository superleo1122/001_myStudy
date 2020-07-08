(function (window) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        progressClick: function (callBack) {
            let $this = this; // 这里的this是progress,this.$progressBar.click()里面的this是$progressBar，所以这里this进行保存一下
            // 监听背景点击
            this.$progressBar.click(function (event) {
                // 获取背景距离窗口的默认位置
                let normalLeft = $(this).offset().left;
                // 获取点击位置距离窗口的距离
                let eventLeft = event.pageX;
                // 设置前景的宽度
                $this.$progressLine.css("width", eventLeft - normalLeft);
                $this.$progressDot.css("left", eventLeft - normalLeft);
                // 设置进度条的比例
                let value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove: function (callBack) {
            let $this = this;

            // 获取背景距离窗口的默认位置
            let normalLeft = $this.$progressBar.offset().left;
            let barWidth = $this.$progressBar.width();
            let eventLeft;

            // 1.监听鼠标按下事件
            this.$progressBar.mousedown(function () {
                // 2.监听鼠标移动事件
                $(document).mousemove(function (event) {
                    $this.isMove = true;
                    // 获取点击位置距离窗口的距离
                    eventLeft = event.pageX;
                    let offset = eventLeft - normalLeft;
                    if (offset >= 0 && offset <= barWidth) {
                        // 设置前景的宽度
                        $this.$progressLine.css("width", eventLeft - normalLeft);
                        $this.$progressDot.css("left", eventLeft - normalLeft);
                    }
                });
            });

            // 3.监听鼠标抬起事件
            $(document).mouseup(function () {
                this.isMove = false;
                $(document).off("mousemove");
                if (eventLeft !== undefined){
                    // 设置进度条的比例
                    let value = (eventLeft - normalLeft) / $this.$progressBar.width();
                    callBack(value);
                }
            })
        },
        setProgress: function (value) {
            if (this.isMove) return;
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            });
            this.$progressDot.css({
                left: value + "%"
            });
        }
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);