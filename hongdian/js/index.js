(function(){
    var

    init			=	function(){
      var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      });
    	bindEventListener();
      initLottery();
    },

    initLottery = function() {
			var lottery = new Lottery('container', 'images/card1.png', 'image', 250, 128, drawPercent);
			lottery.init('images/2.png', 'image');
			setTimeout(function() {
				$('.lottery-prize').show();
			}, 500);
		},

		drawPercent = function() {
			$('#container').hide();
		},

    bindEventListener	=	function(){

    };

    $(init);
})();
