<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>2016财年全国客服工作研讨会</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/swiper.min.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
		<div class="loading"></div>
		<img src="images/music.png" class="music play">
    	<div class="swiper-container" id="mySwiper">
    		<div class="swiper-wrapper">
    			<div class="swiper-slide page1">
    				<img src="images/index1.png" class="page1-1">
    				<div class="page1-2">
    					<img src="images/index4.png" class="page1-3">
    					<img src="images/index3.png" class="page1-4">
    					<div class="tap-btn"></div>
    				</div>
    				<img src="images/arrow.png" class="arrow">
    			</div>
    			<div class="swiper-slide page2">
    				<div class="page2-1">
    					<img src="images/pin1.png" class="pin1">
    					<img src="images/pin2.png" class="pin2">
    				</div>
    				<img src="images/page2-2.png" class="page2-2">
    				<img src="images/arrow.png" class="arrow">
    			</div>
    			<div class="swiper-slide page3">
    				<img src="images/page3-1.png" class="page3-1">
    				<div class="roll">
    					<img src="images/roll1.png" class="roll1">
    					<img src="images/roll2.png" class="roll2">
    					<img src="images/roll3.png" class="roll3">
    					<img src="images/roll4.png" class="roll4">
    				</div>
    				<img src="images/page3-2.png" class="page3-2">
    				<img src="images/page3-3.png" class="page3-3">
    			</div>
    			<div class="swiper-slide page4">
    				<div class="page4-0">
    					<img src="images/page4-1.png" class="page4-1">
    					<img src="images/page4-2.png" class="page4-2">
    					<img src="images/page4-3.png" class="page4-3">
    					<img src="images/page4-5.png" class="page4-5">
    					<img src="images/page4-6.png" class="page4-6">
    					<img src="images/page4-7.png" class="page4-7">
    					<img src="images/page4-8.png" class="page4-8">
    					<img src="images/page4-9.png" class="page4-9">
    					<img src="images/page4-10.png" class="page4-10">
    					<img src="images/page4-11.png" class="page4-11">
    					<img src="images/page4-12.png" class="page4-12">
    					<img src="images/page4-13.png" class="page4-13">
    					<img src="images/page4-14.png" class="page4-14">
    					<img src="images/page4-15.png" class="page4-15">
    				</div>
    				<img src="images/arrow.png" class="arrow">
    			</div>
    			<div class="swiper-slide page5">
    				<img src="images/page5-1.png" class="page5-1">
    				<img src="images/page5-2.png" class="page5-2">
    				<img src="images/arrow1.png" class="arrow1">
    			</div>
    		</div>
    	</div>
    	<audio src="css/music.mp3" id="mp3" autoplay loop></audio>
        <script src="js/jquery.js"></script>
        <script src="js/min/idangerous.swiper.min.js"></script>
        <script src="js/min/index-min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
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
          wx.ready(function() {
              wx.onMenuShareTimeline({
                  title: '2016财年全国客服工作研讨会',
                  link: 'http://ex.wyyun.com/xdf/',
                  imgUrl: 'http://ex.wyyun.com/xdf/images/share.png',
                  success: function () {},
                  cancel: function () {}
              });       
              wx.onMenuShareAppMessage({
                  title: '2016财年全国客服工作研讨会',
                  desc: '2016财年全国客服工作研讨会', 
                  link: 'http://ex.wyyun.com/xdf/',
                  imgUrl: 'http://ex.wyyun.com/xdf/images/share.png',
                  type: '',
                  dataUrl: '',
                  success: function () {},
                  cancel: function () {}
              });
          });
        </script>
        <script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?271a28d330fd657f6016227d7cecb310";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
	</body>
</html>
