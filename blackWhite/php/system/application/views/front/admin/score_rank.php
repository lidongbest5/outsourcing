	<!--内容开始-->
	<div class="main">
		<!--<div class="main_top"></div>-->
		<div class="main_middle">
			<?php $this->load->view('front/include/admin_return');?>
			<div class="content">
				<div class="content_title">
					<div class="user" style="width: 50px;">排行</div>
					<div class="user" style="width: 150px;">SSOID</div>
					<div class="user">部门</div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $rank as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="user" style="width: 50px;">
							<?php echo $key +  1;?>
						</li>
						<li class="user" style="width: 150px;">
							<?php echo $val['ssoid'];?>
						</li>
						<li class="user"><?php if ( $val['department'] != null ) { echo $val['department']; } else { echo '内网用户,未在微信登录';}?></li>
					</ul>
					<?php $i++;?>
				<?php endforeach;?>
				</div>
				<div style="clear:left"></div>
			</div>
		</div>
	</div>
	<div id="tip_message" style="display:none; border:#999 solid 1px; background-color:#FFFFFF;">
		<span id="tip_content">
		</span>
	</div>
