(function($){
	var error = $('.error');

	var ct = {
		initialise : function(){
			
		}
	};

	var bindEvent = function(){
		$('.user-submit').on("click",function(){
			$.ajax({
				url : '/pwdValidate/',
				method : 'post',
				data : {
					"nowpwd":$('.now-pwd input').val(),
					"newpwd":$('.new-pwd input').val(),
					"repwd":$('.re-pwd input').val()
				},
				success : function(data){
					if(data == 0){
						window.showBox("修改成功");
					}
					else if(data == 1){
						error.html("未输入或未按要求输入");
					}
					else if(data == 2){
						error.html("当前密码输入错误");
					}
					else if(data == 3){
						error.html("确认密码与新密码输入不一致");
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