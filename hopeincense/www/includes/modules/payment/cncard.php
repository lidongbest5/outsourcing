<?php

/**
 * ECSHOP ����֧�����
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: cncard.php 17063 2010-03-25 06:35:46Z liuhui $
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/cncard.php';

if (file_exists($payment_lang))
{
    global $_LANG;

    include_once($payment_lang);
}

/**
 * ģ����Ϣ
 */
if (isset($set_modules) && $set_modules == TRUE)
{
    $i = isset($modules) ? count($modules) : 0;

    /* ���� */
    $modules[$i]['code']    = basename(__FILE__, '.php');

    /* ������Ӧ�������� */
    $modules[$i]['desc']    = 'cncard_desc';

    /* �Ƿ�֧�ֻ������� */
    $modules[$i]['is_cod']  = '0';

    /* �Ƿ�֧������֧�� */
    $modules[$i]['is_online']  = '1';

    /* ���� */
    $modules[$i]['author']  = 'ECSHOP TEAM';

    /* ��ַ */
    $modules[$i]['website'] = 'http://www.cncard.net/';

    /* �汾�� */
    $modules[$i]['version'] = 'V1.1';

    /* ������Ϣ */
    $modules[$i]['config'] = array(
        array('name' => 'c_mid', 'type' => 'text',   'value' => ''),
        array('name' => 'c_pass',  'type' => 'text',   'value' => ''),
        array('name' => 'c_memo1',  'type' => 'text',   'value' => 'ecshop'),
        array('name' => 'c_moneytype',  'type' => 'select',   'value' => '0'),
        array('name' => 'c_language',  'type' => 'select',   'value' => '0'),
        array('name' => 'c_paygate', 'type' => 'select', 'value' => '')
    );

    return;
}

