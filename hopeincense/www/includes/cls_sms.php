<?php

/**
 * ECSHOP ����ģ�� ֮ ģ�ͣ���⣩
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: yehuaixiao $
 * $Id: cls_sms.php 17155 2010-05-06 06:29:05Z yehuaixiao $
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

require_once(ROOT_PATH . 'includes/cls_transport.php');
require_once(ROOT_PATH . 'includes/shopex_json.php');

/* ����ģ������ */
class sms
{
    /**
     * ����ṩԶ�̷����URL��
     *
     * @access  private
     * @var     array       $api_urls
     */
    var $api_urls   = array('register'          =>      'http://sms.ecshop.com/register.php',
                            'auth'              =>      'http://sms.ecshop.com/user_auth.php',
                            'send'              =>      'http://idx.sms.shopex.cn/service.php ',
                            'charge'            =>      'http://sms.ecshop.com/charge.php?act=charge_form',
                            'balance'           =>      'http://sms.ecshop.com/get_balance.php',
                            'send_history'      =>      'http://sms.ecshop.com/send_history.php',
                            'charge_history'    =>      'http://sms.ecshop.com/charge_history.php');
    /**
     * ���MYSQL����
     *
     * @access  private
     * @var     object      $db
     */
    var $db         = null;

    /**
     * ���ECS����
     *
     * @access  private
     * @var     object      $ecs
     */
    var $ecs        = null;

    /**
     * ���transport����
     *
     * @access  private
     * @var     object      $t
     */
    var $t          = null;

    /**
     * ��ų���ִ�й����еĴ�����Ϣ����������һ���ô��ǣ��������֧�ֶ����ԡ�
     * ������ִ����صĲ���ʱ��error_noֵ�����ı䣬���ܱ���Ϊ�ջ���0������.
     * Ϊ�ջ�0��ʾ�����ɹ�������0�����ֱ�ʾ����ʧ�ܣ������ִ������š�
     *
     * @access  public
     * @var     array       $errors
     */
    var $errors  = array('api_errors'       => array('error_no' => -1, 'error_msg' => ''),
                         'server_errors'    => array('error_no' => -1, 'error_msg' => ''));

    /**
     * ���캯��
     *
     * @access  public
     * @return  void
     */
    function __construct()
    {
        $this->sms();
    }

    /**
     * ���캯��
     *
     * @access  public
     * @return  void
     */
    function sms()
    {
        /* ����Ҫ����init.php����������������һ���Ǵ��ڵģ����ֱ�Ӹ�ֵ */
        $this->db = $GLOBALS['db'];
        $this->ecs = $GLOBALS['ecs'];

        /* �˴���ò�Ҫ��$GLOBALS���������ã���ֹ���� */
        $this->t = new transport(-1, -1, -1, false);
    }

    /**
     * ����Ƿ���ע������ö��ŷ���
     *
     * @access  public
     * @return  boolean     ��ע������ö��ŷ��񷵻�true�����򷵻�false��
     */
    function has_registered()
    {
        $sql = 'SELECT `value`
                FROM ' . $this->ecs->table('shop_config') . "
                WHERE `code` = 'sms_shop_mobile'";

        $result = $this->db->getOne($sql);

        if (empty($result))
        {
            return false;
        }

        return true;
    }

    /**
     * ����ָ��������URL
     *
     * @access  public
     * @param   string      $key        URL�����֣�������ļ���
     * @return  string or boolean       ������β�ָ���ļ�����Ӧ��URLֵ���ھͷ��ظ�URL�����򷵻�false��
     */
    function get_url($key)
    {
        $url = $this->api_urls[$key];

        if (empty($url))
        {
            return false;
        }

        return $url;
    }

