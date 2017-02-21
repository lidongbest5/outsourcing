<?php if (! defined ( 'BASEPATH' ))	exit ( 'No direct script access' );
/**
 * @package		txzj
 * @author		xuning
 * @copyright	Copyright (c) 2010 - 2011, baobao.com.
 * @version		1.0
 */
// ------------------------------------------------------------------------
class seckill_model extends Model {
	private static $txzj_temp_prize 				= 'txzj_temp_prize'; 			//中奖临时表
	private static $txzj_prize 					= 'txzj_prize'; 				//中奖纪录表
	private static $txzj_prize_yiqian 					= 'txzj_prize_yiqian'; 				//中奖纪录表
	private static $txzj_awards 					= 'txzj_awards'; 				//奖品信息表
	
	private static $txzj_gailv 					= 'txzj_gailv'; 				//红包概率表
	
	private static $txzj_hongbao	 				= 'txzj_hongbao'; 				//用户红包中奖表
	private static $txzj_hongbao_log 				= 'txzj_hongbao_log'; 			//用户抽奖记录
	private static $txzj_hongbao_nums				= 'txzj_hongbao_nums'; 			//当前红包个数表
	private static $txzj_system_user 				= 'txzj_system_user'; 			//管理员记录表
	
	private static $txzj_prize_temp 				= 'txzj_prize_temp'; 			//临时获奖记录表
	
	
	//php 5 constructor
	function __construct() {
		parent::Model ();
	}
	
	//php 4 constructor
	function seckill_model() {
		parent::Model ();
	}
	/*---------------------------------------中奖临时表-------------------------------------------*/
	/**
	 * 查询中奖临时表
	 *
	 * @auth xuning
	 */
	function get_temp_prize($condition, $limit = NULL, $offset = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		$this->db->from ( self::$txzj_temp_prize );
		if ($limit !== NULL && $offset !== NULL) {
			$this->db->limit ( $limit, $offset );
		}
		return $this->db->get ();
	}
	/**
	 * 保存中奖临时表
	 *
	 * @auth xuning
	 */
	function save_temp_prize($data) {
		$this->db->insert ( self::$txzj_temp_prize, $data );
		return $this->db->insert_id ();
	}
	/**
	 * 清空中奖临时表
	 *
	 * @auth xuning
	 */
	function truncate_temp_prize($data, $condition) {
		return $this->db->query ( "TRUNCATE TABLE `txzj_temp_prize`" );
	}
	
	/*---------------------------------------当前红包个数表-------------------------------------------*/
	/**
	 * 查询中奖临时表
	 *
	 * @auth xuning
	 */
	function get_hongbao_nums($condition, $limit = NULL, $offset = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		$this->db->from ( self::$txzj_hongbao_nums );
		if ($limit !== NULL && $offset !== NULL) {
			$this->db->limit ( $limit, $offset );
		}
		//return $this->db->get ();
	}
	/**
	 * 保存中奖临时表
	 *
	 * @auth xuning
	 */
	function save_hongbao_nums($data) {
		$this->db->insert ( self::$txzj_hongbao_nums, $data );
		return $this->db->insert_id ();
	}
	
