<?php

/**
 * ECSHOP ��Ա���ݴ�����
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com
 * ----------------------------------------------------------------------------
 * ����һ����ѿ�Դ������������ζ���������ڲ�������ҵĿ�ĵ�ǰ���¶Գ������
 * �����޸ġ�ʹ�ú��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: vbb.php 17063 2010-03-25 06:35:46Z liuhui $
 */

if (!defined('IN_ECS'))
{
    die('Hacking attempt');
}

/* ģ��Ļ�����Ϣ */
if (isset($set_modules) && $set_modules == TRUE)
{
    $i = (isset($modules)) ? count($modules) : 0;

    /* ��Ա�������ϲ���Ĵ��������ļ�������һ�� */
    $modules[$i]['code']    = 'vbb';

    /* �����ϵĵ�������������� */
    $modules[$i]['name']    = 'vBulletin';

    /* �����ϵĵ���������İ汾 */
    $modules[$i]['version'] = '3.x';

    /* ��������� */
    $modules[$i]['author']  = 'ECSHOP R&D TEAM';

    /* ������ߵĹٷ���վ */
    $modules[$i]['website'] = 'http://www.ecshop.com';

    /* ����ĳ�ʼ��Ĭ��ֵ */
    $modules[$i]['default']['db_host'] = 'localhost';
    $modules[$i]['default']['db_user'] = 'root';
    $modules[$i]['default']['prefix'] = 'vbb_';
    $modules[$i]['default']['cookie_salt'] = 'NiGHTNiNG'; //cookie��֤�� ��inclues/fuctions.php define('COOKIE_SALT', 'NiGHTNiNG');

    return;
}

require_once(ROOT_PATH . 'includes/modules/integrates/integrate.php');
class vbb extends integrate
{
    var $cookie_salt = '';

    function __construct($cfg)
    {
        $this->vbb($cfg);
    }

