/*
**	世界杯竞猜JS
**	author lidongbest5@gmail.com
*/
(function($){
	"use strict";

	var $container 	= 	$('.container'),
		$form 		=	$('.form'),
		$popup		=	$('.popup'),
		$column		=	$container.find('.column'),
		$round1		=	$column.filter('[data-round="1"]'),
		$round2		=	$column.filter('[data-round="2"]'),
		$round3		=	$column.filter('[data-round="3"]'),
		$round4		=	$column.filter('[data-round="4"]'),
		$round5		=	$column.filter('[data-round="5"]'),
		$round6		=	$column.filter('[data-round="6"]'),
		$champion 	=	$container.find('.champion'),
		$third		=	$container.find('.third'),

		init 		= 	function(){
			initEventHandlers();
		},

		chooseTeam 	= 	function(){
			var self = $(this),
				column = self.closest('.column'),
				round = column.attr('data-round');

			switch(round){
				case '1':
					if( checkTeamChoosed($round2, self) ){
						var groupName = self.attr("team");
						if( checkTeamEmpty($round2.find('.'+ groupName +'1')) ){
							appendTeam($round2.find('.'+ groupName +'1'), self);
						}
						else if( checkTeamEmpty($round2.find('.'+ groupName +'2')) ){
							appendTeam($round2.find('.'+ groupName +'2'), self);
						}
					}
					break;
				case '2':
					if( checkRound($round2) == 16 ){
						if( checkTeamChoosed($round3, self) && checkTeamEmpty($round3.find('.' + self.closest('.team').attr('data-round'))) ){
							appendTeam($round3.find('.' + self.closest('.team').attr('data-round')), self);
						}
					}
					else{
						alert('请先完成小组赛的竞猜！');
					}
					break;
				case '3':
					if( checkRound($round3) == 8 ){
						if( checkTeamChoosed($round4, self) && checkTeamEmpty($round4.find('.' + self.closest('.team').attr('data-round'))) ){
							appendTeam($round4.find('.' + self.closest('.team').attr('data-round')), self);
						}
					}
					else{
						alert('请先完成1/8决赛的竞猜！');
					}
					break;
				case '4':
					if( checkRound($round4) == 4 ){
						if( checkTeamChoosed($round5, self) && checkTeamChoosed($round6, self) && checkTeamEmpty($round5.find('.' + self.closest('.team').attr('data-round'))) ){
							appendTeam($('.' + self.closest('.team').attr('data-round')).find('.team'), self);
							var another = self.parent().siblings().find('.t');
							appendTeam($('.' + self.parent().attr('data-another')).find('.team'), another);
						}
					}
					else{
						alert('请先完成1/4决赛的竞猜！');
					}
					break;
				case '5':
					if( checkRound($round5) == 2 ){
						if( checkTeamChoosed($champion, self) && checkTeamEmpty($champion) ){
							appendTeam($champion.find('.team'), self);
						}
					}
					else{
						alert('请先完成半决赛的竞猜！');
					}
					break;
				case '6':
					if( checkRound($round6) == 2 ){
						if( checkTeamChoosed($third, self) && checkTeamEmpty($third) ){
							appendTeam($third.find('.team'), self);
						}
					}
					else{
						alert('请先完成半决赛的竞猜！');
					}
					break;	
			};
		},

		appendTeam	=	function(con, obj){
			con.append(obj.clone()).addClass('choose');
		},

		checkTeamChoosed =	function(con, obj){
			return !con.find('.' + obj.attr('class').match(/t\d+/)[0]).length;
		},

		checkTeamEmpty 	=	function(obj){
			return !obj.find('.t').length;
		},

		checkRound  = 	function(obj){
			return obj.find('.t').length;
		},

		unchooseTeam = function(){
			var self = $(this);
			self.closest('.choose').removeClass('choose');
			self.closest('.t').detach();
			return false;
		},

		resetColumn = function(column){
			column.find('.t').detach();
			column.find('.choose').removeClass('choose');
		},

		resetTeam = function(){
			resetColumn($round2);
			resetColumn($round3);
			resetColumn($round4);
			resetColumn($round5);
			resetColumn($round6);
			resetColumn($champion);
			resetColumn($third);
		},

		setValue = function(formObj, obj){
			formObj.val(obj.text());
		},

		submitForm = function(){
			setValue($form.find('#col_1'), $container.find('.A1 .t'));
			setValue($form.find('#col_2'), $container.find('.A2 .t'));
			setValue($form.find('#col_3'), $container.find('.B1 .t'));
			setValue($form.find('#col_4'), $container.find('.B2 .t'));
			setValue($form.find('#col_5'), $container.find('.C1 .t'));
			setValue($form.find('#col_6'), $container.find('.C2 .t'));
			setValue($form.find('#col_7'), $container.find('.D1 .t'));
			setValue($form.find('#col_8'), $container.find('.D2 .t'));
			setValue($form.find('#col_9'), $container.find('.E1 .t'));
			setValue($form.find('#col_10'), $container.find('.E2 .t'));
			setValue($form.find('#col_11'), $container.find('.F1 .t'));
			setValue($form.find('#col_12'), $container.find('.F2 .t'));
			setValue($form.find('#col_13'), $container.find('.G1 .t'));
			setValue($form.find('#col_14'), $container.find('.G2 .t'));
			setValue($form.find('#col_15'), $container.find('.H1 .t'));
			setValue($form.find('#col_16'), $container.find('.H2 .t'));
			setValue($form.find('#col_17'), $container.find('.Q1 .t'));
			setValue($form.find('#col_18'), $container.find('.Q2 .t'));
			setValue($form.find('#col_19'), $container.find('.Q3 .t'));
			setValue($form.find('#col_20'), $container.find('.Q4 .t'));
			setValue($form.find('#col_21'), $container.find('.Q5 .t'));
			setValue($form.find('#col_22'), $container.find('.Q6 .t'));
			setValue($form.find('#col_23'), $container.find('.Q7 .t'));
			setValue($form.find('#col_24'), $container.find('.Q8 .t'));
			setValue($form.find('#col_25'), $container.find('.S1 .t'));
			setValue($form.find('#col_26'), $container.find('.S2 .t'));
			setValue($form.find('#col_27'), $container.find('.S3 .t'));
			setValue($form.find('#col_28'), $container.find('.S4 .t'));
			if($container.find('.third .t').text() == $container.find('.four3 .t').text()){
				setValue($form.find('#col_29'), $container.find('.four4 .t'));
			}
			else{
				setValue($form.find('#col_29'), $container.find('.four3 .t'));
			}
			setValue($form.find('#col_30'), $container.find('.third .t'));
			if($container.find('.champion .t').text() == $container.find('.four1 .t').text()){
				setValue($form.find('#col_31'), $container.find('.four2 .t'));
			}
			else{
				setValue($form.find('#col_31'), $container.find('.four1 .t'));
			}
			setValue($form.find('#col_32'), $container.find('.champion .t'));
			$form.find('#col_33').val($container.find('.name').val());
			$form.find('#col_34').val($container.find('.mail').val());
			$form.find('#col_35').val($container.find('.phone').val());
			$form.find('#col_36').val($container.find('.address').val());
			$form.submit();
			$popup.show();
		},

		share = function(){
			var self = $(this),
				url,
				location = escape(window.location.href),
				champion = $container.find('.champion .t').text(),
				title = '我心目中的冠军是' + champion,//分享文案
				pic = '';//分享图片
			switch(self.attr('data')){
				case 'close':
					$popup.hide();
					return false;
				case 'renren':
					url = 'http://widget.renren.com/dialog/share?resourceUrl='+ location +'&images='+ pic +'&description='+ title +'&charset=UTF-8';
					break;
				case 'kaixin':
					url = 'http://www.kaixin001.com/rest/records.php?url='+ location +'&style=11&content='+ title +'&pic=' + pic;
					break;
				case 'sinavb':
					url = 'http://service.weibo.com/share/share.php?url='+ location +'&title='+ title +'&pic=' + pic;
					break	;
				case 'qzone':
					url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ location +'&desc='+ title +'&pics=' + pic;
					break;
				case 'douban':
					url = 'http://www.douban.com/share/service?bm=&image='+ pic +'&href='+ location +'&updated=&name=' + title;
					break;
			}
			window.open(url,'_blank');
		},

		initEventHandlers = function(){
			$container.on('click','.t',chooseTeam);
			$container.on('click','.unchoose',unchooseTeam);
			$container.on('click','.reset',resetTeam);
			$container.on('click','.submit',submitForm);
			$popup.on('click','a',share);
		};

	$(init);
})(jQuery)




















