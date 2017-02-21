<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class season extends Controller {
	private $data = array();	//当前数据

	function season()
	{
		date_default_timezone_set('Asia/Shanghai');
		parent::Controller();
		header ( "Cache-Control: no-store, no-cache, must-revalidate" );
		header ( "Cache-Control: post-check=0, pre-check=0", false );
		header ( "Pragma: no-cache" );
		header ( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
		header ( "Last-Modified: " . gmdate ( "D, d M Y H:i:s" ) . " GMT" );
		
		parse_str($_SERVER['QUERY_STRING'], $_GET);

		$sNowUrl = parse_url(current_url());
		if( $sNowUrl['path'] == '/season/init' ) {
			return;
		}

		if ( $this->input->post('session') != NULL ) {
			// session_id($this->input->post('session'));
			$ssoid = $this->input->post('ssoid');
			$this->session->set_userdata('user_info', $info);
			setcookie("ssoid", $ssoid, time() + 60*60*24*7, '/');
		}

		$ssoid = $this->input->cookie('ssoid');

	}

	function init()
	{
		redirect('/season/index/');
	}

	function index()
	{
		//$a = '{"photos":{"page":2,"pages":3,"perpage":10,"total":"29","photo":[{"id":"14126110732","owner":"47639859@N08","secret":"e6a7b05ff9","server":"2928","farm":3,"title":"Red","ispublic":1,"isfriend":0,"isfamily":0},{"id":"13942421217","owner":"49370278@N06","secret":"844ce9386a","server":"7409","farm":8,"title":"Unblown Lily","ispublic":1,"isfriend":0,"isfamily":0},{"id":"13942396519","owner":"21682555@N03","secret":"fe7339cbdb","server":"2928","farm":3,"title":"Rose","ispublic":1,"isfriend":0,"isfamily":0},{"id":"14126086572","owner":"21682555@N03","secret":"14f2514b3d","server":"7380","farm":8,"title":"Rose","ispublic":1,"isfriend":0,"isfamily":0},{"id":"14105704526","owner":"78829282@N05","secret":"559314ce2a","server":"5347","farm":6,"title":"DSC08307","ispublic":1,"isfriend":0,"isfamily":0},{"id":"14105673816","owner":"78829282@N05","secret":"8372c47ece","server":"7410","farm":8,"title":"DSC08330","ispublic":1,"isfriend":0,"isfamily":0},{"id":"13942229148","owner":"97952058@N03","secret":"d1fa643e19","server":"7455","farm":8,"title":"Rose-Bouquet Crazy Florist","ispublic":1,"isfriend":0,"isfamily":0},{"id":"14128762395","owner":"75913733@N04","secret":"b16c743097","server":"5568","farm":6,"title":"\"Faded rose again\"","ispublic":1,"isfriend":0,"isfamily":0},{"id":"14148794213","owner":"59610656@N08","secret":"b0564b6d57","server":"2923","farm":3,"title":"Rose","ispublic":1,"isfriend":0,"isfamily":0},{"id":"13942063918","owner":"97468460@N07","secret":"18d9ca9d7a","server":"5499","farm":6,"title":"Macro Rose","ispublic":1,"isfriend":0,"isfamily":0}]},"stat":"ok"}';
		//echo "<pre>";
		//print_r(json_decode($a));
		$data = $this->data;

		$this->load->view("front/season/index",$data);
		
	}
	
	function season_info()
	{
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'style';
		$data['LoadFile']['css'][] = 'season_info';

		$data['LoadFile']['css'][] = 'top';
		
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$data['LoadFile']['js'][] = 'jquery/jquery.uploadifive.min';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'season';
		
		
		$aUserInfo = $this->session->userdata('user_info');
		
		$data['aUserInfo'] = $aUserInfo;
		
		$id = $this->uri->segment(3);
		$data['aSeasonInfo'] = $this->db_util->get_season( array( 'id' => $id ) )->row_array();
		$media = $this->db_util->get_media( array( 'relative_id' => $data['aSeasonInfo']['id'], 'type' => 3,'ssoid' => $data['aSeasonInfo']['ssoid'] ) )->row_array();
		$data['aSeasonInfo']['file_name_detail'] = $this->user->get_user_path($data['aSeasonInfo']['ssoid'], '/common/photo') .'/'. $media['file_name_detail'];
		$aUser = $this->db_util->get_user( array( 'ssoid' => $data['aSeasonInfo']['ssoid'] ) )->row_array();
		$data['aSeasonInfo']['department'] = $aUser['department'];
		
		$data['nav'] = 'season_info';
		$this->load->view("front/season/season_info",$data);
		
	}

	function get_season(){
		$types = $this->uri->segment(3);
		$id = $this->uri->segment(4);
		if( $types == 'left' ){
			$aSeason = $this->db_util->get_season( array( 'id <' =>  $id ), '', '', '', array( 'id' => 'desc' ) )->row_array();
		} else if( $types == 'right' ){
			$aSeason = $this->db_util->get_season( array( 'id >' =>  $id ) )->row_array();
		}
		if( $aSeason['id'] != '' ){
			$data['result'] = 1;
			$data['id'] = $aSeason['id'];
		} else {
			$data['result'] = 0;
		}
		echo json_encode($data);
	}

	function ajax_season(){
		parse_str($_SERVER['QUERY_STRING'], $_GET);
		$per_page = $_GET['per_page'];
		$page = ( $_GET['page'] - 1 ) * $per_page;
	
		$data['aUserInfo'] = $this->session->userdata('user_info');
	
		$type = 3;
		$aWhare = array();
		$season_query = $this->db_util->get_season( $aWhare, '', $per_page, $page, array( 'id' => 'desc' ) );
		$iSeasonNums = $season_query->num_rows();
		$aSeasonInfo = $season_query->result_array();
		
		
		
		$data['stat'] = 'no';
		if( $iSeasonNums > 0 ){
			//for( $i = 0; $i <=5; $i++){
			foreach( $aSeasonInfo as $key => $val ){
				$aSeasonInfo[$key] = $val;
				$aMedia = $this->db_util->get_media( array( 'relative_id' => $val['id'], 'type' => $type, 'ssoid' => $val['ssoid'] ) )->row_array();
				$aSeasonInfo[$key]['img'] = $this->user->get_user_path($val['ssoid'], '/common/photo') .'/'. $aMedia['file_name_small'];
				$aSeasonInfo[$key]['prizecount'] = $val['prize_count'];
				$img = $this->user->get_user_path($val['ssoid'], FCPATH . 'common/photo') .'/'. $aMedia['file_name_small'];
				list($width, $height, $imgtype, $attr) = @getimagesize($img);
				$aSeasonInfo[$key]['width'] = $width;
				$aSeasonInfo[$key]['height'] = $height;
			}
			//}
			$data['stat'] = 'ok';
		}
		$result->photos['page'] = $_GET['page'];
		$result->photos['num'] = $iSeasonNums;
		$result->photos['photo'] = $aSeasonInfo;
		echo json_encode($result);
		exit;
		//print_r ($aSeasonInfo);
		//exit;
		
		//echo "<pre>";
		//print_r($aSeasonInfo);
		echo json_encode($aSeasonInfo);
	}
	
	function rule(){
		$data = $this->data;
		
		$aUserInfo = $this->session->userdata('user_info');
		$data['aUserInfo'] = $aUserInfo;
		
		$data['nav'] = 'rule';
		$this->load->view("front/season/rule",$data);
		
	}
	
	/**
	 * 
	 * 我的上传作品
	 * 
	 */
	function my_works(){
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'style';
		$data['LoadFile']['css'][] = 'my_works';

		$data['LoadFile']['css'][] = 'top';
	
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		$data['LoadFile']['js'][] = 'jquery/jquery.uploadifive.min';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'season';
		
		$aUserInfo = $this->session->userdata('user_info');
		$data['aUserInfo'] = $aUserInfo;
		$data['aUserInfo']['img'] = $this->user->get_user_path($aUserInfo['ssoid'], '/common/photo') .'/';
		$type = 3;
		$aWhare = array( 'ssoid' => $aUserInfo['ssoid'] );
		$aSeasonInfo = $this->db_util->get_season( $aWhare, '', '', '', array( 'id' => 'desc' ) )->result_array();
		foreach( $aSeasonInfo as $key => $val ){
			$data['aSeasonInfo'][$key] = $val;
			$aMedia = $this->db_util->get_media( array( 'relative_id' => $val['id'], 'type' => $type,'ssoid' => $val['ssoid'] ) )->row_array();
			$data['aSeasonInfo'][$key]['file_name_detail'] = $data['aUserInfo']['img'].$aMedia['file_name_detail'];
		}
		$data['nav'] = 'my_works';
		$this->load->view("front/season/my_works",$data);
	}
	
	function form_works(){
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'style';
		$data['LoadFile']['css'][] = 'form_works';

		$data['LoadFile']['css'][] = 'top';
		
		$data['LoadFile']['js'][] = 'jquery/jquery.simplemodal';
		//$data['LoadFile']['js'][] = 'jquery/jquery.scrollfollow';
		$data['LoadFile']['js'][] = 'jquery/jquery.uploadifive.min';
		$data['LoadFile']['js'][] = 'core/func';
		$data['LoadFile']['js'][] = 'season';
		
		
		$aUserInfo = $this->session->userdata('user_info');
		$data['aUserInfo'] = $aUserInfo;
		$media_id = $this->uri->segment(3);
		if( is_numeric( $media_id ) == true ){
			$data['aMediaInfo'] = $this->db_util->get_media( array( 'id' => $media_id ) )->row_array();
			$data['aMediaInfo']['img'] = $this->user->get_user_path($aUserInfo['ssoid'], '/common/photo') .'/';
		}
		
		$data['nav'] = 'form_works';
		$this->load->view("front/season/form_works",$data);
	}
	
	/**
	 * 删除我的上传作品  完成
	 */
	function delete_season(){
		$aUserInfo = $this->session->userdata('user_info');
		$season_id = $this->uri->segment(3);
		$type = 3;
		$aSeasonInfo = $this->db_util->get_season( array( 'id' => $season_id ) )->row_array();
		if( $aSeasonInfo['id'] != '' && $aSeasonInfo['ssoid'] == $aUserInfo['ssoid'] ){
			//删除作品积分开始
			$scoreType = 5;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜
			$getType = 12;//10摄影比赛
			$source = 2; //1是我的客户之旅，2是摄影比赛
			$entityId = $season_id;
			$sql = "select * from UserScoreLog where uid = '". $aUserInfo['id'] ."' and source = '". $source ."' and type = '". $scoreType ."' and entityId = '" . $entityId . "'";
			$aUserScoreLogInfo = $this->db->query($sql)->result_array();
			foreach( $aUserScoreLogInfo as $key => $val ){
				$sql = "select * from UserScoreDto_wx where ssoid = '". $aUserInfo['ssoid'] ."'";
				$aUserScoreInfo = $this->db->query($sql)->row_array();
				$interactiveScore = $aUserScoreInfo['interactiveScore'] - $val['personalScore'];
				$totalScore = $aUserScoreInfo['totalScore'] - $val['personalScore'];
				if( is_numeric( $interactiveScore ) == true && is_numeric( $totalScore ) == true ){
					if( $interactiveScore < 0 ) $interactiveScore = 0;
					if( $totalScore < 0 ) $totalScore = 0;
					$sql = "update UserScoreDto_wx set interactiveScore = '". $interactiveScore ."', totalScore = '". $totalScore ."' where ssoid = '". $aUserInfo['ssoid'] ."'";
					$this->db->query($sql);
					$sql = "delete from UserScoreLog where id = '". $val['id'] ."'";
					$this->db->query($sql);
				}
			}
			//积分结束
		
			//删除上传文件
			$aWhere = array( 'relative_id' => $aSeasonInfo['id'], 'type' => $type );
			$aMediaInfo = $this->db_util->get_media( $aWhere )->result_array();
			foreach( $aMediaInfo as $m_key => $m_val ){
				$iSsoId = $m_val['ssoid'];
				$upload_path = $this->user->get_user_path($iSsoId, FCPATH.'common/photo');
				@unlink($upload_path .'/'. $m_val['file_name']);
				@unlink($upload_path .'/'. $m_val['file_name_small']);
				@unlink($upload_path .'/'. $m_val['file_name_detail']);
				$this->db_util->delete_media( array( 'id' => $m_val['id'] ) );
			}
		
			$this->db_util->delete_season( array( 'id' => $aSeasonInfo['id'] ) );
			echo 1;
		} else {
			echo 0;
		}
		
	}
	/**
	 * 删除上传图片文件    完成
	 */
	function delete_photo(){
		$id = $this->uri->segment(3);
		$aRet['status'] = '0';
		if ( $id == NULL ) {
			return false;
		}
		$aWhare = array( 'id' => $id );
		$aMediaInfo = $this->db_util->get_media( $aWhare )->row_array();
		$iSsoId = $aMediaInfo['ssoid'];
		$upload_path = $this->user->get_user_path($iSsoId, FCPATH.'common/photo');
		$bDelete = @unlink($upload_path .'/'. $aMediaInfo['file_name']);
		@unlink($upload_path .'/'. $aMediaInfo['file_name_small']);
		@unlink($upload_path .'/'. $aMediaInfo['file_name_detail']);
		if ( $bDelete == true ) {
			$bRet = $this->db_util->delete_media($aWhare);
			if ( $bRet == true ) {
				$aRet['status'] = '1';
			}
		}
		echo json_encode($aRet);
	}
	/**
	 * 保存上传图片文件    完成
	 */
	function save_upload_img(){
		parse_str($_SERVER['QUERY_STRING'], $_GET);
		//$session = $this->input->post('session');
		$session = $_GET['session'];
		session_id($session);
		
		$file = $_FILES['Filedata'];
		$time = time();
		$type = 3;
		
		$aUserInfo = $this->session->userdata('user_info');
		if( $aUserInfo != NULL && $file['name'] != '' ){
			$iSsoId = $aUserInfo['ssoid'];
			
			$iSeasonNums = $this->db_util->get_season( array( 'ssoid' => $iSsoId ) )->num_rows();
			if( $iSeasonNums >= 3 ){
				$result['result'] = 5;
				echo json_encode( $result );
				exit;
			}
			
			$this->user->create_user_path($iSsoId, FCPATH.'common/photo');
			$upload_path = $this->user->get_user_path($iSsoId, FCPATH.'common/photo');
		
			$tempFile = $file['tmp_name'];
			$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
			
			$aExtend = pathinfo($file['name']);
			$extend = strtolower($aExtend["extension"]);
			$bFileName = $time.'.'.$extend;
			$max_size = $this->config->item('season_photo_max_size');
			
			$fileTypes = array('jpg','jpeg','gif','png');
			if (in_array($extend,$fileTypes)) {//上传文件类型限制
				if($_FILES['Filedata'][size] < $max_size ){//上传图片大小限制
					if( move_uploaded_file($tempFile, $upload_path .'/'. $bFileName ) ){
						$this->load->model('resizeimage_model', 'resizeimage');
						$file_name = $this->user->get_user_path($aUserInfo['ssoid'], FCPATH.'common/photo') . '/' . $bFileName;
						$img_small_width = $this->config->item('img_small_width');
						$img_detail_width = $this->config->item('img_detail_width');
						$aExtend = pathinfo($file_name);
						$extend = strtolower($aExtend["extension"]);
						$file_name_small = $file_name . "_" . $img_small_width . "." . $extend;//缩略图文件路径
						$file_name_detail = $file_name . "_" . $img_detail_width . "." . $extend;//详情图文件路径
						$bFileNameSmall = $bFileName . "_" . $img_small_width . "." . $extend;//缩略图文件名
						$bFileNameDetail = $bFileName . "_" . $img_detail_width . "." . $extend;//详情图文件名
						$this->resizeimage->resizeimage($file_name, $img_small_width, "", "0", $file_name_small);
						$this->resizeimage->resizeimage($file_name, $img_detail_width, "", "0", $file_name_detail);
						
						$aNewMedia['relative_id'] = '';
						$aNewMedia['ssoid'] = $iSsoId;
						$aNewMedia['type'] = $type;
						$aNewMedia['file_name'] = $bFileName;
						$aNewMedia['file_name_small'] = $bFileNameSmall;
						$aNewMedia['file_name_detail'] = $bFileNameDetail;
						$aNewMedia['addtime'] = $time;
						$iMediaId = $this->db_util->save_media( $aNewMedia );
						
						$file_path = $this->user->get_user_path($iSsoId, '/common/photo');
						$result['result'] = 1;
						$result['name'] = $_FILES['Filedata']['name'];
						$result['url'] = $file_path .'/'. $bFileName;
						$result['file_id'] = $iMediaId;
					} else {
						$result['result'] = 0;
					}
				} else {
					$result['result'] = 3;
				}
			} else {
				$result['result'] = 2;
			}
		} else {
			$result['result'] = 4;
		}
		
		echo json_encode( $result );
	}
	
	/*
	 * 保存作品    完成
	 * 
	 * xuning
	 */
	function save_season(){
		//$aUserInfo = $this->session->userdata('user_info');
		$ssoid = $this->input->post('ssoid');
		$content = $this->input->post('content');
		$file_name = $this->input->post('file_name');
		$time = time();
		$aWhere = array( 'ssoid' => $ssoid );
		$aUserInfo = $this->db_util->get_user( $aWhere )->row_array();
		if( $aUserInfo['ssoid'] != '' ){
			$iSeasonNums = $this->db_util->get_season( array( 'ssoid' => $aUserInfo['ssoid'] ) )->num_rows();
			if( $iSeasonNums < 3 ){
				$aSeason['uid'] = $aUserInfo['id'];
				$aSeason['ssoid'] = $aUserInfo['ssoid'];
				$aSeason['addtime'] = $time;
				$aSeason['content'] = $content;
				$aSeason['prize_count'] = 0;
				$relative_id = $this->db_util->save_season( $aSeason );
				
				$aNewMedia['relative_id'] = $relative_id;
				if( $file_name != '' ){
					$aMediaWhere['id'] = $file_name;
					$aMediaWhere['ssoid'] = $aUserInfo['ssoid'];
					$this->db_util->update_media( $aNewMedia, $aMediaWhere );
				}
				
				//积分开始
				$scoreType = 5;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜
				$getType = 12;//12摄影比赛
				$source = 2; //1是我的客户之旅，2是摄影比赛
				$entityId = $relative_id;
				$sql = "select * from GrScoreRule where getType = $getType and scoreType = $scoreType";
				$aScoreRule = $this->db->query( $sql )->row_array();
				$sql = "select * from UserScoreDto_wx where ssoid = '". $aUserInfo['ssoid'] ."'";
				$aUserScoreInfo = $this->db->query($sql)->row_array();
				$interactiveScore = $aUserScoreInfo['interactiveScore'] + $aScoreRule['score'];
				$totalScore = $aUserScoreInfo['totalScore'] + $aScoreRule['score'];
				$sql = "update UserScoreDto_wx set interactiveScore = '". $interactiveScore ."', totalScore = '". $totalScore ."' where ssoid = '". $aUserInfo['ssoid'] ."'";
				$this->db->query($sql);
				//添加积分log type = 4 是我的客户之旅：entityId=share_id是分享积分
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
	
	//点赞
	function season_praise(){
		$ssoid = $this->input->post('ssoid');
		$season_id = $this->input->post('season_id');
		$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $ssoid ) )->row_array();
		if( $aUserInfo['id'] != '' ){
			$sql = "select * from txzj_season_priseinfo where season_id = '". $season_id ."' and uid = '". $aUserInfo['id'] ."'";
			$iPrise = $this->db->query( $sql )->num_rows();
			if( $iPrise < 1 ){
				$sql = "insert into txzj_season_priseinfo set season_id = '". $season_id ."', ssoid = '". $aUserInfo['ssoid'] ."', uid = '". $aUserInfo['id'] ."'";
				$this->db->query($sql);
				$sql = "update txzj_season set prize_count = prize_count + 1 where id = '". $season_id ."'";
				$this->db->query($sql);
				
				//积分开始
				$scoreType = 2;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜 2包含getType:11
				$getType = 11;//11是赞 5是优秀评论
				$source = 2; //1是我的客户之旅，2是摄影比赛
				$entityId = $season_id;
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