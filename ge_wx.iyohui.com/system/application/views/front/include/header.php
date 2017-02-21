<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script type="text/javascript" src="<?php echo base_url()?>common/js/jquery/jquery.js"></script>
<?php
//额外添加css
if ($LoadFile['css'] != NULL){
	
	foreach ( $LoadFile['css'] as $v )
	{
		echo link_tag( base_url() . 'common/css/' . $v . '.css' );
	}
}
?>