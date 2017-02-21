function Lottery(t,e,i,s,a,h){this.conId=t,this.conNode=document.getElementById(this.conId),this.cover=e,this.coverType=i,this.background=null,this.backCtx=null,this.mask=null,this.maskCtx=null,this.lottery=null,this.lotteryType="image",this.width=s||300,this.height=a||100,this.clientRect=null,this.drawPercentCallback=h,this.deltaTop=200*window.win_width/320,this.deltaLeft=(window.win_width-254)/2}Lottery.prototype={createElement:function(t,e){var i=document.createElement(t);for(var s in e)i.setAttribute(s,e[s]);return i},getTransparentPercent:function(t,e,i){for(var s=t.getImageData(0,0,e,i),a=s.data,h=[],n=0,o=a.length;o>n;n+=4){var r=a[n+3];128>r&&h.push(n)}return(100*(h.length/(a.length/4))).toFixed(2)},resizeCanvas:function(t,e,i){t.width=e,t.height=i,t.getContext("2d").clearRect(0,0,e,i)},resizeCanvas_w:function(t,e,i){t.width=e,t.height=i,t.getContext("2d").clearRect(0,0,e,i),this.vail?this.drawLottery():this.drawMask()},drawPoint:function(t,e){t-=this.deltaLeft,e-=this.deltaTop,$(".lottery-prize div").show(),this.maskCtx.beginPath(),this.maskCtx.arc(t,e,30,0,2*Math.PI),this.maskCtx.fill(),this.maskCtx.beginPath(),this.maskCtx.lineWidth=60,this.maskCtx.lineCap=this.maskCtx.lineJoin="round",this.lastPosition&&this.maskCtx.moveTo(this.lastPosition[0],this.lastPosition[1]),this.maskCtx.lineTo(t,e),this.maskCtx.stroke(),this.lastPosition=[t,e],this.mask.style.zIndex=20==this.mask.style.zIndex?21:20},bindEvent:function(){var t=this,e=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),i=e?"touchstart":"mousedown",s=e?"touchmove":"mousemove";if(e)t.conNode.addEventListener("touchmove",function(t){a&&t.preventDefault(),t.cancelable?t.preventDefault():window.event.returnValue=!1},!1),t.conNode.addEventListener("touchend",function(){a=!1;var e=t.getTransparentPercent(t.maskCtx,t.width,t.height);e>=10&&"function"==typeof t.drawPercentCallback&&t.drawPercentCallback()},!1);else{var a=!1;t.conNode.addEventListener("mouseup",function(e){e.preventDefault(),a=!1;var i=t.getTransparentPercent(t.maskCtx,t.width,t.height);i>=10&&"function"==typeof t.drawPercentCallback&&t.drawPercentCallback()},!1)}this.mask.addEventListener(i,function(i){i.preventDefault(),a=!0;var s=e?i.touches[0].pageX:i.pageX||i.x,h=e?i.touches[0].pageY:i.pageY||i.y;t.drawPoint(s,h,a)},!1),this.mask.addEventListener(s,function(i){if(i.preventDefault(),!a)return!1;i.preventDefault();var s=e?i.touches[0].pageX:i.pageX||i.x,h=e?i.touches[0].pageY:i.pageY||i.y;t.drawPoint(s,h,a)},!1)},drawLottery:function(){if("image"==this.lotteryType){var t=new Image,e=this;t.onload=function(){this.width=e.width,this.height=e.height,e.resizeCanvas(e.background,e.width,e.height),e.backCtx.drawImage(this,0,0,e.width,e.height),e.drawMask()},t.src=this.lottery}else if("text"==this.lotteryType){this.width=this.width,this.height=this.height,this.resizeCanvas(this.background,this.width,this.height),this.backCtx.save(),this.backCtx.fillStyle="#FFF",this.backCtx.fillRect(0,0,this.width,this.height),this.backCtx.restore(),this.backCtx.save();var i=30;this.backCtx.font="Bold "+i+"px Arial",this.backCtx.textAlign="center",this.backCtx.fillStyle="#F60",this.backCtx.fillText(this.lottery,this.width/2,this.height/2+i/2),this.backCtx.restore(),this.drawMask()}},drawMask:function(){if("color"==this.coverType)this.maskCtx.fillStyle=this.cover,this.maskCtx.fillRect(0,0,this.width,this.height),this.maskCtx.globalCompositeOperation="destination-out";else if("image"==this.coverType){var t=new Image,e=this;t.onload=function(){e.resizeCanvas(e.mask,e.width,e.height),/android/i.test(navigator.userAgent.toLowerCase()),e.maskCtx.globalAlpha=.98,e.maskCtx.drawImage(this,0,0,this.width,this.height,0,0,e.width,e.height);var t=50,i=$("#ca-tips").length?$("#ca-tips").val():"",s=e.maskCtx.createLinearGradient(0,0,e.width,0);s.addColorStop("0","#fff"),s.addColorStop("1.0","#000"),e.maskCtx.font="Bold "+t+"px Arial",e.maskCtx.textAlign="left",e.maskCtx.fillStyle=s,e.maskCtx.fillText(i,e.width/2-e.maskCtx.measureText(i).width/2,100),e.maskCtx.globalAlpha=1,e.maskCtx.globalCompositeOperation="destination-out"},t.src=this.cover}},init:function(t,e){t&&(this.lottery=t,this.lottery.width=this.width,this.lottery.height=this.height,this.lotteryType=e||"image",this.vail=!0),this.vail&&(this.background=this.background||this.createElement("canvas",{style:"position:absolute;left:0;top:0;width:100%;height:100%;background-color:transparent;"})),this.mask=this.mask||this.createElement("canvas",{style:"position:absolute;left:0;top:0;width:100%;height:100%;background-color:transparent;"}),this.mask.style.zIndex=20,this.conNode.innerHTML.replace(/[\w\W]| /g,"")||(this.vail&&this.conNode.appendChild(this.background),this.conNode.appendChild(this.mask),this.bindEvent()),this.vail&&(this.backCtx=this.backCtx||this.background.getContext("2d")),this.maskCtx=this.maskCtx||this.mask.getContext("2d"),this.vail?this.drawLottery():this.drawMask();var i=this;window.addEventListener("resize",function(){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight,i.resizeCanvas_w(i.mask,i.width,i.height)},!1)}};