
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
        <script>
            var session_id           = '<?php echo session_id();?>',
                ge_type              = '<?php echo $info['type'] ?>',
                ge_score             = '<?php echo $info['score'] ?>',
                ge_scorehigh         = '<?php echo $info['score_high'] ?>',
                ge_rank              = '<?php echo $rank ?>',
                ge_invite            = '<?php echo $invite ?>';
        </script>
	</head>
	<body>
        <div class="index-page" id="index-page"></div>
        <div class="index-main">
            <div class="index-info">
                <p>今天还可以玩<span class="game-time">3</span>次</p>
                <p>我的最好成绩:<span><?php echo $info['score_high'] ?></span></p>
                <p>我的排名:<span><?php echo $rank ?></span></p>
            </div>
            <div class="index-btn">
                <a class="start-game">开始游戏</a>
                <a class="game-help" href="/ge/rule">游戏帮助</a>
                <a class="score-search" href="/ge/score">积分查询</a>
            </div>
            <div class="modal">
                <h3>请选择部门</h3>
                <ul>
                    <li data="1" class="dep1">1.我是设计部门</li>
                    <li data="2" class="dep2">2.我是程序部门</li>
                    <li data="3" class="dep3">3.我是运营部门</li>
                    <li data="4" class="dep4">4.我是生产部门</li>
                    <li data="5" class="dep5">5.我是总部</li>
                </ul>
            </div>
        </div>
        <script src="/common/ge/js/zepto.min.js"></script>
		<script src="/common/ge/js/cookies.min.js"></script>
		<script src="/common/ge/js/index.js"></script>
	</body>
</html>
