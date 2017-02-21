;(function(){
	"use strict";

    var page 		= 	1,
    	swiper,
    	curY 		=	0,
        startY		=	0,
        endY		=	0,
        delta       =   [
            $('.page2-con').height()-$(window).height(),
            $('.page3-con').height()-$(window).height(),
            $('.page4-con').height()-$(window).height(),
            $('.page5-con').height()-$(window).height(),
            $('.page6-con').height()-$(window).height(),
            $('.page7-con').height()-$(window).height()
        ],

    	is_ios,
    	mp3,

    	$tap 		=	$('.tap-btn'),
    	$music 		=	$('.music'),

    init			=	function(){
        initSwiper();
    	bindEventListener();
        $('.loading').fadeOut();
    	is_ios 		=	 isIos();
    	if( is_ios === true ){
			mp3 = new Audio();
			mp3.src = 'css/music.mp3';
			mp3.loop = true;
			mp3.autoplay = true;
			$("#mp3").remove();
    	}
    	else{
            $('body').append('<audio src="css/music.mp3" id="mp3" autoplay loop></audio>');
    		mp3 	=	document.getElementById('mp3');
    	}

    	mp3.play();
    },

    initSwiper 		=	function(){
    	swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,
            onSlideChangeEnd: function(swiper, event){
                swiper.unlockSwipeToNext();
            	swiper.unlockSwipeToPrev();

               	if( swiper.activeIndex === 2 || swiper.activeIndex === 3 || swiper.activeIndex === 4 || swiper.activeIndex === 5 || swiper.activeIndex === 6 || swiper.activeIndex === 7 ){
                    swiper.lockSwipeToNext();
               		swiper.lockSwipeToPrev();
                    curY        =   0;
                    startY      =   0;
                    endY        =   0;
                    delta       =   [
                        $('.page2-con').height()-$(window).height(),
                        $('.page3-con').height()-$(window).height(),
                        $('.page4-con').height()-$(window).height(),
                        $('.page5-con').height()-$(window).height(),
                        $('.page6-con').height()-$(window).height(),
                        $('.page7-con').height()-$(window).height(),
                    ];
                    $('.page'+swiper.activeIndex+'-con').css({'-webkit-transform':'translate3d(0,0,0)'});
                    $('.page'+swiper.activeIndex).on('touchstart', onStart);
                    $('.page'+swiper.activeIndex).on('touchmove', onMove);
                    $('.page'+swiper.activeIndex).on('touchend', onEnd);
               	}
            }
        });
    },

    isIos			=	function(){  
       var userAgentInfo = navigator.userAgent;  
       var Agents = new Array("iPhone","iPad");  
       var flag = false;  
       for (var v = 0; v < Agents.length; v++) {  
           if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = true; break; }  
       }  
       return flag;  
	},

	onMusic 		=	function(){
		if( $music.hasClass('play') ){
			$music.removeClass('play');
			mp3.pause();
		}
		else{
			$music.addClass('play');
			mp3.play();
		}
	},

    onPageStart 			=	function(){
    	swiper.slideNext();
    },

    onStart 			=	function(e){
    	e              =    e.originalEvent || e;

        var touch      =    e.touches[0];
        startY         =    touch.pageY;
    	return false;
    },

    onMove 				=	function(e){
    	e              =    e.originalEvent || e;
    	e.preventDefault();

    	var el         =    $(this),
    	    touch      =    e.touches[0];

    	curY = touch.pageY - startY;

    	if( curY > 0 && endY + curY > 20 ){
    		$('.page'+swiper.activeIndex).off('touchstart', onStart);
    		$('.page'+swiper.activeIndex).off('touchmove', onMove);
    		$('.page'+swiper.activeIndex).off('touchend', onEnd);
    		swiper.slidePrev();
    		return false;	
    	}
    	else if( curY < 0 && endY + curY < -delta[swiper.activeIndex-2] - 50 ){
    		$('.page'+swiper.activeIndex).off('touchstart', onStart);
    		$('.page'+swiper.activeIndex).off('touchmove', onMove);
    		$('.page'+swiper.activeIndex).off('touchend', onEnd);	
    		swiper.slideNext();
    		return false;
    	}

    	$('.page'+swiper.activeIndex+'-con').css('-webkit-transform','translate3d(0,'+ (endY + curY) +'px,0)');
    	return false;
    },

    onEnd 				=	function(e){
    	endY 			+=	curY;
    	return false;
    },

    bindEventListener	=	function(){
        $music.on('touchend', onMusic);
    };

    $(init);
})();



