(function(){
	"use strict";
    var $header     =   $('header'),
        $nav 		=	$('nav'),
    	$banner 	=	$('.banner'),

    	width 		=	$(window).width(),

    	index 		=	0,
    	slide_width =	$('.single').length ? 995 : 870,

    init			=	function(){
        setBaner();
        setModal();
    	bindEventListener();
    },

    setBaner 			=	function(){
    	$banner.find('.banner-item').width(width);
    },	

    setModal 			=	function(){
    	$('.modal').height($('body').height());
    },

    onNavEnter			=	function(){
    	var $this 		=	$(this);

        console.log( $this.find('.list-item') );

    	TweenQuick.slideHorizontally($this.find('.list-item'), false);
    },

    onNavLeave 			=	function(){
    	var $this 		=	$(this);

    	TweenQuick.slideHorizontally($this.find('.list-item'), true);
    },

    onBannerChange 		=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	$this.addClass('cur').siblings().removeClass('cur');
    	TweenLite.to($banner.find('.banner-container'), 0.5, {left:-index*width});
    },

    onStarMouseEnter 	=	function(){
    	var $this 		=	$(this),
    		$ele 		=	$this.closest('.comments-con'),
    		index    	=	$this.attr('data-id');

    	$ele.find('a').removeClass('select');
    	$ele.find('a:lt('+ index +')').addClass('select');
    },

    onStarMouseLeave 	=	function(){
    	var $this 		=	$(this),
    		$ele 		=	$this.closest('.comments-con');

    	$ele.find('a').removeClass('select');
    },

    onDot 				=	function(){
    	var len 		=	$('.category-dot .dot').length,
    		$this 		=	$(this);

    	if( $this.hasClass('dot') ){
    		index 	=	$this.attr('data-id');
    	}
    	else{
    		if( $this.hasClass('arrow-left') ){
    			if( index > 0 ){
    				index--;
    			}
    		}
    		else if( $this.hasClass('arrow-right') ){
    			if( index < len - 1 ){
    				index++;
    			}
    		}
    	}

    	TweenLite.to($('.category-con'), 0.5, {'left': -index*slide_width});
    	$('.category-dot .dot').eq(index).addClass('cur').siblings().removeClass('cur');
    },

    onCloseModal        =   function(){
        $('.modal').fadeOut();
    },

    bindEventListener	=	function(){
        $nav.find('ul li').on('mouseenter', onNavEnter);
        $nav.find('ul li').on('mouseleave', onNavLeave);
        $header.find('div.nav-my, a.nav-app').on('mouseenter', onNavEnter);
        $header.find('div.nav-my, a.nav-app').on('mouseleave', onNavLeave);
        $banner.find('.banner-dot a').on('click', onBannerChange);
        $('.comments-con a').on('mouseenter', onStarMouseEnter);
        $('.comments-con a').on('mouseleave', onStarMouseLeave);
        $('.category-dot a').on('click', onDot);
        $('.modal-close').on('click', onCloseModal);
    };

    $(init);
})();