    /**
     * ��ö����ط���Ϣ
     *
     * @access  public
     * @return  1-dimensional-array or boolean      �ɹ����ض����ط���Ϣ�����򷵻�false��
     */
    function get_my_info()
    {
        $sql = 'SELECT `code`, `value`
                FROM ' . $this->ecs->table('shop_config') . "
                WHERE `code` LIKE '%sms\_%'";
        $result = $this->db->query($sql);

        $retval = array();
        if (!empty($result))
        {
            while ($temp_arr = $this->db->fetchRow($result))
            {
                $retval[$temp_arr['code']] = $temp_arr['value'];
            }

            return $retval;
        }

        return false;
    }

    /**
     * ��õ�ǰ���ڻỰ״̬�Ĺ���Ա������
     *
     * @access  private
     * @return  string or boolean       �ɹ����ع���Ա�����䣬���򷵻�false��
     */
    function get_admin_email()
    {
        $sql = 'SELECT `email` FROM ' . $this->ecs->table('admin_user') . " WHERE `user_id` = '" . $_SESSION['admin_id'] . "'";
         $email = $this->db->getOne($sql);

         if (empty($email))
         {
            return false;
         }

         return $email;
    }

    /**
     * ȡ������Ա�����估��������
     *
     * @access  public
     * @return  void
     */
    function get_site_info()
    {
        /* ��õ�ǰ���ڻỰ״̬�Ĺ���Ա������ */
        $email = $this->get_admin_email();
        $email = $email ? $email : '';
        /* ��õ�ǰ��������� */
        $domain = $this->ecs->get_domain();
        $domain = $domain ? $domain : '';

        /* ����smartyģ�� */
        $sms_site_info['email'] = $email;
        $sms_site_info['domain'] = $domain;

        return $sms_site_info;
    }

    /**
     * ע����ŷ���
     *
     * @access  public
     * @param   string      $email          �ʻ���Ϣ
     * @param   string      $password       ���룬δ��MD5����
     * @param   string      $domain         ����
     * @param   string      $phone          �̼�ע��ʱ�󶨵��ֻ�����
     * @return  boolean                     ע��ɹ�����true��ʧ�ܷ���false��
     */
    function register($email, $password, $domain, $phone)
    {
        /* ���ע����Ϣ */
        if (!$this->check_register_info($email, $password, $domain, $phone))
        {
            $this->errors['server_errors']['error_no'] = 1;//ע����Ϣ��Ч

            return false;
        }

        /* ��ȡAPI URL */
        $url = $this->get_url('register');
        if (!$url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }

        $params = array('email' => $email,
                        'password' => $password,
                        'domain' => $domain);
        /* ����HTTP���� */
        $response = $this->t->request($url, $params);
        $http_body = $response['body'];
        if (!$response || !$http_body)
        {
            $this->errors['server_errors']['error_no'] = 7;//HTTP��Ӧ��Ϊ��

            return false;
        }

        /* ����������API��ʱ�� */
        $this->update_sms_last_request();

        /* ����XML�ı��� */
        $xmlarr = $this->xml2array($http_body);
        if (empty($xmlarr))
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        $elems = &$xmlarr[0]['elements'];
        $count = count($elems);//���dataû����Ԫ�أ�$count����0
        if ($count === 0)
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        /* ��ȡ��Ϣ */
        $result = array();
        for ($i = 0; $i < $count; $i++)
        {
            $node_name = trim($elems[$i]['name']);
            switch ($node_name)
            {
                case 'user_name' :
                    $result['user_name'] = $elems[$i]['text'];
                    break;
                case 'password' :
                    $result['password'] = $elems[$i]['text'];
                    break;
                case 'auth_str' :
                    $result['auth_str'] = @$elems[$i]['text'];
                    break;
                case 'sms_num' :
                    $result['sms_num'] = @$elems[$i]['text'];
                    break;
                case 'error' :
                    $this->errors['api_errors']['error_no'] = @$elems[$i]['elements'][0]['text'];
                    break;
//                default :
//                    $this->errors['server_errors']['error_no'] = 9;//��Ч�Ľڵ�����
//
//                    return false;
            }
        }

        /* ���API������ */
        if (intval($this->errors['api_errors']['error_no']) !== 0)
        {
            return false;
        }

        $my_info = array('sms_user_name' => $result['user_name'],
                        'sms_password' => $result['password'],
                        'sms_auth_str' => $result['auth_str'],
                        'sms_domain' => $domain,
                        'sms_count' => 0,
                        'sms_total_money' => 0,
                        'sms_balance' => 0,
                        'sms_last_request' => gmtime());

        /* �洢�����ط���Ϣ */
        if (!$this->store_my_info($my_info))
        {
            $this->errors['server_errors']['error_no'] = 10;//�洢ʧ��

            return false;
        }

        return true;
    }

