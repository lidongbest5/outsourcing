<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 获取首页样式
 */
if ( ! function_exists('create_home_style_code'))
{
	function create_home_style_code($content, $aItems, $is_manage = '0'){
		$sContent = $content['content'];
		$sContent = str_replace("theme", base_url()."common/theme", $sContent);
		$sContent = str_replace("www.so2bao.com", "www.yybao.cn", $sContent); //正式时候需去掉
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
				$shupurl .= '<div style="background: url(' . $aItems[$i]['pic_path'] . '_' . $picsize . '); width: ' . $content['pic'] . 'px; height: ' . $content['pic'] . 'px;">';
				$shupurl .= '	<div style="z-index: 100; width: ' . $content['pic'] . 'px; height: 22px; text-align: right;">';
				$shupurl .= '		<img class="pointer" onclick="remove_picture(\'' . $aItems[$i]['num_iid'] . '\', \'' . $i . '\')" src="/common/images/tooltip/close.jpg" width="22" height="22" />';
				$shupurl .= '	</div>';
				$shupurl .= '</div>';
			} else {
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
				$shupurl .='</a>';
			}

			$table_change["{PICTURE$i}"] = $shupurl;
			$table_change["{PRICE$i}"] = "<font color=\"" . $content['font_color'] . "\">￥".sprintf("%01.2f", $aItems[$i]["price"])."</font>";
			$title = empty($aItems[$i]['title']) ? $aItems[$i]['item'] : $aItems[$i]['title'];
			$table_change["{TITLE$i}"] = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">' . csubstr($title, $content['font_size']) . '</a>';
			$table_change["{LINK$i}"] = $aItems[$i]["pic_url"];
		}

		$empty_count = $content["item_num"] - $now_count; //空闲的位置
		for($j = 0; $j<$empty_count; $j++) {
			$table_change['{PICTURE' . ( $j + $now_count ) . '}'] = '<img src="http://www.yybao.cn/common/theme/zhanwu.jpg" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
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
	function create_detail_style_code($content, $aItems, $is_manage = '0'){
		$sContent = $content['content'];
		$sContent = str_replace("theme", base_url()."common/theme", $sContent);
		$sContent = str_replace("www.so2bao.com", "www.yybao.cn", $sContent); //正式时候需去掉
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
				$shupurl .= '<div style="background: url(' . $aItems[$i]['pic_path'] . '_' . $picsize . '); width: ' . $content['pic'] . 'px; height: ' . $content['pic'] . 'px;">';
				$shupurl .= '	<div style="z-index: 100; width: ' . $content['pic'] . 'px; height: 22px; text-align: right;">';
				$shupurl .= '		<img class="pointer" onclick="remove_picture(\'' . $aItems[$i]['num_iid'] . '\', \'' . $i . '\')" src="/common/images/tooltip/close.jpg" width="22" height="22" />';
				$shupurl .= '	</div>';
				$shupurl .= '</div>';
			} else {
				$shupurl = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">';
				$shupurl .= '<img src="' . $aItems[$i]['pic_path'] . '_' . $picsize . '" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
				$shupurl .='</a>';
			}

			$table_change["{PICTURE$i}"] = $shupurl;
			$table_change["{PRICE$i}"] = "<font color=\"" . $content['font_color'] . "\">￥".sprintf("%01.2f", $aItems[$i]["price"])."</font>";
			$title = empty($aItems[$i]['title']) ? $aItems[$i]['item'] : $aItems[$i]['title'];
			$table_change["{TITLE$i}"] = '<a target="blank" href="http://item.taobao.com/item.htm?id=' . $aItems[$i]['num_iid'] . '">' . csubstr($title, $content['font_size']) . '</a>';
			$table_change["{LINK$i}"] = $aItems[$i]["pic_url"];
		}

		$empty_count = $content["item_num"] - $now_count; //空闲的位置
		for($j = 0; $j<$empty_count; $j++) {
			$table_change['{PICTURE' . ( $j + $now_count ) . '}'] = '<img src="http://www.yybao.cn/common/theme/zhanwu.jpg" width="' . $content['pic'] . '" height="' . $content['pic'] . '" border="0" />';
			$table_change['{PRICE' . ( $j + $now_count ) . '}'] = '<font color="' . $content['font_color'] . '">' . sprintf("%01.2f", 0) . '</font>';
			$table_change['{TITLE' . ( $j + $now_count ) . '}'] = '';
		}
		return strtr($sContent, $table_change);
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