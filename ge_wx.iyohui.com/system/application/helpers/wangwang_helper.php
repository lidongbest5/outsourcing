<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 获取首页样式
 */
if ( ! function_exists('create_home_style_code'))
{
	function create_home_style_code($content, $aItems, $aGroupInfo, $is_manage = '0'){
		$sContent = $content['content'];
		$sContent = str_replace("theme", base_url()."common/theme", $sContent);
		$sContent = str_replace("www.so2bao.com", "www.iyohui.com", $sContent); //正式时候需去掉
		$sContent = str_replace("{STARTDATE}", str_replace('-', '.', $aGroupInfo['start_date']), $sContent);
		$sContent = str_replace("{ENDDATE}", str_replace('-', '.', $aGroupInfo['end_date']), $sContent);
		$sContent = str_replace("{DETAIL}", "<MARQUEE width=\"300\" height=\"30\" scrollAmount=\"2\">" . $aGroupInfo['detail'] . "</MARQUEE><img width=0 height=0 src=\"http://count.iyohui.com/?i=home&g=" . $aGroupInfo['id'] . "&m=" . $aGroupInfo['member_id'] . "\" />", $sContent);
		if( $aGroupInfo['more']['seller_cid'] != NULL ) {
			$sContent = str_replace('{MORE}', '<a target="_blank" href="http://shop' . $aGroupInfo['more']['shop_id'] . '.taobao.com/?search=y&scid=' . $aGroupInfo['more']['seller_cid'] . '">' . $aGroupInfo['more']['link_title'] . '</a>', $sContent);
		} else {
			$sContent = str_replace('{MORE}', '', $sContent);
		}
		$now_count = count($aItems);
		for($i=0; $i< $now_count; $i++) {
			if ( $content['pic'] == 80 ) {
				$picsize = '80x80.jpg';
			} else {
				$picsize = '160x160.jpg';
			}

			//$shupurl='<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '"><img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" /></a>';
			$shupurl = '';
			if( $is_manage == 1 ) {
				/*
				$shupurl .= '<div style="background: url(' . $aItems[$i]['pic_path'] . '_' . $picsize . '); width: ' . $content['pic'] . 'px; height: ' . $content['pic'] . 'px;">';
				$shupurl .= '	<div style="z-index: 100; width: ' . $content['pic'] . 'px; height: 22px; text-align: right;">';
				$shupurl .= '		<img class="pointer" onclick="remove_picture(\'' . $aItems[$i]['num_iid'] . '\', \'' . $i . '\')" src="/common/images/tooltip/close.jpg" width="22" height="22" />';
				$shupurl .= '	</div>';
				$shupurl .= '</div>';
				//*/
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				$shupurl .= '<img class="item_img_home" src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" border="0" />';
				$shupurl .='</a>';
			} else {
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				//$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
				$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" border="0" />';
				$shupurl .='</a>';
			}

			$table_change["{PICTURE$i}"] = $shupurl;
			$table_change["{PRICE$i}"] = "￥".sprintf("%01.2f", $aItems[$i]["price"]);
			$title = empty($aItems[$i]['title']) ? $aItems[$i]['item'] : $aItems[$i]['title'];
			$table_change["{TITLE$i}"] = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '"><font color="' . $content['font_color'] . '">' . csubstr($title, $content['font_size_home']) . '</font></a>';
		}

		$empty_count = $content["item_num"] - $now_count; //空闲的位置
		for($j = 0; $j<$empty_count; $j++) {
			$table_change['{PICTURE' . ( $j + $now_count ) . '}'] = '<img src="http://www.iyohui.com/common/images/no_class.jpg" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
			$table_change['{PRICE' . ( $j + $now_count ) . '}'] = '<font color="' . $content['font_color'] . '">' . sprintf("%01.2f", 0) . '</font>';
			$table_change['{TITLE' . ( $j + $now_count ) . '}'] = '';
		}
		return strtr($sContent, $table_change);
	}
}

