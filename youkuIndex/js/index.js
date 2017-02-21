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
                text: '7��top10�Ȳ����Ӿ缯��������',
                style: {
                    fontSize: '14px'
                }
            },
            xAxis: {
                type: 'category',
                categories: ['���Ž���̷��', '��Doctor�����ˡ�', '����ɽǱ����', '��Сʱ����', '��һ�ֶ���֮һ�����졷', '���మʮ�꡷', '���氮��������', '����������ˡ�'],
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
                    text: '������(��)'
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
                valueSuffix: '��'
            },
            series: [{
                data: [{y: 2802, color: '#219cd9'}, {y: 2060, color: '#d8484a'}, {y: 888, color: '#219cd9'}, {y: 765, color: '#d8484a'}, {y: 577, color: '#d8484a'}, {y: 558, color: '#d8484a'}, {y: 418, color: '#d8484a'}, {y: 401, color: '#d8484a'}],
                name: '������',
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
                text: '���Ž���̷������ְҵ�ֲ�',
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
                name: '�ٷֱ�',
                data: [
                    ['ѧ��',   24.6],
                    ['����',       30.4],
                    ['��ȫְ',    15.0],
                    ['����Ա',     30.0]
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
                valueSuffix: '��'
            },
            xAxis: {
                type: 'category',
                categories: ['��ӳ��2014','����Ů��','���е�һ��','�ſ�����2014','ԭ����ѡ'],
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
                    text: '������(��)'
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
                    name: 'PC������',
                    data: [1352, 1126, 1736, 1614, 1151],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile������',
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
                valueSuffix: '��'
            },
            xAxis: {
                type: 'category',
                categories: ['����԰���ߡ�','��ѩ���г���','�������ع���','�����ν��3��','������ǡ�','��ħ����','��Сʱ����','�����ְ���','��Сʱ��2��ľʱ����','�������ع���'],
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
                    text: '������(��)'
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
                    name: 'PC������',
                    data: [483, 459, 667, 456, 294, 193, 341, 85, 328, 222],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile������',
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
                    name: '������',
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
                valueSuffix: '��'
            },
            xAxis: {
                type: 'category',
                categories: ['��BigЦ����2014��','�����ߴ��¼�����������������','���ذ����Գɳ�Э�ᡷ��һ��','�������ѿ���2014��','����ɰ�2014��'],
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
                    text: '������(��)'
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
                    name: 'PC������',
                    data: [764, 1167, 1283, 1395, 881],
                    stack: 'male',
                    color: '#d8484a'
                },
                {
                    name: 'Mobile������',
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
        title:'2014��7���ſ�ָ��',
        desc:"2014��7���ſ�ָ��",
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



