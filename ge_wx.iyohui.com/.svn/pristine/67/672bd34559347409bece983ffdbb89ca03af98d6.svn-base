<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class manage extends Controller {
	private $data = array();	//当前数据
	private $tpl = NULL;		//模板变量
	
	function manage()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();

		$this->load->model('seckill_model', 'seckill');
		$this->db->query("set names gbk");
		//准备模板
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'mylayout');
		$this->tpl = $this->mylayout;
	}

	function index()
	{
		/*echo "<pre>";
		print_r($_REQUEST);
		
		$_GET = $aTaobaoSessionInfo;
		$sTopParameters = $_REQUEST['top_parameters'];
		$sTopParameters = base64_decode($_REQUEST['top_parameters']);
		$sTopParameters = mb_convert_encoding($sTopParameters,'UTF-8','GBK');
		parse_str($sTopParameters,$sTopParameters);
		echo iconv("GBK","UTF-8",$sTopParameters['visitor_nick']);
		print_r($sTopParameters);*/
		
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'prize';
		$this->tpl->view("front/admin/login",$data);
	}
	
	function login()
	{
		$sUserName = trim($this->input->post("user"));
		$sPassWord = trim($this->input->post("pass"));
		
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'prize';
		
		$sql = "select * from txzj_system_user where uid = '".$sUserName."' and passwd = '". md5($sPassWord)."'";
		$aUserInfo = $this->db->query($sql)->row_array();
		if ( $aUserInfo['uid'] != NULL ) {
			$data['message'] = '';
			$data['user'] = $aUserInfo;
			$this->session->set_userdata('user_info', $aUserInfo);
			redirect("/admin/awards/index");
		} else {
			$data['message'] = '用户名或者密码错误';
		}
		$this->tpl->view("front/admin/login",$data);
	}
	
	function logout()
	{
		$this->session->unset_userdata('user_info');
		redirect('/admin/manage/index');
	}
}