	/*---------------------------------------中奖纪录临时表-交换数据使用-------------------------------------------*/
	/**
	 * 查询中奖纪录表
	 *
	 * @auth xuning
	 */
	function get_prize_temp($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_prize_temp );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		echo $this->db->last_query();
		return $this->db->get ();
	}
	
	/**
	 * 保存中奖纪录表
	 *
	 * @auth xuning
	 */
	function save_prize_temp($data) {
		$this->db->insert ( self::$txzj_prize_temp, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新中奖纪录表
	 *
	 * @auth xuning
	 */
	function update_prize_temp($data, $condition) {
		return $this->db->update ( self::$txzj_prize_temp, $data, $condition );
	}
	
	/**
	 * 删除中奖纪录表
	 *
	 * @auth xuning
	 */
	function delete_prize_temp($condition) {
		return $this->db->delete ( self::$txzj_prize_temp, $condition );
	}
	
	/*---------------------------------------中奖纪录表-------------------------------------------*/
	/**
	 * 查询中奖纪录表
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
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存中奖纪录表
	 *
	 * @auth xuning
	 */
	function save_prize($data) {
		$this->db->insert ( self::$txzj_prize, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新中奖纪录表
	 *
	 * @auth xuning
	 */
	function update_prize($data, $condition) {
		return $this->db->update ( self::$txzj_prize, $data, $condition );
	}
	
	/**
	 * 删除中奖纪录表
	 *
	 * @auth xuning
	 */
	function delete_prize($condition) {
		return $this->db->delete ( self::$txzj_prize, $condition );
	}
	
	/*---------------------------------------奖项信息表-------------------------------------------*/
	/**
	 * 查询奖项信息表
	 *
	 * @auth xuning
	 */
	function get_awards($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_awards );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存奖项信息表
	 *
	 * @auth xuning
	 */
	function save_awards($data) {
		$this->db->insert ( self::$txzj_awards, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新奖项信息表
	 *
	 * @auth xuning
	 */
	function update_awards($data, $condition) {
		return $this->db->update ( self::$txzj_awards, $data, $condition );
	}
	
	/**
	 * 删除奖项信息表
	 *
	 * @auth xuning
	 */
	function delete_awards($condition) {
		return $this->db->delete ( self::$txzj_awards, $condition );
	}
	
	/*---------------------------------------红包概率表-------------------------------------------*/
	/**
	 * 查询红包概率表
	 *
	 * @auth xuning
	 */
	function get_gailv($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_gailv );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存红包概率表
	 *
	 * @auth xuning
	 */
	function save_gailv($data) {
		$this->db->insert ( self::$txzj_gailv, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新红包概率表
	 *
	 * @auth xuning
	 */
	function update_gailv($data, $condition) {
		return $this->db->update ( self::$txzj_gailv, $data, $condition );
	}
	
	/**
	 * 删除红包概率表
	 *
	 * @auth xuning
	 */
	function delete_gailv($condition) {
		return $this->db->delete ( self::$txzj_gailv, $condition );
	}
	
	/*---------------------------------------用户抽奖记录表-------------------------------------------*/
	/**
	 * 查询用户抽奖记录表
	 *
	 * @auth xuning
	 */
	function get_hongbao_log($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_hongbao_log );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存用户抽奖记录表
	 *
	 * @auth xuning
	 */
	function save_hongbao_log($data) {
		$this->db->insert ( self::$txzj_hongbao_log, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新用户抽奖记录表
	 *
	 * @auth xuning
	 */
	function update_hongbao_log($data, $condition) {
		return $this->db->update ( self::$txzj_hongbao_log, $data, $condition );
	}
	
	/**
	 * 删除用户抽奖记录表
	 *
	 * @auth xuning
	 */
	function delete_hongbao_log($condition) {
		return $this->db->delete ( self::$txzj_hongbao_log, $condition );
	}
	
	/*---------------------------------------用户中奖记录表-------------------------------------------*/
	/**
	 * 查询用户中奖记录表
	 *
	 * @auth xuning
	 */
	function get_hongbao($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition != NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_hongbao );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存用户中奖记录表
	 *
	 * @auth xuning
	 */
	function save_hongbao($data) {
		$this->db->insert ( self::$txzj_hongbao, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新用户中奖记录表
	 *
	 * @auth xuning
	 */
	function update_hongbao($data, $condition) {
		return $this->db->update ( self::$txzj_hongbao, $data, $condition );
	}
	
	/**
	 * 删除用户中奖记录表
	 *
	 * @auth xuning
	 */
	function delete_hongbao($condition) {
		return $this->db->delete ( self::$txzj_hongbao, $condition );
	}
	
	/*---------------------------------------用户中奖记录表-------------------------------------------*/
	/**
	 * 查询管理员
	 *
	 * @auth nevergreen
	 */
	function get_system_user($condition, $like = NULL, $limit = NULL, $offset = NULL, $order = NULL) {
		if ($condition !== NULL) {
			$this->db->where ( $condition );
		}
		if ($like != null) {
			$this->db->like ( $like );
		}
		$this->db->from ( self::$txzj_system_user );
		if ( $limit != NULL && $offset != NULL) {
			$this->db->limit ( $limit, $offset );
		}
		if (is_array ( $order )) {
			foreach ( $order as $k => $v ) {
				$this->db->order_by ( $k, $v );
			}
		}
		return $this->db->get ();
	}
	/**
	 * 保存管理员
	 *
	 * @auth nevergreen
	 */
	function save_system_user($data) {
		$this->db->insert ( self::$txzj_system_user, $data );
		return $this->db->insert_id ();
	}
	
	/**
	 * 更新管理员
	 *
	 * @auth nevergreen
	 */
	function update_system_user($data, $condition) {
		return $this->db->update ( self::$txzj_system_user, $data, $condition );
	}
	
	/**
	 * 删除管理员
	 *
	 * @auth nevergreen
	 */
	function delete_system_user($condition) {
		return $this->db->delete ( self::$txzj_system_user, $condition );
	}
	
		/**
	 * 保存中奖临时表
	 *
	 * @auth xuning
	 */
	function save_prize_yiqian($data) {
		$this->db->insert ( self::$txzj_prize_yiqian, $data );
		return $this->db->insert_id ();
	}
}