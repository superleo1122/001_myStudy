// 闭包
(function (window) {
     function Player($audio) {
         // 这里返回的是init函数的实例化对象
         return new Player.prototype.init($audio);
     }

     Player.prototype = {
         constructor: Player,
         musicList: [],
         init: function ($audio) {
            this.$audio = $audio;
            // 获取原生audio对象
            this.audio = $audio.get(0);
         },
         currentIndex: -1,
         playMusic: function (index, music) {
             // 判断是否是同一首音乐
             // console.log(this);
             // console.log(Player.prototype);
             // console.log(this.currentIndex);
             // 我认为这里应该使用Player.prototype.currentIndex，而不是this.currentIndex
             if (Player.prototype.currentIndex === index){
                 // 是同一首音乐
                 if (this.audio.paused) {
                     this.audio.play();
                 } else {
                     this.audio.pause();
                 }
             } else {
                 // 不是同一首
                 this.$audio.attr("src", music.link_url);
                 this.audio.play();
                 Player.prototype.currentIndex = index;
             }
         },
         preIndex: function () {
             let index = Player.prototype.currentIndex - 1;
             if (index < 0){
                 index = this.musicList.length - 1;
             }
             return index;
         },
         nextIndex: function () {
             let index = Player.prototype.currentIndex + 1;
             if (index > this.musicList.length - 1) {
                 index = 0;
             }
             return index;
         },
         changeMusic: function (index) {
             this.musicList.splice(index,1);
             if (index <= Player.prototype.currentIndex){
                 Player.prototype.currentIndex--;
             }
         },
         getMusicDuration: function () {
             return this.audio.duration;
         },
         getMusicCurrentTime: function () {
             return this.audio.currentTime;
         },
         musicTimeUpdate: function (callBack) {
             $this = this;
             // 监听播放进度
             this.$audio.on("timeupdate", function () {
                 let duration = this.duration;
                 let currentTime = this.currentTime;
                 let timeStr = $this.formatDate(currentTime, duration);
                 callBack(currentTime, duration, timeStr);
             })
         },
         // 时间格式化
         formatDate: function (currentTime, duration) {
             let endMin = parseInt(duration / 60);
             let endSec = parseInt(duration % 60);
             if (endMin < 10) {
                 endMin = "0" + endMin;
             }
             if (endSec < 10) {
                 endSec = "0" + endSec;
             }

             let startMin = parseInt(currentTime / 60);
             let startSec = parseInt(currentTime % 60);
             if (startMin < 10) {
                 startMin = "0" + startMin;
             }
             if (startSec < 10) {
                 startSec = "0" + startSec;
             }
             return startMin + ":" + startSec + " / " + endMin + ":" + endSec;
         },
         musicSeekTo: function (value) {
             if (!isNaN(this.audio.duration)){
                 this.audio.currentTime = this.audio.duration * value;
             }
         },
         musicVoiceSeekTo: function (value) {
             if (isNaN(value)) return;
             if (value < 0 || value > 1) return;

             // 值 0~1
             this.audio.volume = value;
         }
     };

     // 将init函数对应的原型对象改为Player构造函数对应的原型对象，这样可以通过init的实例对象调用Player构造函数对应的原型里的方法
     Player.prototype.init.prototype = Player.prototype;
     window.Player = Player;
})(window);