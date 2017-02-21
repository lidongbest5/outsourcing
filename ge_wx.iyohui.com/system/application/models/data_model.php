<?php if (! defined('BASEPATH')) exit('No direct script access');
/**
 * 用户类
 *
 * 该类包括了用户的操作
 *
 *
 *
 *
 * @package		game
 * @author		nevergreen <xnevergreen@163.com>
 * @copyright	Copyright (c) 2010 - 2011, baobao.com.
 * @version		1.0
 */
// ------------------------------------------------------------------------
class data_model extends Model {

	//php 5 constructor
	function __construct() {
		parent::Model();
	}

	//php 4 constructor
	function data_model() {
		parent::Model();
	}

	/**
	 * 获取网卡地址类
	 *
	 * @return string filename
	 *
	 * @author sundy <nevergreenxp@gmail.com>
	 */
	function GetMac(){//获得mac地址
		$mac = new GetMacAddr(PHP_OS);
		return $mac->mac_addr;
	}

	function getIp(){
		//php获取ip的算法
		if ($HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"]){
			$ip = $HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"];
		}elseif ($HTTP_SERVER_VARS["HTTP_CLIENT_IP"]){
			$ip = $HTTP_SERVER_VARS["HTTP_CLIENT_IP"];
		}elseif ($HTTP_SERVER_VARS["REMOTE_ADDR"]){
			$ip = $HTTP_SERVER_VARS["REMOTE_ADDR"];
		}elseif (getenv("HTTP_X_FORWARDED_FOR")){
			$ip = getenv("HTTP_X_FORWARDED_FOR");
		}elseif (getenv("HTTP_CLIENT_IP")){
			$ip = getenv("HTTP_CLIENT_IP");
		}elseif (getenv("REMOTE_ADDR")){
			$ip = getenv("REMOTE_ADDR");
		}else{
			$ip = "Unknown";
		}
		return $ip ;
	}
}