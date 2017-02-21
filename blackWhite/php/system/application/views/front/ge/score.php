<!DOCTYPE html>
<html>
	<head>
		<title>简化能量块</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="format-detection" content="telephone=no, email=no">
		<link rel="stylesheet" type="text/css" href="/common/ge/css/index.css">
	</head>
	<body>
        <div class="score">
            <div class="score-index">
            	<p>
            		你的最好成绩：<?php echo $info['score_high'] ?><br/>
                    你的积分: <?php echo $info['score'] ?><br/>
            		你的排名：<?php echo $rank ?>
            	</p>
            	<p>
            		你的部门：<?php if( $info['type'] == 1 ){
                        echo '设计部';
                    }
                    else if( $info['type'] == 2 ){
                        echo '程序部';
                    }
                    else if( $info['type'] == 3 ){
                        echo '运营部';
                    }
                    else if( $info['type'] == 4 ){
                        echo '生产部';
                    }
                    else if( $info['type'] == 5 ){
                        echo '总部';
                    }
                    ?><br/>
            		部门积分：<?php echo $count ?>
            	</p>
            </div>
            <div class="index-btn">
                <a href="/ge/index">返回主页</a>
            </div>
        </div>
        <script src="/common/ge/js/zepto.min.js"></script>
		<script src="/common/ge/js/cookies.min.js"></script>
		<script src="/common/ge/js/index.js"></script>
	</body>
</html>