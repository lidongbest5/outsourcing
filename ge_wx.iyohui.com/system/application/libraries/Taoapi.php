<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Taobao开放平台类
 *
 *
 * @package		openapi
 * @author		NeverGreen <xnevergreen@163.com>
 */
class Taoapi {

	static private $active = 'active';
	static private $snoopy = NULL;
	static private $config;
	static private $EnableDebug = False;
	
	//php 5 constructor
	function __construct($params) {
		self::$active = $params['active'];
	}

	//php 4 constructor
	function Taoapi($params) {
		self::$active = $params['active'];
	}

	public function setActive($active){
		self::$active = $active;
	}

	static private function getDefaultConfig(){
		date_default_timezone_set("Asia/Chongqing");
		$config = self::$config;
		$paramArr['api_key'] = $config['api_key'];
		$paramArr['format'] = $config['format'];
		$paramArr['v'] = $config['v'];
		$paramArr['sign_method'] = $config['sign_method'];
		$paramArr['timestamp'] = date('Y-m-d H:i:s');
		return $paramArr;
	}

	/**
	 * 实例化Snoopy
	 */
	static public function instanceSnoopy( $active = 'active' ) {
		$CI =& get_instance();
		//if( $CI->config->item($active) != NULL ){ //已在autoload中加载Taoapi的配置信息
		if( $CI->config->item($active) != NULL ){ //已在autoload中加载Taoapi的配置信息
			$active_group = $CI->config->item($active);
			//self::$config = $CI->config->item($active_group);
			self::$config = $CI->config->item($active);
		} else {
			$CI->config->load("Taoapi", TRUE);
			$active_group = $CI->config->item($active, 'Taoapi');
			//self::$config = $CI->config->item($active_group, 'Taoapi');
			self::$config = $CI->config->item($active, 'Taoapi');
		}

		$CI->load->library('snoopy');
		if (self::$snoopy == NULL) {
			self::$snoopy = $CI->snoopy;
		}
	}

	/**
	 * 是否开启调试模式
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */

	function SetDebugMode($bDebug = 'false'){
		self::$EnableDebug = $bDebug;
	}

	/**
	 * 生成签名
	 * @param $paramArr：api参数数组
	 * @return $sign
	 */
	static public function createSign ($paramArr) {
		$config = self::$config;
		$sign = $config['app_secret'];

		ksort($paramArr);
		//print_r($paramArr);
		foreach ($paramArr as $key => $val) {
			if ($key !='' && $val !='') {
				$sign .= $key.$val;
			}
		}
		$sign .= $config['app_secret'];
		//echo $sign;
		$sign = strtoupper(md5($sign));
		return $sign;
	}

	/**
	 * 生成字符串参数
	 * @param $paramArr：api参数数组
	 * @return $strParam
	 */
	static public function createStrParam ($paramArr) {
		$strParam = '';
		ksort($paramArr);
		foreach ($paramArr as $key => $val) {
			if ($key != '' && $val !='') {
				$strParam .= $key.'='.urlencode($val).'&';
			}
		}
		return $strParam;
	}

	/**
	 * 以GET方式访问api服务
	 * @param $paramArr：api参数数组
	 * @param $retFormat 返回数组还是xml
	 * @return $result
	 */
	static public function getResult($paramArr, $retFormat = '0') {
		self::instanceSnoopy(self::$active);
		$config = self::$config;
		$api_url = $config['api_url'];
		$paramArr = array_merge($paramArr,self::getDefaultConfig());

		//组织参数
		$sign = self::createSign($paramArr);
		$strParam = self::createStrParam($paramArr);
		$strParam .= 'sign='.$sign;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_R($paramArr);
			echo '</pre>';
			echo '<a href="'.$api_url."?".$strParam.'">'.$api_url."?".$strParam."</a><br /><br />";
		}

