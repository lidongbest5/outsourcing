;(function(){
	"use strict";
    var $body 			=	$('body'),
    	$page1 			=	$('.page1'),
    	$page2 			=	$('.page2'),
    	$page3 			=	$('.page3'),

    	$img1 			=	$('.page2-img1'),
    	$img2 			=	$('.page2-img2'),
    	$img3 			=	$('.page2-img3'),
    	$img 			=	$('.page2-img'),
    	$map 			=	$('.page2-container'),
    	$close 			=	$('.close'),
    	$share_btn 		=	$('.share-btn'),
    	$share 			=	$('.share'),
    	$music 			=	$('.music'),
    	$tips 			=	$('.tips'),

    	width 			= 	$body.width(),
    	height 			=	$body.height(),

    	rate 			=	width/320,

    	map_width 		=	width*0.875,
    	map_height 		=	map_width*410/280,
    	map_left 		=	(width - map_width)/2,
    	map_top 		=	(height - map_height)/2,

    	map1 			=	0,
    	map2 			=	0,
    	map3 			=	0,

    	audioElement,
        audio_flag      =   false,

    init				=	function(){
        setPage1();
        setPage2();
        setPage3();
        setTimeout(function(){
        	$('.loading').hide();
        }, 500);
    	bindEventListener();
		audioElement = document.createElement('audio');
	    audioElement.setAttribute('src', 'http://news.sohu.com/upload/code_v120150430/css/music.mp3');
	    audioElement.load();
	    audioElement.loop=true;
	    audioElement.addEventListener('ended', function() {
	        this.currentTime = 0;
	        this.play();
	    }, false);
	    onAudioStart();
    },

    onAudio             =   function(){
        if( $music.hasClass("on") ){
            audioElement.pause();
            $music.removeClass('on');
        }
        else{
            audioElement.play();
            $music.addClass('on');
        }
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    setPage1 			=	function(){
    	var lottery = new Lottery('page1', 'http://news.sohu.com/upload/code_v120150430/images/index.jpg', 'image', width, height, page1DrawSuccess, 0, 0);
    	lottery.init('http://news.sohu.com/upload/code_v120150430/images/index1.jpg', 'image');
    },

    setPage3 			=	function(){
    	var lottery = new Lottery('page3', 'http://news.sohu.com/upload/code_v120150430/images/bottom.jpg', 'image', width, height, page5DrawSuccess, 0, 0);
    	lottery.init('http://news.sohu.com/upload/code_v120150430/images/bottom1.jpg', 'image');
    },

    page1DrawSuccess    =   function(){
        $page1.addClass('animated').find('.page1-container').fadeOut();
        setTimeout(function(){
        	$page1.hide();
        },2000);
    },

    page2DrawSuccess    =   function(){
        $('#map1').fadeOut();
        $('.page2-container1').addClass('active');
        $('.page2-img1').removeClass('active');
        setTimeout(function(){
        	$('.page2-container1').hide();
        	checkPage3();
        },2000);
        map1 			=	1;     
    },

    page3DrawSuccess    =   function(){
        $('#map2').fadeOut();
        $('.page2-container2').addClass('active');
        $('.page2-img2').removeClass('active');
        setTimeout(function(){
        	$('.page2-container2').hide();
        	checkPage3();
        },2000);
        map2 			=	1;
        $img1.fadeIn();
    },

    page4DrawSuccess    =   function(){
        $('#map3').fadeOut();
        $('.page2-container3').addClass('active');
        $('.page2-img3').removeClass('active');
        setTimeout(function(){
        	$('.page2-container3').hide();
        	checkPage3();
        },2000);
        map3 			=	1;
        $img2.fadeIn();
    },

    page5DrawSuccess    =   function(){
        $page3.find('.page3-container').fadeOut();
    },

    checkPage3 			=	function(){
    	if( map1 && map2 && map3 ){
    		$page2.addClass('animated');
    		setTimeout(function(){
    			$page2.hide();
    			$tips.html('<img src="images/tips1.png">').show();
    		},1500);
    	}
    },

    setPage2 			=	function(){
    	$img1.css({'left': 83*rate,'top': 136*rate});
    	$img2.css({'left': 160*rate,'top': 244*rate});
    	$img3.css({'left': 10*rate,'top': 318*rate});
    	$map.css('top', map_top);

    	var lottery1 = new Lottery('map1', 'http://news.sohu.com/upload/code_v120150430/images/Everest.jpg', 'image', map_width, map_height, page2DrawSuccess, map_left, map_top);
    	lottery1.init('http://news.sohu.com/upload/code_v120150430/images/Everest1.jpg', 'image');

    	var lottery2 = new Lottery('map2', 'http://news.sohu.com/upload/code_v120150430/images/Tibet.jpg', 'image', map_width, map_height, page3DrawSuccess, map_left, map_top);
    	lottery2.init('http://news.sohu.com/upload/code_v120150430/images/Tibet1.jpg', 'image');

    	var lottery3 = new Lottery('map3', 'http://news.sohu.com/upload/code_v120150430/images/Nepal.jpg', 'image', map_width, map_height, page4DrawSuccess, map_left, map_top);
    	lottery3.init('http://news.sohu.com/upload/code_v120150430/images/Nepal1.jpg', 'image');
    },

    activeImg 			=	function(){
    	var $this 		=	$(this),
    		value 		=	$this.attr('data-value');

    	$('.page2-container'+value).fadeIn();
    },

    closeMap 			=	function(){
    	$(this).closest('.page2-container').fadeOut();
    },

    showShare 			=	function(){
    	$share.fadeIn();
    },

    hideShare 			=	function(){
    	$share.fadeOut();
    },

    onTips 				=	function(){
    	$tips.hide();
    },

    bindEventListener	=	function(){
        $img.on('touchend', activeImg);
        $close.on('touchend', closeMap);
        $share_btn.on('touchend', showShare);
        $share.on('touchend', hideShare);
        $(document).on('touchstart', onAudioStart);
        $music.on('touchend', onAudio);
        $tips.on('touchstart', onTips);
    };

    $(init);
})();



