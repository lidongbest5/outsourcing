<?php

/**
 * ECSHOP
 * ============================================================================
 * ��Ȩ���� 2005-2010 �Ϻ���������Ƽ����޹�˾������������Ȩ����
 * ��վ��ַ: http://www.ecshop.com��
 * ----------------------------------------------------------------------------
 * �ⲻ��һ�������������ֻ���ڲ�������ҵĿ�ĵ�ǰ���¶Գ����������޸ĺ�
 * ʹ�ã�������Գ���������κ���ʽ�κ�Ŀ�ĵ��ٷ�����
 * ============================================================================
 *
 * $Author: liuhui $
 * $Id: goods_export.php 17108 2010-04-15 03:47:03Z liuhui $
*/

$_LANG['user_guide'] =
        '<br/>ʹ��˵����' .
        '<ol>' .
          '<li>ʹ����������ÿ��ֻ������������������50����Ʒ��</li>' .
          '<li>����û���Ҫ����ĳ�����µ����е���Ʒ����������ѡ�����󣬲�����������ֱ��ѡ�����ݸ�ʽ�ͱ��뵼�����ɡ�</li>' .
        '</ol>';
$_LANG['export_taobao'] = '�����Ա�����֧�����ݸ�ʽ';
$_LANG['export_taobao_v43'] = '�����Ա�����V4.3֧�����ݸ�ʽ';
$_LANG['good_cat'] = '��Ʒ����';
$_LANG['select_please'] = '��ѡ��Ҫ�����ķ���';
$_LANG['select_charset'] = '��ѡ��Ҫ�����ı���';

$_LANG['goods_class'] = '������ĿID';
$_LANG['tabobao_shipping'] = '�Ա�����';
$_LANG['post_express'] = 'ƽ�ʼ۸�';
$_LANG['express'] = '��ݼ۸�';
$_LANG['ems'] = 'EMS�۸�';
$_LANG['notice_goods_class'] = '������ĿIDΪ�Ա������ID��������ȷ��������д0';

$_LANG['post_express_not_null'] = 'ƽ�ʼ۸�������0';
$_LANG['express_not_null'] = '��ݼ۸�������0';
$_LANG['ems_not_null'] = 'EMS�۸�������0';

/* �Ա� */
$_LANG['taobao']['goods_name'] = '��������';
$_LANG['taobao']['goods_class'] = '������Ŀ';
$_LANG['taobao']['shop_class'] = '������Ŀ';
$_LANG['taobao']['new_level'] = '�¾ɳ̶�';
$_LANG['taobao']['province'] = 'ʡ';
$_LANG['taobao']['city'] = '����';
$_LANG['taobao']['sell_type'] = '���۷�ʽ';
$_LANG['taobao']['shop_price'] = '�����۸�';
$_LANG['taobao']['add_price'] = '�Ӽ۷���';
$_LANG['taobao']['goods_number'] = '��������';
$_LANG['taobao']['die_day'] = '��Ч��';
$_LANG['taobao']['load_type'] = '�˷ѳе�';
$_LANG['taobao']['post_express'] = 'ƽ��';
$_LANG['taobao']['ems'] = 'EMS';
$_LANG['taobao']['express'] = '���';
$_LANG['taobao']['pay_type'] = '���ʽ';
$_LANG['taobao']['allow_alipay'] = '֧����';
$_LANG['taobao']['invoice'] = '��Ʊ';
$_LANG['taobao']['repair'] = '����';
$_LANG['taobao']['resend'] = '�Զ��ط�';
$_LANG['taobao']['is_store'] = '����ֿ�';
$_LANG['taobao']['window'] = '�����Ƽ�';
$_LANG['taobao']['add_time'] = '����ʱ��';
$_LANG['taobao']['story'] = '�������';
$_LANG['taobao']['goods_desc'] = '��������';
$_LANG['taobao']['goods_img'] = '����ͼƬ';
$_LANG['taobao']['goods_attr'] = '��������';
$_LANG['taobao']['group_buy'] = '�Ź���';
$_LANG['taobao']['group_buy_num'] = '��С�Ź�����';
$_LANG['taobao']['template'] = '�ʷ�ģ��ID';
$_LANG['taobao']['discount'] = '��Ա����';
$_LANG['taobao']['modify_time'] = '�޸�ʱ��';
$_LANG['taobao']['upload_status'] = '�ϴ�״̬';
$_LANG['taobao']['img_status'] = 'ͼƬ״̬';


