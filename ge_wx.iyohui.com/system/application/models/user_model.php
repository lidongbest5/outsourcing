<?php if (! defined('BASEPATH')) exit('No direct script access');
/**
 * 用户类
 *
 * 该类包括了用户的操作
 *
 *
 *
 *
 * @package		game
 * @author		nevergreen <xnevergreen@163.com>
 * @copyright	Copyright (c) 2010 - 2011, baobao.com.
 * @version		1.0
 */
// ------------------------------------------------------------------------
class user_model extends Model {

	//php 5 constructor
	function __construct() {
		parent::Model();
	}

	//php 4 constructor
	function user_model() {
		parent::Model();
	}

	/**
	 * 为写入文件创建目录
	 *
	 * @param  string $s 为文件的绝对路径
	 * @see    copyFile(), delFile(), writeStringToFile(), appendStringToFile(), delDir()
	 * @access public
	 */
	function makeWriteDir($s)
	{
		$path=$s;
		$dd=dirname($path)."/";
		$b=1;
		while ($b<=strlen($dd))
		{	$b=strpos($dd,"/",$b);
			if ($b<>"")
			{	$s1=substr($dd,0,$b);
				$b++;
				if (is_dir($s1))
				{}
				else
				{	@mkdir($s1,0777);
				}
			}
			else
			{	$b=99999;
			}
		}
	}

