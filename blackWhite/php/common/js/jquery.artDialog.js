/*!
* artDialog 5.0.4
* Date: 2013-07-31
* https://github.com/aui/artDialog
* (c) 2009-2013 TangBin, http://www.planeArt.cn
*
* This is licensed under the GNU LGPL, version 2.1 or later.
* For details, see: http://creativecommons.org/licenses/LGPL/2.1/
*/!function(a,b,c){function n(a){var b=m.focus;b&&b._isLock&&!b.dom.wrap[0].contains(a.target)&&(a.stopPropagation(),b.dom.outer[0].focus())}if("BackCompat"===document.compatMode)throw new Error("artDialog: Document types require more than xhtml1.0");var d,e=0,g=(a(document.getElementsByTagName("html")[0]),"artDialog"+ +new Date),h=b.VBArray&&!b.XMLHttpRequest,i="createTouch"in document&&!("onmousemove"in document)||/(iPhone|iPad|iPod)/i.test(navigator.userAgent),j=!h&&!i,k=function(){try{return document.activeElement}catch(a){}},l=k(),m=function(a,b,f){a=a||{},("string"==typeof a||1===a.nodeType)&&(a={content:a,fixed:!i});var h,k=m.defaults,l=a.follow=1===this.nodeType&&this||a.follow;for(var n in k)a[n]===c&&(a[n]=k[n]);return a.id=l&&l[g+"follow"]||a.id||g+e,(h=m.list[a.id])?(l&&h.follow(l),h.zIndex().focus(),h):(j||(a.fixed=!1),a.button&&a.button.push||(a.button=[]),b!==c&&(a.ok=b),a.ok&&a.button.push({id:"ok",value:a.okValue,callback:a.ok,focus:!0}),f!==c&&(a.cancel=f),a.cancel&&a.button.push({id:"cancel",value:a.cancelValue,callback:a.cancel}),m.defaults.zIndex=a.zIndex,e++,m.list[a.id]=d?d._create(a):new m.fn._create(a))};m.version="5.0.4",m.fn=m.prototype={_create:function(a){var b;return this.closed=!1,this.config=a,this.dom=b=this.dom||this._innerHTML(a),a.skin&&b.wrap.addClass(a.skin),b.wrap.css("position",a.fixed?"fixed":"absolute"),b.close[a.cancel===!1?"hide":"show"](),b.content.css("padding",a.padding),this.button.apply(this,a.button),this.title(a.title).content(a.content).size(a.width,a.height).time(a.time),this._reset(),this.zIndex(),a.lock&&this.lock(),this._addEvent(),this[a.visible?"visible":"hidden"]().focus(),d=null,a.initialize&&a.initialize.call(this),this},content:function(b){var c,d,e,f,g=this,h=this.dom.content,i=h[0];return this._elemBack&&(this._elemBack(),delete this._elemBack),"string"==typeof b?h.html(b):b&&1===b.nodeType&&(f=b.style.display,c=b.previousSibling,d=b.nextSibling,e=b.parentNode,this._elemBack=function(){c&&c.parentNode?c.parentNode.insertBefore(b,c.nextSibling):d&&d.parentNode?d.parentNode.insertBefore(b,d):e&&e.appendChild(b),b.style.display=f,g._elemBack=null},h.html(""),i.appendChild(b),a(b).show()),this._reset(),this},title:function(a){var b=this.dom,c=b.outer,d=b.title,e="d-state-noTitle";return a===!1?(d.hide().html(""),c.addClass(e)):(d.show().html(a),c.removeClass(e)),this},position:function(){var a=this.dom,b=a.wrap[0],c=a.window,d=a.document,e=this.config.fixed,f=e?0:d.scrollLeft(),h=e?0:d.scrollTop(),i=c.width(),j=c.height(),k=b.offsetWidth,l=b.offsetHeight,m=(i-k)/2+f,n=382*(j-l)/1e3+h,o=b.style;return o.left=Math.max(parseInt(m),f)+"px",o.top=Math.max(parseInt(n),h)+"px",this._follow&&(this._follow.removeAttribute(g+"follow"),this._follow=null),this},size:function(a,b){var c=this.dom.main[0].style;return"number"==typeof a&&(a+="px"),"number"==typeof b&&(b+="px"),c.width=a,c.height=b,this},follow:function(b){var c=a(b),d=this.config;if(!b||!b.offsetWidth&&!b.offsetHeight)return this.position(this._left,this._top);var e=d.fixed,f=g+"follow",h=this.dom,i=h.window,j=h.document,k=i.width(),l=i.height(),m=j.scrollLeft(),n=j.scrollTop(),o=c.offset(),p=b.offsetWidth,q=b.offsetHeight,r=e?o.left-m:o.left,s=e?o.top-n:o.top,t=this.dom.wrap[0],u=t.style,v=t.offsetWidth,w=t.offsetHeight,x=r-(v-p)/2,y=s+q,z=e?0:m,A=e?0:n;return x=z>x?r:x+v>k&&r-v>z?r-v+p:x,y=y+w>l+A&&s-w>A?s-w:y,u.left=parseInt(x)+"px",u.top=parseInt(y)+"px",this._follow&&this._follow.removeAttribute(f),this._follow=b,b[f]=d.id,this},button:function(){for(var j,k,l,m,n,b=this.dom,c=b.buttons,d=c[0],e="d-state-highlight",f=this._listeners=this._listeners||{},h=[].slice.call(arguments),i=0;i<h.length;i++)j=h[i],k=j.value,l=j.id||k,m=!f[l],n=m?document.createElement("input"):f[l].elem,n.type="button",n.className="d-button",f[l]||(f[l]={}),k&&(n.value=k),j.width&&(n.style.width=j.width),j.callback&&(f[l].callback=j.callback),j.focus&&(this._focus&&this._focus.removeClass(e),this._focus=a(n).addClass(e),this.focus()),n[g+"callback"]=l,n.disabled=!!j.disabled,m&&(f[l].elem=n,d.appendChild(n));return c[0].style.display=h.length?"":"none",this},visible:function(){return this.dom.wrap.css("visibility","visible"),this.dom.outer.addClass("d-state-visible"),this._isLock&&this._lockMask.show(),this},hidden:function(){return this.dom.wrap.css("visibility","hidden"),this.dom.outer.removeClass("d-state-visible"),this._isLock&&this._lockMask.hide(),this},close:function(){if(this.closed)return this;var a=this.dom,b=a.wrap,c=m.list,e=this.config.beforeunload;if(e&&e.call(this)===!1)return this;if(m.focus===this&&(m.focus=null),this._follow&&this._follow.removeAttribute(g+"follow"),this._elemBack&&this._elemBack(),this.time(),this.unlock(),this._removeEvent(),delete c[this.config.id],d)b.remove();else{d=this,a.title.html(""),a.content.html(""),a.buttons.html(""),b[0].className=b[0].style.cssText="",a.outer[0].className="d-outer",b.css({left:0,top:0,position:j?"fixed":"absolute"});for(var f in this)this.hasOwnProperty(f)&&"dom"!==f&&delete this[f];this.hidden()}return l&&l.focus(),this.closed=!0,this},time:function(a){var b=this,c=this._timer;return c&&clearTimeout(c),a&&(this._timer=setTimeout(function(){b._click("cancel")},a)),this},focus:function(){var a=this,b=function(){var b=k();return b&&a.dom.wrap[0].contains(b)};return b()||(l=k()),setTimeout(function(){if(!b())try{var c=a._focus||a.dom.close||taht.dom.wrap;c[0].focus()}catch(d){}},16),this},zIndex:function(){var a=this.dom,b=m.focus,c=m.defaults.zIndex++;return a.wrap.css("zIndex",c),this._lockMask&&this._lockMask.css("zIndex",c-1),b&&b.dom.outer.removeClass("d-state-focus"),m.focus=this,a.outer.addClass("d-state-focus"),this},lock:function(){if(this._isLock)return this;var c=this,e=(this.config,this.dom),f=document.createElement("div"),g=a(f),h=m.defaults.zIndex-1;return this.zIndex(),e.outer.addClass("d-state-lock"),g.css({zIndex:h,position:"fixed",left:0,top:0,width:"100%",height:"100%",overflow:"hidden"}).addClass("d-mask"),j||g.css({position:"absolute",width:a(b).width()+"px",height:a(document).height()+"px"}),g.bind("dblclick",function(){c._click("cancel")}),document.body.appendChild(f),this._lockMask=g,this._isLock=!0,this},unlock:function(){return this._isLock?(this._lockMask.unbind(),this._lockMask.hide(),this._lockMask.remove(),this.dom.outer.removeClass("d-state-lock"),this._isLock=!1,this):this},_innerHTML:function(c){var d=document.body;if(!d)throw new Error('artDialog: "documents.body" not ready');var e=document.createElement("div");e.style.cssText="position:absolute;left:0;top:0",e.innerHTML=m._templates.replace(/{([^}]+)}/g,function(a,b){var d=c[b];return"string"==typeof d?d:""}),d.insertBefore(e,d.firstChild);for(var f,g=0,h={},i=e.getElementsByTagName("*"),j=i.length;j>g;g++)f=i[g].className.split("d-")[1],f&&(h[f]=a(i[g]));return h.window=a(b),h.document=a(document),h.wrap=a(e),h},_click:function(a){var b=this._listeners[a]&&this._listeners[a].callback;return"function"!=typeof b||b.call(this)!==!1?this.close():this},_reset:function(){var a=this.config.follow||this._follow;a?this.follow(a):this.position()},_addEvent:function(){var a=this,b=this.dom;b.wrap.bind("click",function(c){var e,d=c.target;return d.disabled?!1:d===b.close[0]?(a._click("cancel"),!1):(e=d[g+"callback"],e&&a._click(e),void 0)}).bind("mousedown",function(){a.zIndex()})},_removeEvent:function(){this.dom.wrap.unbind()}},m.fn._create.prototype=m.fn,a.fn.dialog=a.fn.artDialog=function(){var a=arguments;return this[this.live?"live":"bind"]("click",function(){return m.apply(this,a),!1}),this},m.focus=null,m.get=function(a){return a===c?m.list:m.list[a]},m.list={},a(document).bind("keydown",function(a){var b=a.target,c=b.nodeName,d=/^input|textarea$/i,e=m.focus,f=a.keyCode;!e||d.test(c)&&"button"!==b.type||27===f&&e._click("cancel")}),a.fn.live?a("body").live("focus",n):document.addEventListener?document.addEventListener("focus",n,!0):a(document).bind("focusin",n),a(b).bind("resize",function(){var a=m.list;for(var b in a)a[b]._reset()}),m._templates='<div class="d-outer" role="dialog" tabindex="-1" aria-labelledby="d-title-{id}" aria-describedby="d-content-{id}"><table class="d-border"><tbody><tr><td class="d-nw"></td><td class="d-n"></td><td class="d-ne"></td></tr><tr><td class="d-w"></td><td class="d-c"><div class="d-inner"><table class="d-dialog"><tbody><tr><td class="d-header"><div class="d-titleBar"><div id="d-title-{id}" class="d-title"></div><a class="d-close" href="javascript:;" title="{cancelValue}">\xd7</a></div></td></tr><tr><td class="d-main"><div id="d-content-{id}" class="d-content"></div></td></tr><tr><td class="d-footer"><div class="d-buttons"></div></td></tr></tbody></table></div></td><td class="d-e"></td></tr><tr><td class="d-sw"></td><td class="d-s"></td><td class="d-se"></td></tr></tbody></table></div>',m.defaults={content:'<div class="d-loading"><span>loading..</span></div>',title:"message",button:null,ok:null,cancel:null,initialize:null,beforeunload:null,okValue:"ok",cancelValue:"cancel",width:"auto",height:"auto",padding:"20px 25px",skin:null,time:null,visible:!0,follow:null,lock:!1,fixed:!1,zIndex:1987},this.artDialog=a.dialog=a.artDialog=m}(this.art||this.jQuery,this);