<?php

require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$access_token = $jssdk->getToken();
$media_id = $_GET["media_id"];
$url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token={$access_token}&media_id={$media_id}";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
$a = curl_exec($ch);
curl_close($ch);
$fp = fopen('images/upload/'.$media_id.'.jpg', 'wb');
fwrite($fp, $a);
fclose($fp);

return $media_id;
