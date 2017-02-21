(function(){
    var radius = 60,
		d = 200,
		dtr = Math.PI / 180,
		mcList = [],
		lasta = 1,
		lastb = 1,
		distr = true,
		tspeed = 11,
		size = 200,
		mouseX = 0,
		mouseY = 10,
		howElliptical = 1,
		aA = null,
		oDiv = null,
		sa,
		ca,
		sb,
		cb,
		sc,
		cc,
		per,

		value,
		word_id 		=	0,

		endNextPage     =   false,
        endCurrPage     =   false,
        isAnimating     =   false,

        default_num1    =   5500,
        default_num2    =   2900,
        default_word1   =   156,
        default_word2   =   204,
        default_word3   =   148,
        default_word4   =   360,
        default_word5   =   294,
        default_word6   =   246,
        default_word7   =   104,
        default_word8   =   90,
        default_word9   =   216,
        default_word10   =   268,
        default_word11   =   162,
        default_word12   =   132,
        default_word13   =   144,

        alpha_date1      =   7000,
        alpha_date2      =   3000,

        default_date    =   new Date(2015,2,3,11,35,0),

    init			=	function(){
    	setHack();
    	$('.pt-page').each( function() {
    	    var $page = $( this );
    	    $page.attr( 'originalClassList', $page.attr( 'class' ) );
    	} );
    	bindEventListener();
    	$.ajax({
		    url: 'http://edco.cn/project/hyundai/api2/',
		    dataType:'jsonp',
		    data:{},
		    jsonp:'jsonp_callback',
		    success: function(data){
		    	$('.bottom').html('<span>阅读量：'+ (data.num1+44797) +'</span><span>点赞量：'+ (data.num2+18225) +'</span>');
		    	$('.w1').attr('data-count', (data.w1+1461));
		    	$('.w2').attr('data-count', (data.w2+1457));
		    	$('.w3').attr('data-count', (data.w3+1442));
		    	$('.w4').attr('data-count', (data.w4+1235));
		    	$('.w5').attr('data-count', (data.w5+1490));
		    	$('.w6').attr('data-count', (data.w6+1500));
		    	$('.w7').attr('data-count', (data.w7+1447));
		    	$('.w8').attr('data-count', (data.w8+1532));
		    	$('.w9').attr('data-count', (data.w9+1320));
		    	$('.w10').attr('data-count', (data.w10+1396));
		    	$('.w11').attr('data-count', (data.w11+1498));
		    	$('.w12').attr('data-count', (data.w12+1330));
		    	$('.w13').attr('data-count', (data.w13+1518));
		    	setWords();
		    	$('.loading').hide();
		    },
		});

		setShare();
    },

    setCount1           =   function( number ){
        var date        =   new Date(),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date1/86400000;

        return number + Math.floor(fi);
    },

    setCount2           =   function( number ){ 
        var date        =   new Date(),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date2/86400000;

        return number + Math.floor(fi);
    },

    setCount3           =   function( number ){ 
        var date        =   new Date(),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date2/86400000/13;

        return number + Math.floor(fi);
    },

    setHack 			=	function(){
    	var height 	=	$(window).height();

    	$('.modal-con').css('max-height',height-250);
    	$('.prize-img').css('height',height-250);

    	if( height < 568 ){
    		$('.main .top').attr('src','images/top1.jpg');
    		$('.main .footer').attr('src','images/footer1.jpg');
    		$('.main .container .input').css('margin-bottom','2px');
            $('.main .bottom').css('bottom','5px');
    		$('.main .bottom-logo').css('bottom','20px');
    	}
    	else if( height > 600 ){
    		$('.main .container').css('margin-top','0px');
    		$('.main .container .input').width(300);
    		$('.main .container .input').height(45);
    		$('.main .container .input input').css({'top':10,'left':72,'width':145});
    		$('.main .container .input a').css('right',15);
    	}
    },

    setWords 			=	function(){
		var i 		= 	0;
		var oTag 	= 	null;
		oDiv 		=	document.getElementById('words');
		aA 			= 	oDiv.getElementsByTagName('a');
		for(i = 0;i < aA.length;i++)
		{
			oTag 	= 	{};		
			oTag.offsetWidth = parseInt(aA[i].getAttribute('data-widht'));
			oTag.offsetHeight = 11;
			mcList.push(oTag);
		}
		sineCosine( 0,0,0 );
		positionAll();
		setInterval(function(){
			update();
		},70);
    },

    update 			=	function()
    {
    	var a, b, c = 0;
            a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
            b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
            lasta = a;
            lastb = b;
            if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
                return;
            }
            sineCosine(a, b, c);
            for (var i = 0; i < mcList.length; i++) {
                if (mcList[i].on) {
                    continue;
                }
                var rx1 = mcList[i].cx;
                var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
                var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

                var rx2 = rx1 * cb + rz1 * sb;
                var ry2 = ry1;
                var rz2 = rx1 * (-sb) + rz1 * cb;

                var rx3 = rx2 * cc + ry2 * (-sc);
                var ry3 = rx2 * sc + ry2 * cc;
                var rz3 = rz2;

                mcList[i].cx = rx3;
                mcList[i].cy = ry3;
                mcList[i].cz = rz3;

                per = d / (d + rz3);

                mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
                mcList[i].y = ry3 * per;
                mcList[i].scale = per;
                var alpha = per;
                alpha = (alpha - 0.6) * (10 / 6);
                mcList[i].alpha = alpha * alpha * alpha - 0.2;
                mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
            }
            doPosition();
    },

    positionAll 	= 	function(){
    	var phi = 0;
        var theta = 0;
        var max = mcList.length;
        for (var i = 0; i < max; i++) {
            if (distr) {
                phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
                theta = Math.sqrt(max * Math.PI) * phi;
            } else {
                phi = Math.random() * (Math.PI);
                theta = Math.random() * (2 * Math.PI);
            }
            //坐标变换
            mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
            mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
            mcList[i].cz = radius * Math.cos(phi);

            aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
            aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
        }
    },
    doPosition 		= 		function(){
    	var l = oDiv.offsetWidth / 2;
        var t = oDiv.offsetHeight / 2;
        for (var i = 0; i < mcList.length; i++) {
            if (mcList[i].on) {
                continue;
            }
            var aAs = aA[i].style;
            if (mcList[i].alpha > 0.1) {
                if (aAs.display !== ''){
                    aAs.display = '';
                }
            } else {
                if (aAs.display !== 'none'){
                    aAs.display = 'none';
                }
                continue;
            }
            // aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
            aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
            // aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
            //aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
            // aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
            aAs.zIndex = mcList[i].zIndex;
            aAs.opacity = mcList[i].alpha;
        }
    },
    sineCosine 		= 		function(a, b, c){
    	sa = Math.sin(a * dtr);
        ca = Math.cos(a * dtr);
        sb = Math.sin(b * dtr);
        cb = Math.cos(b * dtr);
    	sc = Math.sin(c * dtr);
    	cc = Math.cos(c * dtr);
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

    showModal 			=	function( num ){
    	$('.modal').hide();
    	$('.modal'+num).show();
    	if( num < 5 ){
	    	new IScroll('.modal'+num+' .modal-con', {
			    scrollbars: true
			});
    	}
    },

    closeModal 			=	function( e ){
    	$('.modal').hide();
    	$('.main').addClass('pt-page-current');
    	$('.signup').removeClass('pt-page-current');

    	e.preventDefault();
    	return false;
    },

    onShare 			=	function(){
    	$('.share').show();
    },

    onShareClose 		=	function(){
    	$('.share').hide();
    },

    signUp 				=	function(){
    	onRotate($('.main'), $('.signup'));
    },

    onSelectWord 		=	function( e ){
    	var $this 		=	$(this),
    		url 		=	$this.find('img').attr('src'),
    		zan_num 	=	$this.attr('data-count');
    	value 			=	$this.attr('data-value');
    	word_id 		=	$this.attr('data-id');

    	$('.select-word').attr('src',url);
    	$('.words-select').show();
    	$('.zan-num').html(zan_num);
        $('.select-word').css('max-width',$('.words-select').width() - $('.num-con').width() - 8);
    	window.setTimeout(function(){
    		$('body').on('touchstart',closeWord); 
    	},0);

    	e.preventDefault();
    	return false;
    },

    closeWord 			=	function(){
    	$('.words-select').hide();
    	$('body').off('touchstart',closeWord); 
    },

    zan 				=	function( e ){
    	showForm();
    	e.preventDefault();
    	return false;
    },

    onSubmitWord 		=	function(){
    	var val 		=	$('.input-word').val();

    	if( val.length ){
    		value 		=	val;
    		showForm();
    	}
    	else{
    		alert('请输入热词');
    	}
    },

    showForm 			=	function(){
    	$.ajax({
    	    url: 'http://edco.cn/project/hyundai/api3/',
    	    dataType:'jsonp',
    	    data:{word_id:word_id},
    	    jsonp:'jsonp_callback',
    	    success: function(){
    	    	showModal(3);
    	    },
    	});
    },

    onSubmitResult 		=	function(){
    	var name 		=	$('.name').val(),
    		phone 		=	$('.phone').val();

    	if( name.length && phone.length ){
    		$.ajax({
    		    url: 'http://edco.cn/project/hyundai/api1/',
    		    dataType:'jsonp',
    		    data:{name: name, phone: phone, word: value},
    		    jsonp:'jsonp_callback',
    		    success: function(){
    		    	showModal(2);
    		    },
    		});
    	}
    	else{
    		alert('请完整输入信息');
    	}
    },

    onSignUp 			=	function(){
    	var val 		=	$('.signup input').val();

    	if( val.length ){
    		$.ajax({
    		    url: 'http://edco.cn/project/hyundai/api4/',
    		    dataType:'jsonp',
    		    data:{id: val},
    		    jsonp:'jsonp_callback',
    		    success: function(){
    		    	showModal(2);
    		    },
    		});
    	}
    	else{
    		alert('请填写ID');
    	}
    },

    onBackIndex 		=	function(){
    	onRotate($('.signup'), $('.main'));
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '“我与自媒体的这一年”征文活动，你不来吗？有大奖等你拿！',
                link: window.location.href,
                imgUrl: 'http://wyyun.com/hyundai9/images/share-img.jpg',
                success: function () {},
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: '“我与自媒体的这一年”征文活动，你不来吗？有大奖等你拿！',
                desc: '历9而新，一起加入观点评世界·谈笑有自儒“2014我与自媒体的这一年”征文活动，赢取惊喜大礼！', 
                link: window.location.href,
                imgUrl: 'http://wyyun.com/hyundai9/images/share-img.jpg',
                type: '',
                dataUrl: '',
                success: function () {},
                cancel: function () {}
            });
        });
    },

    bindEventListener	=	function(){
    	$('.words a').on('touchstart',onSelectWord);
      	$('.rule-btn').on('touchend', function(){showModal(1)});  
      	$('.close, .back, .btn1').on('touchstart', closeModal);  
      	$('.icon1').on('touchend', signUp);  
      	$('.icon2').on('touchend', function(){showModal(4)});  
      	$('.icon3').on('touchend', onShare);  
      	$('.share').on('touchend', onShareClose);  
      	$('.bottom-logo').on('touchstart', function(){showModal(5)}); 
      	$('.zan').on('touchstart',zan); 
      	$('.submit').on('touchend',onSubmitWord); 
      	$('.btn2').on('touchend',onSubmitResult); 
      	$('.signup .sign-btn').on('touchend',onSignUp); 
      	$('.back-index').on('touchend',onBackIndex);
      	$(window).on('orientationchange',function(){
      		if( window.orientation != 0 ){
      			alert('请使用竖屏浏览');
      		}
      	});
    };

    $(init);
})();



