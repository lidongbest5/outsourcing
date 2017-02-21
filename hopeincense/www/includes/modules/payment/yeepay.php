<?php

/**
 * ECSHOP YeePay�ױ����
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: yeepay.php 17063 2010-03-25 06:35:46Z liuhui $
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

$payment_lang = ROOT_PATH . 'languages/' .$GLOBALS['_CFG']['lang']. '/payment/yeepay.php';

if (file_exists($payment_lang))
{
    global $_LANG;

    include_once($payment_lang);
}

/* ģ��Ļ�����Ϣ */
if (isset($set_modules) && $set_modules == TRUE)
{
    $i = isset($modules) ? count($modules) : 0;

    /* ���� */
    $modules[$i]['code']    = basename(__FILE__, '.php');

    /* ������Ӧ�������� */
    $modules[$i]['desc']    = 'yp_desc';

    /* �Ƿ�֧�ֻ������� */
    $modules[$i]['is_cod']  = '0';

    /* �Ƿ�֧������֧�� */
    $modules[$i]['is_online']  = '1';

    /* ���� */
    $modules[$i]['author']  = 'ECSHOP TEAM';

    /* ��ַ */
    $modules[$i]['website'] = 'http://www.yeepay.com';

    /* �汾�� */
    $modules[$i]['version'] = '1.0.1';

    /* ������Ϣ */
    $modules[$i]['config']  = array(
        array('name' => 'yp_account', 'type' => 'text', 'value' => ''),
        array('name' => 'yp_key',     'type' => 'text', 'value' => ''),
    );

    return;
}

/**
 * ��
 */
class yeepay
{
    /**
     * ���캯��
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function yeepay()
    {
    }

    function __construct()
    {
        $this->yeepay();
    }

    /**
     * ����֧������
     * @param   array   $order  ������Ϣ
     * @param   array   $payment    ֧����ʽ��Ϣ
     */
    function get_code($order, $payment)
    {
        $data_merchant_id = $payment['yp_account'];
        $data_order_id    = $order['order_sn'];
        $data_amount      = $order['order_amount'];
        $message_type     = 'Buy';
        $data_cur         = 'CNY';
        $product_id       = '';
        $product_cat      = '';
        $product_desc     = '';
        $address_flag     = '0';

        $data_return_url  = return_url(basename(__FILE__, '.php'));

        $data_pay_key     = $payment['yp_key'];
        $data_pay_account = $payment['yp_account'];
        $mct_properties   = $order['log_id'];
        $def_url = $message_type . $data_merchant_id . $data_order_id . $data_amount . $data_cur . $product_id . $product_cat
                             . $product_desc . $data_return_url . $address_flag . $mct_properties;
        $MD5KEY = hmac($def_url, $data_pay_key);

        $def_url  = "\n<form action='https://www.yeepay.com/app-merchant-proxy/node' method='post' target='_blank'>\n";
        $def_url .= "<input type='hidden' name='p0_Cmd' value='".$message_type."'>\n";
        $def_url .= "<input type='hidden' name='p1_MerId' value='".$data_merchant_id."'>\n";
        $def_url .= "<input type='hidden' name='p2_Order' value='".$data_order_id."'>\n";
        $def_url .= "<input type='hidden' name='p3_Amt' value='".$data_amount."'>\n";
        $def_url .= "<input type='hidden' name='p4_Cur' value='".$data_cur."'>\n";
        $def_url .= "<input type='hidden' name='p5_Pid' value='".$product_id."'>\n";
        $def_url .= "<input type='hidden' name='p6_Pcat' value='".$product_cat."'>\n";
        $def_url .= "<input type='hidden' name='p7_Pdesc' value='".$product_desc."'>\n";
        $def_url .= "<input type='hidden' name='p8_Url' value='".$data_return_url."'>\n";
        $def_url .= "<input type='hidden' name='p9_SAF' value='".$address_flag."'>\n";
        $def_url .= "<input type='hidden' name='pa_MP' value='".$mct_properties."'>\n";
        $def_url .= "<input type='hidden' name='hmac' value='".$MD5KEY."'>\n";
        $def_url .= "<input type='submit' value='" . $GLOBALS['_LANG']['pay_button'] . "'>";
        $def_url .= "</form>\n";

        return $def_url;
    }

    /**
     * ��Ӧ����
     */
    function respond()
    {
        $payment        = get_payment('yeepay');

        $merchant_id    = $payment['yp_account'];       // ��ȡ�̻����
        $merchant_key   = $payment['yp_key'];           // ��ȡ��Կ

        $message_type   = trim($_REQUEST['r0_Cmd']);
        $succeed        = trim($_REQUEST['r1_Code']);   // ��ȡ���׽��,1�ɹ�,-1ʧ��
        $trxId          = trim($_REQUEST['r2_TrxId']);
        $amount         = trim($_REQUEST['r3_Amt']);    // ��ȡ�������
        $cur            = trim($_REQUEST['r4_Cur']);    // ��ȡ�������ҵ�λ
        $product_id     = trim($_REQUEST['r5_Pid']);    // ��ȡ��ƷID
        $orderid        = trim($_REQUEST['r6_Order']);  // ��ȡ����ID
        $userId         = trim($_REQUEST['r7_Uid']);    // ��ȡ��ƷID
        $merchant_param = trim($_REQUEST['r8_MP']);     // ��ȡ�̻�˽�в���
        $bType          = trim($_REQUEST['r9_BType']);  // ��ȡ����ID

        $mac            = trim($_REQUEST['hmac']);      // ��ȡ��ȫ���ܴ�

        ///���ɼ��ܴ�,ע��˳��
        $ScrtStr  = $merchant_id . $message_type . $succeed . $trxId . $amount . $cur . $product_id .
                      $orderid . $userId . $merchant_param . $bType;
        $mymac    = hmac($ScrtStr, $merchant_key);

        $v_result = false;

        if (strtoupper($mac) == strtoupper($mymac))
        {
            if ($succeed == '1')
            {
                ///֧���ɹ�
                $v_result = true;

                order_paid($merchant_param);
            }
        }

        return $v_result;
    }
}

if (!function_exists("hmac"))
{
    function hmac($data, $key)
    {
        // RFC 2104 HMAC implementation for php.
        // Creates an md5 HMAC.
        // Eliminates the need to install mhash to compute a HMAC
        // Hacked by Lance Rushing(NOTE: Hacked means written)

        $key  = ecs_iconv('GB2312', 'UTF8', $key);
        $data = ecs_iconv('GB2312', 'UTF8', $data);

        $b = 64; // byte length for md5
        if (strlen($key) > $b)
        {
            $key = pack('H*', md5($key));
        }

        $key    = str_pad($key, $b, chr(0x00));
        $ipad   = str_pad('', $b, chr(0x36));
        $opad   = str_pad('', $b, chr(0x5c));
        $k_ipad = $key ^ $ipad ;
        $k_opad = $key ^ $opad;

        return md5($k_opad . pack('H*', md5($k_ipad . $data)));
    }
}

?>