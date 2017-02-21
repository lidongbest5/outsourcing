!function(t){"use strict";function i($){function t(){}function i(){return!1}function n(t,i){var e,s;for(e in i)if(i.hasOwnProperty(e)){switch(s=i[e],e){case"height":case"width":case"marginLeft":case"marginTop":s+="px"}t.style[e]=s}return t}function o(t,i){var e;for(e in i)t[e]=i[e];return t}function r(t,i){return function(){return t.apply(i,Array.prototype.slice.call(arguments))}}function a(t,i){var e;return e=$?$(i).find("."+t):Array.prototype.slice.call(i.getElementsByClassName(t))}function h(t,i,e,s,o){var r={};r[i]=e,$?$(t).animate(r,s,o):n(t,r)}function c(t){var i=t.touches,e=i&&i.length?i:t.changedTouches;return{x:u?e[0].pageX:t.pageX,y:u?e[0].pageY:t.pageY}}function l(t,i){var s=o({},p);this.settings=o(s,i),this.container=t,this.pageContainer=e.createElement("div"),this.scrollBorder={x:0,y:0},this.page=0,this.preventScroll=!1,this.pageCssProperties={margin:0},this._onStart=r(this._onStart,this),this._onMove=r(this._onMove,this),this._onEnd=r(this._onEnd,this),this._onKeydown=r(this._onKeydown,this),this._sizePages=r(this._sizePages,this),this._afterScrollTransform=r(this._afterScrollTransform,this),this.pageContainer.innerHTML=t.cloneNode(!0).innerHTML,t.innerHTML="",t.appendChild(this.pageContainer),this._scroll=P?this._scrollWithTransform:this._scrollWithoutTransform,this._animateScroll=P?this._animateScrollWithTransform:this._animateScrollWithoutTransform,n(t,w),setTimeout(r(function(){this.updateInstance(i),this.settings.preventDrag||this._observe(),this.settings.afterInitialize.call(this)},this),10)}function g(t,i,e){$?$(t).on(i,e):t.addEventListener(i,e,!1)}function d(t,i,e){$?$(t).off(i,e):t.removeEventListener(i,e,!1)}var p={pageClass:"dragend-page",direction:"horizontal",minDragDistance:"40",onSwipeStart:t,onSwipeEnd:t,onDragStart:t,onDrag:t,onDragEnd:t,afterInitialize:t,keyboardNavigation:!1,stopPropagation:!1,itemsInPage:1,scribe:0,borderBetweenPages:0,duration:300,preventDrag:!1},u="ontouchstart"in s,f=u?"touchstart":"mousedown",m=u?"touchmove":"mousemove",v=u?"touchend":"mouseup",_={37:"left",38:"up",39:"right",40:"down"},y={pages:"No pages found"},w={overflow:"hidden",padding:0},b=function(){var t=e.createElement("div"),i="Khtml Ms O Moz Webkit".split(" "),s=i.length;return function(e){if(e in t.style)return!0;for(e=e.replace(/^[a-z]/,function(t){return t.toUpperCase()});s--;)if(i[s]+e in t.style)return!0;return!1}}(),P=b("transform");return o(l.prototype,{_checkOverscroll:function(t,i,e){var s={x:i,y:e,overscroll:!0};switch(t){case"right":if(!this.scrollBorder.x)return s.x=Math.round((i-this.scrollBorder.x)/5),s;break;case"left":if((this.pagesCount-1)*this.pageDimentions.width<=this.scrollBorder.x)return s.x=Math.round(-((Math.ceil(this.pagesCount)-1)*(this.pageDimentions.width+this.settings.borderBetweenPages))+i/5),s;break;case"down":if(!this.scrollBorder.y)return s.y=Math.round((e-this.scrollBorder.y)/5),s;break;case"up":if((this.pagesCount-1)*this.pageDimentions.height<=this.scrollBorder.y)return s.y=Math.round(-((Math.ceil(this.pagesCount)-1)*(this.pageDimentions.height+this.settings.borderBetweenPages))+e/5),s}return{x:i-this.scrollBorder.x,y:e-this.scrollBorder.y,overscroll:!1}},_observe:function(){g(this.container,f,this._onStart),this.container.onselectstart=i,this.container.ondragstart=i,this.settings.keyboardNavigation&&g(e.body,"keydown",this._onKeydown),g(s,"resize",this._sizePages)},_onStart:function(t){t=t.originalEvent||t,this.settings.stopPropagation&&t.stopPropagation(),g(e.body,m,this._onMove),g(e.body,v,this._onEnd),this.startCoords=c(t),this.settings.onDragStart.call(this,t)},_onMove:function(t){if(t=t.originalEvent||t,!(t.touches&&t.touches.length>1||t.scale&&1!==t.scale)){t.preventDefault(),this.settings.stopPropagation&&t.stopPropagation();var i=this._parseEvent(t),e=this._checkOverscroll(i.direction,-i.distanceX,-i.distanceY);this.settings.onDrag.call(this,this.activeElement,i,e.overscroll,t),this.preventScroll||this._scroll(e)}},_onEnd:function(t){t=t.originalEvent||t,this.settings.stopPropagation&&t.stopPropagation();var i=this._parseEvent(t);this.startCoords={x:0,y:0},Math.abs(i.distanceX)>this.settings.minDragDistance||Math.abs(i.distanceY)>this.settings.minDragDistance?this.swipe(i.direction):(i.distanceX>0||i.distanceX>0)&&this._scrollToPage(),this.settings.onDragEnd.call(this,this.container,this.activeElement,this.page,t),d(e.body,m,this._onMove),d(e.body,v,this._onEnd)},_parseEvent:function(t){var i=c(t),e=this.startCoords.x-i.x,s=this.startCoords.y-i.y;return this._addDistanceValues(e,s)},_addDistanceValues:function(t,i){var e={distanceX:0,distanceY:0};return"horizontal"===this.settings.direction?(e.distanceX=t,e.direction=t>0?"left":"right"):(e.distanceY=i,e.direction=i>0?"up":"down"),e},_onKeydown:function(t){var i=_[t.keyCode];i&&this._scrollToPage(i)},_setHorizontalContainerCssValues:function(){o(this.pageCssProperties,{cssFloat:"left",overflowY:"auto",overflowX:"hidden",padding:0,display:"block"}),n(this.pageContainer,{overflow:"hidden",width:(this.pageDimentions.width+this.settings.borderBetweenPages)*this.pagesCount,boxSizing:"content-box","-webkit-backface-visibility":"hidden","-webkit-perspective":1e3,margin:0,padding:0})},_setVerticalContainerCssValues:function(){o(this.pageCssProperties,{overflow:"hidden",padding:0,display:"block"}),n(this.pageContainer,{"padding-bottom":this.settings.scribe,boxSizing:"content-box","-webkit-backface-visibility":"hidden","-webkit-perspective":1e3,margin:0})},setContainerCssValues:function(){"horizontal"===this.settings.direction?this._setHorizontalContainerCssValues():this._setVerticalContainerCssValues()},_setPageDimentions:function(){var t=this.container.offsetWidth,i=this.container.offsetHeight;"horizontal"===this.settings.direction?t-=parseInt(this.settings.scribe,10):i-=parseInt(this.settings.scribe,10),this.pageDimentions={width:t,height:i}},_sizePages:function(){var t=this.pages.length;this._setPageDimentions(),this.setContainerCssValues(),"horizontal"===this.settings.direction?o(this.pageCssProperties,{height:this.pageDimentions.height,width:this.pageDimentions.width/this.settings.itemsInPage}):o(this.pageCssProperties,{height:this.pageDimentions.height/this.settings.itemsInPage,width:this.pageDimentions.width});for(var i=0;t>i;i++)n(this.pages[i],this.pageCssProperties);this._jumpToPage("page",this.page)},_calcNewPage:function(t,i){var e=this.settings.borderBetweenPages,s=this.pageDimentions.height,n=this.pageDimentions.width,o=this.page;switch(t){case"up":o<this.pagesCount-1&&(this.scrollBorder.y=this.scrollBorder.y+s+e,this.page++);break;case"down":o>0&&(this.scrollBorder.y=this.scrollBorder.y-s-e,this.page--);break;case"left":o<this.pagesCount-1&&(this.scrollBorder.x=this.scrollBorder.x+n+e,this.page++);break;case"right":o>0&&(this.scrollBorder.x=this.scrollBorder.x-n-e,this.page--);break;case"page":switch(this.settings.direction){case"horizontal":this.scrollBorder.x=(n+e)*i;break;case"vertical":this.scrollBorder.y=(s+e)*i}this.page=i;break;default:this.scrollBorder.y=0,this.scrollBorder.x=0,this.page=0}},_onSwipeEnd:function(){this.preventScroll=!1,this.activeElement=this.pages[this.page*this.settings.itemsInPage],this.settings.onSwipeEnd.call(this,this.container,this.activeElement,this.page)},_jumpToPage:function(t,i){t&&this._calcNewPage(t,i),this._scroll({x:-this.scrollBorder.x,y:-this.scrollBorder.y})},_scrollToPage:function(t,i){this.preventScroll=!0,t&&this._calcNewPage(t,i),this._animateScroll()},_scrollWithTransform:function(t){var i="horizontal"===this.settings.direction?"translateX("+t.x+"px)":"translateY("+t.y+"px)";n(this.pageContainer,{"-webkit-transform":i,"-moz-transform":i,"-ms-transform":i,"-o-transform":i,transform:i})},_animateScrollWithTransform:function(){var t="transform "+this.settings.duration+"ms ease-out",i=this.container,e=this._afterScrollTransform;n(this.pageContainer,{"-webkit-transition":"-webkit-"+t,"-moz-transition":"-moz-"+t,"-ms-transition":"-ms-"+t,"-o-transition":"-o-"+t,transition:t}),this._scroll({x:-this.scrollBorder.x,y:-this.scrollBorder.y}),g(this.container,"webkitTransitionEnd",e),g(this.container,"oTransitionEnd",e),g(this.container,"transitionend",e),g(this.container,"transitionEnd",e)},_afterScrollTransform:function(){var t=this.container,i=this._afterScrollTransform;this._onSwipeEnd(),d(t,"webkitTransitionEnd",i),d(t,"oTransitionEnd",i),d(t,"transitionend",i),d(t,"transitionEnd",i),n(this.pageContainer,{"-webkit-transition":"","-moz-transition":"","-ms-transition":"","-o-transition":"",transition:""})},_scrollWithoutTransform:function(t){var i="horizontal"===this.settings.direction?{marginLeft:t.x}:{marginTop:t.y};n(this.pageContainer,i)},_animateScrollWithoutTransform:function(){var t="horizontal"===this.settings.direction?"marginLeft":"marginTop",i="horizontal"===this.settings.direction?-this.scrollBorder.x:-this.scrollBorder.y;h(this.pageContainer,t,i,this.settings.duration,r(this._onSwipeEnd,this))},swipe:function(t){this.settings.onSwipeStart.call(this,this.container,this.activeElement,this.page),this._scrollToPage(t)},updateInstance:function(t){if(t=t||{},"object"==typeof t&&o(this.settings,t),this.pages=a(this.settings.pageClass,this.pageContainer),!this.pages.length)throw new Error(y.pages);this.pagesCount=this.pages.length/this.settings.itemsInPage,this.activeElement=this.pages[this.page*this.settings.itemsInPage],this._sizePages(),this.settings.jumpToPage&&(this.jumpToPage(t.jumpToPage),delete this.settings.jumpToPage),this.settings.scrollToPage&&(this.scrollToPage(this.settings.scrollToPage),delete this.settings.scrollToPage),this.settings.destroy&&(this.destroy(),delete this.settings.destroy)},destroy:function(){var t=this.container;d(t,f),d(t,m),d(t,v),d(e.body,"keydown",this._onKeydown),d(s,"resize",this._sizePages),t.removeAttribute("style");for(var i=0;i<this.pages.length;i++)this.pages[i].removeAttribute("style");t.innerHTML=this.pageContainer.innerHTML},scrollToPage:function(t){this._scrollToPage("page",t-1)},jumpToPage:function(t){this._jumpToPage("page",t-1)}}),$&&($.fn.dragend=function(t){return t=t||{},this.each(function(){var i=$(this).data("dragend");i?i.updateInstance(t):(i=new l(this,t),$(this).data("dragend",i)),"string"==typeof t&&i.swipe(t)}),this}),l}var e=document,s=t;"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return i(s.jQuery||s.Zepto)}):s.Dragend=i(s.jQuery||s.Zepto)}(window);