(function(){
    var $banner         =   $('.banner'),
        $arrow          =   $('.banner-arrow'),
        $banner_main    =   $('.banner-container'),

        banner_index    =   1,
        banner_limit    =   5,
        banner_width    =   $banner.width(),

        teacher_index   =   1,
        teacher_limit   =   3,

    init				=	function(){
        if( $('.courses-detail').length ){
            setCourses();
        }
        setBanner();

    	bindEventListener();
    },

    setCourses          =   function(){
        $.ajax({
            url  : 'data.json',
            datatype : 'json',
            success : function( data ){
                data    =   JSON.parse(data);
                var len     =   data.length;

                for( var i = 0; i < len; i++ ){
                    var temp = $('<table><thead><tr><th>时间</th><th>讲师</th><th>课程</th><th>学员</th></tr></thead><tbody></tbody>
                        </table>').appendTo($('.course-items'));

                    var item    =   data[i].data,
                        len1    =   item.length;

                    for( var j = 0; j < len1; j++ ){
                        temp.find('tbody').append($('<tr><td>'+ item[j].time +'</td><td>'+ item[j].teacher +'</td><td>'+ item[j].course +'</td><td>'+ item[j].attendee +'</td></tr>'))
                    }
                }
            } 
        })
    },

    setBanner 			=	function(){
    	$banner.find('.banner-container a').width( banner_width );
    },

    onBannerSlide       =   function(){
        var $this       =   $(this),
            type        =   $this.hasClass("banner-arrow-left");

        if( type ){
            if( banner_index > 1 ){
                banner_index--;
            }
        }
        else{
            if( banner_index < banner_limit ){
                banner_index++;
            }
        }

        $banner.find('.banner-dot a').eq(banner_index-1).addClass('current').siblings().removeClass('current');
        TweenLite.to($banner_main, 0.5, {left:-(banner_index-1)*banner_width});
    },

    onSpeakerSlide      =   function(){
        var $this       =   $(this),
            index       =   parseInt($this.attr('data-value'));

        $this.addClass('current').siblings().removeClass('current');
        TweenLite.to($('.speaker-container'), 0.5, {left:-index*1000});
    },

    onTeacherSlide      =   function(){
        var $this       =   $(this),
            type        =   $this.hasClass("page-left");

        if( type ){
            if( teacher_index > 1 ){
                teacher_index--;
            }
        }
        else{
            if( teacher_index < teacher_limit ){
                teacher_index++;
            }
        }

        $('.page-dot').eq(teacher_index-1).addClass('current').siblings().removeClass('current');
        TweenLite.to($('.teacher-container'), 0.5, {left:-(teacher_index-1)*1000});
    },

    onCourseSlide       =   function(){
        var $this       =   $(this),
            type        =   $this.hasClass("page-left");

        if( type ){
            if( teacher_index > 1 ){
                teacher_index--;
            }
        }
        else{
            if( teacher_index < teacher_limit ){
                teacher_index++;
            }
        }

        $('.page-dot').eq(teacher_index-1).addClass('current').siblings().removeClass('current');
        TweenLite.to($('.course-container'), 0.5, {left:-(teacher_index-1)*1000});
    },

    onNewsSlide         =   function(){
        var $this       =   $(this),
            type        =   $this.hasClass("page-left");

        if( type ){
            if( teacher_index > 1 ){
                teacher_index--;
            }
        }
        else{
            if( teacher_index < teacher_limit ){
                teacher_index++;
            }
        }

        $('.page-dot').eq(teacher_index-1).addClass('current').siblings().removeClass('current');
        TweenLite.to($('.news-container'), 0.5, {left:-(teacher_index-1)*1000});
    },

    bindEventListener	=	function(){
        $arrow.on('click', onBannerSlide);
        $('.speaker-dot a').on('click', onSpeakerSlide);
        $('.teacher-list .page-arrow').on('click', onTeacherSlide);
        $('.courses-detail .page-arrow').on('click', onCourseSlide);
        $('.news-detail .page-arrow').on('click', onNewsSlide);
    };

    $(init);
})();



