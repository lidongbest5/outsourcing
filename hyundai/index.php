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
        <div class="loading"></div>
        <div class="main pt-page pt-page-current">
        	<img src="images/top.jpg" class="top">
        	<div class="container">
        		<img src="images/rule.jpg" class="rule-btn">
        		<p>请从下方词语中选出您的热词</p>
        		<div class="words" id="words">
        			<a class="w1" data-widht="100" data-value="历9而新" data-count="0" data-id="1"><img src="images/w1.png" height="20"></a>
        			<a class="w2" data-widht="150" data-value="一点一滴的好" data-count="0" data-id="2"><img src="images/w2.png" height="20"></a>
        			<a class="w3" data-widht="165" data-value="我回老家上堂课" data-count="0" data-id="3"><img src="images/w3.png" height="20"></a>
        			<a class="w4" data-widht="125" data-value="且行且珍惜" data-count="0" data-id="4"><img src="images/w4.png" height="20"></a>
        			<a class="w5" data-widht="143" data-value="对爱不要吝啬" data-count="0" data-id="5"><img src="images/w5.png" height="20"></a>
        			<a class="w6" data-widht="176" data-value="不服老的小苹果" data-count="0" data-id="6"><img src="images/w6.png" height="20"></a>
        			<a class="w7" data-widht="187" data-value="乐享极致才是王道" data-count="0" data-id="7"><img src="images/w7.png" height="20"></a>
        			<a class="w8" data-widht="100" data-value="感恩长9" data-count="0" data-id="8"><img src="images/w8.png" height="20"></a>
        			<a class="w9" data-widht="214" data-value="心之所向的一路向前" data-count="0" data-id="9"><img src="images/w9.png" height="20"></a>
        			<a class="w10" data-widht="170" data-value="绝不中庸的坚持" data-count="0" data-id="10"><img src="images/w10.png" height="20"></a>
        			<a class="w11" data-widht="126" data-value="中国好男人" data-count="0" data-id="11"><img src="images/w11.png" height="20"></a>
        			<a class="w12" data-widht="130" data-value="红包满天飞" data-count="0" data-id="12"><img src="images/w12.png" height="20"></a>
        			<a class="w13" data-widht="176" data-value="IT男们的历久而新" data-count="0" data-id="13"><img src="images/w13.png" height="20"></a>
                    <div class="words-select">
                        <div class="words-con">
                            <img height="21" class="select-word">
                        </div>
                        <div class="num-con">
                            <img src="images/zan.png" class="zan"><span class="zan-num"></span>
                        </div>
                    </div>
        		</div>
        		<div class="input">
        			<input type="text" class="input-word">
        			<a class="submit"></a>
        		</div>
        		<div class="icons">
        			<img src="images/icon1.png" class="icon1">
        			<img src="images/icon2.png" class="icon2">
        			<img src="images/icon3.png" class="icon3">
        		</div>
        	</div>
        	<img src="images/footer.jpg" class="footer">
        	<p class="bottom"></p>
            <div class="bottom-logo"></div>
        </div>
        <div class="signup pt-page">
            <img src="images/sign-top.jpg" class="sign-top">
            <div>
                ID:
                <input type="text" class="sign-id">
                <a class="sign-btn">我要报名</a>
            </div>
            <a class="back-index">返回首页</a>
            <img src="images/sign-bottom.jpg" class="sign-bottom">
        </div>
        <div class="modal modal1">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/rule-title.png">
                        1.活动主题：观点评世界  谈笑有<span class="red">自</span>儒<br/>
                        2.活动时间：2015年3月2日00∶00起至2015年3月8日24∶00止，以北京时间为标准时间。<br/>
                        3.活动概述：3月2日开始，点击参与热词票选，与就有机会抽取薄动心弦 vivo X5Max手机！<br/>
                        4.活动说明：<br/>
                        参与方式：<br/>
                                          1）热词票选活动：用户使用智能手机或其他智能终端参加热词票选活动，为热词库中您所支持的热词库点赞或提交原创热词后，填写自己真实的姓名和手机号参与抽奖。<br/>
                                          2）征文活动：自媒体（限WeMedia联盟成员）点击自媒体体报名专区，填写公众号ID报名，并选取相应热词撰文发布参加评选。<br/>
                        获奖名单：将于活动结束后在WeMedia公众号及北京现代公众号同步公布。<br/>
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
                               1）网友投票奖励：用户中奖日起，5个工作日内与对方电话确认中奖信息，15个工作日内发放奖品给中奖用户。<br/>
                               2）自媒体征文奖励：由工作人员单独沟通后发放奖品<br/>
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
        <div class="modal modal4">
            <div class="modal-container">
                <img src="images/logo.jpg" width="102" class="logo">
                <img src="images/close.jpg" width="14" class="close">
                <div class="modal-con">
                    <div>
                        <img src="images/prize.png" class="prize">
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
                               1）网友投票奖励：用户中奖日起，5个工作日内与对方电话确认中奖信息，15个工作日内发放奖品给中奖用户。<br/>
                               2）自媒体征文奖励：由工作人员单独沟通后发放奖品<br/><br/>

                        获奖名单：将于活动结束后在WeMedia公众号及北京现代公众号同步公布。

                    </div>
                </div>
                <a class="modal-btn back">返回首页</a>
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
        <div class="share">
            <img src="images/share-modal.png">
          </div>
        <script src="js/zepto.min.js"></script>
        <script src="js/min/iscroll-min.js"></script>
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
