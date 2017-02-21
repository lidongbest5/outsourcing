<?php $this->load->view('front/include/header');?>
<title>"简之美"摄影比赛</title>
<script type="text/javascript">
	var ssoid = '<?php echo $aUserInfo['ssoid'];?>';
	var session_id = '<?php echo session_id();?>';
	var info = '<?php echo base64_encode(serialize($this->session->userdata("user_info")))?>';
	var photo_max_size = '<?php echo $this->config->item('season_photo_max_size');?>B';
	var photo_max_M = parseInt( photo_max_size ) /1024/1024;
</script>
</head>
<body>
<div id="pagewrap">
	<div id="page">
        <?php $this->load->view('front/include/top');?>
		<div class="clear"></div>
          
        <article id="my">
            <div id="my_show">
                <div id="my_tu">
                    <img src="<?php echo $aSeasonInfo['file_name_detail'];?>" id="my_tu_img" />
                </div>
            
                <div id="my_text">
                    <div id="ren">参 赛 人&nbsp;&nbsp;：<?php echo $aSeasonInfo['ssoid'];?></div>
                    <?php echo date("Y-m-d", $aSeasonInfo['addtime']);?>
                    <div id="zan">赞：<?php echo $aSeasonInfo['prize_count'];?>&nbsp;<img class="xin" onClick="zan(<?php echo $aSeasonInfo['id'];?>)" src="/common/images/xin.gif"></div>
                </div>
            
                <div class="my_text_s">所属部门：<?php echo $aSeasonInfo['department'];?></div>
                <div class="my_text_s">
                    <?php echo $aSeasonInfo['content'];?>
                </div>
                <div id="button">
                    <div id="left_bt"><img src="/common/images/left.png"  class="left_img" id="left_img_<?php echo $aSeasonInfo['id'];?>" /></div>
                    <div id="right_bt"><img src="/common/images/right.png" class="right_img" id="right_img_<?php echo $aSeasonInfo['id'];?>" /></div>
                    <div class="clear"></div>
                </div>
            </div>
        </article>
       
        <footer>
        	<div id="foot"></div>
        </footer>
	</div>
</div>
<input type="hidden" id="ssoid"	value="<?php echo $aUserInfo['ssoid'];?>" />
<?php $this->load->view('front/include/footer');?>