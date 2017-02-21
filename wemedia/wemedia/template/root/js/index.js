(function(){
    var $nav 		    =	$('.mobile-nav'),
    	$nav_con	    =	$('nav'),
        $register_btn   =   $('.register-button'),
        $email_btn      =   $('.email-button'),
        $mail           =   $('a.mail'),
        $login_btn      =   $('.login-btn'),
        $changepwd_btn  =   $('.changepwd-btn'),
        $reset_btn      =   $('.reset-button'),

        regExpEmail     =   new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
        regPassword     =   new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/),

        img_data        =   null,
        delete_id       =   0,
        delete1_id      =   0,

        result,

    init			    =	function(){
        if($('#starttime, #endtime').length){
            $('#starttime, #endtime').Zebra_DatePicker();
        }
        setUpload();
    	bindEventListener();
    },

    setUpload           =   function(){
        if( $('#img-upload').length ){
            $('#img-upload').uploadify ({
                'swf'       : '/static/root/js/uploadify.swf',
                'uploader'  : '/root/upload/', 
                'cancelImage' : '/static/root/images/cancel.png',
                'buttonClass' : 'btn',
                'removeCompleted': true,
                'fileTypeExts'   : '*.jpg;*.jpeg;*.gif;*.png;*.bmp',
                'multi'     : true,
                'auto'    : true,
                'buttonText': '上传图片',
                'onUploadSuccess' : function (file, data, response) {
                    setImg(data);
                }
            });

            $('#executetime, #backtime').Zebra_DatePicker();
        }
    },

    setImg              =   function( data ){
        $('.img-preload').attr("src",'/static/upload/'+data);
        img_data = data;
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

    onRegister          =   function(){
        var mail        =   $('.mail input'),
            pwd         =   $('.password input'),
            repwd       =   $('.re-password input'),
            name        =   $('.name input');

        $('.register-container input').removeClass('invalid');
        $('.register-container .tip').remove();
        if( !regExpEmail.test( mail.val() ) ){    
            mail.addClass('invalid');
            $('<p class="tip">'+ mail.attr('placeholder') +'</p>').insertAfter(mail);
        }
        if( !pwd.val().length || !regPassword.test( pwd.val() ) ){
            pwd.addClass('invalid');
            $('<p class="tip">'+ pwd.attr('placeholder') +'</p>').insertAfter(pwd);
        }
        if( !repwd.val().length || repwd.val() !== pwd.val() ){
            repwd.addClass('invalid');
            $('<p class="tip">'+ repwd.attr('placeholder') +'</p>').insertAfter(repwd);
        }
        if( !name.val().length ){
            name.addClass('invalid');
            $('<p class="tip">'+ name.attr('placeholder') +'</p>').insertAfter(name);
        }

        if( $('.register-container input').hasClass('invalid') ){
            return false;
        }

        else{
            var $btn    =   $(this);
            $btn.html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/root/registerValidate/',
                type:'POST',
                data: {'name': name.val(), 'mail': mail.val(), 'password': (pwd.val())},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        window.location.href = '/root/rootValidation/';
                    }
                    else{
                        alert('已注册过此邮箱');
                        $btn.html('注册');
                    }
                }
            });
        }
    },

    onLogin             =   function(){
        $('.user, .password, .code-con').removeClass('invalid');
        if( !$('.user input').val().length ){    
            $('.user').addClass('invalid');
        }
        if( !$('.password input').val().length ){    
            $('.password').addClass('invalid');
        }
        if( !$('.code-con input').val().length ){    
            $('.code-con').addClass('invalid');
        }

        if( $('.user, .password, .code-con').hasClass('invalid') ){
            return false;
        }
        else{
            $('.message').hide();
            $(this).html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/root/rootLoginValidate/',
                type:'POST',
                data: {'mail': $('.user input').val(), 'pwd': ($('.password input').val()), 'code': $('.code-con input').val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 0 ){
                        window.location.href = '/root/rootValidation/';
                    }
                    else if( data.code == 4 ){
                        window.location.href = '/root/';
                    }
                    else if( data.code == 2 ){
                        $('.message').html('用户名或密码错误').show();
                        onCodeChange();
                    }
                    else if( data.code == 1 ){
                        $('.message').html('验证码错误').show();
                        onCodeChange();
                    }
                    $login_btn.html('登陆');
                }
            });
        }
    },

    onEmailBtn          =   function(){
        var mail        =   $('.mail').html().split('@')[1];
        window.open('//mail.'+mail);
    },

    onChangePwd         =   function(){
        $('.changepwd-con input').removeClass('invalid');
        $(this).html('<img src="/static/root/images/loading.gif">');
        var pwd         =   $('.changepwd-con input'),
            old_pwd     =   pwd.eq(0),
            new_pwd     =   pwd.eq(1),
            re_pwd      =   pwd.eq(2);

        if( !old_pwd.val().length ){
            old_pwd.addClass('invalid');
        }
        if( !new_pwd.val().length || !regPassword.test(new_pwd.val()) ){
            new_pwd.addClass('invalid');
        }
        if( !re_pwd.val().length || new_pwd.val() !== re_pwd.val() ){
            re_pwd.addClass('invalid');
        }

        if( $('.changepwd-con input').hasClass('invalid') ){
            return false;
        }
        else{
            $.ajax({
                url: '/root/changePwdValidate/',
                type:'POST',
                data: {'old': old_pwd.val(), 'new': new_pwd.val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 0 ){
                        alert("旧密码输入错误");
                        $changepwd_btn.html('确认修改');
                    }
                    else if( data.code == 1 ){
                        alert('修改成功');
                        window.location.href = '/root/logout/';
                    }
                }
            });
        }
    },

    onToggleImg         =   function(){
        if( $(this).hasClass('isToggled') ){
            $(this).removeClass('isToggled');
        }
        else{
            $(this).addClass('isToggled');
        }
    },

    onAdd               =   function(){
        if( !$('#name').val().length || !$('#custom').val().length || !$('#account').val().length || !$('#project').val().length || !$('#wechat').val().length ){
            alert('请输入必填项！');
            return false;
        }
        var a           =   $('#executetime').val(),
            b           =   $('#backtime').val();
        if( a.length && b.length ){
            if( a > b ){
                alert('执行时间必须在回款时间之前');
                return false;
            }
        }
        $(this).html('<img src="/static/root/images/loading.gif">');
        setData('/root/addValidate/', '上传', false);
    },

    onChangeForm        =   function(){
        if( !$('#name').val().length && !$('#custom').val().length ){
            alert('请输入姓名和客户名称！');
            return false;
        }
        var a           =   $('#executetime').val(),
            b           =   $('#backtime').val();
        if( a.length && b.length ){
            if( a > b ){
                alert('执行时间必须在回款时间之前');
                return false;
            }
        }
        $(this).html('<img src="/static/root/images/loading.gif">');
        if( window.location.href.indexOf('change') != -1 ){
            setData('/root/changeValidate/', '修改', true);
        }
        else{
            setData('/root/addValidate/', '上传', false);
        }
    },

    setData             =   function(url, word, flag){
        var name        =   $('#name').val(),
            wechat      =   $('#wechat').val(),
            custom      =   $('#custom').val(),
            account     =   $('#account').val(),
            project     =   $('#project').val(),
            type1       =   $('#type1').prop('checked') == true ? 1 : 0,
            type2       =   $('#type2').prop('checked') == true ? 1 : 0,
            type3       =   $('#type3').prop('checked') == true ? 1 : 0,
            type4       =   $('#type4').prop('checked') == true ? 1 : 0,
            type5       =   $('#type5').prop('checked') == true ? 1 : 0,
            type6       =   $('#type6').prop('checked') == true ? 1 : 0,
            type7       =   $('#type7').prop('checked') == true ? 1 : 0,
            bankinfo    =   $('#bankinfo').val(),
            banknumber  =   $('#banknumber').val(),
            count       =   $('#count').val(),
            executetime =   $('#executetime').val().length ? $('#executetime').val() : '1979-01-01',
            executestatus   = parseInt($('input[name="a"]:checked').val() || 0),
            submitstatus    = parseInt($('input[name="b"]:checked').val() || 0),
            comment     =   parseInt($('input[name="c"]:checked').val() || 0),
            backtime    =   $('#backtime').val().length ? $('#backtime').val() : '1979-01-01',
            img         =   img_data ? img_data : $('.img-preload').attr('data'),
            data        =   {'name':name,'wechat':wechat,'custom':custom,'type1':type1,'type2':type2,'type3':type3,'type4':type4,'type5':type5,'type6':type6,'type7':type7,'bankinfo':bankinfo,'banknumber':banknumber,'count':count,'executetime':executetime,'executestatus':executestatus,'submitstatus':submitstatus,'comment':comment,'backtime':backtime,'img':img, 'account': account, 'project': project};

        if( flag ){
            $.extend(data,{"formid":$('.main-container').attr('data')});
        }

        $.ajax({
            url: url,
            type:'POST',
            data: data,
            success: function(data){
                alert(word+'成功');
                window.location.reload();
            },
            error: function(){
                alert(word+'失败，请重试');
                window.location.reload();
            }
        });
    },

    onDelete            =   function(){
        delete_id          =   $(this).attr('data');

        $('.modal').fadeIn();
    },

    onUserDelete            =   function(){
        delete1_id          =   $(this).attr('data');

        $('.modal').fadeIn();
    },

    onCancel            =   function(){
        $('.modal').fadeOut();
    },

    onConfirmDelete     =   function(){
        if( delete_id ){
            $(this).html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/root/delete/',
                type:'POST',
                data: {'formid':delete_id},
                success: function(data){
                    alert('删除成功');
                    window.location.reload();
                },
                error: function(){
                    alert('删除失败，请重试');
                    window.location.reload();
                }
            });
        }
    },

    onConfirmDeleteUser =   function(){
        if( delete1_id ){
            $(this).html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/root/deleteUser/',
                type:'POST',
                data: {'formid':delete1_id},
                success: function(data){
                    alert('删除成功');
                    window.location.reload();
                },
                error: function(){
                    alert('删除失败，请重试');
                    window.location.reload();
                }
            });
        }
    },

    onCodeChange        =   function(){
        $('.code-container').remove();
        $.ajax({
            url: '/code/',
            type:'POST',
            success: function(data){
                $('.code').append($('<img src="/code/" class="code-container">'));
            }
        });
    },

    onImageEnter        =   function(e){
        var right       =   $(window).width() - e.pageX,
            bottom      =   $(window).height() - e.pageY;
        $('<img src="'+ $(this).attr('src') +'" style="position:fixed;right:'+ right +'px;bottom:'+ bottom +'px;max-width:500px;max-height:500px;">').insertAfter($(this));
    },

    onImageLeave        =   function(e){
        $(this).next().remove();
    },

    onPwdReset          =   function(){
        var val         =   $('.reset-input').val(),
            btn         =   $(this);
        btn.html('<img src="/static/root/images/loading.gif">');
        if( val.length ){
            $.ajax({
                url: '/root/resetPwdValidation/',
                type:'POST',
                data: {'mail':val},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        $('.con1').hide();
                        $('.mail').html(val);
                        $('.con2').fadeIn();
                    }
                    else if( data.code == 0 ){
                        alert('请输入正确的注册邮箱');
                        btn.html('下一步，安全验证');
                        return false;
                    }
                },
                error: function(){
                    alert('重置失败，请重试');
                }
            });
        }
        else{
            alert('请输入正确的注册邮箱');
            btn.html('下一步，安全验证');
            return false;
        }
    },

    onUserChange        =   function(){
        $(this).html('<img src="/static/root/images/loading.gif">');
        $.ajax({
            url: '/root/changeUserValidate/',
            type:'POST',
            data: {'mediatype':$('.mediatype').val(),'mediapeople':$('.mediapeople').val(),'mediaattribute':$('.mediaattribute').val(),'fans':$('.fans').val(),'social':$('.social').val(),'account':$('input.account').val(),'desc': $('.desc').val(),'wechat':$('.wechat').val(),'mail':$('.mail').val(),'name':$('.name').val(),'formid':$('.formid').val()},
            success: function(data){
                alert('修改成功');
                window.location.reload();
            },
            error: function(){
                alert('修改失败，请重试');
                window.location.reload();
            }
        });
    },

    onNameKeyup         =   function(){
        $.ajax({
            url: '/root/checkName/',
            type:'POST',
            data: {'wechat': $('#wechat').val()},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    $('#name').val(data.name);   
                    $('#account').val(data.account);   
                    $('#bankinfo').val(data.bankinfo);   
                    $('#banknumber').val(data.banknumber);   
                }
            },
            error: function(){}
        });
    },

    onHandle            =   function(){
        result      =   [];

        $('.select').each(function(){
            if( $(this).prop('checked') == true ){
                result.push($(this).attr('data-id'));
            }
        });

        if( !result.length ){
            alert('请选择');
        }
        else{
            $('.handle-modal input').Zebra_DatePicker();
            $('.handle-modal').fadeIn();
        }
    },

    onHandleSubmit      =   function(){
        var value       =   $('.handle-modal input').val();

        if( !value.length ){
            alert('请选择日期');
        }
        else{
            result = result.toString();
            $.ajax({
                url: '/root/handle/',
                type:'POST',
                data: {'backtime': value, "arr": result},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        alert('操作成功'); 
                        window.location.reload(); 
                    }
                },
                error: function(){}
            });
        }
    },

    onHandleClose       =   function(){
        $('.handle-modal').fadeOut();
    },

    onSelectAll         =   function(){
        $('.select').attr('checked','checked');
    },

    bindEventListener	=	function(){
        $nav.on('touchend', toggleNav);
        $register_btn.on('click', onRegister);
        $login_btn.on('click', onLogin);
        $email_btn.on('click', onEmailBtn);
        $mail.on('click', onEmailBtn);
        $changepwd_btn.on('click', onChangePwd);
        $('.img-preload').on('click', onToggleImg);
        $('.add-submit').on('click', onAdd);
        $('.change-submit').on('click', onChangeForm);
        $('.delete').on('click', onDelete);
        $('.user-delete').on('click', onUserDelete);
        $('.change-button').on('click', onUserChange);
        $('.cancel-button').on('click', onCancel);
        $('.delete-button').on('click', onConfirmDelete);
        $('.delete-user').on('click', onConfirmDeleteUser);
        $(document).on('click', '.code-container', onCodeChange);
        $(document).on('mouseenter', '.img', onImageEnter);
        $(document).on('mouseleave', '.img', onImageLeave);
        $reset_btn.on('click', onPwdReset);
        $('#wechat').on('keyup', onNameKeyup);
        $('.handle').on('click', onHandle);
        $('.handle-modal a.sub').on('click', onHandleSubmit);
        $('.handle-modal a.handle-close').on('click', onHandleClose);
        $('.select-all').on('click', onSelectAll);
    };

    $(init);
})();



