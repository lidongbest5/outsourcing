<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>2016财年全国客服工作研讨会会议总结</title>
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
                        <img src="images/page8-1.png" class="page1-1">
                        <img src="images/page1-1.png" class="page1-2">
                        <div class="page1-pic">
                            <img src="images/page1-2.jpg" class="page1-3">
                            <img src="images/page1-3.png" class="page1-4">
                        </div>
                        <img src="images/page1-4.png" class="page1-5">
                    </div>
                    <div class="swiper-slide page2">
                        <div class="page2-con">
                            <img src="images/page2-1.png" class="page2-1"> 
                            <div class="page2-pic">
                                <img src="images/page2-2.png" class="page2-2"> 
                                <img src="images/page2-3.png" class="page2-3"> 
                            </div> 
                            <img src="images/page2-4.png" class="page2-4"> 
                            <img src="images/page2-5.jpg" class="page2-5"> 
                            <img src="images/page1-4.png" class="page2-6">  
                        </div>
                    </div>
                    <div class="swiper-slide page3">
                        <div class="page3-con">
                            <img src="images/page3-1.png" class=
                            "page3-1">
                            <img src="images/page3-2.jpg" class="page3-2">  
                            <img src="images/page1-4.png" class="page3-3">  
                        </div>
                    </div>
                    <div class="swiper-slide page4">
                        <div class="page4-con">
                            <img src="images/page4-1.png" class=
                            "page4-1">
                            <img src="images/page4-2.jpg" class="page4-2">  
                            <img src="images/page1-4.png" class="page4-3">  
                        </div>
                    </div>
                    <div class="swiper-slide page5">
                        <div class="page5-con">
                            <img src="images/page5-1.png" class=
                            "page5-1">
                            <img src="images/page5-2.jpg" class="page5-2">  
                            <img src="images/page1-4.png" class="page5-3">  
                        </div>
                    </div>
                    <div class="swiper-slide page6">
                        <div class="page6-con">
                            <img src="images/page6-1.png" class=
                            "page6-1">
                            <img src="images/page6-2.jpg" class="page6-2">  
                            <img src="images/page1-4.png" class="page6-3">  
                        </div>
                    </div>
                    <div class="swiper-slide page7">
                        <div class="page7-con">
                            <img src="images/page7-1.png" class=
                            "page7-1">
                            <img src="images/page7-2.jpg" class="page7-2">  
                            <img src="images/page1-4.png" class="page7-3">  
                        </div>
                    </div>
                    <div class="swiper-slide page8">
                        <img src="images/page8-1.png" class="page8-1">
                        <img src="images/page8-2.png" class="page8-2">
                        <img src="images/page8-3.png" class="page8-3">
                    </div>
                </div>
            </div>
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
                  title: '2016财年全国客服工作研讨会会议总结',
                  link: 'http://ex.wyyun.com/xdf_review/',
                  imgUrl: 'http://ex.wyyun.com/xdf/images/share.png',
                  success: function () {},
                  cancel: function () {}
              });       
              wx.onMenuShareAppMessage({
                  title: '2016财年全国客服工作研讨会会议总结',
                  desc: '2016财年全国客服工作研讨会会议总结', 
                  link: 'http://ex.wyyun.com/xdf_review/',
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
          hm.src = "//hm.baidu.com/hm.js?c988d438f565c76d23a872c28a2a0672";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
	</body>
</html>
