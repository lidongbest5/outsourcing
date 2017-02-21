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

		<article id="work_show">
			<div id="my"<?php if($aMediaInfo['file_name'] == '' ):?> style="display:none;"<?php endif;?>>
              	<div id="my_img"><?php if($aMediaInfo['file_name'] != '' ):?><img src="<?php echo $aMediaInfo['img'] . $aMediaInfo['file_name_detail'];?>" width="100%" /><?php endif;?></div>
				<div class="close" id="close_<?php echo $aMediaInfo['id'];?>"><img src="/common/images/closed.png" id="img" /></div>
			</div>
            <div id="tu_title">图片描述</div>
            <div id="tu_tishi">提示：描述不超过50个字，最多上传3张作品，单张大小不超过3M</div>
            <div id="tu_des"><textarea class="tu_des_t" id="content"></textarea></div>
            <div id="tu_bt">
            	<img src="/common/images/submit.png" id="input_bt" />
            </div>
            <input type="hidden" id="file_name" value="<?php echo $aMediaInfo['id'];?>" />
		</article>
	</div>
</div>
</body>
<input type="hidden" id="ssoid"	value="<?php echo $aUserInfo['ssoid'];?>" />
<?php $this->load->view('front/include/footer');?>