    /**
     *
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function vbb($cfg)
    {
        parent::integrate($cfg);
        if ($this->error)
        {
            /* ���ݿ����ӳ��� */
            return false;
        }

        $this->cookie_salt = $cfg['cookie_salt'];
        $this->field_id = 'userid';
        $this->field_name = 'username';
        $this->field_email = 'email';
        $this->field_gender = 'NULL';
        $this->field_bday = 'birthday';
        $this->field_pass = 'password';
        $this->field_reg_date = 'joindate';
        $this->user_table = 'user';

        /* ������ݱ��Ƿ���� */
        $sql = "SHOW TABLES LIKE '" . $this->prefix . "%'";

        $exist_tables = $this->db->getCol($sql);

        if (empty($exist_tables) || (!in_array($this->prefix.$this->user_table, $exist_tables)))
        {
            $this->error = 2;
            /* ȱ�����ݱ� */
            return false;
        }
    }




    /**
     *  ������̳cookie
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function set_cookie ($username="")
    {
        parent::set_cookie($username);
        if (empty($username))
        {
            $time = time() - 3600;
            setcookie('bbuserid', '', $time, $this->cookie_path, $this->cookie_domain);
            setcookie('bbpassword', '', $time, $this->cookie_path, $this->cookie_domain);
        }
        else
        {
            if ($this->charset != 'UTF8')
            {
                $username = ecs_iconv('UTF8', $this->charset, $username);
            }
            $sql = "SELECT " . $this->field_id . " AS user_id, " . $this->field_pass . " As password ".
                   " FROM " . $this->table($this->user_table) . " WHERE " . $this->field_name . "='$username'";

            $row = $this->db->getRow($sql);

            setcookie('bbuserid', $row['user_id'], time() + 3600 * 24 * 30, $this->cookie_path, $this->cookie_domain);
            setcookie('bbpassword', md5($row['password'] . $this->cookie_salt), time() + 3600 * 24 * 30, $this->cookie_path, $this->cookie_domain);
        }
    }

    /**
     * �������û��ĺ���
     *
     * @access      public
     * @param       string      username    �û���
     * @param       string      password    ��¼����
     * @param       string      email       �ʼ���ַ
     * @param       string      bday        ����
     * @param       string      gender      �Ա�
     * @return      int         �������µ�ID
     */
    function add_user($username, $password, $email, $gender = -1, $bday = 0, $reg_date=0, $md5password='')
    {
        $result = parent::add_user($username, $password, $email, $gender, $bday, $reg_date, $md5password);

        if (!$result)
        {
            return false;
        }

        $user_title = $this->db->GetOne("SELECT title FROM " .$this->table('usertitle'). " ORDER BY minposts LIMIT 1");

        if ($this->charset != 'UTF8')
        {
            $username = ecs_iconv('UTF8', $this->charset, $username);
        }


        /* �������� */
        $salt     = addslashes($this->fetch_user_salt());

        /* �������� */
        $sql = "UPDATE " . $this->table($this->user_table) .
               " SET " . $this->field_pass . " = '" . $this->compile_password(array('type'=>PWD_SUF_SALT, 'password'=>$password, 'salt'=>$salt)) . "', ".
               " salt = '$salt', ".
               " ipaddress = '" . real_ip() . "', ".
               " usergroupid = 2, ".
               " usertitle = '$user_title' ".
               " WHERE " . $this->field_name . "='$username'";

        $this->db->query($sql);

        $sql = 'INSERT INTO '. $this->table('userfield') .' ('. $this->field_id .") " .
               " SELECT " . $this->field_id .
               " FROM " . $this->table($this->user_table) .
               " WHERE " . $this->field_name . "='$username'";
        $this->db->query($sql);

        $sql = 'INSERT INTO '. $this->table('usertextfield') .' ('. $this->field_id .") " .
               " SELECT " . $this->field_id .
               " FROM " . $this->table($this->user_table) .
               " WHERE " . $this->field_name . "='$username'";
        $this->db->query($sql);

        return true;
    }

    /**
     * ���cookie
     *
     * @access  public
     * @param
     *
     * @return void
     */
    function check_cookie ()
    {
        if (empty($_COOKIE['bbuserid']) || empty($_COOKIE['bbpassword']))
        {
            return '';
        }

        $user_id = intval($_COOKIE['bbuserid']);
        $bbpassword = addslashes_deep($_COOKIE['bbpassword']);

        $row = $this->db->getRow("SELECT " . $this->field_name . " AS user_name, " . $this->field_pass . " As password ".
                                 " FROM " . $this->table($this->user_table) . " WHERE " . $this->field_id . "='$user_id'");
        if (empty($row))
        {
            return '';
        }

        if ($bbpassword != md5($row['password'].$this->cookie_salt))
        {
            return '';
        }

        if ($this->charset != 'UTF8')
        {
            $row['user_name'] = ecs_iconv($this->charset, 'UTF8', $row['user_name']);
        }

        return $row['user_name'];

    }


    /**
     *  ���ָ���û��Ƿ���ڼ������Ƿ���ȷ
     *
     * @access  public
     * @param   string  $username   �û���
     *
     * @return  int
     */
    function check_user($username, $password = null)
    {
        if ($this->charset != 'UTF8')
        {
            $post_username = ecs_iconv('UTF8', $this->charset, $username);
        }
        else
        {
            $post_username = $username;
        }

        if ($password === null)
        {
            $sql = "SELECT " . $this->field_id .
                   " FROM " . $this->table($this->user_table).
                   " WHERE " . $this->field_name . "='" . $post_username . "'";

            return $this->db->getOne($sql);
        }
        else
        {
            $sql = "SELECT " . $this->field_id . " AS user_id, " . $this->field_pass . " AS password, salt".
                   " FROM " . $this->table($this->user_table).
                   " WHERE " . $this->field_name . "='" . $post_username . "'";
            $row = $this->db->getRow($sql);

            if (empty($row))
            {
               return 0;
            }

            if ($row['password'] != $this->compile_password(array('type'=>PWD_SUF_SALT, 'password'=>$password, 'salt'=>$row['salt'])))
            {
                return 0;
            }

            return $row['user_id'];

        }
    }

    /**
     * �����������ӵĺ���
     *
     * @access      private
     * @param       int     length        ����
     * @return      string
     */
    function fetch_user_salt($length = 3)
    {
        $salt = '';
        for ($i = 0; $i < $length; $i++)
        {
            $salt .= chr(mt_rand(32, 126));
        }

        return $salt;
    }

}