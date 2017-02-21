(function(){
    var win_width 	=	$(window).width(),
    	win_height	=	$(window).height(),

        wxOpenId,
        boxId,
        dataForWeixin,

    init			=	function(){
        $('.main').css('min-height',win_height);

        checkParam();

    	bindEventListener();

        dataForWeixin={
            appId:"",
            MsgImg:"http://www.wyyun.com/guchashu/images/content6.jpg",
            TLImg:"http://www.wyyun.com/guchashu/images/content6.jpg",
            url:'http://www.wyyun.com/guchashu/guchashu_gift?boxId=' + boxId,
            title:'古茶墅',
            desc:"古茶墅",
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
                    "link":'http://www.wyyun.com/guchashu/guchashu_gift?boxId=' + boxId,
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
                    "link":'http://www.wyyun.com/guchashu/guchashu_gift?boxId=' + boxId,
                    "desc":dataForWeixin.desc,
                    "title":dataForWeixin.title
                }, function(res){
                    $.ajax({
                        url : 'http://115.29.151.198/updateShare/',
                        type : 'GET',
                        data : {'boxId':boxId},
                        dataType : "jsonp",
                        jsonp : "callback",
                        success : function(data){
                        }
                    });
                });
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
                    "link":'http://www.wyyun.com/guchashu/guchashu_gift?boxId=' + boxId,
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
    },

    getUrlParam     =   function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    },

    checkParam          =   function(){
        wxOpenId        =   getUrlParam('wxopenid');

        if( getUrlParam('boxId') == null ){
            $.ajax({
                url : 'http://115.29.151.198/setGiftBox/',
                type : 'GET',
                data : {'wxOpenId':wxOpenId},
                dataType : "jsonp",
                jsonp : "callback",
                success : function(data){
                    boxId = data;
                    $('.loading').hide();
                    $('.status1').show();
                }
            });
        }
        else{
            boxId   =   getUrlParam('boxId');
            $.ajax({
                url : 'http://115.29.151.198/getGiftBox/',
                type : 'GET',
                data : {'boxId':boxId},
                dataType : "jsonp",
                jsonp : "callback",
                success : function(data){
                    if( wxOpenId == data.ownerid ){
                        if( data.guest5 != null ){
                            $('.loading').hide();
                            $('.status3').show();
                            return false;
                        }
                        var open, left;
                        if( data.guest1 == null ){
                            open = 0;
                            left = 5;
                        }
                        if( data.guest2 == null ){
                            open = 1;
                            left = 4;
                        }
                        else if( data.guest3 == null ){
                            open = 2;
                            left = 3;
                        }
                        else if( data.guest4 == null ){
                            open = 3;
                            left = 2;
                        }
                        else if( data.guest5 == null ){
                            open = 4;
                            left = 1;
                        }
                        $('.loading').hide();
                        $('.status2 .open').html(open);
                        $('.status2 .left').html(left);
                        $('.status2').show();
                    }
                    else{
                        if( wxOpenId == data.guest1 || wxOpenId == data.guest2 || wxOpenId == data.guest3 || wxOpenId == data.guest4 || wxOpenId == data.guest5 ){
                            $('.loading').hide();
                            $('.status3 p').html('您已经为好友拆开过礼盒了<br/>我也来领一个吧');
                            $('.status3 .btn1').html('领取礼盒');
                            $('.status3 .btn').hide();
                            $('.status3').show();
                            return false;
                        }
                        else{
                            if( data.guest5 != null ){
                                $('.loading').hide();
                                $('.status3 p').html('礼盒已经被他的5位好友拆开了<br/>他已经在去腾冲的路上了<br/>我也来领一个吧');
                                $('.status3 .btn1').html('领取礼盒');
                                $('.status3 .btn').hide();
                                $('.status3').show();
                                return false;
                            }
                            else{
                                var index;
                                if( data.guest1 == null ){
                                    index = 1;
                                }
                                else if( data.guest2 == null ){
                                    index = 2;
                                }
                                else if( data.guest3 == null ){
                                    index = 3;
                                }
                                else if( data.guest4 == null ){
                                    index = 4;
                                }
                                else if( data.guest5 == null ){
                                    index = 5;
                                }
                                $.ajax({
                                    url : 'http://115.29.151.198/updateGiftBox/',
                                    type : 'GET',
                                    data : {'boxId':boxId,'index':index,'wxOpenId':wxOpenId},
                                    dataType : "jsonp",
                                    jsonp : "callback",
                                    success : function(data){
                                        $('.loading').hide();
                                        $('.status3 p').html('你已帮朋友拆开了礼盒<br/>我也来领一个吧');
                                        $('.status3 .btn1').html('领取礼盒');
                                        $('.status3 .btn').hide();
                                        $('.status3').show();
                                        return false;
                                    }
                                });
                            }
                        }
                    }
                }
            });
        }
    },

    onShare             =   function(){
        $('.share-page').show();
    },

    onSharePage         =   function(){
        $('.share-page').hide();
    },

    onFormShow          =   function(){
        $('.status3').hide();
        $('.form').show();
        return false;
    },

    onSub               =   function(){
        if( $('.name').val() == '' || $('.phone').val() == '' ){
            alert('请填写完整信息');
        }
        else{
            $.ajax({
                url : 'http://115.29.151.198/setInfo/',
                type : 'GET',
                data : {'boxId':boxId, "name":$('.name').val(), "phone":$('.phone').val(), "year": $('.year').val(), "month": $('.month').val()},
                dataType : "jsonp",
                jsonp : "callback",
                success : function(data){
                    alert('提交成功');
                    window.location = 'http://x.onetsm.com/article/show/386b2a3312674554bc17b9bbc1e66013?wx_open_id=om9ecjj0pM8XaVxqLYNea_UPPo-I&from=singlemessage&isappinstalled=0';
                }
            });
        }
    },

    bindEventListener	=	function(){
        $('.share').on('touchend',onShare);
        $('.share-page').on('touchend',onSharePage);
        $('.form-btn').on('touchend',onFormShow);
        $('.submit').on('touchend',onSub);
    };

    $(init);
})()



