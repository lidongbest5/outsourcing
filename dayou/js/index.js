(function($){
	'use strict';

	var $header 	=	$('header'),
		$nav 		=	$('nav'),
		$nav_bg 	=	$header.find('.nav-bg'),
		$slide_con 	=	$('.slide'),
		$slide 		=	$('.slide-container ul'),
		$slide_left =	$('.slide-left'),
		$slide_right =	$('.slide-right'),
		$company	=	$('.company-item'),
		$close		=	$('.close'),
		$customer	=	$('.customer-container li'),
		$customer_detail	=	$('.customer-detail'),
		$customer_con	=	$('.customer-container ul'),
		$customer_close	=	$('.customer-close'),
		$customer_arrow	=	$('.customer-arrow img'),

		inter 		=	null,
		slide_left 	= 	0,
		slide_width = 	101,
		inter_time	=	1000,
		customer_top	=	91,

		ieVersion       =   ( !!window.ActiveXObject && +( /msie\s(\d+)/i.exec( navigator.userAgent )[1] ) ) || NaN,
		needsIEfix		=	ieVersion < 9,

	init 	=	function(){
		checkIE();
		bindEventLister();

		var cur_nav	=	$nav.find('a[data-type="'+ page_type +'"]');

		cur_nav.addClass('selected');	
		$nav_bg.css('left', parseInt(cur_nav.attr('data-index'))*110);	

		if( page_type == 'home' && !needsIEfix ){
			$('#scene').parallax();
			setInter();
		}
		else if( page_type == 'company' ){
			$('.company-detail').perfectScrollbar({
				suppressScrollX: true
			});
		}
		else if( page_type == 'customer' ){
			$('.customer-content').perfectScrollbar({
				suppressScrollX: true
			});
		}
	},

	checkIE 			=	function(){
		if( needsIEfix ){
			$('.layer').css({"position":"absolute","top":0,"left":0});
		}
	},

	onNavMouseEnter		=	function(){
		var $this 		=	$(this),
			index 		=	parseInt($this.attr('data-index'));

		TweenLite.to($nav_bg, 0.3, {left:index*110});
	},

	onNavMouseLeave 	= 	function(){
		var index 		= 	parseInt($nav.find('.selected').parent().attr('data-index'));
		
		TweenLite.to($nav_bg, 0.3, {left:index*110});
	},

	setInter 			= 	function(){
		inter 			=	window.setInterval(function(){
			onSlideRight();
		},inter_time);
	},

	clearInter 			= 	function(){
		window.clearInterval(inter);
		inter 			= 	null;
	},

	onSlideMouseEnter 	= 	function(){
		clearInter();
	},

	onSlideMouseLeave 	=	function(){
		setInter();
	},

	onSlideLeft 		= 	function(){
		slide_left 	+=	slide_width; 
		if( slide_left > 0 ){
			slide_left 	=	7 * (-slide_width);
		}
		TweenLite.to($slide, 0.3, {left:slide_left});
	},

	onSlideRight 		= 	function(){
		slide_left 	-=	slide_width; 
		if( slide_left < 7 * (-slide_width) ){
			slide_left 	=	0;
		}
		TweenLite.to($slide, 0.3, {left:slide_left});
	},

	onCompanyMouseEnter	=	function(){
		var	$this		=	$(this);
		TweenLite.to($company.not($(this)), 0.5, {autoAlpha:0.3});
	},

	onCompanyMouseLeave	=	function(){
		TweenLite.to($company, 0.5, {autoAlpha:1});
	},

	onCompanyClick		= 	function(){
		var $this		=	$(this),
			con 		=	$('.company-detail'+ $this.attr('data-index') +'-con'),
			toTop			=	parseInt(con.attr('data-top'));

		TweenLite.fromTo(con, 0.5, {top:'-300px', autoAlpha:0}, {top:toTop, autoAlpha:1});
	},	

	onItemClose			=	function(){
		var $this		=	$(this),
			con 		=	$this.parent(),
			toTop 		=	parseInt(con.attr('data-top'));

		TweenLite.fromTo(con, 0.5, {top:toTop, autoAlpha:1}, {top:'-300px', autoAlpha:0});
	},

	onCustomerMouseEnter	=	function(){
		var	$this		=	$(this);
		TweenLite.to($customer.not($(this)), 0.5, {autoAlpha:0.3});
	},

	onCustomerMouseLeave	=	function(){
		TweenLite.to($customer, 0.5, {autoAlpha:1});
	},

	onCustomerArrow		=	function(){
		var item_len	=	$customer.length,
			type 		=	$(this).attr('data-type'),
			top 		=	parseInt($customer_con.css('top'));

		if( type == "down" ){
			if( top > -142*(item_len/4 - 3) ){
				TweenLite.to($customer_con, 0.5, {top:top - 142});
			}
		}
		else{
			if( top < 0 ){
				TweenLite.to($customer_con, 0.5, {top:top + 142});
			}
		}
	},

	onCustomerClick		=	function(){
		var $this		=	$(this);

		if( $this.attr('data-url') ){
			$customer_detail.find('img').attr('url',$this.attr('data-url')).onload(function(){
				$('.customer-content').perfectScrollbar('update');
			});
		}

		TweenLite.fromTo($customer_detail, 0.5, {top:'-600px', autoAlpha:0}, {top:customer_top, autoAlpha:1});
	},

	onCustomerClose		=	function(){
		TweenLite.fromTo($customer_detail, 0.5, {top:customer_top, autoAlpha:1}, {top:'-600px', autoAlpha:0});
	},

	addFavorite 		=	function()
	{
		var sURL 		=	window.location.host, 
			sTitle		=	'大有国际';
	    try
	    {
	        window.external.addFavorite(sURL, sTitle);
	    }
	    catch (e)
	    {
	        try
	        {
	            window.sidebar.addPanel(sTitle, sURL, "");
	        }
	        catch (e)
	        {
	            alert("加入收藏失败，请使用Ctrl+D进行添加");
	        }
	    }
	    return false;
	},

	bindEventLister 	=	function(){
		$header.find('li').on('mouseenter',onNavMouseEnter);
		$nav.on('mouseleave',onNavMouseLeave);
		$slide_con.on('mouseenter',onSlideMouseEnter);
		$slide_con.on('mouseleave',onSlideMouseLeave);
		$slide_left.on('click',onSlideLeft);
		$slide_right.on('click',onSlideRight);
		$company.on('mouseenter',onCompanyMouseEnter);
		$company.on('mouseleave',onCompanyMouseLeave);
		$company.on('click',onCompanyClick);
		$close.on('click',onItemClose);
		$customer.on('mouseenter',onCustomerMouseEnter);
		$customer.on('mouseleave',onCustomerMouseLeave);
		$customer.on('click',onCustomerClick);
		$customer_close.on('click',onCustomerClose);
		$customer_arrow.on('click',onCustomerArrow);
		$(".qq").on('click',addFavorite);
	};

	$(init);
})(jQuery)