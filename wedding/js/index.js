(function(){
    var win_width 	=	$(window).width(),
    	win_height	=	$(window).height(),

    	dataForWeixin,
    	audioElement,
    	audio_flag  =   false,

    init			=	function(){
        $('.main').css({'width':win_width,'height':win_height});
        var lottery = new Lottery('container', 'images/0.png', 'image', win_width, win_height, drawPercent);
        lottery.init('images/1.png', 'image');
        $('.main img').show();

        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'marry.mp3');
        audioElement.load();
        audioElement.loop=true;
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

    	bindEventListener();
    },

    onAudio             =   function(){
        if( $(this).hasClass("nosound") ){
            audioElement.play();
            $(this).removeClass('nosound');
        }
        else{
            audioElement.pause();
            $(this).addClass('nosound');
        }
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    drawPercent         =   function(){
        $('#container').fadeOut();
    },

    bindEventListener	=	function(){
    	$(document).on('touchstart',onAudioStart);
        $('.sound').on('touchstart',onAudio);

        dataForWeixin={
            appId:"",
            MsgImg:"http://www.wyyun.com/wedding/images/icon.png",
            TLImg:"http://www.wyyun.com/wedding/images/icon.png",
            url:'http://www.wyyun.com/wedding/',
            title:'申琪&郭晓燕大婚邀请函',
            desc:"从春到秋，我们始终期待将邂逅写成永恒，而今，在你的见证和祝福中，这一切都将成为真实。",
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
    };

    $(init);
})();



