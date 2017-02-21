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
        $share_con  =   $('.share-con'),
    	$share_btn 	=	$('.share-con .btn1'),
        $restart_btn =  $('.share-con .btn2'),
    	$share   	=	$('.share'),
        $page       =   $('.page'),

    	width 		=	$body.width()*295/320,
    	height 		=	$body.height()*452/568,
    	top 		=	width*129/588,
    	name 		=	'',
    	inter,
        inter1,
        inter2,
    	percent 	=	0,

    	news_index 			=	Math.floor(Math.random()*12) + 1,
    	finance_index 		=	Math.floor(Math.random()*5) + 1,
    	live_index 			=	Math.floor(Math.random()*5) + 1,
    	entertainmet_index 	=	Math.floor(Math.random()*5) + 1,
    	sports_index 		=	Math.floor(Math.random()*5) + 1,
    	social_index 		=	Math.floor(Math.random()*5) + 1,

    	news_text 			= 	['XXX出任《速8》主角', 'BAT合并 XXX出任CEO', 'XXX发现苹果表超大bug', 'XXX当搜狐端星际专员', 'XXX挤掉皮特上头条', 'XXX击败希拉里当选总统', 'XXX网聊搭上阿凡达', 'XXX送快递日均收小费十万', 'XXX麻袋装硬币买豪车', 'XXX头发弹性超成龙', 'XXX称外星人引发豪车车祸', 'XXX称王科比退役']	,
    	finance_text 		=	['俏兰州拉面征服联合国', '新闻联播差钱接广告', '三千万白领辞职炒股', '朋友圈代购身家过亿', '00后代购击败李嘉诚'],
    	live_text 			=	['tfboys作客谈“恋爱”', '假面超人：真正的我', '金三胖作客谈宇宙计划', '希拉里作客谈竞选', '庞麦郎聊《我是歌手》'],
    	entertainmet_text 	=	['刘翔加盟跑男翻墙快', '张嘉译代王自健主持脱口秀', '戒毒所大联欢明星云集', '王思聪参加变形记', '整容材料致癌 娱乐圈恐慌'],
    	sports_text 		=	['中国富豪买豪门成风', '中国男足世界杯夺冠', '全国中学增考足球四级', '姚明重返NBA当教练', '跨栏天才包揽奥运金牌'],
    	social_text 		=	['凤姐代言麦当劳巨无霸', '小伙求爱点蜡烛酿火灾', '广场舞成奥运比赛项目', '搜狐聚焦跑步新风尚', '车主练飞车放碰瓷'],

    init			=	function(){
        setWidth();

    	if( getQueryStringRegExp('name') ){
    		name 				=	getQueryStringRegExp('name');
    		news_index 			=	getQueryStringRegExp('news_index');
    		finance_index 		=	getQueryStringRegExp('finance_index');
    		live_index 			=	getQueryStringRegExp('live_index');
    		entertainmet_index 	=	getQueryStringRegExp('entertainmet_index');
    		sports_index 		=	getQueryStringRegExp('sports_index');
    		social_index 		=	getQueryStringRegExp('social_index');
    		setStructure();
            $share_con.html('<a href="/samsung/">我也要试试！</a>');
    		onRotateNews();
    		$('.loading').hide();
    		$page3.addClass('animated').show();
    	}
    	else{
    		bindEventListener();
    		setTimeout(function(){
    			setIndex();
    		},1000);
    	}
    	setShare();
    },

    setWidth                =   function(){
        $page.width(295/3.2+"%").height(452/5.68+"%").css({'top': 60/5.68+"%", 'left': 13/3.2+"%"});
    },

    getQueryStringRegExp 	=	function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = document.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]); return null;
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

                setTimeout(function(){
                    $('.page2-title').show().addClass('active');
                },1600);

                setTimeout(function(){
                    $('.page2-airship').addClass('active');
                }, 3200);
    		}
    	}, 12);
    },

    setStructure 		=	function(){
    	var main_height	=	height - top,
    		main_width 	=	width,
    		row1 		=	main_height*201/392,
    		row2 		=	main_height*91/392,
    		row3 		=	main_height*100/392;

        $main.height(main_height);
    	$main.find('.main-row1').height(row1);
    	$main.find('.main-row2').height(row2);
    	$main.find('.main-row3').height(row3);
    	$main.find('.news-con').width((main_width-3)*194/292).height(row1-3).find('.news').addClass('news'+news_index).find('p').html(news_text[news_index-1].replace(/XXX/,name));
    	$main.find('.finance').width((main_width-3)*98/292).height((row1-3)*107/199).addClass('finance'+finance_index).find('p').html(finance_text[finance_index-1]);
    	$main.find('.live').width((main_width-3)*98/310).height((row1-3)*88/199).addClass('live'+live_index).find('p').html(live_text[live_index-1]);
    	$main.find('.entertainment').width(main_width).height(row2-3).addClass('entertainment'+entertainmet_index).find('p').html(entertainmet_text[entertainmet_index-1]);
    	$main.find('.sports').width((main_width-3)*91/291).height(row3).addClass('sports'+sports_index).find('p').html(sports_text[sports_index-1]);
    	$main.find('.social').width((main_width-3)*200/291).height(row3).addClass('social'+social_index).find('p').html(social_text[social_index-1]);
    },

    onRotateNews 		=	function(){
    	$news_pre.addClass('clicked');
    	$news.addClass('clicked');
    	$share_con.addClass('active');
    	setShare();
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

    onRestart           =   function(){
        window.location.reload();
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '未来大新闻：'+news_text[news_index-1].replace(/XXX/,name),
                link: 'http://ex.wyyun.com/samsung/?name='+name+'&news_index='+news_index+'&finance_index='+finance_index+'&live_index='+live_index+'&entertainmet_index='+entertainmet_index+'&sports_index='+sports_index+'&social_index='+social_index,
                imgUrl: 'http://ex.wyyun.com/samsung/images/logo.jpg',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });		
            wx.onMenuShareAppMessage({
                title: '未来大新闻：'+news_text[news_index-1].replace(/XXX/,name),
                desc: news_text[news_index-1].replace(/XXX/,name), 
                link: 'http://ex.wyyun.com/samsung/?name='+name+'&news_index='+news_index+'&finance_index='+finance_index+'&live_index='+live_index+'&entertainmet_index='+entertainmet_index+'&sports_index='+sports_index+'&social_index='+social_index,
                imgUrl: 'http://ex.wyyun.com/samsung/images/logo.jpg',
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
        $share_btn.on('touchend', onShowShare);
        $share.on('touchend', onHideShare);
        $restart_btn.on('touchend', onRestart);
    };

    $(init);
})();



