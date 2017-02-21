$(function(){
	
	//À—À˜≤È—Ø
	$('#search').click(function(){
		var types = $('#types').val();
		var ssoid = $('#ssoid').val();
		var name = $('#name').val();
		var coupon_code = $('#coupon_code').val();
		$.post("/admin/prize/search",{act:"search",awards_types:types,ssoid:ssoid,name:name,coupon_code:coupon_code},function(data){
			if( data == 1 ){
				window.location.reload();
			}
		})
	})

});


function row_province(that){
	//var province_name = $(this).val();
	province_name = that.value;
	$.get("/admin/prize/ajax_region/"+encodeURI(province_name)+"/1",function(data){
		var str = '<option value="">«Î—°‘Ò</option>';
		for(i in data){
		  str+='<option value="'+data[i]['region_name']+'">'+data[i]['region_name']+'</option>'
		}
		$("#row_city").html(str);
	},"json");
}

function row_city(that){
	//var province_name = $(this).val();
	province_name = that.value;
	$.get("/admin/prize/ajax_region/"+encodeURI(province_name)+"/2",function(data){
		var str = '<option value="">«Î—°‘Ò</option>';
		for(i in data){
		  str+='<option value="'+data[i]['region_name']+'">'+data[i]['region_name']+'</option>'
		}
		$("#row_district").html(str);
	},"json");
}

