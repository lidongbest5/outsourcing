;(function(){
    var win_width 	=	$(window).width(),
    	win_height 	=	$(window).height(),

        $article    =   $('.article'),
        $list       =   $('.list'),
        $search     =   $('.search-con'),

        list_scroll =   null,
        article_scroll = null,

        num1        =   0,
        num2        =   0,

        cur_title,
        cur_id,
        is_searched     =   0,

        cur_page        =   0,

        is_list         =   true,
        wxOpenId,
        temp_list       =   '',


        default_date    =   new Date(2015,2,19,10,35,0),
        alpha_date1      =   7200,
        alpha_date2      =   96,

    init			=	function(){
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            onSlideChangeEnd: function(swiper, event){
                swiper.detachEvents();
            }
        });
        wxOpenId        =   getUrlParam('wxopenid');

        setContentHeight();
        setData();
    	bindEventListener();
        setShare();
    },

    getUrlParam     =   function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    },

    setContentHeight 	=	function(){
        $('.modal-con').css('max-height',win_height-250);
        $('.prize-img').css('height',win_height-250);

        // $('.content-main').height( win_height - 98 - win_width*264/320 );
        // $('.article-main').height( win_height - 98 - win_width*264/320 );
    	$('.main-scroll').height( win_height - 40 - win_width*33/320 );
    },

    setData             =   function(){
        // $.ajax({
        //     url: 'http://edco.cn/project/hyundai/new/api5/',
        //     dataType:'jsonp',
        //     data:{},
        //     jsonp:'jsonp_callback',
        //     success: function(data1){
                num1        =   temdata.num1;

                var data    =   temdata.data,
                    len     =   data.length/5,
                    temp    =   '';
                for( var i = 0; i < len; i++ ){
                    var index   =   i*5,
                        fav_num =   setCount2(temdata.data[index+3]);
                    temp    +=  '<li><span class="list-head"><div>'+ (i+1) +'</div></span><span class="list-title"><span class="title">'+ data[index] +'</span><span class="fav">人气'+ fav_num +'</span></span><span class="list-author">'+ data[index+1] +'</span><span class="list-link"><a data-content="" data-id="'+ data[index+4] +'">阅读全文</a><div class="content-hidden" style="display:none;">'+ data[index+2] +'</div></span></li>';
                    num2    +=   fav_num;
                }
                $('.content-main ul').html(temp);
                // setListScroll();

                temp_list   =   temp;
                
                num1        +=      10000;
                $('.bottom-data').html('<span>阅读量:'+setCount1(num1)+'</span><span>点赞量:'+num2+'</span>');
                is_searched     =   0;
                $('.loading').hide();
            // },
        // });
    },

    setCount1           =   function( number ){
        var date        =   new Date(2015,2,23,20,35,0),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date1/86400000;

        return number + Math.floor(fi);
    },

    setCount2           =   function( number ){ 
        var date        =   new Date(2015,2,23,20,35,0),
            mul         =   date.getTime() - default_date.getTime(),
            fi          =   mul*alpha_date2/86400000;

        return number + Math.floor(fi);
    },

    showModal           =   function( num ){
        $('.modal').hide();
        $('.modal'+num).show();
        // if( num == 1 ){
        //     new IScroll('.modal'+num+' .modal-con', {
        //         scrollbars: true
        //     });
        // }
    },

    closeModal          =   function( e ){
        $('.modal').hide();

        e.preventDefault();
        return false;
    },

    setTextAnimation    =   function($ele, className){
        $ele.show();
        $ele.addClass(className + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass(className);
          $(this).removeClass('animated');
        });
    },

    // setArticleScroll    =   function(){
    //     if( article_scroll ){
    //         article_scroll.destroy();
    //         article_scroll = null;
    //     }

    //     article_scroll  =   new IScroll('.article-main', {
    //         scrollbars: true
    //     });
    // },

    // setListScroll       =   function(){
    //     if( list_scroll ){
    //         list_scroll.destroy();
    //         list_scroll = null;
    //     }

    //     list_scroll     =   new IScroll('.content-main', {
    //         scrollbars: true
    //     });
    // },

    onShowArticle       =   function(){
        var $this       =   $(this),
            content     =   $this.find('.content-hidden').html(),
            $dom        =   $this.parents('li'),
            title       =   $dom.find('.title').html(),
            article_id  =   $dom.find('a').attr('data-id'),
            author      =   $dom.find('.list-author').html(),
            fav         =   $dom.find('.fav').html();

        $article.find('h1').html(title);
        $article.find('h2').html(author+'<span>'+fav+'</span>');
        $article.find('.article-main .article-con').html(content);

        cur_title       =   title;
        cur_id          =   article_id;
        setTextAnimation($article, 'fadeInRight');
        $list.hide();
        $('.main-scroll').scrollTop(0)

        is_list         =   false;

        // $('.main-scroll').addClass('scroll');
        // $article.show();

        // setTimeout(function(){
        //     setArticleScroll();
        // },1000)
    },

    onReturn            =   function(){
        if( is_searched ){
            $('.content-main ul').html(temp_list);
        }

        setTextAnimation($list, 'fadeInRight');
        $article.hide();
        $('.fixed').hide();
        $('.main-scroll').scrollTop(0)

        is_list         =   true;
    },

    onArticleScroll     =   function(){
        var top         =   225*win_width/320;
        if( $('.main-scroll').scrollTop() > top ){
            $('.fixed').html( is_list ?  $('.content-top').html() : $('.article-top').html()).show();
            $('.article-main').css('margin-top',$('.article-top').height());
        }
        else{
            $('.fixed').hide();
            $('.article-main').css('margin-top',0);
        }
    },

    onShowForm          =   function( event ){
        alert('已过投票时间，请稍等查看结果。')
        // if( $('.list-link a[data-id="'+cur_id+'"]').attr('data-done') == "true" ){
        //     showModal(6);
        //     event.preventDefault();
        //     return false;
        // }
        // else{
        //     $('.list-link a[data-id="'+cur_id+'"]').attr('data-done','true');
        // }

        // $.ajax({
        //      url: 'http://edco.cn/project/hyundai/new/api10/',
        //      dataType:'jsonp',
        //      data:{'article':cur_id, "openid":wxOpenId},
        //      jsonp:'jsonp_callback',
        //      success: function(data){
        //         if( data.code == 1 ){
        //             $.ajax({
        //                  url: 'http://edco.cn/project/hyundai/new/api6/',
        //                  dataType:'jsonp',
        //                  data:{'id':cur_id},
        //                  jsonp:'jsonp_callback',
        //                  success: function(data){
        //                  },
        //              });
        //             showModal(3);
        //         }
        //         else{
        //             showModal(6);
        //         }
        //      },
        //  });
    },

    onSubmitResult      =   function(){
        // var name        =   $('.name').val(),
        //     phone       =   $('.phone').val();

        // if( name.length && phone.length ){
        //      $.ajax({
        //          url: 'http://edco.cn/project/hyundai/new/api7/',
        //          dataType:'jsonp',
        //          data:{'name': name,'phone': phone,'article': cur_title},
        //          jsonp:'jsonp_callback',
        //          success: function(data){
        //             showModal(2);
        //          },
        //      });
        // }
        // else{
        //     alert('请完整输入信息');
        // }
    },

    onShowSearch        =   function(){
        setTextAnimation($search, 'fadeInRight');
        $list.hide();
        $('.main-scroll').removeClass('scroll');
        $('.fixed').hide();
    },

    onSearch            =   function(){
        var search      =   $('.search-input').val();

        if( search.length ){
            $.ajax({
                url: 'http://edco.cn/project/hyundai/new/api8/',
                dataType:'jsonp',
                data:{'query':search},
                jsonp:'jsonp_callback',
                success: function(data){
                    var data    =   data.data,
                        len     =   data.length/5,
                        temp    =   '';  
                    for( var i = 0; i < len; i++ ){
                        var index   =   i*5;
                        temp    +=  '<li><span class="list-head"><div>'+ (i+1) +'</div></span><span class="list-title"><span class="title">'+ data[index] +'</span><span class="fav">人气'+ setCount2(data[index+3]) +'</span></span><span class="list-author">'+ data[index+1] +'</span><span class="list-link"><a data-content="" data-id="'+ data[index+4] +'">阅读全文</a><div class="content-hidden" style="display:none;">'+ data[index+2] +'</div></span></li>';
                        num2    +=   data[index+3];
                    }
                    if( len == 0 ){
                        $('.content-main ul').html('<p class="no-result">暂无搜索结果</p><a class="search-back">返回首页</a>');
                    }  
                    else{
                        $('.content-main ul').html(temp+'<a class="search-back">返回首页</a>');
                    }
                    // setListScroll();

                    setTextAnimation($list, 'fadeInRight');
                    $search.hide();

                    is_searched     =   1;
                    $('.main-scroll').addClass('scroll');
                },
            });
        }
        else{
            alert('请输入搜索内容');
        }
    },

    onSearchBack        =   function(){
        if( is_searched ){
            $('.content-main ul').html(temp_list);
        }

        // setTextAnimation($list, 'fadeInRight');
        $search.hide();
        $('.main-scroll').addClass('scroll');
    },

    setShare            =   function(share_title, hash){
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: '“我与自媒体的这一年”征文活动，你不来吗？有大奖等你拿！',
                link: 'http://wyyun.com/hyundai9_article/',
                imgUrl: 'http://wyyun.com/hyundai9/images/share-img.jpg',
                success: function () {
                    setShareNum();
                },
                cancel: function () {}
            });

            wx.onMenuShareAppMessage({
                title: '“我与自媒体的这一年”征文活动，你不来吗？有大奖等你拿！',
                desc: '历9而新，一起加入观点评世界·谈笑有自儒“2014我与自媒体的这一年”征文活动，赢取惊喜大礼！', 
                link: 'http://wyyun.com/hyundai9_article/',
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

    setShareNum         =   function(){
        $.ajax({
            url: 'http://edco.cn/project/hyundai/new/api9/',
            dataType:'jsonp',
            data:{},
            jsonp:'jsonp_callback',
            success: function(data){},
        });
    },

    bindEventListener	=	function(){
        $('.main-scroll').on('scroll',onArticleScroll);
        $(document).on('touchend', '.list-link', onShowArticle);
        $(document).on('touchend', '.return', onReturn);
        $(document).on('touchend', '.rule',function(){showModal(1)});
        $('.prize').on('touchend', function(){showModal(5)});
        $(document).on('touchend', '.vote', onShowForm);
        $('.close, .btn1').on('touchstart', closeModal); 
        $('.back').on('touchstart', function(){closeModal();onReturn();}); 
        $('.btn2').on('touchend',onSubmitResult);
        $('.search-btn').on('touchend',onSearch);
        $(document).on('touchend', '.search', onShowSearch);
        $(document).on('touchend', '.search-back', onSearchBack);
        window.onorientationchange = function(){
            if( window.orientation != 0 ){
                alert('请在竖屏状态下浏览');
            }
        };
    };

    $(init);
})();


