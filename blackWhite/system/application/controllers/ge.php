<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ge extends Controller {
	private $data = array();

	function init()
	{
		parse_str($_SERVER['QUERY_STRING'], $_GET);
		if ( $_GET['wxUid'] != NULL ) {
			$this->load->model('db_model', 'db_util');
			$aUserInfo = $this->db_util->get_user(null, array( 'wxIdentity' => $_GET['wxUid'] ) )->row_array();
			$ssoid = $aUserInfo['ssoid'];
			setcookie("ssoid", $ssoid, time() + 60*60*24*7, '/', 'gech.familyfoto.net');
			redirect('/ge/index/');
		}
		else {
			echo 'error';
			exit;
		}
	}

	function index()
	{
		$data = $this->data;
		$ssoid = $this->input->cookie('ssoid');

		$sql = "select * from ge_table where ssoid = '$ssoid'";
		$sqlData = $this->db->query( $sql )->row_array();

		if( count($sqlData) == 0 ){
			$sql = "insert into ge_table set ssoid = '". $ssoid ."';";
			$this->db->query($sql);
			$sql = "select * from ge_table where ssoid = '$ssoid'";
			$sqlData = $this->db->query( $sql )->row_array();
		}

		$data['info'] = $sqlData;
		$type = $sqlData['type'];

		if( $type == 0 ){
			$data['rank'] = 0;
		}
		else{
			$sql = "select * from ge_table where type = $type order by -score";
			$rankData = $this->db->query( $sql )->result_array();
			$count = 1;
			foreach ($rankData as $rank) {
				if( $rank['ssoid'] == $ssoid ){
					break;
				}
				$count++;
			}
			$data['rank'] = $count;
		}

		$sql = "select * from ge_invite where guest = '$ssoid'";
		$guestData = $this->db->query( $sql )->row_array();
		if( count( $guestData ) > 0 and $guestData['status'] == 0 ){
			$sql = "update ge_invite set status = 1 where id = '". $guestData['id'] ."'";
			$this->db->query($sql);
		}

		$data['invite'] = 0;

		$sql = "select * from ge_invite where owner = '$ssoid'";
		$ownerData = $this->db->query( $sql )->row_array();
		if( count( $ownerData ) > 0 and $guestData['status'] == 1 ){
			$sql = "update ge_invite set status = 2 where id = '". $ownerData['id'] ."'";
			$this->db->query($sql);
			$data['invite'] = 1;
		}

		$this->load->view("front/ge/index",$data);
		
	}

	function game(){
		$this->load->view("front/ge/game",$data);
	}

	function rule(){
		$this->load->view("front/ge/rule",$data);
	}

	function fail(){
		$this->load->view("front/ge/fail",$data);
	}

	function invite(){
		$this->load->view("front/ge/invite",$data);
	}

	function score(){
		$data = $this->data;
		$ssoid = $this->input->cookie('ssoid');

		$sql = "select * from ge_table where ssoid = '$ssoid'";
		$sqlData = $this->db->query( $sql )->row_array();
		$data['info'] = $sqlData;

		$type = $type = $sqlData['type'];
		$sql = "select * from ge_table where type = $type";
		$typeData = $this->db->query( $sql )->result_array();
		$count = 0;
		foreach ($typeData as $ty) {
			$count += $ty['score'];
		}

		$data['count'] = $count;

		$sql = "select * from ge_table where type = $type order by -score";
		$rankData = $this->db->query( $sql )->result_array();
		$count = 1;
		foreach ($rankData as $rank) {
			if( $rank['ssoid'] == $ssoid ){
				break;
			}
			$count++;
		}
		$data['rank'] = $count;

		$this->load->view("front/ge/score",$data);
	}

	function setInvite(){
		$invite = $_POST['invite'];
		$iExistSSOID = $this->db_util->get_user(array( 'ssoid' => $invite ))->num_rows();
		if ( $iExistSSOID > 0 ) {
			$sql = "select * from ge_invite where guest = '$invite'";
			$inviteData = $this->db->query( $sql )->row_array();
			if( count($inviteData) > 0 ){
				echo 0;
			}
			else{
				$ssoid = $this->input->cookie('ssoid');
				$sql = "insert into ge_invite set owner = ". $ssoid .", guest = ". $invite .";";
				$this->db->query($sql);
				echo 1;
			}
		} else {
			echo 2;
		}
	}

	function setType(){
		$type = $_POST['type'];
		$ssoid = $this->input->cookie('ssoid');
		$sql = "update ge_table set type = '". $type ."' where ssoid = '". $ssoid ."'";
		$this->db->query($sql);
		echo('0');
	}

	function setScore(){
		$score = $_POST['score'];
		$ssoid = $this->input->cookie('ssoid');
		$sql = "select * from ge_table where ssoid = '$ssoid'";
		$userData = $this->db->query( $sql )->row_array();
		$new_score = $score+$userData['score'];
		$sql = "update ge_table set score = ". $new_score ." where ssoid = '". $ssoid ."'";
		$this->db->query($sql);
		if( $score > $userData['score_high'] ){
			$sql = "update ge_table set score_high = ". $score ." where ssoid = '". $ssoid ."'";
			$this->db->query($sql);
		}
		echo('0');
	}
	
}