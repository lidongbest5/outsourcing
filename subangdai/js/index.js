(function(){
    "use strict";
    var $win 		=	$('html.one-screen'),

    	win_width 	=	$win.width(),
    	win_height 	=	$win.height(),
    	alpha 		=	win_height/1136,
        height_alpha =  (160*win_height)/(win_width*1136),

        curX,
        startX,

        cur_page    =   0,
        is_uploaded     =   0,
        total           =   0,

        localIds,
        audioElement,
        audio_flag      =   false,
        endNextPage     =   false,
        endCurrPage     =   false,
        isAnimating     =   false,

        img_id,

        flag            =   false,
        score           =   0,
        score_index     =   0,

        loaded_index    =   0,

        x,
        y,
        z,
        last_x,
        last_y,
        last_z,
        SHAKE_THRESHOLD = 2000,
        last_update = 0,

        wxOpenId,
        boxId,

    init			=	function(){
        setIndexPage();
        checkParam();
    	bindEventListener();
        setShare('哎哟我去，总共四个活动，三个都能抽奖，别说我不告诉你啊');
    },

    getUrlParam     =   function(name) {
        var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.href.match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    },

    getBoxId            =   function(){
        return window.location.href.split('boxId=')[1].split('&')[0];
    },

    checkParam          =   function(){
        wxOpenId        =   getUrlParam('wgateid');

        if( window.location.href.indexOf('boxId') != -1 ){
            $('.project').hide();
            setProject4();
            boxId   =   getBoxId();
            $.ajax({
                url : 'http://www.edco.cn/getGiftBox1/',
                type : 'GET',
                data : {'boxId':boxId},
                dataType : "jsonp",
                jsonp : "callback",
                success : function(data){
                    setShare('爆竹声声除旧岁，叮叮当当来破五','boxId='+ boxId);
                    if( wxOpenId == data.ownerid ){
                        if( data.guest5 != null ){
                            $('.project4 .page6').addClass('pt-page-current').siblings().removeClass('pt-page-current');
                            return false;
                        }
                        var open, left;
                        if( data.guest1 == null ){
                            open = 0;
                            left = 5;
                        }
                        else if( data.guest2 == null ){
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
                        $('.project4 .page5').addClass('pt-page-current').siblings().removeClass('pt-page-current');
                        $('.project4 .page5').find('span').html(open);
                        return false;
                    }
                    else{
                        if( wxOpenId == data.guest1 || wxOpenId == data.guest2 || wxOpenId == data.guest3 || wxOpenId == data.guest4 || wxOpenId == data.guest5 ){

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
                                url : 'http://www.edco.cn/updateGiftBox1/',
                                type : 'GET',
                                data : {'boxId':boxId,'index':index,'wxOpenId':wxOpenId},
                                dataType : "jsonp",
                                jsonp : "callback",
                                success : function(data){
                                    
                                }
                            });
                        }
                        $('.project4 .page4').addClass('pt-page-current').siblings().removeClass('pt-page-current');
                    }
                }
            });
        }

        if( window.location.href.indexOf('project4') != -1 ){
            setProject4();
        }
    },

    setIndexPage 		=	function(){
        $('.index-main img').height(win_height);
    	$('.item1').css({'height': 284*alpha, 'top': 96*alpha});
    	$('.item2').css({'height': 205*alpha, 'top': 398*alpha});
    	$('.item3').css({'height': 220*alpha, 'top': 628*alpha});
    	$('.item4').css({'height': 269*alpha, 'top': 842*alpha});
        $('.loading').hide();
    },

    initDragend         =   function(){
        $(".project1 .dragend-container").dragend({
            direction: "vertical",
            stopPropagation: true,
            minDragDistance: 10,

            onDragEnd: function(a, b, page, d){
                if( cur_page != page ){
                    if( page == 0){
                        setPage1();
                    }
                    else if( page == 1 ){
                        var $dom        =   $('.project1 .page2');
                        setTextAnimation($dom.find('.title').show(), 'zoomInLeft');
                        setTextAnimation($dom.find('.text').show(), 'rotateInUpRight');
                    }
                    else if( page == 2 ){
                        var $dom        =   $('.project1 .page3');
                        setTextAnimation($dom.find('.title').show(), 'fadeInDown');
                        setTextAnimation($dom.find('.text').show(), 'zoomInRight');
                    }
                    else if( page == 3 ){
                        var $dom        =   $('.project1 .page4');
                        setTextAnimation($dom.find('.title').show(), 'bounceInUp');
                        setTextAnimation($dom.find('.text').show(), 'rotateInDownRight');
                    }
                    else if( page == 4 ){
                        var $dom        =   $('.project1 .page5');
                        setTextAnimation($dom.find('.title').show(), 'lightSpeedIn');
                        setTextAnimation($dom.find('.text').show(), 'fadeInUp');
                    }
                    else if( page == 5 ){
                        var $dom        =   $('.project1 .page6');
                        setTextAnimation($dom.find('.submit').show(), 'fadeInDown');
                        setTextAnimation($dom.find('.upload').show(), 'fadeInDown');
                    }
                }
                cur_page    =   page;
            }
        });
    },

    setPage1           =    function(){
        initDragend();
        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'images/project1/bg.mp3');
        audioElement.load();
        audioElement.loop=true;
        audioElement.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        bindEventListener();
    },

    setPage2            =   function(){
            $('.pt-page').each( function() {
                var $page = $( this );
                $page.attr( 'originalClassList', $page.attr( 'class' ) );
            } );
            if( $(window).height() < 480 ){
                $('.project2 .q, .project2 .holder img').width('80%');
                $('.project2 .holder').css('margin-top', 0);
                $('.project2 .top').css('margin-top', '-20px');
            }
            bindEventListener();
    },

    setPage3            =   function(){
        $(".project3 .dragend-container").dragend({
            direction: "vertical",
            stopPropagation: true,
            minDragDistance: 20,

            onDragEnd: function(a, b, page, d){
                if( cur_page != page ){
                    if( page == 0){
                        onProject3Start();
                    }
                    else if( page == 1 ){
                        
                    }
                }
                cur_page    =   page;
            }
        });

        var data        =   [{'img':'images/project3/q1.png','q':'中国中央电视台春节联欢晚会是每年农历除夕晚上为庆祝农历新年直播的综艺晚会。请问春晚是在哪里播出？','a':[{'a':'BBC','flag':'false'},{'a':'CNN','flag':'false'},{'a':'CCTV','flag':'true'},{'a':'宇宙TV','flag':'false'}]},
            {'img':'images/project3/q2.png','q':'主持央视春晚的第一位女主持人是谁？','a':[{'a':'刘晓庆','flag':'true'},{'a':'赵忠祥','flag':'false'},{'a':'赵本山','flag':'false'},{'a':'倪萍','flag':'false'}]},
            {'img':'images/project3/q3.png','q':'“你就像那冬天里的一把火，熊熊火焰温暖了我。”使他一夜之间成为了全中国男女老少都热爱的大众情人，请问他是？','a':[{'a':'迈克尔杰克逊','flag':'false'},{'a':'刘翔','flag':'false'},{'a':'费翔','flag':'true'},{'a':'罗文','flag':'false'}]},
            {'img':'images/project3/q4.png','q':'1984年春节晚会首次邀请了香港歌手，他身着中山装演唱的《我的中国心》立刻风靡了大江南北，请问他叫什么名字？','a':[{'a':'罗文','flag':'false'},{'a':'张明敏','flag':'true'},{'a':'张学友','flag':'false'},{'a':'潘安邦','flag':'false'}]},
            {'img':'images/project3/q5.png','q':'16年后陈佩斯重返春晚，请问以下哪一个不是陈佩斯在央视春晚上曾经演出的小品？','a':[{'a':'主角与配角','flag':'false'},{'a':'吃面条','flag':'false'},{'a':'拍电影','flag':'false'},{'a':'卖拐','flag':'true'}]},
            {'img':'images/project3/q6.png','q':'2005年春晚，中国21个平均年龄21岁的聋哑演员将舞蹈演绎得惟妙惟肖，赢得了全国观众“激动、流泪”的评价。请问该舞蹈的名称是什么？','a':[{'a':'盛世欢歌','flag':'false'},{'a':'千手观音','flag':'true'},{'a':'古韵龙腾','flag':'false'},{'a':'金蛇狂舞','flag':'false'}]},
            {'img':'images/project3/q7.png','q':'被誉为第一代小品王、小品太后的赵丽蓉先后8年的除夕夜为大家带去欢乐，请问“司马光砸光”这句经典台词曾经出现在哪个小品当中？','a':[{'a':'英雄母亲的一天','flag':'true'},{'a':'妈妈的今天','flag':'false'},{'a':'如此包装','flag':'false'},{'a':'老将出马','flag':'false'}]},
            {'img':'images/project3/q8.png','q':'《难忘今宵》是一首饱含情感的歌曲，作为每年春节联欢晚会的保留节目，问此歌曲一般在晚会的什么时候演唱？','a':[{'a':'结尾压轴','flag':'true'},{'a':'开始起头','flag':'false'},{'a':'中间部分','flag':'false'},{'a':'随机出现','flag':'false'}]},
            {'img':'images/project3/q9.png','q':'他连续主持过15届春节晚会，他与倪萍当年的黄金组合实际上也经历了春节晚会最辉煌的一段时期。他是？','a':[{'a':'毕福剑','flag':'false'},{'a':'朱军','flag':'false'},{'a':'赵忠祥','flag':'true'},{'a':'董卿','flag':'false'}]},
            {'img':'images/project3/q10.png','q':'冯巩，相声表演艺术家，作为央视“春晚专业户”，曾经参加过29次春晚演出。请问以下哪一位演员没有在春晚与冯巩合作过？','a':[{'a':'牛群','flag':'false'},{'a':'刘伟','flag':'false'},{'a':'马季','flag':'true'},{'a':'郭冬临','flag':'false'}]},
            {'img':'images/project3/q11.png','q':'用脖子和肩膀倒立在搭档的肩膀上；仅靠搭档双手支撑，身体倾向90度；双人水平叠落……请问这个节目属于那种艺术形式？','a':[{'a':'相声','flag':'false'},{'a':'杂技','flag':'true'},{'a':'舞蹈','flag':'false'},{'a':'二人转','flag':'false'}]},
            {'img':'images/project3/q12.png','q':'2010年除夕，时隔12年，王菲再次登上央视虎年春晚舞台。请问王菲在2010年春晚上演唱的是哪一首歌？','a':[{'a':'传奇','flag':'true'},{'a':'因为爱情','flag':'false'},{'a':'相约九八','flag':'false'},{'a':'又见炊烟','flag':'false'}]},
            {'img':'images/project3/q13.png','q':'见证奇迹的时刻、穿帮、托儿······2009年刘谦带着他的魔术登上春晚舞台，请问给他当托的是？','a':[{'a':'冬日娜','flag':'false'},{'a':'董卿','flag':'true'},{'a':'金龟子','flag':'false'},{'a':'朱迅','flag':'false'}]},
            {'img':'images/project3/q14.png','q':'在春晚上，以下哪种节目你从没见过？','a':[{'a':'哑剧','flag':'false'},{'a':'评书','flag':'false'},{'a':'猜谜游戏','flag':'false'},{'a':'歌剧','flag':'true'}]},
            {'img':'images/project3/q15.png','q':'2014年春节联欢晚会上，在现场数千观众和电视机前数亿观众见证下，有人持续旋转4个多小时，请问她是？','a':[{'a':'小红旗','flag':'false'},{'a':'小山楂','flag':'false'},{'a':'小圈圈','flag':'false'},{'a':'小彩旗','flag':'true'}]},
            {'img':'images/project3/q16.png','q':'马季先生作为新相声的代表人物，是近现代相声艺术承前继后的关键人物,下图是他的哪一部作品？','a':[{'a':'宇宙牌香烟','flag':'true'},{'a':'五官争功','flag':'false'},{'a':'吹牛','flag':'false'},{'a':'老少乐','flag':'false'}]},
            {'img':'images/project3/q17.png','q':'2013蛇年春晚，一位被外媒誉为20世纪90年代至今的跨世纪天后歌手与宋祖英合唱一首中国民歌《茉莉花》，请问该女歌手叫什么名字？','a':[{'a':'苏菲·玛索','flag':'false'},{'a':'席琳·迪翁','flag':'true'},{'a':'玛丽亚·凯莉','flag':'false'},{'a':'碧昂斯·诺里斯','flag':'false'}]},
            {'img':'images/project3/q18.png','q':'在2013年蛇年央视春晚的舞台上，有一个人吸引了史无前例的注意力，他就是郭德纲。请问于谦老师的三大爱好是？','a':[{'a':'抽烟喝酒烫头','flag':'true'},{'a':'吃肉麻将桌游','flag':'false'},{'a':'攒钱攒钱攒钱','flag':'false'},{'a':'养猫养马养狗','flag':'false'}]},
            {'img':'images/project3/q19.png','q':'因在春晚上穿着蓝色工作服，遭网友调侃“将爱马仕穿成蓝翔工人服”，这位首登春晚的影帝是？','a':[{'a':'刘烨','flag':'false'},{'a':'张涵予','flag':'false'},{'a':'王宝强','flag':'false'},{'a':'黄渤','flag':'true'}]},
            {'img':'images/project3/q20.png','q':'一首《爱的奉献》唱红了全国，脍炙人口，至今仍然经久不衰地被传唱。同时，它也将演唱者的演艺事业推上了巅峰。请问图中美女是？','a':[{'a':'蔡明','flag':'false'},{'a':'宋祖英','flag':'false'},{'a':'韦唯','flag':'true'},{'a':'那英','flag':'false'}]}];

        
        if( !flag ){
            var temp_arr    =   data.sort(randomsort),
                temp        =   '';
            for( var i = 0; i < 15; i++ ){
                temp    +=  '<div class="q'+(i+1)+' q"><div class="q-con"><img src="'+temp_arr[i].img+'"><div class="qq">'+(i+1)+'、'+temp_arr[i].q+'</div><div class="a-container">';
                    for( var m = 0; m < 4; m++ ){
                        temp    +=  '<div class="a'+(m+1)+'" data-flag="'+temp_arr[i].a[m].flag+'"><i></i>'+temp_arr[i].a[m].a+'</div>'
                    }
                temp    +=    '</div></div></div>';
            }

            $('.project3 .page2 .qq-container').html($(temp)).find('.q').width($(window).width());

            flag        =   true;
        }

        onProject3Start();
        bindEventListener();
    },

    setPage4            =   function(){
        $('.pt-page').each( function() {
            var $page = $( this );
            $page.attr( 'originalClassList', $page.attr( 'class' ) );
        } );
        if( $(window).height() < 480 ){
            $('html body .project4 .page2 .i1').css('margin','10px auto 10px auto');
            $('html body .project4 .page2 .i5').css('margin-top','0px');
            $('html body .project4 .page4 .r1').css('margin-top','20px');
            $('html body .project4 .page5 div').css('bottom','-100px');
            $('html body .project4 .page6 .r1').css('margin-bottom','0px');
        }
    },

    randomsort          =   function(a, b) {  
        return Math.random() > 0.5 ? -1 : 1;  
    },

    onProject3Start     =   function(){
        $('.project3 .page1').addClass('animated');
    },

    setTextAnimation    =   function($ele, className){
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    onIndexItemMove    =   function( e ){
        e              =    e.originalEvent || e;
        e.preventDefault();

        var el         =    $(this),
            touch      =    e.touches[0],
            data_id    =    el.attr('data-id');

        curX = touch.pageX - startX;

        if( curX < 0 ){
            return false;
        }
        else if( curX > win_width - startX - 50 ){
            if( !loaded_index ){
                el.hide();
                $('.project').hide();
                if( data_id == '1' ){
                    setProject1();
                    $('.upload').on('touchend', onUpload);
                    $('.submit').on('touchend', onSubmit1);
                    $('.bg, .upload-failed').on('touchend', onHideBg);
                    $('.music').on('touchend', onAudio);
                    $('.upload input').on('change', onUploadSuccess);
                }
                else if( data_id == '2' ){
                    setProject2();
                    $('.project2 .index-page .i3').on('touchend', onStart);
                    $('.project2 .second-page .i').on('touchend', onSelectInfo);
                    $('.project2 .next').on('touchend', onNext);
                    $('.project2 .a').on('touchend', onAnswer);
                    $('.project2 .page6 .r-con').on('touchend', onResult);
                    $('.project2 .page7 .r-con').on('touchend', onShare);
                    $('.project2 .page7 .share').on('touchend', onShareClose);
                }
                else if( data_id == '3' ){
                    setProject3();
                    if( $(window).height() > 600 ){
                        $('html body .project3 .dragend-container .page2 .q-container .qq-container .q .q-con').css('top','20%');
                    }
                    $('.project3 .page2 .a-container div').on('touchend', onScore);
                    $('.project3 .page2 .next').on('touchend', onScoreNext);
                    $('.project3 .page2').on('touchmove', function(){return false;});
                    $('.project3 .submit').on('touchend', onSubmit2);
                    $('.project3 .result-page').on('touchend', onShare1);
                    $('.project3 .share-page').on('touchend', onShareClose1);
                }
                else if( data_id == '4' ){
                    setProject4();
                }
                loaded_index    =   1;
            }
        }

        el.css('-webkit-transform','translate3d('+ curX +'px,'+ -curX*height_alpha +'px,0)');
    },

    setProject1        =    function(){
        $('.project1').show();
        $('.index-main').addClass('pt-page-rotateFall');
        setPage1();
        onAudioStart();
        setTimeout(function(){
            var $dom        =   $('.project1 .page1');
            setTextAnimation($dom.find('.title').show(), 'lightSpeedIn');
            setTextAnimation($dom.find('.text').show(), 'fadeInUp');
            $('.index-main').hide();
        },1000);
        setShare('一篇让我默默无语的微信，真的应该放下手机，陪爸妈一起出去走走了。', 'project1');
    },

    setProject2        =    function(){
        $('.index-main').addClass('pt-page-rotateFall');
        $('.project2').show();
        setPage2();
        $('.project2 .index-page').addClass('animated');
        setTimeout(function(){
            $('.index-main').hide();
        },1000);
        setShare('来，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
    },

    setProject3        =    function(){
        $('.index-main').addClass('pt-page-rotateFall');
        $('.project3').show();
        setPage3();
        setShare('骚年，别光吐槽，试试你对春晚知多少？', 'project3');
        setTimeout(function(){
            $('.index-main').hide();
        },1000);
    },

    setProject4        =    function(){
        $('.index-main').addClass('pt-page-rotateFall');
        $('.project4').show();
        setPage4();
        setTimeout(function(){
            $('.index-main').hide();
        },1000);
        $('.project4 .page1').on('touchend', onProject4Start);
        $('.project4 .page2 .i5').on('touchend', onProject4Result);
        $('.project4 .page3 img').on('touchend', onProject4Share);
        $('.project4 .page3 .share').on('touchend', onProject4ShareClose);
        $('.project4 .page6 .r2').on('touchend', onProject4Info);
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    },

    onIndexItemStart   =   function( e ){
        e              =    e.originalEvent || e;

        var touch      =    e.touches[0];
        startX         =    touch.pageX;
    },

    onIndexItemEnd      =   function(){
        $(this).css('-webkit-transform','translate3d(0,0,0)');
    },

    onUpload            =   function(){
        // $(this).find('input').trigger('click');
        wx.ready(function(){
            wx.chooseImage({
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    wx.uploadImage({
                        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            is_uploaded     =   1;
                            img_id         =    serverId;

                            $('.upload').hide();
                            $('.upload-success, .tips').fadeIn();
                        }
                    });
                }
            });
        });
    },

    onSubmit1           =   function(){
        if( !is_uploaded ){
            $('.bg, .upload-failed').show();
        }
        else{
            if( $('.upload-success').css('display') != 'none' ){
                $('.upload-success').fadeOut();
                setTextAnimation($('.name').show(), 'fadeInDown');
                setTextAnimation($('.phone').show(), 'fadeInDown');
            }
            else{
                if( $('.name input').val().length && $('.phone input').val().length ){
                    $('.upload-success').fadeIn();
                    $('.name, .submit, .phone').hide();
                    $.ajax({
                        url: 'http://edco.cn/project/api1/',
                        dataType:'jsonp',
                        data:{name:$('.project1 .name input').val(), phone: $('.project1 .phone input').val(), img: img_id},
                        jsonp:'jsonp_callback',
                        success: function(){

                        },
                    });
                }
                else{
                    alert('请完整填写资料');
                }
            }
        }
    },

    onUploadSuccess     =   function(){
        is_uploaded     =   1;

        $('.upload').hide();
        $('.upload-success, .tips').fadeIn();
    },

    onHideBg            =   function(){
        $('.bg, .upload-failed').hide();
    },

    onAudio             =   function(){
        if( $(this).hasClass("music-close") ){
            audioElement.play();
            $(this).removeClass('music-close');
        }
        else{
            audioElement.pause();
            $(this).addClass('music-close');
        }
    },

    onAudioStart        =   function(){
        if( !audio_flag ){
            audio_flag  =   true;
            audioElement.play();
        }
    },

    onRotate            =   function($currPage, $nextPage){
        var outClass = 'pt-page-scaleDown',
            inClass = 'pt-page-moveFromBottom pt-page-delay200';

        $nextPage.addClass('pt-page-current');

        $currPage.addClass( outClass ).on( 'webkitAnimationEnd', function() {
            $currPage.off( 'webkitAnimationEnd' );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        $nextPage.addClass( inClass ).on( 'webkitAnimationEnd', function() {
            $nextPage.off( 'webkitAnimationEnd' );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );
    },

    onEndAnimation        =   function( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    },

    resetPage             =    function( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.attr( 'originalClassList' ) ).removeClass('pt-page-current');
        $inpage.attr( 'class', $inpage.attr( 'originalClassList' ) + ' pt-page-current' );
    },

    onStart             =   function(){
        onRotate($('.project2 .index-page'), $('.project2 .second-page'));
    },

    onSelectInfo        =   function(){
        $(this).addClass('selected').siblings().removeClass('selected');
    },

    onNext              =   function(){
        if( $(this).closest('.pt-page').hasClass('page5') ){
            if( total == 0 ){
                $('.project2 .page6 .r-con').html('<img src="images/project2/btn2.png">');
                $('.project2 .page7 .r-con').html('<img src="images/project2/result1.jpg">');
                onRotate($(this).closest('.pt-page'),$('.project2 .page6'));
                setShare('我是理智型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
                return false;
            }
            else if( total < 6000 ){
                $('.project2 .page7 .r-con').html('<img src="images/project2/result1.jpg">');
                setShare('我是理智型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
            }
            else if( total < 8000 ){
                $('.project2 .page7 .r-con').html('<img src="images/project2/result4.jpg">');
                setShare('我是经济型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
            }
            else if( total <= 10000 ){
                $('.project2 .page7 .r-con').html('<img src="images/project2/result3.jpg">');
                setShare('我是小资型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
            }
            else{
                $('.project2 .page6 .r-con').html('<img src="images/project2/btn1.png">');
                $('.project2 .page7 .r-con').html('<img src="images/project2/result2.jpg">');
                onRotate($(this).closest('.pt-page'),$('.project2 .page6'));
                setShare('我是土豪型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
                return false;
            }
            onRotate($(this).closest('.pt-page'),$('.project2 .page7'));
            return false;
        }
        if( total > 10000 ){
            $('.project2 .page6 .r-con').html('<img src="images/project2/btn1.png">');
            $('.project2 .page7 .r-con').html('<img src="images/project2/result2.jpg">');
            onRotate($(this).closest('.pt-page'),$('.project2 .page6'));
            setShare('我是土豪型新年财运，测一下你的新年财运吧，让我看看你的财运是什么样的！', 'project2');
        }
        else{
            onRotate($(this).closest('.pt-page'),$(this).closest('.pt-page').next());
        }
    },

    onAnswer            =   function(){
        var value       =   parseInt($(this).attr('data')),
            pre_value   =   $(this).parent().find('.selected').length ? parseInt($(this).parent().find('.selected').attr('data')) : 0;

        total           =   total - pre_value + value;

        $(this).addClass('selected').siblings().removeClass('selected');
    },

    onResult            =   function(){
        onRotate($(this).closest('.pt-page'),$('.project2 .page7'));
    },

    onShare             =   function(){
        $('.project2 .share').show();
    },

    onShareClose        =   function(){
        $('.project2 .share').hide();
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: share_title,
                link: window.location.origin + window.location.pathname + '?' + hash,
                imgUrl: 'http://www.magiceyes.com.cn/projects/subangdai/images/logo.png',
                success: function () {},
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: share_title,
                desc: '', 
                link: window.location.origin + window.location.pathname + '?' + hash,
                imgUrl: 'http://www.magiceyes.com.cn/projects/subangdai/images/logo.png',
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
        });
    },

    onScore             =   function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        return false;
    },

    onScoreNext         =   function(e){
        var $dom        =   $('.project3 .page2 .q').eq(score_index);
        if( score_index == 14 ){
            if( score <= 5 ){
                $('.project3 .result-page').addClass('result1');
                setShare('哈哈哈，暴露年龄的时候到了，原来我是春晚淡定理智粉。', 'project3');
            }
            else if( score <= 10 ){
                $('.project3 .result-page').addClass('result2');
                setShare('哈哈哈，暴露年龄的时候到了，原来我是春晚路人粉。', 'project3');
            }
            else{
                $('.project3 .result-page').addClass('result3');
                setShare('哈哈哈，暴露年龄的时候到了，原来我是春晚骨灰级粉。', 'project3');
            }

            var a       =   ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
            $('.project3 .dragend-container').fadeOut();
            $('.project3 .result-page').fadeIn();

            if( Math.random() < 1 ){
                if( !readCookie('subangdai3') ){
                    createCookie('subangdai3','1',100);
                    setTimeout(function(){
                        $('.project3 .prize-page .code').html( a.sort(randomsort).toString().replace(/,/g,'').substring(0,8) );
                        $('.project3 .result-page').fadeOut();
                        $('.project3 .prize-page').fadeIn();
                    },1000)
                }
            }
        }
        else{
            if( $dom.find('.selected').length ){
                if( $dom.find('.selected').attr('data-flag') == 'true' ){
                    score++;
                }
                score_index++;
                $('.project3 .page2 .qq-container').animate({'left': -$(window).width()*score_index},1000);
            }
        }

        e.preventDefault();
        return false;
    },

    setTextAnimation    =   function($ele, className){
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    createCookie        =   function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },

    readCookie          =   function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },

    onSubmit2           =   function(){
        if( $('.project3 .name').val().length != 0 && $('.project3 .phone').val().length != 0 ){
            $.ajax({
                url: 'http://edco.cn/project/api2/',
                dataType:'jsonp',
                data:{name:$('.project3 .name').val(), phone: $('.project3 .phone').val(), code: $('.project3 .code').html()},
                jsonp:'jsonp_callback',
                success: function(){
                },
            });
            $('.project3 .submit').hide();
            $('.project3 .success').show();
            onShare1();
        }
        else{
            alert('请完整填写资料');
        }

        return false;
    },

    onShare1            =   function(){
        $('.project3 .share-page').show();
    },

    onShareClose1       =   function(){
        $('.project3 .share-page').hide();
    },

    onProject4Share     =   function(){
        $('.project4 .share').show();
    },

    onProject4ShareClose    =   function(){
        $('.project4 .share').hide();
    },

    onProject4Start     =   function(){
        onRotate($('.project4 .page1'), $('.project4 .page2'));
        $.ajax({
            url : 'http://www.edco.cn/setGiftBox1/',
            type : 'GET',
            data : {'wxOpenId':wxOpenId},
            dataType : "jsonp",
            jsonp : "callback",
            success : function(data){
                boxId = data;
                setShare('爆竹声声除旧岁，叮叮当当来破五','boxId='+ boxId);
            }
        });
    },

    deviceMotionHandler  =  function(eventData) {
    　　var acceleration = eventData.accelerationIncludingGravity; 

    　　var curTime = new Date().getTime(); 
    　　var diffTime = curTime -last_update;
    　　if (diffTime > 100) {
    　　　　last_update = curTime; 

    　　　　x = acceleration.x; 
    　　　　y = acceleration.y; 
    　　　　z = acceleration.z; 

    　　　　var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; 

    　　　　if (speed > SHAKE_THRESHOLD) { 
    　　　　　　$('.project4 .page2 .i2').css('visibility','hidden');
    　　　　　　$('.project4 .page2 .i3').addClass('shake');
    　　　　　　$('.project4 .page2 .i4').addClass('qian');
    　　　　　　$('.project4 .page2 .i5').css('display','block');
    　　　　}

    　　　　last_x = x; 
    　　　　last_y = y; 
    　　　　last_z = z; 
    　　} 
    },

    onProject4Result    =   function(){
        var random      =   Math.random(),
            className;
        if( random < 0.25 ){
            className   =   'r1';
        }
        else if( random < 0.5 ){
            className   =   'r2';
        }
        else if( random < 0.75 ){
            className   =   'r3';
        }
        else if( random < 1 ){
            className   =   'r4';
        }
        $('.project4 .page3 .result').addClass(className);
        onRotate($('.project4 .page2'), $('.project4 .page3'));
    },

    onProject4Info      =   function(){
        if( $('.project4 .page6 .name').val().length && $('.project4 .page6 .phone').val().length ){
            $.ajax({
                url : 'http://www.edco.cn/setInfo1/',
                type : 'GET',
                data : {'boxId':boxId, "name":$('.project4 .page6 .name').val(), "phone":$('.project4 .page6 .phone').val()},
                dataType : "jsonp",
                jsonp : "callback",
                success : function(data){
                    $('.project4 .page6 .r2').hide();
                    $('.project4 .page6 .success').show();
                }
            });
        }
        else{
            alert('请填写完整内容!');
        }
    },

    bindEventListener	=	function(){
        $('.index-item').on('touchstart', onIndexItemStart);
        $('.index-item').on('touchmove', onIndexItemMove);
        $('.index-item').on('touchend', onIndexItemEnd);
    };

    $(init);
})();



