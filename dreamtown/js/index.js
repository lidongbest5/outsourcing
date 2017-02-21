(function(){
    var $page0 		=	$('.page0'),

    	cur_page	=	0,

    init			=	function(){
        setDragEnd();
    	bindEventListener();
    	setShare();
    },

    onLastLoad 			=	function(){
    	$('.loading').hide();
    	setTimeout(function(){
    		$('.page0').addClass('animated');
    	}, 0);
    },

    setDragEnd			=	function(){
		$(".dragend-container").dragend({
		    direction: "vertical",
		    stopPropagation: true,

		    onDragEnd: function(a, b, page, d){
		        if( cur_page != page ){
		        	$('.page'+page).addClass('animated').siblings().removeClass('animated');
		        }
		        cur_page    =   page;
		    }
		});
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '梦想小镇创业集中营',
                link: 'http://wyyun.com/dreamtown/',
                imgUrl: 'http://wyyun.com/dreamtown/images/share.png',
                success: function () {},
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: '梦想小镇创业集中营',
                desc: '梦想小镇，希望这里成为天下有创业梦想的年轻人起步的摇篮，让梦想变成财富，让梦想成真。', 
                link: 'http://wyyun.com/dreamtown/',
                imgUrl: 'http://wyyun.com/dreamtown/images/share.png',
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
        });
    },

    bindEventListener	=	function(){
    	setTimeout(function(){
    		onLastLoad();
    	},1000);
        window.onorientationchange = function(){
            if( window.orientation != 0 ){
                alert('请在竖屏状态下浏览');
            }
        };
    };

    $(init);
})();



