<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class export extends Controller {
	private $data = array();	//当前数据
	private $tpl = NULL;		//模板变量
	
	/**
	 * 构造方法
	 * */
	function export()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();
		$this->db->query("set names gbk");
		$this->data['user'] = $this->session->userdata("user_info");
		if ( $this->data['user'] == NULL ) {
			redirect("/admin/manage/index");
		}
	}
	

	/**
	 * 导出奖品列表
	 * 
	 * lilulu.wait@163.com
	 * */
	function index()
	{
		$data = $this->data;
		
		$data['no'] = $this->uri->segment(4);
		
		//页面加载文件，例如js和css
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'prize';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$this->load->model('seckill_model', 'seckill');
		//查询未发货和已发货的数量
		$data['unshipped'] = $this->seckill->get_prize( array( 'status' => 0 ) )->num_rows();
		$data['shipped'] = $this->seckill->get_prize( array( 'status' => 1 ) )->num_rows();
		$data['hongbao_nums'] = $this->seckill->get_hongbao()->num_rows();
		//准备模板
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'mylayout');
		$this->tpl = $this->mylayout;
		
		$data['event'] = $this->config->item('event');
		
		$this->tpl->view('front/admin/export',$data);
	}
	/**
	 * 下载订单
	 * 
	 * lilulu.wait@163.com
	 * */
	function download()
	{
		$name = $this->uri->segment(4);
		$filename = FCPATH.'common/csv/order_'.$name.'.csv';
		iconv("gb2312","UTF-8",$filename);
		header("Content-Type: application/force-download");
		header("Content-Disposition: attachment; filename=".basename($filename));
		readfile($filename);
	}
	
	/**
	 * 导入订单
	 * 
	 * lilulu.wait@163.com
	 * */
	function import()
	{
		$this->load->model('seckill_model', 'seckill');
		$sub_imp = $this->input->post('sub_imp');
		$import = $_FILES['import'];
		$upload_path = FCPATH."common/import/csv/";
		$aExtend = pathinfo($import["name"]);
		$extend = strtolower($aExtend["extension"]);
		$bFileName = date("YmdHis").'.'.$extend;
		if ( $extend == 'csv' ) {
			if (move_uploaded_file($import['tmp_name'], $upload_path . $bFileName)) {
				$file_handle = fopen($upload_path . $bFileName, "r");
				while (!feof($file_handle)) {
					$line[] = fgets($file_handle);
				}
				fclose($file_handle);
				foreach( $line as $key => $val ){
					$aUserInfo[]  = iconv("GBK", "UTF-8", $val);
				}
				$iUserNums = count($aUserInfo);
				$aTitleInfo = explode(",",trim($aUserInfo[0]));
				
				if( $aTitleInfo[0] == "订单编号" && $aTitleInfo[7] == "物流单号" ){
					for( $i = 1; $i < $iUserNums; $i++ ){
						$aUserRow = explode(",",$aUserInfo[$i]);
						//$content = $val['id'].",,".$val['name'].",".$val['province'].",".$val['city']." ".$val['district']." ".$val['address'].",".$val['tel'].",".$val['prize_cato'].",1,".$val['shipping_code']."\r\n";
						if(trim($aUserRow[7]) != NULL ){
							$aPrize['status'] = 1;
							$aPrize['shipping_time'] = time();
							$aPrize['shipping_code'] = trim($aUserRow[7]);
							$id = $aUserRow[0];
							$this->seckill->update_prize( $aPrize , array( 'id' => $id ) );
							$ids[] = $id;
						}
					}
					echo count($ids);
					print_r($ids);
					
					//redirect("/admin/export/index/yes");
				} else {
					//redirect("/admin/export/index/no1");
					//echo "csv匹配错误，文件格式不正确";
				}
			}
		} else {
			redirect("/admin/export/index/no2");
			//echo "文件格式不正确，只能是csv";
		}
	}
}