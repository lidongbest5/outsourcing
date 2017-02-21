<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php $this->load->view('front/include/header'); //包括jquery、meta信息和css信息?>
<title><?php echo $title?></title>
</head>
<body>
<div id="box">
	<?php echo $content_for_layout;?>
</div>
<script src="http://l.tbcdn.cn/apps/top/x/sdk.js?appkey=12140607"></script>
<?php $this->load->view ('front/include/javascript'); //包括JavaScript文件?>
</body>
</html>
