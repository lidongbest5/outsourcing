<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class region extends Controller {
	private $data = array();	//当前数据
	private $tpl = NULL;		//模板变量
	
	function region()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();

		$this->load->model('seckill_model', 'seckill');
		$this->db->query("set names gbk");
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
		$data['LoadFile']['css'][] = 'region';
		
		$data['LoadFile']['js'][] = 'region';
		
		$sql = "select * from txzj_region where parent_id = 1";
		$data['aprovince'] = $this->db->query($sql)->result_array();
		
		$data['which'] = 'region';
		$this->tpl->view("front/admin/region",$data);
	}
	
	/**
	 * 地区 三级联动
	 */
	function ajax_region(){
		$province_id = $this->uri->segment(4);
		$region_type = $this->uri->segment(5);
		$sql = "select region_id,region_name,if_post from txzj_region where parent_id = '".$province_id."'";
		$region = $this->db->query($sql)->result_array();
		array_walk_recursive($region, 'iconv_utf8');
		echo json_encode($region);
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
	
	
	
}