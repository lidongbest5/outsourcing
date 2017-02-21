(function(){
    var $nav 		=	$('.mobile-nav'),
    	$nav_con	=	$('nav'),

    init			=	function(){
        
    	bindEventListener();
    },

    toggleNav 			=	function(){
    	var $this 		=	$(this);

    	if( $this.hasClass('toggle') ){
    		$this.removeClass('toggle');
    		$nav_con.css('left',-245);
    	}
    	else{
    		$this.addClass('toggle');
    		$nav_con.css('left',0);
    	}
    },

    bindEventListener	=	function(){
        $nav.on('touchend', toggleNav);
    };

    $(init);
})();



