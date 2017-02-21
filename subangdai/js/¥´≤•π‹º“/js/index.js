//上传头像


      //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
//                img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }
        function clacImgZoomParam( maxWidth, maxHeight, width, height ){
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight )
            {
                rateWidth = width / maxWidth;
                rateHeight = height / maxHeight;
                
                if( rateWidth > rateHeight )
                {
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else
                {
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }
//表单验证
function test(){
	if(document.a.b.value.length>200)
	{
		alert("不能超过50个字符！");
		document.a.b.focus();
		return false;
	}
}
//搜索删除
function showBtn(){
				if(document.getElementById('texter').value.length > 0){
				document.getElementById('clearBtn').style.display = 'block';
				}else{
				document.getElementById('clearBtn').style.display = 'none';
				}
				}
				function clearText(){
				document.getElementById('texter').value = '';
				document.getElementById('clearBtn').style.display = 'none';
			}
//分页切换
var pagnation=$("#pagnation");
	$(document).on("keydown",function(event){
		switch(event.keyCode){
			 case 37 : window.location.href = pagnation.find(".page-prev").attr("href");break;
			 case 39 : window.location.href = pagnation.find(".page-next").attr("href");break
		}
	});
	//点击显示隐藏
function showdiv(targetid,objN){
   
      var target=document.getElementById(targetid);
      var clicktext=document.getElementById(objN)

            if (target.style.display=="block"){
                target.style.display="none";
               
  

            } else {
                target.style.display="block";
               
            }
   
}

//类型选择
var cityId = 0;	
	$(function(){
		$('.acity').click(function(){
			$('.city').show();
			$('.mask').show();
		});
		$('.cityul b').click(function(){
			var test=$(this).html();
		
			if($(this).attr("city") == undefined){ $(this).attr("city", window.cityId++);}
			var city = $(this).attr("city");
			if( $('input[city="'+ city +'"]').size()){
				$('input[city="'+ city +'"]').parent().remove();
			} else {
				var ml=$('.she').length;
				
					var test=$(this).html();
					$('<li class="licity"><input name="citychk" type="checkbox" checked="true" city="'+ city +'" class="check"><b>'+test+'</b></li>').appendTo('.she');
				}
			
			
			$('input[name=citychk]').click(function(){
				$(this).parent('.licity').remove();
			});
			
		});	
		$('.ok').click(function(){
				
				var total="";
				if($('.she ').text()==''){}else{
					$('.she').each(function(){
						total += (total.length > 0 ? "+" : "" ) + $(this).text();
					});
					$('.acity').text(total);
					$('.city').hide();
					$('.mask').hide();
				}
				
				
			})
	
	})
	//添加水印
	$(document).ready(function() {
 
$(".byb").focus(function() {
      $(this).val('');
      });
       
$(".byb").blur(function() {
var str = $(this).val();
  if(str==''){
      $(this).val('输入充值金额');
      }
      });
       
});
//确认支付弹出框