/**
 * 获取宝贝描述样式
 */
if ( ! function_exists('create_detail_style_code'))
{
	function create_detail_style_code($content, $aItems, $aGroupInfo, $is_manage = '0'){
		$sContent = $content['content'];
		$sContent = str_replace("theme", base_url()."common/theme", $sContent);
		$sContent = str_replace("www.so2bao.com", "www.iyohui.com", $sContent); //正式时候需去掉
		$sContent = str_replace("{STARTDATE}", str_replace('-', '.', $aGroupInfo['start_date']), $sContent);
		$sContent = str_replace("{ENDDATE}", str_replace('-', '.', $aGroupInfo['end_date']), $sContent);
		$sContent = str_replace("{DETAIL}", "<MARQUEE width=\"300\" height=\"30\" scrollAmount=\"2\">" . $aGroupInfo['detail'] . "</MARQUEE>", $sContent);
		if( $aGroupInfo['more']['seller_cid'] != NULL ) {
			$sContent = str_replace('{MORE}', '<a target="_blank" href="http://shop' . $aGroupInfo['more']['shop_id'] . '.taobao.com/?search=y&scid=' . $aGroupInfo['more']['seller_cid'] . '">' . $aGroupInfo['more']['link_title'] . '</a>', $sContent);
		} else {
			$sContent = str_replace('{MORE}', '', $sContent);
		}
		$now_count = count($aItems);
		for($i=0; $i< $now_count; $i++) {
			if ( $content['pic'] == 80 ) {
				$picsize = '80x80.jpg';
			} else {
				$picsize = '160x160.jpg';
			}

			//$shupurl='<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '"><img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" /></a>';
			$shupurl = '';
			if( $is_manage == 1 ) {
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				$shupurl .= '<img class="item_img_detail" src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" border="0" />';
				$shupurl .='</a>';
			} else {
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				//$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
				$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" border="0" />';
				$shupurl .='</a>';
			}

			$table_change["{PICTURE$i}"] = $shupurl;
			$table_change["{PRICE$i}"] = "￥".sprintf("%01.2f", $aItems[$i]["price"]);
			$title = empty($aItems[$i]['title']) ? $aItems[$i]['item'] : $aItems[$i]['title'];
			$table_change["{TITLE$i}"] = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '"><font color="' . $content['font_color'] . '">' . csubstr($title, $content['font_size']) . '</font></a>';
			$table_change["{LINK$i}"] = $aItems[$i]["pic_url"];
		}

		$empty_count = $content["item_num"] - $now_count; //空闲的位置
		for($j = 0; $j<$empty_count; $j++) {
			$table_change['{PICTURE' . ( $j + $now_count ) . '}'] = '<img src="http://www.iyohui.com/common/images/no_class.jpg" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
			$table_change['{PRICE' . ( $j + $now_count ) . '}'] = '<font color="' . $content['font_color'] . '">' . sprintf("%01.2f", 0) . '</font>';
			$table_change['{TITLE' . ( $j + $now_count ) . '}'] = '';
		}
		return strtr($sContent, $table_change);
	}
}

/**
 * 折扣信息显示样式
 */
