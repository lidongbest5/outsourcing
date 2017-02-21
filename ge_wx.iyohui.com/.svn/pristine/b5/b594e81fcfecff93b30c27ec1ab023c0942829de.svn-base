<?php if (! defined ( 'BASEPATH' ))	exit ( 'No direct script access' );
/**
 * @package		txzj
 * @author		xuning
 * @copyright	Copyright (c) 2010 - 2011, baobao.com.
 * @version		1.0
 */
// ------------------------------------------------------------------------
class db_model extends Model {
	private static $UserInfo			 		= 'UserInfo'; 					//客户表
	private static $UserScoreDto_wx			 	= 'UserScoreDto_wx'; 			//客户表
	private static $txzj_region 				= 'txzj_region'; 				//省份地区表
	private static $txzj_media 				= 'txzj_media'; 				//媒体表
	private static $txzj_season 				= 'txzj_season'; 				//每季新鲜表
	private static $txzj_prize 				= 'txzj_prize'; 				//奖品表
	private static $txzj_testimony 				= 'txzj_testimony'; 				//领导层证言
	
	//php 5 constructor
	function __construct() {
		parent::Model ();
	}
	
	//php 4 constructor
	function db_model() {
		parent::Model ();
	}
	
	/*---------------------------------------客户表-------------------------------------------*/
	/**
	 * 查询客户表
	 *
	 * @auth xuning
	 */
	function get_user($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$UserInfo );
		if ( $limit != NULL || $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存客户表
	 *
	 * @auth xuning
	 */
	function save_user($data) {
		$this->db->insert ( self::$UserInfo, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新客户表
	 *
	 * @auth xuning
	 */
	function update_user($data, $condition) {
		return $this->db->update ( self::$UserInfo, $data, $condition );
	}
	
	/**
	 * 删除客户表
	 *
	 * @auth xuning
	 */
	function delete_user($condition) {
		return $this->db->delete ( self::$UserInfo, $condition );
	}
	
	/*---------------------------------------客户表-------------------------------------------*/
	/**
	 * 查询客户表
	 *
	 * @auth xuning
	 */
	function get_user_scoreDto_wx($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$UserScoreDto_wx );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存客户表
	 *
	 * @auth xuning
	 */
	function save_user_scoreDto_wx($data) {
		$this->db->insert ( self::$UserScoreDto_wx, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新客户表
	 *
	 * @auth xuning
	 */
	function update_user_scoreDto_wx($data, $condition) {
		return $this->db->update ( self::$UserScoreDto_wx, $data, $condition );
	}
	
	/**
	 * 删除客户表
	 *
	 * @auth xuning
	 */
	function delete_user_scoreDto_wx($condition) {
		return $this->db->delete ( self::$UserScoreDto_wx, $condition );
	}
	
	/*---------------------------------------省份地区表-------------------------------------------*/
	/**
	 * 查询省份地区表
	 *
	 * @auth xuning
	 */
	function get_region($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_region );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	
	/*---------------------------------------媒体表-------------------------------------------*/
	/**
	 * 查询媒体表
	 *
	 * @auth xuning
	 */
	function get_media($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_media );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存媒体表
	 *
	 * @auth xuning
	 */
	function save_media($data) {
		$this->db->insert ( self::$txzj_media, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新媒体表
	 *
	 * @auth xuning
	 */
	function update_media($data, $condition) {
		return $this->db->update ( self::$txzj_media, $data, $condition );
	}
	
	/**
	 * 删除媒体表
	 *
	 * @auth xuning
	 */
	function delete_media($condition) {
		return $this->db->delete ( self::$txzj_media, $condition );
	}
	
	
	/*---------------------------------------每季新鲜表-------------------------------------------*/
	/**
	 * 查询每季新鲜表
	 *
	 * @auth xuning
	 */
	function get_season($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_season );
		if ( $limit != NULL || $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存每季新鲜表
	 *
	 * @auth xuning
	 */
	function save_season($data) {
		$this->db->insert ( self::$txzj_season, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新每季新鲜表
	 *
	 * @auth xuning
	 */
	function update_season($data, $condition) {
		return $this->db->update ( self::$txzj_season, $data, $condition );
	}
	
	/**
	 * 删除每季新鲜表
	 *
	 * @auth xuning
	 */
	function delete_season($condition) {
		return $this->db->delete ( self::$txzj_season, $condition );
	}
	
	/*---------------------------------------奖品表-------------------------------------------*/
	/**
	 * 查询奖品表
	 *
	 * @auth xuning
	 */
	function get_prize($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_prize );
		if ( $limit != NULL || $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存奖品表
	 *
	 * @auth xuning
	 */
	function save_prize($data) {
		$this->db->insert ( self::$txzj_prize, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新奖品表
	 *
	 * @auth xuning
	 */
	function update_prize($data, $condition) {
		return $this->db->update ( self::$txzj_prize, $data, $condition );
	}
	
	/**
	 * 删除奖品表
	 *
	 * @auth xuning
	 */
	function delete_prize($condition) {
		return $this->db->delete ( self::$txzj_prize, $condition );
	}
	
	/*---------------------------------------领导层证言表-------------------------------------------*/
	/**
	 * 查询领导层证言表
	 *
	 * @auth xuning
	 */
	function get_testimony($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_testimony );
		if ( $limit != NULL || $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		//echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存领导层证言表
	 *
	 * @auth xuning
	 */
	function save_testimony($data) {
		$this->db->insert ( self::$txzj_testimony, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新领导层证言表
	 *
	 * @auth xuning
	 */
	function update_testimony($data, $condition) {
		return $this->db->update ( self::$txzj_testimony, $data, $condition );
	}
	
	/**
	 * 删除领导层证言表
	 *
	 * @auth xuning
	 */
	function delete_testimony($condition) {
		return $this->db->delete ( self::$txzj_testimony, $condition );
	}
}