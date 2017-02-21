	<!--内容开始-->
	<div class="main">
		<div class="search_div" style="background:#FFF; border:1px #CCC solid; height:35px;">
            <form action="/admin/awards/ajax_save_awards" method="post" enctype="multipart/form-data">
            奖品类型：<select name="types" id="types">
                <option value="1">第一波</option>
                <option value="2">第二波</option>
                <option value="3">第三波</option>
            </select>&nbsp;
            数量：<input type="text" name="nums" id="nums"  style="width: 60px;"/>&nbsp;
            人气最高数：<input type="text" name="max_renqi" id="max_renqi" style="width: 80px;" />&nbsp;
            备注：<input type="text" name="memo" id="memo" style="width: 80px;" />&nbsp;
            导入兑换码：<input type="file" name="files" id="files" style="" />&nbsp;
            <input type="submit" name="add_awards" id="add_awards" value="添加" /><!-- onclick="$(this).attr('disabled', true);"-->
            </form>
		</div>
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
					<div class="title" style="width:60px">ID</div>
					<div class="title" style="width:80px">奖品</div>
					<div class="title" style="width:80px">数量</div>
                    <div class="title" style="width:80px">人气最高数</div>
					<div class="title">备注</div>
					<div class="title" style="width:80px">操作</div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $awards_info as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="title" style="width:60px"><?php echo $val['id'];?></li>
						<li class="title" style="width:80px">
							<?php if( $val['types'] == 1 ): echo "第一波";endif;?>
                            <?php if( $val['types'] == 2 ): echo "第二波";endif;?>
                            <?php if( $val['types'] == 3 ): echo "第三波";endif;?>
                        </li>
						<li class="title" style="width:80px"><?php echo $val['nums'];?></li>
                        <li class="title" style="width:80px"><?php echo $val['max_renqi'];?></li>
						<li class="title"><?php echo $val['memo'];?></li>
                        <li class="title" style="width:380px; text-align:left; padding-left:28px;">
                        	<font class="delete_awards" id="delete_awards_<?php echo $val['id']?>">删除</font>&nbsp;&nbsp;
                            <!--导入兑换码：<input type="file" name="files" id="files" style="" />&nbsp;-->
                        </li>
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
	 