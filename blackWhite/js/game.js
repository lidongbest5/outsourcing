(function($){
    "use strict";

    //变量设置和dom缓存
    var win_width           =   $(window).width(),                  //窗口可视高
        win_height          =   $(window).height(),                 //窗口可视宽

        ID                  =   "gameView",
        $dom                =   $("#" + ID),
        $header             =   $dom.find("header"),
        $content            =   $dom.find(".content"),
        $time               =   $dom.find(".time"),
        $failure            =   $dom.find(".failure-modal"),
        $point              =   $dom.find(".point"),

        game_started        =   false,                              //游戏开始标识
        game_timer          =   6000,                               //游戏时间 -- 毫秒
        game_array          =   [{"class"   :   "logo1",
                                  "type"    :   "plus"},
                                 {"class"   :   "logo2",
                                  "type"    :   "multi"},
                                 {"class"   :   "logo3",
                                  "type"    :   "minus"},
                                 {"class"   :   "logo4",
                                  "type"    :   "minus"}],          //四个图标的属性
        game_limit          =   4,
        game_point          =   0,                                  //游戏分数
        game_index          =   1,                                  //每行的id值，递增
        game_scroll_index   =   0,                                  //当前用户点击的id
        game_row_limit      =   2,
        game_block_width    =   win_width/4,                        //区块的宽度
        game_block_count    =   0,                                  
        game_row_template   =   ['<div class="row">',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                '</div>'],                          //每行的html模板

        game_start_time     =   null,                               
        game_time_inter     =   null,

        bottom              =   0,

        ad                  =   '9月15日~19日 GE全球客户周 | 9月16日GE医疗中国第三季客户日 | 聚焦客户，精彩无限！',   //广告
        ad_inter,
        ad_count            =   0,
        ad_width,

    init                    =   function(){
        //游戏的可玩时间逻辑，之前用的是cookie写的，这里注释掉了，请替换为新的逻辑代码
        // var cookie          =   Number(Cookies.get('ge_time'));
        // if( cookie < 0 ){
        //     window.location = '/ge/fail';
        // }

        setHeight();            //设置可视区域的高度

        setInitialContent();    //设置区块

        setAd();                //设置广告

        bindEventLisner();      //绑定事件
    },

    setHeight               =   function(){
        $dom.height(win_height);
        $header.height(win_width*107/640);
        $dom.find('.minus-account').css({"top":30*win_height/568,"left":58*win_width/320});
        $dom.find('.plus-account').css({"top":30*win_height/568,"left":167*win_width/320});
        $dom.find('.multi-account').css({"top":30*win_height/568,"left":271*win_width/320});
    },

    setAd                   =   function(){     //广告展示逻辑
        $('body').append('<div class="ad"><div class="ad-wrapper"><div class="ad-con">'+ ad +'</div></div></div>');
        ad_width = parseInt($('.ad-con').width());
        ad_inter = window.setInterval(function(){
            ad_count += 5;
            if( ad_count > ad_width - win_width + 20 ){
                ad_count = -20;
            }
            $('.ad-wrapper').css("-webkit-transform",'translate3D(-'+ ad_count +'px,0,0)');
        },100);
    },

    setContent              =   function(){     //设置区块
        var is_bonus        =   false;
        for( var i = 0; i < 800; i++ ){         //游戏开始前就把游戏区块全部设置好，这里设置的是800行的区块，不知道是否少
            var temp            =   $(game_row_template.join("")).prependTo($content);
            if( i > 10 && !is_bonus ){          //大于10行之后开始有炸弹
                var ran     =   Math.floor(Math.random()*100);
                if( ran > 80 ){                  //20%的几率会出现炸弹
                    temp.find('.row-block').eq(getRandom()).append(renderBoom());
                    is_bonus    =   true;
                    continue;
                }
            }
            if( i > 40 && !is_bonus ){          //大于40行之后开始有时间
                var ran     =   Math.floor(Math.random()*100);      
                if( ran > 94 ){                 //5%的几率会出现
                    temp.find('.row-block').eq(getRandom()).append(renderTime());
                    is_bonus    =   true;
                    continue;
                }
            }
            temp.find('.row-block').eq(getRandom()).append(renderBlock());
            is_bonus    =   false;
        }
    },

    setTime                 =   function(){     //时间设置的逻辑，每10毫秒跑一次
        game_timer--;
        if( game_timer <= 0 ){
            gameOver();
            $time.html('&nbsp;&nbsp;00\'00\'\'');
            showModal("时间到!");
        }
        else{
            var time_text = (100000 + game_timer + '').substr(-4,4);
            time_text = '&nbsp;&nbsp;' + time_text.substr(0,2) + "'" + time_text.substr(2) + "''";
            $time.html(time_text);
        }
    },

    setpoint                =   function( dom ){        //游戏分数逻辑，包括每种区块的数量
        var type            =   dom.attr("data-type"),
            point_con       =   $dom.find('.' + type + '-account'),
            now_point       =   parseInt( point_con.html() );

        now_point           =   ++now_point < 10 ? '0' + now_point : now_point;

        point_con.html( now_point );                    //设置区块的数量+1

        game_point          += 10;

        $point.html( game_point );                      //设置游戏分数

        game_scroll_index   =   parseInt( dom.attr('data-index') );     //设置当前点击区块的id
    },

    setInitialContent       =   function(){             //初始设置游戏内容
        setContent();
    },

    getRandom               =   function(){             //获取随机数
        return Math.floor(Math.random()*game_limit);   
    },

    renderBlock             =   function(){             //渲染普通区块
        var random          =   getRandom();
        return $('<img src="/common/ge/images/game_logo'+ (random+1) +'.png" class="game-block '+ game_array[random].class +'" data-type="'+ game_array[random].type +'" data-index="'+ game_index++ +'">');
    },

    renderTime              =   function(){             //渲染时间区块
        return $('<img src="/common/ge/images/game_time.png" class="game-block time-block" data-type="time" data-index="'+ game_index +'">');
    },

    renderBoom              =   function(){             //渲染炸弹区块
        return $('<img src="/common/ge/images/game_boom.png" class="game-block boom-block" data-type="boom" data-index="'+ game_index +'">');
    },

    screenRoll              =   function(){             //container上移一个区块位置
        bottom              +=  game_block_width
        $content.css('-webkit-transform','translate3D(0,'+ bottom +'px,0)');

    },

    onTouchBlock            =   function(){             //区块点击的逻辑
        var $this           =   $(this),
            block           =   $this.find('img'),
            type            =   block.attr('data-type'),
            index           =   parseInt( block.attr('data-index') );

        if( game_started ){
            if( block.length ){
                if( type == 'time' && index === game_scroll_index + 1 ){        //时间的逻辑处理
                    game_timer += 500;                                          //点击时间增加5秒
                    $this.remove();
                    screenRoll();
                    return false;
                }
                else if( type == 'boom' ){                                      //炸弹的逻辑处理
                    gameOver();                                                 //直接游戏结束
                    return false;
                }

                if( index === game_scroll_index + 1 ){                          //如果点击相邻的区块的话，越级点击的话不会做任何响应
                    screenRoll();
                    setpoint( block );

                    if( $this.parent().next().find('.time-block, .boom-block').length ){        //消除越过的时间或者炸弹区块
                        $this.parent().next().remove();
                    }
                }
            }
            else{
                gameOver();                                                     //点击空白处的话游戏结束
            }
        }
        else{
            if( block.length && parseInt(block.attr('data-index')) == 1 ){      //游戏的开始逻辑，如果点击的是第一个的话才会自动开始
                game_started    =   true;
                game_time_inter =   window.setInterval(setTime, 10);
                screenRoll();
                setpoint( block );
            }
        }
    },

    showModal               =   function(str){                                  //显示游戏结束的弹框
        $failure.show().find('span').html(str);
    },

    clearTime               =   function(){                                     //游戏时间的重置
        $time.html('&nbsp;&nbsp;60\'00\'\'');
        $point.html('00');
        $dom.find('.minus-account').html('00');
        $dom.find('.plus-account').html('00');
        $dom.find('.multi-account').html('00');
    },

    gameOver                =   function(){                                     //游戏结束的逻辑
        if( game_started ){                                                  //判断不会重复提交
            $.ajax({                                                         //后台通信设置积分
                url: '/ge/setScore',
                type: 'POST',
                data:{'score':game_point},
                success: function(){},
                error: function(){
                    alert('网络错误，请重试。')
                }
            });
        }
        // checkCookie();                                                       //设置cookie来减少游戏次数，这里注释掉了，请加入新的游戏次数的逻辑
        window.clearInterval(game_time_inter);
        game_started    =   false;
        showModal("失败!");
    },

    checkCookie             =   function(){
        var cookie          =   Number(Cookies.get('ge_time'));
        cookie--;
        Cookies.set('ge_time', cookie);
        if( cookie <= 0 ){
            window.location = '/ge/fail';
        }
    },

    restart                 =   function(){                                 //游戏的重新开始，重置一些参数
        game_index          =   1;
        game_scroll_index   =   0;
        game_point          =   0;
        game_timer          =   6000;
        bottom              =   0;

        $content.empty().css("-webkit-transform",'translate3D(0,0,0)');
        setInitialContent();
        $failure.hide();
        clearTime();
    },

    onAd                    =   function(){                                 //广告点击隐藏的逻辑
        $('.ad').remove();
        window.clearInterval(ad_inter);
    },

    bindEventLisner         =   function(){                                 //游戏事件
        $dom.on('touchstart', '.row-block', onTouchBlock);
        $failure.find('a').on('touchstart', restart);
        $('.ad').on('touchend',onAd);
    };

    $(init);                                                                //dom完毕后开始执行init
})(Zepto)



