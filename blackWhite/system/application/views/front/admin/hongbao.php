	<!--内容开始-->
	<div class="main">
		<div class="search_div">
			<form name="search" action="/admin/hongbao/save_search" method="post">
            	场次：<input type="text" name="event_time" id="event_time" style="width:100px;" value="<?php echo $search['event_time']?>" onClick="WdatePicker()" />&nbsp;
            	奖品种类：<select name="types" id="types">
                	<option value="">请选择</option>
                    <option value="1" <?php if($search['types'] == '1'):?>selected="selected"<?php endif;?>>一等奖</option>
                    <option value="2" <?php if($search['types'] == '2'):?>selected="selected"<?php endif;?>>二等奖</option>
                    <option value="3" <?php if($search['types'] == '3'):?>selected="selected"<?php endif;?>>三等奖</option>
                </select>
				<input type="text" name="user" style="width:60px;" value="<?php echo $search['user'];?>" />
				<input type="submit" name="submit" value="搜索" />
                <input type="button" name="daochu" onclick="window.location.href='/admin/hongbao/export'" value="导出" />
			</form>
		</div>
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
					<div class="title">获奖ID</div>
					<div class="title">场次/日期</div>
					<div class="title">奖品种类</div>
					<div class="title">中奖时间</div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $hongbao_info as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="title"><?php echo $val['user'];?></li>
						<li class="title"><?php echo $val['event_time'];?></li>
						<li class="title">
							<?php if( $val['types'] == 1 ):?>一等奖<?php endif;?>
                            <?php if( $val['types'] == 2 ):?>二等奖<?php endif;?>
                            <?php if( $val['types'] == 3 ):?>三等奖<?php endif;?>
                        </li>
						<li class="title"><?php echo date("Y-m-d H:i:s",$val['addtime']);?></li>
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
	