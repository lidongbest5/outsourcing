;(function(){
    var cur_page    	=   0,

    	audioElement,
        audio_flag      =   false,

    init				=	function(){
    	audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'http://7xin8y.com2.z0.glb.qiniucdn.com/Moves%20Like%20Jagger.mp3');
        audioElement.load();
        audioElement.loop=true;
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        bindEventListener();
        setTimeout(function(){
        	$('.loading').hide();
        	$('.page1').addClass('animated');
        },1000);
    },

    onAudio             =   function(){
        if( $('.sound').hasClass("nosound") ){
            audioElement.play();
            $('.sound').removeClass('nosound');
        }
        else{
            audioElement.pause();
            $('.sound').addClass('nosound');
        }
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '力帆X50为荣耀再启程上海车展2号馆见',
                link: 'http://wyyun.com/lifan/',
                imgUrl: 'http://wyyun.com/lifan/images/icon.jpg',
                success: function () {},
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: '力帆X50为荣耀再启程上海车展2号馆见',
                desc: '4月20日力帆X50再启程，上海车展2号馆11:00共赴征途', 
                link: 'http://wyyun.com/lifan/',
                imgUrl: 'http://wyyun.com/lifan/images/icon.jpg',
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
        });
    },

    bindEventListener	=	function(){
    	$(".dragend-container").dragend({
    	    direction: "vertical",
    	    stopPropagation: true,
    	    minDragDistance: 10,
            scrollToPage: 1,

    	    onDragEnd: function(a, b, page, d){
    	        if( cur_page != page ){
    	            $('.page'+page).addClass('animated').siblings().removeClass('animated');
    	        }
    	        cur_page    =   page;
    	    }
    	});

    	onAudioStart();
    	setShare();

    	$('.sound').on('touchend', onAudio);
    	$(document).on('touchstart', onAudioStart);
    	window.onorientationchange = function(){
            if( window.orientation != 0 ){
                alert('请在竖屏状态下浏览');
            }
        };
    };

    $(init);
})();



