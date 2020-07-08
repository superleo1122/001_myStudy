(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }

    Lyric.prototype = {
        constructor: Lyric,
        init: function (path) {
            this.path = path;
        },
        arrTimes: [],
        arrLyrics:[],
        index: -1,
        loadLyric: function (callBack) {
            let $this = this;
            $.ajax({
                url: $this.path,
                dataType: "text",
                success: function (data) {
                    $this.parseLyric(data);
                    callBack();
                },
                error: function (e) {
                    console.log(e);
                }
            })
        },
        parseLyric: function (data) {
            let $this = this;
            // 清空上一首歌词信息
            $this.arrTimes = [];
            $this.arrLyrics = [];
            let array = data.split("\n");
            // [00:00.92]
            let timeReg = /\[(\d*:\d*\.\d*)\]/;
            // 遍历取出的每一条歌词
            $.each(array, function (index, value) {
                // 歌词处理
                let lrc = value.split("]")[1];
                // 排除空歌词
                if (lrc.length == 1) return true;
                $this.arrLyrics.push(lrc);

                // 时间处理  因为上面先处理歌词，所有没有歌词的行都被过滤了
                let res = timeReg.exec(value);
                if (res == null) return true;
                let timeStr = res[1]; // 00:00.92
                let arrRes = timeStr.split(":");
                let min = parseInt(arrRes[0])*60;
                let sec = parseFloat(arrRes[1]);
                // toFixed()方法返回的是字符串
                let time = parseFloat(Number(min+sec).toFixed(2));
                $this.arrTimes.push(time);
            })
        },
        currentIndex: function (currentTime) {
            if (currentTime >= this.arrTimes[0]) {
                this.index++;
                this.arrTimes.shift();  // 删除数组最前面一个元素
            }
            return this.index;
        }
    };

    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);