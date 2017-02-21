(function(){
    var $banner         =   $('.banner'),
        $arrow          =   $('.banner-arrow'),
        $banner_main    =   $('.banner-container'),

        banner_index    =   1,
        banner_limit    =   5,
        banner_width    =   $banner.width(),

        teacher_index   =   1,
        teacher_limit   =   9,
        recordCount     =   6,

    init				=	function(){
        if( $('.courses-detail').length ){
            setCourses();
        }
        if( $('.teacher-container').length ){
            $('.teacher-page').css('margin-left', -37-teacher_limit*14)
        }
        if( $('.course').length ){
            setCourseRoll();
        }
        setBanner();

    	bindEventListener();
    },

    setCourseRoll       =   function(){
        $.ajax({
            url  : 'data.json',
            datatype : 'json',
            success : function( data ){
                // data        =   JSON.parse( data );
                var len     =   data.length;
                data        =   data[0];
                var roll_len    =   data.data.length;

                for( var i = roll_len - 1; i > roll_len - 7; i-- ){
                    $('.course-body').append('<div class="course-item"><div>'+ data.data[i].time +'</div><div>'+ data.data[i].teacher +'</div><div>'+ data.data[i].course +'</div><div>'+ data.data[i].attendee +'</div></div>');
                }

                recordCount     =   roll_len - 6;        

                window.setInterval(function(){
                    recordCount--;
                    if( recordCount < 0 ){
                        recordCount = roll_len - 1;
                    }
                    var $temp   =   $('<div class="course-item" style="display:none;"><div>'+ data.data[recordCount].time +'</div><div>'+ data.data[recordCount].teacher +'</div><div>'+ data.data[recordCount].course +'</div><div>'+ data.data[recordCount].attendee +'</div></div>');
                    $('.course-body').prepend($temp);
                    $('.course-body').animate({'padding-top':52}, 500, function(){
                        $temp.fadeIn();
                        $('.course-body').css('padding-top',0);
                    });
                    $('.course-body .course-item:gt(5)').remove();
                }, 3000);
            } 
        });
    },

    setCourses          =   function(){
        $.ajax({
            url  : 'data.json',
            datatype : 'json',
            success : function( data ){
                var len     =   data.length;

                for( var i = 0; i < len; i++ ){
                    var temp = $('<table><thead><tr><th>时间</th><th>讲师</th><th>课程</th><th>地点</th></tr></thead><tbody></tbody></table>').appendTo($('.course-items'));

                    var item    =   data[i].data,
                        len1    =   item.length;

                    for( var j = 0; j < len1; j++ ){
                        temp.find('tbody').append($('<tr><td>'+ item[j].time +'</td><td>'+ item[j].teacher +'</td><td>'+ item[j].course +'</td><td>'+ item[j].attendee +'</td></tr>'))
                    }
                }
            } 
        });
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

    onTeacherPage       =   function(){
        var $this       =   $(this),
            index       =   parseInt($this.attr('data-index'));

        teacher_index   =   index + 1;
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

    onCoursePage       =   function(){
        var $this       =   $(this),
            index       =   parseInt($this.attr('data-index'));

        teacher_index   =   index + 1;
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
        $('.teacher-list .page-dot').on('click', onTeacherPage);
        $('.courses-detail .page-arrow').on('click', onCourseSlide);
        $('.courses-detail .page-dot').on('click', onCoursePage);
        $('.news-detail .page-arrow').on('click', onNewsSlide);

    };

    $(init);
})();



