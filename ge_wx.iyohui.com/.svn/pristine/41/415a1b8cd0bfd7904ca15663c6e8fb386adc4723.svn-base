<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * MY_Exceptions
 *
 * @package		MY_Exceptions
 * @author		nevergreen <xnevergreen@163.com>
 * @copyright	Copyright (c) 2009 - 2010, Soso2, Inc.
 * @link		http://www.soso2.com
 * @since		Version 1.0
 * @filesource
 */

class MY_Exceptions extends CI_Exceptions {

   function show_404($page = '')
   {
      $code = '404';
      $text = '页面未找到';

      $server_protocol = (isset($_SERVER['SERVER_PROTOCOL'])) ? $_SERVER['SERVER_PROTOCOL'] : FALSE;

      if (substr(php_sapi_name(), 0, 3) == 'cgi')
      {
         header("Status: {$code} {$text}", TRUE);
      }
      elseif ($server_protocol == 'HTTP/1.1' OR $server_protocol == 'HTTP/1.0')
      {
         header($server_protocol." {$code} {$text}", TRUE, $code);
      }
      else
      {
         header("HTTP/1.1 {$code} {$text}", TRUE, $code);
      }
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, base_url() . '/home/page_not_found/');
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, 'originalURL=' . urlencode($_SERVER['REQUEST_URI']));
      curl_exec($ch); // Wordpress won't let me post the word exec - remove the space in the previous code to make it run...
      curl_close($ch);
   }
}

/* End of file MY_Exceptions.php */
/* Location: ./system/application/libraries/MY_Exceptions.php */