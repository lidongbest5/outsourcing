!function(){"use strict";var e=1,n,t=0,i=0,o=0,a=[$(".page2-con").height()-$(window).height(),$(".page3-con").height()-$(window).height(),$(".page4-con").height()-$(window).height(),$(".page5-con").height()-$(window).height(),$(".page6-con").height()-$(window).height(),$(".page7-con").height()-$(window).height()],c,h,g=$(".tap-btn"),d=$(".music"),p=function(){r(),x(),$(".loading").fadeOut(),c=u(),c===!0?(h=new Audio,h.src="css/music.mp3",h.loop=!0,h.autoplay=!0,$("#mp3").remove()):($("body").append('<audio src="css/music.mp3" id="mp3" autoplay loop></audio>'),h=document.getElementById("mp3")),h.play()},r=function(){n=new Swiper(".swiper-container",{direction:"vertical",loop:!0,onSlideChangeEnd:function(e,n){e.unlockSwipeToNext(),e.unlockSwipeToPrev(),(2===e.activeIndex||3===e.activeIndex||4===e.activeIndex||5===e.activeIndex||6===e.activeIndex||7===e.activeIndex)&&(e.lockSwipeToNext(),e.lockSwipeToPrev(),t=0,i=0,o=0,a=[$(".page2-con").height()-$(window).height(),$(".page3-con").height()-$(window).height(),$(".page4-con").height()-$(window).height(),$(".page5-con").height()-$(window).height(),$(".page6-con").height()-$(window).height(),$(".page7-con").height()-$(window).height()],$(".page"+e.activeIndex+"-con").css({"-webkit-transform":"translate3d(0,0,0)"}),$(".page"+e.activeIndex).on("touchstart",w),$(".page"+e.activeIndex).on("touchmove",f),$(".page"+e.activeIndex).on("touchend",l))}})},u=function(){for(var e=navigator.userAgent,n=new Array("iPhone","iPad"),t=!1,i=0;i<n.length;i++)if(e.indexOf(n[i])>0){t=!0;break}return t},s=function(){d.hasClass("play")?(d.removeClass("play"),h.pause()):(d.addClass("play"),h.play())},v=function(){n.slideNext()},w=function(e){e=e.originalEvent||e;var n=e.touches[0];return i=n.pageY,!1},f=function(e){e=e.originalEvent||e,e.preventDefault();var c=$(this),h=e.touches[0];return t=h.pageY-i,t>0&&o+t>20?($(".page"+n.activeIndex).off("touchstart",w),$(".page"+n.activeIndex).off("touchmove",f),$(".page"+n.activeIndex).off("touchend",l),n.slidePrev(),!1):0>t&&o+t<-a[n.activeIndex-2]-50?($(".page"+n.activeIndex).off("touchstart",w),$(".page"+n.activeIndex).off("touchmove",f),$(".page"+n.activeIndex).off("touchend",l),n.slideNext(),!1):($(".page"+n.activeIndex+"-con").css("-webkit-transform","translate3d(0,"+(o+t)+"px,0)"),!1)},l=function(e){return o+=t,!1},x=function(){d.on("touchend",s)};$(p)}();