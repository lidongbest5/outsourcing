<?php $this->load->view('front/include/header');?>
<title>我的作品</title>
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
        
        <article id="seanson">
			<?php foreach( $aSeasonInfo as $key => $val ):?>
            <div class="show">
                <div class="my">
                    <div class="my_tus" >
                        <img src="<?php echo $val['file_name_detail'];?>" class="my_tu" />
                        <div class="my_text">
                            <p class="my_text_c"><?php echo $val['content'];?></p>
                            <div class="my_date"><?php echo date("Y-m-d", $val['addtime']);?></div>
                        </div>
                    </div>
                     <!--<div class="close"><img src="/common/images/closed.png" id="img" /></div>-->
                </div>
            
                <div class="suoshu">
                    <div class="ren">参 赛 人&nbsp;&nbsp;：<?php echo $val['ssoid'];?></div>
                     所属部门：<?php echo $aUserInfo['department'];?>
                    <div class="zan">赞：<?php echo $val['prize_count'];?><img class="xin" src="/common/images/xin.gif"></div>
                </div>
                <div class="del_bt"><img src="/common/images/del.png" class="delete_season" id="delete_season_<?php echo $val['id'];?>"></div>
            </div>
            <?php endforeach;?>
        </article>
     </div>
</div>
<input type="hidden" id="ssoid"	value="<?php echo $aUserInfo['ssoid'];?>" />
<?php $this->load->view('front/include/footer');?>
