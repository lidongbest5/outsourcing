<?php
/**
 * IBimage
 *
 * 提供图片的一些常用处理程序
 *
 * @package    Plite.Lib
 * @author     ice_berg16(寻梦的稻草人)
 * @copyright  2004-2006 ice_berg16@163.com
 * @version    $Id: Image.php 148 2006-12-05 09:31:48Z icesyc $
 */

class IBimage
{
	private $img;	//图像标识符
	private $info;	//保存图片的一些信息

	public function __construct($config = array())
	{
		if(!extension_loaded('gd'))
			throw new Exception("GD库没有加载.");
		if($config['file']) $this->loadFile($config['file']);
	}

	public function __destruct()
	{
		if(is_resource($this->img))
			imagedestroy($this->img);
	}

	//返回图片资源
	public function getResource()
	{
		if(isset($this->img))
			return $this->img;
		return null;
	}

	//返回图片信息
	public function __call($method, $arg)
	{
		if(substr($method, 0, 3) == 'get')
		{
			$attr = strtolower(substr($method, 3));
			if(isset($this->info[$attr]))
				return $this->info[$attr];
			return null;
		}
	}

	/**
	 * 保存到文件
	 *
	 * @param string $path 文件的绝对路径
	 */
	public function save($path)
	{
		$this->_output($path);
	}

	/**
	 * 将图片输出到浏览器
	 *
	 * @param $type 格式
	 */
	public function output($type='gif')
	{
		$this->_output('stream', $type);
	}

	/**
	 * 初始化，创建图像标识符
	 *
	 * @param $file 源文件
	 */
	public function loadFile($file)
	{
		if(!file_exists($file))
			throw new Exception("指定的文件不存在 => $file");
		$string = file_get_contents($file);
		$key = array('width', 'height', 'type');
		$this->info = array_combine($key, array_slice(getimagesize($file), 0, 3));
		$this->info['file'] = $file;
		$this->img = imagecreatefromstring($string);
	}

	/**
	 * 图片缩放
	 *
	 * @param int $width 目标宽度
	 * @param int $height 目标高度
	 * @param boolean $keepScale，是否等比缩放
	 * @return array $wh 包含缩放后宽度和高度的数组 $wh[0]为宽度，$wh[1]为高度
	 */
	public function resize($width, $height, $keepScale=true)
	{
		$srcw	= $this->getWidth();
		$srch	= $this->getHeight();
		if($keepScale)
		{
			//取得缩放的百分比
			$per   = (double)$width / $srcw;
			//取得缩放后的目标尺寸
			$desth = round($srch * $per) + 1;
			$destw = round($srcw * $per) + 1;

			if($desth > $height)
			{
				//缩放目标高度大于要预期高度，以高度重新计算百分比
				$per   = (double)$height / $srch;
				$desth = round($srch * $per) + 1;
				$destw = round($srcw * $per) + 1;
			}
			//得到结果
			$width  = $destw;
			$height = $desth;
		}

		//创建一个透明背景的图像
		$newimg = imagecreatetruecolor($width, $height);
		imagealphablending($newimg, false);
		//创建一个完全透明的颜色
		$trans = imagecolorallocatealpha($newimg, 0, 0, 0, 127);
		imagefilledrectangle($newimg, 0, 0, $width, $height, $trans);
		//将原始重新采样复制到透明背景上
		imagecopyresampled($newimg, $this->img, 0, 0, 0, 0, $width, $height, $srcw, $srch);
		imagedestroy($this->img);
		$this->img = $newimg;
		return array($width, $height);
	}

