(function($){
    "use strict";

    var win_width           =   $(window).width(),
        win_height          =   $(window).height(),

    init                    =   function(){
        $('.index-page').height(win_height);
        $('.index-main').height(win_height);
        $('.index-page').hide();
        $('.index-main').show();
        bindEventLisner();
    },

    bindEventLisner         =   function(){
        $dom.on('touchstart', '.row-block', onTouchBlock);
        $failure.find('a').on('touchstart', restart);
    };

    $(init);
})(Zepto)



