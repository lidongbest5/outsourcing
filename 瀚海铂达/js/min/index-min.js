!function(){var e=$("nav"),i=e.find("ul li"),n=$(".slide-left"),t=$(".slide-right"),l=$(".slide-dot a"),o=$(".slide-con > div"),s=$(".detail-left"),d=$(".detail-right"),a=1006,c=1,r=l.length,u=function(){s.length&&s.height(d.height()),C()},f=function(){var e=$(this).find(".dropdown");e.length&&TweenQuick.slideHorizontally(e,!1)},h=function(){var e=$(this).find(".dropdown");e.length&&TweenQuick.slideHorizontally(e,!0)},g=function(){c--,1>c&&(c=r),l.eq(c-1).addClass("cur").siblings().removeClass("cur"),TweenLite.to(o,.5,{left:-(c-1)*a})},v=function(){c++,c>r&&(c=1),l.eq(c-1).addClass("cur").siblings().removeClass("cur"),TweenLite.to(o,.5,{left:-(c-1)*a})},w=function(){var e=$(this);e.addClass("cur").siblings().removeClass("cur"),c=parseInt(e.attr("data-index")),TweenLite.to(o,.5,{left:-(c-1)*a})},C=function(){i.on("mouseenter",f),i.on("mouseleave",h),n.on("click",g),t.on("click",v),l.on("click",w)};$(u)}();