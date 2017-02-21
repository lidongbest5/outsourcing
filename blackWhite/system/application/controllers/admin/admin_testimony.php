<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin_testimony extends Controller {
	private $data = array();	//当前数据

	function admin_testimony()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();
		header ( "Cache-Control: no-store, no-cache, must-revalidate" );
		header ( "Cache-Control: post-check=0, pre-check=0", false );
		header ( "Pragma: no-cache" );
		header ( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
		header ( "Last-Modified: " . gmdate ( "D, d M Y H:i:s" ) . " GMT" );
		
		$this->load->model('db_model', 'db_util');
		$this->load->model('user_model', 'user');
		parse_str($_SERVER['QUERY_STRING'], $_GET);

		//准备模板
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'mylayout');
		$this->tpl = $this->mylayout;
	}

	function index()
	{
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'admin_customer';
		
		$data['LoadFile']['js'][] = 'jquery/jquery.artdialog';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'admin_testimony';
		$data['aUserInfo'] = $this->session->userdata('user_info');
		
		$data['column'] = $this->uri->segment(4);
		if( $data['column'] == NULL ){
			$data['column'] = 1;
		}
		
		$aWhere = array( 'column' => $data['column'] );
		
		$page = $this->uri->segment(5);
		if( $page == NULL ) $page = 0;
		$num = 20;
		$config['total_rows'] = $this->db_util->get_testimony( $aWhere, '', '', '', array( 'id' => 'desc' ) )->num_rows();
		$config['base_url'] = '/admin/admin_testimony/index/' . $data['column'] . '/';
		$config['per_page'] = $num;
		$config['first_link'] = '第一页';
		$config['last_link'] = '尾页';
		$config['uri_segment'] = 4;
		$this->pagination->initialize($config);//分页的初始化
		
		$aTestimonyInfo = $this->db_util->get_testimony( $aWhere, '', $num, $page, array( 'id' => 'desc' ) )->result_array();
		foreach( $aTestimonyInfo as $key => $val ){
			$data['aTestimonyInfo'][$key] = $val;//
		}
		
		$data['which'] = 'testimony';
		$this->tpl->view("front/admin/testimony/index",$data);
	}
	
	function save_testimony(){
		$act = $this->input->post('act');
		$id = $this->input->post('id');
		$column = $this->input->post('column');
		$title = $this->input->post('title');
		$content = $this->input->post('content');
		$aNewTestimony = array();
		$aNewTestimony['column'] = $column;
		$aNewTestimony['title'] = $title;
		$aNewTestimony['content'] = $content;
		if( $act == 'add' ){
			$aNewTestimony['addtime'] = time();
			$aNewTestimony['prize_count'] = 0;
			$this->db_util->save_testimony( $aNewTestimony );
			echo $column;
		}
		if( $act == 'update' ){
			$this->db_util->update_testimony( $aNewTestimony, array( 'id' => $id ) );
			echo $column;
		}
	}
	
	function get_testimony(){
		$id = $this->uri->segment(4);
		$aTestimonyInfo = $this->db_util->get_testimony( array( 'id' => $id ) )->row_array();
		echo json_encode($aTestimonyInfo);
	}
	function delete_testimony(){
		$id = $this->uri->segment(4);
		$this->db_util->delete_testimony( array( 'id' => $id ) );
		echo 1;
	}
}