(function(){
    "use strict";

    var $body 		=	$('body'),
    	$slide 		=	$('.banner'),
    	$slide_con 	=	$('.banner-container >div'),
    	$dot 		=	$('.banner-dots a'),
    	$blog_dot 	=	$('.blog-dot a'),
    	$blog_con 	=	$('.blog-con'),
    	$menu_dot 	=	$('.menu-dot a'),
    	$menu_con 	=	$('.menu-slide'),
    	$detail_left= 	$('.detail-left'),
        $login      =   $('nav .login, .login-btn'),
        $register   =   $('nav .register, .register-btn'),
        $close      =   $('.close'),
        $menu       =   $('.menu-slide'),
        $hard       =   $('.detail-info .hard'),
        $plus       =   $('.plus'),
        $minus      =   $('.minus'),
        $cart       =   $('.cart-container'),
        $address_save   =   $('.address-con .save'),
        $address_change   =   $('.address-con .change'),
        $submit         =   $('.submit-container'),

    	width 		=	$body.width(),

        regPhone        =   new RegExp(/^1\d{10}$/),
        regPassword     =   new RegExp(/^\w{6,20}$/),

        total           =   0,
        coupon          =   0,
        capchaValue     =   '',

    init			=	function(){
        $.cookie.json = true;
        if( !$.cookie('cart') ){
            $.cookie('cart', '[]', { path: '/' });
        }
        getCart();

        if( $slide.length ){
        	setSlide();
        }

        if( $detail_left.length ){
        	// setDetail();
        	// $(window).on('scroll', onDetailScroll);
        }

        if( $menu.length ){
            setMenu();
        }

        if( $blog_con.length ){
            setBlog();
        }

        if( $hard.length ){
            setHard();
        }

        if( $cart.length ){
            setCartContainer();
        }

        if( $submit.length ){
            setSubmit();
        }

    	bindEventListener();
    },

    setCartContainer    =   function(){
        var html        =   '',
            cart        =   JSON.parse($.cookie('cart')),
            len         =   cart.length,
            item_len    =   cart_items.length,
            cart_total       =   0;

        for(var i = 0;i < len;i++){
            for(var m = 0;m < item_len;m++){
                if( cart_items[m].id === parseInt(cart[i].id) ){
                    html    +=  '<tr><td><img src="/static/upload/'+cart_items[m].img+'"><span>'+cart_items[m].name+'</span></td><td class="cart_price" data-price="'+cart_items[m].price+'">￥'+cart_items[m].price+'</td><td><a class="minus active">-</a><input type="text" value="'+cart[i].count+'" class="cart_count" data-id="'+cart_items[m].id+'"><a class="plus active">+</a></td><td class="cart_total">￥'+cart_items[m].price*cart[i].count+'</td><td><a class="delete">删除</a></td></tr>';

                    cart_total   +=  cart_items[m].price*cart[i].count;
                }
            }
        }

        $cart.find('tbody').html(html);
        $cart.find('.total span').html('￥'+cart_total);
    },

    setSubmit           =   function(){
        var html        =   '',
            cart        =   JSON.parse($.cookie('cart')),
            len         =   cart.length,
            item_len    =   cart_items.length,
            delevery_text    =   '运费';

        total           =   0;

        for(var i = 0;i < len;i++){
            for(var m = 0;m < item_len;m++){
                if( cart_items[m].id === parseInt(cart[i].id) ){
                    html    +=  '<tr><td>'+cart_items[m].name+'</td><td>￥'+cart_items[m].price+'</td><td>'+cart[i].count+'</td><td>￥'+cart_items[m].price*cart[i].count+'</td></tr>';

                    total   +=  cart_items[m].price*cart[i].count;
                }
            }
        }

        if( order_length >= 6 ){
            total      =   Math.floor(total*0.95); 
            html            +=  '<tr><td></td><td></td><td>会员享受9.5折</td><td>￥'+ total +'</td></tr>';
        }

        var delevery    =   0;

        if( total <= 108 ){
            if( order_length == 0 ){
                delevery    =   0;
                delevery_text   =   '运费(首单免费)'
            }
            else{
                delevery    =   10;
            }
            total  +=  delevery;
        }

        html            +=  '<tr><td></td><td></td><td>'+delevery_text+'</td><td>￥'+delevery+'</td></tr><tr class="total"><td></td><td></td><td>支付金额</td><td class="total-count">￥'+ total +'</td></tr>';

        $submit.find('tbody').html(html);
    },

    setHard             =   function(){
        var $dom        =   $hard.next('ul'),
            hard        =   parseInt($hard.attr('data-value'));

        $dom.find('li:lt('+hard+')').addClass('active');
    },

    setMenu             =   function(){
        var li          =   $menu.find('li'),
            len         =   li.length,
            page        =   $('.menu-dot a').length;

        for( var i = 0; i < page; i++ ){
            var start   =   i*12,
                end     =   i == page - 1 ? len : (i+1)*12,
                $ul     =   $('<ul></ul>');
            for( var m = start; m < end; m++ ){
                $ul.append(li.eq(m));
            }
            $menu.append($ul);
        }
    },

    setBlog             =   function(){
        var li          =   $blog_con.find('li'),
            len         =   li.length,
            page        =   $('.blog-dot a').length;

        for( var i = 0; i < page; i++ ){
            var start   =   i*2,
                end     =   i == page - 1 ? len : (i+1)*2,
                $ul     =   $('<ul></ul>');
            for( var m = start; m < end; m++ ){
                $ul.append(li.eq(m));
            }
            $blog_con.append($ul);
        }
    },

    onDetailScroll 		=	function(){
    	var top 		=	$(window).scrollTop();

    	if( top > 180 ){
    		$detail_left.css('top', 20);
    	}
    	else{
    		$detail_left.css('top', 217);
    	}
    },

    setSlide 			=	function(){
    	$slide.find('img').width(width);

    	$dot.on('click', onSlide);
    },

    setDetail 			=	function(){
    	$detail_left.css('left',(width-1000)/2 - 93);
    },

    onSlide 			=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($slide_con, 0.5, {left: -(index-1)*width});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    onBlogSlide 		=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($blog_con, 0.5, {left: -(index-1)*780});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    onMenuSlide 		=	function(){
    	var $this 		=	$(this),
    		index 		=	parseInt($this.attr('data-id'));

    	TweenLite.to($menu_con, 0.5, {left: -(index-1)*1000});
    	$this.addClass('cur').siblings().removeClass('cur');
    },

    onShowLogin         =   function(){
        $('.user-modal').removeClass('register-modal').removeClass('pwd-modal').addClass('login-modal').fadeIn();
    },

    onShowRegister      =   function(){
        $('.user-modal').removeClass('login-modal').removeClass('pwd-modal').addClass('register-modal').fadeIn();
    },

    onForgetPwd         =   function(){
        $('.user-modal').removeClass('login-modal').removeClass('register-modal').addClass('pwd-modal').fadeIn();
    },

    onModalClose        =   function(){
        $('.user-modal').removeClass('login-modal').removeClass('register-modal').fadeOut();
    },

    onRegisterSubmit    =   function(){
        var $this       =   $('.user-modal .register'),
            phone       =   $this.find('.phone'),
            capcha      =   $this.find('.capcha input'),
            password    =   $this.find('.password'),
            repassword  =   $this.find('.repassword');

        $this.find('.tip').remove();
        $this.find('input').removeClass('invalid');
        $(this).html('<img src="/static/images/loading.gif">');

        if( !regPhone.test(phone.val()) ){
            phone.addClass('invalid');
            $('<p class="tip">'+ phone.attr('placeholder') +'</p>').insertAfter(phone);
        }
        if( !capcha.val().length || capcha.val() != capchaValue ){
            capcha.addClass('invalid');
            $('<p class="tip">请输入正确验证码</p>').insertAfter(capcha.closest('.capcha'));
        }
        if( !regPassword.test(password.val()) ){
            password.addClass('invalid');
            $('<p class="tip">'+ password.attr('placeholder') +'</p>').insertAfter(password);
        }
        if( password.val() != repassword.val() ){
            repassword.addClass('invalid');
            $('<p class="tip">'+ repassword.attr('placeholder') +'</p>').insertAfter(repassword);
        }

        if( !$this.find('.invalid').length ){
            $.ajax({
                url: '/register/',
                type:'POST',
                data: {'phone': phone.val(),'password': password.val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        onShowLogin();
                        alert('注册成功！');
                    }
                    else{
                        $('<p class="tip">此手机号已注册！</p>').insertAfter(repassword);
                        $('.user-modal .register .submit').html('注册');
                    }
                }
            });
        }
        else{
            $(this).html('注册');
        }
    }, 

    onFogetSubmit       =   function(){
        var $this       =   $('.user-modal .pwdback'),
            phone       =   $this.find('.phone'),
            capcha      =   $this.find('.capcha input'),
            password    =   $this.find('.password'),
            repassword  =   $this.find('.repassword');

        $this.find('.tip').remove();
        $this.find('input').removeClass('invalid');
        $(this).html('<img src="/static/images/loading.gif">');

        if( !regPhone.test(phone.val()) ){
            phone.addClass('invalid');
            $('<p class="tip">'+ phone.attr('placeholder') +'</p>').insertAfter(phone);
        }
        if( !capcha.val().length || capcha.val() != capchaValue ){
            capcha.addClass('invalid');
            $('<p class="tip">请输入正确验证码</p>').insertAfter(capcha.closest('.capcha'));
        }
        if( !regPassword.test(password.val()) ){
            password.addClass('invalid');
            $('<p class="tip">'+ password.attr('placeholder') +'</p>').insertAfter(password);
        }
        if( password.val() != repassword.val() ){
            repassword.addClass('invalid');
            $('<p class="tip">'+ repassword.attr('placeholder') +'</p>').insertAfter(repassword);
        }

        if( !$this.find('.invalid').length ){
            $.ajax({
                url: '/forgetpwd/',
                type:'POST',
                data: {'phone': phone.val(),'password': password.val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        onShowLogin();
                        alert('找回成功！');
                    }
                    else{
                        $('<p class="tip">此手机号还没有注册！</p>').insertAfter(repassword);
                        $('.user-modal .pwdback .submit').html('确定');
                    }
                }
            });
        }
        else{
            $(this).html('注册');
        }
    },

    onLoginSubmit       =   function(){
        var $this       =   $('.user-modal .login'),
            phone       =   $this.find('.phone'),
            password    =   $this.find('.password');

        $this.find('.tip').remove();
        $(this).html('<img src="/static/images/loading.gif">');
        if( !phone.val().length || !password.val().length ){
            $('<p class="tip">请输入账号或密码</p>').insertAfter(password);
            $(this).html('登录');
        }
        else{
            $.ajax({
                url: '/login/',
                type:'POST',
                data: {'phone': phone.val(),'password': password.val()},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 0 ){
                        onModalClose();
                        $('nav .user').html('<a href="/address/">您好，'+ phone.val() +'，</a><a href="/logout/">退出</a>');
                    }
                    else{
                        $('<p class="tip">手机号或密码错误</p>').insertAfter(password);
                        $('.user-modal .login .submit').html('登录');
                    }
                }
            });
        }
    },

    setCart             =   function(){
        var $this       =   $(this),
            id          =   $this.attr('data-id');

        var cart        =   JSON.parse($.cookie('cart')),
            count       =   parseInt($('.count input').val()),
            len         =   cart.length,
            flag        =   false;

        for( var i = 0;i < len;i++ ){
            if( cart[i].id === id ){
                cart[i].count += count;
                flag    =   true;
                break;
            }
        }
        if( !flag ){
            cart.push({'id':id,'count':count});
        }

        $.cookie('cart', JSON.stringify(cart), { path: '/' });
        $('.cart i').html(cart.length);

        $('.popup').fadeIn();
        setTimeout(function(){
            $('.popup').fadeOut();
        }, 1000);
    }, 

    getCart             =   function(){
        var cart        =   $.cookie('cart');
        cart            =   JSON.parse(cart);

        $('.cart i').html(cart.length);
    },

    buy                 =   function(){
        var $this       =   $(this),
            id          =   $this.attr('data-id');

        var cart        =   JSON.parse($.cookie('cart')),
            count       =   parseInt($('.count input').val()),
            len         =   cart.length,
            flag        =   false;

        for( var i = 0;i < len;i++ ){
            if( cart[i].id === id ){
                cart[i].count += count;
                flag    =   true;
                break;
            }
        }
        if( !flag ){
            cart.push({'id':id,'count':count});
        }

        $.cookie('cart', JSON.stringify(cart), { path: '/' });
        $('.cart i').html(cart.length);
        window.location.href = '/cart/';
    },

    onPlus              =   function( dom ){
        var $this       =   $(this),
            $text       =   $this.siblings('input'),
            value       =   $text.val();

        $text.val(++value);
        if( value > 1 ){
            $(this).siblings('.minus').addClass('active');
        }
    },

    onMinus             =   function( dom ){
        var $this       =   $(this),
            $text       =   $this.siblings('input'),
            value       =   $text.val(),
            num         =   $text.attr('data-value');

        if( value > num ){
            $text.val(--value);
        }   
        else{
            $(this).removeClass('active');
        }
    },

    onSaveAddress       =   function(){
        if( !$('.address').val().length ){
            alert('请输入详细地址');
        }
        else if( !$('.name').val().length ){
            alert('收货人姓名');
        }
        else if( !$('.phone').val().length ){
            alert('手机号码');
        }
        else{
            $.ajax({
                url: '/saveAddress/',
                type:'POST',
                data: {'district': $('.district').val(),'address': $('.address').val(), 'postcode': $('.postcode').val(), 'name': $('.name').val(), 'phone': $('.phone').val(), 'default': $('.default').prop('checked') == true ? 1 : 0},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        alert('保存成功');
                        window.location.reload();
                    }
                }
            });
        }
    },

    onChangeAddress     =   function(){
        if( !$('.address').val().length ){
            alert('请输入详细地址');
        }
        else if( !$('.name').val().length ){
            alert('收货人姓名');
        }
        else if( !$('.phone').val().length ){
            alert('手机号码');
        }
        else{
            $.ajax({
                url: '/changeAddressSave/',
                type:'POST',
                data: {'district': $('.district').val(),'address': $('.address').val(), 'postcode': $('.postcode').val(), 'name': $('.name').val(), 'phone': $('.phone').val(), 'default': $('.default').prop('checked') == true ? 1 : 0,'id': $address_change.attr('data-id')},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        alert('保存成功');
                        window.location.reload();
                    }
                }
            });
        }
    },

    onCartPlus          =   function(){
        var $this       =   $(this),
            $text       =   $this.siblings('input'),
            value       =   $text.val();

        $text.val(++value);
        if( value > 1 ){
            $(this).siblings('.minus').addClass('active');
        }

        var item        =   $(this).closest('tr');
        item.find('.cart_total').html('￥' + item.find('.cart_price').attr('data-price') * item.find('.cart_count').val());

        onTotal();
    },

    onCartMinus         =   function(){
        var $this       =   $(this),
            $text       =   $this.siblings('input'),
            value       =   $text.val();

        if( value > 1 ){
            $text.val(--value);
        }   
        else{
            $(this).removeClass('active');
        }

        var item        =   $(this).closest('tr');
        item.find('.cart_total').html('￥' + item.find('.cart_price').attr('data-price') * item.find('.cart_count').val());

        onTotal();
    },

    onCartDelete        =   function(){
        var $this       =   $(this);

        $this.closest('tr').remove();

        onTotal();
    },

    onTotal             =   function(){
        var item        =   $cart.find('table tbody tr'),
            len         =   item.length,
            arr         =   [];

        total            =   0;

        for(var i = 0; i < len;i++){
            total       +=  parseInt(item.eq(i).find('.cart_price').attr('data-price')) * parseInt(item.eq(i).find('.cart_count').val());
            arr.push({'id':item.eq(i).find('.cart_count').attr('data-id'),'count':item.eq(i).find('.cart_count').val()});
        }

        $cart.find('.total span').html('￥'+total);
        $.cookie('cart', JSON.stringify(arr), { path: '/' });
    },

    onDeleteAddress     =   function(){
        var $this       =   $(this),
            id          =   $this.attr('data-id');

        $.ajax({
            url: '/deleteAddress/',
            type:'POST',
            data: {'id': id},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('删除成功');
                    window.location.reload();
                }
            }
        });
    },

    getCapcha           =   function(){
        if( !capchaValue.length ){
            for( var i = 0; i < 4; i++ ){
                capchaValue +=   Math.floor(Math.random()*10);
            }
        }

        $.ajax({
            url: '/setCapcha/',
            type:'POST',
            data: {'phone': $('.user-modal').hasClass('pwd-modal') ? $('.pwdback .phone').val() : $('.register .phone').val(), 'capcha': capchaValue},
            success: function(data){
                $('.capcha a').addClass('active');
                $('.capcha a').off('click', getCapcha);
            }
        });
    },

    onSubmitClick       =   function(){
        if( $('.user').find('.login').length ){
            onShowLogin();
            return false;
        }
    },

    onCheckCoupon       =   function(){
        var value       =   $('.coupon input').val();

        if( !value.length ){
            alert('请输入优惠券');
        }
        else{
            $.ajax({
                url: '/validateCoupon/',
                type:'POST',
                data: {'coupon': value},
                success: function(data){
                    data    =   JSON.parse(data);
                    if( data.code == 1 ){
                        coupon  =   data.price;
                        total   =   total - coupon;
                        $('.total-count').html(total);
                        $('.coupon').html('<span>已使用'+coupon+'元优惠券</span><a data="'+ data.id +'" class="coupon-cancel">取消</a>');
                    }
                    else{
                        alert('请输入正确优惠券');
                    }
                }
            });
        }
    },

    onCancelCoupon      =   function(){
        var couponid        =   $(this).attr('data');

        $.ajax({
            url: '/cancelCoupon/',
            type:'POST',
            data: {'coupon': couponid},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    total   =   total + coupon;
                    $('.total-count').html(total);
                    $('.coupon').html('<input type="text" placeholder="输入优惠券号码"><a class="coupon-btn">确认</a>');
                }
                else{
                    alert('失败，请重试');
                }
            }
        });
    },

    onCheckPayment      =   function(){
        var transactionid = (new Date()).getTime();

        $.ajax({
            url: '/payment/',
            type:'POST',
            data: {'transactionid': transactionid, 'total': total, 'items': $.cookie('cart')},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    window.location.href = '/pay/?orderid='+transactionid+'&title=黑鹿角西餐&total='+total;
                }
            }
        });
    },

    bindEventListener	=	function(){
        $blog_dot.on('click', onBlogSlide);
        $menu_dot.on('click', onMenuSlide);
        $login.on('click', onShowLogin);
        $register.on('click', onShowRegister);
        $('.forgetpwd').on('click', onForgetPwd);
        $close.on('click', onModalClose);
        $('.user-modal .login .submit').on('click', onLoginSubmit);
        $('.user-modal .register .submit').on('click', onRegisterSubmit);
        $('.user-modal .pwdback .submit').on('click', onFogetSubmit);
        $('.addCart').on('click', setCart);
        $('.buy').on('click', buy);
        $plus.on('click', onPlus);
        $minus.on('click', onMinus);
        $address_save.on('click', onSaveAddress);
        $address_change.on('click', onChangeAddress);
        $cart.on('click', '.plus', onCartPlus);
        $cart.on('click', '.minus', onCartMinus);
        $cart.on('click', '.delete', onCartDelete);
        $('.delete-address').on('click', onDeleteAddress);
        $('.capcha a').on('click', getCapcha);
        $('.submit').on('click', onSubmitClick);
        $('.coupon').on('click', '.coupon-btn' , onCheckCoupon);
        $('.coupon').on('click', '.coupon-cancel' , onCancelCoupon);
        $('.payment').on('click', onCheckPayment);
    };

    $(init);
})();