$_LANG['export_paipai'] = '��������������֧�����ݸ�ʽ';
$_LANG['paipai']['id'] = 'id';
$_LANG['paipai']['tree_node_id'] = 'tree_node_id';
$_LANG['paipai']['old_tree_node_id'] = 'old_tree_node_id';
$_LANG['paipai']['title'] = 'title';
$_LANG['paipai']['id_in_web'] = 'id_in_web';
$_LANG['paipai']['auctionType'] = 'auctionType';
$_LANG['paipai']['category'] = 'category';
$_LANG['paipai']['shopCategoryId'] = 'shopCategoryId';
$_LANG['paipai']['pictURL'] = 'pictURL';
$_LANG['paipai']['quantity'] = 'quantity';
$_LANG['paipai']['duration'] = 'duration';
$_LANG['paipai']['startDate'] = 'startDate';
$_LANG['paipai']['stuffStatus'] = 'stuffStatus';
$_LANG['paipai']['price'] = 'price';
$_LANG['paipai']['increment'] = 'increment';
$_LANG['paipai']['prov'] = 'prov';
$_LANG['paipai']['city'] = 'city';
$_LANG['paipai']['shippingOption'] = 'shippingOption';
$_LANG['paipai']['ordinaryPostFee'] = 'ordinaryPostFee';
$_LANG['paipai']['fastPostFee'] = 'fastPostFee';
$_LANG['paipai']['paymentOption'] = 'paymentOption';
$_LANG['paipai']['haveInvoice'] = 'haveInvoice';
$_LANG['paipai']['haveGuarantee'] = 'haveGuarantee';
$_LANG['paipai']['secureTradeAgree'] = 'secureTradeAgree';
$_LANG['paipai']['autoRepost'] = 'autoRepost';
$_LANG['paipai']['shopWindow'] = 'shopWindow';
$_LANG['paipai']['failed_reason'] = 'failed_reason';
$_LANG['paipai']['pic_size'] = 'pic_size';
$_LANG['paipai']['pic_filename'] = 'pic_filename';
$_LANG['paipai']['pic'] = 'pic';
$_LANG['paipai']['description'] = 'description';
$_LANG['paipai']['story'] = 'story';
$_LANG['paipai']['putStore'] = 'putStore';
$_LANG['paipai']['pic_width'] = 'pic_width';
$_LANG['paipai']['pic_height'] = 'pic_height';
$_LANG['paipai']['skin'] = 'skin';
$_LANG['paipai']['prop'] = 'prop';

$_LANG['export_paipai4'] = '��������������3.0֧�����ݸ�ʽ';
$_LANG['paipai4']['id'] = 'id';
$_LANG['paipai4']['goods_name'] = '��Ʒ����';
$_LANG['paipai4']['auctionType'] = '���۷�ʽ';
$_LANG['paipai4']['category'] = '��Ʒ��Ŀ';
$_LANG['paipai4']['shopCategoryId'] = '������Ŀ';
$_LANG['paipai4']['quantity'] = '��Ʒ����';
$_LANG['paipai4']['duration'] = '��Ч��';
$_LANG['paipai4']['startDate'] = '��ʱ�ϼ�';
$_LANG['paipai4']['stuffStatus'] = '�¾ɳ̶�';
$_LANG['paipai4']['price'] = '�۸�';
$_LANG['paipai4']['increment'] = '�Ӽ۷���';
$_LANG['paipai4']['prov'] = 'ʡ';
$_LANG['paipai4']['city'] = '��';
$_LANG['paipai4']['shippingOption'] = '�˷ѳе�';
$_LANG['paipai4']['ordinaryPostFee'] = 'ƽ��';
$_LANG['paipai4']['fastPostFee'] = '���';
$_LANG['paipai4']['buyLimit'] = '��������';
$_LANG['paipai4']['paymentOption'] = '���ʽ';
$_LANG['paipai4']['haveInvoice'] = '�з�Ʊ';
$_LANG['paipai4']['haveGuarantee'] = '�б���';
$_LANG['paipai4']['secureTradeAgree'] = '֧�ֲƸ�ͨ';
$_LANG['paipai4']['autoRepost'] = '�Զ��ط�';
$_LANG['paipai4']['failed_reason'] = '����ԭ��';
$_LANG['paipai4']['pic_filename'] = 'ͼƬ';
$_LANG['paipai4']['description'] = '��Ʒ����';
$_LANG['paipai4']['shelfOption'] = '�ϼ�ѡ��';
$_LANG['paipai4']['skin'] = 'Ƥ�����';
$_LANG['paipai4']['attr'] = '����';
$_LANG['paipai4']['chengBao'] = '�ϱ�';
$_LANG['paipai4']['shopWindow'] = '����';

