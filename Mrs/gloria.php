
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>HTML5</title>


    <link href="css/default.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/garden.js"></script>
    <script type="text/javascript" src="js/functions.js"></script>

</head>

<body>
<div id="mainDiv">
    <div id="content">
        <div id="code">
            <span class="comments">她说</span><br />
            <span class="space"/><span class="comments">要爱</span><br />
            <span class="space"/><span class="comments">自由和美</span><br />
            <span class="comments">她说</span><br />
            <span class="space"/><span class="keyword">真生命，真幸福</span><br />
            <span class="comments">她说</span><br />
            <span class="space"/></span><span class="keyword">不然黄河不潮，昆仑叹息</span> <br />
            <span class="comments">她说</span><br />
            <span class="space"/></span><span class="keyword">此去清风白日</span> <br />
            <span class="space"/></span><span class="keyword">自由道风景多好</span> <br />
            <span class="space"/><span class="space"/><span class="comments">愿岁月赐予你丰满的灵魂</span><br />
            <span class="space"/><span class="space"/><span class="comments">更丰富的体验</span><br />
            <span class="placeholder"/><span class="comments">更勇敢的折腾</span><br />
            <span class="comments">77节快乐</span><br />
            <span class="space"/><span class="space"/><span class="comments">给</span><br />
            <span class="space"/><span class="space"/><span class="space"/><span class="space"/><b>苑艺滨</b><br />
        </div>
        <div id="loveHeart">
            <canvas id="garden"></canvas>
            <div id="words">
                <div id="messages">
                    gloria and his dog....
                </div>
                <div id="loveu">
                    be happy<br/>
                    <div class="signature">- chen</div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    var offsetX = $("#loveHeart").width() / 2;
    var offsetY = $("#loveHeart").height() / 2 - 55;
    var together = new Date();
    together.setFullYear(2013, 2, 28);
    together.setHours(20);
    together.setMinutes(0);
    together.setSeconds(0);
    together.setMilliseconds(0);

    if (!document.createElement('canvas').getContext) {
        var msg = document.createElement("div");
        msg.id = "errorMsg";
        msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+";
        document.body.appendChild(msg);
        $("#code").css("display", "none")
        $("#copyright").css("position", "absolute");
        $("#copyright").css("bottom", "10px");
        document.execCommand("stop");
    } else {
        setTimeout(function () {
            startHeartAnimation();
        }, 5000);

        timeElapse(together);
        setInterval(function () {
            timeElapse(together);
        }, 500);

        adjustCodePosition();
        $("#code").typewriter();
    }
</script>

</body>
</html>