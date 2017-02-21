(function($){
    "use strict";

    var win_width           =   $(window).width(),
        win_height          =   $(window).height(),

        ge_time,

    init                    =   function(){
        $('.index-page').height(win_height);
        $('.index-main').height(win_height);
        $('.score, .rule, .fail, .invite').css('min-height',win_height);

        handleCookie();

        if( typeof(ge_invite) != 'undefined' && Number(ge_invite) == 1 ){
            ge_time++;
            Cookies.set('ge_time', ge_time);
        }

        bindEventLisner();
    },

    handleCookie            =   function(){
        var cookie          =   Cookies.get('ge_time');
        if( cookie ){
            ge_time         =   Number(cookie);
        }
        else{
            var ctuskytime=new Date();
            ctuskytime.setDate( ctuskytime.getDate()+1);
            ctuskytime.setHours(0);
            ctuskytime.setMinutes(0);
            ctuskytime.setSeconds(0);
            Cookies.set('ge_time', '3', { expires: ctuskytime.toGMTString() });
            ge_time         =   3;
        }
        $('.game-time').html(ge_time < 0 ? 0 : ge_time);
        $('.index-page').hide();
        $('.index-main').show();
    },

    onGameStart             =   function(){
        if( ge_time <= 0){
            window.location = '/ge/fail';
        }
        if( parseInt(ge_type) == 0 ){
            $('.modal').show();
        }
        else{
            Cookies.set('ge_time', ge_time - 1);
            window.location = '/ge/game';
        }
    },

    onTypeSelect            =   function(){
        var type            =   $(this).attr('data');
        $.ajax({
            url : '/ge/setType',
            type: 'POST',
            data: {'type': type},
            success: function(){
                Cookies.set('ge_time', ge_time - 1);
                window.location = '/ge/game';
            }
        });
    },

    onInvite                =   function(){
        var val             =   $('.invite-text').val();
        if( val.length ){
            $.ajax({
                url: '/ge/setInvite',
                type: 'POST',
                data: {'invite':val},
                success: function(data){
                    if( data == 0 ){
                        alert("已邀请");
                    }
                    else if( data == 2 ){
                        alert('ID不存在');
                    }
                    else{
                        alert('邀请成功');
                    }
                }
            });
        }
        else{
            alert('请输入内容');
        }
    },  

    bindEventLisner         =   function(){
        $('.start-game').on('touchend',onGameStart);
        $('.modal li').on('touchend',onTypeSelect);
        $('.invite-btn').on('touchend',onInvite);
    };

    $(init);
})(Zepto)