// �����ϴ���Ʒ���ֶ�
$_LANG['export_ecshop'] = '������ECShop���ݸ�ʽ';
$_LANG['ecshop']['goods_name'] = '��Ʒ����';
$_LANG['ecshop']['goods_sn'] = '��Ʒ����';
$_LANG['ecshop']['brand_name'] = '��ƷƷ��';   // ��Ҫת����brand_id
$_LANG['ecshop']['market_price'] = '�г��ۼ�';
$_LANG['ecshop']['shop_price'] = '�����ۼ�';
$_LANG['ecshop']['integral'] = '���ֹ�����';
$_LANG['ecshop']['original_img'] = '��Ʒԭʼͼ';
$_LANG['ecshop']['goods_img'] = '��ƷͼƬ';
$_LANG['ecshop']['goods_thumb'] = '��Ʒ����ͼ';
$_LANG['ecshop']['keywords'] = '��Ʒ�ؼ���';
$_LANG['ecshop']['goods_brief'] = '������';
$_LANG['ecshop']['goods_desc'] = '��ϸ����';
$_LANG['ecshop']['goods_weight'] = '��Ʒ������kg��';
$_LANG['ecshop']['goods_number'] = '�������';
$_LANG['ecshop']['warn_number'] = '��澯������';
$_LANG['ecshop']['is_best'] = '�Ƿ�Ʒ';
$_LANG['ecshop']['is_new'] = '�Ƿ���Ʒ';
$_LANG['ecshop']['is_hot'] = '�Ƿ�����';
$_LANG['ecshop']['is_on_sale'] = '�Ƿ��ϼ�';
$_LANG['ecshop']['is_alone_sale'] = '�ܷ���Ϊ��ͨ��Ʒ����';
$_LANG['ecshop']['is_real'] = '�Ƿ�ʵ����Ʒ';

//�Զ��嵼�����ݸ�ʽ
$_LANG['export_custom'] = '�������Զ������ݸ�ʽ';
$_LANG['custom']['goods_name'] = '��Ʒ����';
$_LANG['custom']['goods_sn'] = '��Ʒ����';
$_LANG['custom']['brand_name'] = '��ƷƷ��';
$_LANG['custom']['market_price'] = '�г��ۼ�';
$_LANG['custom']['shop_price'] = '�����ۼ�';
$_LANG['custom']['integral'] = '���ֹ�����';
$_LANG['custom']['original_img'] = '��Ʒԭʼͼ';
$_LANG['custom']['goods_img'] = '��ƷͼƬ';
$_LANG['custom']['goods_thumb'] = '��Ʒ����ͼ';
$_LANG['custom']['keywords'] = '��Ʒ�ؼ���';
$_LANG['custom']['goods_brief'] = '������';
$_LANG['custom']['goods_desc'] = '��ϸ����';
$_LANG['custom']['goods_weight'] = '��Ʒ������kg��';
$_LANG['custom']['goods_number'] = '�������';
$_LANG['custom']['warn_number'] = '��澯������';
$_LANG['custom']['is_best'] = '�Ƿ�Ʒ';
$_LANG['custom']['is_new'] = '�Ƿ���Ʒ';
$_LANG['custom']['is_hot'] = '�Ƿ�����';
$_LANG['custom']['is_on_sale'] = '�Ƿ��ϼ�';
$_LANG['custom']['is_alone_sale'] = '�ܷ���Ϊ��ͨ��Ʒ����';
$_LANG['custom']['is_real'] = '�Ƿ�ʵ����Ʒ';

$_LANG['custom_keyword'] = '�ؼ���';
$_LANG['custom_goods_cat'] = '���з���';
$_LANG['custom_goods_brand'] = '����Ʒ��';
$_LANG['custom_goods_list'] = 'ѡ����Ʒ������';
$_LANG['custom_goods_type'] = '������Ʒ����';
$_LANG['custom_export_list'] = '�����Ʒ������';
$_LANG['custom_up'] = '��';
$_LANG['custom_down'] = '��';
$_LANG['custom_goods_search'] = '��������';
$_LANG['custom_goods_field_not_null'] = '�������Ʒ�����в���Ϊ��';

// ��������
$_LANG['export_condition'] = '��Ʒ������������';
$_LANG['export_condition_search'] = '�� ��';
$_LANG['export_format'] = '���ݸ�ʽ';

?>
