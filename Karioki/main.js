var player;             //Youtube 播放器
var currentPlay = 0;    //紀錄目前播放到第幾首

//當Youtube API準備好時
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player",
        {
            height: "480",
            width: "720",
            videoId: playList[currentPlay],
            playerVars: {
                "autoplay": 0,  //自動播放
                "controls": 0,  //是否顯示控制項
                "start": playTime[currentPlay][0],  //開始播放秒數
                "end": playTime[currentPlay][1],    //結束播放秒數
                // "showinfo": 0,                   //上方影片是否顯示標題
                "rel": 0,                           //結束時是否顯示相關影片
                "iv_load_policy": 3                 //是否顯示置入性行銷連結
            },
            events: {
                "onReady": onPlayerReady,
                "onStateChange": onPlayerStateChange
            }

        });

}

//當Youtube播放器準備好時
function onPlayerReady(event) {
    $("#playButton").click(function () {
        $("h3").text(player.getVideoData().title);
        player.playVideo();
    });
}

//當播放器播放狀態改變時
function onPlayerStateChange(event) {
    console.log("event.Data: " + event.data);
    console.log("playList: " + currentPlay);
    console.log("");
    //當播放結束時
    /* YouTube API
        -1 (unstarted)
        0 (ended)
        1 (playing)
        2 (paused)
        3 (buffering)
        5 (video cued)
    */
    if(currentPlay == 0 && event.data == 0 )
    {
        document.getElementById("visi").style.visibility = 'hidden';
    }
    else
    {
        document.getElementById("visi").style.visibility = 'visible';
    }
    
   
    if (event.data == 0 && (Math.floor(player.getCurrentTime())==playTime[currentPlay][1])) {
        //如果還沒播放到最後一首，就去播放下一首
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "highres"
            });
        }
        else    //已經播放到最後一首
        {
            currentPlay = 0;
            player.cueVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "highres"
            });
        }
    }

    if (player.getVideoLoadedFraction() > 0)   //避免影片還沒開始播放時抓不到標題
    {
        $("h3").text(player.getVideoData().title);
    }
}

//影片停止 function
function stopVideo() { 
    player.stopVideo();
}