    /**
     * ���´洢�����ط���Ϣ
     *
     * @access  public
     * @param   string      $username       �û���
     * @param   string      $password       ���룬�Ѿ���MD5����
     * @return  boolean                     ���´洢�ɹ�����true��ʧ�ܷ���false��
     */
    function restore($username,  $password)
    {
        /* ������÷���ʱ�û���Ϣ�ĺϷ��� */
        if (!$this->check_enable_info($username, $password))
        {
            $this->errors['server_errors']['error_no'] = 2;//������Ϣ��Ч

            return false;
        }

        /* ��ȡAPI URL */
        $url = $this->get_url('auth');
        if (!$url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }

        $params = array('username' => $username,
                        'password' => $password);

        /* ����HTTP���� */
        $response = $this->t->request($url, $params);
        $http_body = $response['body'];
        if (!$response || !$http_body)
        {
            $this->errors['server_errors']['error_no'] = 7;//HTTP��Ӧ��Ϊ��

            return false;
        }

        /* ������������ʱ�� */
        $this->update_sms_last_request();

        /* ����XML�ı��� */
        $xmlarr = $this->xml2array($http_body);
        if (empty($xmlarr))
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        $elems = &$xmlarr[0]['elements'];
        $count = count($elems);
        if ($count === 0)
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        /* ��ȡ��Ϣ */
        $result = array();
        for ($i = 0; $i < $count; $i++)
        {
            $node_name = trim($elems[$i]['name']);
            switch ($node_name)
            {
                case 'user_name' :
                    $result['user_name'] = $elems[$i]['text'];
                    break;
                case 'password' :
                    $result['password'] = $elems[$i]['text'];
                    break;
                case 'auth_str' :
                    $result['auth_str'] = @$elems[$i]['text'];
                    break;
                case 'domain' :
                    $result['domain'] = @$elems[$i]['text'];
                    break;
                case 'count' :
                    $result['count'] = empty($elems[$i]['text']) ? 0 : $elems[$i]['text'];
                    break;
                case 'total_money' :
                    $result['total_money'] = empty($elems[$i]['text']) ? 0 : $elems[$i]['text'];
                    break;
                case 'balance' :
                    $result['balance'] = empty($elems[$i]['text']) ? 0 : $elems[$i]['text'];
                    break;
                case 'error' :
                    $this->errors['api_errors']['error_no'] = @$elems[$i]['elements'][0]['text'];
                    break;
                default :
                    $this->errors['server_errors']['error_no'] = 9;//��Ч�Ľڵ�����

                    return false;
            }
        }

        /* ���API������ */
        if (intval($this->errors['api_errors']['error_no']) !== 0)
        {
            return false;
        }

        $my_info = array('sms_user_name' => $result['user_name'],
                    'sms_password' => $result['password'],
                    'sms_auth_str' => $result['auth_str'],
                    'sms_domain' => $result['domain'],
                    'sms_count' => $result['count'],
                    'sms_total_money' => $result['total_money'],
                    'sms_balance' => $result['balance'],
                    'sms_last_request' => gmtime());

        /* �洢�����ط���Ϣ */
        if (!$this->store_my_info($my_info))
        {
            $this->errors['server_errors']['error_no'] = 10;//�洢ʧ��

            return false;
        }

        return true;
    }

