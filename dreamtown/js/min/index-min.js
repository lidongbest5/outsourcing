!function(){var n=$(".page0"),t=0,e=function(){a(),c(),o()},i=function(){$(".loading").hide(),setTimeout(function(){$(".page0").addClass("animated")},0)},a=function(){$(".dragend-container").dragend({direction:"vertical",stopPropagation:!0,onDragEnd:function(n,e,i,a){t!=i&&$(".page"+i).addClass("animated").siblings().removeClass("animated"),t=i}})},o=function(n,t){wx.ready(function(){wx.onMenuShareTimeline({title:"梦想小镇创业集中营",link:"http://wyyun.com/dreamtown/",imgUrl:"http://wyyun.com/dreamtown/images/share.png",success:function(){},cancel:function(){}}),wx.onMenuShareAppMessage({title:"梦想小镇创业集中营",desc:"梦想小镇，希望这里成为天下有创业梦想的年轻人起步的摇篮，让梦想变成财富，让梦想成真。",link:"http://wyyun.com/dreamtown/",imgUrl:"http://wyyun.com/dreamtown/images/share.png",type:"",dataUrl:"",success:function(){},cancel:function(){}})})},c=function(){setTimeout(function(){i()},1e3),window.onorientationchange=function(){0!=window.orientation&&alert("请在竖屏状态下浏览")}};$(e)}();