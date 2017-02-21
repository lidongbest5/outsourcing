<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class awards extends Controller {
	private $data = array();	//当前数据
	private $tpl = NULL;		//模板变量
	
	function awards()
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
		
		$data['LoadFile']['js'][] = 'awards';
		
		$iPage = $this->uri->segment(4);
		if( $iPage == NULL ) $iPage = '0';
		$iPagePer = 20;
		$data['awards_info'] = $this->seckill->get_awards( $where, $like, $iPagePer, $iPage, array( 'id'=> 'desc' ) )->result_array();
		
		//分页配置信息
		$config['uri_segment'] = 4;
		$config['base_url'] = base_url()."/admin/awards/index/";
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
		$config['total_rows'] = $this->seckill->get_awards( $where, $like )->num_rows();
		$config['num_links'] = $iPagePer;
		$config['per_page'] = $iPagePer;
		$this->pagination->initialize($config);
		$data['which'] = 'awards';
		$this->tpl->view("front/admin/awards",$data);
	}
	
	/**
	 * 添加奖品
	 * xuning
	 */
	function ajax_save_awards(){
		$awards['types'] = $this->input->post('types');
		$awards['nums'] = $this->input->post('nums');
		$awards['memo'] = $this->input->post('memo');
		$awards['max_renqi'] = $this->input->post('max_renqi');
		
		$upload_path = FCPATH.'common/file/';//创建目录
		$time = time();
		$coupon = $_FILES['files'];
		$bFileName = time().strrchr($coupon["name"],".");//上传文件的名称
		$file_path = $upload_path . $bFileName;
		if (move_uploaded_file($coupon['tmp_name'], $upload_path . $bFileName)) {
			$sql = "insert into txzj_awards set types='".$awards['types']."', nums = '".$awards['nums']."', max_renqi = '". $awards['max_renqi'] ."', memo = '".$awards['memo']."'";
			$this->db->query($sql);
			$aInfo = $this->db->query("select last_insert_id() as awards_id")->row_array();
			$awards_id = $aInfo['awards_id'];
			
			$fp = fopen($upload_path . $bFileName,"r");
			$nums = 0;
			while( $line = fgets($fp) ) {
				$aCouponInfo = explode(",",trim($line));
				$coupon_code = $aCouponInfo[0];
				$password = $aCouponInfo[1];
				
				$i = 0;
				do {
					$special_id = rand(1,$awards['max_renqi']);
					$sql = "select * from txzj_gailv where special_id = '". $special_id ."'";
					$aGailvInfo = $this->db->query($sql)->row_array();
					if( $aGailvInfo['id'] == '' ){
						$sql = "insert into txzj_gailv set awards_id = '". $awards_id ."', types = '". $awards['types'] ."', special_id = '". $special_id ."', coupon_code = '". $coupon_code ."', password = '". $password ."', if_receive = 0";
						$this->db->query($sql);
						break;
					}
					$i++;
				} while($i);
				$nums++;
				if($nums >= $awards['nums'] ){
					break;
				}
			}
			fclose($fp);
			
		} else {
			echo "<br>no";exit;
		}
		redirect("/admin/awards/index");
	}
	
	/**
	 * 删除奖品
	 * xuning
	 */
	function ajax_delete_awards(){
		$id = $this->uri->segment(4);
		$this->seckill->delete_awards( array( 'id' => $id ) );
		echo 1;
	}
	
	/**
	 * 产生中奖概率
	 */
	function create_prize($sEventTime, $sType, $sPrizeCount, $GaiLv, $time_ratio)
	{
		set_time_limit(0);
		$aTimeRatio = explode(":",$time_ratio);
		$ratio_1 = explode(",",$aTimeRatio[0]);
		$ratio_2 = explode(",",$aTimeRatio[1]);
		$ratio_3 = explode(",",$aTimeRatio[2]);
		//echo $ratio_1[0].$ratio_1[1];exit;
		/* $iEventTime = $this->uri->segment(3);
		$iEventTime = empty($iEventTime) ? $sEventTime : $iEventTime;
		$iType = $this->uri->segment(4);
		$iType = empty($iType) ? $sType : $iType;		
		$iPrizeCount = $this->uri->segment(5);
		$iPrizeCount = empty($iPrizeCount) ? $sPrizeCount : $iPrizeCount;
		$sGaiLv = $this->uri->segment(6);
		$sGaiLv = empty($sGaiLv) ? $GaiLv : $sGaiLv; */
		$iEventTime = $sEventTime;
		$iType = $sType;
		$iPrizeCount = $sPrizeCount;
		$sGaiLv = $GaiLv;
		
		/* $iEventTime = '2013-01-18';
		$iType = '3';
		$iPrizeCount = 1200;
		$sGaiLv = '1:7:2'; */

		//数量比率,按早上白天晚上算
		$aGaiLv = explode(':', $sGaiLv);
		if( $iPrizeCount > 50 ){
			$iMorning = $aCount['morning'] = $iPrizeCount*($aGaiLv[0]/10);
			$iDay = $aCount['day'] = $iPrizeCount*($aGaiLv[1]/10);
			$iNight = $aCount['night'] = $iPrizeCount*($aGaiLv[2]/10);
		} else {
			$iMorning = $aCount['random'] = $iPrizeCount;
		}
		
// 		echo $iMorning . ' ' . $iDay . ' ' . $iNight . '<br />';
// 		print_r($aCount);exit;
		
		foreach($aCount as $key => $val) {
			//0点到10点 数量少点
			//10点到晚10点数量多点
			//晚上11点到12点
// 			echo $val . "<br />";
			for($i=0; $i<floor($val); $i++) {
				if ( $key == 'morning' ) {
					$iClock = str_pad(rand($ratio_1[0], $ratio_1[1]), 2, '0', STR_PAD_LEFT);
					$iMinute = str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT);
				}
				if ( $key == 'day' ) {
					$iClock = str_pad(rand($ratio_2[0], $ratio_2[1]), 2, '0', STR_PAD_LEFT);
					$iMinute = str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT);
				}
				if ( $key == 'night' ) {
					$iClock = str_pad(rand($ratio_2[0], $ratio_2[1]), 2, '0', STR_PAD_LEFT);
					$iMinute = str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT);
				}
				if ( $key == 'random' ) {
					$iClock = str_pad(rand(10, 23), 2, '0', STR_PAD_LEFT);
					$iMinute = str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT);
				}
				
				$sEventTime = $iEventTime . ' ' . $iClock . ":" . $iMinute;
 				//echo $iEventTime . '<br />';
				$iSame = $this->seckill->get_gailv(array('event_time' => $sEventTime, 'types' => $iType, 'unit' => 'minute') )->num_rows();
				$aData['types'] = $iType;
				$aData['event_time'] = $sEventTime;
				$aData['unit'] = 'minute';
				$aData['times'] = 1;
				if ( $iSame > 0 ) {
					$aSame = $this->seckill->get_gailv(array('event_time' => $sEventTime, 'types' => $iType, 'unit' => 'minute') )->row_array();
					$aData['times'] = $aSame['times'] + 1;
					$this->seckill->update_gailv($aData, array('event_time' => $sEventTime, 'types' => $iType, 'unit' => 'minute'));
				} else {
					$this->seckill->save_gailv($aData);
				}
			}
		}
	}
}