	/**
	 * 图片缩放(缩放成固定大小)
	 *
	 * @param int $width 目标宽度
	 * @param int $height 目标高度
	 * @param string $bgcolor 背景颜色,为空表示为透明色
	 * @param boolean $keepScale，是否等比缩放
	 * @return array $wh 包含缩放后图像的宽度和高度的数组 $wh[0]为宽度，$wh[1]为高度
	 */
	public function resize_fix($width, $height, $bgcolor='', $keepScale=true)
	{
		$srcw	= $this->getWidth();
		$srch	= $this->getHeight();
		if($keepScale)
		{
			//取得缩放的百分比
			$per   = (double)$width / $srcw;
			//取得缩放后的目标尺寸
			$desth = round($srch * $per) + 1;
			$destw = round($srcw * $per) + 1;

			if($desth > $height)
			{
				//缩放目标高度大于要预期高度，以高度重新计算百分比
				$per   = (double)$height / $srch;
				$desth = round($srch * $per) + 1;
				$destw = round($srcw * $per) + 1;
			}
		}
		else {
			$destw = $width;
			$desth = $height;
		}

		//创建一个透明背景的图像
		$newimg  = imagecreatetruecolor($width, $height);
		imagealphablending($newimg, false);
		if ($bgcolor=='') {
			//创建一个完全透明的颜色
			$bgcolor = imagecolorallocatealpha($newimg, 0, 0, 0, 127);
		}
		else {
			//创建一个有背景色的颜色
			$bgcolor = $this->_hexColor($bgcolor);
			$bgcolor = imagecolorallocate($newimg, $bgcolor['r'], $bgcolor['g'], $bgcolor['b']);
		}
		imagefilledrectangle($newimg, 0, 0, $width, $height, $bgcolor);
		//将原始重新采样复制到背景上
		imagecopyresampled($newimg, $this->img, abs(($width-$destw)/2), abs(($height-$desth)/2), 0, 0, $destw, $desth, $srcw, $srch);
		imagedestroy($this->img);
		$this->img = $newimg;
		return array($destw, $desth);
	}

	/**
	 * 生成缩略图
	 *
	 * @param $path 要生成的新文件名
	 * @param $width 宽度
	 * @param $height 高度
	 */
	public function thumbnail($width=128,$height=128, $path=null)
	{
		$width  = min($this->getWidth(), $width);
		$height = min($this->getHeight(), $height);
		$this->resize($width, $height);
		if($path)$this->save($path);
	}

	/**
	 * 生成缩略图(固定大小)
	 *
	 * @param $path 要生成的新文件名
	 * @param $width 宽度
	 * @param $height 高度
	 * @param $bgcolor 背景色，如果为空，表示为透明色
	 */
	public function thumbnail_fix($width=128,$height=128,$bgcolor='', $path=null)
	{
		$width  = min($this->getWidth(), $width);
		$height = min($this->getHeight(), $height);
		$this->resize_fix($width, $height, $bgcolor);
		if($path)$this->save($path);
	}

	/**
	 * 给图片加带背景的一行文字
	 *
	 * @param string $text 水印文字
	 * @param string $font 字体文件的路径
	 * @param $color 文字的颜色 16进制，默认为黑色
	 * @param int $size	文字的大小
	 * @param string $path 如果指定则生成图片到$path
	 * @return 生成的水印图片路径
	 */
	public function textMark($text, $font, $color="#000000", $size=9, $path=null)
	{
		if(!file_exists($font))
			throw new Exception("字体文件不可用 => $font");
		//校正GIF
		$this->_fixGif();
		//取得图片的高度和宽度
		$mwidth = $this->getWidth();
		$mheight= $this->getHeight();

		$color = $this->_hexColor($color);
		$color = imagecolorallocate($this->img, $color['r'], $color['g'], $color['b']);
		$black = imagecolorallocate($this->img, 0, 0, 0);
		$alpha = imagecolorallocatealpha($this->img, 230, 230, 230, 40);
		//填充文字背景
		$box = imagettfbbox($size, 0, $font, $text);
		//文字补白
		$padding    = 6;
		$textheight = $box[1] - $box[7];
		$bgheight   = $textheight + $padding * 2;
		//文字背景
		imagefilledrectangle($this->img, 0, $mheight-$bgheight, $mwidth, $mheight, $alpha);
		//小竖条
		imagefilledrectangle($this->img, 10, $mheight-$padding-$textheight, 15, $mheight-$padding, $color);
		//填充文字
		$texty = $mheight - $bgheight/2 + $textheight/2;
		imagettftext($this->img, $size, 0, 20, $texty, $color, $font, $text);
		if($path) $this->save($path);
	}

