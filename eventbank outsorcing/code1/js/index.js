$body 	=	$('body');
(function($){
	var ID 					=	'eventTemplateView',
		$dom				=	$('#'+ID),
		$item_info 			=	$dom.find('.info-item'),
		$speaker 			=	$dom.find('.speaker'),
		$speaker_dot		=	$speaker.find('.speaker-dot'),
		$speaker_container 	=	$speaker.find('.speaker-container'),
		$speaker_items		=	$speaker.find('.speaker-items'),
		$speaker_arrow 		=	$dom.find('.speaker-detail .speaker-item'),
		$agenda 			=	$dom.find('.agenda'),
		$agenda_top			=	$agenda.find('.agenda-top'),
		$agenda_arrow 		=	$agenda.find('.agenda-arrow'),
		$viewMore 			=	$agenda.find('.agenda-showmore'),
		$agenda_nav 		=	$agenda.find('.agenda-top-container li'),
		$agenda_room		=	$agenda.find('.agenda-room a'),
		$ticketContainer 	=	$dom.find('.ticketContainer'),
		$nav_more 			=	$dom.find('.nav-more'),

		agenda_width 		=	parseInt($agenda_top.width()),
		agenda_index 		=	5,
		agenda_len 			=	$agenda_top.find("li").length,

		isTouch			=	('ontouchstart' in window) && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent),
		isPhone			=	$(window).innerWidth() < 640,

	init 					=	function(){
		setWidth();

		setTicket();

		setbanner();

		if( isTouch && isPhone ){
			setPhoneNav();
		}
		
		initEventHandlers();
	},

	setPhoneNav 			=	function(){
		$nav_more.find('li').insertBefore($nav_more);
		$nav_more.remove();
	},

	setWidth				=	function(){
		if( $agenda.length ){
			$agenda_top.find('li').css({"width":agenda_width*0.19,
										"margin-right":agenda_width*0.01});
			$agenda.find('.agenda-width').css({"width":agenda_width});
			$agenda.find('.agenda-line').css({"left":agenda_width*0.1+42});
		}
	},

	setTicket 				=	function(){
		if( $ticketContainer.length ){
			$ticketContainer.masonry({
				itemSelector: '.ticketItem',
				isFitWidth: true
			});
		}
	},

	setbanner 				=	function(){
		var len 			=	$item_info.length,
			temp 			=	0;
		while(len--){
			var height 		=	$item_info.eq(len).height();
			if( height > temp ){
				temp 		=	height;
			}
		}
		$item_info.height(temp);
	},

	onSpeakerSlide		=	function(){
		var $this 		=	$(this),
			index 		=	parseInt($this.attr('data-index')),
			speaker_width		=	parseInt($speaker_container.width());

		$this.addClass('selected').siblings().removeClass('selected');
		TweenLite.to($speaker_items, 0.5, {left:-index*speaker_width})
	},

	onAgendaSlide 		=	function(){
		var $this 		=	$(this),
			type 		=	$this.attr('data-type');

		if( type == "left" ){
			if( agenda_index <= 5 ){
				agenda_index = 5;
			}
			else{
				agenda_index--;
			}	
		}
		else{
			if( agenda_index >= agenda_len ){
				agenda_index = agenda_len;
			}
			else{
				agenda_index++;
			}
		}
		TweenLite.to($dom.find('.agenda-top-container ul'), 0.5, {left:-(agenda_index-5)*agenda_width*0.2});
	},

	onViewMore 			=	function(){
		var $this 		=	$(this),
			$cutoff 	=	$this.parent().find('.agenda-cutoff'),
			$more 	=	$this.parent().find('.agenda-more');

		if( $this.hasClass('isShow') ){
		    $more.hide();
		    $cutoff.show();
		    $this.removeClass('isShow').text('View More');
		}
		else{
			$more.show();
		    $cutoff.hide();
		    $this.addClass('isShow').text('View Less');
		}
	},

	onAgendaClick		=	function(){
		var $this 		=	$(this),
			index 		=	parseInt($this.attr('data-index'));

		$this.addClass('selected').siblings().removeClass('selected');
		TweenLite.to($dom.find('.agenda-items ul'), 0.5, {left:-index*agenda_width});
	},

	onAgendaRoom		=	function(){
		var $this		=	$(this),
			room_index	=	parseInt($this.attr('data-room')) - 1,
			dom 		=	$this.parents('li').find('.agenda-container li.agenda-width');

		dom.hide().eq(room_index).fadeIn();
		$this.addClass('selected').siblings().removeClass('selected');
	},

	onNavMore 			=	function(){
		var $this 		=	$(this);

		TweenQuick.slideHorizontally($this.find('ul'));
	},

	onSpeakerDetail 	=	function(){
		var $this 		=	$(this),
			$container 	=	$this.closest('.speaker-item');

		if( $this.hasClass('expand') ){
			$container.find('.speaker-more').hide();
			$container.find('.speaker-cutoff').show();
		}
		else{
			$container.find('.speaker-more').show();
			$container.find('.speaker-cutoff').hide();
		}
		$this.toggleClass('expand');
	},

	onAgendaSpeakerToggle	=	function(){
		var $this 			=	$(this),
			$dom 			=	$this.parent();
		if( $dom.hasClass('isShow') ){
			$dom.width('88px');
			// TweenLite.to($dom, 1, {width:88});
			$dom.removeClass('isShow');
		}
		else{
			$dom.width('auto');
			// TweenLite.to($dom, 1, {width:'auto'});
			$dom.addClass('isShow');
		}
	},

	initEventHandlers 	=	function(){
		$speaker_dot.find('li').on('click',onSpeakerSlide);
		$agenda_arrow.on('click',onAgendaSlide);
		$viewMore.on('click',onViewMore);
		$agenda_nav.on('click',onAgendaClick);
		$agenda_room.on('click',onAgendaRoom);
		$agenda.find('.agenda-speaker-con').on('mouseenter', onAgendaSpeakerToggle);
		$agenda.find('.agenda-speaker-con').on('mouseleave', onAgendaSpeakerToggle);
		$nav_more.on('mouseenter',onNavMore);
		$nav_more.on('mouseleave',onNavMore);
		$speaker_arrow.on('click', onSpeakerDetail);
		$(window).resize(setWidth);
	};

	$(init);
})(jQuery)