<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html class="one-screen">
	<head>
		<title></title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="css/index.css">
    <script>
      if( window.location.href.indexOf('wxopenid') == -1 ){
        window.location.href = 'http://www.weixingate.com/gate.php?back='+ window.location.href +'&force=1';
      }
    </script>
	</head>
	<body>
		<div class="loading"></div>
         <div class="index-main">
          <img src="images/index_bg.png">
          <div class="item1 index-item" data-id="1" data-height="284"><i></i></div>
          <div class="item2 index-item" data-id="2" data-height="205"><i></i></div>
          <div class="item3 index-item" data-id="3" data-height="220"><i></i></div>
          <div class="item4 index-item" data-id="4" data-height="269"><i></i></div>
          </div>
          <div class="project1 project">
            <div class="dragend-container">
              <div class="dragend-page page1">
                <div class="title"></div>
                <div class="text"></div>
                <div class="logo"></div>
               <div class="arrow"></div>
                <div class="music"></div>
              </div>
              <div class="dragend-page page2">
                <div class="title"></div>
                <div class="text"></div>
                <div class="logo"></div>
                <div class="arrow"></div>
               <div class="music"></div>
              </div>
              <div class="dragend-page page3">
                <div class="title"></div>
                <div class="text"></div>
                <div class="logo"></div>
                <div class="arrow"></div>
               <div class="music"></div>
              </div>
              <div class="dragend-page page4">
                <div class="title"></div>
                <div class="text"></div>
                <div class="logo"></div>
                <div class="arrow"></div>
               <div class="music"></div>
              </div>
              <div class="dragend-page page5">
                <div class="title"></div>
                <div class="text"></div>
                <div class="logo"></div>
                <div class="arrow"></div>
               <div class="music"></div>
              </div>
              <div class="dragend-page page6">
                <img src="images/project1/submit_bg.jpg">
                <div class="logo"></div>
                <div class="name"><input type="text"></div>
                <div class="phone"><input type="text"></div>
                <div class="submit"></div>
                <div class="upload"><input type="file"></div>
               <div class="bg"></div>
               <div class="upload-failed"></div>
               <div class="upload-success"></div>
               <div class="music"></div>
               <div class="tips"></div>
              </div>
            </div>
          </div>
         <div class="project2 project">
           <div class="index-page pt-page pt-page-current">
             <img src="images/project2/duilian1.png" class="i1">
             <img src="images/project2/duilian2.png" class="i2">
             <img src="images/project2/index_btn.png" class="i3">
           </div>
           <div class="second-page pt-page">
             <div class="holder">
               <img src="images/project2/info.png">
               <div>
                 <div class="i1 i"></div>
                 <div class="i2 i"></div>
               </div>
               <div>
                 <div class="i3 i"></div>
                 <div class="i4 i"></div>
                 <div class="i5 i"></div>
                 <div class="i6 i"></div>
               </div>
             </div>
             <select>
               <option>白羊座</option>
               <option>金牛座</option>
               <option>双子座</option>
               <option>巨蟹座</option>
               <option>狮子座</option>
               <option>处女座</option>
               <option>天秤座</option>
               <option>天蝎座</option>
               <option>射手座</option>
               <option>摩羯座</option>
               <option>水瓶座</option>
               <option>双鱼座</option>
             </select>
             <img src="images/project2/next.jpg" class="next no-delay">
           </div>
           <div class="page1 pt-page">
             <img src="images/project2/q1.png" class="q1 q">
             <div class="a1 a" data="5000"><i></i>
               <img src="images/project2/q1-a1.png">
             </div>
             <div class="a2 a" data="3000"><i></i>
               <img src="images/project2/q1-a2.png">
             </div>
             <div class="a3 a" data="1000"><i></i>
               <img src="images/project2/q1-a3.png">
             </div>
             <div class="a4 a" data="0"><i></i>
               <img src="images/project2/none.png">
             </div>
             <img src="images/project2/next.jpg" class="next">
           </div>
           <div class="page2 pt-page">
             <img src="images/project2/q2.png" class="q2 q">
             <div class="a1 a" data="3000"><i></i>
               <img src="images/project2/q2-a1.png">
             </div>
             <div class="a2 a" data="1000"><i></i>
               <img src="images/project2/q2-a2.png">
             </div>
             <div class="a3 a" data="5000"><i></i>
               <img src="images/project2/q2-a3.png">
             </div>
             <div class="a4 a" data="0"><i></i>
               <img src="images/project2/none.png">
             </div>
             <img src="images/project2/next.jpg" class="next">
           </div>
           <div class="page3 pt-page">
             <img src="images/project2/q3.png" class="q3 q">
             <div class="a1 a" data="3000"><i></i>
               <img src="images/project2/q3-a1.png">
             </div>
             <div class="a2 a" data="5000"><i></i>
               <img src="images/project2/q3-a2.png">
             </div>
             <div class="a3 a" data="1000"><i></i>
               <img src="images/project2/q3-a3.png">
             </div>
             <div class="a4 a" data="0"><i></i>
               <img src="images/project2/none.png">
             </div>
             <img src="images/project2/next.jpg" class="next">
           </div>
           <div class="page4 pt-page">
             <img src="images/project2/q4.png" class="q4 q">
             <div class="a1 a" data="3000"><i></i>
               <img src="images/project2/q4-a1.png">
             </div>
             <div class="a2 a" data="1000"><i></i>
               <img src="images/project2/q4-a2.png">
             </div>
             <div class="a3 a" data="5000"><i></i>
               <img src="images/project2/q4-a3.png">
             </div>
             <div class="a4 a" data="0"><i></i>
               <img src="images/project2/none.png">
             </div>
             <img src="images/project2/next.jpg" class="next">
           </div>
           <div class="page5 pt-page">
             <img src="images/project2/q5.png" class="q5 q">
             <div class="a1 a" data="5000"><i></i>
               <img src="images/project2/q5-a1.png">
             </div>
             <div class="a2 a" data="1000"><i></i>
               <img src="images/project2/q5-a2.png">
             </div>
             <div class="a3 a" data="3000"><i></i>
               <img src="images/project2/q5-a3.png">
             </div>
             <div class="a4 a" data="0"><i></i>
               <img src="images/project2/none.png">
             </div>
             <img src="images/project2/next.jpg" class="next">
           </div>
           <div class="page6 pt-page">
             <img src="images/project2/top.png" class="top">
             <div class="r-con"></div>
             <img class="logo" src="images/logo.png" width="77">
           </div>
           <div class="page7 pt-page">
             <img src="images/project2/top.png" class="top">
             <div class="r-con"></div>
             <img class="logo" src="images/logo.png" width="77">
             <div class="share">
             <img src="images/share-modal.png">
           </div>
           </div>
         </div>
         <div class="project3 project">
           <div class="dragend-container">
             <div class="dragend-page page1">
               <img src="images/project3/index_title1.png" class="p1">
               <img src="images/project3/index_title2.png" class="p2">
               <img src="images/project3/index_title3.png" class="p3">
               <img src="images/project3/arrow.png" class="arrow">
               <img src="images/project3/logo.png" class="logo">
             </div>
             <div class="dragend-page page2">
               <img src="images/project3/bg1.png" class="curtain">
               <img src="images/project3/next.png" class="next">
               <div class="q-container">
                 <div class="qq-container">
                 </div>
               </div>
             </div>
           </div>
           <div class="result-page">
             <div class="r1"></div>
             <div class="r2"></div>
           </div>
           <div class="prize-page">
             <div class="code"></div>
             <div class="u">
               <input type="text" class="name">
               <input type="text" class="phone">
             </div>
             <img src="images/project3/sub.png" class="submit">
             <img src="images/project1/upload_scuceed.png" class="success">
           </div>
           <div class="share-page"><img src="images/share-modal.png"></div>
         </div>
         <div class="project4 project">
           <div class="page1 pt-page pt-page-current"><img src="images/project4/index_bg.jpg"></div>
           <div class="page2 pt-page">
             <img src="images/project4/title.png" class="i1">
             <img src="images/project4/shake.png" class="i2">
             <img src="images/project4/main.png" class="i3">
             <img src="images/project4/qian.png" class="i4">
             <img src="images/project4/btn.png" class="i5">
           </div>
           <div class="page3 pt-page">
             <div class="result"></div>
             <img src="images/project4/share_btn.png">
               <div class="share">
                 <img src="images/share-modal.png">
               </div>
           </div>
           <div class="page4 pt-page">
             <img src="images/project4/rr.png" class="r1">
             <a href="/projects/subangdai/?project4"><img src="images/project4/btn1.png" class="r2"></a>
             <img src="images/project4/logo.png" class="r3" width="68">
           </div>
           <div class="page5 pt-page">
             <img src="images/project4/logo.png" width="68">
             <div>
               <img src="images/project4/r_main.png">
               <p>已有<span>0</span>名小伙伴<br/>成功帮你破五</p>
             </div>
           </div>
           <div class="page6 pt-page">
             <img src="images/project4/rr1.png" class="r1">
             <div>
               <input type="text" class="name">
               <input type="text" class="phone">
             </div>
             <img src="images/project4/sub.png" class="r2">
             <img src="images/project1/upload_scuceed.png" class="success">
           </div>
         </div>
        <script src="js/jquery.js"></script>
        <script src="js/dragend.min.js"></script>
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
              'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage', 'downloadImage'
            ]
          });
        </script>
        <script>
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?dada448a90ad834d096f3de541f6fe14";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        </script>
	</body>
</html>