    /**
     * ��������ط���Ϣ
     *
     * @access  public
     * @return  boolean     ����ɹ�����true��ʧ�ܷ���false��
     */
    function clear_my_info()
    {
        $my_info = array('sms_user_name' => '',
            'sms_password' => '',
            'sms_auth_str' => '',
            'sms_domain' => '',
            'sms_count' => '',
            'sms_total_money' => '',
            'sms_balance' => '',
            'sms_last_request' => '');

        return $this->store_my_info($my_info);
    }

    /**
     * ���Ͷ���Ϣ
     *
     * @access  public
     * @param   string  $phone          Ҫ���͵���Щ���ֻ����룬��������ð�Ƕ��Ÿ���
     * @param   string  $msg            ���͵���Ϣ����
     * @param   string  $send_date      ��ʱ����ʱ��
     * @return  boolean                 ���ͳɹ�����true��ʧ�ܷ���false��
     */
    function send($phone, $msg, $send_date = '', $send_num = 1)
    {
        /* ��鷢����Ϣ�ĺϷ��� */
        if (!$this->check_send_sms($phone, $msg, $send_date))
        {
            $this->errors['server_errors']['error_no'] = 3;//���͵���Ϣ����

            return false;
        }

        /* ��ȡ�����֤��Ϣ */
        $login_info = $this->get_login_info();
        if (!$login_info)
        {
            $this->errors['server_errors']['error_no'] = 5;//��Ч�������Ϣ

            return false;
        }

        /* ��ȡAPI URL */
        $url = $this->get_url('send');

        if (!$url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }

        $version = $GLOBALS['_CFG']['ecs_version'];
        $submit_str['certi_id'] = $GLOBALS['_CFG']['certificate_id'];
        $submit_str['ac'] = md5($GLOBALS['_CFG']['certificate_id'].$GLOBALS['_CFG']['token']);
        $submit_str['version']=$version;
        
        /* ����HTTP���� */
        $response = $this->t->request($url, $submit_str);
        $result = explode('|',$response['body']);

        if($result[0] == '0')
        {
            $sms_url = $result[1];
        }
        if($result[0] == '1')
        {
            $sms_url = '';
        }
        if($result[0] == '2'){
            $sms_url = '';
        }
        if (EC_CHARSET != 'utf-8')
        {
        $send_arr =    Array(
            0 => Array(
                    0 => $phone,    //���͵��ֻ�����
                    1 => iconv('gb2312','utf-8',$msg),      //������Ϣ
                    2 => 'Now' //���͵�ʱ��
                )
        );
        }
        else
        {
            $send_arr =    Array(
            0 => Array(
                    0 => $phone,    //���͵��ֻ�����
                    1 => $msg,      //������Ϣ
                    2 => 'Now' //���͵�ʱ��
                )
        );
        }
        $send_str['certi_id'] = $GLOBALS['_CFG']['certificate_id'];
        $send_str['ex_type'] = $send_num;
        $send_str['content'] = json_encode($send_arr);
        $send_str['encoding'] = 'utf8';
        $send_str['version'] = $version;
        $send_str['ac'] = md5($send_str['certi_id'].$send_str['ex_type'].$send_str['content'].$send_str['encoding'].$GLOBALS['_CFG']['token']);
        
        if (!$sms_url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }
        
        /* ����HTTP���� */
        $response = $this->t->request($sms_url, $send_str);

        $result = explode('|' ,$response['body']);

        if($result[0] == 'true')
        {
            //���ͳɹ�
            return true;
        }
        elseif($result[0] == 'false')
        {
            //����ʧ��
            return false;
        }
        
        
    }

