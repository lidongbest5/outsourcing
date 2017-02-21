$(function(){
	$(".delete_share").click(function(){
		var id = $(this).attr("id").replace("delete_share_","");
		if(confirm("是否删除此分享?")){
			$.get("/admin/admin_customer/delete_share/"+id,function(data){
				window.location.reload();
			});
		}
	});
	
	/**
	 *	每季新鲜 js 开始
	 **/
	//删除简之美
	$(".delete_season").click(function(){
		var id = $(this).attr("id").replace("delete_season_","");
		if(confirm("是否删除此参赛人作品?")){
			$.get("/admin/admin_season/delete_season/"+id,function(data){
				window.location.reload();
			});
		}
	});
	//恶意刷分 扣除积分
	$(".deduct_season").click(function(){
		var id = $(this).attr("id").replace("deduct_season_","");
		if(confirm("是否扣除此参赛人积分?")){
			$.get("/admin/admin_season/deduct_season/"+id,function(data){
				window.location.reload();
			});
		}
	});
	
	//评审发奖
	$(".prize_season").click(function(){
		var id = $(this).attr("id").replace("prize_season_","");
		$.get("/admin/admin_season/get_season/"+id,function(data){
			$("#r_ssoid").html(data.ssoid);
			$("#row_id").val(data.id);
			$("#score").val(data.score);
			$("#prize").val(data.prize);
		},'json');
		$.dialog({
			id:'row_prize',
			title:false,
			cancelValue:false,	
			fixed:true,
			beforeunload:function(){
				$("#gid").attr('value','');
				$("#r_ssoid").html('');
				$("#score").attr('value','');
				$("#prize").attr('value','');
			},
			content:document.getElementById('row_prize')	
		});
		
	});
	
	$("#save_prize").click(function(){
		var season_id = $("#row_id").val();
		var types = $("#types").val();
		var score = $("#score").val();
		var prize = $("#prize").val();
		if( types == '' ){
			alert("请选择奖品类型");
			return false;
		}
		if( score == '' || isNaN(score) ){
			alert("请正确填写积分奖励");
			return false;
		}
		if( prize == '' ){
			alert("请填写奖品奖励");
			return false;
		}
		$.post("/admin/admin_season/save_prize/",{season_id:season_id, types:types, score:score, prize:prize},function(data){
			$.dialog({id:'row_prize'}).close();
			if( data == 0 ){
				alert("此发表人已获奖");
				return false;
			}
			if( data == 1 ){
				window.location.reload();
			}
			if( data == 2 ){
				alert("此奖项名额已满");
				return false;
			}
		});
	})
	
	/**
	 *	每季新鲜 js 结束
	 **/
});