(function(){
	"use strict";

    var $dom 			=	$('#prize'),
    	$error 			= 	$dom.find('.login-msg'),

    	isLogin 		=	false,
    	count 			=	0,
    	recentTime 		=	0,
    	recordData 		=	null,
    	needRecord 		=	true,
    	recordCount 	=	0,
    	awardValue 		=	0,
        isPrize         =   false,
        isGot           =   true,
        inter,
        text,
        result			=	0,
        dataForWeixin,

        isAndroid   =   (/Android/i).test(navigator.userAgent),

    init				=	function(){

    	checkLogin();

    	setRank();

    	getRecord();

    	setPosition();

    	setWechat();

    	bindEventListener();
    },

    ajaxHandler 		=	function(ajaxUrl, data, callback, flag){
		$.ajax({
			type:		'POST',
			url:		ajaxUrl,
			dataType:	'json',
			data:		data,
			success:	function(jsonData){
				if(jsonData.errorCode === 0 || flag ){
					callback(jsonData);
				}
				else{
					alert('网络错误，请重试！');
				}
			},
			error:		function(){
			    alert('网络错误，请重试！');
			}
		});
    },

    setPosition 		=	function(){

    	window.win_width 		=	$('.main').width();

    	$dom.find('.lottery').css({'top':window.win_width*200/320,'left':(window.win_width-254)/2})
    },

    setWechat			=	function(){
    	dataForWeixin={
    	    appId:"",
    	    MsgImg:"",
    	    TLImg:"",
    	    url:'https://events.souyidai.com/lottery/?from=weixin',
    	    title:'投资@搜易贷，赚收益！拿iPhone6！100%中奖，来就送~',
    	    desc:'投资@搜易贷，赚收益！拿iPhone6！100%中奖，来就送~',
    	    fakeid:"",
    	    callback:function(){}
    	};
    	var onBridgeReady=function(){
    	    WeixinJSBridge.on('menu:share:appmessage', function(argv){
    	        WeixinJSBridge.invoke('sendAppMessage',{
    	            "appid":dataForWeixin.appId,
    	            "img_url":dataForWeixin.MsgImg,
    	            "img_width":"120",
    	            "img_height":"120",
    	            "link":dataForWeixin.url,
    	            "desc":dataForWeixin.desc,
    	            "title":dataForWeixin.title
    	        }, function(res){(dataForWeixin.callback)();});
    	    });
    	    WeixinJSBridge.on('menu:share:timeline', function(argv){
    	        (dataForWeixin.callback)();
    	        WeixinJSBridge.invoke('shareTimeline',{
    	            "img_url":dataForWeixin.TLImg,
    	            "img_width":"120",
    	            "img_height":"120",
    	            "link":dataForWeixin.url,
    	            "desc":dataForWeixin.desc,
    	            "title":dataForWeixin.title
    	        }, function(res){
    	        	onShare();
    	        });
    	    });
    	    WeixinJSBridge.on('menu:share:weibo', function(argv){
    	        WeixinJSBridge.invoke('shareWeibo',{
    	            "content":dataForWeixin.title,
    	            "url":dataForWeixin.url
    	        }, function(res){(dataForWeixin.callback)();});
    	    });
    	    WeixinJSBridge.on('menu:share:facebook', function(argv){
    	        (dataForWeixin.callback)();
    	        WeixinJSBridge.invoke('shareFB',{
    	            "img_url":dataForWeixin.TLImg,
    	            "img_width":"120",
    	            "img_height":"120",
    	            "link":dataForWeixin.url,
    	            "desc":dataForWeixin.desc,
    	            "title":dataForWeixin.title
    	        }, function(res){});
    	    });
    	    WeixinJSBridge.call('hideToolbar');
    	};
    	if(document.addEventListener){
    	    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    	}else if(document.attachEvent){
    	    document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
    	    document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    	}
    },

    checkLogin 			=	function(){
    	ajaxHandler('/event/userinfo',{},callbackLogin);
    },

    callbackLogin 		=	function( data ){
    	if( $dom.find('.login').css('display') === 'block' ){
    		hideModal();
    	}

    	if( data.user ){
    		isLogin 	=	true;

    		var len 	=	data.user.awards ? data.user.awards.length : 0,
				temp    = 	'<p>'+ data.user.username +'，欢迎您</p><p>剩余刮奖机会：<span class="count">'+data.user.lotteryCount+'</span>次</p>';

			if( data.user.coupon ){
				temp        +=  '<p>刮奖所获奖励：' + data.user.coupon + '元红包<a href="https://m.souyidai.com/account/coupon" target="_blank">立即查看</a></p>';
			}

			for( var i = 0; i < len; i++ ){
				var id 	=	data.user.awards[i].id,
                    prefix  =   '1个';
                if( id == '1' ){
                    prefix  =   '1部';
                }
                else if( id == '2' ){
                    prefix  =   '1台';
                }
				temp 	+=	'<p>' + data.user.awards[i].desc + '  '+ prefix +'</p>';
			}

            

            if( data.user.coupon == 0 && len == 0 ){
                isGot   =   false;   
            }

    			count 	=	data.user.lotteryCount;

    			$dom.find('.after-login').show().find('.login-tips').html(temp);
    			$dom.find('.before-login').hide();
    	}
    	else{
    		$dom.find('.before-login').show();
    		$dom.find('.after-login').hide()
    	}
    },

    setRank 			=	function(){
    	ajaxHandler('/event/rank',{},callbackRank);
    },

    callbackRank 		=	function( data ){
    	var len 		=	data.data.length > 5 ? 5 : data.data.length;
    	for( var i = 0; i < len; i++ ){
    		$dom.find('.rank ul').append('<li><i>'+ (i + 1) +'</i>'+ data.data[i].username +'<span>'+ data.data[i].amount +'</span></li>');
    	}
    },

    getRecord 			=	function(){
    	ajaxHandler('/event/recentlottoryhistory',{},callbackRecord);
    },

    callbackRecord 		=	function( data ){
    	recordData 		=	data;

    	$dom.find('.prize-list ul').empty();

    	if( data.data.length <= 5 ){
    		var len 	=	data.data.length;
    		for( var i = 0; i < len; i++ ){
				$dom.find('.prize-list ul').prepend('<li><span>'+ data.data[i].award +'</span>'+ data.data[i].username +'</li>');
    		}
    	}
    	else{
    		for( var i = 0; i < 5; i++ ){
				$dom.find('.prize-list ul').prepend('<li><span>'+ data.data[i].award +'</span>'+ data.data[i].username +'</li>');
    		}
    		var len 	=	data.data.length;
    		recordCount 	=	4;
            window.clearInterval(inter);
    		inter         =   setInterval(function(){
    			recordCount++;
    			if( recordCount >= len ){
    				recordCount = 0;
    			}
    			var $temp 	=	$('<li style="display:none;"><span>'+ recordData.data[recordCount].award +'</span>'+ recordData.data[recordCount].username +'</li>');
    			$dom.find('.prize-list ul').prepend($temp);
    			$dom.find('.prize-list ul').animate({'top':36}, 500, function(){
    				$temp.fadeIn();
    				$dom.find('.prize-list ul').css('top',0);
    			});
    			$dom.find('.prize-list ul li:gt(4)').remove();
    		}, 3000);
    	}
    },

    onRotate 			=	function(){
    	if( $(this).hasClass('no-login') ){
    		onLogin();
    	}
    	else if( !isPrize ){
    		if( count === 0 ){
    			showModal(4);
                if( !isGot ){
                    $dom.find('.modal5 .share').remove();
                    $dom.find('.modal5 img').remove();                
                }
    		}
    		else{
				$prizeRotate.rotate({
					angle:0, 
					duration: 5000, 
					animateTo: 0
				});
                isPrize     =   true;
    			ajaxHandler('/event/userlottory',{},callbackLottory, true);
    		}
    	}
    },

    callbackLottory 	=	function(data){
    	$dom.find('#container').empty();
		var lottery = new Lottery('container', 'images/1.png', 'image', 254, 135, drawPercent);
    	lottery.init('images/2.png', 'image');
    	$dom.find('.lottery-container').show();
    	$dom.find('.lottery-prize div').hide();
    	if( data.errorCode === 1 ){
    		$dom.find('.lotter-container').hide();
    		showModal(5);
    	}
    	else{
    		var id	 	=	data.data.id,
    			$ele 	=	$dom.find('.lottery-prize div');

    		text 	=	data.data.desc;

    		setTimeout(function(){
    			switch( id ){
    				case "1":
    					result	=	1;
    					$ele.attr('class','prize2').html('');
    					break;
    				case "2":
    					result	=	2;
    					$ele.attr('class','prize3').html('');
    					break;
    				case "3":
    					result	=	3;
    					$ele.attr('class','prize4').html('');
    					break;
    				case "10001":
    					result	=	4;
    					$ele.attr('class','prize1').html('100');
    					$dom.find('.modal-prize').html('100');
    					break;
    				case "10002":
    					result	=	5;
    					$ele.attr('class','prize1').html('50');
    					$dom.find('.modal-prize').html('50');
    					break;
    				case "10003":
    					result	=	6;
    					$ele.attr('class','prize1').html('20');
    					$dom.find('.modal-prize').html('20');
    					break;
    				case "10004":
    					result	=	7;
    					$ele.attr('class','prize1').html('10');
    					$dom.find('.modal-prize').html('10');
    					break;
    			}
    			count 		=	data.user.lotteryCount;
    			setCount();
    		},500);
    	}
    	isPrize     =   false;
    },

    onStart 			=	function(e){
    	if( !isPrize ){
			if( count === 0 ){
				showModal(5);
	            if( !isGot ){
	                $dom.find('.modal5 .share').remove();
                    $dom.find('.modal5 img').remove();  
	            }

				e.preventDefault();
				e.stopPropagation();

				return false;
			}
			else{
				result 		=	0;
				isPrize     =   true;
				ajaxHandler('/event/userlottory',{},callbackLottory, true);
			}
    	}
    },

    drawPercent         =   function(){
        if( result === 1 || result === 2 || result === 3 ){
        	if( count ){
        		$dom.find('.modal4-prize').html( text );
        		$dom.find('.modal4-tip').html( count );
        		if( result 	===	1 ){
        			$dom.find('.modal4 .modal-gift img').attr('src','images/iphone.png');
        		}
        		else if( result 	===	2 ){
        			$dom.find('.modal4 .modal-gift img').attr('src','images/ipad.png');
        		}
        		else{
        			$dom.find('.modal4 .modal-gift img').attr('src','images/aigo.png');
        		}
        		showModal(4);
        	}
        	else{
        		$dom.find('.modal3-prize').html( text );
        		if( result 	===	1 ){
        			$dom.find('.modal3 .modal-gift img').attr('src','images/iphone.png');
        		}
        		else if( result 	===	2 ){
        			$dom.find('.modal3 .modal-gift img').attr('src','images/ipad.png');
        		}
        		else{
        			$dom.find('.modal3 .modal-gift img').attr('src','images/aigo.png');
        		}
        		showModal(3);
        	}
        }
        else if( count ){
        	$dom.find('.modal1 .modal1-tip1').html( text );
        	$dom.find('.modal1 .modal1-tip2').html( count );
        	showModal(1);
        }
        else{
        	$dom.find('.modal2 .modal2-tip1').html( text );
        	showModal(2);
        }
        $dom.find('.lottery-container').hide();
        checkLogin();
        getRecord();
        isPrize     =   false;
    },

    onShare				=	function(){
    	ajaxHandler('/event/aftershare',{},callbackShare);
    },

    callbackShare 		=	function(data){
    	if( data.user ){
    		if( data.data === 1 ){
	    		count 			=	data.user.lotteryCount;
	    		setCount();
	    	}
    	}
    },

    showModal 			=	function( num ){
    	$dom.find('.modals').hide();
    	$dom.find('.modal').fadeIn();
    	$dom.find('.modal'+num).fadeIn();
    	$dom.find('.lottery-container').hide();
    },

    hideModal 			=	function(){
    	$dom.find('.modal').hide();
    	$dom.find('.modal > div').hide();
    },

    setCount 			=	function(){
    	$dom.find('.count').html( count );
    },

    onLogin 			=	function(){
    	$dom.find('.modal').hide();
    	$dom.find('.modal-container').fadeIn();
    	$dom.find('.modal-login').fadeIn();
    },

    onContinue 			=	function(){
    	hideModal();
    	onStart();
    },

    onLoginSub 			=	function(){
    	$error.hide();
        var form_data   =   {'username':$dom.find('.login-name').val(),'password':$dom.find('.login-psd').val()};
    	ajaxHandler('/login/jsonLogin',form_data,function(data){
    			if( data.errorCode === 0 ){
                    hideModal();
                    checkLogin();
    			}
    			else if( data.errorCode === 11 ){
    			}
    			else if( data.errorCode === 13 ){
    			}
    			else{
    				$error.show();
    			}
    	}, true);
    },

    onSMS               =   function(){
        ajaxHandler('https://event.souyidai.com/sendSms',{},function(){
            $dom.find('.btn-sms').val('已发送');
        });
    },

    backTop 			=	function(){
    	$('body,html').animate({scrollTop:0},500);
    },

    onWechat 			=	function(){
    	$dom.find('.wechat-modal').fadeIn();
    },

    onWechatClose 		=	function(e){
    	$dom.find('.wechat-modal').hide();

    	e.preventDefault();
		e.stopPropagation();

		return false;
    },

    bindEventListener	=	function(){
        $dom.find('.close-btn').on('touchstart', hideModal);
        $dom.find('.rule-btn').on('touchstart', function(){showModal(6)});
        $dom.find('.backTop').on('touchstart', backTop);
        $dom.find('.weibo, .qqzone').on('touchstart', onShare);
        // $dom.find('.lottery .login-btn').on('touchstart', function(){showModal(7)});
        $dom.find('.login .login-btn').on('touchstart', onLoginSub);
        $dom.find('.start-btn').on('touchstart', onStart);
        $dom.find('.continue-btn').on('touchstart', onContinue);
        $dom.find('.wechat').on('touchstart', onWechat);
        $dom.find('.wechat-modal').on('touchstart', onWechatClose);

        window.onorientationchange = function(){
        	if( window.orientation != 0 ){
        		alert('请在竖屏状态下浏览');
        	}
        };
    };

    $(init);
})();