    /**
     * ��ȡXML��ʽ����Ϣ������ʷ��¼
     *
     * @access  public
     * @param   string  $start_date     ��ʼ����
     * @param   string  $end_date       ��������
     * @param   string  $page_size      ÿҳ��ʾ��������¼��Ĭ��Ϊ20
     * @param   string  $page           ��ʾ����ҳ��Ĭ��Ϊ1ҳ
     * @return  string or boolean       ��ѯ�ɹ�����XML��ʽ���ı�����ʧ�ܷ���false��
     */
    function get_send_history_by_xml($start_date, $end_date, $page_size = 20, $page = 1)
    {
        /* ����ѯ���� */
        if (!$this->check_history_query($start_date, $end_date, $page_size, $page))
        {
            $this->errors['server_errors']['error_no'] = 4;//��д�Ĳ�ѯ��Ϣ����

            return false;
        }

        /* ��ȡ�����֤��Ϣ */
        $login_info = $this->get_login_info();
        if (!$login_info)
        {
            $this->errors['server_errors']['error_no'] = 5;//��Ч�������Ϣ

            return false;
        }

        /* ��ȡAPI URL */
        $url = $this->get_url('send_history');
        if (!$url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }

        $params = array('login_info' => $login_info,
                        'start_date' => $start_date,
                        'end_date' => $end_date,
                        'page_size' => $page_size,
                        'page' => $page);

        /* ����HTTP���� */
        $response = $this->t->request($url, $params);
        $http_body = $response['body'];
        if (!$response || !$http_body)
        {
            $this->errors['server_errors']['error_no'] = 7;//HTTP��Ӧ��Ϊ��

            return false;
        }

        /* �����������API��ʱ�� */
        $this->update_sms_last_request();

        return $http_body;//����xml�ı���
    }

    /**
     * ��ȡ���������Ϣ������ʷ��¼
     *
     * @access  public
     * @param   string  $start_date                 ��ʼ����
     * @param   string  $end_date                   ��������
     * @param   string  $page_size                  ÿҳ��ʾ��������¼��Ĭ��Ϊ20
     * @param   string  $page                       ��ʾ����ҳ��Ĭ��Ϊ1ҳ
     * @return  1-dimensional-array or boolean      ��ѯ�ɹ�������ʷ��¼���飬ʧ�ܷ���false��
     */
    function get_send_history($start_date, $end_date, $page_size = 20, $page = 1)
    {
        /* ��ȡXML�ı��� */
        $xml = $this->get_send_history_by_xml($start_date, $end_date, $page_size, $page);
        if (!$xml)
        {
            return false;
        }

        /* ����XML�ı��� */
        $xmlarr = $this->xml2array($xml);
        if (empty($xmlarr))
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        $result = array();

        $attrs = &$xmlarr[0]['attributes'];
        $result['count'] = $attrs['count'];

        $elems = &$xmlarr[0]['elements'];
        $count = count($elems);
        if ($count === 0)
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        /* ��ȡ��Ϣ */
        $send_num = $count - 1;
        for ($i = 0; $i < $send_num; $i++)
        {
            if (empty($elems[$i]['attributes']))//����Ϊ��������
            {
                continue;
            }
            $result['send'][$i]['phone'] = $elems[$i]['attributes']['phone'];
            $result['send'][$i]['content'] = $elems[$i]['attributes']['content'];
            $result['send'][$i]['charge_num'] = $elems[$i]['attributes']['charge_num'];
            $result['send'][$i]['send_date'] = $elems[$i]['attributes']['send_date'];
            $result['send'][$i]['send_status'] = $elems[$i]['attributes']['send_status'];
        }
        $this->errors['api_errors']['error_no'] = @$elems[$send_num]['elements'][0]['text'];

        /* ���API������ */
        if (intval($this->errors['api_errors']['error_no']) !== 0)
        {
            return false;
        }

        return $result;
    }

