<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function base62($x){
	$show = '';
	while($x>0){
		$s = $x % 62;
		if ($s > 35){
			$s = chr($s + 61);
		}else if ($s > 5 && $s<=35){
			$s = chr($s + 55);
		}
		$show .= $s;
		$x = floor($x/62);
	}
	return $show;
}

/**
 * 获取短地址
 * @param string $url
 * @return string
 */
function url_short1($url){
	$url = crc32($url);
	$result = sprintf("%u",$url);
	$ret = str_replace('?', 'a', base62($result));
	return $ret;
}

/**
 * 获取短地址
 * @param string $url
 * @return string
 */
function url_short($url){
	return substr(md5($url), 10, 7);
}