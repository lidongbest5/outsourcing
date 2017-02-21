"use strict";
(function() {
	var $page1 = $('.page1'),
		$page2 = $('.page2'),
		$page3 = $('.page3'),
		$page4 = $('.page4'),
		$page0 = $('.page0'),

		isChecked = false,
		pre_fix = '/levtAd/mobile',
		code,
		user_id,

		init = function() {
			start();
			bindEventListener();
		},

		start = function() {
			// if (navigator.userAgent.indexOf('LeSportsAPP') != -1) {
			// 	if (user_id) {
			// 		onAfterLogin();
			// 	} else {
			// 		$('.s1').hide();
			// 		$('.login').attr('href', 'javascript:lesportJsInterface.getLoginData();');
			// 		$('.btns').prepend('<a href="javascript:lesportJsInterface.getLoginData();"><img src="images/b1.png" class="b1"></a>');
			// 		$page0.hide();
			// 		$page1.show();
			// 	}
			// } else {
			$.ajax({
				url: 'http://sso.le.com/open/checklogin',
				type: 'GET',
				dataType: "jsonp",
				jsonp: "jsonp",
				success: function(data) {
					if (data['status'] === 0) {
						$('.s1').hide();
						$('.btns').prepend('<a href="http://sso.le.com/user/mloginHome?next_action=http://manyuejiu.lesports.com/"><img src="images/b1.png" class="b1"></a>');
						$page0.hide();
						$page1.show();
					} else {
						user_id = data.uid;
						onAfterLogin();
					}
				}
			});
			// }

			$.ajax({
				url: pre_fix + '/member/list-winning',
				type: 'GET',
				success: function(data) {
					if (data.success) {
						var len = data.data.length,
							temp = '';

						for (var i = 0; i < len; i++) {
							temp += '<li>' + data.data[i].mobilePhone.substring(0, 3) + '****' + data.data[i].mobilePhone.substring(7, 11) + '<span>' + data.data[i].member.winningTxt + '</span></li>'
						}

						$page1.find('.list ul div').html(temp);
					}
				}
			});
		},

		onAfterLogin = function() {
			$('.b5').hide();
			$('.b11').show();
			$.ajax({
				url: 'http://u.api.lesports.com/user/v1/tvpay/vipinfo',
				type: 'GET',
				data: {
					caller: 1001,
					userid: user_id,
					_method: 'POST',
					terminal: 141003,
					from: 'center'
				},
				success: function(data) {
					if (data.data.isSportVip) {
						$.ajax({
							url: pre_fix + '/member/save',
							type: 'POST',
							data: {
								lvidentifier: user_id
							},
							success: function(data) {
								if (data.success) {
									var winning = data.data.winning,
										award = data.data.award;

									if (award === 1) {
										$('.b2').hide();
										$page1.find('.s1').hide();
										$page1.find('.s3').show();
										$page0.hide();
										$page1.show();
									} else if (winning === 1 && award === 0) {
										$('.b2').hide();
										$page0.hide();
										$page3.show();
									} else {
										$.ajax({
											url: pre_fix + '/more-prize',
											type: 'GET',
											success: function(data) {
												if (data.data > 0) {

												} else {
													$page1.find('.s1').hide();
													$page1.find('.s2').show();
												}
												$('.b2').hide();
												$page0.hide();
												$page1.show();
											}
										});
									}
								} else {
									alert(data.msg);
								}
							}
						});
					} else {
						$('.b1').hide();
						$page0.hide();
						$page1.show();
					}
				}
			});
		},

		initLottery = function() {
			var lottery = new Lottery('container', 'images/card1.png', 'image', 280, 150, drawPercent);
			lottery.init('images/2.png', 'image');
			setTimeout(function() {
				$('.lottery-prize').show();
			}, 500);
		},

		drawPercent = function() {
			$('#container').hide();
		},

		onClose = function() {
			$(this).closest('.modal').hide();
		},

		onRule = function() {
			$('.rule-modal').show();
		},

		onPrize = function() {
			$('.prize-modal').show();
		},

		onRecieve = function() {
			$page1.hide();
			$page2.show();
			$.ajax({
				url: pre_fix + '/member/lucky-draw',
				type: 'POST',
				data: {
					lvIdentifier: user_id
				},
				success: function(data) {
					if (data.success) {
						$('.prize1 h3').html(data.data);
						$('.prize1').show();
						$('.prize2').hide();
					} else {
						$('.prize1').hide();
						$('.prize2').show();
					}
					initLottery();
				}
			});
		},

		onCode = function() {
			$page2.hide();
			$page3.show();
		},

		onResult = function() {
			var c = $('.code').val(),
				val = $('.phone').val();

			// if (c === code) {
			// 	isChecked = true;
			// }

			if (isChecked) {
				if (c.length) {
					$.ajax({
						url: pre_fix + '/member/cash-prize',
						type: 'POST',
						data: {
							phone: val,
							code: c,
							ctime: (new Date()).getTime(),
							lvIdentifier: user_id
						},
						success: function(data) {
							if (data.success) {
								$page4.find('ul').html('<li>卡号：' + data.data.redeemcode + '</li><li>密码：' + data.data.password + '</li><li>有效期：' + data.data.validityperiod + '</li>');
							} else {}
						}
					});
					$page3.hide();
					$page4.show();
				} else {
					alert('请输入验证码');
				}
			} else {
				alert('请先完成手机号验证');
			}
		},

		onProcess = function() {
			$('.process-modal').show();
		},

		onShare = function() {
			$('.share-modal').show();
		},

		onShareHide = function() {
			$('.share-modal').hide();
		},

		onGet = function() {
			var val = $('.phone').val();
			if (val.length) {
				// code = Math.floor(Math.random() * 10000);
				if ((/^1[3|4|5|7|8]\d{9}$/.test(val))) {
					// $.ajax({
					// 	url: "http://ms.go.le.com/service/message",
					// 	type: "POST",
					// 	data: {
					// 		usr: "lsty-03-hytg-01",
					// 		pwd: "3y453485t",
					// 		ext: 11,
					// 		to: val,
					// 		msg: "乐视体育验证码:" + code,
					// 		linkid: 1234567
					// 	},
					// 	success: function(data) {
					// 		console.log(data);
					// 	}
					// });
					$.ajax({
						url: pre_fix + '/validate-code',
						type: 'POST',
						data: {
							mobilePhone: val,
							currTime: (new Date()).getTime()
						},
						success: function(data) {
							if (data.success) {
								isChecked = true;
								alert('发送成功');
							} else {
								alert(data.msg);
							}
						}
					});
				} else {
					alert('请输入正确手机号');
				}
			} else {
				alert('请输入手机号');
			}
		},

		onLogout = function() {
			$.ajax({
				url: 'http://sso.le.com/user/loginout',
				type: 'GET',
				dataType: "jsonp",
				jsonp: "jsonp",
				success: function(data) {
					window.location.reload();
				},
				error: function(data) {}
			});
		},

		bindEventListener = function() {
			$('.b4').on('touchend', onRule);
			$('.t3').on('touchend', onPrize);
			$('.b1').on('touchend', onRecieve);
			$('.b6').on('touchend', onCode);
			$('.b11').on('touchend', onLogout);
			$('.b7').on('touchend', onProcess);
			$('.b8').on('touchend', onShare);
			$('.share-modal').on('touchend', onShareHide);
			$('.b3').on('touchend', onResult);
			$('.get').on('touchend', onGet);
			$('.close').on('touchend', onClose);
		};

	$(init);
})();
