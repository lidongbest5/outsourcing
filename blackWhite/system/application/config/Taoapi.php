<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 淘宝开放平台配置信息
 */
$config['active']					= "iyohui";											//缺省使用哪个配置
$config['wangwang_active']			= "wangwang";										//缺省使用哪个配置
$config['taobaoke_active']			= "yyb";											//缺省使用哪个配置
$config['frontactive']				= "taobaofront";									//旺铺前台缺省使用哪个配置

$config['default']['api_key'] 		= "12118982";										//淘宝开放平台id
$config['default']['app_secret'] 	= "14ad0504e039057bbb1992077f52d847";				//淘宝开放平台密钥
$config['default']['api_url'] 		= "http://gw.api.taobao.com/router/rest";			//淘宝开放平台url
$config['default']['api_container'] = "http://container.api.taobao.com/container";		//淘宝开放平台应用容器地址
$config['default']['charset'] 		= 'UTF-8';											//字符集
$config['default']['format'] 		= 'xml';											//返回结果形式,xml和json
$config['default']['v'] 			= '2.0';											//api版本号
$config['default']['sign_method'] 	= 'md5';											//淘宝签名方法，md5或者hmac
$config['default']['close_error'] 	= 1;												//是否关闭错误提示,1为关闭
$config['default']['page_size'] 	= 2;												//商品导入每页的商品数量


$config['so2bao']['api_key'] 		= "12039782";										//淘宝开放平台id
$config['so2bao']['app_secret']		= "c7da04e614b1c7fdf22db4349b3d7894";				//淘宝开放平台密钥
$config['so2bao']['api_url'] 		= "http://gw.api.taobao.com/router/rest";			//淘宝开放平台url
$config['so2bao']['api_container']	= "http://container.api.taobao.com/container";		//淘宝开放平台应用容器地址
$config['so2bao']['charset'] 		= 'UTF-8';											//字符集
$config['so2bao']['format'] 		= 'xml';											//返回结果形式,xml和json
$config['so2bao']['v'] 				= "2.0";											//版本号
$config['so2bao']['sign_method'] 	= 'md5';											//淘宝签名方法，md5或者hmac
$config['so2bao']['close_error'] 	= 1;												//是否关闭错误提示,1为关闭


$config['yybao']['api_key'] 			= "12132457";									//淘宝开放平台id
$config['yybao']['app_secret'] 			= "208b11974977508ed015e7ae897d404f";			//淘宝开放平台密钥
$config['yybao']['api_url'] 			= "http://gw.api.taobao.com/router/rest";		//淘宝开放平台url
$config['yybao']['api_container']		= "http://container.api.taobao.com/container";	//淘宝开放平台应用容器地址
$config['yybao']['charset'] 			= 'UTF-8';										//字符集
$config['yybao']['format'] 				= 'xml';										//返回结果形式,xml和json
$config['yybao']['v'] 					= "2.0";										//版本号
$config['yybao']['sign_method'] 		= 'md5';										//淘宝签名方法，md5或者hmac
$config['yybao']['close_error'] 		= 1;											//是否关闭错误提示,1为关闭

$config['iyohui']['api_key'] 			= "12275915";									//淘宝开放平台id
$config['iyohui']['app_secret'] 		= "1685dfe340ad28f527e6b597b4bfc8d5";			//淘宝开放平台密钥
$config['iyohui']['api_url'] 			= "http://gw.api.taobao.com/router/rest";		//淘宝开放平台url
$config['iyohui']['api_container']		= "http://container.api.taobao.com/container";	//淘宝开放平台应用容器地址
$config['iyohui']['charset'] 			= 'UTF-8';										//字符集
$config['iyohui']['format'] 			= 'xml';										//返回结果形式,xml和json
$config['iyohui']['v'] 					= "2.0";										//版本号
$config['iyohui']['sign_method'] 		= 'md5';										//淘宝签名方法，md5或者hmac
$config['iyohui']['close_error'] 		= 1;											//是否关闭错误提示,1为关闭

$config['iyohui_sandbox']['api_key'] 		= "12294635";									//淘宝开放平台id
$config['iyohui_sandbox']['app_secret'] 	= "sandbox59b13724bb7cf42311b6a07d1";			//淘宝开放平台密钥
$config['iyohui_sandbox']['api_url'] 		= "http://gw.api.tbsandbox.com/router/rest";	//淘宝开放平台url
$config['iyohui_sandbox']['api_container']	= "http://container.api.tbsandbox.com/container";//淘宝开放平台应用容器地址
$config['iyohui_sandbox']['charset'] 		= 'UTF-8';										//字符集
$config['iyohui_sandbox']['format'] 		= 'xml';										//返回结果形式,xml和json
$config['iyohui_sandbox']['v'] 				= "2.0";										//版本号
$config['iyohui_sandbox']['sign_method'] 	= 'md5';										//淘宝签名方法，md5或者hmac
$config['iyohui_sandbox']['close_error'] 	= 1;											//是否关闭错误提示,1为关闭

$config['iyohui-old']['api_key'] 			= "12270463";									//淘宝开放平台id
$config['iyohui-old']['app_secret'] 		= "ceb60267d294068294f6eac1d4e733a0";			//淘宝开放平台密钥
$config['iyohui-old']['api_url'] 			= "http://gw.api.taobao.com/router/rest";		//淘宝开放平台url
$config['iyohui-old']['api_container']		= "http://container.api.taobao.com/container";	//淘宝开放平台应用容器地址
$config['iyohui-old']['charset'] 			= 'UTF-8';										//字符集
$config['iyohui-old']['format'] 			= 'xml';										//返回结果形式,xml和json
$config['iyohui-old']['v'] 					= "2.0";										//版本号
$config['iyohui-old']['sign_method'] 		= 'md5';										//淘宝签名方法，md5或者hmac
$config['iyohui-old']['close_error'] 		= 1;											//是否关闭错误提示,1为关闭

$config['yyb']['api_key'] 					= "12394439";									//淘宝开放平台id
$config['yyb']['app_secret'] 				= "f766bfe7e228ff8991a99e8fe7dafabe";			//淘宝开放平台密钥
$config['yyb']['api_url'] 					= "http://gw.api.taobao.com/router/rest";		//淘宝开放平台url
$config['yyb']['api_container']				= "http://container.api.taobao.com/container";	//淘宝开放平台应用容器地址
$config['yyb']['charset'] 					= 'UTF-8';										//字符集
$config['yyb']['format'] 					= 'xml';										//返回结果形式,xml和json
$config['yyb']['v'] 						= "2.0";										//版本号
$config['yyb']['sign_method'] 				= 'md5';										//淘宝签名方法，md5或者hmac
$config['yyb']['close_error'] 				= 1;											//是否关闭错误提示,1为关闭

$config['wangwang']['api_key'] 					= "21074753";									//淘宝开放平台id
$config['wangwang']['app_secret'] 				= "c9c585b82292863f9f0a7e876a5ff147";			//淘宝开放平台密钥
$config['wangwang']['api_url'] 					= "http://gw.api.taobao.com/router/rest";		//淘宝开放平台url
$config['wangwang']['api_container']			= "http://container.api.taobao.com/container";	//淘宝开放平台应用容器地址
$config['wangwang']['charset'] 					= 'UTF-8';										//字符集
$config['wangwang']['format'] 					= 'xml';										//返回结果形式,xml和json
$config['wangwang']['v'] 						= "2.0";										//版本号
$config['wangwang']['sign_method'] 				= 'md5';										//淘宝签名方法，md5或者hmac
$config['wangwang']['close_error'] 				= 1;											//是否关闭错误提示,1为关闭