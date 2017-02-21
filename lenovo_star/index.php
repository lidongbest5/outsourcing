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
    	<div class="index-page pt-page-current pt-page">
    		<div class="index-img"><img src="images/index-page.jpg"></div>
    		<a><img src="images/index-btn.png"></a>
    	</div>
    	<div class="photo-page pt-page">
    		<div>
	    		<div class="photo-title"><img src="images/photo.jpg"></div>
	    		<div class="photo-container">
	    			<div class="photo1" data-id="1"></div>
	    			<div class="photo2" data-id="2"></div>
	    			<div class="photo3" data-id="3"></div>
	    			<div class="photo4" data-id="4"></div>
	    			<div class="photo5" data-id="5"></div>
	    		</div>
	    	</div>
    	</div>
    	<div class="dragend-container pt-page">
    		<div class="dragend-page page1">
    			<img src="images/page2.jpg">
    			<a class="arrow"></a>
    		</div>
    		<div class="dragend-page page2">
    			<div class="container">
    				<div class="title"><img src="images/q1-t.jpg"></div>
    				<div class="ans1 ans" data-q="0" data-a="1"><img src="images/q1-a1.jpg"><i></i></div>
    				<div class="ans2 ans" data-q="0" data-a="2"><img src="images/q1-a2.jpg"><i></i></div>
    				<div class="ans3 ans" data-q="0" data-a="3"><img src="images/q1-a3.jpg"><i></i></div>
    				<div class="ans4 ans" data-q="0" data-a="4"><img src="images/q1-a4.jpg"><i></i></div>
    				<a class="cheat"></a>
    				<a class="arrow"></a>
    			</div>
    		</div>
    		<div class="dragend-page page3">
    			<div class="container">
    				<div class="title"><img src="images/q2-t.jpg"></div>
    				<div class="ans1 ans" data-q="1" data-a="1"><img src="images/q2-a1.jpg"><i></i></div>
    				<div class="ans2 ans" data-q="1" data-a="2"><img src="images/q2-a2.jpg"><i></i></div>
    				<div class="ans3 ans" data-q="1" data-a="3"><img src="images/q2-a3.jpg"><i></i></div>
    				<div class="ans4 ans" data-q="1" data-a="4"><img src="images/q2-a4.jpg"><i></i></div>
    				<a class="cheat"></a>
    				<a class="arrow"></a>
    			</div>
    		</div>
    		<div class="dragend-page page4">
    			<div class="container">
    				<div class="title"><img src="images/q3-t.jpg"></div>
    				<div class="ans1 ans" data-q="2" data-a="1"><img src="images/q3-a1.jpg"><i></i></div>
    				<div class="ans2 ans" data-q="2" data-a="2"><img src="images/q3-a2.jpg"><i></i></div>
    				<div class="ans3 ans" data-q="2" data-a="3"><img src="images/q3-a3.jpg"><i></i></div>
    				<div class="ans4 ans" data-q="2" data-a="4"><img src="images/q3-a4.jpg"><i></i></div>
    				<a class="cheat"></a>
    				<a class="arrow"></a>
    			</div>
    		</div>
    		<div class="dragend-page page5">
    			<div class="container">
    				<div class="title"><img src="images/q4-t.jpg"></div>
    				<div class="ans1 ans" data-q="3" data-a="1"><img src="images/q4-a1.jpg"><i></i></div>
    				<div class="ans2 ans" data-q="3" data-a="2"><img src="images/q4-a2.jpg"><i></i></div>
    				<div class="ans3 ans" data-q="3" data-a="3"><img src="images/q4-a3.jpg"><i></i></div>
    				<div class="ans4 ans" data-q="3" data-a="4"><img src="images/q4-a4.jpg"><i></i></div>
    				<a class="cheat"></a>
    				<a class="arrow"></a>
    			</div>
    		</div>
    		<div class="dragend-page page6">
    			<div class="container">
    				<div class="title"><img src="images/q5-t.jpg"></div>
    				<div class="ans1 ans" data-q="4" data-a="1"><img src="images/q5-a1.jpg"><i></i></div>
    				<div class="ans2 ans" data-q="4" data-a="2"><img src="images/q5-a2.jpg"><i></i></div>
    				<div class="ans3 ans" data-q="4" data-a="3"><img src="images/q5-a3.jpg"><i></i></div>
    				<div class="ans4 ans" data-q="4" data-a="4"><img src="images/q5-a4.jpg"><i></i></div>
    				<img src="images/q5-t1.jpg">
    				<a class="cheat"></a>
    				<a class="arrow"></a>
    			</div>
    		</div>
    		<div class="dragend-page page7">
    			<div class="container">
    				<div class="sub"><img src="images/submit.jpg"></div>
    				<div class="sub-btn"><img src="images/submit-btn.png"></div>
    			</div>
    		</div>
    	</div>
    	<div class="result-page pt-page">
    		<div class="container">
    			<div class="result"><img></div>
    			<div class="result-btn"><img src="images/result-btn.png"></div>
    		</div>
    		<div class="corner"></div>
    	</div>
    	<div class="cheat-page pt-page">
    		<div class="container">
    			<div class="cheat"><img src="images/beg.jpg"></div>
    			<div class="cheat-btn"><img src="images/beg-btn.png"></div>
    		</div>
    	</div>
    	<div class="modal-page">
    		<div class="modal-bg">
    			<div class="modal1 modal"></div>
    			<div class="modal2 modal"></div>
    			<div class="modal3 modal"></div>
    			<div class="modal4 modal"></div>
    			<div class="modal5 modal"></div>
                <div class="modal6 modal"></div>
    			<div class="modal7 modal"></div>
    		</div>
    	</div>
    	<div class="final-page pt-page">
    		<img src="images/final.jpg">
    	</div>
        <script src="js/zepto.min.js"></script>
        <script src="js/dragend.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="js/index.js"></script>
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
          hm.src = "//hm.baidu.com/hm.js?b4ebf35cbe1999ac7516d3f3bd735ecf";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
	</body>
</html>
