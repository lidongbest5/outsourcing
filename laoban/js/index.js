(function(){
	'use strict';

	var $main	=	jQuery('.main'),
		$modal 	=	$main.find('.modal'),
		$img1 	=	$main.find('.image-1'),
		$img2 	=	$main.find('.image-2'),
		$time 	=	$main.find('.time'),
		$level1 	=	$main.find('.level1'),
		$level2 	=	$main.find('.level2'),
		$progress =	$main.find('.progress-middle'),

		data	=	[
					    {
					        "pic_id": 1,
					        "pic1": '/images/image1.jpg',
					        "pic2": '/images/image2.jpg',
					        "pic_data": [
					            {
					                "x": 46,
					                "y": 15,
					                "width": 24,
					                "height": 24,
					                "isCheck": false
					            },
					            {
					                "x": 78,
					                "y": 47,
					                "width": 32,
					                "height": 20,
					                "isCheck": false
					            },
					            {
					                "x": 188,
					                "y": 77,
					                "width": 62,
					                "height": 22,
					                "isCheck": false
					            },
					            {
					                "x": 199,
					                "y": 174,
					                "width": 24,
					                "height": 17,
					                "isCheck": false
					            },
					            {
					                "x": 238,
					                "y": 205,
					                "width": 25,
					                "height": 24,
					                "isCheck": false
					            }
					        ]
					    },
					    {
					        "pic_id": 2,
					        "pic1": '/images/image1.jpg',
					        "pic2": '/images/image2.jpg',
					        "pic_data": [
					            {
					                "x": 46,
					                "y": 15,
					                "width": 24,
					                "height": 24,
					                "isCheck": false
					            },
					            {
					                "x": 78,
					                "y": 47,
					                "width": 32,
					                "height": 20,
					                "isCheck": false
					            },
					            {
					                "x": 188,
					                "y": 77,
					                "width": 62,
					                "height": 22,
					                "isCheck": false
					            },
					            {
					                "x": 199,
					                "y": 174,
					                "width": 24,
					                "height": 17,
					                "isCheck": false
					            },
					            {
					                "x": 238,
					                "y": 205,
					                "width": 25,
					                "height": 24,
					                "isCheck": false
					            }
					        ]
					    }
					],

		checked =	0,
		level 	=	1,

		timer,
		time 	=	60,
		game	=	false,

	init 	=	function(){
		setCutdownDate();

		bindEventLister();
	},

	setCutdownDate 			=	function(){
		var date 			=	new Date();
		date.setFullYear(2014, 10, 11);
		var e = new Date();
	    var f = (Date.parse(date) - Date.parse(e)) / 1000;
	    var g = Math.floor(f / (3600 * 24));
	    $main.find('.deadline').html(g);
	},

	onRule 				=	function(){
		$modal.fadeOut();
		$main.find('.rule').fadeIn();
	},

	onCloseBtn 			=	function(){
		jQuery(this).closest('.modal').fadeOut();
	},

	onSign 				=	function(){
		$modal.fadeOut();
		$main.find('.sign').fadeIn();
	},

	onSignSuccess 		=	function(){
		$modal.fadeOut();
		$main.find('.success').fadeIn();
	},

	onStart 			=	function(){
		game 			=	true;

		setImg();
		startTime();
		$main.find('.start').hide();
		$modal.fadeOut();
	},

	startTime 		=	function(){
		timer 		=	window.setInterval(function(){
			onIntervalTime();
		},100);
	},

	onIntervalTime 	=	function(){
		if( time <= 0 ){
			onGameOver();
		}
		time 	= 	time - 0.1;
		var int_time =	Math.floor(time);
		if( int_time >= 0 ){
			$time.html( int_time < 10 ? '0' + int_time : int_time );
		}
		$progress.height(364*time/60);
		$main.find('.progress').height(364*time/60 + 22);
	},

	setImg 			=	function(){
		var img_data 	=	data[level-1];

		if( !img_data ){
			alert('已通关');
			window.clearInterval( timer );
			return false;
		}

		$img1.css('background-image','url('+img_data.pic1+')');
		$img2.css('background-image','url('+img_data.pic2+')').empty();
		for( var i = 0; i < 5; i++ ){
			$img2.append('<a data-check="false" class="img-check" style="width:'+img_data.pic_data[i].width+'px;height:'+img_data.pic_data[i].height+'px;top:'+img_data.pic_data[i].y+'px;left:'+img_data.pic_data[i].x+'px;"></a>');
		}
	},

	onImgClick 			=	function(){
		var $this 		=	jQuery(this),
			is_check 	=	$this.attr('data-check');

		if( game ){
			if( is_check === 'true' ){
				return false;
			}
			else{
				$this.attr('data-check','true').css('border','2px solid red');
				checked++;
			}

			if( checked >= 5 ){
				window.clearInterval( timer );
				if( level === 3 ){
					$main.find('.modal2').fadeIn();
					return false;
				}
				onNext();
			}
		}
	},

	onNext 				=	function(){
		checked 	=	0;
		time 		=	60;
		level++;

		timer 		=	window.setInterval(function(){
			onIntervalTime();
		},100);

		$level1.css('background-position','0 -'+ Math.floor(level/10)*56 +'px');
		$level2.css('background-position','0 -'+ (level%10)*56 +'px');

		$main.find('.prize-tip span').html(level-1);

		setImg();
	},

	onGameOver 			=	function(){
		game 			=	false;

		$img1.css('background-image','none');
		$img2.css('background-image','none');

		window.clearInterval( timer );
		$main.find('.modal1').fadeIn();
		return false;
	},

	goToPrize 			=	function(){
		jQuery(window).scrollTop(921);
	},

	onContinue 			=	function(){
		$modal.fadeOut();
		onNext();
	},

	bindEventLister 	=	function(){
		$main.find('.btn1').on('click', onRule);
		$main.find('.btn2').on('click', onSign);
		$main.find('.sign-btn').on('click', onSignSuccess);
		$main.find('.start, .success-btn').on('click', onStart);
		$main.find('.close').on('click', onCloseBtn);
		$main.on('click','.img-check',onImgClick);
		$main.find('.modal1 .modal1-prize').on('click',goToPrize);
		$main.find('.modal2 .modal2-btn').on('click',onContinue);
	};

	jQuery(init);
})();