	/**
	 * 用一张PNG图片给原始图片加水印，水印图片将自动调整到目标图片大小
	 *
	 * png图片可以使用Photoshop保存为24位的透明png
	 *
	 * @param string $png png图片的路径
	 * @param string $hp 水平位置 left|center|right
	 * @param string $vp 垂直位置 top|center|bottom
	 * @param string $path 如果指定则生成图片到$path
	 * @param
	 * @return
	 */
	public function waterMark($png, $hp='center', $vp='center', $path=null)
	{
		//原图信息
		$srcw = $this->getWidth();
		$srch = $this->getHeight();

		//水印图信息
		$mark = new self($png);
		$markw = $mark->getWidth();
		$markh = $mark->getHeight();

		//校正GIF
		$this->_fixGif();

		//水印图片大于目标图片，调整大小
		if($mark->getWidth() > $srcw || $mark->getHeight() > $srch)
		{
			//先将水印图片调整到原始图片大小-10个像素
			list($marw, $marh) = $mark->resize($srcw-10, $srch-10);
		}

		//判断水印位置
		$arrx = array('left' => 0, 'center' => floor(($srcw - $markw) / 2), 'right' => $srcw - $markw);
		$arry = array('top'  => 0, 'center' => floor(($srch - $markh) / 2), 'bottom' => $srch - $markh);
		$x = isset($arrx[$hp]) ? $arrx[$hp] : $arrx['center'];
		$y = isset($arry[$vp]) ? $arry[$vp] : $arry['center'];

		//打开混色模式
		imagealphablending($this->img, true);
		imagecopy($this->img, $mark->getResource(), $x, $y, 0, 0, $markw, $markh);
		unset($mark);
		if($path) $this->save($path);
	}

	//返回由16进制组成的颜色索引
	private function _hexColor($hex)
	{
		$color = hexdec(substr($hex, 1));
        return array(
			"r"	=> ($color & 0xFF0000) >> 16,
            "g" => ($color & 0xFF00) >> 8,
            "b"	=> $color & 0xFF
		);
	}

	//gif图片较正，GIF转换成真彩色图片
	private function _fixGif()
	{
		if($this->getType() == 1)
		{
			$w = $this->getWidth();
			$h = $this->getHeight();
			$newimg = imagecreatetruecolor($w, $h);
			imagecopy($newimg, $this->img, 0, 0, 0, 0, $w, $h);
			imagedestroy($this->img);
			$this->img = $newimg;
		}
	}

	//png的alpha校正
	private function _pngalpha($format)
	{
		//PNG图像要保持alpha通道
		if($format == 'png')
		{
			imagealphablending($this->img, false);
			imagesavealpha($this->img, true);
		}
	}

	//输出函数，内部使用
	private function _output($path, $type=null)
	{
		$toFile = false;
		//输出到文件
		if($path !='stream')
		{
			if(!is_dir(dirname($path)))
				throw new Exception('指定的路径不可用 =>'.$path);
			$type = pathinfo($path, PATHINFO_EXTENSION);
			$toFile = true;
		}
		//png的alpha校正
		$this->_pngalpha($type);

		if($type == "jpg") $type = "jpeg";
		$func = "image".$type;
		if(!function_exists($func))
		{
			$type = 'gif';
			$func = 'imagegif';
		}
		if($toFile)
		{
			call_user_func($func, $this->img, $path);
		}
		else
		{
			if(!headers_sent())
				header("Content-type:image/".$type);
			call_user_func($func, $this->img);
		}
		imagedestroy($this->img);
	}
}