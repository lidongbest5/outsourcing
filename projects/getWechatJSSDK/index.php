<?php
$url = $_GET["url"];
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage($url);
$a = array('debug'=>false, 'appId'=>$signPackage["appId"], 'timestamp'=> $signPackage["timestamp"], 'nonceStr'=>$signPackage["nonceStr"], 'signature'=>$signPackage["signature"],'jsApiList'=>array('onMenuShareTimeline','onMenuShareAppMessage','previewImage'), 'url'=>$signPackage["url"]);
echo json_encode($a);
?>
