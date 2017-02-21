(function(){
    var win_width,
    	win_height,

    	$nav 		=	$('.nav'),

    	isAndroid   =   (/Android/i).test(navigator.userAgent),

    init			=	function(){
        setTimeout(CheckResolution, 300);
    	bindEventListener();

        setWeixin();

        $('.loading').hide();
    },

    setWeixin           =   function(){
        var dataForWeixin={
            appId:"",
            MsgImg:"http://www.wyyun.com/wemedia/images/chart.png",
            TLImg:"http://www.wyyun.com/wemedia/images/chart.png",
            url:'http://www.wyyun.com/wemedia/',
            title:'WeMedia新媒体集团业务介绍',
            desc:"微信营销哪家强？看完之后不迷茫！",
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
                }, function(res){});
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

    CheckResolution     =   function(){
        if( isAndroid ){
            win_width   =   screen.width/window.devicePixelRatio;
            win_height  =   screen.height/window.devicePixelRatio;
        }
        else{
            win_width   =   $(window).width();
            win_height  =   $(window).height();   
        }
        $nav.find('a').width(win_width/5 - 1);
        $nav.find('.nav5').width(win_width/5);
    },

    onNavTouch 			=	function(){
    	var $this 		=	$(this),
    		data		=	$this.attr('data-type'),
    		$cur 		=	$('.current');

    	$this.addClass('selected').siblings().removeClass('selected');

    	$cur.addClass('pt-page-rotateSlideOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass('pt-page-rotateSlideOut current');
        });
        $('.'+data).addClass('pt-page-rotateSlideIn current').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass('pt-page-rotateSlideIn');
        });
        // $(window).scrollTop(0);
    },

    bindEventListener	=	function(){
        $nav.find('a').on('touchstart', onNavTouch);
    };

    $(init);
})()



