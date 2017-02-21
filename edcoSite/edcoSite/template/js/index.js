(function($){
	var header = $('header'),
		pro_list = $(".pro-list"),
		slide = $(".slide"),
		product = $(".product"),
		brand = $(".brand"),
		culture = $(".culture"),
		contact = $(".contact"),
		logo_container = $(".logo-container"),
		header_btn = $(".header-btn"),
		dom_flag = $(".flag"),
		pre = $(".pre"),
		next = $(".next"),
		flag = $(".flag");

	var dom_width = window.innerWidth,
		slide_length = slide.find("li").length,
		slide_index = 0,
		inter;

	var ct = {
		initialise : function(){
			slide.find("img").width(dom_width);
			$('.product').width(window.innerWidth*0.7);
			ct.setListHeight();
			ct.setInter();
		},
		setListHeight : function(){
			var width = parseInt(pro_list.find(".product-img").eq(0).width()),
				height = width*1.3;
			pro_list.find(".product-img").css("height",height);
		},
		setInter : function(){
			inter = window.setInterval(function(){
				next.trigger('click');
			},3000);
		}
	};

	var bindEvent = function(){
		$(window).on("scroll",function(){
			var scrollTop = $(document).scrollTop();
			if(scrollTop > 100){
				dom_flag.find("li").removeClass();
				if(scrollTop + 400 > contact.offset().top){
					dom_flag.find("li").eq(4).addClass("flag5");
				}
				else if(scrollTop  + 400 > culture.offset().top){
					dom_flag.find("li").eq(3).addClass("flag4");
				}
				else if(scrollTop  + 400 > brand.offset().top){
					dom_flag.find("li").eq(2).addClass("flag3");
				}
				else if(scrollTop  + 400 > product.offset().top){
					dom_flag.find("li").eq(1).addClass("flag2");
				}
				else{
					dom_flag.find("li").eq(0).addClass("flag1");
				}
			}
		});
		pre.on("click",function(){
			if(slide_index === 0)
				slide.find("ul").animate({"left":-(dom_width*(slide_length-1))},500,function(){slide_index = slide_length - 1});
			else
				slide.find("ul").animate({"left":parseInt(slide.find("ul").css("left")) + dom_width},500,function(){slide_index--});
		});
		next.on("click",function(){
			if(slide_index === slide_length - 1)
				slide.find("ul").animate({"left":0},500,function(){slide_index = 0});
			else
				slide.find("ul").animate({"left":parseInt(slide.find("ul").css("left")) - dom_width},500,function(){slide_index++});
		});
		slide.on("mouseover",function(){
			window.clearInterval(inter);
			pre.show();
			next.show();
		});
		slide.on("mouseleave",function(){
			ct.setInter();
			pre.hide();
			next.hide();
		});
		flag.find('li').on("click",function(){
			data_index = $(this).attr("data");
			if(data_index == "1")
				$(document.body).animate({'scrollTop':0},500)
			else if(data_index == "2")
				$(document.body).animate({'scrollTop':product.offset().top},500)
			else if(data_index == "3")
				$(document.body).animate({'scrollTop':brand.offset().top},500)
			else if(data_index == "4")
				$(document.body).animate({'scrollTop':culture.offset().top},500)
			else if(data_index == "5")
				$(document.body).animate({'scrollTop':contact.offset().top},500)
		});
	};

	ct.initialise();
	bindEvent();
})(jQuery)