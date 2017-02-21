(function($){
	'use strict';

	var $header 		=	$('header'),
		$dropdown 		=	$('.dropdown'),	

	init 				=	function(){
		bindEventLister();
	},

	onDropDown 			=	function(){
		var $this 		=	$(this);
		if( $this.hasClass('show') ){
			$this.removeClass('show');
			TweenLite.fromTo( $this.find('ul'),	0.3, {height:'auto'}, {height:0} );
		}
		else{
			$this.addClass('show');
			TweenLite.fromTo( $this.find('ul'),	0.3, {height:0}, {height:'auto'} );
		}
	},

	bindEventLister 	=	function(){
		$dropdown.on('mouseenter', onDropDown);
		$dropdown.on('mouseleave', onDropDown);
	};

	$(init);
})(jQuery)