		//访问服务
		self::$snoopy->fetch($api_url.'?'.$strParam);
		$result = self::$snoopy->results;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_r(self::getXmlData($result, $paramArr));
			echo '</pre>';
		}

		//返回结果
		if($retFormat==1){
			return self::getXmlData($result, $paramArr);
		}
		return $result;
	}

	/**
	 * 以POST方式访问api服务
	 * @param $paramArr：api参数数组
	 * @param $retFormat 返回数组还是xml
	 * @return $result
	 */
	static public function postResult($paramArr, $retFormat = '0') {
		self::instanceSnoopy(self::$active);
		$config = self::$config;
		$api_url = $config['api_url'];
		$paramArr = array_merge($paramArr,self::getDefaultConfig());

		//组织参数，Snoopy类在执行submit函数时，它自动会将参数做urlencode编码，所以这里没有像以get方式访问服务那样对参数数组做urlencode编码
		$sign = self::createSign($paramArr);
		$paramArr['sign'] = $sign;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_R($paramArr);
			echo '</pre>';
			echo '<a href="'.$api_url."?".$strParam.'">'.$api_url."?".$strParam."</a><br /><br />";
		}

		//访问服务
		self::$snoopy->submit($api_url, $paramArr);
		$result = self::$snoopy->results;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_r(self::getXmlData($result, $paramArr));
			echo '</pre>';
		}

		//返回结果
		if($retFormat==1){
			return self::getXmlData($result, $paramArr);
		}
		return $result;
	}

	/**
	 * 以POST方式访问api服务，带图片
	 * @param $paramArr：api参数数组
	 * @param $imageArr：图片的服务器端地址，如array('image' => '/tmp/cs.jpg')形式
	 * @param $retFormat 返回数组还是xml
	 * @return $result
	 */
	static public function postImageResult($paramArr, $imageArr, $retFormat = '0') {
		self::instanceSnoopy(self::$active);
		$config = self::$config;
		$api_url = $config['api_url'];
		$paramArr = array_merge($paramArr,self::getDefaultConfig());

		//组织参数
		$sign = self::createSign($paramArr);
		$paramArr['sign'] = $sign;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_R($paramArr);
			echo '</pre>';
			echo '<a href="'.$api_url."?".$strParam.'">'.$api_url."?".$strParam."</a><br /><br />";
		}

		//访问服务
		self::$snoopy->_submit_type = "multipart/form-data";
		self::$snoopy->submit($api_url, $paramArr, $imageArr);
		$result = self::$snoopy->results;

		if( self::$EnableDebug ){
			echo '<pre>';
			print_r(self::getXmlData($result, $paramArr));
			echo '</pre>';
		}

		//返回结果
		if($retFormat==1){
			return self::getXmlData($result, $paramArr);
		}
		return $result;
	}

	/**
	 * 解析xml
	 */
	static public function getXmlData ($strXml, $sParameters) {
		$pos = strpos($strXml, 'xml');
		if ($pos) {
			$xmlCode=simplexml_load_string($strXml,'SimpleXMLElement', LIBXML_NOCDATA);
			$arrayCode=self::get_object_vars_final($xmlCode);
			//记录系统日志
			if ( $arrayCode['code'] > 0 ) {
				$CI =& get_instance();
				$CI->load->model('promotion_model', 'db_util');
				$aLogInfo['timestamp']	= time();
				$aLogInfo['api']		= $sParameters['method'];
				$aLogInfo['parameters']	= base64_encode(serialize($sParameters));
				$aLogInfo['code']		= $arrayCode['code'];
				$aLogInfo['msg']		= addslashes($arrayCode['msg']);
				$aLogInfo['sub_code']	= $arrayCode['sub_code'];
				$aLogInfo['sub_msg']	= addslashes($arrayCode['sub_msg']);
				$aLogInfo['url']		= 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
				$aLogInfo['content']	= base64_encode(serialize($arrayCode));
				$CI->db_util->save_api_log($aLogInfo);
			}

			return $arrayCode ;
		} else {
			return '';
		}
	}

	static private function get_object_vars_final($obj){
		if(is_object($obj)){
			$obj=get_object_vars($obj);
		}

		if(is_array($obj)){
			foreach ($obj as $key=>$value){
				$obj[$key]=self::get_object_vars_final($value);
			}
		}
		return $obj;
	}

}