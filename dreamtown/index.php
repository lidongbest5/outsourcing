<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<title>梦想小镇创业先锋营</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
	<body>
		<div class="loading"></div>
    	<div class="dragend-container">
    		<div class="dragend-page page0">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/index-title.png" class="title">
    			<img src="images/index-bottom.png" class="bottom">
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page1">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page1-img.png" class="img">
    			<p>
    				梦想小镇是什么？当时之所以取这个
    				名字，是希望这里成为天下有创业梦
    				想的年轻人起步的摇篮，让梦想变成
    				财富，让梦想成真。
    			</p>
    			<div>——浙江省省长李强</div>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page2">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page2-title.png" class="title">
    			<h2>2015“创业先锋营”入驻选拔赛</h2>
    			<img src="images/page2-img.png" class="img">
    			<p>
    				2月26日上午，由杭州未来科技城管委会主办
    				的2015梦想小镇“创业先锋营”入驻选拔赛
    				正式拉开帷幕。
    			</p>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page3">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page3-title.png" class="title">
    			<h2>用自己丰富的创业经验为参赛者评分<br/>并提供了项目进一步提升的建议</h2>
    			<ul>
    				<li class="person1">
    					<img src="images/page3-img1.png" width="40">
    					<h3>董江勇</h3>
    					<p>金种子创投基金合伙人及WeMedia新媒体集团董事长</p>
    				</li>
    				<li class="person2">
    					<img src="images/page3-img2.png" width="40">
    					<h3>朱晓鸣</h3>
    					<p>WeMedia新媒体集团创始人兼CEO</p>
    				</li>
    				<li class="person3">
    					<img src="images/page3-img3.png" width="40">
    					<h3>李治国</h3>
    					<p>挖财董事长</p>
    				</li>
    				<li class="person4">
    					<img src="images/page3-img4.png" width="40">
    					<h3>李先文</h3>
    					<p>浙江创投合伙人</p>
    				</li>
    				<li class="person5">
    					<img src="images/page3-img5.png" width="40">
    					<h3>卢艳峰</h3>
    					<p>乐创会创始人及秘书长</p>
    				</li>
    			</ul>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page4">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page4-title.png" class="title">
    			<div class="map">
    				<img src="images/map.png">
    				<div class="marker marker1">北京</div>
    				<div class="marker marker2">杭州</div>
    				<div class="marker marker3">上海</div>
    				<div class="marker marker4">韩国</div>
    			</div>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page5">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page5-img1.png" width="50" class="img1">
    			<img src="images/page5-img2.png" width="50" class="img2">
    			<div>
    				<img src="images/page5-img3.png" width="60" class="img3">
    				<img src="images/page5-img4.png" width="50" class="img4">
    			</div>
    			<p>涵盖智能穿戴、车联网、社交等新兴领域</p>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page6">
    			<img src="images/logo.png" width="56" class="logo">
    			<div>
    				<h3>12把首批入驻梦想小镇的金钥匙</h3>
    				<img src="images/key.png" width="115" class="img1">
    				<p>凡入驻小镇的创业项目将获得优厚的的扶持政策</p>
    				<img src="images/page6-title.png" width="60" class="img2">
    			</div>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page7">
    			<img src="images/logo.png" width="56" class="logo">
    			<ul>
    				<li class="list1">
    					<img src="images/page7-img1.png" width="44"><span>最长三年的免租办公场地</span>
    				</li>
    				<li class="list2">
    					<img src="images/page7-img2.png" width="46"><span>最高100万元的风险池贷款</span>
    				</li>
    				<li class="list3">
    					<img src="images/page7-img3.png" width="46"><span>30万元商业贷款贴息</span>
    				</li>
    				<li class="list4">
    					<img src="images/page7-img4.png" width="46"><span>云服务</span>
    				</li>
    				<li class="list5">
    					<img src="images/page7-img5.png" width="40"><span>中介服务</span>
    				</li>
    				<li class="list6">
    					<img src="images/page7-img6.png" width="38"><span>人才租房</span>
    				</li>
    			</ul>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page8">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page8-title.png" class="title">
    			<ul>
    				<li class="key1">杭州联线电子商务有限公司</li>
    				<li class="key2">11点11分</li>
    				<li class="key3">“推拿狮”<br/>O2O平台</li>
    				<li class="key4">车点点</li>
    				<li class="key5">3D打印云服务平台</li>
    				<li class="key6">零米网络</li>
    				<li class="key7">虚拟现实</li>
    				<li class="key8">杭州讯点科技—3D打印</li>
    				<li class="key9">蝌蚪音客</li>
    				<li class="key10">大福平板电脑</li>
    				<li class="key11">人力资源服务业线上线下技术结合服务平台</li>
    				<li class="key12">悦影科技</li>
    			</ul>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page9">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page9-title.png" class="title">
    			<img src="images/qr.png" class="img">
    			<p>扫描关注未来科技城微信<br/>了解未来科技城更多服务信息</p>
    			<img src="images/arrow.png" width="20" class="arrow">
    		</div>
    		<div class="dragend-page page10">
    			<img src="images/logo.png" width="56" class="logo">
    			<img src="images/page10-title.png" class="title">
    		</div>
    	</div>
        <script src="js/zepto.min.js"></script>
        <script src="js/dragend.min.js"></script>
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
