(function(){
    var $img 		=	$('.image-container img'),

    init			=	function(){
        checkImg();
        setImg();
    	bindEventListener();
    },

    checkImg 			=	function(){
    	$img.each(function(){
    		$(this).height($(this).width());
    	});
    },

    setImg 				=	function(){
    	$('.fancybox').fancybox({});
    },

    onShowMore 			=	function(){
    	var con 		=	$(this).closest('.news-container');

    	con.find('.cutoff').hide();
    	con.find('.full').show();

    	$(this).remove();
    },

    bindEventListener	=	function(){
        $('.news-container a').on('touchend', onShowMore);
    };

    $(init);
})();



