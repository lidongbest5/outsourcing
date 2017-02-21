;(function(){
	"use strict";

    var page 		= 	1,
    	swiper,
    	curY 		=	0,
        startY		=	0,
        endY		=	0,
    	index 		=	0,
    	delta 		=	2284-$(window).height(),
    	tap			=	[
    						{"x":100, "y":57},
    						{"x":144, "y":57},
    						{"x":186, "y":57},
    						{"x":100, "y":83},
    						{"x":144, "y":83},
    						{"x":186, "y":83},
    						{"x":100, "y":109},
    						{"x":144, "y":109},
    						{"x":186, "y":109},
    						{"x":100, "y":136},
    						{"x":144, "y":136},
    						{"x":186, "y":136}
    					],

    	is_ios,
    	mp3,

    	$tap 		=	$('.tap-btn'),
    	$music 		=	$('.music'),

    init			=	function(){
        initSwiper();
        initTap();
    	bindEventListener();
    	is_ios 		=	 isIos();
    	if( is_ios === true ){
			mp3 = new Audio();
			mp3.src = $("#mp3").attr("src");
			mp3.loop = true;
			mp3.autoplay = true;
			$("#mp3").remove();
    	}
    	else{
    		mp3 	=	document.getElementById('mp3');
    	}

    	mp3.play();

    	$('.loading').fadeOut();
    },

    initSwiper 		=	function(){
    	swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,
            onSlideChangeEnd: function(swiper, event){
            	swiper.unlockSwipeToNext();

               	if( swiper.activeIndex === 1 ){

               	}
               	else if( swiper.activeIndex === 3 ){
               		swiper.lockSwipeToNext()
               	}
               	else if( swiper.activeIndex === 4 ){
               		setSlide();
			    	$('.page4-0').css({'top':'0px', '-webkit-transform':'translate3d(0,0,0)'}).stop();
			   		$('.page4').on('touchstart', onStart);
			   		$('.page4').on('touchmove', onMove);
			   		$('.page4').on('touchend', onEnd);
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

    setSlide 		=	function(){
    	setTimeout(function(){
    		$('.page4-0').animate({'top': -delta},20000);
    	},500);
    },

    initTap 		=	function(){
    	window.setInterval(function(){
    		var random_index = Math.floor(Math.random()*12);

    		if( random_index === index ){
    			random_index 	=	random_index - 1;
    			if( random_index < 0 ){
    				random_index 	=	0;
    			}
    		}

    		index 	=	random_index;
    		var tap_index 	=	tap[random_index];
    		$tap.show().css({'left': tap_index.x, 'top': tap_index.y});
    	},400);
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

    	if( (curY > 0 && endY + curY >= delta )){
    		$('.page4').off('touchstart', onStart);
    		$('.page4').off('touchmove', onMove);
    		$('.page4').off('touchend', onEnd);
    		swiper.slidePrev();
    		return false;	
    	}
    	else if( curY < 0 && endY + curY <  - 20 ){
    		$('.page4').off('touchstart', onStart);
    		$('.page4').off('touchmove', onMove);
    		$('.page4').off('touchend', onEnd);	
    		swiper.slideNext();
    		return false;
    	}

    	$('.page4-0').css('-webkit-transform','translate3d(0,'+ (endY + curY) +'px,0)');
    	return false;
    },

    onEnd 				=	function(e){
    	endY 			+=	curY;
    	return false;
    },

    bindEventListener	=	function(){
        $('.page3-3').on('touchend', onPageStart);
        $music.on('touchend', onMusic);
    };

    $(init);
})();