if ( ! function_exists('createDetail'))
{
	function createDetail($aDiscount){
		$sContent = "";
		$i = 1;
		foreach($aDiscount as $key => $val) {
			/*
			$sContent .= '会员等级为:';
			if( $val['level'][0]['isUsed'] == 1 ) {
				$sContent .= '全淘宝会员,&nbsp;';
			}
			if( $val['level'][1]['isUsed'] == 1 ) {
				$sContent .= '普通会员,&nbsp;';
			}
			if( $val['level'][2]['isUsed'] == 1 ) {
				$sContent .= '高级会员,&nbsp;';
			}
			if( $val['level'][3]['isUsed'] == 1 ) {
				$sContent .= 'VIP会员,&nbsp;';
			}
			if( $val['level'][4]['isUsed'] == 1 ) {
				$sContent .= '至尊VIP会员,&nbsp;';
			}
			//*/

			if( $val['count']['isUsed'] == 1 ) {
				$sContent .= '满' . ($val['count']['content']) . '件&nbsp;';
			}

			if( $val['count']['isUsed'] == 1 && $val['amount']['isUsed'] == 1 ) {
				$sContent .= '或';
			}

			if( $val['amount']['isUsed'] == 1 ) {
				$sContent .= '满' . ($val['amount']['content']) . '元&nbsp;';
			}

			$sContent .= '即可享受&nbsp;';

			if( $val['discount']['isUsed'] == 1 ) {
				$sContent .= ($val['discount']['content']*10) . '折&nbsp;';
			}

			if( $val['decrease']['isUsed'] == 1 ) {
				$sContent .= '减' . ($val['decrease']['content']) . '元&nbsp;';
			}

			if( $val['freepost']['isUsed'] == 1 ) {
				//echo $val['freepost']['content'];
				if( $val['freepost']['content'] != NULL ) {
					
					$aTmp = explode('#', $val['freepost']['content']);
					
					$sTmp = str_replace('*', '、', $aTmp[1]);
					//$sContent .= '部分地区包邮(' . ($sTmp) . '地区不包邮)&nbsp;';
					$sContent .= getFreePost($val['freepost']);
					
					/*
					if( $val['freepost']['which'] == 1 ) { //显示包邮
						$sContent .= '部分地区包邮&nbsp;';
					} else {
						$sContent .= '部分' . $sTmp . '地区不包邮&nbsp;';
					}
					//*/
				} else {
					$sTmp = '全部地区包邮';
				}
			}

			if( $val['sendpoint']['isUsed'] == 1 ) {
				$sContent .= '送' . ($val['sendpoint']['content']['point']) . '点积分(' . $val['sendpoint']['content']['memo'] . ')&nbsp;';
			}

			if( $val['sendgift']['isUsed'] == 1 ) {
				$sContent .= '送礼物' . $val['sendgift']['content']['name'] . '，礼物地址:' . ($val['sendgift']['content']['url']) . '&nbsp;';
			}

			if( $val['sendcoupon']['isUsed'] == 1 ) {
				$sContent .= '送' . ($val['sendcoupon']['content']['id']) . '点优惠券' . $val['sendcoupon']['content']['num'] . '张&nbsp;';
			}
			//$sContent .= '享受以上优惠;';
			$sContent .= '<br />';
		}
		return $sContent;
	}
}

/**
 * 折扣信息显示样式
 */
if ( ! function_exists('createShortDetail'))
{
	function createShortDetail($aDiscount){
		$sContent = "";
		$i = 1;
		foreach($aDiscount as $key => $val) {
			if( $val['count']['isUsed'] == 1 ) {
				$sContent .= '满' . ($val['count']['content']) . '件 ';
			}

			if( $val['count']['isUsed'] == 1 && $val['amount']['isUsed'] == 1 ) {
				$sContent .= '或';
			} else {
				$sContent .= ' ';
			}

			if( $val['amount']['isUsed'] == 1 ) {
				$sContent .= '满' . ($val['amount']['content']) . '元 ';
			}

			//$sContent .= '即可享受:';

			if( $val['discount']['isUsed'] == 1 ) {
				$sContent .= ($val['discount']['content']*10) . '折 ';
			}

			if( $val['decrease']['isUsed'] == 1 ) {
				$sContent .= '减' . ($val['decrease']['content']) . '元 ';
			}

			if( $val['freepost']['isUsed'] == 1 ) {
				$sTmp = '全部';
				if( $val['freepost']['content'] != NULL ) {
					$sTmp = '部分';
				}
				//$sContent .= $sTmp . '地区包邮 ';
				$sContent .= getFreePost($val['freepost'], 1);
			}

			if( $val['sendpoint']['isUsed'] == 1 ) {
				$sContent .= '送' . ($val['sendpoint']['content']['point']) . '点积分 ';
			}

			if( $val['sendgift']['isUsed'] == 1 ) {
				$sContent .= '送礼物 ';
			}

			if( $val['sendcoupon']['isUsed'] == 1 ) {
				$sContent .= '送优惠券 ';
			}
			//$sContent .= '享受以上优惠;';
			$sContent .= '<br />';
		}
		return $sContent;
	}
}

