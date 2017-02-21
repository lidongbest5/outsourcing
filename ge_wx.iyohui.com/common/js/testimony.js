$(function(){
	//点赞
	$(".zan_click").click(function(){
		var testimony_id = $(this).attr("id").replace("zan_click_","");
		var ssoid = $("#ssoid").val();
		
		$.post("/testimony/save_praise",{ssoid:ssoid,testimony_id:testimony_id},function(data){
			if( data == 1 ){
				window.location.reload();
			}
			if( data == 0 ){
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
				return false;
			}
			if( data == 2 ){
				var content = '<center>';
				content += '<div id="layer_message">';
				content += '	<div id="layer_close" onclick="$.modal.close();"></div>';
				content += '	<div style="clear:right"></div>';
				content += '	<div id="layer_content_text">';
				content += '		您已赞过啦';
				content += '	</div>';
				content += '</div>';			
				content += '</center>';
				popNotice('tip_message', 1, content, 320, 190);
				return false;
			}
		})
	})
})

