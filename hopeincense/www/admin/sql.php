<?php

/**
 * ECSHOP ��Ա��������
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ��������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã��������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: sql.php 17063 2010-03-25 06:35:46Z liuhui $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

$_POST['sql'] = !empty($_POST['sql']) ? trim($_POST['sql']) : '';

if (!$_POST['sql'])
{
    $_REQUEST['act'] = 'main';
}

/*------------------------------------------------------ */
//-- �û��ʺ��б�
/*------------------------------------------------------ */

if ($_REQUEST['act'] == 'main')
{
    admin_priv('sql_query');
    assign_query_info();
    $smarty->assign('type',    -1);
    $smarty->assign('ur_here', $_LANG['04_sql_query']);

    $smarty->display('sql.htm');
}

if ($_REQUEST['act'] == 'query')
{
    admin_priv('sql_query');
    assign_sql($_POST['sql']);
    assign_query_info();
    $smarty->assign('ur_here', $_LANG['04_sql_query']);

    $smarty->display('sql.htm');
}

/**
 *
 *
 * @access  public
 * @param
 *
 * @return void
 */
function assign_sql($sql)
{
    global $db, $smarty, $_LANG;

    $sql = stripslashes($sql);
    $smarty->assign('sql', $sql);

    /* ������ѯ�� */
    $sql = str_replace("\r", '', $sql);
    $query_items = explode(";\n", $sql);
    foreach ($query_items as $key=>$value)
    {
        if (empty($value))
        {
            unset($query_items[$key]);
        }
    }
    /* ����Ƕ�����䣬����ִ�� */
    if (count($query_items) > 1)
    {
        foreach ($query_items as $key=>$value)
        {
            if ($db->query($value, 'SILENT'))
            {
                $smarty->assign('type',  1);
            }
            else
            {
                $smarty->assign('type',  0);
                $smarty->assign('error', $db->error());
                return;
            }
        }
        return; //�˳�����
    }

    /* ����һ��sql��䴦�� */
    if (preg_match("/^(?:UPDATE|DELETE|TRUNCATE|ALTER|DROP|FLUSH|INSERT|REPLACE|SET|CREATE)\\s+/i", $sql))
    {
        if ($db->query($sql, 'SILENT'))
        {
            $smarty->assign('type',  1);
        }
        else
        {
            $smarty->assign('type',  0);
            $smarty->assign('error', $db->error());
        }
    }
    else
    {
        $data = $db->GetAll($sql);
        if ($data === false)
        {
            $smarty->assign('type',  0);
            $smarty->assign('error', $db->error());
        }
        else
        {
            $result = '';
            if (is_array($data) && isset($data[0]) === true)
            {
                $result = "<table> \n <tr>";
                $keys = array_keys($data[0]);
                for ($i = 0, $num = count($keys); $i < $num; $i++)
                {
                    $result .= "<th>" . $keys[$i] . "</th>\n";
                }
                $result .= "</tr> \n";
                foreach ($data AS $data1)
                {
                    $result .= "<tr>\n";
                    foreach ($data1 AS $value)
                    {
                        $result .= "<td>" . $value . "</td>";
                    }
                    $result .= "</tr>\n";
                }
                $result .= "</table>\n";
            }
            else
            {
                $result ="<center><h3>" . $_LANG['no_data'] . "</h3></center>";
            }

            $smarty->assign('type',   2);
            $smarty->assign('result', $result);
        }
    }
}

?>