    /**
     * ��ȡXML��ʽ�ĳ�ֵ��ʷ��¼
     *
     * @access  public
     * @param   string  $start_date     ��ʼ����
     * @param   string  $end_date       ��������
     * @param   string  $page_size      ÿҳ��ʾ��������¼��Ĭ��Ϊ20
     * @param   string  $page           ��ʾ����ҳ��Ĭ��Ϊ1ҳ
     * @return  string or boolean       ��ѯ�ɹ�����XML��ʽ���ı�����ʧ�ܷ���false��
     */
    function get_charge_history_by_xml($start_date, $end_date, $page_size = 20, $page = 1)
    {
        /* ����ѯ�����ĺϷ��� */
        if (!$this->check_history_query($start_date, $end_date, $page_size, $page))
        {
            $this->errors['server_errors']['error_no'] = 4;//��д�Ĳ�ѯ��Ϣ����

            return false;
        }

        /* ��ȡ�����֤��Ϣ */
        $login_info = $this->get_login_info();
        if (!$login_info)
        {
            $this->errors['server_errors']['error_no'] = 5;//��Ч�������Ϣ

            return false;
        }

        $params = array('login_info' => $login_info,
                        'start_date' => $start_date,
                        'end_date' => $end_date,
                        'page_size' => $page_size,
                        'page' => $page);

        /* ��ȡAPI URL */
        $url = $this->get_url('charge_history');
        if (!$url)
        {
            $this->errors['server_errors']['error_no'] = 6;//URL����

            return false;
        }

        /* ����HTTP���� */
        $response = $this->t->request($url, $params);
        $http_body = $response['body'];
        if (!$response || !$http_body)
        {
            $this->errors['server_errors']['error_no'] = 7;//HTTP��Ӧ��Ϊ��

            return false;
        }

        /* �����������API��ʱ�� */
        $this->update_sms_last_request();

        return $http_body;//����xml�ı���
    }

    /**
     * ��ȡ������ĳ�ֵ��ʷ��¼
     *
     * @access  public
     * @param   string  $start_date                 ��ʼ����
     * @param   string  $end_date                   ��������
     * @param   string  $page_size                  ÿҳ��ʾ��������¼��Ĭ��Ϊ20
     * @param   string  $page                       ��ʾ����ҳ��Ĭ��Ϊ1ҳ
     * @return  1-dimensional-array or boolean      ��ѯ�ɹ�������ʷ��¼���飬ʧ�ܷ���false��
     */
    function get_charge_history($start_date, $end_date, $page_size, $page)
    {
        /* ��ȡXML�ı��� */
        $xml = $this->get_charge_history_by_xml($start_date, $end_date, $page_size, $page);
        if (!$xml)
        {
            return false;
        }

        /* ����XML�ı��� */
        $xmlarr = $this->xml2array($xml);
        if (empty($xmlarr))
        {
            $this->errors['server_errors']['error_no'] = 8;//��Ч��XML�ļ�

            return false;
        }

        $result = array();

        $attrs = &$xmlarr[0]['attributes'];
        $result['count'] = $attrs['count'];

        $elems = &$xmlarr[0]['elements'];
        $count = count($elems);
        $charge_num = $count - 1;//�����ǰN-1��Ԫ�ش�ų�ֵ��¼�����һ��Ԫ�ش�Ŵ�����Ϣ
        /* ��ȡ��Ϣ */
        for ($i = 0; $i < $charge_num; $i++)
        {
            if (empty($elems[$i]['attributes']))
            {
                continue;
            }
            $result['charge'][$i]['order_id'] = $elems[$i]['attributes']['order_id'];
            $result['charge'][$i]['money'] = $elems[$i]['attributes']['money'];
            $result['charge'][$i]['log_date'] = $elems[$i]['attributes']['log_date'];
        }

        $this->errors['api_errors']['error_no'] = @$elems[$charge_num]['elements'][0]['text'];

        if (intval($this->errors['api_errors']['error_no']) !== 0)
        {
            return false;
        }

        return $result;
    }

