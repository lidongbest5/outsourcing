/*
**	main js for sohu sports live room
**	author dongli
**	UTF-8
*/
;
(function($, win){
	var sid = 0,
		stream_id,
		topic_id,
		room_id = location.href.split("?")[1] ? parseInt(location.href.split("?")[1].match(/\d*/)) : 0,
		// room_id = 2187,
		inter_time = 5000,
		is_scroll = 1,
		data_type = 0,//0全部，1图片，2视频
		room_type = 0,//1篮球，2足球，3网球，4台球
		score_data = 0,
		live_status = 0,//1即将播出，2直播中，3直播结束
		current_request,
		remain_time = "",
		quarter_name = ["第一节","第二节","第三节","第四节","加时1","加时2","加时3","加时4"];

	var inter,
		inter_score,
		html,
		filter,
		tips = '暂无相关内容',
		tips1 = '暂无相关直播间';

	var api_prefix = 'http://zhibo.m.sohu.com';
	// var api_prefix = 'http://zhibo.m.sohuno.com';

	var main = $(".wrapper-main ul"),
		nav = $(".wrapper-nav"),
		wrapper_statistics = $(".wrapper-statistics"),
		script_temp = $("#script-temp"),
		video_temp = $("#video-temp"),
		loading = $(".wrapper-loading"),
		wrapper_tips = $(".wrapper-tips"),
		main_wrapper = $(".wrapper-main"),
		changyan = $("#SOHUcomment"),
		header = $(".header"),
		scroll_box = $(".scroll-box"),
		time_con = $(".sports-time"),
		sports_time = $(".sports-time-remain"),
		toggle_button = $(".toggle-button"),
		wrapper_r = $(".wrapper-r");

	var ct = {
		initialize : function(){
			var inner_height = win.innerHeight ? win.innerHeight : document.documentElement.offsetHeight,
				main_height = inner_height - 130;
			main_wrapper.height(main_height - 33);
			changyan.height(main_height - 13);
			$.ajax({
				url : api_prefix + '/api/pc/room/' + room_id + '/info/',
				type : 'GET',
				dataType : "jsonp",
		        jsonp : "jsonpcallback",
		        success : function(data){
		        	if(data){
		        		// console.log(data);
			        	stream_id = data.streamId;
			        	topic_id = data.topicId;
			        	room_type = data.type;
			        	switch(data.type){
			        		case 2 :
			        			header.attr("class","header header-style2");
			        			break;
			        		case 3 : 
			        			header.attr("class","header header-style3");
			        			break;
			        		default :
			        			header.attr("class","header header-style1");
			        			break;
			        	};
			        	if(room_type == 1 || room_type == 2)
			        		ct.setScoreData();
			        	else{
			        		$(".table-style4").html(data.name).show();
			        	}
			        	ct.setData();
			        	ct.setInter();
			        	// console.log(live_status);
			        	if((room_type == 1 || room_type == 2))
			        		ct.setScore();
			        	else
			        		time_con.hide();
			        	if(room_type == 1){
			        		$(".wrapper-nav").addClass("wrapper-nav-data");
			        		$(".nav-data").show();
			        	}
			        	ct.changyan_initial();
		        	}
		        	else{
		        		loading.hide();
		        		wrapper_tips.html(tips1).show();
		        	}
		        },
		        error : function(){
		        	alert("网络错误，请刷新重试");
		        }
			});
			if(location.href.split("?")[1].indexOf("radio") != -1){
				$(".beijing-sports-radio").html('<object align=middle classid=CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95 class=OBJECT id=MediaPlayer width=360 height=70 ><param name=ShowStatusBar value=-1><param name=ShowPositionControls value=0><param name="EnableContextMenu" value="0"><param name=Filename value="mms://alive.rbc.cn/fm1025"><embed type=application/x-oleobject codebase=http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701 flename=mp src="mms://alive.rbc.cn/fm1025" width=360 height=70></embed></object>')
			}
			bindEvents();
		},
		setScore : function(){
			inter_score = win.setInterval(function(){
					ct.setScoreData();
				},inter_time);
		},
		setScoreData : function(){
			if(live_status === 3){
				win.clearInterval(inter);
				return false;
			}
			$.ajax({
				url : api_prefix + '/api/pc/room/' + room_id + '/game/info/',
				type : 'GET',
				dataType : "jsonp",
		        jsonp : "jsonpcallback",
		        success : function(data){
		        	switch(room_type){
		        		case 1 : 
		        			if(!score_data){
		        				$(".basketball-home-name").html(data.data.home_team_name);
		        				$(".basketball-away-name").html(data.data.away_team_name);
		        				$(".basketball-home-pic").attr("src",data.data.home_team_logo);
		        				$(".basketball-away-pic").attr("src",data.data.away_team_logo);
		        				score_data = 1;
		        			}
		        			$(".basketball-home-score").html(data.data.home_score);
		        			$(".basketball-away-score").html(data.data.away_score);
		        			for(var i = 0;i < data.data.quarter_score.length;i++){
		        				$(".basketball-home-quarter .quarter").eq(i).html(data.data.quarter_score[i][1]);
		        				$(".basketball-away-quarter .quarter").eq(i).html(data.data.quarter_score[i][2]);
		        			}
		        			$(".table-style3").show();	
		        			if(live_status == 2){
		        				remain_time = quarter_name[data.data.quarter_no-1] ? quarter_name[data.data.quarter_no-1]+" 剩余"+Math.floor(data.data.time/60)+"分"+data.data.time%60+"秒" : "尚未开始";
		        			}
		        			else
		        				time_con.hide();
		        			sports_time.html(remain_time);
		        			break;
		        		case 2 :
		        			if(!score_data){
		        				$(".football-home-name").html(data.data.home_team_name);
		        				$(".football-away-name").html(data.data.away_team_name);
		        				$(".football-home-pic").attr("src",data.data.home_team_logo);
		        				$(".football-away-pic").attr("src",data.data.away_team_logo);
		        				score_data = 1;
		        			}
		        			$(".football-home-score").html(data.data.home_score);
		        			$(".football-away-score").html(data.data.away_score);
		        			$(".table-style1").show();
		        			// console.log(live_status);
		        			if(live_status == 2)
		        				remain_time = Math.floor((90*60 - parseInt(data.data.time))/60)+"分钟";
		        			else
		        				time_con.hide();
		        			sports_time.html(remain_time);
		        			break;
		        		case 3 :
		        			$(".table-style2").show();
		        			break;
		        		default :
		        			break;
		        	};
		        },
		        error : function(){
		        	alert("网络错误，请刷新重试");
		        }
			});
		},
		setInter : function(){
			if(!is_scroll){
				ct.setData();
			}
			else{
				inter = win.setInterval(function(){
					ct.setData();
				},inter_time);
			}
		},
		clearInter : function(){
			if(typeof(inter) != "undefined")
				win.clearInterval(inter);
			return false;
		},
		setData : function(){
			if(live_status === 3)
				ct.clearInter();
			temp_type = data_type;
			current_request = $.ajax({
				url : api_prefix + '/api/pc/stream/' + stream_id + '/message/',
				type : 'GET',
				dataType:"jsonp",
		        jsonp:"jsonpcallback",
				data : {
					'room_id' : room_id,
					'sid' : sid,
					'indexflag' : 1
				},
				success : function(data){
					// console.log(data);
					loading.hide();
					html = "";
					live_status = data.live_status;
					for(var i = data.data.length - 1;i >= 0;i--){
						var item = data.data[i];
						if(item.sid > sid)
							sid = item.sid;
						var date = new Date(item.create_time*1000),
							minu = date.getMinutes() < 10  ? '0'+date.getMinutes() : date.getMinutes(),
							show_date = date.getMonth()+1 +'月'+date.getDate()+'日 '+date.getHours()+':'+minu;
						html = null;
						if(item.element_type === null && data_type === 0){
							html = '<li class="normal clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content"><p>'+item.content+'<span class="time">'+show_date+'</span></p></div></li>';
						}
						else if(item.element_type === "comment" && data_type === 0){
							html = '<li class="normal clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content"><p>'+item.content+'<span class="re-friends">（回复'+item.element.author_name+':'+item.element.content+'）</span><span class="time">'+show_date+'</span></p></div></li>';
						}
						else if(item.element_type === "picture" && (data_type === 0 || data_type === 2)){
							html = '<li class="video clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content"><p>'+item.content+'</p><div class="content-container"><img src="'+item.element.url+'" width="350" class="main-pic"></div></div><p class="time">'+show_date+'</p></li>';
						}
						else if(item.element_type === "gifpicture" && (data_type === 0 || data_type === 2)){
							html = '<li class="video clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content"><p>'+item.content+'</p><div class="content-container"><img src="'+item.element.url+'" width="350" class="main-pic"></div></div><p class="time">'+show_date+'</p></li>';
						}
						else if(item.element_type === "video" && (data_type === 0 || data_type === 1)){
							script_temp.html('<script type="text/javascript">showVrsPlayer({vid: "'+item.element.vid+'",width:"350",height:"280",autoplay: "false",playercover: "'+item.element.cover+'",playerID:"player44",showCtrlBar:1});</script>');
							html = '<li class="video clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content"><p>'+item.element.title+'</p><div class="content-container"><div class="main-video">'+video_temp.html()+'</div></div></div><p class="time">'+show_date+'</p></li>';
						}
						else if(item.element_type === "audio" && data_type === 0){
							html = '<li class="normal clearfix" sid="'+item.sid+'"><div class="avatar"><img src="images/head.png" width="38" height="38"></div><div class="info"><h3 class="master"><span>'+item.speaker.name+'</span><i></i></h3></div><div class="content">'+item.element.title+'<div class="audio-btn" url="'+item.element.url+'" status="off">'+item.element.length+'<img src="images/audio-play.png"></div><span class="time">'+show_date+'</span></div></li>';
						}
						if(html){
							if(main.find("li").length){
								if(item.sid > parseInt(main.find("li").eq(0).attr("sid")))
									main.prepend(html);
							}
							else
								main.prepend(html);
						}
						if(!main.find("li").length){
							wrapper_tips.html(tips).show();
						}
						main.find("a").attr("target","_blank");
					}
				},
				error : function(){

				}
			});
		},
		setStatistic : function(){
			$.ajax({
				url : api_prefix + '/api/pc/room/' + room_id + '/game/statistic/',
				type : 'GET',
				dataType : "jsonp",
		        jsonp : "jsonpcallback",
		        success : function(data){
		        	loading.hide();
		        	if(!data.error){
		        		var html = ct.setStatisticDetail(data.data.player_info.v, data.data.team_info.v) + ct.setStatisticDetail(data.data.player_info.h, data.data.team_info.h);
		        		wrapper_statistics.html(html);
		        	}
		        	else{
		        		wrapper_tips.html(tips).show();
		        	}
		        },
		        error : function(){
		        	alert("网络错误，请刷新重试");
		        }
			});
		},
		setStatisticDetail : function(datap, datat){
			var html = "",color,start;
			html += '<div class="blockA"><h2>'+datat.team_name+'</h2><div id="v_team_stats"><table cellspacing="0"><tbody><tr class="title"><td class="e1">首发</td><td class="e2">球员</td><td class="e3">出场时间</td><td class="e4">投篮</td><td class="e4">三分球</td><td class="e4">罚球</td><td class="e4">篮板</td><td class="e4">助攻</td><td class="e4">失误</td><td class="e4">抢断</td><td class="e4">盖帽</td><td class="e4">犯规</td><td class="e4">得分</td></tr>';
			for(var i = 0;i < datap.length;i++){
				color = i%2 == 0 ? "white" : "blue";
				start = datap[i].is_starting ? '<img src="images/icon_ton.gif" width="9" height="11" alt="">' : "";
				if(datap[i].minutes){
					html += '<tr class="'+color+'" onmouseover="this.className=\'on\'" onmouseout="this.className=\''+color+'\'"><td>'+start+'</td><td><span class="bluetxt"><a href="http://data.sports.sohu.com/nba/nba_player_info.php?playerid='+datap[i].player_id+'" target="_blank">'+datap[i].name+'</a></span></td><td>'+datap[i].minutes+'</td><td>'+datap[i].field_goals_made+'-'+datap[i].field_goals_attempted+'</td><td>'+datap[i].t_p_field_goals_made+'-'+datap[i].t_p_field_goals_attempted+'</td><td>'+datap[i].free_throws_made+'-'+datap[i].free_throws_attempted+'</td><td>'+datap[i].rebounds+'</td><td>'+datap[i].assists+'</td><td>'+datap[i].turnovers+'</td><td>'+datap[i].steals+'</td><td>'+datap[i].blocks+'</td><td>'+datap[i].fouls+'</td><td>'+datap[i].points+'</td></tr>';
				}
				else{
					html += '<tr class="'+color+'" onmouseover="this.className=\'on\'" onmouseout="this.className=\''+color+'\'"><td></td><td><span class="bluetxt"><a href="/nba/nba_player_info.php?playerid='+datap[i].player_id+'" target="_blank">'+datap[i].name+'</a></span></td><td colspan="12" align="center"></td></tr>';
				}			
			}
			html += '<tr class="blue02"><td colspan="2"><strong>总 计</strong></td><td></td><td>'+datat.field_goals_made+'-'+datat.field_goals_attempted+'</td><td>'+datat.three_point_made+'-'+datat.three_point_attempted+'</td><td>'+datat.free_throws_made+'-'+datat.free_throws_attempted+'</td><td>'+datat.rebounds+'</td><td>'+datat.assists+'</td><td>'+datat.turnovers+'</td><td>'+datat.steals+'</td><td>'+datat.blocks+'</td><td>'+datat.fouls+'</td><td>'+datat.points+'</td></tr><tr class="blue03"><td colspan="2"><strong>百分比</strong></td><td></td><td>'+datat.field_goals_percent.toFixed(2)+'</td><td>'+datat.three_throws_percent.toFixed(2)+'</td><td>'+datat.free_throws_percent.toFixed(2)+'</td><td colspan="8"></td></tr></tbody></table></div></div>';
			return html;
		},
		changeType : function(type){
			loading.show();
			wrapper_tips.hide();
			if(current_request){
				current_request.abort();
			} 
			main.find("li").remove();
			wrapper_statistics.html("");
			ct.clearInter();
			if(parseInt(type) === 3){
				ct.setStatistic();
				return false;
			}
			sid = 0;
			data_type = parseInt(type);
			ct.setData();
			ct.setInter();
		},
		changyan_initial : function(){
			var topicId = topic_id;
			SohuComment.Init({
                 floorList:true,//显示楼层
                 pageList:true,//显示页码
                 showList:true,//是否显示列表
                 type:'all',//默认到最新
                 jumpCommentPage:false,//发帖后是否跳转到评论页
                 pretendShow: false,
                 forbidFace:false,
                 topicId: topicId,
                 loading: 2,//是否滚动加载
                 backTop: false,//是否有回到顶部按钮
                 showFace: false,
                 onAfterDataShow:function(){
                 	$(".comMenu:eq(0) .r").hide();	
                 },//当展现完毕后的回调
                 showFace:false,//是否显示表情评论,默认都显示
                 urlChange:false,//正文页发表评论后是否跳转到评论页
                 simpleMode:false,//简易模式
                 qingComm:false,//轻搜狐
                 editor:true//是否显示输入框
           });
		},
		getFlashObject :function(){
		    return document.getElementById("myFlash");
		},
		play : function(url){
		    ct.getFlashObject().SetVariable("method:setUrl", url);
		    ct.getFlashObject().SetVariable("method:play", "");
		    ct.getFlashObject().SetVariable("enabled", "true");
		},
		stop : function(){
		    ct.getFlashObject().SetVariable("method:stop", "");
		},
		setPosition : function(){
		    ct.getFlashObject().SetVariable("method:setPosition", position);
		}
	};

	var bindEvents = function(){
		nav.find("li").on("click",function(){
			$(this).addClass("selected").siblings().removeClass("selected").removeClass("nav-live-hover").removeClass("nav-video-hover").removeClass("nav-pic-hover").removeClass("nav-data-hover");
			ct.changeType($(this).attr("type"));
		});
		nav.find("li").on("mouseenter",function(){
			var self = $(this);
			if(!self.hasClass("selected")){
				switch(self.attr("type")){
					case "0" :
						if(!self.hasClass("nav-live-hover"))
							self.addClass("nav-live-hover")
						break;
					case "1" :
						if(!self.hasClass("nav-video-hover"))
							self.addClass("nav-video-hover")
						break;
					case "2" :
						if(!self.hasClass("nav-pic-hover"))
							self.addClass("nav-pic-hover")
						break;
					case "3" :
						if(!self.hasClass("nav-data-hover"))
							self.addClass("nav-data-hover")
						break;
				}
			}
		});
		nav.find("li").on("mouseleave",function(){
			var self = $(this);
			if(!$(this).hasClass("selected")){
				switch(self.attr("type")){
					case "0" :
						if(self.hasClass("nav-live-hover"))
							self.removeClass("nav-live-hover")
						break;
					case "1" :
						if(self.hasClass("nav-video-hover"))
							self.removeClass("nav-video-hover")
						break;
					case "2" :
						if(self.hasClass("nav-pic-hover"))
							self.removeClass("nav-pic-hover")
						break;
					case "3" :
						if(self.hasClass("nav-data-hover"))
							self.removeClass("nav-data-hover")
						break;
				}
			}
		});
		scroll_box.on("click",function(){
			if(document.getElementById("scroll-box").checked){
				is_scroll = 1;
				ct.setInter();
			}
			else{
				is_scroll = 0;
				ct.clearInter();
			}
		});
		toggle_button.on("click",function(){
			var self = $(this);
			if(self.hasClass("toggle-button-check")){
				self.removeClass("toggle-button-check");
				wrapper_r.show();
			}	
			else{
				self.addClass("toggle-button-check");
				wrapper_r.hide();
			}
		});
		main_wrapper.on('click','.audio-btn',function(){
			var self = $(this);
			if(self.attr("status") === "off"){
				self.attr("status","on");
				// self.find("img").attr("src","images/audio-play.gif");
				ct.play(self.attr("url"));
			}
			else{
				self.attr("status","off");
				// self.find("img").attr("src","images/audio-play.png");
				ct.stop();
			}
		});
	};

	ct.initialize();
})(jQuery, window)