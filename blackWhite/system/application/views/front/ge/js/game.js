(function($){
    "use strict";

    var win_width           =   $(window).width(),
        win_height          =   $(window).height(),

        ID                  =   "gameView",
        $dom                =   $("#" + ID),
        $header             =   $dom.find("header"),
        $content            =   $dom.find(".content"),
        $time               =   $dom.find(".time"),
        $failure            =   $dom.find(".failure-modal"),
        $point              =   $dom.find(".point"),

        game_started        =   false,
        game_timer          =   2000,
        game_array          =   [{"class"   :   "logo1",
                                  "type"    :   "plus"},
                                 {"class"   :   "logo2",
                                  "type"    :   "multi"},
                                 {"class"   :   "logo3",
                                  "type"    :   "minus"},
                                 {"class"   :   "logo4",
                                  "type"    :   "minus"}],
        game_limit          =   4,
        game_point          =   0,
        game_index          =   1,
        game_scroll_index   =   0,
        game_row_limit      =   2,
        game_block_width    =   win_width/4,
        game_block_count    =   0,
        game_row_template   =   ['<div class="row">',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                    '<div class="row-block" style="width:'+ game_block_width +'px;height:'+ game_block_width +'px;"></div>',
                                '</div>'],

        game_start_time     =   null,
        game_time_inter     =   null,

        bottom              =   0,

    init                    =   function(){
        setHeight();

        setInitialContent();

        bindEventLisner();
    },

    setHeight               =   function(){
        $dom.height(win_height);
        $header.height(win_width*107/640);
        $dom.find('.minus-account').css({"top":30*win_height/568,"left":58*win_width/320});
        $dom.find('.plus-account').css({"top":30*win_height/568,"left":167*win_width/320});
        $dom.find('.multi-account').css({"top":30*win_height/568,"left":271*win_width/320});
    },

    setContent              =   function(flag){
        var temp            =   $(game_row_template.join("")).prependTo($content);
        if( flag ){
            if( game_timer < 1000 ){
                var ran     =   Math.floor(Math.random()*10);
                if( ran > 6 ){
                    temp.find('.row-block').eq(getRandom()).append(renderBoom());
                    return false;
                }
            }
            if( game_timer < 500 ){
                var ran     =   Math.floor(Math.random()*10);
                if( ran > 7 ){
                    temp.find('.row-block').eq(getRandom()).append(renderTime());
                    return false;
                }
            }
        } 
        temp.find('.row-block').eq(getRandom()).append(renderBlock());
    },

    setTime                 =   function(){
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

    setpoint                =   function( dom ){
        var type            =   dom.attr("data-type"),
            point_con       =   $dom.find('.' + type + '-account'),
            now_point       =   parseInt( point_con.html() );

        now_point           =   ++now_point < 10 ? '0' + now_point : now_point;

        point_con.html( now_point );

        game_point          += 10;

        $point.html( game_point );

        game_scroll_index   =   parseInt( dom.attr('data-index') );
    },

    setInitialContent       =   function(){
        var row_len         =   Math.floor(win_height/game_block_width) + 1;
        while( row_len-- ){
            setContent(false);
        }
    },

    getRandom               =   function(){
        return Math.floor(Math.random()*game_limit);
    },

    renderBlock             =   function(){
        var random          =   getRandom();
        return $('<img src="images/game_logo'+ (random+1) +'.png" class="game-block '+ game_array[random].class +'" data-type="'+ game_array[random].type +'" data-index="'+ game_index++ +'">');
    },

    renderTime              =   function(){
        return $('<img src="images/game_time.png" class="game-block time-block" data-type="time" data-index="'+ game_index +'">');
    },

    renderBoom              =   function(){
        return $('<img src="images/game_boom.png" class="game-block boom-block" data-type="boom" data-index="'+ game_index +'">');
    },

    screenRoll              =   function(){
        bottom              +=  game_block_width
        $content.css('-webkit-transform','translate3D(0,'+ bottom +'px,0)');

    },

    onTouchBlock            =   function(){
        var $this           =   $(this),
            block           =   $this.find('img'),
            type            =   block.attr('data-type'),
            index           =   parseInt( block.attr('data-index') );

        if( game_started ){
            if( block.length ){
                if( type == 'time' && index == game_scroll_index ){
                    game_timer += 500;
                    $this.remove();
                    screenRoll();
                    setContent( false );
                    return false;
                }
                else if( type == 'boom' ){
                    gameOver();
                    return false;
                }

                if( index === game_scroll_index + 1 ){
                    setContent( true );
                    screenRoll();
                    setpoint( block );

                    if( game_timer < 1000 ){
                        $dom.find('.time-block, .boom-block').each(function(i){
                            if( parseInt($(this).attr('data-index')) <= index ){
                                $(this).remove();
                                screenRoll();
                                setContent( false );
                            }
                        });
                    }
                }
            }
            else{
                gameOver();
            }
        }
        else{
            if( block.length && parseInt(block.attr('data-index')) == 1 ){
                game_started    =   true;
                game_time_inter =   window.setInterval(setTime, 10);
                screenRoll();
                setpoint( block );
            }
        }
    },

    showModal               =   function(str){
        $failure.show().find('span').html(str);
    },

    clearTime               =   function(){
        $time.html('&nbsp;&nbsp;20\'00\'\'');
        $point.html('00');
        $dom.find('.minus-account').html('00');
        $dom.find('.plus-account').html('00');
        $dom.find('.multi-account').html('00');
    },

    gameOver                =   function(){
        window.clearInterval(game_time_inter);
        game_started    =   false;
        showModal("失败!");
    },

    restart                 =   function(){
        game_index          =   1;
        game_scroll_index   =   0;
        game_point          =   0;
        game_timer          =   2000;
        bottom              =   0;

        $content.empty().css("-webkit-transform",'translate3D(0,0,0)');
        setInitialContent();
        $failure.hide();
        clearTime();
    },

    bindEventLisner         =   function(){
        $dom.on('touchstart', '.row-block', onTouchBlock);
        $failure.find('a').on('touchstart', restart);
    };

    $(init);
})(Zepto)



