var DOM = KISSY.DOM,
	Event = KISSY.Event,
	$ = KISSY.all;

var top_session = DOM.query(".taeapp-topsession")[0].value;
var parameters = DOM.query(".taeapp-parameters")[0].value;
var shop_id = DOM.query(".taeapp-shopid")[0].value;
var itemid = DOM.query(".taeapp-itemids")[0].value;
var type = DOM.query(".taeapp-type")[0].value;
var pid = DOM.query(".taeapp-pid")[0].value;


//�ղص��̵��÷���
if (top_session != "null") {
	top_api_favorite_shop(shop_id, top_session);
}

// ͼƬ���ҹ��� 
$(".taeapp-shiftleft,.taeapp-shiftright").on("click", function() {

	//λ��
	var scroll_num = DOM.query(".scroll")[0].value;

	//�����classname
	var class_name = DOM.query(this)[0].className;
	//����
	var count = DOM.query(".ks-switchable-nav li").length;

	if (class_name == "taeapp-shiftleft") {
		if (scroll_num == 1) {} else {
			var j = parseFloat(scroll_num) - 1;
			Event.fire(DOM.query('.taeapp-' + j), 'click');
			DOM.query(".scroll")[0].value = j;
		}
	} else {
		if (scroll_num == count) {} else {
			var j = parseFloat(scroll_num) + 1;
			Event.fire(DOM.query('.taeapp-' + j), 'click');
			DOM.query(".scroll")[0].value = j;
		}
	}
});

//��ȡ�Ż�ȯ
$('.taeapp-phone-button').on('click', function() {

	if (top_session == "null") {
		// var aa = "http://container.api.taobao.com/container?appkey=12271514&a=" + pid + "&s=" + shop_id + "&type=" + type + "&item=" + itemid + "&get_phone=2"
		// var url = "https://login.taobao.com/member/login.jhtml?redirectURL=" + encodeURIComponent(aa);
		var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/login.php?a=" + pid + "&s=" + shop_id;
		location.href(url);
	} else {
		if (itemid == "0") {
			if (type == "5" || type == "6") {
				var activity_id = DOM.query(".taeapp-anum")[0].value; //�Ż�ȯ�id 
				var seller_id = DOM.query(".taeapp-snum")[0].value; //�Ż�ȯid 
				var now_time = Date.parse(new Date()); //ʱ��
				var coupon_url = "http://taoquan.taobao.com/coupon/shopbonus/buyer_apply.htm?activity_id=" + activity_id + "&seller_id=" + seller_id + "&json=true&time=" + now_time;
				coupon(coupon_url);
			} else if (type == "7") {
				var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/v_phone.php?success=1&type=2&s=" + shop_id + "&top_session=" + top_session;
				location.href(url);
			} else if (type == "9") {
				favorite_dianpu(shop_id, parameters, pid, type);
			} else {
				tag_add(shop_id, parameters, pid, type);
			}
		} else {
			var itemids = itemid.split(",");
			for (var i = 0; i < itemids.length; i++) {
				var re = top_api_favorite_item(itemids[i], top_session, i, itemids.length - 1);
				if (re == "ok") {
					if (type == "5" || type == "6") {
						var settime = itemids.length * 100;
						var activity_id = DOM.query(".taeapp-anum")[0].value; //�Ż�ȯ�id 
						var seller_id = DOM.query(".taeapp-snum")[0].value; //�Ż�ȯid 
						var now_time = Date.parse(new Date()); //ʱ��
						var coupon_url = "http://taoquan.taobao.com/coupon/shopbonus/buyer_apply.htm?activity_id=" + activity_id + "&seller_id=" + seller_id + "&json=true&time=" + now_time;
						coupon(coupon_url, settime)
					} else if (type == "7") {
						var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/v_phone.php?success=1&type=2&s=" + shop_id + "&top_session=" + top_session;
						var settime = itemids.length * 100;
						setTimeout(function() {
							location.href(url)
						}, settime);
					} else if (type == "9") {
						favorite_dianpu(shop_id, parameters, pid, type);
					} else {
						tag_add(shop_id, parameters, pid, type);
					}
				}
			}
		}
	}
});


