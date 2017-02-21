(function(){
	"user strict";
    var win_width 		=	$('body').width(),
    	default_height 	=	270,

    	$map_controller =	$('.map_controller a'),
    	$map_container 	=	$('#map_container'),
    	$map 			=	$('.map'),
        $page1          =   $('.page1'),
        $page2          =   $('.page2'),
        $page3          =   $('.page3'),
        $back_to_home   =   $('.back-to-home'),
        $back_to_prev   =   $('.back-to-prev'),

    	is_zoomed 		=	false,
    	curX 			=	0,
    	curY 			=	0,
    	startX			=	0,
    	startY			=	0,
    	endX            =   0,
        endY            =   0,

    	endNextPage     =   false,
        endCurrPage     =   false,
        isAnimating     =   false,
        cur_page,
        pre_page, 

    init				=	function(){
        setPtPage();
    	setDefaultMap();
        setHeight();
    	bindEventListener();

        window.showDetailPage   =   showDetailPage;

        onLastLoad();
    },

    onLastLoad          =   function(){
        $('.loading').hide();
        $page1.addClass('pt-page-current');
        setTimeout(function(){
            setCountUp('count1', 0, 3);
            setCountUp('count2', 0, 4);
            setCountUp('count3', 0, 5);
        },2000);
    },

    setPtPage           =   function(){
        $('.pt-page').each( function() {
            var $page = $(this);
            $page.attr( 'originalClassList', $page.attr( 'class' ) );
        } );
    },

    setDefaultMap 		=	function(){
		$map.height(default_height*win_width/320);
	    renderMap("map_container", win_width, false);
    },

    setHeight           =   function(){
        $('.detail-holder').width(272*win_width/320).height(288*win_width/320);
    },

    setCountUp          =   function(dom, start, time){
        var options = {
          useEasing : true, 
          useGrouping : true, 
          separator : '', 
          decimal : '', 
          prefix : '', 
          suffix : '' 
        };
        var count = new countUp(dom, start, $('#'+dom).html(), 0, time, options);
        count.start();
    },

    onMapControl 		=	function(){
    	var $this 		=	$(this);

        if( $this.hasClass('selected') ){
            return false;
        }

    	$this.addClass('selected').siblings().removeClass('selected');

    	if( $this.hasClass('map-zoomin') ){
    		zoomMap(win_width/2, default_height/2);
    	}
    	else{
    		$map_container.empty().css('-webkit-transform','translate3d(0,0,0)');
    		renderMap("map_container", win_width, false);
    		is_zoomed 	=	false;
    		unbindDragListener();
    	}
    },

    onTouchMap          =   function( e ){
        if( !is_zoomed ){
            e               =    e.originalEvent || e;
            var touch       =    e.touches[0],
                touchX      =    touch.pageX;
                touchY      =    touch.pageY;
            $('.map-zoomin').addClass('selected').siblings().removeClass('selected');
            zoomMap(touchX, touchY);
            return false;
        }
    },

    zoomMap             =   function(touchX, touchY){
        $map_container.empty().css('-webkit-transform','translate3d('+ -touchX +'px,'+ -touchY +'px,0)');
        renderMap("map_container", win_width*2, true);
        is_zoomed   =   true;
        curX        =   0;
        curY        =   0;
        startX      =   0;
        startY      =   0;
        endX        =   -touchX;
        endY        =   -touchY;
        bindDragListener();
    },

    onRotate            =   function($currPage, $nextPage){
        var outClass = 'pt-page-scaleDown',
            inClass = 'pt-page-moveFromBottom pt-page-delay300';

        pre_page        =   $currPage;
        cur_page        =   $nextPage;

        $nextPage.addClass('pt-page-current');

        $currPage.addClass( outClass ).on( 'webkitAnimationEnd', function() {
            $currPage.off( 'webkitAnimationEnd' );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        $nextPage.addClass( inClass ).on( 'webkitAnimationEnd', function() {
            $nextPage.off( 'webkitAnimationEnd' );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
    },

    onEndAnimation        =   function( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    },

    resetPage             =    function( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.attr( 'originalClassList' ) ).removeClass('pt-page-current');
        $inpage.attr( 'class', $inpage.attr( 'originalClassList' ) + ' pt-page-current' );
    },

    showDetailPage      =   function( data ){
        console.log(data);
        onRotate($page2, $page3);
        setTimeout(function(){
            setCountUp('count5', 0, 3);
            setCountUp('count6', 0, 4);
        },1000);
    },

    onStart 			=	function(e){
    	e              =    e.originalEvent || e;

        var touch      =    e.touches[0];
        startX         =    touch.pageX;
        startY         =    touch.pageY;
    	// return false;
    },

    onMove 				=	function(e){
    	e              	=   e.originalEvent || e;
    	e.preventDefault();

    	var el         	=   $(this),
    	    touch      	=   e.touches[0];

    	curX 			=  	touch.pageX - startX;
    	curY 			= 	touch.pageY - startY;

    	var deltaX 		=	endX + curX,
    		deltaY 		=	endY + curY;

    	// if( deltaX > 0 || deltaX < -win_width ){
    	// 	return false;	
    	// }
    	// else if( deltaY > 0 || deltaY < -default_height ){
    	// 	return false;
    	// }

    	$map_container.css('-webkit-transform','translate3d('+ deltaX +'px,'+ deltaY +'px,0)');
    	// return false;
    },

    onEnd 				=	function(e){
    	endX 			+=	curX;
    	endY 			+=	curY;
    	// return false;
    },

    bindDragListener 	=	function(){
    	$map_container.on('touchstart', onStart);
		$map_container.on('touchmove', onMove);
		$map_container.on('touchend', onEnd);
    },	

    unbindDragListener 	=	function(){
    	$map_container.off('touchstart', onStart);
		$map_container.off('touchmove', onMove);
		$map_container.off('touchend', onEnd);
    },

    onPageStart         =   function(){
        onRotate($page1, $page2);
        setTimeout(function(){
            setCountUp('count4', 0, 3);
        },1500);
    },

    onBackToHome        =   function(){
        onRotate(cur_page, $page1);
    },

    onBackToPrev        =   function(){
        onRotate(cur_page, pre_page);
    },

    bindEventListener	=	function(){
        // $('.submits').on('load', onLastLoad);
        $map_container.on('touchstart', onTouchMap);
        $map_controller.on('touchend', onMapControl);
        $page1.on('touchend', onPageStart);
        $back_to_home.on('touchend', onBackToHome);
        $back_to_prev.on('touchend', onBackToPrev);
    };

    $(init);
})();



