(function($){
	var pro_list = $(".pro-list"),
		container = $('.product-container'),
		loading = '<div class="loading"><img src="/static/images/loading.gif"></div>';

	var page_count = 1;

	var ct = {
		initialise : function(){
			ct.setListHeight();
			$('.product').width(window.innerWidth*0.7);
		},
		setListHeight : function(){
			var width = parseInt($(".pro-list").find(".product-img").eq(0).width()),
				height = width*1.3;
			$(".pro-list").find(".product-img").css("height",height);
			
			var page = parseInt($('.page').val()),
				total = parseInt($('.total').val()),
				html = '';

			if(page > 1){
				html += '<a href="javascript:;" data="'+ (page - 1) +'" class="page"><</a>';
			}
			if(page > 3 && total > 3){
				html += '<a href="javascript:;" data="1" class="page">1</a>...';
			}
			if(total == 1){
				html += '<a href="javascript:;" data="1" class="page cur">1</a>';
			}
			else if(total == 2){
				if(page == 1){
					html += '<a href="javascript:;" data="1" class="page cur">1</a><a href="javascript:;" data="2" class="page">2</a>';
				}
				else{
					html += '<a href="javascript:;" data="1" class="page">1</a><a href="javascript:;" data="2" class="page cur">2</a>';
				}
			}
			else if(total == 3){
				if(page == 1){
					html += '<a href="javascript:;" data="1" class="page cur">1</a><a href="javascript:;" data="2" class="page">2</a><a href="javascript:;" data="3" class="page">3</a>';
				}
				else if(page == 2){
					html += '<a href="javascript:;" data="1" class="page">1</a><a href="javascript:;" data="2" class="page cur">2</a><a href="javascript:;" data="3" class="page">3</a>';
				}
				else{
					html += '<a href="javascript:;" data="1" class="page">1</a><a href="javascript:;" data="2" class="page">2</a><a href="javascript:;" data="3" class="page cur">3</a>';
				}
			}
			else{
				if(page == 1){
					html += '<a href="javascript:;" data="1" class="page cur">1</a><a href="javascript:;" data="2" class="page">2</a><a href="javascript:;" data="3" class="page">3</a>';
				}
				else if(page == total){
					html += '<a href="javascript:;" data="'+(page-2)+'" class="page">'+(page-2)+'</a><a href="javascript:;" data="'+(page-1)+'" class="page">'+(page-1)+'</a><a href="javascript:;" data="'+page+'" class="page cur">'+page+'</a>';
				}
				else{
					html += '<a href="javascript:;" data="'+(page-1)+'" class="page">'+(page-1)+'</a><a href="javascript:;" data="'+(page)+'" class="page cur">'+(page)+'</a><a href="javascript:;" data="'+(page+1)+'" class="page">'+(page+1)+'</a>';
				}
			}
			if(page < total - 3 && total > 3){
				html += '...<a href="javascript:;" data="'+total+'" class="page">'+total+'</a>';
			}
			if(page != total){
				html += '<a href="javascript:;" data="'+ (page + 1) +'" class="page">></a>';
			}
			$('.pages').html(html);

		},
		setList : function(){
			$.ajax({
				url : "/getProductList/",
				method : "POST",
				data : {
					"page" : page_count,
					"type1" : $("#type1").attr("data"),
					"type2" : $("#type2").attr("data"),
					"type3" : $("#type3").attr("data"),
					"style" : $("#style").attr("data"),
					"gender" : $("#gender").attr("data"),
					"pricelow" : $("#price").attr("datalow"),
					"pricehigh" : $("#price").attr("datahigh"),
				},
				success : function(data){
					container.html(data);
					ct.setListHeight();
				},
				error : function(){
					window.showBox("网络错误，请重试！");
				}
			});
		}
	};

	var bindEvent = function(){
		$('.type li').on('click',function(){
			$('.main-l').hide();
			if($(this).attr("data-value") == 'apparel'){
				$('#apparel').fadeIn();
			}
			else if($(this).attr("data-value") == 'footwear'){
				$('#footwear').fadeIn();
			}
			else{
				$('#equipment').fadeIn();
			}
		});
		$('.main-l li,.list li,.type li').on("click",function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			container.html(loading);
			if($(this).attr("data") == "type1"){
				$('#type2').attr('data','all');
				$('#type3').attr('data','all');
			}
			if($(this).attr("data") !== "price"){
				var ele_id = $(this).attr("data");
				$('#'+ele_id).attr("data",$(this).attr('data-value'));
			}
			else{
				$("#price").attr({"datalow":$(this).attr("datalow"),"datahigh":$(this).attr("datahigh")});
			}
			ct.setList();
		});
		$('.main-r').on('click','.pages a',function(){
			console.log($(this).attr("data"));
			if(parseInt($(this).attr("data")) >= 0){
				page_count = parseInt($(this).attr("data"));
				ct.setList();
			}
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)