//�ղص��̷���

function top_api_favorite_shop(shop_id, top_session) {
	if (!isNaN(shop_id) && top_session != "") {
		TOP.api('rest', 'get', {
			method: 'taobao.favorite.add',
			item_numid: shop_id,
			collect_type: 'SHOP',
			session: top_session,
			shared: 'true',
		}, function(resp) {
			if (resp) {
				console.log(KISSY.JSON.stringify(resp));
			} else {
				console.log(resp.error_response.msg);
			}
		});
	}
}

//�ղ���Ʒ����

function top_api_favorite_item(item_numid, top_session, key, item_count) {

	if (!isNaN(item_numid) && top_session != "") {
		TOP.api('rest', 'get', {
			method: 'taobao.favorite.add',
			item_numid: item_numid,
			collect_type: 'ITEM',
			session: top_session,
			shared: 'true',
		}, function(resp) {
			if (resp) {
				console.log(KISSY.JSON.stringify(resp));
			} else {
				console.log(resp.error_response.msg);
			}
		});
		if (key == item_count) {
			return 'ok';
		}
	}
}

//��ȡ�Ż�ȯ

function coupon(coupon_url, settime) {
	KISSY.io({
		dataType: 'getJSON',
		url: coupon_url,
		data: {
			'format': 'json'
		},
		success: function(data) {
			var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/v_phone.php?success=1&type=1&s=" + shop_id + "&top_session=" + top_session;
			setTimeout(function() {
				location.href(url)
			}, settime);
		}
	});
}

//���û���tag

function tag_add(shop_id, parameters, pid, type) {
	KISSY.io({
		dataType: 'json',
		url: "/d/tag_add?shop_id=" + shop_id + "&top_parameters=" + parameters + "&pid=" + pid + "&type=" + type,
		data: {
			'format': 'json'
		},
		success: function(data) {
			var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/v_phone.php?success=1&type=1&s=" + shop_id + "&top_session=" + top_session;
			location.href(url);
		},
		error: function(data) {
			console.log(data);
		}
	});
}

//���ӷ�ʽ�ղ�
function favorite_dianpu(){
	KISSY.io({
		dataType:'json',
		type:'POST',
		url:"/sc/view/front/flow_add_link.php",
		data:{
			//�Ա���ֹ�����ύ
			'_csrfTokenKey'		: 	_csrfTokenValue,
			'shop_id'			: 	shop_id,
			'par'				: 	parameters,
			'pid'				:   pid,
			'flow_num'			:   '1',
			'flow_total'		:   '1000',
		},
		success:function (data) {
			if(data.result==0){
				//ǩ��ʧ��
				DOM.query(".taeapp-popup")[0].innerHTML = "";
				//����������
				var content  =	'<div style = "width:200px; height:65px; text-align:center">';
					content += 		'<div  style = "color:#ffffff;font-weight:bold; height:30px; line-height:20px;">';
					content += 			'<span class="taeapp-flow-tips">���Ժ�����</span><br>';
					content += 		'</div>';
					content +=		'<div>';
					content +=			'<span class="taeapp-closeDialogBox2" style="cursor:pointer;color: #ffffff ; font-weight: bold ; height: 30px ; line-height: 30px;">ȷ��</span>'; 
					content +=		'</div>';
					content +=	'</div>';
				DialogBox('',content, 200, 65);
				$('.taeapp-closeDialogBox2').on('click', function(){
					DOM.query(".taeapp-popup")[0].innerHTML = "";
				});
			}else{
				//��ʾ
				var str_tips = data.flow_tips;
				//�޸�ҳ������
				if(str_tips=='��ϲ��ȡ�����ɹ�'){
					var url = "http://favoritemaster.shopmodule.jaeapp.com/sc/view/front/v_phone.php?success=1&type=1&s=" + shop_id + "&top_session=" + top_session;
					location.href(url);
				}else{
					alert(str_tips);
				}
			}
		},
		error: function(data) {
			console.log(data);
		}
	});
}