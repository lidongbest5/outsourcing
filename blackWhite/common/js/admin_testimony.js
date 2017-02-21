$(function(){
	$("#add_testimony").click(function(){
		$("#act").val('add');
		$.dialog({
			id:'save_testimony',
			title:false,
			cancelValue:false,	
			fixed:true,
			beforeunload:function(){
				
			},
			content:document.getElementById('save_testimony')	
		});
	});
	
	$("#save_testimony_btn").click(function(){
		var act = $('#act').val();
		var id = $('#row_id').val();
		var column = $('#column').val();
		var title = $('#title').val();
		var content = $('#content').html();
		if( column == '' ){
			alert("请选择栏目！");
			return false;
		}
		if( title == '' ){
			alert("请填写标题！");
			return false;
		}
		if( content == '' ){
			alert("请填写内容！");
			return false;
		}
		
		$.post("/admin/admin_testimony/save_testimony",{act:act, id:id, column:column, title:title, content:content},function(data){
			if( data > 0 ){
				window.location.href='/admin/admin_testimony/index/' + data;
			}
		});
	});
	
	$(".update").click(function(){
		var id = $(this).attr("id").replace("update_","");
		$("#act").val('update');
		$.get("/admin/admin_testimony/get_testimony/" + id,function(data){
			$("#row_id").val(data.id);
			$("#title").val(data.title);
			$("#content").html(data.content);
			$("#column").val(data.column);
		},'json');
		$.dialog({
			id:'save_testimony',
			title:false,
			cancelValue:false,	
			fixed:true,
			beforeunload:function(){
				
			},
			content:document.getElementById('save_testimony')	
		});
	});
	
	$(".delete").click(function(){
		var id = $(this).attr("id").replace("delete_","");
		if(confirm("是否删除此证言?")){
			$.get("/admin/admin_testimony/delete_testimony/"+id,function(data){
				window.location.reload();
			});
		}
	});
	
	$(".info").click(function(){
		var id = $(this).attr("id").replace("info_","");
		$.get("/admin/admin_testimony/get_testimony/" + id,function(data){
			var column = '';
			if( data.column == 1 ){
				column = 'How do you drive simplification to reach +10pts in GEOs?';
			}
			if( data.column == 2 ){
				column = 'How do you drive simplification culture in your function?';
			}
			if( data.column == 3 ){
				column = 'How do you drive personal / employee engagement in your function?';
			}
			$("#info_column").html(column);
			$("#info_title").html(data.title);
			$("#info_content").html(data.content);
		},'json');
		
		$.dialog({
			id:'info_testimony',
			title:false,
			cancelValue:false,	
			fixed:true,
			beforeunload:function(){
				
			},
			content:document.getElementById('info_testimony')	
		});
	});
});