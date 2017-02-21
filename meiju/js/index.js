(function(){
    var win_width,
    	win_height,

        $main       =   $('.main'),
        $question   =   $('.question-page'),
        $pages      =   $('.pt-page'),

        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,

        result1     =   0,
        result2     =   0,
        result3     =   0,
        result4     =   0,
        result5     =   0,
        result      =   0,
        num         =   1,

        dataForWeixin,
        desc,

        audioElement,
        audio_flag  =   false,

        isAndroid   =   (/Android/i).test(navigator.userAgent),

    init			=	function(){
        setTimeout(CheckResolution, 300);

        $pages.each( function() {
            var $page = $( this );
            $page.data( 'originalClassList', $page.attr( 'class' ) );
        } );

        $main.find('.question1').addClass('pt-page-current');

        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'bg.mp3');
        audioElement.load();
        audioElement.loop=true;
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        dataForWeixin={
            appId:"",
            MsgImg:"http://www.wyyun.com/meiju/images/share.jpg",
            TLImg:"http://www.wyyun.com/meiju/images/share.jpg",
            url:'http://www.wyyun.com/meiju/',
            title:'美剧大战优酷见',
            desc:'美剧大战优酷见',
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
                    "title":desc
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
                    "title":desc
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

    	bindEventListener();
    },

    CheckResolution     =   function(){
        if( isAndroid ){
            win_width   =   screen.width/window.devicePixelRatio;
            win_height  =   screen.height/window.devicePixelRatio - 65;
        }
        else{
            win_width   =   $(window).width();
            win_height  =   $(window).height();   
        }
        
        $main.width(win_width).height(win_height);
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    onStart             =   function(){
        onAudioStart();
        $(this).addClass('pt-page-rotateFall');
        $question.css('visibility','visible');
        setTextAnimation($('.question1 .q').eq(0), 'bounceInDown');
        setTextAnimation($('.question1 .q').eq(1), 'bounceInDown1');
    },

    setTextAnimation    =   function($ele, className){
        if( $ele ){
            $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass(className);
              $(this).removeClass('animated');
            });
        }
    },

    onFilter            =   function(){
        var $this       =   $(this),
            $page       =   $this.closest('.pt-page'),
            $next       =   $page.next(),
            data        =   $this.attr('data');

        $this.append('<i></i>');

        $question.find('.' + data).remove();

        setTextAnimation($('.question2 .q').eq(0), 'rollIn');
        setTextAnimation($('.question2 .q').eq(1), 'rollIn1');
        setTextAnimation($('.question2 .q').eq(2), 'rollIn2');
        setTextAnimation($('.question2 .q').eq(3), 'rollIn3');

        onRotate($page, $next);
    },

    onRotate            =   function($currPage, $nextPage){
        var outClass = 'pt-page-flipOutTop',
            inClass = 'pt-page-flipInBottom pt-page-delay500';

        $nextPage.addClass('pt-page-current');

        $currPage.addClass( outClass ).on( 'webkitAnimationEnd', function() {
            $currPage.off( 'webkitAnimationEnd' );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        $nextPage.addClass( inClass ).on( 'webkitAnimationEnd', function() {
            $nextPage.off( 'webkitAnimationEnd' );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
    },

    onEndAnimation        =   function( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    },

    resetPage             =    function( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
    },

    onChoose            =   function(){
        var $this       =   $(this),
            data        =   $this.attr('data-type'),
            $page       =   $this.closest('.pt-page'),
            $next       =   $page.next();

        $this.append('<i></i>');

        onAddResult(data);
        
        if( $page.hasClass('question2') ){
            setTextAnimation($('.question3 .q').eq(0), 'lightSpeedIn');
            setTextAnimation($('.question3 .q').eq(1), 'lightSpeedIn1');
            setTextAnimation($('.question3 .q').eq(2), 'lightSpeedIn2');
            setTextAnimation($('.question3 .q').eq(3), 'lightSpeedIn3');
            setTextAnimation($('.question3 .q').eq(4), 'lightSpeedIn4');
        }
        else if( $page.hasClass('question3') ){
            setTextAnimation($('.question4 .q').eq(0), 'zoomIn');
            setTextAnimation($('.question4 .q').eq(1), 'zoomIn1');
            setTextAnimation($('.question4 .q').eq(2), 'zoomIn2');
            setTextAnimation($('.question4 .q').eq(3), 'zoomIn3');
            setTextAnimation($('.question4 .q').eq(4), 'zoomIn4');
        }
        else if( $page.hasClass('question4') ){
            setTextAnimation($('.question5 .q').eq(0), 'rotateIn');
            setTextAnimation($('.question5 .q').eq(1), 'rotateIn1');
            setTextAnimation($('.question5 .q').eq(2), 'rotateIn2');
            setTextAnimation($('.question5 .q').eq(3), 'rotateIn3');
            setTextAnimation($('.question5 .q').eq(4), 'rotateIn4');
        }
        else if( $page.hasClass('question5') ){
            onCalculate();
            $main.find('.result-page .result div.result-img').addClass('result'+num);
            $main.find('.result-page .share').addClass('share'+num);
            $main.find('.question-page').show().addClass('pt-page-moveToTopEasing');
            $main.find('.result-page').show().addClass('pt-page-moveFromBottom');
            setTimeout(function(){
                $main.find('.question-page').hide();
            },800);

            setShareMethod();
        }

        onRotate($page, $next);
    },

    setShareMethod      =   function(){
        if( num === 1 ){
            desc        =   '哇！我有喜剧类的DNA，笑傲江湖合不拢腿。你是哪一类？';
        }
        else if( num === 2 ){
            desc        =   '哇！我有科幻剧的DNA，外星人都是我的小伙伴。你是哪一类？';
        }
        else if( num === 3 ){
            desc        =   '哇！我有悬疑剧的DNA，头脑是我的一切。你是哪一类？';
        }
        else if( num === 4 ){
            desc        =   '哇！我有都市剧的DNA，与渣男小三抗争到底。你是哪一类？';
        }
        else if( num === 5 ){
            desc        =   '哇！我有动作剧的DNA，偏好男女混合打。你是哪一类？';
        }
    },

    onCalculate         =   function(){
        onCal( result1, 1 );
        onCal( result2, 2 );
        onCal( result3, 3 );
        onCal( result4, 4 );
        onCal( result5, 5 );
    },

    onCal               =   function( m, n ){
        if( m > result ){
            result      =   m;
            num         =   n;
        }
    },

    onAddResult         =   function(data){
        switch(data){
            case '1' : 
                result1++;
                break;
            case '2' : 
                result2++;
                break;
            case '3' : 
                result3++;
                break;
            case '4' : 
                result4++;
                break;
            case '5' : 
                result5++;
                break;
            case '6' : 
                result1++;
                result5++;
                break;
            case '7':
                result1++;
                result2++;
                result4++;
                break;
            case '8':
                result1++;
                result2++;
                result5++;
                break;
            case '9':
                result2++;
                result5++;
                break;
            case '10':
                result3++;
                result5++;
                break;
        }
    },

    onShare             =   function(){
        $main.find('.result').addClass('pt-page-moveToTopEasing');
        $main.find('.share').show().addClass('pt-page-moveFromBottom');
    },

    onShareShow         =   function(){
        $main.find('.share-con').show();
    },

    onSharehide         =   function(){
        $main.find('.share-con').hide();
    },

    bindEventListener	=	function(){
        $main.find('.index-page').on('touchstart',onStart);
        $question.find('.question1 a').on('touchstart',onFilter);
        $question.find('.question2 a, .question3 a, .question4 a, .question5 a').on('touchstart',onChoose);
        $main.find('.result').on('touchstart, touchmove',onShare);
        $main.find('.share-title').on('touchstart',onShareShow);
        $main.find('.share-con').on('touchstart',onSharehide);
    };

    $(init);
})(
(function(){
    
})()
);



