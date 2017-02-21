(function($){
	var ID 				=	'eventTemplateView',

		$dom 			=	$('#' + ID),
		$window  		=	$(window),
		height			=	$window.height(),

		$nav			=	$dom.find('.main-nav a').not('.register'),
		$agenda			=	$dom.find('.agenda-content'),
		$agenda_main	=	$dom.find('.agenda-container ul'),
		$agenda_item	=	$dom.find('.agenda dl'),
		$agenda_btn		=	$dom.find('.dayNavigation a'),
		$agend_day 		=	$dom.find('.dayName'),
		$speaker 		=	$dom.find('.speaker li'),

		nav_len			=	$nav.length,
		agenda_index 	=	1,
		agenda_limit 	=	parseInt($agend_day.attr("day-length")),
		agenda_width 	=	parseInt($dom.find('.agenda .inner').width()),
		is_showModal	=	false,

	init 				=	function(){
		setAgenda();

		initEventHandlers();
	},

	setAgenda			=	function(){
		$agenda_item.css({"width":agenda_width*0.31, "margin-right":agenda_width*0.03})
	},

	onWindowScroll		=	function(){
		var length		=	nav_len,
			window_top 	=	$window.scrollTop();

		for( var i = 0; i < length; i++ ){
			var type 	=	$nav.eq(i).attr('type');
			if( window_top - 100 < $("#"+type).offset().top){
				$nav.eq(i).addClass('selected').siblings().removeClass('selected');
				break;
			}
		}
	},

	onNavClick			=	function(){
		var $this		=	$(this),
			type		=	$this.attr("type"),
			top 		=	type == "home" ? 0 : $("#"+type).offset().top - 50;

		TweenLite.to(window, 0.5, {scrollTo:{y:top}});
	},

	onAgendaClick		=	function(){
		var $this 		=	$(this),
			$more  		=	$this.parent().find('.agenda-more');

		TweenQuick.slideHorizontally( $more );
	},

	onAgendaChange 		=	function(){
		var $this 		=	$(this),
			type 		=	$this.hasClass("prev-button"),
			title 		=	null;

		if( type ){
			if( agenda_index > 1 ){
				agenda_index--;	
			}
		}
		else{
			if( agenda_index < agenda_limit ){
				agenda_index++;
			}
		}
		title			=	$agend_day.attr("day" + agenda_index);
		$agend_day.html(title);

		TweenLite.to($agenda_main, 0.5, {left:-(agenda_index-1)*agenda_width*1.03});
	},

	onSpeakerClick 		=	function(){
		var $this 		=	$(this);
		if( !is_showModal ){
			$('<div class="speaker-modal"><div class="modal-container"></div><a class="modal-close">X</a></div>').appendTo($('body'));
			is_showModal 	=	true;
		}
		$dom.find('.speaker-modal .modal-container').html($this.html()).append('<p>'+ $this.attr('desc') +'</p>');
		TweenQuick.slideHorizontally( $dom.find('.speaker-modal'), false );
	},

	onSpeakerClose 		=	function(){
		TweenQuick.slideHorizontally( $dom.find('.speaker-modal'), true );
	},

	initEventHandlers 	=	function(){
		$window.on('scroll',onWindowScroll);
		$nav.on('click',onNavClick);
		$agenda.on('click',onAgendaClick);
		$agenda_btn.on('click',onAgendaChange);
		$speaker.on('click',onSpeakerClick);
		$('body').on('click', '.modal-close', onSpeakerClose);
	};

	$(init);
})(jQuery)