$(function () {
    // 自定义滚动条
    $(".content_list").mCustomScrollbar();

    let $audio = $("audio");
    let player = new Player($audio);
    let progress;
    let voiceProgress;
    let lyric;

    // 1.加载歌曲列表
    getPlayList();

    // 2.初始化进度条
    initProgress();

    // 2.初始化事件监听
    initEvents();

    function getPlayList() {
        $.ajax({
            url: "./source/musiclist.json",
            dataType: "json",
            success: function (data) {
                player.musicList = data;
                let $list = $(".content_list ul");
                $.each(data, function (index, ele) {
                    let $item = createMusicItem(index, ele);
                    $list.append($item);
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);
            },
            error: function (e) {

            }
        });
    }

    // 初始化事件监听
    function initEvents(){
        // 1.监听歌曲菜单的移入移出事件
        $(".content_list").delegate(".list_music", "mouseenter", function () {
            // 显示子菜单  这里不能使用children查找，因为不是儿子
            $(this).find(".list_menu").stop().fadeIn(100);
            $(this).find(".list_time a").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".list_time span").stop().fadeOut(100);
        });

        $(".content_list").delegate(".list_music", "mouseleave", function () {
            $(this).find(".list_menu").stop().fadeOut(100);
            $(this).find(".list_time a").stop().fadeOut(100);
            $(this).find(".list_time span").stop().fadeIn(100);
        });

        // 2.监听复选框点击
        $(".content_list").delegate(".list_check", "click", function () {
            $(this).toggleClass("list_checked");
        });

        // 监听子菜单播放按钮
        $musicPlay = $(".music_play");
        $(".content_list").delegate(".list_menu_play", "click", function () {
            let $item = $(this).parents(".list_music");
            // 切换当前播放图片
            $(this).toggleClass("list_menu_play2");
            // 复原其他播放图片
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            // 同步底部播放按钮
            if ($(this).attr("class").indexOf("list_menu_play2") != -1){
                // 播放
                $musicPlay.addClass("music_play2");
                // 让文字高亮
                $item.find("div").css("color", "#fff");
                // 文字高亮排他
                $item.siblings().find("div").css("color","rgba(255,255,255,0.5)");
            } else {
                // 暂停
                $musicPlay.removeClass("music_play2");
                // 让文字不高亮
                $item.find("div").css("color", "rgba(255,255,255,0.5)");
            }
            // 切换序号状态
            $item.find(".list_number").toggleClass("list_number2");
            $item.siblings().find(".list_number").removeClass("list_number2");

            // 播放音乐
            player.playMusic($item.get(0).index, $item.get(0).music);
            initMusicInfo($item.get(0).music);

            // 切换歌词
            initMusicLyric($item.get(0).music);
        });

        // 监听底部控制区域播放点击
        $musicPlay.click(function () {
            // 判断有没播放过音乐
            if (player.__proto__.currentIndex === -1){
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            } else {
                $(".list_music").eq(player.__proto__.currentIndex).find(".list_menu_play").trigger("click");
            }
        });
        // 监听底部控制区域上一首点击
        $(".music_pre").click(function () {
            let preIndex = player.preIndex();
            $(".list_music").eq(preIndex).find(".list_menu_play").trigger("click");
        });
        // 监听底部控制区域下一首点击
        $(".music_next").click(function () {
            let nextIndex = player.nextIndex();
            $(".list_music").eq(nextIndex).find(".list_menu_play").trigger("click");
        });

        // 监听删除按钮的点击
        $(".content_list").delegate(".list_menu_del", "click", function () {
            // 找到被点击的音乐
            let $item = $(this).parents(".list_music");

            // 判断当前删除的音乐是否是现在正在播放的
            // console.log($item.get(0).index,player.__proto__.currentIndex);
            if ($item.get(0).index === player.__proto__.currentIndex) {
                $(".music_next").trigger("click");
            }

            $item.remove();
            player.changeMusic($item.get(0).index);

            // 重新排序
            $(".list_music").each(function (index, value) {
                value.index = index;
                $(value).find(".list_number").text(index + 1);
            })
        });

        // 监听播放进度
        player.musicTimeUpdate(function (currentTime, duration, timeStr) {
            // 同步时间
            $(".music_progress_time").text(timeStr);
            // 同步进度条
            let value = currentTime / duration * 100;
            progress.setProgress(value);
            // 实现歌词同步
            let currentIndex = lyric.currentIndex(currentTime);
            console.log(currentIndex);
            let $item = $(".song_lyric li").eq(currentIndex);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");
            if (currentIndex <= 2) return;
            $(".song_lyric").css({
                marginTop: ((-currentIndex + 2) * 40),
            })
        });

        // 监听声音按钮点击
        $(".music_voice_icon").click(function () {
            // 切换图标
            $(this).toggleClass("music_voice_icon2");
            // 声音切换
            if ($(this).attr("class").indexOf("music_voice_icon2") !== -1){
                // 变为有声音
                player.musicVoiceSeekTo(0);
            } else {
                player.musicVoiceSeekTo(1);
            }
        });
    }

    // 创建音乐
    function createMusicItem(index, ele) {
        let $item = $("" +
            "<li class=\"list_music\">\n" +
            "                        <div class=\"list_check\"><i></i></div>\n" +
            "                        <div class=\"list_number\">"+ (index+1) +"</div>\n" +
            "                        <div class=\"list_name\">"+ ele.name +"\n" +
            "                            <div class=\"list_menu\">\n" +
            "                                <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
            "                                <a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "                                <a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "                                <a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                        <div class=\"list_singer\">" + ele.singer + "</div>\n" +
            "                        <div class=\"list_time\">\n" +
            "                            <span>"+ ele.time +"</span>\n" +
            "                            <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
            "                        </div>\n" +
            "                    </li>");

        $item.get(0).index = index;
        $item.get(0).music = ele;

        return $item;
    }

    // 初始化歌曲信息
    function initMusicInfo(music) {
        $(".song_info_pic img").attr("src", music.cover);
        $(".song_info_name a").text(music.name);
        $(".song_info_singer a").text(music.singer);
        $(".song_info_ablum a").text(music.ablum);
        $(".music_progress_name").text(music.name + " / " + music.singer);
        $(".music_progress_time").text("00:00 / " + music.time);
        $(".mask_bg").css("background", "url('"+music.cover+"')");
    }

    // 初始化进度条
    function initProgress() {
        let $progressBar = $(".music_progress_bar");
        let $progressLine = $(".music_progress_line");
        let $progressDot = $(".music_progress_dot");
        progress = new Progress($progressBar, $progressLine, $progressDot);
        progress.progressClick(function (value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function (value) {
            player.musicSeekTo(value);
        });

        let $voiceBar = $(".music_voice_bar");
        let $voiceLine = $(".music_voice_line");
        let $voiceDot = $(".music_voice_dot");
        voiceProgress = new Progress($voiceBar, $voiceLine, $voiceDot);
        voiceProgress.progressClick(function (value) {
            player.musicVoiceSeekTo(value);
        });
        voiceProgress.progressMove(function (value) {
            player.musicVoiceSeekTo(value);
        });
    }

    // 初始化歌词信息
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc);
        let $lrcContainer = $(".song_lyric");
        // 清空上一首歌词信息
        $lrcContainer.html("");
        lyric.loadLyric(function () {
            // 创建歌词列表
            console.log(lyric.arrLyrics);
            $.each(lyric.arrLyrics, function (index, value) {
                let $item = $("<li>"+value+"</li>");
                $lrcContainer.append($item);
            })
        });
    }
});