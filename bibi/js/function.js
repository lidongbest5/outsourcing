jQuery(function(){
	$(".item").hover(
	function(){
		$(this).find(".drop-box").show()
		},
	function(){
		$(this).find(".drop-box").hide()
	});
	
	$(".tag-box li").hover(function(){
		var tmp = $(this).index()
		$(this).parents("ul").find("li").removeClass("hover").eq(tmp).addClass("hover");
		$(this).parents("ul").removeClass().addClass("bg"+(tmp+1));
		$(".t-box .text-box").hide().eq(tmp).show();
	})
	
	$(".PT1-box .pic-box").hover(function(){
		$(this).find(".listen").addClass("listen-hover");
	},function(){
		$(this).find(".listen").removeClass("listen-hover")
	});
	
	$(".sidebar span").hover(function(){
		var tmp = $(this).index()
		$(this).parents(".sidebar").find("span").removeClass("active").eq(tmp).addClass("active");
		$(".honour-box .time-box").hide().eq(tmp).show();
	})
	
})

function cueWin(o) {
	var obj = document.getElementById("pop-box")
	obj.style.display=""
	obj.style.position="absolute"
	obj.style.zIndex = "1000"
	var h = document.documentElement.scrollTop
	obj.style.left=(document.documentElement.clientWidth-755)/2+"px"
	obj.style.top=(document.documentElement.clientHeight-510)/2+h+"px"
}

function cueWin1(o) {
	var obj = document.getElementById("video-pop-box")
	obj.style.display=""
	obj.style.position="absolute"
	obj.style.zIndex = "1000"
	var h = document.documentElement.scrollTop
	obj.style.left=(document.documentElement.clientWidth-1000)/2+"px"
	obj.style.top=(document.documentElement.clientHeight-760)/2+h+"px"
	var obj1 = document.createElement("div")
}

function cueWin2(o) {
	var obj = document.getElementById("pic-pop-box")
	obj.style.display=""
	obj.style.position="absolute"
	obj.style.zIndex = "1000"
	var h = document.documentElement.scrollTop
	obj.style.left=(document.documentElement.clientWidth-1000)/2+"px"
	obj.style.top=(document.documentElement.clientHeight-760)/2+h+"px"
	var obj1 = document.createElement("div")
}