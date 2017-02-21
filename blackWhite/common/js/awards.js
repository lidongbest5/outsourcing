$(function(){
	//发货
	/*$("#add_awards").click(function(){
		var types = $("#types").val();
		var nums = $("#nums").val();
		var max_renqi = $("#max_renqi").val();
		var memo = $("#memo").val();
		
		
		if( types == '' ){
			alert("请选择奖品类型");
			return false;
		}
		if( nums == '' ){
			alert("请填写奖品数量");
			return false;
		}
		if( max_renqi == '' ){
			alert("请填写最高人气数");
			return false;
		}

		$.post("/admin/awards/ajax_save_awards",{types:types,nums:nums,max_renqi:max_renqi,memo:memo},function(data){
			if( data == 1 ){
				window.location.reload();
			}
		})
	});*/
	
	$(".delete_awards").click(function(){
		id = $(this).attr("id").replace("delete_awards_","");
		if(confirm("是否删除此奖项?")){
			$.get("/admin/awards/ajax_delete_awards/"+id,function(data){
				window.location.reload();
			});
		}
	});
	
	
	

});