    /**
     * ����û�ע����Ϣ�Ƿ�Ϸ�
     *
     * @access  private
     * @param   string      $email          ���䣬�䵱�����û����û���
     * @param   string      $password       ����
     * @param   string      $domain         ��������
     * @param   string      $phone          �̼Ұ󶨵��ֻ�����
     * @return  boolean                     ���ע����Ϣ��ʽ�Ϸ�����true�����򷵻�false��
     */
    function check_register_info($email, $password, $domain, $phone)
    {
        /*
         * Զ��API������Ӧ�Ĺ��˴����������һֵΪ�գ�API��ֱ���˳���
         * �ⲻ�������ǽ�һ������
         * ��˴˴�����򵥵��ж�������ֵ�Ƿ�Ϊ�ա�
         * ���·����漰��Զ��API������Ӧ�����ʩ�Ĵ��룬һ��ֻ���м򵥵��пռ�⡣
         */
        if (empty($email) || empty($password) || empty($domain))
        {
            return false;
        }

        if (!empty($phone))
        {
            if (preg_match('/^\d+$/', $phone))
            {
                $sql = 'UPDATE ' . $this->ecs->table('shop_config') . "
                        SET `value` = '$phone'
                        WHERE `code` =  'sms_shop_mobile'";
                $this->db->query($sql);
            }
            else
            {
                return false;
            }
        }

        return true;
    }

    /**
     * �洢�����ط���Ϣ
     *
     * @access  private
     * @param   1-dimensional-array     $my_info    �����ط���Ϣ����
     * @return  boolean                             �洢�ɹ�����true��ʧ�ܷ���false��
     */
    function store_my_info($my_info)
    {
        /* �β�����������飬����false */
        if (!is_array($my_info))
        {
            return false;
        }

        foreach ($my_info AS $key => $value)
        {
            $sql = 'UPDATE ' . $this->ecs->table('shop_config') . " SET `value` = '$value' WHERE `code` = '$key'";
            $result = $this->db->query($sql);

            if (empty($result))
            {
                return false;
            }
        }

        return true;
    }

    /**
     * �������ݿ��е���������¼
     *
     * @access  private
     * @return  boolean             ���³ɹ�����true��ʧ�ܷ���false��
     */
    function update_sms_last_request()
    {
        $sql = 'UPDATE ' . $this->ecs->table('shop_config') . " SET `value` = '" . gmtime() . "' WHERE `code` = 'sms_last_request'";
        $result = $this->db->query($sql);

        if (empty($result))
        {
            return false;
        }

        return true;
    }

    /**
     * ������ö��ŷ�����Ҫ����Ϣ
     *
     * @access  private
     * @param   string      $email          ����
     * @param   string      $password       ����
     * @return  boolean                     ���������Ϣ��ʽ�Ϸ��ͷ���true�����򷵻�false��
     */
    function check_enable_info($email, $password)
    {
        if (empty($email) || empty($password))
        {
            return false;
        }

        return true;
    }

    /**
     * ��ⷢ�͵Ķ���Ϣ��ʽ�Ƿ�Ϸ�
     *
     * @access  private
     * @param   string      $phone          ���͵���Щ���绰����
     * @param   string      $msg            ��Ϣ����
     * @param   string      $send_date      ��ʱ����ʱ��
     * @return  boolean                     ����Ϣ��ʽ�Ϸ�����true�����򷵻�false��
     */
    function check_send_sms($phone, $msg, $send_date)
    {
        if (empty($phone) || empty($msg))
        {
            return false;
        }

        if (!empty($send_date) && $this->check_date_format($send_date))
        {
            return false;
        }

        return true;
    }

