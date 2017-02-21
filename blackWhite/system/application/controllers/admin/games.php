<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class games extends Controller {
	private $data = array();	//��ǰ���
	private $tpl = NULL;		//ģ�����
	
	function games()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();

		$this->load->model('seckill_model', 'seckill');
		//׼��ģ��
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'mylayout');
		$this->tpl = $this->mylayout;
		$this->db->query("set names gbk");
		$this->data['user'] = $this->session->userdata("user_info");
		if ( $this->data['user'] == NULL ) {
			redirect("/admin/manage/index");
		}
	}

	function index()
	{
		
	}
	
	function rank(){
		$data = $this->data;
		$data['title'] = $this->config->item('title/admin');
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'region';
		
		$data['LoadFile']['js'][] = 'region';
		
		$sql = "select * from txzj_game_time order by game_time asc limit 1000";
		$data['agametime'] = $this->db->query($sql)->result_array();
		
		$data['which'] = 'rank';
		$this->tpl->view("front/admin/games_rank",$data);
	}
	
	function export(){
		
		$sql = "select * from txzj_game_time order by game_time asc";
		$agametime = $this->db->query($sql)->result_array();
		//pre_array($agametime);
		$content_csv = "排名,用户名,游戏时间\r\n";
		$content_csv = iconv('UTF-8','gbk', $content_csv);
		$i = 1;
		foreach( $agametime as $key => $val ){
			$content = $i.",".$val['user'].",".sprintf("%0.2f", $val['game_time'])."\r\n";
			///$content = iconv('UTF-8','gbk', $content);
			$content_csv .= $content;
			$i++;
		}
		$filename = FCPATH.'common/csv/game_time_1000.csv';
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