	/**
	 * 获得用户hash目录
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function get_path($sStr){
		$sMd5Str = md5($sStr);
		$sFirstPath = substr($sMd5Str,0,2);
		$sSecondPath = substr($sMd5Str,16,2);
		$sThirdPath = substr($sMd5Str,30,2);
		if( $sFirstPath == 'ad') {
			$sFirstPath = 'da';
		}
		if( $sSecondPath == 'ad') {
			$sSecondPath = 'da';
		}
		if( $sThirdPath == 'ad') {
			$sThirdPath = 'da';
		}
		/*
		if( $sFirstPath == 'ad' || $sSecondPath == 'ad' || $sThirdPath == 'ad' ) {
			echo $sFirstPath.'/'.$sSecondPath.'/'.$sThirdPath;
			get_path($sStr);
		}
		*/
		return $sFirstPath.'/'.$sSecondPath.'/'.$sThirdPath;
	}

	function create_path($sStr){
		if (!is_dir($sStr)) $this->makeWriteDir($sStr.'/aa');
	}

	/**
	 * 创建用户目录
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_user_path( $id, $path = NULL ) {
		$user_path = $path.'/'.$this->get_path($id).'/'.$id;
		if (!is_dir($user_path)) $this->makeWriteDir($user_path.'/aa');
	}

	/**
	 * 获得用户目录
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function get_user_path( $id, $path = NULL ) {
		$user_path = $path.'/'.$this->get_path($id).'/'.$id;
		return $user_path;
	}

	/**
	 * 创建用户xml
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_user_xml($id, $path = NULL, $data = NULL){
		if($data == NULL || $path == NULL) return;

		$user_xml_path = $this->get_user_path($id, FCPATH.'common/flash');
		$user_domain_path = $this->get_user_path($id, base_url().'common/flash');
		if( $data['mode'] < 2 ){
			$configXml = $user_xml_path.'/config.xml';
		} else {
			$configXml = $user_xml_path.'/config1.xml';
		}

		$oXml = new DOMDocument('1.0', 'UTF-8');
		$oXml->formatOutput = true;
		$root = $oXml->createElement( "erabillow.com" );

		$oXml->appendChild( $root );

		if( $data['mode'] < 2 ){
			$mode = $oXml->createAttribute('mode');
			$mode_value = $oXml->createTextNode($data['mode']);
			$mode->appendChild($mode_value);
			$root->appendChild($mode);
		}

		//用户是否过期,如果为空值，就置为1，过期检测由后台perl脚本完成
		/*
		$is_expire = @file_get_contents($user_xml_path."/status.txt");
		if( $is_expire == '' ) {
			@file_put_contents($user_xml_path."/status.txt", 1);
		}

		$mode = $oXml->createAttribute('user_pass');
		$mode_value = $oXml->createTextNode($user_domain_path."/status.txt");
		$mode->appendChild($mode_value);
		$root -> appendChild($mode);
		*/

		$oXml->appendChild( $root );
		foreach($data['items'] as $k=>$v) {
			$r = $root->appendChild($oXml->createElement( "PetsHouse" ));
			while( list ($key, $val) = each ($v) ) {
				if(!is_array($val)) {
					$temp = $oXml->createAttribute( $key );
					$temp_value = $oXml->createTextNode( $val );
					$temp->appendChild($temp_value);
					$r->appendChild($temp);
					//$author = $r->appendChild($oXml->createElement( $key ));
					//$author->appendChild($oXml->createTextNode($val));
				}
		 	}
		}

		$oXml->save($configXml);
	}

	/**
	 * 创建用户文件文件列表
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_download_list($uid){
		$this->load->model('sobao_model', 'db_util');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/photo');
		$aPicList = $this->db_util->get_item( array('member_id' => $uid, 'is_download' => '0') )->result_array();
		if($aPicList!=NULL){
			$fp = fopen(FCPATH."/common/".$uid, "w");
			foreach($aPicList as $k=>$v){
				$sPicFilePath = $this->get_path($v['pic_name']);
				$sFilePath = $sUserPath.'/'.$sPicFilePath;
				$this->create_path($sFilePath);
				if($v['is_download']==0) fwrite($fp, $v['pic_path'].','.$sFilePath.'/,'.$v['pic_name']."\n");
			}
			fclose($fp);
			copy(FCPATH."/common/".$uid, FCPATH."/common/perl/userfile/".$uid);
			unlink(FCPATH."/common/".$uid);
		}
	}

	/**
	 * 创建用户商品信息文件，以供后台更新用户宝贝使用
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_taobao_item_list($uid){
		$this->load->model('sobao_model', 'db_util');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/photo');
		$aUserInfo = $this->db_util->get_member( array('id' => $uid) )->row_array();
		$aPicList = $this->db_util->get_item( array('member_id' => $uid, 'is_download' => '0') )->result_array();

		//获取广告链接
		$sLink = "NULL";
		$aGroupInfo = $this->gamebao->get_group( array('member_id'=>$uid, 'is_use' => '1') )->row_array();
		if( !empty( $aGroupInfo['insert_link'] ) ) {
			$sLink = $aGroupInfo['insert_link'];
		}

		if($aPicList!=NULL){
			$fp = fopen(FCPATH."/common/".$uid, "w");
			foreach($aPicList as $k=>$v){
				if($v['is_add']==0) fwrite($fp, $aUserInfo['session_key'].','.$aUserInfo['nick'].','.$uid.',desc,'.$v['num_iid'].",no,$sLink\n");
			}
			fclose($fp);
			copy(FCPATH."/common/".$uid, FCPATH."/common/perl/user_ad_file/".$uid);
			unlink(FCPATH."/common/".$uid);
		}
	}

	/**
	 * 创建获取用户所有信息文件
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_get_all_list($uid){
		$this->load->model('sobao_model', 'db_util');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/photo');
		$aUserInfo = $this->db_util->get_member( array('id' => $uid) )->row_array();
		if($aUserInfo!=NULL){
			$fp = fopen(FCPATH."/common/".$uid."_getall", "w");
			fwrite($fp, $aUserInfo['session_key'].','.$aUserInfo['nick'].','.$uid.",no\n");
			fclose($fp);
			copy(FCPATH."/common/".$uid."_getall", FCPATH."/common/perl/user_getall/".$uid);
			unlink(FCPATH."/common/".$uid."_getall");
		}

	}

	/**
	 * 创建宝贝信息列表，为后台查询交易状态使用
	 *
	 * @author  nevergreen <xnevergreen@163.com>
	 */
	function create_user_trade_info($uid){
		$this->load->model('gamebao_model', 'gamebao');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/photo');
		$aUserInfo = $this->gamebao->get_member( array('id' => $uid) )->row_array();
		$aGroupInfo = $this->gamebao->get_group( array('member_id' => $uid) )->row_array();
		$aScoreList = $this->gamebao->get_score( array('group_id' => $aGroupInfo['id'], 'has_buy' => '0'), '', '', array( array( 'type' => 'in', 'content' => explode(',', $aGroupInfo['items_id']) ) ) )->result_array();
		$aItemList = $this->gamebao->get_item( '', array( array( 'type' => 'in', 'content' => explode(',', $aGroupInfo['items_id']) ) ) )->result_array();
		if($aItemList!=NULL){
			$fp = fopen(FCPATH."/common/".$uid, "w");
			foreach($aItemList as $k=>$v){
				fwrite($fp, $aUserInfo['session_key'].','.$aUserInfo['nick'].','.$uid.','.$v['num_iid']."\n");
			}
			fclose($fp);
			copy(FCPATH."/common/".$uid, FCPATH."/common/perl/user_get_trade_info/".$uid);
			unlink(FCPATH."/common/".$uid);
		}
	}

	/**
	 *
	 * 获取用户所有宝贝
	 * @param unknown_type $uid
	 * @param array $data
	 */
	function create_get_all($uid, $data)
	{
		$fp = fopen(FCPATH."common/perl/scan/get_all_".$uid, "w");



		fwrite($fp, $data['time']."\n");
		fwrite($fp, $data['session_key']."\n");
		fwrite($fp, $data['items_id']."\n");
		fwrite($fp, $data['no_items_id']."\n");
		fclose($fp);
		copy(FCPATH."common/perl/scan/get_all_".$uid, FCPATH."common/perl/scan/user_get_all/".$uid);
		unlink(FCPATH."/common/perl/scan/get_all_".$uid);
	}
	
	
	/**
	 *
	 * 创建旺旺版数据库
	 * @param integer $uid
	 */
	function create_wanwang_db($uid)
	{
		$sUserPath = $this->get_user_path($uid, FCPATH . 'common/wangwang');
		$this->create_user_path($uid, FCPATH . 'common/wangwang');
		if ( !file_exists($sUserPath . '/wangwang.db') ) {
			$sUserPath . '/wangwang.db';
			//创建旺旺版库
			$db = new PDO("sqlite:" . $sUserPath . '/wangwang.db'); //打开wangwang.db数据库，如果不存在则尝试创建。
			$db->query("CREATE TABLE [group] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [group_id] INTEGER NOT NULL, [name] VARCHAR(100) NOT NULL, [type] VARCHAR(10), [activity_type] VARCHAR(10), [items_id] TEXT, [no_items_id] TEXT, [detail] TEXT NOT NULL, [start_date] VARCHAR(10), [start_time] VARCHAR(8), [end_date] VARCHAR(10), [end_time] VARCHAR(8));"); //创建group表
			$db->query("CREATE TABLE [item] ( [id] INTEGER NOT NULL, [num_iid] INT, [item] VARCHAR(100), [pic_url] VARCHAR(300), [volume] INT, CONSTRAINT [sqlite_autoindex_item_1] PRIMARY KEY ([id]));"); //创建item表
			$db->query("CREATE TABLE [item_group] ([group_id] INTEGER NOT NULL PRIMARY KEY REFERENCES [group]([group_id]) ON DELETE CASCADE, [num_iid] INTEGER NOT NULL);"); //创建item_group表
			$db->query("CREATE TABLE [order] ([id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,   [buyer_nick] VARCHAR(60) NOT NULL, [num_iid] INTEGER NOT NULL, [count] VARCHAR(10), [price] VARCHAR(20), [ordertime] TIMESTAMP);"); //创建order表
			$db->query("CREATE TABLE [item_discount] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [num_iid] INTEGER, [group_id] INTEGER, [start_time] INTEGER, [end_time] INTEGER, [price] FLOAT, [discount] FLOAT, [discount_price] FLOAT);"); //商品折扣信息表item_discount      REFERENCES [group]([group_id]) ON DELETE CASCADE
			$db->query("CREATE TABLE [item_related] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [current_num_iid] INTEGER, [associate_num_iid] INTEGER, [volume] INTEGER, [start_time] INTEGER, [end_time] INTEGER);"); //商品关联搜索表
		}
		if ( !file_exists($sUserPath . '/my_wangwang.db') ) {
			//创建旺旺版库
			$db = new PDO("sqlite:" . $sUserPath . '/my_wangwang.db'); //打开my_wangwang.db数据库，如果不存在则尝试创建。
			$db->query("CREATE TABLE [item_related] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [current_num_iid] INTEGER, [associate_num_iid] INTEGER, [volume] INTEGER, [start_time] INTEGER, [end_time] INTEGER);"); //商品关联搜索表
		
		}
	}

	/*
	 * 
	 * 
	 * */
	function create_crm_db($uid)
	{
		$sUserPath = $this->get_user_path($uid, FCPATH . 'common/crm');
		$this->create_user_path($uid, FCPATH . 'common/crm');
		if ( !file_exists($sUserPath . '/crm.db') ) {
			//创建crm数据库
			$db = new PDO("sqlite:" . $sUserPath . '/crm.db'); //打开wangwang.db数据库，如果不存在则尝试创建。
			$db->query("CREATE TABLE [crm_group] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [name] VARCHAR(200), [types] TINYINT(2) , [buyer_num] INT, [activity_id] TEXT);"); //创建group表
			$db->query("CREATE TABLE [crm_vip] ( [id] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [user_id] INT, [nick] VARCHAR(200), [level] INT, [trade_total] FLOAT(10,2) , [trade_time] INT ,[trade_average] FLOAT(10,2) ,[last_trade] INT , [source] TINYINT(2) , [crm_group] TEXT);"); //创建item表
		}
	}
	
	/**
	 *
	 * 创建供脚本扫描使用的用户优惠信息文件
	 * @param integer $uid
	 * @param array $data
	 * @param boolean $bIsClear 是否清除yes为清除no为添加
	 * @param boolean $bIsNow	是否马上执行yes为马上执行
	 */
	function create_promotion($uid, $data, $bIsClear = 'no', $bIsNow = 'no', $iAutoTime = '0')
	{
		date_default_timezone_set('Asia/Shanghai');
		$this->load->helper('date');
		$date = DateAdd('d', -1, strtotime($data['time'] . ' 23:59:59'));

		$data['promotion'] = str_replace('+', '#', $data['promotion']);

		$data['items_id'] = str_replace('all,', '', $data['items_id']);

		$fp = fopen(FCPATH."common/perl/scan/".$uid, "w");
		if ( $data['type'] == 1 ) {
			//使用ump
			if( $bIsClear == 'yes' || $bIsNow == 'yes' ) {
				fwrite($fp, time() ."\n");
			} else {
				fwrite($fp, $date ."\n");
			}
		} else {
			if( $bIsClear == 'yes' || $bIsNow == 'yes' ) {
				fwrite($fp, time() ."\n");
			} else {
				$date = DateAdd('n', -15, strtotime($data['start_time']));
				fwrite($fp, $date ."\n");
			}
		}
		fwrite($fp, $data['group_id'] ."\n");
		fwrite($fp, $data['session_key']."\n");
		fwrite($fp, $data['items_id']."\n");
		fwrite($fp, $data['no_items_id']."\n");
		fwrite($fp, $data['promotion']."\n");
		if( $bIsNow == 'yes' ) {
			if ( $iAutoTime != 0 ) {
				fwrite($fp, $data['start_time'] ."\n");
			} else {
				fwrite($fp, date('Y-m-d H:i:s')."\n");
			}
		} else {
			fwrite($fp, $data['start_time']."\n");
		}
		fwrite($fp, $data['end_time']."\n");
		if( $bIsClear == 'yes' ) {
			fwrite($fp, "delete\n");
		} else {
			fwrite($fp, "add\n");
		}
		fwrite($fp, $data['promotion_type']."\n");
		fwrite($fp, urlencode($data['name']) . "\n");
		fwrite($fp, urlencode($data['desc']) . "\n");
		fwrite($fp, $data['is_channel'] . "\n\n"); //是否绑定渠道
		
		fclose($fp);
		switch( $data['type'] ) {
			case 1:
				//ump方式
				$path = 'promotion';
				break;
				
			case 2:
				//定向优惠方式
				$path = 'regular';
				break;
		}
		//echo FCPATH."common/perl/scan/user_" . $path . "/".$uid."_".$data['group_id'];exit;
		copy(FCPATH."common/perl/scan/".$uid, FCPATH."common/perl/scan/user_" . $path . "/".$uid."_".$data['group_id']);
		unlink(FCPATH."/common/perl/scan/".$uid);
	}

	/**
	 *
	 * 创建供脚本扫描使用的宝贝主图信息文件
	 * @param integer $uid
	 */
	function create_item_tag($uid, $group_id, $bClearTag = 'no', $bClearDesc = 'no', $bCreateEnd = 'no', $bIsClearAll = 'no')
	{
		date_default_timezone_set('Asia/Shanghai');
		$this->load->model('promotion_model', 'db_util');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/perl/scan/user_download');
		$aUserInfo = $this->db_util->get_member( array('id' => $uid) )->row_array();
		$aGroupInfo = $this->db_util->get_group( array('id' => $group_id) )->row_array();
		$aContent = unserialize(base64_decode($aGroupInfo['tag_content']));
		
		$sOprTagAdd = $bClearTag;
		$sOprTagDelete = "yes";
		$sOprDescAdd = $sOprPromotionAdd = $sOprBillAdd = $bClearDesc;
		$sOprDescDelete = $sOprPromotionDelete = $sOprBillDelete = "yes";
		
		//水印相关
		if ( $bClearTag == "yes" ) {
			if ( $aGroupInfo['tag_id'] == 0 || $aGroupInfo['tag_id'] == NULL ) {
				$sOprTagAdd = "noop";
				$sOprTagDelete = "noop";
			} else {
				if ( $aGroupInfo['tag_color'] == NULL || $aGroupInfo['tag_content'] == NULL ) {
					$sOprTagAdd = "noop";
					$sOprTagDelete = "noop";
				}
			}
		} else {
			if ( $aGroupInfo['tag_id'] == 0 || $aGroupInfo['tag_id'] == NULL ) {
				$sOprTagAdd = "noop";
				$sOprTagDelete = "noop";
			} else {
				if ( $aGroupInfo['tag_color'] == NULL || $aGroupInfo['tag_content'] == NULL ) {
					$sOprTagAdd = "noop";
					$sOprTagDelete = "noop";
				}
			}
		}
		
		//描述相关
		if ( $bClearDesc == "yes" ) {
			//描述相关
			//样式id为空，并且没选择过商品
			if ( $aGroupInfo['detail_style_id'] == 0 || $aGroupInfo['detail_style_id'] == NULL ) {
				$sOprDescAdd = "noop";
				$sOprDescDelete = "noop";
			} else {
				if ( $aGroupInfo['detail_style_items_id'] == NULL ) {
					$sOprDescAdd = "noop";
					$sOprDescDelete = "noop";
				}
			}
			
			//优惠相关
			if ( $aGroupInfo['show_info'] == 1 ) {
				$sOprPromotionAdd = "noop";
				$sOprPromotionDelete = "noop";
			}
			
			//海报相关
			if ( $aGroupInfo['show_bill'] == 1 ) {
				$sOprBillAdd = "noop";
				$sOprBillDelete = "noop";
			}
			
		} else {
			//添加操作时，检测是否有空操作
			
			//描述相关
			//样式id为空，并且没选择过商品
			if ( $aGroupInfo['detail_style_id'] == 0 || $aGroupInfo['detail_style_id'] == NULL ) {
				$sOprDescAdd = "noop";
				$sOprDescDelete = "noop";
			} else {
				if ( $aGroupInfo['detail_style_items_id'] == NULL ) {
					$sOprDescAdd = "noop";
					$sOprDescDelete = "noop";
				}
			}
			
			//优惠相关
			if ( $aGroupInfo['show_info'] == 1 ) {
				$sOprPromotionAdd = "noop";
				$sOprPromotionDelete = "noop";
			}
			
			//海报相关
			if ( $aGroupInfo['show_bill'] == 1 ) {
				$sOprBillAdd = "noop";
				$sOprBillDelete = "noop";
			}
		}
		/*
		echo 'pic tag:' . $sOprTagAdd . ' - spread:' . $sOprDescAdd . ' - promotion: ' . $sOprPromotionAdd . ' - bill: ' . $sOprBillAdd . '<br />';
		echo 'pic tag:' . $sOprTagDelete . ' - spread:' . $sOprDescDelete . ' - promotion: ' . $sOprPromotionDelete . ' - bill: ' . $sOprBillDelete . '<br />';
		//exit;
		//*/

		$aGroupInfo['items_id'] = str_replace('all,', '', $aGroupInfo['items_id']);

		$fp = fopen(FCPATH."common/".$uid, "w");
		if( $bClearTag == 'yes' ) {
			fwrite($fp, $aGroupInfo['items_id']."\n");				//参加活动的宝贝
			fwrite($fp, "\n");										//排除的商品id
		} else {
			fwrite($fp, $aGroupInfo['items_id']."\n");				//参加活动的宝贝
			fwrite($fp, $aGroupInfo['no_items_id']."\n");			//排除的商品id
		}
		fwrite($fp, $uid."\n");										//用户id
		fwrite($fp, $aUserInfo['session_key']."\n");				//淘宝session
		fwrite($fp, $aGroupInfo['tag_id']."\n");					//使用哪个样式水印
		fwrite($fp, $aGroupInfo['tag_color'].".png\n");				//使用哪个文件水印
		fwrite($fp, $aContent[0]."\n");								//第一行内容
		fwrite($fp, $aContent[1]."\n");								//第二行内容
		fwrite($fp, $aGroupInfo['class_cid']."\n");					//卖家自定义分类id
		fwrite($fp, $sOprTagAdd."\n");								//是否清除主图标签信息
		fwrite($fp, $aGroupInfo['detail_item_desc_pos']."\n");		//添加到描述页的促销信息的位置
		fwrite($fp, $aGroupInfo['detail_style_items_type']."\n");	//添加描述到全店还是参加活动的宝贝中
		//fwrite($fp, $aGroupInfo['detail_style_items_id']."\n");	//要添加到宝贝描述页的id
		fwrite($fp, $sOprDescAdd."\n");								//是否清除描述页推广信息
		fwrite($fp, $bIsClearAll."\n");								//是否去除所有信息
		fwrite($fp, $group_id."\n");								//活动id
		fwrite($fp, $sOprPromotionAdd."\n");							//是否清除优惠信息
		fwrite($fp, $sOprBillAdd."\n\n");								//是否清除海报信息
		fclose($fp);
		copy(FCPATH."common/".$uid, FCPATH."common/perl/scan/user_download/".$uid."_".$group_id);
		unlink(FCPATH."common/".$uid);

		if( $bCreateEnd == "no" ) {
			$fp = fopen(FCPATH."common/end_".$uid, "w");
			fwrite($fp, strtotime($aGroupInfo['end_date']." 23:59:59") . "\n");			//参加活动的宝贝
			fwrite($fp, $aGroupInfo['items_id']."\n");					//参加活动的宝贝
			fwrite($fp, $aGroupInfo['no_items_id']."\n");				//排除的商品id
			fwrite($fp, $uid."\n");										//用户id
			fwrite($fp, $aUserInfo['session_key']."\n");				//淘宝session
			fwrite($fp, $aGroupInfo['tag_id']."\n");					//使用哪个样式水印
			fwrite($fp, $aGroupInfo['tag_color'].".png\n");				//使用哪个文件水印
			fwrite($fp, $aContent[0]."\n");								//第一行内容
			fwrite($fp, $aContent[1]."\n");								//第二行内容
			fwrite($fp, $aGroupInfo['class_cid']."\n");					//卖家自定义分类id
			fwrite($fp, $sOprTagDelete."\n");										//是否清除主图标签信息
			fwrite($fp, $aGroupInfo['detail_item_desc_pos']."\n");		//添加到描述页的促销信息的位置
			fwrite($fp, $aGroupInfo['detail_style_items_type']."\n");	//添加描述到全店还是参加活动的宝贝中
			//fwrite($fp, $aGroupInfo['detail_style_items_id']."\n");	//要添加到宝贝描述页的id
			fwrite($fp, $sOprDescDelete."\n");										//是否清除描述页推广信息
			fwrite($fp, $bIsClearAll."\n");								//是否去除所有信息
			fwrite($fp, $group_id."\n");								//活动id
			fwrite($fp, $sOprPromotionDelete."\n");										//是否清除优惠信息
			fwrite($fp, $sOprBillDelete."\n\n");										//是否清除海报信息
			fclose($fp);
			copy(FCPATH."common/end_".$uid, FCPATH."common/perl/scan/user_auto_update_end/".$uid."_".$group_id);
			unlink(FCPATH."common/end_".$uid);
		}
	}

	/**
	 *
	 * 创建供脚本扫描使用的宝贝主图信息文件
	 * @param integer $uid
	 */
	function create_item_tag_auto($uid, $group_id)
	{
		date_default_timezone_set('Asia/Shanghai');
		$this->load->model('promotion_model', 'db_util');
		$sUserPath = $this->get_user_path($uid, FCPATH.'common/perl/scan/user_auto_update_start');
		$aUserInfo = $this->db_util->get_member( array('id' => $uid) )->row_array();
		$aGroupInfo = $this->db_util->get_group( array('id' => $group_id) )->row_array();
		$aContent = unserialize(base64_decode($aGroupInfo['tag_content']));
		
		$sOprTagAdd = "no";
		$sOprTagDelete = "yes";
		$sOprDescAdd = $sOprPromotionAdd = $sOprBillAdd = "no";
		$sOprDescDelete = $sOprPromotionDelete = $sOprBillDelete = "yes";
		
		//水印相关
		if ( $aGroupInfo['tag_id'] == 0 || $aGroupInfo['tag_id'] == NULL ) {
			$sOprTagAdd = "noop";
			$sOprTagDelete = "noop";
		} else {
			if ( $aGroupInfo['tag_color'] == NULL || $aGroupInfo['tag_content'] == NULL ) {
				$sOprTagAdd = "noop";
				$sOprTagDelete = "noop";
			}
		}
		
		//描述相关
		//样式id为空，并且没选择过商品
		if ( $aGroupInfo['detail_style_id'] == 0 || $aGroupInfo['detail_style_id'] == NULL ) {
			$sOprDescAdd = "noop";
			$sOprDescDelete = "noop";
		} else {
			if ( $aGroupInfo['detail_style_items_id'] == NULL ) {
				$sOprDescAdd = "noop";
				$sOprDescDelete = "noop";
			}
		}
		
		//优惠相关
		if ( $aGroupInfo['show_info'] == 1 ) {
			$sOprPromotionAdd = "noop";
			$sOprPromotionDelete = "noop";
		}
		
		//海报相关
		if ( $aGroupInfo['show_bill'] == 1 ) {
			$sOprBillAdd = "noop";
			$sOprBillDelete = "noop";
		}
		/*
		echo 'pic tag:' . $sOprTagAdd . ' - spread:' . $sOprDescAdd . ' - promotion: ' . $sOprPromotionAdd . ' - bill: ' . $sOprBillAdd . '<br />';
		echo 'pic tag:' . $sOprTagDelete . ' - spread:' . $sOprDescDelete . ' - promotion: ' . $sOprPromotionDelete . ' - bill: ' . $sOprBillDelete . '<br />';
		//exit;
		//*/

		$aGroupInfo['items_id'] = str_replace('all,', '', $aGroupInfo['items_id']);

		$this->load->helper('date');

		$fp = fopen(FCPATH."common/start_".$uid, "w");
		fwrite($fp, DateAdd('d', -1 , strtotime($aGroupInfo['start_date'] . " 23:59:59"))."\n");		//参加活动的宝贝
		fwrite($fp, $aGroupInfo['items_id']."\n");					//参加活动的宝贝
		fwrite($fp, $aGroupInfo['no_items_id']."\n");				//排除的商品id
		fwrite($fp, $uid."\n");										//用户id
		fwrite($fp, $aUserInfo['session_key']."\n");				//淘宝session
		fwrite($fp, $aGroupInfo['tag_id']."\n");					//使用哪个样式水印
		fwrite($fp, $aGroupInfo['tag_color'].".png\n");				//使用哪个文件水印
		fwrite($fp, $aContent[0]."\n");								//第一行内容
		fwrite($fp, $aContent[1]."\n");								//第二行内容
		fwrite($fp, $aGroupInfo['class_cid']."\n");					//卖家自定义分类id
		fwrite($fp, $sOprTagAdd."\n");								//是否清除主图标签信息
		fwrite($fp, $aGroupInfo['detail_item_desc_pos']."\n");		//添加到描述页的促销信息的位置
		fwrite($fp, $aGroupInfo['detail_style_items_type']."\n");	//添加描述到全店还是参加活动的宝贝中
		//fwrite($fp, $aGroupInfo['detail_style_items_id']."\n");	//要添加到宝贝描述页的id
		fwrite($fp, $sOprDescAdd."\n");								//是否清除描述页推广信息
		fwrite($fp, "no\n");										//是否去除所有信息
		fwrite($fp, $group_id."\n");								//活动id
		fwrite($fp, $sOprPromotionAdd."\n");	//是否清除优惠信息
		fwrite($fp, $sOprBillAdd."\n\n");	//是否清除海报信息
		fclose($fp);
		copy(FCPATH."common/start_".$uid, FCPATH."common/perl/scan/user_auto_update_start/".$uid."_".$group_id);
		unlink(FCPATH."common/start_".$uid);

		$fp = fopen(FCPATH."common/end_".$uid, "w");
		fwrite($fp, strtotime($aGroupInfo['end_date']." 23:59:59") . "\n");			//参加活动的宝贝
		fwrite($fp, $aGroupInfo['items_id']."\n");					//参加活动的宝贝
		fwrite($fp, $aGroupInfo['no_items_id']."\n");				//排除的商品id
		fwrite($fp, $uid."\n");										//用户id
		fwrite($fp, $aUserInfo['session_key']."\n");				//淘宝session
		fwrite($fp, $aGroupInfo['tag_id']."\n");					//使用哪个样式水印
		fwrite($fp, $aGroupInfo['tag_color'].".png\n");				//使用哪个文件水印
		fwrite($fp, $aContent[0]."\n");								//第一行内容
		fwrite($fp, $aContent[1]."\n");								//第二行内容
		fwrite($fp, $aGroupInfo['class_cid']."\n");					//卖家自定义分类id
		fwrite($fp, $sOprTagDelete."\n");							//是否清除主图标签信息
		fwrite($fp, $aGroupInfo['detail_item_desc_pos']."\n");		//添加到描述页的促销信息的位置
		fwrite($fp, $aGroupInfo['detail_style_items_type']."\n");	//添加描述到全店还是参加活动的宝贝中
		//fwrite($fp, $aGroupInfo['detail_style_items_id']."\n");	//要添加到宝贝描述页的id
		fwrite($fp, $sOprDescDelete."\n");							//是否清除描述页推广信息
		fwrite($fp, "no\n");										//是否去除所有信息
		fwrite($fp, $group_id."\n");								//活动id
		fwrite($fp, $sOprPromotionDelete."\n");										//是否清除优惠信息
		fwrite($fp, $sOprBillDelete."\n\n");										//是否清除海报信息
		fclose($fp);
		copy(FCPATH."common/end_".$uid, FCPATH."common/perl/scan/user_auto_update_end/".$uid."_".$group_id);
		unlink(FCPATH."common/end_".$uid);
	}

	/**
	 *
	 * 查看当前用户是否可以使用本系统
	 * @param integer $uid
	 * 13:36 2011-08-09
	 */
	function checkCanUse($iMemberId, $iVersion)
	{
		$ret = true;

		$aForbiddenGroup = $this->config->item('group_check');	//需要检测的用户等级
		$aLimitGroup = $this->config->item('limit_group');	//要限制的用户级别
		if( in_array($iVersion, $aForbiddenGroup) ) { //需要检测的用户
			$this->load->model('promotion_model', 'db_util');
			$iCount = $this->db_util->get_upgrade_can_use( array( 'member_id' => $iMemberId ) )->num_rows();
			if( $iCount > 0 ) {
				$ret = true;
			} else {
				$ret = false;
				if( in_array($iVersion, $aLimitGroup) ) {
					$iPostCount = $this->db_util->get_post( array( 'member_id' => $iMemberId ) )->num_rows();
					if( $iPostCount > 0 ) {
						$ret = true;
					} else {
						$ret = false;
					}
				}
			}
		}
		return $ret;
	}
}