class cncard
{
    /**
     * ���캯��
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function cncard()
    {
    }

    function __construct()
    {
        $this->cncard();
    }

    /**
     * ����֧������
     * @param   array   $order      ������Ϣ
     * @param   array   $payment    ֧����ʽ��Ϣ
     */
    function get_code($order, $payment)
    {
        $c_mid      = trim($payment['c_mid']);  //�̻���ţ��������̻��ɹ��󼴿ɻ�ã������������̻��ɹ����ʼ��л�ȡ�ñ��
        $c_order    = $order['order_sn'];       //�̻���վ���ն����Ź������ɵĶ����ţ������ظ�
        $c_name     = "";                       //�̻������е��ջ�������
        $c_address  = "";                       //�̻������е��ջ��˵�ַ
        $c_tel      = "";                       //�̻������е��ջ��˵绰
        $c_post     = "";                       //�̻������е��ջ����ʱ�
        $c_email    = "";                       //�̻������е��ջ���Email
        $c_orderamount = $order['order_amount'];        //�̻������ܽ��
        if (!empty($order['add_time']))
        {
            $c_ymd      = local_date('Ymd', $order['add_time']);
        }
        else
        {
            $c_ymd      = local_date('Ymd', gmtime());
        }
        //$c_ymd      = substr($order['order_sn'], 0, 8); //�̻������Ĳ������ڣ���ʽΪ"yyyymmdd"����20050102
        $c_moneytype= $payment['c_moneytype'];          //֧�����֣�0Ϊ�����
        $c_retflag  = "1";                              //�̻�����֧���ɹ����Ƿ���Ҫ�����̻�ָ�����ļ���0�����÷��� 1����Ҫ����
        $c_paygate  = empty($payment['c_paygate']) ? '' : trim($payment['c_paygate']); //������̻���վѡ�����������ø�ֵ������ֵ�ɲμ�������֧��@�������ӿ��ֲᡷ��¼һ�����������֧��@��ѡ�����д���Ϊ��ֵ��
        $c_returl   = return_url(basename(__FILE__, '.php')); //���c_retflagΪ1ʱ���õ�ַ�����̻���������֧�����֪ͨ��ҳ�棬���ύ�����ļ���(��Ӧ�����ļ���GetPayNotify.php)
        $c_memo1    = abs(crc32(trim($payment['c_memo1'])));     //�̻���Ҫ��֧�����֪ͨ��ת�����̻�����һ
        if (empty($order['order_id']))
        {
            $c_memo2    = "voucher";                      //�̻���Ҫ��֧�����֪ͨ��ת�����̻�������
        }
        else
        {
            $c_memo2    = '';
        }
        $c_pass     = trim($payment['c_pass']);      //֧����Կ�����¼�̻������̨�����ʻ���Ϣ-������Ϣ-��ȫ��Ϣ�е�֧����Կ��
        $notifytype = "0";                           //0��֪ͨͨ��ʽ/1������֪ͨ��ʽ����ֵΪ��֪ͨͨ��ʽ
        $c_language = trim($payment['c_language']);  //�������˹��ʿ�֧��ʱ����ʹ�ø�ֵ����������������֧��ʱ��ҳ�����֣�ֵΪ��0����ҳ����ʾΪ����/1����ҳ����ʾΪӢ��

        $srcStr = $c_mid . $c_order . $c_orderamount . $c_ymd . $c_moneytype . $c_retflag . $c_returl . $c_paygate . $c_memo1 . $c_memo2 . $notifytype . $c_language . $c_pass;      //˵�����������ָ��֧����ʽ(c_paygate)��ֵʱ����Ҫ�����û�ѡ��֧����ʽ��Ȼ���ٸ����û�ѡ��Ľ�����������MD5���ܣ�Ҳ����˵����ʱ����ҳ��Ӧ�ò��Ϊ����ҳ�棬��Ϊ����������ɡ�

        //--�Զ�����Ϣ����MD5����
        //�̻��Զ�����Ϣ����MD5ǩ������ַ���
        $c_signstr  = md5($srcStr);

         $def_url = '<form name="payForm1" action="https://www.cncard.net/purchase/getorder.asp" method="POST" target="_blank">'.
                    "<input type=\"hidden\" name=\"c_mid\" value=\"$c_mid\" />".
                    "<input type=\"hidden\" name=\"c_order\" value=\"$c_order\" />".
                    "<input type=\"hidden\" name=\"c_name\" value=\"$c_name\" />".
                    "<input type=\"hidden\" name=\"c_address\" value=\"$c_address\" />".
                    "<input type=\"hidden\" name=\"c_tel\" value=\"$c_tel\" />".
                    "<input type=\"hidden\" name=\"c_post\" value=\"$c_post\" />".
                    "<input type=\"hidden\" name=\"c_email\" value=\"$c_email\" />".
                    "<input type=\"hidden\" name=\"c_orderamount\" value=\"$c_orderamount\" />".
                    "<input type=\"hidden\" name=\"c_ymd\" value=\"$c_ymd\" />".
                    "<input type=\"hidden\" name=\"c_moneytype\" value=\"$c_moneytype\" />".
                    "<input type=\"hidden\" name=\"c_retflag\" value=\"$c_retflag\" />".
                    "<input type=\"hidden\" name=\"c_paygate\" value=\"$c_paygate\" />".
                    "<input type=\"hidden\" name=\"c_returl\" value=\"$c_returl\" />".
                    "<input type=\"hidden\" name=\"c_memo1\" value=\"$c_memo1\" />".
                    "<input type=\"hidden\" name=\"c_memo2\" value=\"$c_memo2\" />".
                    "<input type=\"hidden\" name=\"c_language\" value=\"$c_language\" />".
                    "<input type=\"hidden\" name=\"notifytype\" value=\"$notifytype\" />".
                    "<input type=\"hidden\" name=\"c_signstr\" value=\"$c_signstr\" />".
                    "<input type=\"submit\" name=\"submit\" value=\"".$GLOBALS['_LANG']['cncard_button']."\" />".
                    "</form>";

        return $def_url;
    }

    /**
     * ��Ӧ����
     */

