<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no, email=no">
        <link rel="stylesheet" type="text/css" href="css/index.css">
    </head>
    <body>
        <img src="images/mobile.jpg" class="mobile">
        <div class="loading"></div>
        <div class="share">
            <img src="images/share-modal.png">
        </div>
        <div class="page1 page">
            <img src="images/index_left.jpg" class="page1-left">
            <img src="images/index_right.jpg" class="page1-right">
            <img src="images/index_title.png" class="page1-title">
            <span class="page1-percent">0%</div>
        </div>
        <div class="page2 page">
            <img src="images/bg1.jpg" class="bg1">
            <img src="images/title.png" class="page2-title">
            <div class="page2-box">
                昵称<input type="text" class="name">
            </div>
            <img src="images/airship.png" class="page2-airship">
            <a>点击查看我的新闻</a>
        </div>
        <div class="page3 page">
            <img src="images/main_top.jpg" class="top">
            <div class="main">
                <div class="main-row1">
                    <div class="news-con">
                        <div class="news block">
                            <div class="desc">
                                <h2>头条新闻</h2>
                                <div class="desc-con">
                                    <img src="images/news.png" >
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div class="news-pre block">
                            <span>点击发现精彩</span>
                            <img src="images/gesture.jpg" class="gesture" width="45">
                            <div class="desc">
                                <h2>头条新闻</h2>
                                <div class="desc-con">
                                    <img src="images/news.png" >
                                    <p>点击查看属于你未来的新闻</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="finance block">
                            <div class="desc">
                                <h2>财经</h2>
                                <div class="desc-con">
                                    <img src="images/news.png" >
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div class="live block">
                            <div class="desc">
                                <h2>直播</h2>
                                <div class="desc-con">
                                    <img src="images/news.png" >
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-row2">
                    <div class="entertainment block">
                        <div class="desc">
                            <h2>娱乐</h2>
                            <div class="desc-con">
                                <img src="images/news.png" >
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-row3">
                    <div class="sports block">
                        <div class="desc">
                            <h2>体育</h2>
                            <div class="desc-con">
                                <img src="images/news.png" >
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div class="social block">
                        <div class="desc">
                            <h2>社会</h2>
                            <div class="desc-con">
                                <img src="images/news.png" >
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="share-con">
                <a class="btn1">炫耀一下</a>
                <a class="btn2">再来一次</a>
            </div>
        </div>
        <script src="js/zepto.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="js/min/index-min.js"></script>
        <script>
          wx.config({
            debug: true,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
              'onMenuShareTimeline', 'onMenuShareAppMessage'
            ]
          });
        </script>
    </body>
</html>