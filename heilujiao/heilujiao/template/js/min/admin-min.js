!function(){"use strict";var e=$("body"),a="",t=0,l=function(){$("#upload").uploadify({swf:"/static/js/uploadify.swf",uploader:"/upload/",cancelImage:"/static/images/cancel.png",buttonClass:"btn",removeCompleted:!0,fileTypeExts:"*.jpg;*.jpeg;*.gif;*.png;*.bmp",multi:!0,auto:!0,buttonText:"上传图片",onUploadSuccess:function(e,a,t){n(a)}}),$(".story").length&&(CKEDITOR.replace("story"),CKEDITOR.replace("material"),CKEDITOR.replace("recipe")),$(".content").length&&CKEDITOR.replace("content"),O()},n=function(e){a=e,$(".img-preview").html("<p>链接：http://www.heilujiao.com/static/upload/"+e+'</p><img src="/static/upload/'+e+'">')},o=function(){$.ajax({url:"/addDeal/",type:"POST",data:{name:$(".name").val(),img:a,price:parseInt($(".price").val()),time:$(".time").val(),hard:parseInt($(".hard").val()),tool:$(".tool").val(),story:CKEDITOR.instances.story.getData(),material:CKEDITOR.instances.material.getData(),recipe:CKEDITOR.instances.recipe.getData(),dealType:parseInt($(".dealType").val()),extra:parseInt($(".extra").val()||0),order:$(".order").val(),count:$(".count").val()},success:function(e){e=JSON.parse(e),1==e.code?(alert("添加成功!"),window.location.reload()):alert("添加失败")}})},c=function(){$.ajax({url:"/changeDeal/",type:"POST",data:{name:$(".name").val(),img:a?a:$(".img-preview img").attr("data"),price:parseInt($(".price").val()),time:$(".time").val(),hard:parseInt($(".hard").val()),tool:$(".tool").val(),story:CKEDITOR.instances.story.getData(),material:CKEDITOR.instances.material.getData(),recipe:CKEDITOR.instances.recipe.getData(),dealType:parseInt($(".dealType").val()),extra:parseInt($(".extra").val()||0),order:"None"==$(".order").val()?0:$(".order").val(),count:$(".count").val(),changeid:$(".changeid").val()},success:function(e){e=JSON.parse(e),1==e.code?(alert("修改成功!"),window.location.reload()):alert("修改失败")}})},i=function(){$.ajax({url:"/slideAdd/",type:"POST",data:{slide1:$(".slide1").val(),slide2:$(".slide2").val(),slide3:$(".slide3").val(),slide4:$(".slide4").val(),slide5:$(".slide5").val(),slide6:$(".slide6").val(),slide7:$(".slide7").val(),slide8:$(".slide8").val(),slide9:$(".slide9").val(),slide10:$(".slide10").val(),num:$(".num").val()},success:function(e){e=JSON.parse(e),1==e.code?(alert("添加成功!"),window.location.reload()):alert("添加失败")}})},d=function(){$.ajax({url:"/blogAdd/",type:"POST",data:{title:$(".title").val(),content:CKEDITOR.instances.content.getData()},success:function(e){e=JSON.parse(e),1==e.code?(alert("添加成功!"),window.location.reload()):alert("添加失败")}})},r=function(){$.ajax({url:"/blogChange/",type:"POST",data:{title:$(".title").val(),content:CKEDITOR.instances.content.getData(),changeid:$(".changeid").val()},success:function(e){e=JSON.parse(e),1==e.code?(alert("修改成功!"),window.location.reload()):alert("修改失败")}})},s=function(){$.ajax({url:"/validateTip/",type:"POST",data:{content:CKEDITOR.instances.content.getData()},success:function(e){e=JSON.parse(e),1==e.code?(alert("修改成功!"),window.location.reload()):alert("修改失败")}})},p=function(){$(".delete-modal").fadeIn(),t=$(this).attr("delete-id")},u=function(){$(".delete-modal").fadeOut()},v=function(){$.ajax({url:"/confirmDelete/",type:"POST",data:{id:t},success:function(e){e=JSON.parse(e),1==e.code?(alert("删除成功!"),window.location.reload()):alert("删除失败")}})},g=function(){$.ajax({url:"/confirmDeleteBlog/",type:"POST",data:{id:t},success:function(e){e=JSON.parse(e),1==e.code?(alert("删除成功!"),window.location.reload()):alert("删除失败")}})},f=function(){$.ajax({url:"/confirmDeleteCoupon/",type:"POST",data:{id:t},success:function(e){e=JSON.parse(e),1==e.code?(alert("删除成功!"),window.location.reload()):alert("删除失败")}})},m=function(){$.ajax({url:"/addCouponValidate/",type:"POST",data:{price:$(".price").val(),phone:$(".phone").val()},success:function(e){e=JSON.parse(e),1==e.code?(alert("添加成功!"),window.location.reload()):alert("添加失败")}})},O=function(){$(".add").on("click",o),$(".change").on("click",c),$(".slide-add").on("click",i),$(".blog-add").on("click",d),$(".blog-change").on("click",r),$(".tip-change").on("click",s),$(".deleteDeal, .deleteBlog, .delete-coupon").on("click",p),$(".cancel-delete").on("click",u),$(".submit-delete").on("click",v),$(".submit-delete-blog").on("click",g),$(".submit-delete-coupon").on("click",f),$(".add-coupon").on("click",m)};$(l)}();