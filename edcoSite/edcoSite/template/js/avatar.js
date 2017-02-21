(function($){
	var img_data;
	
	var ct = {
		initialise : function(){
			$('#img-upload').uploadify ({
			    'swf'		: '/static/js/uploadify.swf',
			    'uploader' 	: '/uploadAvatar/', 
			    'cancelImage' : '/static/images/cancel.png',
			    'buttonClass' : 'btn',
			    'removeCompleted': true,
			    'fileTypeExts'   : '*.jpg;*.gif;*.png',
			    'multi'		: true,
			    'auto'    : true,
			    'buttonText': '上传图片',
			    'onUploadSuccess' : function (file, data, response) {
			        ct.setAvatarImg(data);
			    }
			});
		},
		setAvatarImg : function(data){
			$('.img-preload img').attr("src",'/static/upload/avatar/l_'+data).show();
			img_data = data;
		}
	};

	var bindEvent = function(){
		$(".save").on("click",function(){
			$.ajax({
				url : '/setAvatar/',
				method : 'post',
				data : {
					"avatar" : img_data
				},
				success : function(data){
					if(data == 0){
						window.showBox("保存成功");
					}
					else{
						window.showBox("保存失败，请重试！");
					}
				}
			});
		});
		$(".cancel").on("click",function(){
			$('.img-preload img').hide();
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)