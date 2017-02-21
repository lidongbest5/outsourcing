<?php
require_once "../wechat/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
$a = array('debug'=>true, 'appId'=>$signPackage["appId"], 'timestamp'=> $signPackage["timestamp"], 'nonceStr'=>$signPackage["nonceStr"], 'signature'=>$signPackage["signature"],'jsApiList'=>array('onMenuShareTimeline','onMenuShareAppMessage','previewImage'));
echo json_encode($a);
?>
