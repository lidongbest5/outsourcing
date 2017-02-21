(function(){
    var $main 			=	$('.main'),
    	$video 			=	$main.find('#video'),

    	video_index 	=   1,
    	video_lenth 	=	$main.find('.video-container li').length,

    init				=	function(){
        setCarousel();

    	bindEventListener();
    },

    setCarousel 		=	function(){
    	
    },

    onVideoShow 		=	function(){
    	var $this 		=	$(this),
    		url 		=	$this.attr('data-url');

    	$video.attr('src', url);
    	document.getElementById("video").play();
    },

    onVideoSlide 		=	function(){
    	var $this 		=	$(this);

    	if( $this.hasClass('video-left') ){
    		if( video_index > 1 ){
    			video_index--;
    			TweenLite.to($main.find('.video-container ul'), 0.5, {'left': -122*(video_index-1)});
    		}
    	}
    	else{
    		if( video_index < video_lenth - 2 ){
    			video_index++;
    			TweenLite.to($main.find('.video-container ul'), 0.5, {'left': -122*(video_index-1)});
    		}
    	}
    },

    onCarousel 			=	function(){
    	var $this 		=	$(this);

    	if( $this.hasClass('arrow-left') ){
    		onCarouselLeft();
    	}
    	else{
    		onCarouselRight();
    	}
    },

    onCarouselLeft 	=	function(){
    	$('.carousel-item').each(function(){
    		var $this 	=	$(this);
    		if( $this.hasClass('carousel1') ){
    			$this.removeClass('carousel1').addClass('carousel5');
    		}
    		else if( $this.hasClass('carousel2') ){
    			$this.removeClass('carousel2').addClass('carousel1');
    		}
    		else if( $this.hasClass('carousel3') ){
    			$this.removeClass('carousel3').addClass('carousel2');
    		}
    		else if( $this.hasClass('carousel4') ){
    			$this.removeClass('carousel4').addClass('carousel3');
    		}
    		else if( $this.hasClass('carousel5') ){
    			$this.removeClass('carousel5').addClass('carousel4');
    		}
    	});
    },

    onCarouselRight 	=	function(){
    	$('.carousel-item').each(function(){
    		var $this 	=	$(this);
    		if( $this.hasClass('carousel1') ){
    			$this.removeClass('carousel1').addClass('carousel2');
    		}
    		else if( $this.hasClass('carousel2') ){
    			$this.removeClass('carousel2').addClass('carousel3');
    		}
    		else if( $this.hasClass('carousel3') ){
    			$this.removeClass('carousel3').addClass('carousel4');
    		}
    		else if( $this.hasClass('carousel4') ){
    			$this.removeClass('carousel4').addClass('carousel5');
    		}
    		else if( $this.hasClass('carousel5') ){
    			$this.removeClass('carousel5').addClass('carousel1');
    		}
    	});
    },

    onCarouselClick 	=	function(){
    	var $this 		=	$(this),
    		$ele 		=	$this.closest('.carousel-item');

    		console.log( $ele );

    		if( !$ele.hasClass('carousel3') ){
    			if( $ele.hasClass('carousel1') ){
    				onCarouselRight();
    				onCarouselRight();
    			}
    			else if( $ele.hasClass('carousel2') ){
    				onCarouselRight();
    			}
    			else if( $ele.hasClass('carousel4') ){
    				onCarouselLeft();
    			}
    			else if( $ele.hasClass('carousel5') ){
    				onCarouselLeft();
    				onCarouselLeft();
    			}
    			return false;
    		}
    },

    bindEventListener	=	function(){
        $main.find('.video-arrow').on('click', onVideoSlide);
        $main.find('.video-container li').on('click', onVideoShow);
        $main.find('.arrow').on('click', onCarousel);
        $main.on('click', '.carousel-item a',onCarouselClick);
    };

    $(init);
})();