    function respond()
    {
        $payment  = get_payment($_GET['code']);

        //--��ȡ����֧���������̻����͵�֧��֪ͨ��Ϣ(���¼��Ϊ֪ͨ��Ϣ)
        $c_mid          = $_REQUEST['c_mid'];           //�̻���ţ��������̻��ɹ��󼴿ɻ�ã������������̻��ɹ����ʼ��л�ȡ�ñ��
        $c_order        = $_REQUEST['c_order'];         //�̻��ṩ�Ķ�����
        $c_orderamount  = $_REQUEST['c_orderamount'];   //�̻��ṩ�Ķ����ܽ���ԪΪ��λ��С���������λ���磺13.05
        $c_ymd          = $_REQUEST['c_ymd'];           //�̻���������Ķ����������ڣ���ʽΪ"yyyymmdd"����20050102
        $c_transnum     = $_REQUEST['c_transnum'];      //����֧�������ṩ�ĸñʶ����Ľ�����ˮ�ţ����պ��ѯ���˶�ʹ�ã�
        $c_succmark     = $_REQUEST['c_succmark'];      //���׳ɹ���־��Y-�ɹ� N-ʧ��
        $c_moneytype    = $_REQUEST['c_moneytype'];     //֧�����֣�0Ϊ�����
        $c_cause        = $_REQUEST['c_cause'];         //�������֧��ʧ�ܣ����ֵ����ʧ��ԭ��
        $c_memo1        = $_REQUEST['c_memo1'];         //�̻��ṩ����Ҫ��֧�����֪ͨ��ת�����̻�����һ
        $c_memo2        = $_REQUEST['c_memo2'];         //�̻��ṩ����Ҫ��֧�����֪ͨ��ת�����̻�������
        $c_signstr      = $_REQUEST['c_signstr'];       //����֧�����ض�������Ϣ����MD5���ܺ���ַ���

        //--У����Ϣ������---
        if($c_mid=="" || $c_order=="" || $c_orderamount=="" || $c_ymd=="" || $c_moneytype=="" || $c_transnum=="" || $c_succmark=="" || $c_signstr=="")
        {
            //echo "֧����Ϣ����!";

            return false;
        }

        //--����õ�֪ͨ��Ϣƴ���ַ�������Ϊ׼������MD5���ܵ�Դ������Ҫע����ǣ���ƴ��ʱ���Ⱥ�˳���ܸı�
        //�̻���֧����Կ����¼�̻������̨(https://www.cncard.net/admin/)���ڹ�����ҳ���ҵ���ֵ
        $c_pass = trim($payment['c_pass']);

        $srcStr = $c_mid . $c_order . $c_orderamount . $c_ymd . $c_transnum . $c_succmark . $c_moneytype . $c_memo1 . $c_memo2 . $c_pass;

        //--��֧��֪ͨ��Ϣ����MD5����
        $r_signstr  = md5($srcStr);

        //--У���̻���վ��֪ͨ��Ϣ��MD5���ܵĽ��������֧�������ṩ��MD5���ܽ���Ƿ�һ��
        if($r_signstr!=$c_signstr)
        {
            //echo "ǩ����֤ʧ��";

            return false;
        }
        //��֤ͨ����,������snת��ΪID ������ec������
        if ($c_memo2 == 'voucher')
        {
            $c_order = get_order_id_by_sn($c_order, "true");
        }
        else
        {
            $c_order = get_order_id_by_sn($c_order);
        }

        /* ���֧���Ľ���Ƿ���� */
        if (!check_money($c_order, $c_orderamount))
        {
            //echo "��������";

            return false;
        }

        //--У���̻����
        $MerchantID= trim($payment['c_mid']);   //�̻��Լ��ı��
        if($MerchantID!=$c_mid){
            //echo "�ύ���̻��������";

            return false;
        }

        if ($c_memo1 != abs(crc32($payment['c_memo1'])))
        {
            //echo "����ǩ����һ��";

            //return false;
        }


//      $r_orderamount = $row["�������"];  //�̻����Լ�����ϵͳ��ȡ��ֵ
//      if($r_orderamount!=$c_orderamount){
//          echo "֧���������";
//          exit;
//      }

        //--У���̻�����ϵͳ�м�¼�Ķ����������ں�����֧������֪ͨ��Ϣ�еĶ������������Ƿ�һ��
//      $r_ymd = $row["������������"];      //�̻����Լ�����ϵͳ��ȡ��ֵ
//      if($r_ymd!=$c_ymd){
//          echo "����ʱ������";
//          exit;
//      }



        //--У�鷵�ص�֧������ĸ�ʽ�Ƿ���ȷ
        if($c_succmark!="Y" && $c_succmark!="N")
        {
            //echo "�����ύ����";

            return false;
        }

        //--���ݷ��ص�֧��������̻������Լ��ķ����Ȳ���
        if($c_succmark="Y")
        {
            //�����̻��Լ�������򣬽��з�����ϵ�в���

            /* �ı䶩��״̬ */
            order_paid($c_order);

            return true;
        }
        else
        {
            //echo $c_cause;

            return false;
        }
    }
}

?>