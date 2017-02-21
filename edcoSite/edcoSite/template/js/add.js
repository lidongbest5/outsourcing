(function($){
	var product = 1,
		color = 1,
		cor = 1,
		tech = 1,
		prefix = "/static/upload/images/";

	var ct = {
		initialise : function(){
			$(document).ready(function(){
			    $('#product_upload').uploadify ({
			        'swf'		: '/static/js/uploadify.swf',
			        'uploader' 	: '/upload/', 
			        'cancelImage' : '/static/images/cancel.png',
			        'buttonClass' : 'btn',
			        'removeCompleted': true,
			        'fileTypeExts'   : '*.jpg;*.gif;*.png',
			        'multi'		: true,
			        'auto'    : true,
			        'buttonText': '批量添加产品图片',
			        'onUploadSuccess' : function (file, data, response) {
			            ct.setProductImg(data);
			        }
			    });
			    $('#color_upload').uploadify ({
			        'swf'		: '/static/js/uploadify.swf',
			        'uploader' 	: '/upload/', 
			        'cancelImage' : '/static/images/cancel.png',
			        'buttonClass' : 'btn',
			        'removeCompleted': true,
			        'fileTypeExts'   : '*.jpg;*.gif;*.png',
			        'multi'		: true,
			        'auto'    : true,
			        'buttonText': '批量添加颜色图片',
			        'onUploadSuccess' : function (file, data, response) {
			           	ct.setColorImg(data);
			        }
			    });
			})
		},
		setProductImg : function(data){
			if(product > 10){
				alert("最多添加10张照片")
			}
			else{
				$('#id_img'+product).val(data);
				product++;
			}
		},
		setColorImg : function(data){
			if(color > 10){
				alert("最多添加10张照片")
			}
			else{
				$('#id_color'+color).val(data);
				color++;
			}
		}
	};

	var bindEvent = function(){
		$('.color li').on('click',function(){
			$('.color .show-list').append(cor+'.<i style="background:'+$(this).attr('data')+'"></i>');
			$('#id_color'+cor+'_name').val($(this).attr('data'));
			cor++;
		});
		$('.tech li').on('click',function(){
			$('.tech .show-list').append(tech+'.<img width=50 src="/static/images/'+$(this).attr('data')+'">');
			$('#id_tech'+tech).val($(this).attr('data'));
			tech++;
		});
		$('.type-list li').on('click',function(){
			$(this).addClass("cur").siblings().removeClass('cur');
			$("#id_type1").val($(this).attr("type1"));
			$("#id_type1_ch").val($(this).attr("type1_name"));
			$("#id_type2").val($(this).attr("type2"));
			$("#id_type2_ch").val($(this).attr("type2_name"));
			$("#id_type3").val($(this).attr("type3"));
			$("#id_type3_ch").val($(this).attr("type3_name"));
		});
		$('.se-list li').on('click',function(){
			$(this).addClass("cur").siblings().removeClass('cur');
			$("#id_style").val($(this).attr("type"));
			$("#id_style_ch").val($(this).attr("typename"));
		});
		$('.gender-list li').on('click',function(){
			$(this).addClass("cur").siblings().removeClass('cur');
			$("#id_gender").val($(this).attr("gender"));
			$("#id_gender_ch").val($(this).attr("gendername"));
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)