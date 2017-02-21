(function(){
    "use strict";

    var $body 		=	$('body'),

    	img 		=	'',

        deleteId    =   0,

    init			=	function(){
        $('#upload').uploadify ({
            'swf'       : '/static/js/uploadify.swf',
            'uploader'  : '/upload/', 
            'cancelImage' : '/static/images/cancel.png',
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

        if( $('.story').length ){
        	CKEDITOR.replace( 'story' );
        	CKEDITOR.replace( 'material' );
        	CKEDITOR.replace( 'recipe' );
        }

        if( $('.content').length ){
        	CKEDITOR.replace( 'content' );
        }
        
    	bindEventListener();
    },

    setImg 				=	function( data ){
    	img 			=	data;
    	$('.img-preview').html('<p>链接：http://www.heilujiao.com/static/upload/'+ data +'</p><img src="/static/upload/'+ data +'">')
    },

    onAdd 				=	function(){
    	$.ajax({
    	    url: '/addDeal/',
    	    type:'POST',
    	    data: {'name': $('.name').val(),'img': img, 'price': parseInt($('.price').val()), 'time': $('.time').val(), 'hard': parseInt($('.hard').val()), 'tool': $('.tool').val(), 'story': CKEDITOR.instances['story'].getData(), 'material': CKEDITOR.instances['material'].getData(), 'recipe': CKEDITOR.instances['recipe'].getData(), 'dealType': parseInt($('.dealType').val()), 'extra': parseInt($('.extra').val() || 0), 'order': $('.order').val(),'count': $('.count').val()},
    	    success: function(data){
    	        data    =   JSON.parse(data);
    	        if( data.code == 1 ){
    	            alert('添加成功!');
    	            window.location.reload();
    	        }
    	        else{
    	            alert('添加失败');
    	        }
    	    }
    	});
    },

    onChangeDeal        =   function(){
        $.ajax({
            url: '/changeDeal/',
            type:'POST',
            data: {'name': $('.name').val(),'img': img ? img : $('.img-preview img').attr('data'), 'price': parseInt($('.price').val()), 'time': $('.time').val(), 'hard': parseInt($('.hard').val()), 'tool': $('.tool').val(), 'story': CKEDITOR.instances['story'].getData(), 'material': CKEDITOR.instances['material'].getData(), 'recipe': CKEDITOR.instances['recipe'].getData(), 'dealType': parseInt($('.dealType').val()), 'extra': parseInt($('.extra').val() || 0), 'order': $('.order').val() == 'None' ? 0 : $('.order').val(),'count': $('.count').val(), 'changeid': $('.changeid').val()},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('修改成功!');
                    window.location.reload();
                }
                else{
                    alert('修改失败');
                }
            }
        });
    },

    onSlideAdd 			=	function(){
    	$.ajax({
    	    url: '/slideAdd/',
    	    type:'POST',
    	    data: {'slide1':$('.slide1').val(),'slide2':$('.slide2').val(),'slide3':$('.slide3').val(),'slide4':$('.slide4').val(),'slide5':$('.slide5').val(),'slide6':$('.slide6').val(),'slide7':$('.slide7').val(),'slide8':$('.slide8').val(),'slide9':$('.slide9').val(),'slide10':$('.slide10').val(), 'num': $('.num').val()},
    	    success: function(data){
    	        data    =   JSON.parse(data);
    	        if( data.code == 1 ){
    	            alert('添加成功!');
    	            window.location.reload();
    	        }
    	        else{
    	            alert('添加失败');
    	        }
    	    }
    	});
    },

    onBlogAdd 				=	function(){
    	$.ajax({
    	    url: '/blogAdd/',
    	    type:'POST',
    	    data: {'title': $('.title').val(), 'content': CKEDITOR.instances['content'].getData()},
    	    success: function(data){
    	        data    =   JSON.parse(data);
    	        if( data.code == 1 ){
    	            alert('添加成功!');
    	            window.location.reload();
    	        }
    	        else{
    	            alert('添加失败');
    	        }
    	    }
    	});
    },

    onBlogChange        =   function(){
        $.ajax({
            url: '/blogChange/',
            type:'POST',
            data: {'title': $('.title').val(), 'content': CKEDITOR.instances['content'].getData(), 'changeid': $('.changeid').val()},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('修改成功!');
                    window.location.reload();
                }
                else{
                    alert('修改失败');
                }
            }
        });
    },

    onTipChange         =   function(){
        $.ajax({
            url: '/validateTip/',
            type:'POST',
            data: {'content': CKEDITOR.instances['content'].getData()},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('修改成功!');
                    window.location.reload();
                }
                else{
                    alert('修改失败');
                }
            }
        });
    },

    onDelete            =   function(){
        $('.delete-modal').fadeIn();
        deleteId        =   $(this).attr('delete-id');
    },

    onHideDelete        =   function(){
        $('.delete-modal').fadeOut();
    },

    onConfirmDelete     =   function(){
        $.ajax({
            url: '/confirmDelete/',
            type:'POST',
            data: {id: deleteId},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('删除成功!');
                    window.location.reload();
                }
                else{
                    alert('删除失败');
                }
            }
        });
    },

    onConfirmDeleteBlog =   function(){
        $.ajax({
            url: '/confirmDeleteBlog/',
            type:'POST',
            data: {id: deleteId},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('删除成功!');
                    window.location.reload();
                }
                else{
                    alert('删除失败');
                }
            }
        });
    },

    onConfirmDeleteCoupon   =   function(){
        $.ajax({
            url: '/confirmDeleteCoupon/',
            type:'POST',
            data: {id: deleteId},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('删除成功!');
                    window.location.reload();
                }
                else{
                    alert('删除失败');
                }
            }
        });
    },

    onAddCoupon         =   function(){
        $.ajax({
            url: '/addCouponValidate/',
            type:'POST',
            data: {price: $('.price').val(), 'phone': $('.phone').val()},
            success: function(data){
                data    =   JSON.parse(data);
                if( data.code == 1 ){
                    alert('添加成功!');
                    window.location.reload();
                }
                else{
                    alert('添加失败');
                }
            }
        });
    },

    bindEventListener	=	function(){
        $('.add').on('click', onAdd);
        $('.change').on('click', onChangeDeal);
        $('.slide-add').on('click', onSlideAdd);
        $('.blog-add').on('click', onBlogAdd);
        $('.blog-change').on('click', onBlogChange);
        $('.tip-change').on('click', onTipChange);
        $('.deleteDeal, .deleteBlog, .delete-coupon').on('click', onDelete);
        $('.cancel-delete').on('click', onHideDelete);
        $('.submit-delete').on('click', onConfirmDelete);
        $('.submit-delete-blog').on('click', onConfirmDeleteBlog);
        $('.submit-delete-coupon').on('click', onConfirmDeleteCoupon);
        $('.add-coupon').on('click', onAddCoupon);
    };

    $(init);
})();



