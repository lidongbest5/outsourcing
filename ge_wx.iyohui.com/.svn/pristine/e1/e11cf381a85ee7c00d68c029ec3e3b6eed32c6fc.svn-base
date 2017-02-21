<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class prize extends Controller {
	private $data = array();	//当前数据
	private $tpl = NULL;		//模板变量
	
	function prize()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();

		$this->load->model('seckill_model', 'seckill');
		//准备模板
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'mylayout');
		$this->tpl = $this->mylayout;
		
		$this->data['user'] = $this->session->userdata("user_info");
		if ( $this->data['user'] == NULL ) {
			redirect("/admin/manage/index");
		}
	}

	function index()
	{
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'prize';
		$data['LoadFile']['css'][] = 'ui/jquery-ui-1.8.6';
		
		$data['LoadFile']['js'][] = 'prize';
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'jquery/ui/jquery-ui-1.8.6';
		
		$data['event'] = $this->config->item('event');
		$search = $this->session->userdata('search');
		$data['search'] = $search;
		
		$iPage = $this->uri->segment(4);
		if( $iPage == NULL ) $iPage = '0';
		$iPagePer = 20;
		if( $search['awards_types'] != '' ){
			$sq = " and awards_types = '". $search['awards_types'] ."'";
		}
		if( $search['ssoid'] != '' ){
			$sq = " and ssoid = '". $search['ssoid'] ."'";
		}
		if( $search['name'] != '' ){
			$sq = " and name = '". $search['name'] ."'";
		}
		if( $search['coupon_code'] != '' ){
			$sq = " and coupon_code = '". $search['coupon_code'] ."'";
		}
		
		$sql = "select * from txzj_prize where 1=1 ". $sq ." order by id desc";
		$sql_limit = $sql . " limit " . $iPage . "," . $iPagePer;
		$data['prize_info'] = $this->db->query($sql_limit)->result_array();
		
		
		//分页配置信息
		$config['uri_segment'] = 5;
		$config['base_url'] = base_url()."/admin/prize/index/";
		$config['full_tag_open'] = '<ul id="pagination-flickr">';
		$config['full_tag_close'] = '</ul>';
		$config['first_link'] = '首页';
		$config['prev_link'] = '前页';
		$config['next_link'] = '后页';
		$config['last_link'] = '末页';
		//自定义链接
		$config['first_tag_open'] = '<li>';
		$config['first_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li class="previous-off">';
		$config['prev_tag_close'] = '</li>';
		$config['next_tag_open'] = '<li class="next">';
		$config['next_tag_close'] = '</li>';
		$config['last_tag_open'] = '<li>';
		$config['last_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="active">';
		$config['cur_tag_close'] = '</li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['total_rows'] = $this->db->query( $sql )->num_rows();
		$config['num_links'] = $iPagePer;
		$config['per_page'] = $iPagePer;
		$this->pagination->initialize($config);
		$data['which'] = 'prize';
		$this->tpl->view("front/admin/prize",$data);
		
		
	}
	
	function delivered()
	{
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'prize';
		$data['LoadFile']['css'][] = 'ui/jquery-ui-1.8.6';
		
		$data['LoadFile']['js'][] = 'prize';
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'jquery/ui/jquery-ui-1.8.6';
		
		$search = $this->session->userdata('search');
		$data['search'] = $search;
		
		$sql = "select * from txzj_region where parent_id = 1";
		$data['aprovince'] = $this->db->query($sql)->result_array();//省份查询
		if($search['province']){
			$sql1 = "select * from txzj_region where parent_id = (select region_id from txzj_region where region_name = '". $search['province'] ."' and region_type = '1')";
			$data['acity'] = $this->db->query($sql1)->result_array();
		}
		if($search['city']){
			$sql2 = "select * from txzj_region where parent_id = (select region_id from txzj_region where region_name = '". $search['city'] ."' and region_type = '2')";
			$data['adistrict'] = $this->db->query($sql2)->result_array();
		}
		$where['shipping_status'] = 1;
		if( $search['province'] ) 	$where['province'] = $search['province'];
		if( $search['city'] ) 		$where['city'] = $search['city'];
		if( $search['district'] ) 	$where['district'] = $search['district'];
		
		if( $search['address'] ) 	$like['address'] = $search['address'];
		if( $search['tel'] ) 		$like['tel'] = $search['tel'];
		if( $search['name'] ) 		$like['name'] = $search['name'];
		if( $search['user'] ) 		$like['user'] = $search['user'];
		
		$iPage = $this->uri->segment(4);
		if( $iPage == NULL ) $iPage = '0';
		$iPagePer = 20;
		
		$data['prize_info'] = $this->seckill->get_prize( $where, $like, $iPagePer, $iPage )->result_array();
		//查询未发货和已发货的数量
		$data['unshipped'] = $this->seckill->get_prize( array( 'shipping_status' => 0 ) )->num_rows();
		$data['shipped'] = $this->seckill->get_prize( array( 'shipping_status' => 1 ) )->num_rows();
		$data['hongbao_nums'] = $this->seckill->get_hongbao()->num_rows();
		
		//分页配置信息
		$config['uri_segment'] = 4;
		$config['base_url'] = base_url()."/admin/prize/delivered/";
		$config['full_tag_open'] = '<ul id="pagination-flickr">';
		$config['full_tag_close'] = '</ul>';
		$config['first_link'] = '首页';
		$config['prev_link'] = '前页';
		$config['next_link'] = '后页';
		$config['last_link'] = '末页';
		//自定义链接
		$config['first_tag_open'] = '<li>';
		$config['first_tag_close'] = '</li>';
		$config['prev_tag_open'] = '<li class="previous-off">';
		$config['prev_tag_close'] = '</li>';
		$config['next_tag_open'] = '<li class="next">';
		$config['next_tag_close'] = '</li>';
		$config['last_tag_open'] = '<li>';
		$config['last_tag_close'] = '</li>';
		$config['cur_tag_open'] = '<li class="active">';
		$config['cur_tag_close'] = '</li>';
		$config['num_tag_open'] = '<li>';
		$config['num_tag_close'] = '</li>';
		$config['total_rows'] = $this->seckill->get_prize( $where, $like )->num_rows();
		$config['num_links'] = $iPagePer;
		$config['per_page'] = $iPagePer;
		$this->pagination->initialize($config);
		$data['which'] = 'delivered';
		$this->tpl->view("front/delivered",$data);
	}
	
	/**
	 * 地区 三级联动
	 */
	function ajax_region(){
		$province_id = $this->uri->segment(4);
		$region_type = $this->uri->segment(5);
		$sql = "select region_id,region_name,if_post from txzj_region where parent_id = '". $province_id ."'";
		$region = $this->db->query($sql)->result_array();
		array_walk_recursive($region, 'iconv_utf8');
		echo json_encode($region);
	}
	
	/**
	 * 获取获奖信息
	 * 
	 */
	function ajax_prize_info(){
		$id = $this->uri->segment(4);
		$aPrizeInfo = $this->seckill->get_prize( array( 'id' => $id ) )->row_array();
		echo json_encode($aPrizeInfo);
	}
	/**
	 * 获取信息
	 */
	function prize_info(){
		//$data['LoadFile']['js'][] = 'prize';
		$id = $this->uri->segment(4);
		$data['aPrizeInfo'] = $this->seckill->get_prize( array( 'id' => $id ) )->row_array();
		$sql = "select * from txzj_region where parent_id = 1";
		$data['aprovince'] = $this->db->query($sql)->result_array();//省份查询
		if($data['aPrizeInfo']['province']){
			$sql1 = "select * from txzj_region where parent_id = (select region_id from txzj_region where region_name = '". $data['aPrizeInfo']['province'] ."' and region_type = '1')";
			$data['acity'] = $this->db->query($sql1)->result_array();
		}
		if($data['aPrizeInfo']['city']){
			$sql2 = "select * from txzj_region where parent_id = (select region_id from txzj_region where region_name = '". $data['aPrizeInfo']['city'] ."' and region_type = '2')";
			$data['adistrict'] = $this->db->query($sql2)->result_array();
		}
		$this->load->view("front/row_user",$data);
	}
	/**
	 * 保存获奖信息
	 * 
	 */
	function ajax_save_prize(){
		$id 			= $this->input->post('id');
		if( $this->input->post('shipping_code') ) 	$aPrizeInfo['shipping_code']	= $this->input->post('shipping_code');
		if( $aPrizeInfo['shipping_code'] ) 			$aPrizeInfo['shipping_time'] 	= time();
		if( $this->input->post('memo') ) 			$aPrizeInfo['memo']				= $this->input->post('memo');
		if( $this->input->post('shipping_status') ) 			$aPrizeInfo['shipping_status']			= $this->input->post('shipping_status');
		
		//修改收货地址
		if( $this->input->post('province') ) 		$aPrizeInfo['province']			= $this->input->post('province');
		if( $this->input->post('city') ) 			$aPrizeInfo['city']				= $this->input->post('city');
		if( $this->input->post('district') ) 		$aPrizeInfo['district']			= $this->input->post('district');
		if( $this->input->post('address') ) 		$aPrizeInfo['address']			= $this->input->post('address');
		if( $this->input->post('tel') ) 			$aPrizeInfo['tel']				= $this->input->post('tel');
		if( $this->input->post('name') ) 			$aPrizeInfo['name']				= $this->input->post('name');
		if( $this->input->post('shipping_code') ) 	$aPrizeInfo['shipping_code']	= $this->input->post('shipping_code');
		$this->seckill->update_prize( $aPrizeInfo, array( 'id' => $id ));
		echo 1;
		
	}
	
	/**
	 * 撤销发货
	 * 
	 */
	function canceled(){
		$id = $this->uri->segment(4);
		$aPrizeInfo['shipping_code']	= '';
		$aPrizeInfo['shipping_time'] 	= '';
		$aPrizeInfo['memo']				= '';
		$aPrizeInfo['shipping_status']			= '0';
		$this->seckill->update_prize( $aPrizeInfo, array( 'id' => $id ) );
		echo 1;
	}
	
	
	function search(){
		$act = $this->input->post('act');
		if ( $act == "search" ){
			$search['awards_types'] = $this->input->post('awards_types');
			$search['ssoid'] = $this->input->post('ssoid');
			$search['name'] = $this->input->post('name');
			$search['coupon_code'] = $this->input->post('coupon_code');
			$this->session->set_userdata('search', $search);
			echo 1;
		}
	}
	
	function region(){
		
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'region';
		
		$data['LoadFile']['js'][] = 'region';
		
		$sql = "select * from txzj_region where parent_id = 1";
		$data['aprovince'] = $this->db->query($sql)->result_array();
		
		
		$data['which'] = 'region';
		$this->tpl->view("front/region",$data);
	}
	
	function ajax_if_post(){
		$region_id = $this->uri->segment(4);
		$sql = "select * from txzj_region where region_id = '". $region_id ."'";
		$aRowDistrict = $this->db->query($sql)->row_array();
		if( $aRowDistrict['if_post'] == 1 ){
			$sql1 = "update txzj_region set if_post = 0 where region_id = '". $region_id ."'";
		}else{
			$sql1 = "update txzj_region set if_post = 1 where region_id = '". $region_id ."'";
		}
		$this->db->query( $sql1 );
		echo json_encode($aRowDistrict);
		//$aRowDistrict['if_post'];
	}
	
	
	function export(){
	
		$where['award_types'] = 5;
		
		$prize_info = $this->seckill->get_prize( $where)->result_array();
		$content_csv = "ID,用户名,奖品,姓名,电话,省份,城市,地区,地址,中奖时间\r\n";
		//$content_csv = iconv('UTF-8','gbk', $content_csv);
		foreach( $prize_info as $key => $val ){
			$content = $val['id'].",".$val['user'].",".$val['memo'].",".$val['name'].",".$val['tel'].",".$val['province'].",".$val['city'].",".$val['district'].",".$val['address'].",".date("Y-m-d H:i",$val['add_time'])."\r\n";
			///$content = iconv('UTF-8','gbk', $content);
			$content_csv .= $content;
		}
		
		
		
		$filename = FCPATH.'common/csv/prize_5.csv';
		$fpc = fopen($filename, 'w');
		fwrite($fpc, $content_csv);
		fclose($fpc);
		$this->download($filename);
		exit;
	
	}
	
	
	/**
	 * 下载订单
	 *
	 * lilulu.wait@163.com
	 * */
	function download($filename)
	{
		iconv("gb2312","UTF-8",$filename);
		header("Content-Type: application/force-download");
		header("Content-Disposition: attachment; filename=".basename($filename));
		readfile($filename);
	}
}
