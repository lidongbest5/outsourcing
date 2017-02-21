"use strict";
(function() {
	var user_id = null,
		is_uploaded = 0,
		img_id,
		val,
		time,

		$b1 = $('.b1'),
		$file = $('#file'),
		$form = $('#form'),

		$page0 = $('.page0'),
		$page1 = $('.page1'),
		$page2 = $('.page2'),
		$page3 = $('.page3'),
		$page4 = $('.page4'),
		$page5 = $('.page5'),

		init = function() {
			var foo = new CROP();

			foo.init({

				// element to load the cropper into
				container: '.crop',

				// image to load, accepts base64 string
				image: 'images/1.jpg',

				// aspect ratio
				width: 300,
				height: 300,

				// prevent image from leaking outside of container. boolean
				mask: false,

				// input[range] attributes
				zoom: {

					// slider step change
					steps: 0.01,

					// minimum and maximum zoom
					min: 1,
					max: 5

				}

			});

			start();
			bindEventListener();
		},

		start = function() {
			if (navigator.userAgent.indexOf('LeSportsAPP') != -1) {
				$page0.hide();
				$page1.show();
				$page1.find('.android-modal').show();
			} else {
				$.ajax({
					url: 'http://sso.le.com/open/checklogin',
					type: 'GET',
					dataType: "jsonp",
					jsonp: "jsonp",
					success: function(data) {
						if (data['status'] === 0) {
							$page1.find('.b1').show();
							$page0.hide();
							$page1.show();
						} else {
							user_id = data.uid;
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
											url: 'check_info.php',
											type: 'GET',
											data: {
												user_id: user_id
											},
											success: function(data) {
												if (data.length > 2) {
													$page1.find('.tip1').show();
												} else {
													$page1.find('.b1').show();
												}
												$page0.hide();
												$page1.show();
											}
										})
									} else {
										$page1.find('.b2').show();
										$page1.find('.tip2').show();
										$page0.hide();
										$page1.show();
									}
								}
							});
						}
					}
				});
			}

		},

		checkVIP = function() {

		},

		onRecieveCard = function() {
			if (user_id) {
				$page1.hide();
				$page2.show();
			} else {
				$page1.find('.modal').show();
			}
		},

		onNameNext = function() {
			var val1 = $page2.find('input').eq(0).val(),
				val2 = $page2.find('input').eq(1).val();
			if (val1.length || val2.length) {
				if (val1.length && val2.length) {
					alert('中英文名仅能选择一个进行填写');
				} else if (val1.length) {
					var reg = /^[\u4E00-\u9FA5]+$/;
					if (!reg.test(val1)) {
						alert('出现非中文字符');
					} else {
						val = val1;
						$page2.hide();
						$page3.show();
					}
				} else {
					var reg = /^[0-9a-zA-Z]*$/g;
					if (!reg.test(val2)) {
						alert('出现非英文字符');
					} else {
						val = val2;
						$page2.hide();
						$page3.show();
					}
				}
			} else {
				alert('请填写完整姓名')
			}
		},

		onUpload = function(type) {
			// wx.ready(function() {
			// 	wx.chooseImage({
			// 		sourceType: [type],
			// 		success: function(res) {
			// 			var localIds = res.localIds;
			// 			wx.uploadImage({
			// 				localId: localIds[0],
			// 				isShowProgressTips: 1,
			// 				success: function(res) {
			// 					img_id = res.serverId;
			// 					onCheckImg();
			// 				}
			// 			});
			// 		}
			// 	});
			// });
			// $('#file').trigger('click').on('change', function() {
			// 	$('#form').submit();
			// });
			time = (new Date()).getTime();
			$('#id').val(user_id);
			$('#name').val(val);
			$('#time').val(time);
			$page3.find('.p2').show();
			$page3.find('.p1').hide();
			$.ajax({
				url: 'upload_file.php',
				type: 'POST',
				cache: false,
				data: new FormData($('#form')[0]),
				processData: false,
				contentType: false,
				success: function(data) {
					$page3.find('.p1').attr('src', data).show();
					$page3.find('.p2').hide();
					$page4.find('.card').attr('src', 'images/upload/' + user_id + '_' + time + '_card.png');
					is_uploaded = 1;
				}
			});
		},

		onCheckImg = function() {
			$.ajax({
				url: 'handleimage.php?media_id=' + img_id,
				type: 'GET',
				success: function(data) {
					// alert('1')
					// alert(data);
					$page3.find('.p1').attr('src', 'images/upload/' + img_id + '_' + time + '.jpg');
					is_uploaded = 1;
				},
				error: function(data) {
					// alert('2')
					// alert(JSON.stringify(data))
				}
			});
		},

		onPhotoNext = function() {
			if (is_uploaded) {
				$page3.hide();
				$page4.show();
				$page4.find('.thumb').attr('src', 'images/upload/' + img_id + '.jpg');
				$page4.find('.t1').text($page2.find('input').eq(0).val());
				$page4.find('.t2').text($page2.find('input').eq(1).val());
			} else {
				alert('请上传图片');
			}
		},

		onPhotoPrev = function() {
			$page3.hide();
			$page2.show();
		},

		onAddressNext = function() {
			if ($page4.find('input').eq(0).val().length && $page4.find('input').eq(1).val().length && $page4.find('input').eq(2).val().length) {
				$.ajax({
					url: 'add_info.php',
					type: 'POST',
					data: {
						user_id: user_id,
						name_chinese: $page2.find('input').eq(0).val(),
						name_english: $page2.find('input').eq(1).val(),
						name: $page4.find('input').eq(0).val(),
						phone: $page4.find('input').eq(2).val(),
						address: $page4.find('input').eq(1).val()
					},
					success: function(data) {
						$page4.hide();
						$page5.show();
					}
				});
			} else {
				alert('请完整填写收件信息')
			}
		},

		onReset = function() {
			$page4.find('input').val('');
		},

		onShare = function() {
			$page5.find('.share').show();
		},

		onSubmit = function() {
			return false;
		},

		onPreview = function() {
			$page1.find('.preview-modal').show();
		},

		onPreviewHide = function() {
			$page1.find('.preview-modal').hide();
		},

		onQa = function() {
			$page1.find('.qa-modal').show();
		},

		onQaHide = function() {
			$page1.find('.qa-modal').hide();
		},

		onNameCheck = function() {
			var $this = $(this);
			if ($this.val().length) {
				$this.parent().siblings().find('input').prop('disabled', true).addClass('grey-input');
			} else {
				$this.parent().siblings().find('input').prop('disabled', false).removeClass('grey-input');
			}
		},

		onPrev = function() {
			$page3.find('.p1').attr('src', 'images/p1.png');
			$page4.find('.card').attr('src', '');
			$page4.hide();
			$page3.show();
		},

		bindEventListener = function() {
			$b1.on('touchstart', onRecieveCard);
			$page1.find('.btns .pre_btn').on('touchstart', onPreview);
			$page1.find('.btns .qa').on('touchstart', onQa);
			$page1.find('.close').on('touchstart', onQaHide);
			$page1.find('.pre1').on('touchstart', onPreviewHide);
			$page2.find('input').on('keyup', onNameCheck);
			$page2.find('.b5').on('touchstart', onNameNext);
			$page3.find('.next').on('touchstart', onPhotoNext);
			$page3.find('.prev').on('touchstart', onPhotoPrev);
			$page4.find('.b6').on('touchstart', onAddressNext);
			$page4.find('.b7').on('touchstart', onReset);
			$page4.find('.prev').on('touchstart', onPrev);
			$page5.find('.b8').on('touchstart', onShare);
			$file.on('change', onUpload);
			$form.on('submit', onSubmit);
		};

	$(init);
})();
