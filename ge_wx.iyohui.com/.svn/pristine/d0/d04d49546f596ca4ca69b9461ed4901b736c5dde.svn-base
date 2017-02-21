	<!--内容开始-->
	<div class="main">
		<div class="search_div">

		</div>
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
					<div class="title">ID</div>
					<div class="title">用户名</div>
					<div class="title">游戏时间</div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $agametime as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="title"><?php echo $val['id'];?></li>
						<li class="title"><?php echo $val['user'];?></li>
                        <li class="title"><?php echo sprintf("%0.2f", $val['game_time']);?> 秒</li>
					</ul>
					<?php $i++;?>
				<?php endforeach;?>
				</div>
				<div style="clear:left"></div>
				<div class="show_options">
				<?php echo $this->pagination->create_links();?>
				</div>
			</div>
		</div>
		<div class="main_bottom"></div>
	</div>
	<div id="tip_message" style="display:none; border:#999 solid 1px; background-color:#FFFFFF;">
        <span id="tip_content">
        </span>
    </div>
    <div id="showBox" style="display: none;"></div><!-- 存放弹出层临时内容 //-->
	 