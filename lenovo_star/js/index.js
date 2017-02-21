(function(){
    var is_photo 		=	0,
    	endNextPage 	=	false,
    	endCurrPage 	=	false,
    	isAnimating 	= 	false,
    	cur_page    	=   0,

    	arr 			=	new Array(0,0,0,0,0),
    	result_arr		=	new Array(0,0,0,0),
        result          =   0,
    	a 				=	0,
    	b 				=	0,
    	c 				=	0,
    	d 				=	0,

        share_title     =   '能不能成为霸道总裁?戳进来通过这个模拟考试你就造啦！',
        share_img       =   'http://www.magiceyes.com.cn/projects/lenovo_star/images/share.png',

    	$pages      	=   $('.pt-page'),
    	$index_page 	=	$('.index-page'),
    	$photo_page 	=	$('.photo-page'),
    	$drag_page 		=	$('.dragend-container'),
    	$modal_page 	=	$('.modal-page'),
    	$cheat_page		=	$('.cheat-page'),
    	$result_page 	=	$('.result-page'),
    	$final_page 	=	$('.final-page'),

    init				=	function(){
    	$pages.each( function() {
            var $page = $( this );
            $page.attr( 'originalClassList', $page.attr( 'class' ) );
        } );

        if( $('body').height() < 450 ){
        	$drag_page.find('img').width('80%');
        }

    	initDragEvent();

    	bindEventListener();

        onBindWechatApi();

    	$('.loading').hide();
    },

    initDragEvent 		=	function(){
    	$(".dragend-container").dragend({
    	    direction: "vertical",
    	    stopPropagation: true,
    	    minDragDistance: 10,
            scrollToPage: 1,

    	    onDragEnd: function(a, b, page, d){
    	        if( cur_page != page ){
    	            if( page == 2 || page == 3 || page == 4 || page == 5 || page == 6 ){
    	                var $dom        =   $drag_page.find('.page'+page);
    	                $('.title, .ans1, .ans2, .ans3, .ans4').hide();
                        setTextAnimation($dom.find('.title').show(), 'fadeInDown');
                        setTextAnimation($dom.find('.ans1').show(), 'rollIn1');
                        setTextAnimation($dom.find('.ans2').show(), 'rollIn2');
                        setTextAnimation($dom.find('.ans3').show(), 'rollIn3');
                        setTextAnimation($dom.find('.ans4').show(), 'rollIn4');
    	            }
    	        }
    	        cur_page    =   page;
    	    }
    	});
    },

    setTextAnimation    =   function($ele, className){
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    onRotate            =   function($currPage, $nextPage){
        var outClass = 'pt-page-scaleDown',
            inClass = 'pt-page-moveFromBottom pt-page-delay200';

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


    onShowPhoto 		=	function(){
    	onRotate($index_page, $photo_page);
    },

    onStart 			=	function(){
    	if( !is_photo ){
    		onShowPhoto();
    	}
    },

    onSelectPhoto 		=	function(){
    	var $this 		=	$(this);

    	is_photo 		=	$this.attr('data-id');

    	onRotate($photo_page, $drag_page);
    },

    onCheat 			=	function(){
    	var random 		=	Math.random();
    	if( random < 0.3 ){
    		onRotate($drag_page, $cheat_page);
		    arr 		=	[0,0,0,0,0];
    	}
    	else{
    		showModal(cur_page-1);
    	}
    },

    showModal 			=	function(index){
    	$modal_page.css({'z-index':10,'visibility':'visible'}).find('.modal').hide();
    	$modal_page.find('.modal'+index).show();
    },

    onHideModal 		=	function(){
    	$modal_page.css({'z-index':1,'visibility':'hidden'})
    },

    onRestart 			=	function(){
    	onRotate($cheat_page, $drag_page);
        $(".dragend-container").dragend({
            scrollToPage: 1
        });
        $drag_page.find('.selected').removeClass('selected');
    },

    onSelectAns 		=	function(){
    	var $this 		=	$(this),
    		q 			=	parseInt($this.attr('data-q')),
    		a 			=	parseInt($this.attr('data-a'));

    	arr[q] 			=	a;

    	$this.addClass('selected').siblings().removeClass('selected');
    },

    onSub 				=	function(){
    	if( arr.indexOf(0) != -1 ){
    		showModal(6);
    	}
    	else{
    		// for( var i = 0;i < 5; i++){
    		// 	if( arr[i] == 1 ){
    		// 		result_arr[0] = ++a;
    		// 	}
    		// 	else if( arr[i] == 2 ){
    		// 		result_arr[1] = ++b;
    		// 	}
    		// 	else if( arr[i] == 3 ){
    		// 		result_arr[2] = ++c;
    		// 	}
    		// 	else if( arr[i] == 4 ){
    		// 		result_arr[3] = ++d;
    		// 	}
    		// }

    		// var temp 	=	0;

    		// for( var i = 0; i < 4; i++ ){
    		// 	if( result_arr[i] > temp ){
    		// 		result 	=	i;
    		// 	}
    		// }

            result  =   Math.floor( Math.random()*5 + 1 );

    		$result_page.find('.result').html('<img src="http://www.magiceyes.com.cn/projects/lenovo_star/images/result'+ result +'.jpg">');
            if( result == 1 ){
                share_title     =   '我是路飞型总裁，敢不敢进来测试你的总裁类型！';
            }
            else if( result == 2 ){
                share_title     =   '我是何以琛型总裁，敢不敢进来测试你的总裁类型！';
            }
            else if( result == 3 ){
                share_title     =   '我是武则天型总裁，敢不敢进来测试你的总裁类型！';
            }
            else if( result == 4 ){
                share_title     =   '我是邢帅型总裁，敢不敢测进来试你的总裁类型！';
            }
            else if( result == 5 ){
                share_title     =   '我是周星型总裁，敢不敢测进来试你的总裁类型！';
            }

            onBindWechatApi();
    		onRotate($drag_page, $result_page);
    	}
    },

    onFinal 			=	function(){
    	onRotate($result_page, $final_page);
    },

    onBindWechatApi     =   function(){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: share_title,
                link: window.location.href,
                imgUrl: share_img,
                success: function () {},
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: share_title,
                desc: '', 
                link: window.location.href,
                imgUrl: share_img,
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
        });
    },

    onShare             =   function(){
        showModal(7);
    },

    bindEventListener	=	function(){
        $index_page.find('.index-img').on('touchend', onShowPhoto);
        $index_page.find('a').on('touchend', onStart);
        $photo_page.find('.photo-container div').on('touchend', onSelectPhoto);
        $drag_page.find('.cheat').on('touchend', onCheat);
        $drag_page.find('.ans').on('touchend', onSelectAns);
        $drag_page.find('.sub-btn').on('touchend', onSub);
        $modal_page.on('touchend', onHideModal);
        $cheat_page.on('touchend', onRestart);
        $result_page.find('.result-btn').on('touchend', onFinal);
        $result_page.find('.result').on('touchend', onShare);
    };

    $(init);
})();



