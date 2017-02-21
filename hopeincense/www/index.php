<?php

/**
 * ECSHOP ��ҳ�ļ�
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 * $Author: liuhui $
 * $Id: index.php 17063 2010-03-25 06:35:46Z liuhui $
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');

if ((DEBUG_MODE & 2) != 2)
{
    $smarty->caching = true;
}
$ua = strtolower($_SERVER['HTTP_USER_AGENT']);

$uachar = "/(nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|mobile)/i";

if(($ua == '' || preg_match($uachar, $ua))&& !strpos(strtolower($_SERVER['REQUEST_URI']),'wap'))
{
    $Loaction = 'mobile/';

    if (!empty($Loaction))
    {
        ecs_header("Location: $Loaction\n");

        exit;
    }

}
/*------------------------------------------------------ */
//-- Shopexϵͳ��ַת��
/*------------------------------------------------------ */
if (!empty($_GET['gOo']))
{
    if (!empty($_GET['gcat']))
    {
        /* ��Ʒ���ࡣ*/
        $Loaction = 'category.php?id=' . $_GET['gcat'];
    }
    elseif (!empty($_GET['acat']))
    {
        /* ���·��ࡣ*/
        $Loaction = 'article_cat.php?id=' . $_GET['acat'];
    }
    elseif (!empty($_GET['goodsid']))
    {
        /* ��Ʒ���顣*/
        $Loaction = 'goods.php?id=' . $_GET['goodsid'];
    }
    elseif (!empty($_GET['articleid']))
    {
        /* �������顣*/
        $Loaction = 'article.php?id=' . $_GET['articleid'];
    }

    if (!empty($Loaction))
    {
        ecs_header("Location: $Loaction\n");

        exit;
    }
}

//�ж��Ƿ���ajax����
$act = !empty($_GET['act']) ? $_GET['act'] : '';
if ($act == 'cat_rec')
{
    $rec_array = array(1 => 'best', 2 => 'new', 3 => 'hot');
    $rec_type = !empty($_REQUEST['rec_type']) ? intval($_REQUEST['rec_type']) : '1';
    $cat_id = !empty($_REQUEST['cid']) ? intval($_REQUEST['cid']) : '0';
    include_once('includes/cls_json.php');
    $json = new JSON;
    $result   = array('error' => 0, 'content' => '', 'type' => $rec_type, 'cat_id' => $cat_id);

    $children = get_children($cat_id);
    $smarty->assign($rec_array[$rec_type] . '_goods',      get_category_recommend_goods($rec_array[$rec_type], $children));    // �Ƽ���Ʒ
    $smarty->assign('cat_rec_sign', 1);
    $result['content'] = $smarty->fetch('library/recommend_' . $rec_array[$rec_type] . '.lbi');
    die($json->encode($result));
}

/*------------------------------------------------------ */
//-- �ж��Ƿ���ڻ��棬�����������û��棬��֮��ȡ��Ӧ����
/*------------------------------------------------------ */
/* ������ */
$cache_id = sprintf('%X', crc32($_SESSION['user_rank'] . '-' . $_CFG['lang']));

if (!$smarty->is_cached('index.dwt', $cache_id))
{
    assign_template();

   // $position = assign_ur_here();
    //$smarty->assign('page_title',      $position['title']);    // ҳ�����
   // $smarty->assign('ur_here',         $position['ur_here']);  // ��ǰλ��

    /* meta information */
   // $smarty->assign('keywords',        htmlspecialchars($_CFG['shop_keywords']));
   // $smarty->assign('description',     htmlspecialchars($_CFG['shop_desc']));
   // $smarty->assign('flash_theme',     $_CFG['flash_theme']);  // Flash�ֲ�ͼƬģ��

   // $smarty->assign('feed_url',        ($_CFG['rewrite'] == 1) ? 'feed.xml' : 'feed.php'); // RSS URL

    //$smarty->assign('categories',      get_categories_tree()); // ������
   //$smarty->assign('helps',           get_shop_help());       // �������
   // $smarty->assign('top_goods',       get_top10());           // ��������

   // $smarty->assign('best_goods',      get_recommend_goods('best'));    // �Ƽ���Ʒ
   // $smarty->assign('new_goods',       get_recommend_goods('new'));     // ������Ʒ
   // $smarty->assign('hot_goods',       get_recommend_goods('hot'));     // �ȵ�����
   // $smarty->assign('promotion_goods', get_promote_goods()); // �ؼ���Ʒ
   // $smarty->assign('brand_list',      get_brands());
   // $smarty->assign('promotion_info',  get_promotion_info()); // ����һ����̬��ʾ���д�����Ϣ�ı�ǩ��

   // $smarty->assign('invoice_list',    index_get_invoice_query());  // ������ѯ
    //$smarty->assign('new_articles',    index_get_new_articles());   // ��������
   // $smarty->assign('group_buy_goods', index_get_group_buy());      // �Ź���Ʒ
    //$smarty->assign('auction_list',    index_get_auction());        // �����
   // $smarty->assign('shop_notice',     $_CFG['shop_notice']);       // �̵깫��

    /* ��ҳ��������� 
    $smarty->assign('index_ad',     $_CFG['index_ad']);
    if ($_CFG['index_ad'] == 'cus')
    {
        $sql = 'SELECT ad_type, content, url FROM ' . $ecs->table("ad_custom") . ' WHERE ad_status = 1';
        $ad = $db->getRow($sql, true);
        $smarty->assign('ad', $ad);
    }
*/
    /* links */
   // $links = index_get_links();
   // $smarty->assign('img_links',       $links['img']);
   // $smarty->assign('txt_links',       $links['txt']);
   // $smarty->assign('data_dir',        DATA_DIR);       // ����Ŀ¼

    /* ��ҳ�Ƽ�����
    $cat_recommend_res = $db->getAll("SELECT c.cat_id, c.cat_name, cr.recommend_type FROM " . $ecs->table("cat_recommend") . " AS cr INNER JOIN " . $ecs->table("category") . " AS c ON cr.cat_id=c.cat_id");
    if (!empty($cat_recommend_res))
    {
        $cat_rec_array = array();
        foreach($cat_recommend_res as $cat_recommend_data)
        {
            $cat_rec[$cat_recommend_data['recommend_type']][] = array('cat_id' => $cat_recommend_data['cat_id'], 'cat_name' => $cat_recommend_data['cat_name']);
        }
        $smarty->assign('cat_rec', $cat_rec);
    }

    / ҳ���еĶ�̬���� */
    assign_dynamic('index'); 
}

$smarty->display('index.dwt', $cache_id);

/*------------------------------------------------------ */
//-- PRIVATE FUNCTIONS
/*------------------------------------------------------ */

/**
 * ���÷�������ѯ
 *
 * @access  private
 * @return  array
 */

/**
 * ������µ������б�
 *
 * @access  private
 * @return  array
 */

/**
 * ������µ��Ź��
 *
 * @access  private
 * @return  array
 */


/**
 * ȡ��������б�
 * @return  array
 */


/**
 * ������е���������
 *
 * @access  private
 * @return  array
 */

?>