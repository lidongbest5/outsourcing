<?php
/**
 * 格式化输出
 *
 * @author  nevergreen <xnevergreen@163.com>
 */
if ( ! function_exists('format_number'))
{
	function format_number($str,$decimal_places='2',$decimal_padding="0"){
	       /* firstly format number and shorten any extra decimal places */
	       /* Note this will round off the number pre-format $str if you dont want this fucntionality */
	       $str			= number_format($str,$decimal_places,'.','');	// will return 12345.67
	       $number		= explode('.',$str);
	       $number[1]	= (isset($number[1]))?$number[1]:'';	// to fix the PHP Notice error if str does not contain a decimal placing.
	       $decimal		= str_pad($number[1],$decimal_places,$decimal_padding);
	       return (float) $number[0].'.'.$decimal;
	}
}