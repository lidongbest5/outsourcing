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
		<title></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/swiper.min.css">
	</head>
	<body>
		<div class="loading"></div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="page1 swiper-slide">
                    <img src="images/slide.png" width="64">
                </div>
                <div class="main swiper-slide">
                    <div class="main-scroll scroll">
                        <img src="images/top.jpg" class="top">
                        <div class="content">
                            <div class="list">
                                <img src="images/hot.png" width="98" class="hot">
                                <div class="content-top">
                                    <img src="images/rule.png" width="50" class="rule">
                                    <img src="images/search.png" width="50" class="search">
                                </div>
                                <div class="content-main">
                                    <div>
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="article">
                                <div class="article-top">
                                    <img src="images/vote.png" class="vote" width="50">
                                    <img src="images/return.png" class="return" width="50">
                                    <h1></h1>
                                    <h2></h2>
                                </div>
                                <div class="article-main">
                                    <div class="article-con"></div>
                                </div>
                            </div>
                            <div class="search-con">
                                <div class="search-bar">
                                    <input type="text" class="search-input">
                                    <a class="search-btn"></a>
                                </div>
                                <a class="search-back">返回首页</a>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <img src="images/prize.png" class="prize">
                        <div class="bottom-tip clearfix">
                            <div class="share">分享活动</div>
                            <div class="bottom-data"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed"></div>
        <div class="modal modal1">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/rule-title.png">
                        1.活动主题：观点评世界  谈笑有<span class="red">自</span>儒<br/>
                        2.活动时间：2015年3月9日00∶00起至2015年3月24日24∶00止，以北京时间为标准时间<br/>
                        3.活动概述：3月9日开始，点击参与热文投票，与就有机会抽取薄动心弦 vivo X5Max手机！<br/>
                        4.活动说明：<br/>
                        参与方式：<br/>
                        用户使用智能手机或其他智能终端参与活动，为你支持的文章投票后，填写自己真实的姓名和手机号即可参与抽奖。<br/>
                        获奖名单：将于3月25日在WeMedia公众号及北京现代公众号同步公布。<br/>
                        奖品设置：<br/>
                                          1）网友投票奖励：<br/>一等奖（20名）：高保真Hi-Fi耳机vivo XE600i<br/>
                                                                       二等奖（20名）：vivo移动电源P60 <br/>
                                          2）自媒体征文奖励：<br/>一等奖（10名）：Apple MacBook Air <br/>
                                                                          二等奖（10名）：乐视TV X50air <br/>
                                                                          三等奖（10名）：薄动心弦 vivo X5Max手机<br/>
                                                                          四等奖（30名）：IPad mini 3 <br/>
                                                                          参与奖（前200名）：蒙牛M-PLus一箱<br/>
                        中奖须知：填写自己真实的姓名和手机号<span class="red">参与抽奖</span>，以便在您中奖后及时与您取得联系、为您派发奖品。<br/>
                        奖品发送流程：<br/>
                        用户中奖日起，5个工作日内与对方电话确认中奖信息，15个工作日内发放奖品给中奖用户。<br/>
                        <span class="red">禁止上传暴力、色情词汇。</span><br/>
                        免责声明<br/>
                        1、 参与者应保证提交的个人信息真实、有效，如因提交的个人信息有误导致奖品无法发放，责任由中奖用户自行承担。<br/>
                        2、如果发现有参与者使用任何不正当手段参加活动，包括但不限于以下情况，主办方有权取消其中奖资格：<br/>
                        a) 任何有违本活动目的和宗旨；<br/>
                        b) 不遵守本活动规则参与活动；<br/>
                        c) 影响活动正常有序进行等。<br/>
                        3、奖品一经确认，不设退还、不兑现。收到主办方快递的奖品后，请当场确认是否完好。若发现异常请直接与送件人员提出。若签收后发现奖品损坏，活动主办方将不承担责任。<br/>
                        4、所有奖品以最终实物为准。<br/>
                        5、登录网站产生的流量费用，由参与抽奖的用户自行承担。<br/>
                        6、对因不可抗力导致本活动提前终止，北京现代汽车有限公司免予承担责任。<br/>
                        （活动解释权归北京现代及WeMedia所有）

                    </div>
                </div>
                <a class="modal-btn back">返回首页</a>
            </div>
        </div>
        <div class="modal modal2">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/success.png" class="success">
                    </div>
                </div>
                <a class="modal-btn back">返回首页</a>
            </div>
        </div>
        <div class="modal modal3">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/thanks.png" class="thanks">
                        <div>姓名：<input type="text" class="name"></div>
                        <div>电话：<input type="text" class="phone"></div>
                    </div>
                </div>
                <a class="modal-btn btn1">大方的飘过</a>
                <a class="modal-btn btn2">我要中大奖</a>
            </div>
        </div>
        <div class="modal modal5">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/prize.jpg" class="prize-img">
                    </div>
                </div>
                <a class="modal-btn back">返回首页</a>
            </div>
        </div>
         <div class="modal modal6">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        您已为此文章投过票了！
                    </div>
                </div>
                <a class="modal-btn back">返回</a>
            </div>
        </div>
        <div class="share">
            <img src="images/share-modal.png">
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
