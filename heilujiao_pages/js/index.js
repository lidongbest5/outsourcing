(function(){
    var $body 		=	$('body'),
    	$slide 		=	$('.banner'),
    	$slide_con 	=	$('.banner-container >div'),
    	$dot 		=	$('.banner-dots a'),
    	$blog_dot 	=	$('.blog-dot a'),
    	$blog_con 	=	$('.blog-con'),
    	$menu_dot 	=	$('.menu-dot a'),
    	$menu_con 	=	$('.menu-slide'),
    	$detail_left= 	$('.detail-left'),

    	width 		=	$body.width(),

    init			=	function(){
        if( $slide.length ){
        	setSlide();
        }

        if( $detail_left.length ){
        	setDetail();
        	$(window).on('scroll', onDetailScroll);
        }
    	bindEventListener();
    },

    onDetailScroll 		=	function(){
    	var top 		=	$(window).scrollTop();

    	if( top > 180 ){
    		$detail_left.css('top', 20);
    	}
    	else{
    		$detail_left.css('top', 217);
    	}
    },

    setSlide 			=	function(){
    	$slide.find('img').width(width);

    	$dot.on('click', onSlide);
    },

    setDetail 			=	function(){
    	$detail_left.css('left',(width-1000)/2 - 93);
    },

    onSlide 			=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($slide_con, 0.5, {left: -(index-1)*width});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    onBlogSlide 		=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($blog_con, 0.5, {left: -(index-1)*780});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    onMenuSlide 		=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($menu_con, 0.5, {left: -(index-1)*1000});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    bindEventListener	=	function(){
        $blog_dot.on('click', onBlogSlide);
        $menu_dot.on('click', onMenuSlide);
    };

    $(init);
})();



