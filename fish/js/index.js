(function(win, doc){
	//缓存常用的dom对象
	var loading = doc.getElementById("loading"),
		main = doc.getElementById("main"),
		container = doc.getElementById("container"),
		remain_times = doc.getElementById("remain-times"),
		tips = doc.getElementById("tips"),
		rewards_list = doc.getElementById("rewards-list"),
		game_button = doc.querySelectorAll(".game-button")[0];
	//定义常用变量
	var inner_height = win.innerHeight,
		inner_width = win.innerWidth,
		html = "",
		is_gaming = 0,
		inter,
		count = 3;
		speed_data = [],
		move_data = [];
	//奖品的初始化json数据
	var json_data = {
		"length" : 4,
		"items" : [
			{"name":"奖品1","id":1,"x":0,"y":0,"width":55,"height":28,"status":0},
			{"name":"奖品2","id":2,"x":0,"y":0,"width":55,"height":28,"status":0},
			{"name":"奖品3","id":3,"x":0,"y":0,"width":55,"height":28,"status":0},
			{"name":"奖品4","id":4,"x":0,"y":0,"width":55,"height":28,"status":0}
		]
	}

	var ct = {
		//程序初始化
		initialization : function(){
			//设置初始化的自适应宽高
			main.style.height = inner_height - 20 + "px";
			container.style.height = inner_height - 120 + "px";
			main.style.display = "block";
			loading.style.display = "none";
			//设置初始化数据
			ct.setData();
		},
		setData : function(){
			move_data = json_data.items;
			for(var i = 0; i < json_data.length;i++){
				//插入奖品dom对象
				var el = doc.createElement('div'),
					el_y = (inner_height - 150)*Math.random();
				el.className = "items";
				el.id = "items-"+json_data.items[i].id;
				el.innerHTML = json_data.items[i].name;
				el.style.top = el_y + "px";
				container.appendChild(el);
				//设置奖品随机运动的速率
				var sp = Math.random()*30;
				speed_data[i] = sp < 10 ? sp + 10 : sp;
				//设置奖品的初始化的x,y
				move_data[i].x = 0;
				move_data[i].y = el_y;
			}
		},
		//setInterval的函数执行
		setMove : function(){
			for(var i = 0; i < move_data.length; i++){
				//如果没有被点中的话，设置缓存对象的x,y
				if(!move_data[i].status){
					if(move_data[i].x > inner_width){
						move_data[i].x = 0;
						move_data[i].y = (inner_height - 150)*Math.random();
					}
					else{
						move_data[i].x += speed_data[i]; 
					}
					doc.querySelectorAll(".items")[i].style.left = move_data[i].x + "px";
					doc.querySelectorAll(".items")[i].style.top = move_data[i].y + "px";
				}
			}
		}	
	};

	var bindEvents = function(){
		game_button.onclick = function(){
			//开始游戏和暂停的相关interval逻辑
			if(this.innerHTML === "开始游戏"){
				this.innerHTML = "暂停";
				is_gaming = 1;
				inter = win.setInterval(function(){
					ct.setMove();
				},100);
			}
			else{
				this.innerHTML = "开始游戏";
				is_gaming = 0;
				win.clearInterval(inter);
			}
		};
		container.onclick = function(event){
			//container上点击的判断
			if(count){
				if(is_gaming){
					var e = event || win.event;
					var x = e.pageX,
						y = e.pageY - 70,
						flag = 1;
					for(var i = 0;i < move_data.length;i++){
						if(Math.abs(x - move_data[i].x - move_data[i].width/2) < 10 && Math.abs(y - move_data[i].y - move_data[i].height/2) < 10){
							var item = doc.querySelectorAll(".items")[i];
							move_data[i].status = 1;
							item.style.display = "none";
							tips.innerHTML = "恭喜，捕到了" + item.innerHTML;
							var reward_li = doc.createElement("li");
							reward_li.innerHTML = item.innerHTML;
							rewards_list.appendChild(reward_li);
							flag = 0;
						}
					}
					if(flag){
						tips.innerHTML = "不好意思，没捕到哦";
					}
					remain_times.innerHTML = --count;
				}
				else{
					alert("请开始游戏后捕鱼哦！")
				}
			}
			else{
				alert("您已经没有游戏的机会了！");
			}
		};
	};

	ct.initialization();
	bindEvents();

})(window, document)