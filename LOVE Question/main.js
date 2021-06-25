$(document).ready(function () {
    //Build current Quiz，儲存目前作答到第幾題
    var currentQuiz = null;

    //當按下按鈕，要做的事情放在這裡面
    $("#startButton").click(function () {

        //如果還沒開始作答就從這裡開始
        if (currentQuiz == null) {
            //設定目前作答到第0題
            currentQuiz = 0;

            //顯示第0個題目
            $("#question").text(questions[0].question);

            $("#question").empty();

            //將選項內容添加至選項區塊
            for (var x = 0; x < questions[0].answers.length; x++) {
                //輸出radio選項
                console.log(x);
                $("#options").append("<input type = 'radio' name = 'options' value = '" + x + "'>" + "<label>" +
                    questions[0].answers[x][0] + "</label><br><br>");
            }

            //將按鈕上的文字轉換成下一題
            $("#startButton").attr("value", "下一題");
            $("#startButton").css({ 'color': 'blue', 'background': 'yellow' })
        }
        else                //已經開始作答
        {
            //巡訪每個選項是否有被選取
            $.each($(":radio"), function (i, val) {
                if (val.checked) {
                    //使用者選取的項目是否已產生最終結果(A~D)
                    if (isNaN(questions[currentQuiz].answers[i][1])) {
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];

                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);

                        //將選項區域清空
                        $("#options").empty();

                        //顯示最終結果的詳細資料
                        $("#options").append(finalAnswers[finalResult][1] + "<br><br>");

                        //將目前作答到第幾題的變數清空
                        currentQuiz = null;

                        //修改按鈕為重新開始
                        $("#startButton").attr("value", "重新開始");
                    }
                    else {
                        //指定下一個要顯示的題目，由於原始資料是從1開始計算，所以-1
                        console.log('abc');
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;

                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);

                        //清空選項區塊
                        $("#options").empty();

                        //顯示新的選項內容
                        for (var x = 0; x < questions[currentQuiz].answers.length; x++) {
                            console.log("x: " + x);
                            $("#options").append("<input type = 'radio' name = 'options' value = '" + x + "'><label>" + questions[currentQuiz].answers[x][0] + "</label><br><br>");
                        }

                    }

                    //完成後即可跳離迴圈
                    return false;
                }
            });
        }


    });
});