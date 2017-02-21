(function(){
    var $con        =   $('.con'),
        $share_text =   $('.share-text'),
        $tab        =   $('.tabs a'),
        $share      =   $('.share'),
        $list       =   $('.article-list'),
        $fans       =   $('.fans-list'),
        $article    =   $('.article'),

        win_width   =   $('body').width(),
        win_height  =   $('body').height(),

        default_date    =   new Date(2015,2,19,10,35,0),
        alpha_date1      =   7200,
        alpha_date2      =   96,

    init			=	function(){
        setIndex();

        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            onSlideChangeEnd: function(swiper, event){
                swiper.detachEvents();
            }
        });

        setData();

        setShare();
        
    	bindEventListener();
    },

    setCount2           =   function( number ){ 
        var date        =   new Date(2015,2,23,20,35,0),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date2/86400000;

        return number + Math.floor(fi);
    },

    setIndex            =   function(){
        $('.btns').css('top',90*win_width/320);
        $('.main-con').css('margin-top',205*win_width/320);
        $('.content-main').height(win_height - 205*win_width/320 - 75);
        $('.article .content-main').height(win_height - 205*win_width/320 - 55);
    },

    setData             =   function(){
        $.ajax({
            url: 'http://edco.cn/project/hyundai/new/api12/',
            dataType:'jsonp',
            jsonp:'jsonp_callback',
            success: function(data){
                var num1    =   data.num1+270000,
                    prize1  =   data.prize1,
                    prize2  =   data.prize2,
                    prize3  =   data.prize3,
                    prize4  =   data.prize4,
                    prize5  =   data.prize5,
                    prize6  =   data.prize6;  
                
                $('.prize1 tbody').html(setContent(prize1));
                $('.prize2 tbody').html(setContent(prize2));
                $('.prize3 tbody').html(setContent(prize3));
                $('.prize4 tbody').html(setContent(prize4));
                $('.prize5 tbody').html(setContent1(prize5));
                $('.prize6 tbody').html(setContent1(prize6));

                if( $('.prize4 tbody tr').eq(27).attr('data-count') == '493' ){
                    $('.prize4 tbody tr').eq(27).find('td').eq(3).html('人气492');
                }

                $('.num').html('阅读量:'+num1);

                $('.loading').hide();
            },
        });
    },

    setContent              =       function( data ){
        var len             =   data.length/4,
            temp            =   '',
            arr             =   new Array();

        for( var j = 0; j < len;j++ ){
            var index       =   j*4,
            count       =   setCount2(data[index+3]);
            arr.push(count);
        }

        arr = arr.sort(function compare(a,b){return b-a;});

        for( var i = 0; i < len; i++ ){
            for( var n = 0; n < len; n++ ){
                var index       =   n*4,
                    count       =   setCount2(data[index+3]);

                if( count == arr[i] ){
                    temp            +=  '<tr data-count="'+ count +'"><td>'+(i+1)+'.</td><td class="article-link" data-id="'+ data[index] +'">'+ data[index+1] +'</td><td>'+ data[index+2] +'</td><td>人气'+ count +'</td></tr>';
                    break;
                }
            }
        }

        return temp;
    },

    setContent1             =   function( data ){
        var len             =   data.length/3,
            temp            =   '';

        for( var i = 0; i < len; i++ ){
            var index       =   i*3;
            temp            +=  '<tr><td>'+ (i+1) +'.</td><td>'+ data[index+1] +'</td><td>'+ data[index+2] +'</td></tr>';
        }

        return temp;
    },

    setTextAnimation    =   function($ele, className){
        $con.hide();
        $ele.show();
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    showShare           =   function(){
        $share.show();
    },

    hideShare           =   function(){
        $share.hide();
    },

    changeTab           =   function(){
        var $this       =   $(this),
            index       =   $this.attr('data-index'),
            $prize      =   $this.closest('.con').find('.prize').eq(index-1);

        $this.addClass('cur').siblings().removeClass('cur');
        $prize.show().siblings().hide();
    },

    showList            =   function(){
        setTextAnimation($list, 'fadeInRight');
    },

    showFans            =   function(){
        setTextAnimation($fans, 'fadeInRight');
    },

    showArticle         =   function(){
        var $this       =   $(this),
            id          =   $this.attr('data-id');

        $article.find('.content-main').html('<div class="article_loading"></div>');        

        setTextAnimation($article, 'fadeInRight');

        $.ajax({
            url: 'http://edco.cn/project/hyundai/new/api13/',
            dataType:'jsonp',
            data: {'article_id': id},
            jsonp:'jsonp_callback',
            success: function(data){
                $article.find('.content-main').html('<h2>'+ data.title +'</h2>'+data.data);
            },
        });
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '"我与自媒体的这一年"征文活动，大奖等你来领！',
                link: 'http://wyyun.com/hyundai9_result/',
                imgUrl: 'http://wyyun.com/hyundai9/images/share-img.jpg',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: '"我与自媒体的这一年"征文活动，大奖等你来领！',
                desc: '历9而新，一起加入观点评世界·谈笑有自儒“2014我与自媒体的这一年”征文活动，赢取惊喜大礼！', 
                link: 'http://wyyun.com/hyundai9_result/',
                imgUrl: 'http://wyyun.com/hyundai9/images/share-img.jpg',
                type: '',
                dataUrl: '',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });
        });
    },

    bindEventListener	=	function(){
        $share_text.on('touchend', showShare);
        $share.on('touchend', hideShare);
        $tab.on('touchend', changeTab);
        $('.btn1').on('touchend', showFans);
        $('.btn2').on('touchend', showList);
        $('body').on('touchend', '.article-link' , showArticle);
        window.onorientationchange = function(){
            if( window.orientation != 0 ){
                alert('请在竖屏状态下浏览');
            }
        };
    };

    $(init);
})();



