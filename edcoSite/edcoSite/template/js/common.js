(function($){
	var header = $('header'),
		logo_container = $(".logo-container"),
		header_btn = $(".header-btn");

	var ct = {
		initialise : function(){
			slide.find("img").width(dom_width);
		},
		headerMethod : function(flag){
			if(flag){
				header.css("top",-67);
				logo_container.hide();
			}
			else{
				header.css("top",0);
				logo_container.show();
			}
		}
	};

	var bindEvent = function(){
		$(window).on("scroll",function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 100){
				ct.headerMethod(true);
			}
			else{
				ct.headerMethod(false);
			}
		});
		header.on('mouseover',function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 100){
				ct.headerMethod(false);
			}
			else
				return false;
		});
		header.on('mouseleave',function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 100){
				ct.headerMethod(true);
			}
			else
				return false;
		});
	};

	window.showBox = function(data){
		if(!$('.showBox').length){
			$('<div class="showBox"></div>').insertBefore($('footer'));
		}
		$('.showBox').css("left",(window.innerWidth - parseInt($('.showBox').width()))/2).html(data).fadeIn();
		setTimeout(function(){
			$('.showBox').fadeOut();
		},2000);
	}

	bindEvent();
})(jQuery)