    /**
     * ���������֤��ݵ���Ϣ
     *
     * @access  private
     * @return  string or boolean   �ɹ��������ڵ�¼���ŷ�����ʺ���Ϣ��ʧ�ܷ���false��
     */
    function get_login_info()
    {
        $sql = 'SELECT `code`, `value` FROM ' . $this->ecs->table('shop_config') . " WHERE `code` = 'sms_user_name' OR `code` = 'sms_password'";
        $result = $this->db->query($sql);

        $retval = array();
        if (!empty($result))
        {
            while ($temp_arr = $this->db->fetchRow($result))
            {
                $retval[$temp_arr['code']] = $temp_arr['value'];
            }

            return base64_encode($retval['sms_user_name'] . "\t" . $retval['sms_password']);
        }

        return false;
    }

    /**
     * ������ڲ�ѯ��ʷ��¼�����ĸ�ʽ�Ƿ�Ϸ�
     *
     * @access  private
     * @param   string      $start_date         ��ʼ���ڣ���Ϊ��
     * @param   string      $end_date           �������ڣ���Ϊ��
     * @param   string      $page_size          ÿҳ��ʾ������Ĭ��Ϊ20
     * @param   string      $page               ҳ����Ĭ��Ϊ1
     * @return  boolean                         ��ѯ������ʽ�Ϸ��ͷ���true�����򷵻�false��
     */
    function check_history_query($start_date, $end_date, $page_size =  20, $page = 1)
    {
        /* ������ڸ�ʽ */
        if (!empty($start_date) && !$this->check_date_format($start_date))
        {
            return false;
        }
        if (!empty($end_date) && !$this->check_date_format($end_date))
        {
            return false;
        }

        /* ������ֲ��� */
        if (!is_numeric($page_size) || !is_numeric($page))
        {
            return false;
        }

        return true;
    }

    /**
     * ���ڵĸ�ʽ�Ƿ����Զ��API��Ҫ��ĸ�ʽ
     *
     * @access  private
     * @param   1-dimensional-array or string       $date           ����
     * @return  boolean                                             ��ʽ�Ϸ��ͷ���true�����򷵻�false��
     */
    function check_date_format($date)
    {
        $pattern = '/\d{4}-\d{2}-\d{2}/';
        if (is_array($date))
        {
            foreach ($date AS $value)
            {
                if (!preg_match($pattern, $value))
                {
                    return false;
                }
            }
        }
        elseif (!preg_match($pattern, $date))
        {
            return false;
        }

        return true;
    }

    /**
     * ��XML��ת����PHP��������
     *
     * @access  private
     * @param   string      $xml    XML��
     * @author  www.google.com
     *
     * @return  array       PHP��������
     */
    function xml2array($xml)
    {
        $xmlary = array();

        $reels = '/<(\w+)\s*([^\/>]*)\s*(?:\/>|>(.*)<\/\s*\1\s*>)/s';
        $reattrs = '/(\w+)=(?:"|\')([^"\']*)(:?"|\')/';

        preg_match_all($reels, $xml, $elements);

        foreach ($elements[1] AS $ie => $xx)
        {
            $xmlary[$ie]['name'] = $elements[1][$ie];

            if ($attributes = trim($elements[2][$ie]))
            {
                preg_match_all($reattrs, $attributes, $att);
                foreach ($att[1] AS $ia => $xx)
                {
                    $xmlary[$ie]['attributes'][$att[1][$ia]] = $att[2][$ia];
                }
            }

            $cdend = strpos($elements[3][$ie], '<');
            if ($cdend > 0)
            {
                $xmlary[$ie]['text'] = substr($elements[3][$ie], 0, $cdend - 1);
            }

            if (preg_match($reels, $elements[3][$ie]))
            {
                $xmlary[$ie]['elements'] = $this->xml2array($elements[3][$ie]);
            }
            elseif ($elements[3][$ie])
            {
                $xmlary[$ie]['text'] = $elements[3][$ie];
            }
        }

        //����Ҳ����κ�ƥ�䣬�򷵻ؿ�����
        return $xmlary;
    }
}

?>