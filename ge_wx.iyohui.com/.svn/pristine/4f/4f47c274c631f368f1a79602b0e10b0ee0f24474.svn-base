<?php
/**
 * 快速获取文件类型
 *
 * @author  nevergreen <xnevergreen@163.com>
 */
if ( ! function_exists('getFileType'))
{
	function getFileType($file){
		$fp = fopen($file, "rb");
		$bin = fread($fp, 2); //只读2字节
		fclose($fp);
		
		$str_info  = @unpack("C2chars", $bin);
		$type_code = $str_info['chars1'].$str_info['chars2'];

		$file_type = '';
		switch ($type_code) {
			case '7790':
				$file_type = 'exe';
				break;
			case '7784':
				$file_type = 'midi';
				break;
			case '8075':
				$file_type = 'zip';
				break;
			case '8297':
				$file_type = 'rar';
				break;
			case '255216':
				$file_type = 'jpg';
				break;
			case '7173':
				$file_type = 'gif';
				break;
			case '6677':
				$file_type = 'bmp';
				break;
			case '13780':
				$file_type = 'png';
				break;
			default:
				$file_type = 'unknown';
				break;
		}
		//echo $file , ' type: ', $file_type, ' code:', $type_code;
		$aRet['type'] = $file_type;
		$aRet['code'] = $type_code;
		return $aRet;
	}
}