/**
 * 折扣信息显示样式 - 定向优惠模式
 */
if ( ! function_exists('createShortDetailPromotion'))
{
	function createShortDetailPromotion($aDiscount){
		$sContent = "";
		switch($aDiscount['round']) {
			case 2:
				$sRound = '精确到分';
				break;
		
			case 1:
				$sRound = '精确到角';
				break;
		
			case 0:
				$sRound = '精确到元';
				break;
		}
		switch($aDiscount['type']) {
			case 'price':
				$sContent = '减' . $aDiscount['promotion'] . '元&nbsp;(' . $sRound . ')';
				break;
		
			case 'discount':
				$sContent = '打' . $aDiscount['promotion'] . '折&nbsp;(' . $sRound . ')';
				break;
		}
		return $sContent;
	}
}

/**
 * 包邮信息
 */
function getFreePost($aFreePost, $bIsShort = '0')
{
	$sDetail = '';
	$aDetail = array();
	$aDetailBigArea = array();
	$CI =& get_instance();
	$aFreePostConfig = $CI->config->item('freepost');
	$aFreePostBigAreaName = $CI->config->item('freepost-bigarea');

	//$aFreePost['which'] = 2;
	//$bIsShort = 0;

	if ( $aFreePost['content'] != NULL ) {
		$aTmp = explode('#', $aFreePost['content']);
		$aContent = explode('*', $aTmp[0]);
		$aRet = array();
		foreach( $aFreePostConfig as $key => $val ) {
			$i = 0;
			foreach( $val as $k => $v ) {
				$aRet[$key][$i]['check'] = 0;
				$aRet[$key][$i]['content'] = $v;
				if( in_array($k, $aContent) ) {
					if ( $aFreePost['which'] == 1 ) { //显示包邮
						$aRet[$key][$i]['check'] = 0;
					} else { //显示不包邮
						$aRet[$key][$i]['check'] = 1;
					}
				} else {
					if ( $aFreePost['which'] == 1 ) { //显示包邮
						$aRet[$key][$i]['check'] = 1;
					} else { //显示不包邮
						$aRet[$key][$i]['check'] = 0;
					}
				}
				$i++;
			}
		}

		$num_check_0 = 0;
		//确定哪些可以使用简称
		foreach( $aRet as $key => $val ) {
			$iCount = count($aRet[$key]);
			$aFreePostBigArea[$key] = 1;

			for($i = 0; $i < $iCount; $i++ ) {
				$aFreePostBigArea[$key] = $aFreePostBigArea[$key] & $aRet[$key][$i]['check'];
			}
			foreach($val as $k => $v){
				if(!$v['check']){
					$num_check_0++;
				}
			}
		}
		
		//排除可以使用简称的区域
		$aUseBigArea = array();
		foreach( $aFreePostBigArea as $key => $val ) {
			if ( $val == 1 ) {
				//去掉可以使用简称的大区域
				unset($aRet[$key]);
				$aUseBigArea = array_merge($aUseBigArea, $aFreePostConfig[$key]);
			}
		}

		foreach( $aRet as $key => $val ) {
			foreach( $val as $k => $v ) {
				if ( in_array($v['content'], $aUseBigArea) ) {
					$aRet[$key][$k]['check'] = 0;
				}
			}
		}
		
		//组装最后的地区串
		foreach( $aFreePostBigArea as $key => $val ) {
			if( $val == 0 ) { //不可以使用简称的再次检测小地区
				foreach( $aRet[$key] as $v ) {
					if ( $v['check'] == 1 ) {
						if ( $aFreePost['which'] == 1 ) { //显示包邮
							$aDetail[] = $v['content'];
						} else { //显示不包邮
							$aDetail[] = $v['content'];
						}
					}
				}
			} else {
				if ( $key == 'jiangzhehu' || $key == 'huadong' ) {
					$att[] = implode(',', $aFreePostConfig[$key]);
				}
				if ( $bIsShort == 1) { //显示简短信息
					$aDetailBigArea[] = $aFreePostBigAreaName[$key];
				} else {
					$aDetailBigArea[] = $aFreePostBigAreaName[$key] . '(' . implode(',', $aFreePostConfig[$key]) . ')';
				}
			}
		}
		

		$sDetail = '';
		if ( $aDetailBigArea != NULL ) {
			$sDetail .= implode(',', $aDetailBigArea);
		}
		//echo $sDetail;
		//$sDetail .= '地区';
		if ( $aDetail != NULL ) {
			$sDetail .= ',' . implode(',', $aDetail);
		}
		
		if($num_check_0==0){//不包邮地区个数
			$sDetail = "全国包邮 ";
		}elseif($num_check_0<10){
			$aContent_text = explode('*', $aTmp[1]);
			$content_text = implode(',', $aContent_text);
			$sDetail = "除(".$content_text.")全国包邮 ";
		}else{
			$sDetail = "包邮地区(".$sDetail.") ";
		}

		/*
		$sSmallArea = implode(',', $aDetail);

		if ( count($sSmallArea) > 0 ) {
			$iCount = count(preg_grep("/{$sSmallArea}/", $aDetailBigArea));
			if ( $iCount >= 0 ) {
				$sDetail = implode(',', $aDetailBigArea);
			} else {
				$sDetail = $sSmallArea . ',' . implode(',', $aDetailBigArea);
			}
		} else {
			$sDetail = implode(',', $aDetailBigArea);
		}
		//-*/

		/*if ( $aFreePost['which'] == 1 ) { //显示包邮
			$sDetail = $sDetail . '包邮 ';
		} else { //显示不包邮
			$sDetail = $sDetail . '不包邮 ';
		}*/
		//echo $sDetail;
	} else {
		if ( $aFreePost['which'] == 1 ) { //显示包邮
			$sDetail = '全部地区包邮 ';
		} else { //显示不包邮
			$sDetail = '全部地区不包邮 ';
		}
	}
	return $sDetail;
}

