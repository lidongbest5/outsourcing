(function(){
    var $nav 			=	$('nav'),
    	$nav_item 		=	$nav.find('ul li'),	
    	$slide_left 	=	$('.slide-left'),
    	$slide_right 	=	$('.slide-right'),
    	$slide_dot 		=	$('.slide-dot a'),
    	$slide_con 		=	$('.slide-con > div'),
    	$detail_left 	=	$('.detail-left'),
    	$detail_right 	=	$('.detail-right'),

    	slide_width 	=	1006,
    	slide_index 	=	1,
    	slide_len		=	$slide_dot.length,

    init				=	function(){
    	if( $detail_left.length ){
    		$detail_left.height( $detail_right.height() );
    	}

    	bindEventListener();
    },

    onNavEnter 			=	function(){
    	var $dropdown 	=	$(this).find('.dropdown');
    	if( $dropdown.length ){
    		TweenQuick.slideHorizontally($dropdown, false);
    	}
    },

    onNavLeave 			=	function(){
    	var $dropdown 	=	$(this).find('.dropdown');
    	if( $dropdown.length ){
    		TweenQuick.slideHorizontally($dropdown, true);
    	}
    },

    onSlideLeft 		=	function(){
    	slide_index--;
    	if( slide_index < 1 ){
    		slide_index =	slide_len;
    	}

    	$slide_dot.eq(slide_index-1).addClass('cur').siblings().removeClass('cur');
    	TweenLite.to($slide_con, 0.5, {left: -(slide_index-1)*slide_width});
    },

    onSlideRight 		=	function(){
    	slide_index++;
    	if( slide_index > slide_len ){
    		slide_index =	1;
    	}

    	$slide_dot.eq(slide_index-1).addClass('cur').siblings().removeClass('cur');
    	TweenLite.to($slide_con, 0.5, {left: -(slide_index-1)*slide_width});
    },

    onSlideDot 			=	function(){
    	var $this 		=	$(this);

    	$this.addClass('cur').siblings().removeClass('cur');
    	slide_index 	=	parseInt($this.attr('data-index'));
    	TweenLite.to($slide_con, 0.5, {left: -(slide_index-1)*slide_width});
    },

    bindEventListener	=	function(){
        $nav_item.on('mouseenter', onNavEnter);
        $nav_item.on('mouseleave', onNavLeave);
        $slide_left.on('click', onSlideLeft);
        $slide_right.on('click', onSlideRight);
        $slide_dot.on('click', onSlideDot);
    };

    $(init);
})();



