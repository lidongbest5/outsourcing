"use strict";!function(){var e=$(".page1"),n=$(".page2"),t=$(".page3"),o=$(".page4"),i=$(".page0"),s=!1,a="/levtAd/mobile",c,d,u=function(){r(),P()},r=function(){$.ajax({url:"http://sso.le.com/open/checklogin",type:"GET",dataType:"jsonp",jsonp:"jsonp",success:function(n){0===n.status?($(".s1").hide(),$(".btns").prepend('<a href="http://sso.le.com/user/mloginHome?next_action=http://manyuejiu.lesports.com/"><img src="images/b1.png" class="b1"></a>'),i.hide(),e.show()):(d=n.uid,h())}}),$.ajax({url:a+"/member/list-winning",type:"GET",success:function(n){if(n.success){for(var t=n.data.length,o="",i=0;t>i;i++)o+="<li>"+n.data[i].mobilePhone.substring(0,3)+"****"+n.data[i].mobilePhone.substring(7,11)+"<span>"+n.data[i].member.winningTxt+"</span></li>";e.find(".list ul div").html(o)}}})},h=function(){$(".b5").hide(),$(".b11").show(),$.ajax({url:"http://u.api.lesports.com/user/v1/tvpay/vipinfo",type:"GET",data:{caller:1001,userid:d,_method:"POST",terminal:141003,from:"center"},success:function(n){n.data.isSportVip?$.ajax({url:a+"/member/save",type:"POST",data:{lvidentifier:d},success:function(n){if(n.success){var o=n.data.winning,s=n.data.award;1===s?($(".b2").hide(),e.find(".s1").hide(),e.find(".s3").show(),i.hide(),e.show()):1===o&&0===s?($(".b2").hide(),i.hide(),t.show()):$.ajax({url:a+"/more-prize",type:"GET",success:function(n){n.data>0||(e.find(".s1").hide(),e.find(".s2").show()),$(".b2").hide(),i.hide(),e.show()}})}else alert(n.msg)}}):($(".b1").hide(),i.hide(),e.show())}})},l=function(){var e=new Lottery("container","images/card1.png","image",280,150,p);e.init("images/2.png","image"),setTimeout(function(){$(".lottery-prize").show()},500)},p=function(){$("#container").hide()},m=function(){$(this).closest(".modal").hide()},f=function(){$(".rule-modal").show()},g=function(){$(".prize-modal").show()},w=function(){e.hide(),n.show(),$.ajax({url:a+"/member/lucky-draw",type:"POST",data:{lvIdentifier:d},success:function(e){e.success?($(".prize1 h3").html(e.data),$(".prize1").show(),$(".prize2").hide()):($(".prize1").hide(),$(".prize2").show()),l()}})},b=function(){n.hide(),t.show()},v=function(){var e=$(".code").val(),n=$(".phone").val();s?e.length?($.ajax({url:a+"/member/cash-prize",type:"POST",data:{phone:n,code:e,ctime:(new Date).getTime(),lvIdentifier:d},success:function(e){e.success&&o.find("ul").html("<li>卡号："+e.data.redeemcode+"</li><li>密码："+e.data.password+"</li><li>有效期："+e.data.validityperiod+"</li>")}}),t.hide(),o.show()):alert("请输入验证码"):alert("请先完成手机号验证")},y=function(){$(".process-modal").show()},T=function(){$(".share-modal").show()},j=function(){$(".share-modal").hide()},x=function(){var e=$(".phone").val();e.length?/^1[3|4|5|7|8]\d{9}$/.test(e)?$.ajax({url:a+"/validate-code",type:"POST",data:{mobilePhone:e,currTime:(new Date).getTime()},success:function(e){e.success?(s=!0,alert("发送成功")):alert(e.msg)}}):alert("请输入正确手机号"):alert("请输入手机号")},z=function(){$.ajax({url:"http://sso.le.com/user/loginout",type:"GET",dataType:"jsonp",jsonp:"jsonp",success:function(e){window.location.reload()},error:function(e){}})},P=function(){$(".b4").on("touchend",f),$(".t3").on("touchend",g),$(".b1").on("touchend",w),$(".b6").on("touchend",b),$(".b11").on("touchend",z),$(".b7").on("touchend",y),$(".b8").on("touchend",T),$(".share-modal").on("touchend",j),$(".b3").on("touchend",v),$(".get").on("touchend",x),$(".close").on("touchend",m)};$(u)}();