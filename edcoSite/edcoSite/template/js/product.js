(function($){
	var star = $(".comment-star-rate"),
		img_li = $(".main-l ul li"),
		color_li = $(".main-color li"),
		pro_list = $(".pro-list");

	var star_select = 0;

	var ct = {
		initialise : function(){
			$(document).ready(function(){
				CloudZoom.quickStart();
			});
			setInterval(function(){
				if($(".cloudzoom-lens").length)
					$(".cloudzoom-lens").next().hide();
			},500);
			ct.setListHeight();
		},
		setListHeight : function(){
			var width = parseInt(pro_list.find(".product-img").eq(0).width()),
				height = width*1.5;
			pro_list.find(".product-img").css("height",height);
		}
	};

	var bindEvent = function(){
		star.find("a").on("mouseover",function(){
			star.attr("class","comment-star-rate comment-star-rate"+$(this).attr("index"));
		});
		star.find("a").on("click",function(){
			star_select = $(this).attr("index");
			star.attr("rating",$(this).attr("index"));
		});
		star.on("mouseleave",function(){
			if(star_select){
				star.attr("class","comment-star-rate comment-star-rate"+star_select);
			}
			else{
				star.attr("class","comment-star-rate");
			}
		});	
		$('.comment-send').on('click',function(){
			if(!$(this).hasClass("islogin")){
				window.showBox("请先登录");
			}
			else if(star.attr("rating") == "0"){
				window.showBox("请评星");
			}
			else if(!$('.post-head textarea').val().length){
				window.showBox("请输入内容");
			}
			else{
				$.ajax({
					url : '/setComment/',
					method : 'post',
					data : {
						"product_id" : product_id,
						"rate" : parseInt(star.attr("rating")),
						"content" : $('.post-head textarea').val()
					},
					success : function(data){
						if(data == 0)
							window.showBox("评论成功");
					},
					error : function(){
						window.showBox("网络错误，请重试！");
					}
				});
			}
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)