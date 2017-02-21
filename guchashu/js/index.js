(function(){
    var win_width 	=	$(window).width(),
    	win_height	=	$(window).height(),

        $nav_btn     =   $('.nav-btn'),
        $nav         =   $('.nav'),
        $nav_item    =   $('.nav li'),
        $audio       =   $('.music'),

        slitslider,
        myscroll,
        audioElement,
        nav_scroll,
        flag,
        as,
        audio_flag  =   false,

    init			=	function(){
        initSlitSlider();
        initSwipSlider();
        initIscroll();

        $('.nav-content').height(win_height);

        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'bg.mp3');
        audioElement.load();
        audioElement.loop=true;
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

    	bindEventListener();
    },

    initIscroll         =   function(){
        new IScroll("#scroll1", { scrollX: true, scrollY: true, mouseWheel: true });
    },

    initSlitSlider      =   function(){
        slitslider = $( '#slider' ).slitslider( {
            onBeforeChange : function( slide, pos ) {
                $('.slide-btn').hide();
            },
            onAfterChange  : function( slide, pos ){
                var dom     =   $('.sl-slides-wrapper .sl-slide:visible').find('.image-scroll');
                if( !dom.attr("isScroll") ){
                    dom.attr("isScroll","true");
                    myscroll    =   new IScroll("#"+dom.attr("id"), { scrollX: true, scrollY: true, mouseWheel: true });
                }
            }
        } );
    },

    initSwipSlider      =   function(){
        $('#slider').swipe({
            swipeLeft:function(event, direction, distance, duration, fingerCount) {
                if(distance>10){
                    slitslider.next();
                    return false;
                }
            },
            swipeRight:function(event, direction, distance, duration, fingerCount) {
                if(distance>10){
                    slitslider.previous();
                    return false;
                }
            },
            tap:function(e){
                return false;
            },
            // excludedElements: '.image-scroll',
            allowPageScroll: "auto",
            threshold:75,
            fingers:'all'
        });
    },

    onMenuToggle        =   function(){
        $nav.toggleClass('hide');
        $('.sl-slider-wrapper').toggleClass('slider-right');
        if( nav_scroll == null ){
            nav_scroll  =   new IScroll("#nav", { scrollX: true, scrollY: true, mouseWheel: true });
        }
    },

    onNavSelect         =   function(){
        if( !$(this).attr('data-id') ){
            window.location = 'http://www.wyyun.com/guchashu/guchashu_gift';
        }
        if(flag && $(this).attr('data-id') ){
            slitslider.jump((parseInt($(this).attr('data-id'))+1));
            $nav.toggleClass('hide');
            $('.sl-slider-wrapper').toggleClass('slider-right');
        }
    },

    onAudio             =   function(){
        if( $(this).hasClass("mute") ){
            audioElement.play();
            $(this).removeClass('mute');
        }
        else{
            audioElement.pause();
            $(this).addClass('mute');
        }
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    bindEventListener	=	function(){
        $nav_btn.on('touchend',onMenuToggle);
        $nav_item.on('touchstart',function(){
            flag        =   true;
        });
        $nav_item.on('touchmove',function(){
            flag        =   false;
        });
        $nav_item.on('touchend',onNavSelect);
        $(document).on('touchstart',onAudioStart);
        $audio.on('touchstart',onAudio);
    };

    $(init);
})(
(function(){
    var dataForWeixin={
        appId:"",
        MsgImg:"http://www.wyyun.com/guchashu/images/content6.jpg",
        TLImg:"http://www.wyyun.com/guchashu/images/content6.jpg",
        url:'http://www.wyyun.com/guchashu/',
        title:'古茶墅',
        desc:"古茶墅",
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
})()
)