/**
 * 折扣信息显示样式
 */
if ( ! function_exists('getPromotionDetail'))
{
	function getPromotionDetail($aPromotion, $sStyleCode)
	{
		$sContent = "";
		$i = 1;
		foreach($aPromotion as $key => $val) {
			$sContent .= '单笔订单';
			if( $val['count']['isUsed'] == 1 ) {
				$sContent .= '满<font color="red"><b>' . ($val['count']['content']) . '</font></b>件';
			}

			if( $val['count']['isUsed'] == 1 && $val['amount']['isUsed'] == 1 ) {
				$sContent .= '或';
			} else {
				$sContent .= ' ';
			}

			if( $val['amount']['isUsed'] == 1 ) {
				$sContent .= '满<font color="red"><b>' . ($val['amount']['content']) . '</b></font>元 ';
			}

			$sContent .= '即可享受:&nbsp;';

			if( $val['discount']['isUsed'] == 1 ) {
				$sContent .= '<font color="red"><b>' . ($val['discount']['content']*10) . '</b></font>折 ';
			}

			if( $val['decrease']['isUsed'] == 1 ) {
				$sContent .= '减' . '<font color="red"><b>' . ($val['decrease']['content']) . '</b></font>元 ';
			}

			if( $val['freepost']['isUsed'] == 1 ) {
				if( $val['freepost']['content'] != NULL && $val['freepost']['content'] != 0 ) {
					$aTmp = explode('#', $val['freepost']['content']);
					$sNoPost = str_replace('*', '，', $aTmp[1]);
					//$sContent .= '免运费(不包邮地区:' . $sNoPost . ') ';
					$sContent .= getFreePost($val['freepost']);
				} else {
					$sContent .= '免运费 ';
				}
			}

			if( $val['sendpoint']['isUsed'] == 1 ) {
				$sContent .= '送<font color="red">' . ($val['sendpoint']['content']['point']) . '</font>点积分 ';
			}

			if( $val['sendgift']['isUsed'] == 1 ) {
				$sContent .= '送<a target="_blank" href="http://item.taobao.com/item.htm?id=' . $val['sendgift']['content']['iid'] . '">“' . $val['sendgift']['content']['name'] . '”</a>';
			}

			if( $val['sendcoupon']['isUsed'] == 1 ) {
				$sContent .= '送优惠券&nbsp;<font color="red"></font>';
			}
		}
		return $sContent;
	}
}

