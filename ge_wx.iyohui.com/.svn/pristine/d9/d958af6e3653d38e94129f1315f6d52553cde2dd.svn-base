<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 日期加减
 * 内部使用
 *
 * @author  nevergreen <xnevergreen@163.com>
 */
if ( ! function_exists('DateAdd'))
{
	function DateAdd ($interval, $number, $date) {
		$date_time_array = getdate($date);
		$hours = $date_time_array["hours"];
		$minutes = $date_time_array["minutes"];
		$seconds = $date_time_array["seconds"];
		$month = $date_time_array["mon"];
		$day = $date_time_array["mday"];
		$year = $date_time_array["year"];
		switch ($interval) {
		case "yyyy": $year +=$number; break;
		case "q": $month +=($number*3); break;
		case "m": $month +=$number; break;
		case "y":
		case "d":
		case "w": $day+=$number; break;
		case "ww": $day+=($number*7); break;
		case "h": $hours+=$number; break;
		case "n": $minutes+=$number; break;
		case "s": $seconds+=$number; break;
		}
		$timestamp = mktime($hours ,$minutes, $seconds,$month ,$day, $year);
		return $timestamp;
	}
}

/**
 * 日期差
 * 内部使用
 *
 * @author  nevergreen <xnevergreen@163.com>
 */
if ( ! function_exists('DateDiff'))
{
	function DateDiff ($interval, $date1,$date2) {
		// 得到两日期之间间隔的秒数
		$timedifference = $date2 - $date1;
		switch ($interval) {
		case "m": $retval = bcdiv( $timedifference, 2592000); break;
		case "w": $retval = bcdiv( $timedifference, 604800); break;
		case "d": $retval = bcdiv( $timedifference, 86400); break;
		case "h": $retval = bcdiv( $timedifference, 3600); break;
		case "n": $retval = bcdiv( $timedifference, 60); break;
		case "s": $retval = $timedifference; break;
		}
		return $retval;
	}
}