(function(){
	"use strict";

    var $dom 			=	$('#prize'),
    	$prizeRotate 	=	$dom.find('.prize-rotate'),
    	$prizePointer 	=	$dom.find('.prize-pointer'),
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

        ieVersion           =   ( !!window.ActiveXObject && +( /msie\s(\d+)/i.exec( navigator.userAgent )[1] ) ) || NaN,
        needsIEfix          =   ieVersion <= 8,

    init				=	function(){

    	checkLogin();

    	setRank();

    	getRecord();

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

    checkLogin 			=	function(){
    	ajaxHandler('https://events.souyidai.com/event/userinfo',{},callbackLogin);
    },

    callbackLogin 		=	function( data ){
    	$dom.find('.tips').hide();

    	if( data.user ){
    		isLogin 	=	true;

            $dom.find('.prize-btn').removeClass('no-login');

    		var len 	=	data.user.awards ? data.user.awards.length : 0,
				temp    = 	'';

			for( var i = 0; i < len; i++ ){
				var id 	=	data.user.awards[i].id,
                    prefix  =   '1个';
                if( id == '1' ){
                    prefix  =   '1部';
                }
                else if( id == '2' ){
                    prefix  =   '1台';
                }
				temp 	+=	'<p><span>' + data.user.awards[i].desc + '  '+ prefix +'</span></p>';
			}
            if( data.user.coupon ){
                temp        =  '<p><span>' + data.user.coupon + '元红包</span><a href="https://www.souyidai.com/myaccount/coupon/list?from=thanksgiving" target="_blank">立即查看</a></p>' + temp;
            }

            if( data.user.coupon == 0 && len == 0 ){
                isGot   =   false;   
            }

    		if( data.user.lotteryCount > 0 ){
    			count 	=	data.user.lotteryCount;
    			setCount();

    			$dom.find('.tips1').find('.tips-content').html(temp);
    			$dom.find('.tips1').show().find('b').html(data.user.lotteryCount);
    		}
    		else{
    			$dom.find('.tips3').find('.tips-content').html(temp);
    			$dom.find('.tips3').show();
    		}

            $('.sign-or-reg').css('visibility','hidden');
    	}
    	else{
    		$dom.find('.tips2').show();
    	}

        SYDlogin();
    },

    setRank 			=	function(){
    	ajaxHandler('https://events.souyidai.com/event/rank',{},callbackRank);
    },

    callbackRank 		=	function( data ){
    	var len 		=	data.data.length > 10 ? 10 : data.data.length;
    	for( var i = 0; i < len; i++ ){
    		$dom.find('.invest-list ul').append('<li class="rank'+ i +'"><span>'+ data.data[i].username +'</span>'+ data.data[i].amount +'</li>');
    	}
    },

    getRecord 			=	function(){
    	ajaxHandler('https://events.souyidai.com/event/recentlottoryhistory',{},callbackRecord);
    },

    callbackRecord 		=	function( data ){
    	recordData 		=	data;

    	$dom.find('.prize-list ul').empty();

    	if( data.data.length <= 8 ){
    		var len 	=	data.data.length;
    		for( var i = 0; i < len; i++ ){
				$dom.find('.prize-list ul').prepend('<li><span>'+ data.data[i].username +'</span>'+ data.data[i].award +'</li>');
    		}
    	}
    	else{
    		for( var i = 0; i < 8; i++ ){
				$dom.find('.prize-list ul').prepend('<li><span>'+ data.data[i].username +'</span>'+ data.data[i].award +'</li>');
    		}
    		var len 	=	data.data.length;
    		recordCount 	=	7;
            window.clearInterval(inter);
    		inter         =   setInterval(function(){
    			recordCount++;
    			if( recordCount >= len ){
    				recordCount = 0;
    			}
    			var $temp 	=	$('<li style="display:none;"><span>'+ recordData.data[recordCount].username +'</span>'+ recordData.data[recordCount].award +'</li>');
    			$dom.find('.prize-list ul').prepend($temp);
    			$dom.find('.prize-list ul').animate({'top':36}, 500, function(){
    				$temp.fadeIn();
    				$dom.find('.prize-list ul').css('top',0);
    			});
    			$dom.find('.prize-list ul li:gt(7)').remove();
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
                    $dom.find('.modal4 .modal-share').remove();
                    $dom.find('.modal4 .share-tip').remove();
                    $dom.find('.modal4 .modal-tip a').attr('href','https://www.souyidai.com/invest?from=nochance&ifinvest=no');
                }
    		}
    		else{
                if( !needsIEfix ){
                    $prizeRotate.rotate({
                        angle:0, 
                        duration: 5000, 
                        animateTo: 0
                    });
                }
                isPrize     =   true;
    			ajaxHandler('https://events.souyidai.com/event/userlottory',{},callbackLottory, true);
    		}
    	}
    },

    callbackLottory 	=	function(data){
    	if( data.errorCode === 1 ){
    		$prizeRotate.stopRotate();
    		showModal(4);
    	}
    	else{
    		var id	 	=	data.data.id,
    			text 	=	data.data.desc,
    			angle;

    		switch( id ){
    			case "1":
    				angle 	=	0;
    				break;
    			case "2":
    				angle 	=	-257;
    				break;
    			case "3":
    				angle 	=	-102.8;
    				break;
    			case "10001":
    				angle 	=	-308.4;
    				break;
    			case "10002":
    				angle 	=	-154.2;
    				break;
    			case "10003":
    				angle 	=	-51.4;
    				break;
    			case "10004":
    				angle 	=	-205.6;
    				break;
    		}
    		count 		=	data.user.lotteryCount;
    		setCount();

            if( needsIEfix ){
                $('.prize-rotate').remove();
                $('.prize-main').prepend('<img class="prize-rotate" src="images/prize-bg.png">');
                $prizeRotate    =   $('.prize-rotate');
            }

			$prizeRotate.rotate({
				angle:0, 
				duration: 5000, 
				animateTo: angle+1800,
				callback:function(){
	                if( id === "1" || id === "2" || id === "3" ){
	                	$dom.find('.modal1 .modal-title span').html( text );
	                	showModal(1);
	                }
	                else if( count ){
	                	$dom.find('.modal2 .modal-title span').html( text );
	                	$dom.find('.modal2 .modal-sub span').html( count );
	                	showModal(2);
	                }
	                else{
	                	$dom.find('.modal3 .modal-title span').html( text );
	                	showModal(3);
	                }
                    checkLogin();
	                getRecord();
                    isPrize     =   false;
	            }
			});
    	}
    },

    onShare				=	function(){
    	ajaxHandler('https://events.souyidai.com/event/aftershare',{},callbackShare);
    },

    callbackShare 		=	function(data){
    	if( data.user ){
    		if( data.data === 1 ){
	    		count 			=	data.user.lotteryCount;
	    		setCount();
	    		// showModal(5);
	    	}
    	}
    },

    showModal 			=	function( num ){
    	$dom.find('.modal').hide();
    	$dom.find('.modal-container').fadeIn();
    	$dom.find('.modal'+num).fadeIn();
    },

    closeModal			=	function(){
    	var $this 		=	$(this);
    	$dom.find('.modal-container').fadeOut();
    },

    setCount 			=	function(){
    	$dom.find('.tips1 b').html( count );
    },

    onLogin 			=	function(){
    	$dom.find('.modal').hide();
    	$dom.find('.modal-container').fadeIn();
    	$dom.find('.modal-login').fadeIn();
    },

    onLoginSub 			=	function(){
    	$error.hide();
        var form_data   =   {'username':$dom.find('.login-name').val(),'password':$dom.find('.login-psd').val()};
        if( $('#show-code').hasClass('show') ){
            form_data.kaptcha = $('#code').val();
        }
        if( $('#show-sms-code').hasClass('show') ){
            form_data.smscode = $('#tel-code').val();
        }
    	ajaxHandler('https://events.souyidai.com/login/jsonLogin',form_data,function(data){
    			if( data.errorCode === 0 ){
                    $dom.find('.modal-container').fadeOut();
                    checkLogin();
    			}
    			else if( data.errorCode === 11 ){
                    $dom.find('.show-code').addClass('show');
    			}
    			else if( data.errorCode === 13 ){
    				$dom.find('.cf').addClass('show');
    			}
    			else{
    				$error.show();
    			}
    	}, true);
    },

    SYDlogin            =   function(){
        var currentUrl = document.URL;
        function login(){
            window.location.href="https://passport.souyidai.com/?backurl="+currentUrl;
        }
        $().ready(function(){
            var url=document.URL;
            if(url.indexOf("/myaccount")>=0 || url.indexOf("/user")>=0 || url.indexOf("/repay")>=0){
                $("#menu_myaccount").addClass("nav-li-active");
            }else if(url.indexOf("/agreement/sample/")>=0){
                $("#menu_invest").addClass("nav-li-active");
            }else if(url.indexOf("/agreement/")>=0){
                $("#menu_myaccount").addClass("nav-li-active");
            }else if(url.indexOf("/borrow")>=0){
                $("#menu_borrow").addClass("nav-li-active");
            }else if(url.indexOf("/invest")>=0 || url.indexOf("/bid/detail")>=0){
                $("#menu_invest").addClass("nav-li-active");
            }else if(url.indexOf("/portal")>=0 || (url.indexOf("/",8)<0)
                    ||(url.indexOf("/",8)==url.length-1) ||  (url.substr(url.indexOf("/",8)).indexOf("#")==1)){
                $("#menu_portal").addClass("nav-li-active");
            }
        });

        $(function(){
            var login_name='';
            if($.cookie("syd_name")!=null){
                login_name = $.base64.atob($.cookie("syd_name"));
            }
            if(login_name.length>0){

                $("#login_before").hide();
                $("#login_after").show();
                $("#login_after").html("您好，<a href='https://www.souyidai.com/myaccount/capital'>"+login_name+"</a><a href='https://passport.souyidai.com/logout'>【退出】</a>");
                $("#login_before_t").hide();
            }else{
                $("#login_before").show();
                $("#login_after").hide();
                $("#login_before_t").show();
            }
        });
    },

    onSMS               =   function(){
        ajaxHandler('https://event.souyidai.com/sendSms',{},function(){
            $dom.find('.btn-sms').val('已发送');
        });
    },

    onMouseEnter        =   function(){
        $(this).find('img').fadeIn();
    },

    onMouseLeave        =   function(){
        $(this).find('img').hide();
    },

    bindEventListener	=	function(){
        $dom.find('.prize-btn').on('click', onRotate);
        $dom.find('.modal-close').on('click', closeModal);
        $dom.find('.modal-continue').on('click', closeModal);
        $dom.find('.modal-share a').on('click', onShare);
        $dom.find('.tips-login').on('click', onLogin);
        $('.header-login, .nav-login').on('click', onLogin);
        $dom.find('.login-btn').on('click', onLoginSub);
        $dom.find('.btn-sms').on('click', onSMS);
        $dom.find('.wechat').on('mouseenter', onMouseEnter);
        $dom.find('.wechat').on('mouseleave', onMouseLeave);
    };

    $(init);
})();



