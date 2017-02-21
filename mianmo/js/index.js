(function(){
    var win_width 	=	$(window).width(),
    	win_height	=	$(window).height(),

    	$con 		= 	$('#container'),

    init			=	function(){
        $('.main').css({'width':win_width,'height':win_height});
        var lottery = new Lottery('container', 'images/step1.gif', 'image', win_width, win_height, drawPercent);
        lottery.init('images/step2.gif', 'image');

        setTimeout(function(){
            $('.loading').hide();
        },500);

    	$(".dragend-container").dragend({
    		direction: "vertical",
    		stopPropagation: true,
            onDragEnd: function(a, b, page, d){
                $('.text').removeClass('show');
                if( page == 0 ){
                    $('.text2').addClass('show');
                }
                if( page == 1 ){
                    $('.text3').addClass('show');
                    $('.text4').addClass('show');
                }
                else if( page == 2 ){
                    $('.text5').addClass('show');
                    $('.text6').addClass('show');
                } 
                else if( page == 3 ){
                    $('.text7').addClass('show');
                    setTimeout(function(){
                        $('.text8').addClass('show');
                    },1000);
                    setTimeout(function(){
                        $('.text9').addClass('show');
                    },2000);
                    setTimeout(function(){
                        $('.btn').addClass('show');
                    },3000);
                }
            },
    	});

    	bindEventListener();
    },

    drawPercent         =   function(){
        $con.addClass('fadeOut');
        setTimeout(function(){
            $('.text2').addClass('show');
            $con.hide();
        },500);
    },

    onBtnClick			=	function(){
    	$(".dragend-container").dragend({scrollToPage: 5});
    },

    onSubmitClick       =   function(){
        var input       =   $('.form').find('input');
        if( !input.eq(0).val().length || !input.eq(1).val().length || !input.eq(2).val().length ){
            alert('请您完整填写您的联系方式');
            return false;
        }
    },

    bindEventListener	=	function(){
        $('.btn').on('click',onBtnClick);
    	$('.submit').on('click',onSubmitClick);
    };

    $(init);
})(
(function(){
    var dataForWeixin={
        appId:"",
        MsgImg:"http://www.wyyun.com/mianmo/images/step2.gif",
        TLImg:"http://www.wyyun.com/mianmo/images/step2.gif",
        url:'http://www.wyyun.com/mianmo/',
        title:'金蔻X5乘效面膜全球限量10万片1元抢先体验',
        desc:"金蔻X5乘效面膜全球限量10万片1元抢先体验",
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



