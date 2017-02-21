(function(){
    var win_width   =   $(window).width(),
        win_height  =   $(window).height(),

        cur_page    =   0,

    init            =   function(){
        $('.main').css({'width':win_width,'height':win_height}).show();
        setPos();
        $(".dragend-container").dragend({
            direction: "vertical",
            stopPropagation: true,
            onDragEnd: function(a, b, page, d){
                if( cur_page != page ){
                    $('.text').removeClass('show');
                }
                if( page == 0 && cur_page != page ){
                    setChart1();
                }
                else if( page == 1 && cur_page != page ){
                    setChart2();
                }
                else if( page == 2 && cur_page != page ){
                    setChart3();
                }
                else if( page == 3 && cur_page != page ){
                    setChart4();
                }
                else if( page == 4 && cur_page != page ){
                    setChart5();
                }
                else if( page == 5 && cur_page != page ){
                    setChart6();
                }
                else if( page == 6 && cur_page != page ){
                    setChart7();
                }
                else if( page == 7 && cur_page != page ){
                    setChart8();
                }
                else if( page == 8 && cur_page != page ){
                    setChart9();
                }
                cur_page    =   page;
            },
        });

        window.setTimeout(function(){
            setIndex();
        },1000);
        bindEventListener();
    },

    setIndex             =   function(){
        $('.loading-page').fadeOut();
        $(".dragend-container").dragend({scrollToPage: 1});
        setChart1();
    },

    setPos              =   function(){
        $('.title').css({'margin-top':win_width*4.8/320+'em'});
        $('.page5-icon').css({"left":win_width*90/320+'px',"top": win_height*155/568+'px'});
        $('.page9-1').css({"left":win_width*92/320+'px',"top": win_height*165/568+'px'});
        $('.page9-2').css({"left":win_width*230/320+'px',"top": win_height*252/568+'px'});
        $('.page9-3').css({"left":win_width*120/320+'px',"top": win_height*155/568+'px'});
    },

    setChart1           =   function(){
        $('.chart1').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: '7月top10热播电视剧集均播放量',
                style: {
                    fontSize: '14px'
                }
            },
            xAxis: {
                type: 'category',
                categories: ['《古剑奇谭》', '《Doctor异乡人》', '《寒山潜龙》', '《小时代》', '《一又二分之一的夏天》', '《相爱十年》', '《真爱遇到他》', '《爱情回来了》'],
                labels: {
                    rotation:-60,
                    x: 5,
                    style: {
                        fontSize: '13px'
                    },
                    align: 'right'
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                title: {
                    text: '播放量(万)'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                valueSuffix: '万'
            },
            series: [{
                data: [{y: 2802, color: '#219cd9'}, {y: 2060, color: '#d8484a'}, {y: 888, color: '#219cd9'}, {y: 765, color: '#d8484a'}, {y: 577, color: '#d8484a'}, {y: 558, color: '#d8484a'}, {y: 418, color: '#d8484a'}, {y: 401, color: '#d8484a'}],
                name: '播放量',
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    x: 4,
                    y: 2,
                    style: {
                        fontSize: '11px',
                        textShadow: '0 0 3px black'
                    }
                }
            }]
        });
        $('.dragend-page').eq(0).find('.title').addClass('show');
        $('.aiqing').addClass('show');
        $('.wuxia').addClass('show');
    },

    setChart2           =   function(){
        $('.chart2').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '《古剑奇谭》观众职业分布',
                style: {
                    fontSize: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '百分比',
                data: [
                    ['学生',   24.6],
                    ['白领',       30.4],
                    ['非全职',    15.0],
                    ['公务员',     30.0]
                ]
            }]
        });
        $('.dragend-page').eq(1).find('.title').addClass('show');
        $('.page2-text').addClass('show');
        window.setTimeout(function(){
            $('.highcharts-series path').eq(0).trigger('click');
        },2000);
    },

    setChart3           =   function(){
        $('.dragend-page').eq(2).find('.title').addClass('show');
        $('.page3-1').addClass('show');
        window.setTimeout(function(){
            $('.page3-2').addClass('show');
        },1000);
        window.setTimeout(function(){
            $('.page3-3').addClass('show');
        },2000);
    },

    setChart4           =   function(){
        $('.dragend-page').eq(3).find('.title').addClass('show');
        $('.page4').addClass('show');
    },

    setChart5           =   function(){
        $('.chart3').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: '万'
            },
            xAxis: {
                type: 'category',
                categories: ['星映话2014','男神女神','侣行第一季','优酷明星2014','原创精选'],
                labels: {
                    rotation:-60,
                    x: 5,
                    style: {
                        fontSize: '13px'
                    },
                    align: 'right'
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                title: {
                    text: '播放量(万)'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [
                {
                    name: 'PC播放量',
                    data: [1352, 1126, 1736, 1614, 1151],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile播放量',
                    data: [7907, 3347, 1629, 367, 601],
                    stack: 'male',
                    color: '#219cd9'
                }]
        });
        $('.dragend-page').eq(4).find('.title').addClass('show');
    },

    setChart6           =   function(){
        $('.dragend-page').eq(5).find('.title').addClass('show');
        $('.page6-1').addClass('show');
        $('.page6-2').addClass('show');
    },

    setChart7           =   function(){
        $('.chart4').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: '万'
            },
            xAxis: {
                type: 'category',
                categories: ['《家园防线》','《雪国列车》','《蜂鸟特工》','《变形金刚3》','《盗马记》','《魔警》','《小时代》','《放手爱》','《小时代2青木时代》','《命运特工》'],
                labels: {
                    rotation:-60,
                    x: 5,
                    style: {
                        fontSize: '13px'
                    },
                    align: 'right'
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                title: {
                    text: '播放量(万)'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [
                {
                    name: 'PC播放量',
                    data: [483, 459, 667, 456, 294, 193, 341, 85, 328, 222],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile播放量',
                    data: [1617, 1561, 1246, 1346, 1231, 1275, 1023, 1142, 888, 938],
                    stack: 'male',
                    color: '#219cd9'
                }]
        });
        $('.dragend-page').eq(6).find('.title').addClass('show');
    },

    setChart8           =   function(){
        $('.dragend-page').eq(7).find('.title').addClass('show');
        $('.page8-1').addClass('show');
        window.setTimeout(function(){
            $('.page8-2').addClass('show');
        },1000);
        window.setTimeout(function(){
            $('.page8-3').addClass('show');
        },2000);
        window.setTimeout(function(){
            $('.chart6').highcharts({
                title: {
                    text: ''
                },
                tooltip: {
                    enabled: false
                },
                series: [{
                    data: [0, 2, 4, 3, 5.5, 8, 7, 9, 11, 13, 10, 13, 16, 19, 22],
                    lineWidth: 4,
                    name: '播放量',
                    marker: {
                        radius: 4,
                        style: {
                            color: "red"
                        },   
                    }
                }]
            });
        },3000);
    },

    setChart9           =   function(){
        $('.chart5').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: '万'
            },
            xAxis: {
                type: 'category',
                categories: ['《Big笑工坊2014》','《暴走大事件第三季》暴走漫画','《关爱八卦成长协会》第一季','《唐唐脱口秀2014》','《胥渡吧2014》'],
                labels: {
                    rotation:-60,
                    x: 5,
                    style: {
                        fontSize: '11px'
                    },
                    align: 'right'
                }
            },
            yAxis: {
                min: 0,
                lineWidth: 1,
                title: {
                    text: '播放量(万)'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [
                {
                    name: 'PC播放量',
                    data: [764, 1167, 1283, 1395, 881],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile播放量',
                    data: [2703, 1552, 809, 330, 247],
                    stack: 'male',
                    color: '#219cd9'
                }]
        });
        $('.dragend-page').eq(8).find('.title').addClass('show');
    },

    bindEventListener   =   function(){
        $('.loading-page').on('touchstart',setIndex);
    };

    $(init);
})(
(function(){
    var dataForWeixin={
        appId:"",
        MsgImg:"http://www.wyyun.com/youku/images/youku.gif",
        TLImg:"http://www.wyyun.com/youku/images/youku.gif",
        url:'http://www.wyyun.com/youku/',
        title:'2014年7月优酷指数',
        desc:"2014年7月优酷指数",
        fakeid:"",
        callback:function(){}
    };
    var onBridgeReady=function(){
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid":dataForWeixin.appId,
                "img_url":dataForWeixin.MsgImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.url,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){(dataForWeixin.callback)();});
        });
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            (dataForWeixin.callback)();
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url":dataForWeixin.TLImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.url,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){});
        });
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            WeixinJSBridge.invoke('shareWeibo',{
                "content":dataForWeixin.title,
                "url":dataForWeixin.url
            }, function(res){(dataForWeixin.callback)();});
        });
        WeixinJSBridge.on('menu:share:facebook', function(argv){
            (dataForWeixin.callback)();
            WeixinJSBridge.invoke('shareFB',{
                "img_url":dataForWeixin.TLImg,
                "img_width":"120",
                "img_height":"120",
                "link":dataForWeixin.url,
                "desc":dataForWeixin.desc,
                "title":dataForWeixin.title
            }, function(res){});
        });
        WeixinJSBridge.call('hideToolbar');
    };
    if(document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if(document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
})()
)



