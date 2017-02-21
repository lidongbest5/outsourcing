/*
 * music player 
 * based on jPlayer, more doc on jPlayer.org
 * if browser support html5,then use jPlayer to create <audio>, else in IE 8-,create <object> based on windows media player, google for more wmp js api 
 * author dongli@sohu-inc.com
*/
(function($){
	//播放列表，title为歌曲名，url为歌曲mp3地址(ie)，ourl为歌曲ogg地址(firefox)
	var lists = [{"title":"1.致青春","url":"music/1.mp3","ourl":"music/1.ogg"},
				{"title":"2.我的歌声里","url":"music/2.mp3","ourl":"music/2.ogg"},
				{"title":"3.想你的夜","url":"music/3.mp3","ourl":"music/3.ogg"},
				{"title":"4.running away","url":"music/4.mp3","ourl":"music/4.ogg"},
				{"title":"5.亲爱的路人","url":"music/5.mp3","ourl":"music/5.ogg"}];

	var i = 0,	//当前播放曲目index
		isShuffle = 0,	//判断顺序还是随即播放
		isOn = 0,	//是否在播放
		songLen = lists.length,	//曲目列表长度
		mc = $(".music-box-real"),	//播放器对象
		tips = $(".gc p"),
		proBar = $(".jd-2"),	//播放器显示对象
		ie = !-[1,];	//判断ie

	var controller = {
		//初始化jPlayer播放器
		initialize : function(){
			mc.jPlayer({
				//jPlayer初始化设置
				ready : function(){
					$(this).jPlayer("setMedia", { oga: lists[0].ourl, 
						mp3 : lists[0].url});
					tips.html(lists[i].title);
				},
				//music file加载后
				progress : function(){
					tips.html(lists[i].title);
					if(isOn)
						$(this).jPlayer("play");
				},
				//监听当前播放时间改变
				timeupdate : function(e){
					var cpa = e.jPlayer.status.currentPercentAbsolute;
					proBar.css("width",cpa*3.36+12);
					if(cpa >= 100)
						controller.changeSong(1);
				},
				swfPath : "js",
				supplied : "oga, m4a, mp3",
				preload : "auto"
			});
		},
		//ie初始化
		initializeIE : function(){
			mc.html('<object id="player" height="64" width="260" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"><param NAME="AutoStart" VALUE="0"><param name="enabled" value="-1"><param NAME="url" value="music/1.mp3"><param name="currentPosition" value="0"></object>');
			tips.html(lists[i].title);
			setInterval(function(){
				a = player.controls.currentPosition || 0;
				b = player.currentMedia.duration || 0;
				if(a&&b)
					proBar.css("width",a*336/b+12);
				if(a/b == 0)
					$(".next").trigger("click");
			},250);
		},
		//开始播放
		startPlay : function(){
			if(!isOn){
				isOn = 1;
				$(".on").removeClass("off");
				if(ie){
					tips.html(lists[i].title);
					player.controls.play();
				}
				else
					mc.jPlayer("play");
			}
			else{
				isOn = 0;
				$(".on").addClass("off");
				if(ie)
					player.controls.pause();
				else
					mc.jPlayer("pause");
			}
		},
		//改变歌曲
		changeSong : function(y){
			tips.html("音频文件加载中...");
			isOn = 1;
			$(".on").removeClass("off");
			if(y){
				if(!isShuffle){
					i++;
					if(i > songLen - 1)
						i = 0;
				}
				else
					i = Math.floor(Math.random()*songLen);
			}
			else{
				if(!isShuffle){
					i--;
					if(i < 0)
						i = songLen - 1;
				}
				else
					i = Math.floor(Math.random()*songLen);
			}
			if(ie){
				player.URL = lists[i].url;
				player.controls.play();
				tips.html(lists[i].title);
			}
			else
				mc.jPlayer("setMedia", {oga: lists[i].ourl, mp3 : lists[i].url}).jPlayer("play");
		},
		//点击进度条
		clickProgress : function(e, self){
			if(ie)
				player.controls.currentPosition = (e.clientX-self.offset().left-12)*player.currentMedia.duration/336;
			else
				mc.jPlayer("playHead", (e.clientX-self.offset().left)*100/336);
			proBar.css("width",e.clientX-self.offset().left);
		},
		//点击音量条
		clickVolumn : function(e, self){
			var r = e.clientX-self.offset().left
			if(r > 22){
				if(ie)
					player.settings.volume = (r-22)*100/46;
				else
					mc.jPlayer("volume",(r-22)/46);
				$(".yl-btn").css("left",r+6);
			}
		},
		//关闭播放器
		closeMusic : function(){
			if(ie)
				player.controls.stop();
			else{
				mc.jPlayer("clearFile").jPlayer("stop");
			}
			$(".music-box").remove();
			$(".music-box-real").remove();
		}
	};

	var bindEvent = function(){
		$(".on").click(function(){
			controller.startPlay();
		});
		$(".prve").click(function(){
			controller.changeSong(0);
		});
		$(".next").click(function(){
			controller.changeSong(1);
		});
		$(".xh").click(function(){
			isShuffle = 0;
		});
		$(".sj").click(function(){
			isShuffle = 1;
		});
		$(".jd-box").click(function(event){
			controller.clickProgress(event, $(this));
		});
		$(".yl-tul").click(function(event){
			controller.clickVolumn(event, $(this));
		});
		$(".closes").click(function(){
			controller.closeMusic();
		});
	};

	ie ? controller.initializeIE() : controller.initialize();
	bindEvent();

})(jQuery)