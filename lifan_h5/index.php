<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>力帆X50为荣耀再启程上海车展2号馆见</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
        <div class="loading"></div>
        <div class="dragend-container pt-page">
        	<div class="dragend-page page1">
        		<img src="images/logo.png" class="page11" width="96">
        		<img src="images/index.png" class="page12">
        		<p>
        			4月20日 力帆X50再启程<br/>
        			上海车展2号馆11：00<br/>
        			共赴征途
        		</p>
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page2">
        		<p><b>为用户</b>力帆以搏击赛场验证品质实力</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page3">
        		<p><b>37次夺冠</b>汇聚夺冠画面 形成中国版图</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page4">
        		<p><b>两大“南北车王”</b>卢宁军、文凡领衔力帆X50出征</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page5">
        		<p><b>10年征战</b>覆盖全国各地 行程超30万公里</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page6">
        		<p><b>10年30万公里 37次冠军</b>力帆荣耀再启征程</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page7">
        		<p><b>强大心脏成就的冠军</b>双T配备（VVT+CVT)</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page8">
        		<p><b>再为先锋</b>力帆X50同级车中唯一参加拉力赛的小型SUV</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page9">
        		<p><b>力帆X50</b>7万级首款自动挡小型SUV</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        		<a class="arrow"></a>
        	</div>
        	<div class="dragend-page page10">
        		<p><b>一同见证</b>4月20日 力帆X50再启程<br/>上海车展2号馆11：00<br/>共赴征途</p>
        		<img src="images/logo.png" class="logo" width="96">
        		<img src="images/text.png" class="text">
        		<a class="sound"></a>
        	</div>
        </div>
        <script src="js/zepto.min.js"></script>
        <script src="js/dragend.js"></script>
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
        <script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?5eb996189858d176135186030e4f89de";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
	</body>
</html>