/**
 * Utf-8、gb2312都支持的汉字截取函数
 * cut_str(字符串, 截取长度, 开始长度, 编码);
 * 编码默认为 utf-8
 * 开始长度默认为 0
 */
if ( ! function_exists('cutstr'))
{
	function cutstr($string, $sublen, $start = 0, $code = 'UTF-8') {
		if ($code == 'UTF-8') {
			$pa = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-\xbf][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/";
			preg_match_all($pa, $string, $t_string);
			$stringcount = $t_string[0];
			for ($i=0; $i<count($stringcount); $i++){
				if(preg_match('/[\x80-\xff]./', $stringcount[$i])!=0){
					$shijian1[$i] = $stringcount[$i];
				}
				else{
					$shijian2[$i] = $stringcount[$i];
				}
			}
			$sum = count($shijian1) + round(count($shijian2)/2);
			$shijiands = $sublen + floor((count($shijian2)/2)) - 1;
			if($sum - $start > $sublen) return join('', array_slice($t_string[0], $start,$shijiands));
			return join('', array_slice($t_string[0], $start, $sublen));
		} else {
			$start = $start * 2;
			$sublen = $sublen * 2;
			$strlen = strlen ( $string );
			$tmpstr = '';

			for($i = 0; $i < $strlen; $i ++) {
				if ($i >= $start && $i < ($start + $sublen)) {
					if (ord ( substr ( $string, $i, 1 ) ) > 129) {
						$tmpstr .= substr ( $string, $i, 2 );
					} else {
						$tmpstr .= substr ( $string, $i, 1 );
					}
				}
				if (ord ( substr ( $string, $i, 1 ) ) > 129)
					$i ++;
			}
			if (strlen ( $tmpstr ) < $strlen)
				$tmpstr .= "...";
			return $tmpstr;
		}
	}
}


/**
 * 中文截取，支持gb2312,gbk,utf-8,big5
 *
 * @param string $str 要截取的字串
 * @param int $length 截取长度
 * @param int $start 截取起始位置
 * @param string $charset utf-8|gb2312|gbk|big5 编码
 * @param $suffix 是否加尾缀
 */
if ( ! function_exists('csubstr')) {
	function csubstr($str, $length, $start=0, $charset="utf-8", $suffix=false)
	{
		if(function_exists("mb_substr"))
		{
			if(mb_strlen($str, $charset) <= $length) return $str;
			$slice = mb_substr($str, $start, $length, $charset);
		} else {
			$re["utf-8"]  = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
			$re["gb2312"] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
			$re["gbk"]     = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
			$re["big5"]     = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
			preg_match_all($re[$charset], $str, $match);
			if(count($match[0]) <= $length) return $str;
				$slice = join("",array_slice($match[0], $start, $length));
			}
		if($suffix) return $slice."...";
		return $slice;
	}
}