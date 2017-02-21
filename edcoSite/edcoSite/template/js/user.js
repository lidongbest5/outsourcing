(function($){
	

	var ct = {
		initialise : function(){
			
		}
	};

	var bindEvent = function(){
		$('.user-submit').on("click",function(){
			$.ajax({
				url : '/updateMember/',
				method : 'post',
				data : {
					"name" : $('input[name="name"]').val(),
					"weibo" : $('input[name="weibo"]').val(),
					"phone" : $('input[name="phone"]').val(),
					"tel" : $('input[name="tel"]').val(),
					"gender" : parseInt($('input[name="gender"]:checked').val()),
					"year" : parseInt($('.input-year').val()) || parseInt($('.input-year').attr("value")),
					"month" : parseInt($('.input-month').val()) || parseInt($('.input-month').attr("value")),
					"day" : parseInt($('.input-date').val()) || parseInt($('.input-date').attr("value")),
				},
				success : function(data){
					if(data == 1){
						window.showBox("修改成功");
					}
					else{
						window.showBox("修改失败，请重试");
					}
				},
				error : function(){
					window.showBox("网络错误，请重试！");
				}
			})
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)