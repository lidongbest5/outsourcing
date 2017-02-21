<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class admin_season extends Controller {
	private $data = array();	//当前数据

	function admin_season()
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
		$data['LoadFile']['js'][] = 'admin_share';
		$data['aUserInfo'] = $this->session->userdata('user_info');
		
		$aWhere = array();
		
		$type = 3;
		$page = $this->uri->segment(4);
		if( $page == NULL ) $page = 0;
		$num = 20;
		$config['total_rows'] = $this->db_util->get_season( $aWhere, '', '', '', array( 'id' => 'desc' ) )->num_rows();
		$config['base_url'] = '/admin/admin_customer/text_share/';
		$config['per_page'] = $num;
		$config['first_link'] = '第一页';
		$config['last_link'] = '尾页';
		$config['uri_segment'] = 4;
		$this->pagination->initialize($config);//分页的初始化
		
		$aSeasonInfo = $this->db_util->get_season( $aWhere, '', $num, $page, array( 'id' => 'desc' ) )->result_array();
		foreach( $aSeasonInfo as $key => $val ){
			$data['aSeasonInfo'][$key] = $val;//
			$aMedia = $this->db_util->get_media( array( 'relative_id' => $val['id'], 'type' => $type,'ssoid' => $val['ssoid'] ) )->row_array();
			$data['aSeasonInfo'][$key]['img'] = $this->user->get_user_path($val['ssoid'], '/common/photo') .'/'. $aMedia['file_name'];
			$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $val['ssoid'] ) )->row_array();
			$data['aSeasonInfo'][$key]['department'] = $aUserInfo['department'];
		}
		
		$data['which'] = 'season';
		$this->tpl->view("front/admin/season/index",$data);
	}
	
	
	
	
	function season_info(){
		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'ui/jquery-ui-1.8.6';
		$data['LoadFile']['css'][] = 'admin_customer';
		
		$data['aUserInfo'] = $this->session->userdata('user_info');
		
		$type = 3;
		$id = $this->uri->segment(4);
		$aWhere = array( 'id' => $id );
		$aSeasonInfo = $this->db_util->get_season( $aWhere )->row_array();
		$data['aSeasonInfo'] = $aSeasonInfo;
		$aMediaInfo = $this->db_util->get_media( array( 'relative_id' => $aSeasonInfo['id'], 'type' => $type ) )->row_array();
		$data['aSeasonInfo']['img'] = $this->user->get_user_path($aSeasonInfo['ssoid'], '/common/photo') .'/'. $aMediaInfo['file_name'];
		$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $aSeasonInfo['ssoid'] ) )->row_array();
		$data['aSeasonInfo']['department'] = $aUserInfo['department'];
		
		$data['which'] = 'season';
		$this->tpl->view("front/admin/season/season_info",$data);
	}
	
	//获取信息
	function get_season(){
		$season_id = $this->uri->segment(4);
		$aSeasonInfo = $this->db_util->get_season( array( 'id' => $season_id ) )->row_array();
		echo json_encode($aSeasonInfo);
		
	}
	
	//发布奖品
	function save_prize(){
		$season_id = $this->input->post('season_id');
		$types = $this->input->post('types');
		$score = $this->input->post('score');
		$prize = $this->input->post('prize');
		$source = 1;
		$aSeasonInfo = $this->db_util->get_season( array( 'id' => $season_id ) )->row_array();
		$iPrizeTypesNums = $this->db_util->get_prize( array( 'source' => $source, 'types' => $types ) )->num_rows();
		if( ( $types == 4 && $iPrizeTypesNums >= 10 ) || ( $types == 3 && $iPrizeTypesNums >= 3 ) || ( $types == 2 && $iPrizeTypesNums >= 2 ) || ( $types == 1 && $iPrizeTypesNums >= 1 ) ){
			echo 2;
			exit;
		}
		$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $aSeasonInfo['ssoid'] ) )->row_array();
		$iPrizeNums = $this->db_util->get_prize( array( 'relative_id' => $season_id, 'source' => $source, 'ssoid' => $aSeasonInfo['ssoid'] ) )->num_rows();
		if( $iPrizeNums < 1 ){
			$aNewPrize['uid'] = $aSeasonInfo['uid'];
			$aNewPrize['ssoid'] = $aSeasonInfo['ssoid'];
			$aNewPrize['source'] = $source;
			$aNewPrize['relative_id'] = $season_id;
			$aNewPrize['types'] = $types;
			$aNewPrize['score'] = $score;
			$aNewPrize['prize'] = $prize;
			$aNewPrize['addtime'] = time();
			$this->db_util->save_prize( $aNewPrize );
			
			$aNewSeason['status'] = 1;
			$this->db_util->update_season( $aNewSeason, array( 'id' => $season_id ) );
			
			//积分开始
			$scoreType = 6;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜 6奖品积分
			$source = 3; //1是我的客户之旅，2是摄影比赛，3是奖品积分
			$entityId = $relative_id;
			$sql = "select * from userscoredto where uid = '". $aUserInfo['id'] ."'";
			$aUserScoreInfo = $this->db->query($sql)->row_array();
			$interactiveScore = $aUserScoreInfo['interactiveScore'] + $score;
			$totalScore = $aUserScoreInfo['totalScore'] + $score;
			$sql = "update userscoredto set interactiveScore = '". $interactiveScore ."', totalScore = '". $totalScore ."', ssoid = '". $aUserInfo['ssoid'] ."' where uid = '". $aUserInfo['id'] ."'";
			$this->db->query($sql);
			//添加积分log type = 4 是我的客户之旅：entityId=share_id是分享积分
			$createDate = date("Y-m-d H:i:s");
			$sql = "insert into userscorelog set createDate = '". $createDate ."', entityId = '". $entityId ."', source = '". $source ."', personalScore = '". $aScoreRule['score'] ."', type = $scoreType, uid = '". $aUserInfo['id'] ."', updateTime = '". $createDate ."'";
			$this->db->query($sql);
			//积分结束
			echo 1;
			exit;
		} else {
			echo 0;
			exit;
		}
		
		
	}
	
	//恶意刷分 扣除积分
	function deduct_season(){
		$season_id = $this->uri->segment(4);
		$aWhere = array( 'id' => $season_id );
		$aSeasonInfo = $this->db_util->get_season( $aWhere )->row_array();
		if( $aSeasonInfo['id'] != '' ){
			$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $aSeasonInfo['ssoid'] ) )->row_array();
			
			//删除作品积分开始
			$scoreType = 5;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜
			$getType = 12;//10摄影比赛
			$source = 2; //1是我的客户之旅，2是摄影比赛
			$entityId = $aSeasonInfo['id'];
			$sql = "select * from UserScoreLog where uid = '". $aUserInfo['id'] ."' and source = '". $source ."' and type = '". $scoreType ."' and entityId = '" . $entityId . "'";
			$aUserScoreLogInfo = $this->db->query($sql)->result_array();
			foreach( $aUserScoreLogInfo as $key => $val ){
				$aUserScoreInfo = array();
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
			//恶意积分开始
			$deduct_score = 35;
			$sql = "select * from UserScoreDto_wx where ssoid = '". $aUserInfo['ssoid'] ."'";
			$aUserScore = $this->db->query($sql)->row_array();
			$interactiveScore = $aUserScore['interactiveScore'] - $deduct_score;
			$totalScore = $aUserScore['totalScore'] - $deduct_score;
			if( is_numeric( $interactiveScore ) == true && is_numeric( $totalScore ) == true ){
				if( $interactiveScore < 0 ) $interactiveScore = 0;
				if( $totalScore < 0 ) $totalScore = 0;
				$sql = "update UserScoreDto_wx set interactiveScore = '". $interactiveScore ."', totalScore = '". $totalScore ."' where ssoid = '". $aUserInfo['ssoid'] ."'";
				$this->db->query($sql);
				$createDate = date("Y-m-d H:i:s");
				$sql = "insert into UserScoreDeductLog set createDate = '". $createDate ."', entityId = '". $entityId ."', source = '". $source ."', personalScore = '-". $deduct_score ."', type = $scoreType, uid = '". $aUserInfo['id'] ."', updateTime = '". $createDate ."'";
				$this->db->query($sql);
			}
			//恶意积分结束
			
			$aNewSeason['status'] = 2;
			$this->db_util->update_season( $aNewSeason, array( 'id' => $season_id ) );
			
			echo 1;
		}
		
	}
	
	//删除参赛人作品
	function delete_season(){
		$season_id = $this->uri->segment(4);
		$aWhere = array( 'id' => $season_id );
		$aSeasonInfo = $this->db_util->get_season( $aWhere )->row_array();

		if( $aSeasonInfo['id'] != '' ){
			$aUserInfo = $this->db_util->get_user( array( 'ssoid' => $aSeasonInfo['ssoid'] ) )->row_array();
			
			//删除作品积分开始
			$scoreType = 5;//1登录 2评价、赞 3提案 4我的客户之旅 5每季新鲜
			$getType = 12;//10摄影比赛
			$source = 2; //1是我的客户之旅，2是摄影比赛
			$entityId = $aSeasonInfo['id'];
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
			$type = 3;
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
		}
	}
	
}