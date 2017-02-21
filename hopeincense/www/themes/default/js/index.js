(function(){
    var $header     =   $('header'),

        width 		=	$(window).width(),
        height      =   180,
        inter,
        index       =   1,

    init			=	function(){
        if( $('.banner').length ){
            setInter();
        }

        setSlide();
    	bindEventListener();
    },

    setSlide 			=	function(){
    	$('.banner-item').width( width );
    },

    onSlider 			=	function(){
    	var $this 		=	$(this);
    	index 		    =	parseInt($this.attr('data-index'));

    	$this.addClass('current').siblings().removeClass('current');
    	TweenLite.to($('.banner'), 0.5, {left:-index*width});
    },

    setInter            =   function(){
        inter           =   window.setInterval(function(){
            index++;
            if( index > 5 ){
                index       =   1;
            }
            $('.banner-dot a').eq(index-1).addClass('current').siblings().removeClass('current');
            TweenLite.to($('.banner'), 0.5, {left:-(index-1)*width});
        }, 3000);
    },

    clearInter          =   function(){
        window.clearInterval( inter );
    },

    onWindowScroll      =   function(){
        var window_top  =   $(window).scrollTop();

        if( window_top > height ){
            $header.addClass('fixed');
            $('.main').css('padding-top',180);
        }
        else{
            $header.removeClass('fixed');
            $('.main').css('padding-top',0);
        }
    },

    onNavChange         =   function(){
        var $this       =   $(this),
            data        =   $this.attr('data-type');

        $this.addClass('selected').siblings().removeClass('selected');

        $('.good-detail').hide();
        $('.good-detail'+data).fadeIn();
    },

    bindEventListener	=	function(){
        $('.banner-dot a').on('click', onSlider);
        $(window).on('scroll',onWindowScroll);
        $('.good-nav a').on('click', onNavChange);
        $('.banner-container').on('mouseenter', clearInter);
        $('.banner-container').on('mouseleave', setInter);
    };

    $(init);
})();



