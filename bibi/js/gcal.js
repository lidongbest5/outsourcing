$(function(){	
	$(".fc-day-content").hover(function(){
		$(this).find(".fc-day-info").stop().animate({
			opacity:1,
			bottom:40
		},{ easing: "easeOutBack", duration: 500 }).show();
		var cls_a=$(this).attr("class");
		var cls_b=cls_a+"-h";
		$(this).addClass(cls_b);
	},function(){
		var cls_a=$(this).attr("class");
		var cls_b=cls_a+"-h";
		$(this).find(".fc-day-info").stop().animate({
			opacity:0,
			bottom:60
		},{ easing: "easeOutBack", duration: 500 }).fadeOut();
		var var2=cls_a.split(' ');	
		$(this).removeClass(var2[2]);
	});
	$(".close").click(function(){
		var cls_a=$(this).attr("class");
		var cls_b=cls_a+"-h";
		$(this).parent().parent().stop().animate({
			opacity:0,
			bottom:100
		},{ easing: "easeOutBack", duration: 500 }).fadeOut();
	});
	$(".class1").click(function(){		
			
	})
})