/*alert($(window).height()); //浏览器当前窗口可视区域高度
alert($(document).height()); //浏览器当前窗口文档的高度
alert($(document.body).height());//浏览器当前窗口文档body的高度
alert($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
alert($(window).width()); //浏览器当前窗口可视区域宽度
alert($(document).width());//浏览器当前窗口文档对象宽度
alert($(document.body).width());//浏览器当前窗口文档body的宽度
alert($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin
*/
//alert($(document).width());//浏览器当前窗口文档对象宽度
$(function(){
	$('#file_upload').uploadifive({
		'auto' : true,
		'formData' : {
			'session' : session_id,
			'ssoid' : ssoid,
			'info' : info
		},
		'fileSizeLimit' : photo_max_size,
		'multi' 		: false,
		// 'debug' : "true",
		'scriptAccess' 	: 'always',
		'width' 		: '97',
		'height' 		: '24',
		'buttonText' 	: '上传照片',
		'buttonClass' 	: 'bt',
		//'buttonImage' 	: '/common/images/upload_bt.png',
		'fileDesc' 		: '支持格式：jpg,jpeg,gif,png',
		'queueID'  		: 'queue',
		'uploadScript' 	: '/season/save_upload_img',
		'overrideEvents': ['onSelectError', 'onDialogClose'],
		'onSelectError' : function (file, errorCode, errorMsg) {
			//返回码。文件为空
			if(errorCode == SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT){
				this.queueData.errorMsg = "文件大小不能超过" + photo_max_M + "MB";
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		文件大小不能超过' + photo_max_M + 'MB';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
			return false;
		},
		'onUploadStart' : function(file) {
			$('#upload-queue').hide();
			var content = '<center>';
			content += '<div id="upload_message">';
			//content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
			content += '	<div class="clear"></div>';
			content += '	<div id="layer_content_text">';
			content += '		';
			content += '	</div>';
			content += '</div>';			
			content += '</center>';
			popNotice('tip_message', 1, content, 320, 190);
		},
		'onUpload'         : function(filesToUpload){
          	var content = '<center>';
			content += '<div id="upload_message">';
			//content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
			content += '	<div class="clear"></div>';
			content += '	<div id="layer_content_text">';
			content += '		';
			content += '	</div>';
			content += '</div>';			
			content += '</center>';
			popNotice('tip_message', 1, content, 320, 190);
        },
		/*'onUploadProgress' : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
			console.log(2342);
			$('.fileName').attr('innerHTML', '正在上传: ' + file.name + '(' + parseInt(totalBytesTotal/1024/1024) + 'MB)');
			$('.data').attr('innerHTML', ' - ' + parseInt((totalBytesUploaded/totalBytesTotal) * 100) + '%');
			$('.uploadify-progress-bar').css('width', parseInt((totalBytesUploaded/totalBytesTotal) * 100) + '%');
			if ( (totalBytesUploaded/totalBytesTotal) >= 1) {
				$.modal.close();
			} else {
				popNotice('progress', 1, '', 400, 100);
			}
		},*/
		'onDialogClose' : function(queueData) {
			return false;
		},
		'onUploadComplete' : function(file, data ) {  
			//console.log(data);console.log(file);
			var obj = jQuery.parseJSON(data);
			//obj.result = 4;
			if ( obj.result == 1 ) {
				window.location.href='/season/form_works/'+obj.file_id;
			}
			if( obj.result == 2 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div class="clear"></div>';
				content += '	<div id="layer_content_text">';
				content += '		对不起，<br />你提交的图片不符合标准，请重新提交！';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
			if( obj.result == 3 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		文件大小不能超过'+ photo_max_M +'MB';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
			if( obj.result == 4 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		请重新登录';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
			if( obj.result == 5 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		每人只能上传3个作品';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
		}
	});
	//season_info.php
	$(".left_img").click(function(){
		var id = $(this).attr('id').replace('left_img_', '');
		$.ajax({
			type: "get",
			url: "/season/get_season/left/" + id,
			dataType: "json",
			success: function (data) {
				if ( data.result == 1 ) {
					window.location.href='/season/season_info/' + data.id;
				} else {
					var content = '<center>';
					content += '<div id="layer_message">';
					content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
					content += '	<div style="clear:right"></div>';
					content += '	<div id="layer_content_text">';
					content += '		没有了';
					content += '	</div>';
					content += '</div>';			
					content += '</center>';
					popNotice('tip_message', 1, content, 320, 190);
				}
			}
		});
	})
	$(".right_img").click(function(){
		var id = $(this).attr('id').replace('right_img_', '');
		$.ajax({
			type: "get",
			url: "/season/get_season/right/" + id,
			dataType: "json",
			success: function (data) {
				if ( data.result == 1 ) {
					window.location.href='/season/season_info/' + data.id;
				} else {
					var content = '<center>';
					content += '<div id="layer_message">';
					content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
					content += '	<div style="clear:right"></div>';
					content += '	<div id="layer_content_text">';
					content += '		没有了';
					content += '	</div>';
					content += '</div>';			
					content += '</center>';
					popNotice('tip_message', 1, content, 320, 190);
				}
			}
		});
	})
	
	//form_works.php
	//删除上传图片
	$(".close").click(function(){
		var season_id = $(this).attr('id').replace('close_', '');
		$.get("/season/delete_photo/" + season_id,function(data){
			window.location.href='/season/form_works';
		},'json')
	})
	
	//提交作品
	$('#input_bt').click(function(){
		var ret = save_works();
		if( ret == true ){
			$(this).unbind('click');
			var ssoid = $("#ssoid").val();
			var content = $("#content").val();
			var file_name = $("#file_name").val();
			$("#tu_bt").hide();
			$.post("/season/save_season",{ssoid:ssoid,content:content,file_name:file_name},function(data){
			if( data == 1 ){
				window.location.href='/season/my_works';
			}
			if( data == 0 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		提交失败，请重新登录';
				content += '	</div>';
				content += '</div>';
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
				return false;
			}
			if( data == 2 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		每个用户只能提交3次';
				content += '	</div>';
				content += '</div>';
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
				return false;
			}
		})
		}
	})
	
	//my_works.php
	$(".delete_season").click(function(){
		var season_id = $(this).attr('id').replace('delete_season_', '');
		var content = '<center>';
		content += '<div id="delete_message">';
		content += '	<div id="delete_close" onclick="$.modal.close();"></div>';
		content += '	<div style="clear:right"></div>';
		content += '	<div id="delete_content_text">';
		content += '		您的作品即将删除';
		content += '	</div>';
		content += '	<div id="delete_content_bt">';
		content += '		<div id="delete_bt_queding" onclick="delete_season('+ season_id +')"></div><div id="delete_bt_quxiao" onclick="$.modal.close();"></div>';
		content += '	</div>';
		content += '</div>';
		content += '</center>';
		popNotice('tip_message', 1, content, 425, 240);
		return false;
	})

});

function save_works(){
	var ssoid = $("#ssoid").val();
	var content = $("#content").val();
	var file_name = $("#file_name").val();
	if( ssoid == '' ){
		var content = '<center>';
		content += '<div id="layer_message">';
		content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
		content += '	<div style="clear:right"></div>';
		content += '	<div id="layer_content_text">';
		content += '		提交失败，请重新登录';
		content += '	</div>';
		content += '</div>';
		content += '</center>';
		popNotice('tip_message', 1, content, 320, 190);
		return false;
	}
	if( file_name == '' ){
		var content = '<center>';
		content += '<div id="layer_message">';
		content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
		content += '	<div style="clear:right"></div>';
		content += '	<div id="layer_content_text">';
		content += '		请上传照片';
		content += '	</div>';
		content += '</div>';
		content += '</center>';
		popNotice('tip_message', 1, content, 320, 190);
		return false;
	}
	if( content == '' ){
		var content = '<center>';
		content += '<div id="layer_message">';
		content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
		content += '	<div style="clear:right"></div>';
		content += '	<div id="layer_content_text">';
		content += '		请填写图片描述';
		content += '	</div>';
		content += '</div>';
		content += '</center>';
		popNotice('tip_message', 1, content, 320, 190);
		return false;
	}
	if( content.length > 50 ){
		var content = '<center>';
		content += '<div id="layer_message">';
		content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
		content += '	<div style="clear:right"></div>';
		content += '	<div id="layer_content_text">';
		content += '		描述不能超过50字';
		content += '	</div>';
		content += '</div>';			
		content += '</center>';
		popNotice('tip_message', 1, content, 320, 190);
		return false;
	}
	return true;
}

function delete_season( id ){
	$.ajax({
		type: "get",
		url: "/season/delete_season/" + id,
		dataType: "json",
		success: function (data) {
			if ( data == 1 ) {
				window.location.href='/season/my_works';
			}
			if ( data == 0 ) {
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		删除失败，请重新登录';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
			}
		}
	});
}

function zan( season_id ){
	var ssoid = $("#ssoid").val();
	$.post("/season/season_praise",{ssoid:ssoid,season_id:season_id},function(data){
		if(data == 1 ){
			window.location.reload();
		}
		if(data == 2 ){
			var content = '<center>';
			content += '<div id="layer_message">';
			content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
			content += '	<div style="clear:right"></div>';
			content += '	<div id="layer_content_text">';
			content += '		您已经赞过啦';
			content += '	</div>';
			content += '</div>';			
			content += '</center>';
			popNotice('tip_message', 1, content, 320, 190);
			return false;
		}
	})
}