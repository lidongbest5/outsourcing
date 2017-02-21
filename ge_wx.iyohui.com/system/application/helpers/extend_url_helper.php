<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('extend_url'))
{
	function extend_url($type = 'theme', $server = '')
	{
		$CI =& get_instance();
		switch($type){
			case 'theme':
				$return = 'http://theme' . $server .  '.cdn' . $CI->config->slash_item('root_url');
				break;
				
			case 'item':
				$return = 'http://item' . $server . $CI->config->slash_item('root_url');
				break;
		}
		return $return;
	}
}