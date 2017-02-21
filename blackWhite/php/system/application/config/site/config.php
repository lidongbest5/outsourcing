<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| 我的自定义变量
|--------------------------------------------------------------------------
|
*/
$config['css'] = array('basecss'=>'common/css/default.css');
$config['title'] = array(
					'admin'				=>	'ge-后台管理',
				);
$config['image_type'] = array('gif', 'jpg', 'png');

// $config['ge'] = "interactive:5002";
// $config['domain'] = "interactive";
$config['ge'] = "ge.iyohui.com";

$config['season_photo_max_size'] = 1024*1024*3;	//B KB M	上传图片最大限制
$config['photo_max_size'] = 1024*1024*1;	//B KB M	上传图片最大限制
$config['video_max_size'] = 1024*1024*100;	//B KB M	上传视频最大限制

$config['img_small_width'] = 200;
$config['img_detail_width'] = 500;