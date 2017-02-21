(function(){
    var $body 		=	$('body'),
    	$main 		=	$body.find('.main'),
    	$news_pre 	=	$('.news-pre'),
    	$news 		=	$('.news'),
    	$percent 	=	$('.page1-percent'),
    	$page1 		=	$('.page1'),
    	$page2 		=	$('.page2'),
    	$page3 		=	$('.page3'),
    	$button 	=	$page2.find('a'),
    	$share_con 	=	$('.share-con'),
    	$share   	=	$('.share'),

    	width 		=	$body.width(),
    	height 		=	$body.height(),
    	top 		=	width*94/320,
    	name 		=	'',
    	inter,
    	percent 	=	0,

    	news_index 			=	Math.floor(Math.random()*17) + 1,
    	finance_index 		=	Math.floor(Math.random()*5) + 1,
    	live_index 			=	Math.floor(Math.random()*5) + 1,
    	entertainmet_index 	=	Math.floor(Math.random()*5) + 1,
    	sports_index 		=	Math.floor(Math.random()*5) + 1,
    	social_index 		=	Math.floor(Math.random()*5) + 1,

    	news_text 			= 	['《速度与激情8》开拍 XXX出任新主角', 'BAT将合并 XXX击退马小云出任CEO', 'XXX发现苹果表bug 拒收十亿封口费', 'XXX当选搜狐新闻客户端星际专员', 'XXX挤掉皮特做客搜狐新闻互动直播', 'XXX搅局 击败希拉里当选美国总统', 'XXX放弃BAT工作 辞职卖煎饼终成煎饼之王', 'XXX斗地主大败外国元首 逼美总统写下欠条', 'XXX网聊搭上阿凡达 促成两星建交被授勋章', 'XXX网购充气娃娃被坑 性感美女变海绵宝宝', 'XXX迷路误闯南极  坠冰窟意外觅得海盗财宝', 'XXX送快递日均收小费十万 20岁登榜福布斯', 'XXX麻袋装硬币买豪车 数钱累坏销售', '头发弹性超成龙 XXX代言新品洗发水', '智障少年XXX野外小便连电 头脑变灵光超门萨', '目击者：XXX称豪车车祸系外星人所为', '科比宣布退役 透露XXX让自己无计可施']	,
    	finance_text 		=	['一碗拉面的成长史：俏兰州上市 一餐征服联合国', '新闻联播也差钱 搜狐新闻客户端成首个广告客户', '股市行情诡异长红 三千万白领辞职专门炒股', '闷声发大财：互联网小编朋友圈代购身家过亿', '首富易主：00后美女建代购帝国 李嘉诚败北'],
    	live_text 			=	['tfboys作客直播间大方谈“恋爱”', '假面超人：别逗了你不认识真正的我', '宇宙最大：金三胖作客谈宇宙计划', '希拉里作客直播间谈竞选大吐苦水', '庞麦郎：《我是歌手》为啥不请我'],
    	entertainmet_text 	=	['刘翔加盟跑男神附体 百米翻墙十秒吓呆众人', '张嘉译代王自健主持脱口秀 长太像无人察觉', '戒毒所十周年纪念大联欢 明星云集一票难求', '王思聪参加变形记 霸道总裁体验生活扛麻包', '网曝整容材料含致癌物质 引发娱乐圈大恐慌'],
    	sports_text 		=	['中国富豪收购豪门成瘾  英超西甲已成国内联赛', '中国男足世界杯夺冠 全国放假三天堪比小国庆', '全国中学增设足球四级考试 不及格延期毕业', '姚明重返NBA成首位华人主教练 全部队员超两米', '跨栏天才奥运显雄风 包揽金牌向前辈刘翔致敬'],
    	social_text 		=	['凤姐代言麦当劳迷你汉堡 称一口一个吃着过瘾', '姑娘楼下 点蜡烛 求爱 火势失控酿成灾祸小伙被拘', '强硬流行风：广场舞火遍全球 成奥运会比赛项目', '搜狐聚焦跑步新风尚 征集跑团报名就送苹果表', '防碰瓷下苦功：车主苦练飞车绝技 越矮墙没问题'],

    init			=	function(){
    	if( getQueryStringRegExp('name') ){
    		name 				=	getQueryStringRegExp('name');
    		news_index 			=	getQueryStringRegExp('news_index');
    		finance_index 		=	getQueryStringRegExp('finance_index');
    		live_index 			=	getQueryStringRegExp('live_index');
    		entertainmet_index 	=	getQueryStringRegExp('entertainmet_index');
    		sports_index 		=	getQueryStringRegExp('sports_index');
    		social_index 		=	getQueryStringRegExp('social_index');
    		setStructure();
    		$share_con.find('a').attr('href','/').html('我也要试试！');
    		onRotateNews();
    		$('.loading').hide();
    		$page3.addClass('animated').show();
    		setShare();
    	}
    	else{
    		bindEventListener();
    		setTimeout(function(){
    			setIndex();
    		},1000);
    		setShare();
    	}
    },

    getQueryStringRegExp 	=	function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = document.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	},

    setIndex 			=	function(){
    	$('.loading').hide();
    	inter 			=	window.setInterval(function(){
    		percent++;
    		$percent.html(percent+'%');
    		if(percent >= 100){
    			window.clearInterval(inter);
    			$page1.addClass('animated');
    			$page2.addClass('animated').show();
    		}
    	}, 12);
    },

    setStructure 		=	function(){
    	var main_height	=	height - top - 15,
    		main_width 	=	width - 10,
    		row1 		=	main_height*208/465,
    		row2 		=	main_height*147/465,
    		row3 		=	main_height*110/465;

    	$main.width(main_width).height(main_height);
    	$main.find('.main-row1').height(row1);
    	$main.find('.main-row2').height(row2);
    	$main.find('.main-row3').height(row3);
    	$main.find('.news-con').width((main_width-5)*207/310).height(row1-5).find('.news').addClass('news'+news_index).find('p').html(news_text[news_index-1].replace(/XXX/,name));
    	$main.find('.finance').width((main_width-5)*103/310).height((row1-10)*110/200).addClass('finance'+finance_index).find('p').html(finance_text[finance_index-1]);
    	$main.find('.live').width((main_width-5)*103/310).height((row1-10)*90/200).addClass('live'+live_index).find('p').html(live_text[live_index-1]);
    	$main.find('.entertainment').width(main_width).height(row2-5).addClass('entertainment'+entertainmet_index).find('p').html(entertainmet_text[entertainmet_index-1]);
    	$main.find('.sports').width((main_width-5)*97/310).height(row3).addClass('sports'+sports_index).find('p').html(sports_text[sports_index-1]);
    	$main.find('.social').width((main_width-5)*213/310).height(row3).addClass('social'+social_index).find('p').html(social_text[social_index-1]);
    },

    onRotateNews 		=	function(){
    	$news_pre.addClass('clicked');
    	$news.addClass('clicked');
    	$share_con.addClass('active');
    },

    onShowNews 			=	function(){
    	var nick 		=	$page2.find('.name'),
    		val 		=	nick.val();
    	if( val.length ){
    		name 		=	val;
    		setStructure();
    		$page3.addClass('animated').show();
    	}
    	else{
    		alert('请输入昵称！');
    	}
    },	

    onShowShare 		=	function(){
    	$share.show();
    	$share_con.removeClass('active');
    },

    onHideShare 		=	function(){
    	$share.hide();
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: news_text[news_index-1].replace(/XXX/,name),
                link: 'http://lidong5.com/samsung/?name='+name+'&news_index'+news_index+'&finance_index='+finance_index+'&live_index='+live_index+'&entertainmet_index='+entertainmet_index+'&sports_index='+sports_index+'&social_index='+social_index,
                imgUrl: 'http://lidong5.com/samsung/images/logo.jpg',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });		
            wx.onMenuShareAppMessage({
                title: news_text[news_index-1].replace(/XXX/,name),
                desc: news_text[news_index-1].replace(/XXX/,name), 
                link: 'http://lidong5.com/samsung/?name='+name+'&news_index'+news_index+'&finance_index='+finance_index+'&live_index='+live_index+'&entertainmet_index='+entertainmet_index+'&sports_index='+sports_index+'&social_index='+social_index,
                imgUrl: 'http://lidong5.com/samsung/images/logo.jpg',
                type: '',
                dataUrl: '',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });
        });
    },

    bindEventListener	=	function(){
        $news_pre.on('touchend', onRotateNews);
        $button.on('touchend', onShowNews);
        $share_con.on('touchend', onShowShare);
        $share.on('touchend', onHideShare);
    };

    $(init);
})();



