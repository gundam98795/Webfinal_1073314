var mapArray,ctx,currentImgMainX,currentImgMainY;
var imgMountain,imgMain,imgEnemy;

//mapArray: 決定地圖中每個格子的元素
//ctx: HTML5 Canvas用
//currentImgMainX,currentImgMainY: 決定主角的所在座標
//imgMountain,imgMain,imgEnemy: 障礙物、主角、敵人的圖片物件

//當網頁元件載入完成後要做的事情
$(document).ready(function(){
    //用陣列來代表地圖上的每個東西    ->    遊戲地形設定
    //0 : 可走、 1 : 障礙、 2 : 終點、 3 : 敵人
    mapArray = [0,1,1,0,0,0,3,1,2];
    ctx = $("#myCanvas")[0].getContext("2d");

    //擺上主角 - 使用預設位置
    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";

    //預設位置為(0,0)
    currentImgMainX = 0;
    currentImgMainY = 0;

    //預防機制，等到圖片載入後再執行這段，並把圖放到canvas去
    imgMain.onload = function()
    {
        //                80,130把主角正面剪下      200,200縮放後的寬度
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    }

    //擺上障礙物與敵人
    imgMountain = new Image();              //礙障物物件
    imgMountain.src = "images/material.png";

    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";

    imgMountain.onload = function()
    {
        imgEnemy.onload = function()
        {
            for(var x in mapArray)
            {
                if(mapArray[x] == 1)        //擺上障礙物
                {
                    ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
                }
                else if(mapArray[x] == 3)   //擺上障礙物
                {
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
                }
            }
        }
    }
});

//當有人按下按鍵後要做的事情
$(document).keydown(function(event){
    var targetImgMainX,targetImgMainY;  //主角即將要移動過去的目標位置
    var targetBlock;                    //主角即將要移動過去的那格編號
    var cutImagePositionX;              //依據主角朝向什麼方向而決定照片

    event.preventDefault();             //避免點擊鍵盤出現瀏覽器其他行為

    //依據使用者點擊，計算出目前目標位置以及設定新照片
    switch(event.which)
    {
        case 37: //Button Left
            //console.log("左");
            $("#talkBox").text("向左");
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;

        case 38: //Button Up
            //console.log("上");
            $("#talkBox").text("向上");
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;

        case 39: //Button Right
            //console.log("右");
            $("#talkBox").text("向右");
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;

        case 40: //Button Down
            //console.log("下");
            $("#talkBox").text("向下");
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        
        default:    //按了上下左右以外的按鍵
            return;
    }

    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0)    //沒有超出邊界
    {
        targetBlock = targetImgMainX/200 + targetImgMainY/200 * 3;
    }
    else
    {
        targetBlock = -1;       //代表異常，不能動
    }

    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);     //清除主角原本所在位置

    if(targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3)
    {
        //目標位置異常、遇到障礙物、遇到敵人都不能走，在原地(但稍後會依移動方向轉頭)
    }
    else
    {
        //$("#talkBox").text("");
        currentImgMainX = targetImgMainX;
        currentImgMainY = targetImgMainY;
    }

    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);

    switch(mapArray[targetBlock])
    {
        case undefined:     //牆壁
            $("#talkBox").text("邊界");
            break;
        case 1:
            $("#talkBox").text("有山");
            break;
        case 2:
            $("#talkBox").text("抵達終點~");
            break;
        case 3:
            $("#talkBox").text("嗨~");
            break;
        
    }

});