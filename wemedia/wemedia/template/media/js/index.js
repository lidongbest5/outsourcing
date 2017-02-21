(function(){
    var $nav 		=	$('.mobile-nav'),
    	$nav_con	=	$('nav'),
        $register_btn   =   $('.register-button'),
        $email_btn      =   $('.email-button'),
        $mail           =   $('a.mail'),
        $login_btn      =   $('.login-btn'),
        $changepwd_btn  =   $('.changepwd-btn'),
        $change_btn     =   $('.change-button'),
        $bank_button    =   $('.bank-button'),
        $reset_btn      =   $('.reset-button'),

        regExpEmail     =   new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
        regPassword     =   new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/),

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

    onRegister          =   function(){
        var mail        =   $('.mail input'),
            pwd         =   $('.password input'),
            repwd       =   $('.re-password input'),
            account     =   $('.account input'),
            name        =   $('.name input'),
            wechat      =   $('.wechat input');

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
        if( !account.val().length ){
            account.addClass('invalid');
            $('<p class="tip">'+ account.attr('placeholder') +'</p>').insertAfter(account);
        }
        if( !wechat.val().length ){
            wechat.addClass('invalid');
            $('<p class="tip">'+ wechat.attr('placeholder') +'</p>').insertAfter(wechat);
        }

        if( $('.register-container input').hasClass('invalid') ){
            $(document).scrollTop(0);
            return false;
        }
        else{
            var $btn    =   $(this);
            $btn.html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/media/registerValidate/',
                type:'POST',
                data: {'name': name.val(), 'mail': mail.val(), 'password': pwd.val(), 'mediatype': $('.type input').val(), 'mediapeople': $('.media-people textarea').val(), 'mediaattribute': $('.media-attribute textarea').val(), 'fans': $('.fans input').val(), 'social': $('.social input').val(), 'account': account.val(), 'desc': $('.desc textarea').val(), 'wechat': wechat.val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        window.location.href = '/media/mediaValidation/';
                    }
                    else if( data.code == 2 ){
                        alert('已注册过此微信ID');
                        $btn.html('注册');
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
                url: '/media/mediaLoginValidate/',
                type:'POST',
                data: {'mail': $('.user input').val(), 'pwd': $('.password input').val(), 'code': $('.code-con input').val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 0 ){
                        window.location.href = '/media/mediaValidation/';
                    }
                    else if( data.code == 4 ){
                        window.location.href = '/media/';
                    }
                    else if( data.code == 5 ){
                        window.location.href = '/media/guide/';
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
            $(this).html('<img src="/static/root/images/loading.gif">');
            $.ajax({
                url: '/media/changePwdValidate/',
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
                        window.location.href = '/media/logout/';
                    }
                }
            });
        }
    },

    onChangeInfo        =   function(){
        $(this).html('<img src="/static/root/images/loading.gif">');
        $.ajax({
            url: '/media/changeValidate/',
            type:'POST',
            data: {'mediatype':$('.mediatype').val(),'mediapeople':$('.mediapeople').val(),'mediaattribute':$('.mediaattribute').val(),'fans':$('.fans').val(),'social':$('.social').val(),'account':$('input.account').val(),'desc': $('.desc').val()},
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

    onBankChange        =   function(){
        if( !$('.bank-other input').val().length || !$('.full-name input').val().length || !$('.bank-number input').val().length ){
            alert('请完整填写银行卡信息！');
            return false;
        }
        $(this).html('<img src="/static/root/images/loading.gif">');
        $.ajax({
            url: '/media/bankValidate/',
            type:'POST',
            data: {'bank':$('.bank-other input').val(),'bankname':$('.full-name input').val(),'banknumber':$('.bank-number input').val()},
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

    onBankSelect        =   function(){
        var name        =   $(this).attr('data');

        $('.bank-other input').val(name);
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
        var right       =   $(window).width() - e.pageX;
        $('<img src="'+ $(this).attr('src') +'" style="position:fixed;right:'+ right +'px;top:'+ e.pageY +'px;max-width:500px;max-height:500px;">').insertAfter($(this));
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
                url: '/media/resetPwdValidation/',
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

    onNumberChange      =   function( e ){
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                     // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    },

    bindEventListener	=	function(){
        $nav.on('touchend', toggleNav);
        $register_btn.on('click', onRegister);
        $login_btn.on('click', onLogin);
        $email_btn.on('click', onEmailBtn);
        $mail.on('click', onEmailBtn);
        $changepwd_btn.on('click', onChangePwd);
        $change_btn.on('click', onChangeInfo);
        $bank_button.on('click', onBankChange);
        $('.bank-con input[type="radio"]').on('click',onBankSelect);
        $(document).on('click', '.code-container', onCodeChange);
        $(document).on('mouseenter', '.img', onImageEnter);
        $(document).on('mouseleave', '.img', onImageLeave);
        $reset_btn.on('click', onPwdReset);
        $('.fans, .social').on('keydown', onNumberChange);
    };

    $(init);
})();



