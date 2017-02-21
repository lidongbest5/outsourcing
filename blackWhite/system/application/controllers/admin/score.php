<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class score extends Controller {

	function __construct()
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

		//准备模板
		$config = array('layout' => 'layout_front');
		$this->load->library('layout', $config, 'tpl');
	}

	public function index()
	{
		exit('No direct script access allowed');
	}

	// 导入ge内网个人积分
	public function import()
	{
		$createTable  = "DROP TABLE IF EXISTS `txzj_userscorelog`;";
		$this->db->query($createTable);
		$createTable = "CREATE TABLE IF NOT EXISTS `txzj_userscorelog` (
`id` bigint(20) NOT NULL auto_increment COMMENT '自然序号',
`createDate` datetime default NULL COMMENT '创建日期',
`entityId` bigint(20) default NULL COMMENT '事件id',
`source` tinyint(3) NOT NULL COMMENT '分数来源 1我的客户之旅，2摄影比赛',
`goodReplyFlag` int(11) default NULL COMMENT '好评回复标志',
`groupCode` int(11) default NULL COMMENT '部门获得积分',
`personalScore` double default NULL COMMENT '个人获得积分',
`tips` varchar(255) default NULL COMMENT '未知',
`type` int(11) default NULL COMMENT '类型',
`uid` bigint(20) default NULL COMMENT '用户id',
`ssoid` varchar(255) default NULL COMMENT 'ssoid',
`updateTime` datetime default NULL COMMENT '更新时间',
PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT '内网用户积分记录表';";
		$this->db->query($createTable);
		$sTitle = "INSERT INTO txzj_userscorelog (id, createDate, entityId, source, goodReplyFlag, groupCode, personalScore, tips, type, uid, ssoid, updateTime) VALUES \n";

		$this->db->from ( 'txzj_userscorelog' );
		$handle = fopen(FCPATH . '/common/temp.txt', 'r');
		if ($handle) {
			while (!feof($handle)) {
				$buffer[] = str_replace("\n", "", fgets($handle));
			}
			fclose($handle);

			$i = 0;
			$sInsert = $sTitle;
			foreach ($buffer as $val) {
				if ( $val != null ) {
					if ( $i >= 99) {
						$sInsert .= $val . ";";
						$this->db->query($sInsert);
						// echo $sInsert . "<br />";exit;
						$sInsert = $sTitle;
						$i = 0;
					} else {
						$sInsert .= $val . ",";
						$i++;
					}
				}
			}
			$this->db->query(substr($sInsert, 0, strlen($sInsert)-1));
		}
		echo 'success';
	}

	private function getQuarterByMonth($date){
		$month = substr($date,-2);
		$Q = ceil($month/3);
		return $Q;
	}

	public function rank() {
		parse_str($_SERVER['QUERY_STRING'], $_GET);

		$data = $this->data;
		$data['LoadFile'] = array();
		$data['LoadFile']['css'][] = 'ui/jquery-ui-1.8.6';
		$data['LoadFile']['css'][] = 'admin_customer';

		$data['refer'] = $_GET['refer'];
		$season = $_GET['season'];
		$iTop = $_GET['count'];
		if ( $iTop == null ) $iTop = 10;

		$data['season'] = $this->getQuarterByMonth(date('Ym'));
		if ( $season == null ) {
			$season = $data['season'];
		}
		$season = 2;
		$year = date('Y');
		switch($season) {
			case '1':
				$sWhereWx = "WHERE us.createDate > '" . $year . "-01-01' AND us.createDate <= '" . $year . "-03-31 23:59:59'";
				$sWhere = "WHERE createDate > '" . $year . "-01-01' AND createDate <= '" . $year . "-03-31 23:59:59'";
				break;

			case '2':
				$sWhereWx = "WHERE us.createDate > '" . $year . "-04-01' AND us.createDate <= '" . $year . "-06-30 23:59:59'";
				$sWhere = "WHERE createDate > '" . $year . "-04-01' AND createDate <= '" . $year . "-06-30 23:59:59'";
				break;

			case '3':
				$sWhereWx = "WHERE us.createDate > '" . $year . "-07-01' AND us.createDate <= '" . $year . "-09-30 23:59:59'";
				$sWhere = "WHERE createDate > '" . $year . "-07-01' AND createDate <= '" . $year . "-09-30 23:59:59'";
				break;

			case '4':
				$sWhereWx = "WHERE us.createDate > '" . $year . "-10-01' AND us.createDate <= '" . $year . "-12-31 23:59:59'";
				$sWhere = "WHERE createDate > '" . $year . "-10-01' AND createDate <= '" . $year . "-12-31 23:59:59'";
				break;
		}

		// 统计微信用户的得分记录
		$sql = 'SELECT u.ssoid AS ssoid,sum(personalScore) AS total_score FROM UserScoreLog us LEFT JOIN UserInfo u ON us.uid=u.id ' . $sWhereWx. ' GROUP BY ssoid ORDER BY total_score DESC';
		$this->db->from ( 'UserScoreLog' );
		$aWxUserScoreLog = $this->db->query($sql)->result_array();

		// 统计内网用户的得分记录
		$sql = 'SELECT ssoid,SUM(personalScore) AS total_score FROM txzj_userscorelog ' . $sWhere. ' GROUP BY ssoid ORDER BY total_score DESC';
		$this->db->from ( 'txzj_userscorelog' );
		$aUserScoreLog = $this->db->query($sql)->result_array();

		$iWxCount = count($aWxUserScoreLog);
		$iCount = count($aUserScoreLog);
		// echo $iWxCount . '<br />' . $iCount;
		if ( $iCount > $iWxCount) {
			$aOuter = $aUserScoreLog;
			$aInner = $aWxUserScoreLog;
		} else {
			$aOuter = $aWxUserScoreLog;
			$aInner = $aUserScoreLog;
		}
		foreach ($aOuter as $key => $val) {
			$bFind = false;
			foreach ($aInner as $k => $v) {
				if ( $val['ssoid'] == $v['ssoid']) {
					$bFind = true;
					$aFinal[$val['ssoid']] = $val['total_score'] + $v['total_score'];
					break;
				}
			}
			if ( $bFind == false ) {
				$aFinal[$val['ssoid']] = $val['total_score'];
			}
		}
		$aKeys = array_keys($aFinal);
		foreach ($aInner as $key => $val) {
			if ( !in_array($val['ssoid'], $aKeys) ) {
				$aFinal[$val['ssoid']] = $val['total_score'];
			}
		}
		arsort($aFinal);
		// echo count($aFinal);print_r($aFinal);
		$aTop = array_slice($aFinal, 0, $iTop, true);
		// print_r($aTop);
		foreach ($aTop as $key => $val) {
			$this->db->from ( 'userinfo' );
			$aTemp = $this->db->query(' SELECT department FROM userinfo WHERE ssoid =' . $key)->row_array();
			$aTopMan[] = array(
					'ssoid'			=>	$key,
					'department'	=>	$aTemp['department'],
					'score'			=>	$val,
				);
		}
		// print_r($aTopMan);
		$data['rank'] = $aTopMan;

		$this->tpl->view("front/admin/score_rank", $data);
	}
}