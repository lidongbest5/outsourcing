<?php
/**
 * ECSHOP ��Ǯ����ע��ӿ�
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: send.php 15013 2008-10-23 09:31:42Z liuhui $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

//�̻���Կ
$key='LHLEF8EA4ZY853NF';

//�ӿڰ汾�����ɿ�
//�̶�ֵ��150120
$version='150120';

//�����ַ�����ʽ
//�̶�ֵ��1��2��3
//1����UTF-8;2����GBK��3����GB2312
$inputCharset='3';

//ǩ�����ͣ����ɿ�
//�̶�ֵ��1��1����MD5����
$signType='1';

//�̻��ڿ�Ǯ�Ļ�Ա��ţ����ɿ�
$merchantMbrCode='10017518267';

//�����ţ����ɿ�
//ֻ��������ĸ�����֡���_���ȣ�����ĸ�����ֿ�ͷ
$requestId=date('YmdHis');


//ע�����ͣ����ɿ�
//�̶�ֵ��1��2
//1������ע���û���2�����ظ�ע���û�
$registerType='1';

//�û����̻�ϵͳ��ID�����ɿ�
//ֻ��������ĸ�����֡���_���ȣ�����ĸ�����ֿ�ͷ
$userId=date('YmdHis');

//�û����ͣ����ɿ�
//�̶�ֵ��1��2
//1������ˣ�2������ҵ
$userType='1';

//�û���EMAIL
$userEmail='payment@shopex.cn';

//�û����ֻ�
$userMobile='';

//�û�������
//���Ļ�Ӣ��
$userName='';

//��ϵ��
//���Ļ�Ӣ��
$linkMan='';

//��ϵ�绰
//�ֻ���̶��绰
$linkTel='';

//��λ����
//���Ļ�Ӣ��
$orgName='';

//��վ��ַ
$websiteAddr='';

//�̻����շ���ҳ��ĵ�ַ�����ɿ�
//�̻����������տ�Ǯ���ؽ���ĺ�̨��ַ
//��Ǯͨ�����������ӵķ�ʽ�����׽���������ݸ��̻��ṩ�����url���̻������������ս���ͷ���ҳ���ַ
$backUrl=$ecs->url() . ADMIN_PATH . '/receive.php';
//��չ����һ
//���Ļ�Ӣ��
$ext1='';

//��չ������
//���Ļ�Ӣ��
$ext2='';

//���ܺ�����������ֵ��Ϊ�յĲ�������ַ���
Function appendParam($returnStr,$paramId,$paramValue){
    if($returnStr!=""){
        if($paramValue!=""){
            $returnStr.="&".$paramId."=".$paramValue;
        }
    }else{
        If($paramValue!=""){
            $returnStr=$paramId."=".$paramValue;
        }
    }
    return $returnStr;
}
//���ܺ�����������ֵ��Ϊ�յĲ�������ַ���������

//���ɼ���ǩ����
///����ذ�������˳��͹�����ɼ��ܴ���
$signMsgVal="";
$signMsgVal=appendParam($signMsgVal,"version",$version);
$signMsgVal=appendParam($signMsgVal,"inputCharset",$inputCharset);
$signMsgVal=appendParam($signMsgVal,"signType",$signType);
$signMsgVal=appendParam($signMsgVal,"merchantMbrCode",$merchantMbrCode);
$signMsgVal=appendParam($signMsgVal,"requestId",$requestId);
$signMsgVal=appendParam($signMsgVal,"registerType",$registerType);
$signMsgVal=appendParam($signMsgVal,"userId",$userId);
$signMsgVal=appendParam($signMsgVal,"userType",$userType);
$signMsgVal=appendParam($signMsgVal,"userEmail",$userEmail);
$signMsgVal=appendParam($signMsgVal,"userMobile",$userMobile);
$signMsgVal=appendParam($signMsgVal,"userName",$userName);
$signMsgVal=appendParam($signMsgVal,"linkMan",$linkMan);
$signMsgVal=appendParam($signMsgVal,"linkTel",$linkTel);
$signMsgVal=appendParam($signMsgVal,"orgName",$orgName);
$signMsgVal=appendParam($signMsgVal,"websiteAddr",$websiteAddr);
$signMsgVal=appendParam($signMsgVal,"backUrl",$backUrl);
$signMsgVal=appendParam($signMsgVal,"ext1",$ext1);
$signMsgVal=appendParam($signMsgVal,"ext2",$ext2);
$signMsgVal=appendParam($signMsgVal,"key",$key);
//echo $signMsgVal;exit;
$signMsg=strtoupper(md5($signMsgVal));

header("location:https://www.99bill.com/website/signup/memberunitedsignup.htm?version=".$version."&inputCharset=".$inputCharset."&signType=".$signType."&merchantMbrCode=".$merchantMbrCode."&requestId=".$requestId."&registerType=".$registerType."&userId=".$userId."&userType=".$userType."&userEmail=".$userEmail."&userMobile=".$userMobile."&userName=".$userName."&linkMan=".$linkMan."&linkTel=".$linkTel."&orgName=".$orgName."&websiteAddr=".$websiteAddr."&backUrl=".$backUrl."&ext1=".$ext1."&ext2=".$ext2."&signMsg=".$signMsg);

?>
