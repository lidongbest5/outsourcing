<?php
require_once "../projects/wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>点睛时创</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
<div class="container main">
	<div class="music">
		<a href="javascript:stopmusic();">
			<img src="images/music.png" alt="">
			<img class='pause' src="images/nmusic.png" alt="">
		</a>
		<audio id='music' loop autoplay style="display:none;">
			<source src="js/1.mp3" type="audio/mpeg">
		</audio>
	</div>
	<div class="lyq_share">
		<img src="images/lyq_share.png" alt="">
	</div>
	<div class="gz">
		<img class="dimg" src="images/m7_bg.jpg" alt="">
		<a href="javascript:;" class="m7_but"><img src="images/m6_but2.png" alt=""></a>
		<img class="absolute m_down" src="images/m_down.png" alt="">
	</div>
	<ul>
		<li><img class="dimg" src="images/1.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li><img class="dimg" src="images/2.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li><img class="dimg" src="images/3.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li><img class="dimg" src="images/4.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li>
			<img class="dimg" src="images/5.jpg" alt="">

			<img class="absolute m_down" src="images/m_down.png" alt="">
		</li>
		<li><img class="dimg" src="images/6.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li><img class="dimg" src="images/7.jpg" alt="">
			<img class="absolute m_down" src="images/m_down.png" alt=""></li>
		<li><img class="dimg share" src="images/8.jpg" alt="">
			</li>	</ul>
	<div class="ok_bg">
		<img src="images/ok_bg.png" alt="">
	</div>
	
</div>
</body>
</html>
<script src="js/jquery-1.9.1.js"></script>
<script src="js/jquery.touchSwipe.js"></script>
<script>
$(function(){
	var windw = $(window).width();
	var windh = $(window).height();

	$('.main').height(windh);

	document.body.addEventListener('touchmove', function (event) {event.preventDefault();}, false);
	var ch=document.documentElement.clientHeight;
	$(".main>ul>li").swipe( {
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
		{
			if(direction=='up' && !$('*').is(":animated")){
				var index=$(this).index();
				var len=$('.main>ul>li').length;
				if(index!=len-1){
					$('.main>ul>li').css('z-index','')
					$('.main>ul>li').eq(index+1).css({'top':ch-distance});
					if(phase=='end' || phase=='cancel'){
						$('.main>ul>li').eq(index+1).animate({'top':'0'},400,function(){$('.main>ul>li').eq(index).css({'top':'-100%'});});
					}
				}
			}

			if(direction=='down' && !$('*').is(":animated")){
				var index=$(this).index();
				var len=$('.main>ul>li').length;
				if(index!=0){
					$('.main>ul>li').css('z-index','');
					$('.main>ul>li').eq(index-1).css({'z-index':'3','top':distance-ch});
					if(phase=='end' || phase=='cancel'){
						$('.main>ul>li').eq(index-1).animate({'top':'0'},400,function(){$('.main>ul>li').eq(index).css({'top':'100%'});});
					}
				}
			}
		},
		threshold:1000,
		maxTimeThreshold:2500,
		fingers:1
	});
	
	//who?
	$('.m0_but').click(function(){
		$('.main>ul>li').css('z-index','')
		$('.main>ul>li').eq(1).animate({'top':'0'},400,function(){$('.main>ul>li').eq(0).css({'top':'-100%'});});
	})


	//音乐
	$('.music').click(function(){
		if($(this).hasClass('no')){
			$(this).removeClass('no');
			document.getElementById("music").play();
			$(this).find('a img.pause').hide(0).siblings('img').show(0);
		}else{
			$(this).addClass('no');
			$(this).find('a img.pause').show(0).siblings('img').hide(0);
			document.getElementById("music").pause();
		}
	})
})
</script>
<script>
$(function(){
/*	var m4_jpi = 1;
	$('.m4_lyq').click(function(){
		if(m4_jpi<6){
			$('.m4_jb0'+m4_jpi).addClass('selected')
			m4_jpi++;
		}else{

			$('.m4_yy').fadeIn(500);
			
			setTimeout(function(){
				m4_jpi=1;
				$('.m4_j').removeClass('selected');
				$('.m4_yy').fadeOut(500);
			},3000000)
		}
	})*/

	$('.m4_lyq').click(function(){
		$('.m4_j').addClass('selected')	
	})

	//分享
	$('.share').click(function(){
		$('.lyq_share').fadeIn(500);
		return false;
	})
	$('.lyq_share').click(function(){
		$(this).fadeOut(500);
	})

	$('.m6_but1').click(function(){
		$('.gz').fadeIn(500);
	})
	$('.gz').click(function(){
		$(this).fadeOut(500);
	})

	//提交ok
	$('.m10_ok').click(function(){
		$('.ok_bg').fadeIn(500);
	})
	$('.ok_bg').click(function(){
		$(this).fadeOut(500);
	})

})
</script>
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
          title: '传说中的互联网营销公司是酱紫滴！想与大神一起工作切磋，请猛戳约起！',
          link: window.location.href,
          imgUrl: 'http://www.magiceyes.com.cn/dianqing/images/share.jpg',
          success: function () {},
          cancel: function () {}
      });

      wx.onMenuShareAppMessage({
          title: '传说中的互联网营销公司是酱紫滴！想与大神一起工作切磋，请猛戳约起！',
          desc: '传说中的互联网营销公司是酱紫滴！想与大神一起工作切磋，请猛戳约起！', 
          link: window.location.href,
          imgUrl: 'http://www.magiceyes.com.cn/dianqing/images/share.jpg',
          type: '',
          dataUrl: '',
          success: function () {},
          cancel: function () {}
      });
  });
</script>