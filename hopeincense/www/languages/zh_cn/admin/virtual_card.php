<?php

/**
 * ECSHOP ���⿨����
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ��������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã��������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: virtual_card.php 17063 2010-03-25 06:35:46Z liuhui $
*/

/*------------------------------------------------------ */
//-- ��Ƭ��Ϣ
/*------------------------------------------------------ */
$_LANG['virtual_card_list'] = '������Ʒ�б�';
$_LANG['lab_goods_name'] = '��Ʒ����';
$_LANG['replenish'] = '����';
$_LANG['lab_card_id'] = '���';
$_LANG['lab_card_sn'] = '��Ƭ���';
$_LANG['lab_card_password'] = '��Ƭ����';
$_LANG['lab_end_date'] = '����ʹ������';
$_LANG['lab_is_saled'] = '�Ƿ��ѳ���';
$_LANG['lab_order_sn'] = '������';
$_LANG['action_success'] = '�����ɹ�';
$_LANG['action_fail'] = '����ʧ��';
$_LANG['card'] = '��Ƭ�б�';

$_LANG['batch_card_add'] = '�������Ӳ���';

$_LANG['separator'] = '�ָ���';
$_LANG['uploadfile'] = '�ϴ��ļ�';
$_LANG['sql_error'] = '�� %s ����Ϣ������<br /> ';

/* ��ʾ��Ϣ */
$_LANG['replenish_no_goods_id'] = 'ȱ����ƷID�������޷����в�������';
$_LANG['replenish_no_get_goods_name'] = '��ƷID���������޷���ȡ��Ʒ��';
$_LANG['drop_card_success'] = '�ü�¼�ѳɹ�ɾ��';
$_LANG['batch_drop'] = '����ɾ��';
$_LANG['drop_card_confirm'] = '��ȷ��Ҫɾ���ü�¼��';
$_LANG['card_sn_exist'] = '��Ƭ��� %s �Ѿ����ڣ�����������';
$_LANG['go_list'] = '���ز����б�';
$_LANG['continue_add'] = '��������';
$_LANG['uploadfile_fail'] = '�ļ��ϴ�ʧ��';
$_LANG['batch_card_add_ok'] = '�ѳɹ������� %s ��������Ϣ';

$_LANG['js_languages']['no_card_sn'] = '��Ƭ��źͿ�Ƭ���벻�ܶ�Ϊ�ա�';
$_LANG['js_languages']['separator_not_null'] = '�ָ����Ų���Ϊ�ա�';
$_LANG['js_languages']['uploadfile_not_null'] = '��ѡ��Ҫ�ϴ����ļ���';

$_LANG['use_help'] = 'ʹ��˵����' .
        '<ol>' .
          '<li>�ϴ��ļ�ӦΪCSV�ļ�<br />' .
              'CSV�ļ���һ��Ϊ��Ƭ��ţ��ڶ���Ϊ��Ƭ���룻������Ϊʹ�ý������ڡ�<br />'.
              '(��EXCEL����csv�ļ���������EXCEL�а����š���Ƭ���롢�������ڵ�˳����д���ݣ���ɺ�ֱ�ӱ���Ϊcsv�ļ�����)'.
          '<li>���룬�ͽ������ڿ���Ϊ�գ��������ڸ�ʽΪ2006-11-6��2006/11/6'.
          '<li>���š���Ƭ���롢���������в�Ҫʹ������</li>' .
        '</ol>';

/*------------------------------------------------------ */
//-- �ı���ܴ�
/*------------------------------------------------------ */

$_LANG['virtual_card_change'] = '���ļ��ܴ�';
$_LANG['user_guide'] = 'ʹ��˵����' .
        '<ol>' .
          '<li>���ܴ����ڼ������⿨����Ʒ�Ŀ��ź�����ʱʹ�õ�</li>' .
          '<li>���ܴ��������ļ� data/config.php �У���Ӧ�ĳ����� AUTH_KEY</li>' .
          '<li>���Ҫ���ļ��ܴ���������ı���������ԭ���ܴ����¼��ܴ�����\'ȷ��\'��ť�󼴿�</li>' .
        '</ol>';
$_LANG['label_old_string'] = 'ԭ���ܴ�';
$_LANG['label_new_string'] = '�¼��ܴ�';

$_LANG['invalid_old_string'] = 'ԭ���ܴ�����ȷ';
$_LANG['invalid_new_string'] = '�¼��ܴ�����ȷ';
$_LANG['change_key_ok'] = '���ļ��ܴ��ɹ�';
$_LANG['same_string'] = '�¼��ܴ���ԭ���ܴ���ͬ';

$_LANG['update_log'] = '���¼�¼';
$_LANG['old_stat'] = '�ܹ��м�¼ %s ������ʹ���´����ܵļ�¼�� %s ����ʹ��ԭ�����ܣ������£��ļ�¼�� %s ����ʹ��δ֪�����ܵļ�¼�� %s ����';
$_LANG['new_stat'] = '<strong>�������</strong>������ʹ���´����ܵļ�¼�� %s ����ʹ��δ֪�����ܵļ�¼�� %s ����';
$_LANG['update_error'] = '���¹����г�����%s';
$_LANG['js_languages']['updating_info'] = '<strong>���ڸ���</strong>��ÿ�� 100 ����¼��';
$_LANG['js_languages']['updated_info'] = '<strong>�Ѹ���</strong> <span id=\"updated\">0</span> ����¼��';
?>