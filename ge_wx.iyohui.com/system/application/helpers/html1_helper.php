<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Heading
 *
 * Generates an HTML heading tag.  First param is the data.
 * Second param is the size of the heading tag.
 *
 * @access	public
 * @param	string
 * @param	integer
 * @return	string
 */
if ( ! function_exists('pre_array'))
{
	function pre_array($data = '')
	{
		echo "<pre>";
		print_R($data);
		echo "</pre>";
	}
}