<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class testimony extends Controller {
	private $data = array();	//当前数据

	function testimony()
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

		$sNowUrl = parse_url(current_url());
		if( $sNowUrl['path'] == '/season/init' ) {
			return;
		}

		if ( $this->input->post('session') != NULL ) {
			// session_id($this->input->post('session'));
			$ssoid = $this->input->post('ssoid');
			// 调试信息
			$s .= $this->input->post('session') . "\n";
			$s .= $ssoid . "\n";
			$s .= $this->input->post('info') . "\n";
			$info = unserialize(base64_decode($this->input->post('info')));
			foreach($info as $k => $v) {
				$s .= "$k => $v\n";
			}
			// write_file(FCPATH.'/common/a.txt', $s);
			$this->session->set_userdata('user_info', $info);
			setcookie("ssoid", $ssoid, time() + 60*60*24*7, '/');
		}

		$ssoid = $this->input->cookie('ssoid');
		if( $_GET['wxUid'] != '' ) {
			$aUserInfo = $this->db_util->get_user( array( 'wxIdentity' => $_GET['wxUid'] ) )->row_array();
			if( $_GET['wxUid'] != "" && $aUserInfo['id'] != "" ){
				$sql = "select totalScore from UserScoreDto_wx where ssoid = '". $aUserInfo['ssoid'] ."'";
				$aUserScore = $this->db->query($sql)->row_array();
				$aUserInfo['totalScore'] = $aUserScore['totalScore'];
				$this->session->set_userdata('user_info', $aUserInfo);
			}
		}

	}

	function init()
	{
		parse_str($_SERVER['QUERY_STRING'], $_GET);
		if ( $_GET['wxUid'] != NULL ) {
			$aUserInfo = $this->db_util->get_user( array( 'wxIdentity' => $_GET['wxUid'] ) )->row_array();
			$sql = "select totalScore from UserScoreDto_wx where ssoid = '". $aUserInfo['ssoid'] ."'";
			$aUserScore = $this->db->query($sql)->row_array();
			$aUserInfo['totalScore'] = $aUserScore['totalScore'];
			$this->session->set_userdata('user_info', $aUserInfo);
			redirect('/testimony/index/');
		} else {
			echo 'error';
			exit;
		}
	}

	
	function index(){
		
		
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'ui/jquery-ui-1.8.6';
		$data['LoadFile']['css'][] = 'style';
		$data['LoadFile']['css'][] = 'testimony';
		
		$data['LoadFile']['js'][] = 'jquery/ui/jquery-ui-1.8.6';
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$data['LoadFile']['js'][] = 'jquery/jquery.scrollfollow';
		$data['LoadFile']['js'][] = 'testimony';
		$data['LoadFile']['js'][] = 'jquery/jquery.artdialog';
		$data['LoadFile']['js'][] = 'core/func';
		
		$data['aUserInfo'] = $this->session->userdata('user_info');
		
		$data['column'] = $this->uri->segment(3);
		if( $data['column'] == NULL ){
			$data['column'] = 1;
		}
		
		$aWhare = array( 'column' => $data['column'] );
		$data['aTestimonyInfo'] = $this->db_util->get_testimony( $aWhare, '', '', '', array( 'prize_count' => 'desc' ) )->result_array();
		
		$data['nav'] = 'testimony';
		$this->load->view("front/testimony/index",$data);
		
	}
	
	
	//点赞
	function save_praise(){
		$ssoid = $this->input->post('ssoid');
		$testimony_id = $this->input->post('testimony_id');
		$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $ssoid ) )->row_array();
		if( $aUserInfo['id'] != '' ){
			$sql = "select * from txzj_testimony_priseinfo where testimony_id = '". $testimony_id ."' and uid = '". $aUserInfo['id'] ."'";
			$iPrise = $this->db->query( $sql )->num_rows();
			if( $iPrise < 1 ){
				$sql = "insert into txzj_testimony_priseinfo set testimony_id = '". $testimony_id ."', uid = '". $aUserInfo['id'] ."'";
				$this->db->query($sql);
				$sql = "update txzj_testimony set prize_count = prize_count + 1 where id = '". $testimony_id ."'";
				$this->db->query($sql);
			
			
				//积分开始
				$scoreType = 2;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜 2包含getType:11
				$getType = 11;//11是赞 5是优秀评论
				$source = 3; //1是我的客户之旅，2是摄影比赛，3领导层证言
				$entityId = $testimony_id;
				$sql = "select * from GrScoreRule where getType = $getType and scoreType = $scoreType";
				$aScoreRule = $this->db->query( $sql )->row_array();
				$sql = "select * from UserScoreDto_wx where uid = '". $aUserInfo['id'] ."'";
				$aUserScoreInfo = $this->db->query($sql)->row_array();
				$interactiveScore = $aUserScoreInfo['interactiveScore'] + $aScoreRule['score'];
				$totalScore = $aUserScoreInfo['totalScore'] + $aScoreRule['score'];
				$sql = "update UserScoreDto_wx set interactiveScore = '". $interactiveScore ."', totalScore = '". $totalScore ."', ssoid = '". $aUserInfo['ssoid'] ."' where uid = '". $aUserInfo['id'] ."'";
				$this->db->query($sql);
				$createDate = date("Y-m-d H:i:s");
				$sql = "insert into UserScoreLog set createDate = '". $createDate ."', entityId = '". $entityId ."', source = '". $source ."', personalScore = '". $aScoreRule['score'] ."', type = $scoreType, uid = '". $aUserInfo['id'] ."', updateTime = '". $createDate ."'";
				$this->db->query($sql);
				//积分结束
				
				echo 1;
			} else {
				echo 2;
			}
		} else {
			echo 0;
		}
	
	}

	// $in: the input video file
	// $out_thumb: path to thumb jpg
	// $out_vid: path to transcoded mpeg?
	private function flv_convert_get_thumb($in, $out_thumb, $out_vid = "")
	{
		// get thumbnail
		$cmd = FCPATH.'/common/ffmpeg -v 0 -y -i '.$in.' -vframes 1 -ss 5 -vcodec mjpeg -f rawvideo -s 286x160 -aspect 16:9 '.$out_thumb;
		$res = shell_exec($cmd);
		// $res is the output of the command
		// transcode video
		if( $out_vid != ""){
			// $cmd = FCPATH.'/common/mencoder '.$in.' -o '.$out_vid.' -af volume=10 -aspect 16:9 -of avi -noodml -ovc x264 -x264encopts bitrate=500:level_idc=41:bframes=3:frameref=2: nopsnr: nossim: pass=1: threads=auto -oac mp3lame';
			// $res = shell_exec($cmd);
		}
	}
	
}