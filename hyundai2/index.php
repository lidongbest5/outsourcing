<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
$now_ua = array('FeedDemon ','BOT/0.1 (BOT for JCE)','CrawlDaddy ','Java','Feedly','UniversalFeedParser','ApacheBench','Swiftbot','ZmEu','Indy Library','oBot','jaunty','YandexBot','AhrefsBot','YisouSpider','jikeSpider','MJ12bot','WinHttp','EasouSpider','HttpClient','Microsoft URL Control','YYSpider','jaunty','Python-urllib','lightDeckReports Bot', 'CFNetwork', 'Suspected bot masqurading as Mozilla', 'Web Core / Roots', 'Pioneer', 'spider', 'Motor');
if(!$ua) {
header("Content-type: text/html; charset=utf-8");
exit();
}else{
    foreach($now_ua as $value )
    if(eregi($value,$ua)) {
    header("Content-type: text/html; charset=utf-8");
    exit();
    }
}
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>"我与自媒体的这一年"征文活动，大奖等你来领！</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
        <div class="loading"></div>
        <div class="share">
            <img src="images/share-modal.png">
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="page1 swiper-slide">
                    <img src="images/slide.png" width="64">
                </div>
                <div class="main swiper-slide">
                    <div class="main-con">
                        <div class="btns">
                            <a class="btn1"></a>
                            <a class="btn2"></a>
                        </div>
                        <div class="content">
                            <div class="article-list con">
                                <img src="images/btn1.png" class="content-icon" width="46">
                                <div class="tabs">
                                    <a class="cur" data-index="1">一等奖</a>
                                    <a data-index="2">二等奖</a>
                                    <a data-index="3">三等奖</a>
                                    <a data-index="4">四等奖</a>
                                </div>
                                <div class="content-main">
                                    <div class="prize prize1">
                                        <h1>一等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="prize prize2">
                                        <h1>二等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="prize prize3">
                                        <h1>三等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="prize prize4">
                                        <h1>四等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="fans-list con">
                                <img src="images/btn2.png" class="content-icon" width="46">
                                <div class="tabs">
                                    <a class="cur" data-index="1">一等奖</a>
                                    <a data-index="2">二等奖</a>
                                </div>
                                <div class="content-main">
                                    <div class="prize prize5">
                                        <h1>一等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    <div class="prize prize6">
                                        <h1>二等奖</h1>
                                        <table>
                                            <thead><tr>
                                                    <th width="10%"></th>
                                                    <th width="40%"></th>
                                                    <th width="25%"></th>
                                                    <th width="25%"></th>
                                                </tr></thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="article con">
                                <div class="content-main"></div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <img src="images/logo.png" class="logo" width="40">
                        <span class="share-text">分享活动</span>
                        <span class="num">阅读量：</span>
                    </div>
                </div>
            </div>
        </div>
        <script src="js/zepto.min.js"></script>
        <script src="js/idangerous.swiper.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="js/min/index-min.js"></script>
        <script>
          wx.config({
            debug: false,
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
