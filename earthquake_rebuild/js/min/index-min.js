!function(){"use strict";var e=$("body"),t=$(".page1"),a=$(".page2"),o=$(".page3"),n=$(".page2-img1"),i=$(".page2-img2"),s=$(".page2-img3"),c=$(".page2-img"),u=$(".page2-container"),p=$(".close"),d=$(".share-btn"),m=$(".share"),g=$(".music"),h=$(".tips"),f=e.width(),r=e.height(),l=f/320,v=.875*f,w=410*v/280,C=(f-v)/2,_=(r-w)/2,j=0,y=0,T=0,b,O=!1,L=function(){x(),F(),N(),setTimeout(function(){$(".loading").hide()},500),P(),b=document.createElement("audio"),b.setAttribute("src","http://news.sohu.com/upload/code_v120150430/css/music.mp3"),b.load(),b.loop=!0,b.addEventListener("ended",function(){this.currentTime=0,this.play()},!1),I()},E=function(){g.hasClass("on")?(b.pause(),g.removeClass("on")):(b.play(),g.addClass("on"))},I=function(){O||(O=!0,b.play())},x=function(){var e=new Lottery("page1","http://news.sohu.com/upload/code_v120150430/images/index.jpg","image",f,r,A,0,0);e.init("http://news.sohu.com/upload/code_v120150430/images/index1.jpg","image")},N=function(){var e=new Lottery("page3","http://news.sohu.com/upload/code_v120150430/images/bottom.jpg","image",f,r,B,0,0);e.init("http://news.sohu.com/upload/code_v120150430/images/bottom1.jpg","image")},A=function(){t.addClass("animated").find(".page1-container").fadeOut(),setTimeout(function(){t.hide()},2e3)},k=function(){$("#map1").fadeOut(),$(".page2-container1").addClass("active"),$(".page2-img1").removeClass("active"),setTimeout(function(){$(".page2-container1").hide(),D()},2e3),j=1},q=function(){$("#map2").fadeOut(),$(".page2-container2").addClass("active"),$(".page2-img2").removeClass("active"),setTimeout(function(){$(".page2-container2").hide(),D()},2e3),y=1,n.fadeIn()},z=function(){$("#map3").fadeOut(),$(".page2-container3").addClass("active"),$(".page2-img3").removeClass("active"),setTimeout(function(){$(".page2-container3").hide(),D()},2e3),T=1,i.fadeIn()},B=function(){o.find(".page3-container").fadeOut()},D=function(){j&&y&&T&&(a.addClass("animated"),setTimeout(function(){a.hide(),h.html('<img src="images/tips1.png">').show()},1500))},F=function(){n.css({left:83*l,top:136*l}),i.css({left:160*l,top:244*l}),s.css({left:10*l,top:318*l}),u.css("top",_);var e=new Lottery("map1","http://news.sohu.com/upload/code_v120150430/images/Everest.jpg","image",v,w,k,C,_);e.init("http://news.sohu.com/upload/code_v120150430/images/Everest1.jpg","image");var t=new Lottery("map2","http://news.sohu.com/upload/code_v120150430/images/Tibet.jpg","image",v,w,q,C,_);t.init("http://news.sohu.com/upload/code_v120150430/images/Tibet1.jpg","image");var a=new Lottery("map3","http://news.sohu.com/upload/code_v120150430/images/Nepal.jpg","image",v,w,z,C,_);a.init("http://news.sohu.com/upload/code_v120150430/images/Nepal1.jpg","image")},G=function(){var e=$(this),t=e.attr("data-value");$(".page2-container"+t).fadeIn()},H=function(){$(this).closest(".page2-container").fadeOut()},J=function(){m.fadeIn()},K=function(){m.fadeOut()},M=function(){h.hide()},P=function(){c.on("touchend",G),p.on("touchend",H),d.on("touchend",J),m.on("touchend",K),$(document).on("touchstart",I),g.on("touchend",E),h.on("touchstart",M)};$(L)}();