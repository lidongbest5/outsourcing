(function(){
    var $index 		=	$('.index'),

    	cur_page	=	0,

    	curY 		=	0,
        startY		=	0,
        endY		=	0,

        delta 		=	936-$(window).height();

    init			=	function(){
        setDragEnd();
    	bindEventListener();

    	if( $(window).height() <= 480 ){
    		$('html body .dragend-container .page3 .i3, html body .dragend-container .page2 .t1, html body .dragend-container .page4 .i3').css('margin', '65px auto 5px auto');
    		$('html body .dragend-container .page3 .i4').css('bottom','55px');
    		$('html body .dragend-container .page6 .t1, html body .dragend-container .page7 .t1, html body .dragend-container .page5 p').css('margin-top','65px');
    		$('html body .dragend-container .page8 .s3').css('width','80%');
    		$('html body .dragend-container .page6 .p4').css('bottom','60px');
    		$('html body .dragend-container .page6 .p4').css('bottom','60px');
    		$('html body .dragend-container .page6 .p3').css('bottom','270px');
    		$('html body .dragend-container .page7 .p3').css('bottom','100px');
    	}
    },

    setIndex			=	function(){
    	$('.page0').css('visibility','visible').addClass('animated');
    	setTimeout(function(){
    		$('.dragend-page').css('visibility','visible')
    	},0);
    },

    setDragEnd			=	function(){
		$(".dragend-container").dragend({
		    direction: "vertical",
		    stopPropagation: true,
		    minDragDistance: 10,

		    onDragEnd: function(a, b, page, d){
		        if( cur_page != page ){
		        	$('.dragend-page').removeClass('animated');
		        	if( page == 1 ){
		        		setIndex();
		        	}
		            else if( page == 2){
		                setPage1();
		                $('.dragend-page').on('touchstart', onStart);
		                $('.dragend-page').on('touchmove', onMove);
		                $('.dragend-page').on('touchend', onEnd);
		            }
		            else if( page == 3 ){
		            	$('.page2').addClass('animated');
		            }
		            else if( page == 4 ){
		            	$('.page3').addClass('animated');
		            }
		            else if( page == 5 ){
		            	$('.page4').addClass('animated');
		            }
		            else if( page == 6 ){
		            	$('.page5').addClass('animated');
		            }
		            else if( page == 7 ){
		            	$('.page6').addClass('animated');
		            }
		            else if( page == 8 ){
		            	$('.page7').addClass('animated');
		            }
		            else if( page == 9 ){
		            	$('.page8').addClass('animated');
		            }
		            else if( page == 10 ){
		            	$('.page9').addClass('animated');
		            	setTimeout(function(){
		            		$('.page9 .f3').addClass('cur');
		            	},3000);
		            }
		        }
		        cur_page    =   page;
		    }
		});
    },

    setTextAnimation    =   function($ele, className){
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    setPage1 			=	function(){
    	$('.page1').addClass('animated');
    	setTimeout(function(){
    		$('.page1-container').animate({'bottom': -delta},6000);
    	},2000);
    },

    onShare				=	function(){
    	$('.share').show();
    },

    onShareClose 		=	function(){
    	$('.share').hide();
    },

    onLastLoad 			=	function(){
    	$('.loading').hide();
        setIndex();
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

    	if( (curY > 0 && endY + curY >= 20 )){
    		$('.dragend-page').off('touchstart', onStart);
    		$('.dragend-page').off('touchmove', onMove);
    		$('.dragend-page').off('touchend', onEnd);
    		$(".dragend-container").dragend({
    			scrollToPage: 1
    		});
    		$('.page1').removeClass('animated');
    		$('.page1-container').css({'bottom':'0px', '-webkit-transform':'translate3d(0,0,0)'});
    		setIndex();
    		cur_page	=	1;
    		return false;	
    	}
    	else if( curY < 0 && endY + curY <= -delta - 20 ){
    		$('.dragend-page').off('touchstart', onStart);
    		$('.dragend-page').off('touchmove', onMove);
    		$('.dragend-page').off('touchend', onEnd);	
    		$(".dragend-container").dragend({
    			scrollToPage: 3
    		});
    		$('.page1-container').css({'bottom':'0px', '-webkit-transform':'translate3d(0,0,0)'});
    		$('.page2').addClass('animated');
    		$('.page1').removeClass('animated');
    		cur_page 	=	3;
    		return false;
    	}

    	el.find('.page1-container').css('-webkit-transform','translate3d(0,'+ (endY + curY) +'px,0)');
    	return false;
    },

    onEnd 				=	function(e){
    	endY 			+=	curY;
    	return false;
    },

    bindEventListener	=	function(){
        $('.f3').on('touchend', onShare);
        $('.shape1').on('load', onLastLoad);
        $('.share').on('touchend', onShareClose);
    };

    $(init);
})();



