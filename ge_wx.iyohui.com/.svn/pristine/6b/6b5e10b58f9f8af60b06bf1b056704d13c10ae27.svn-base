	<!--内容开始-->
	<div class="main">
		<!--<div class="main_top"></div>-->
		<div class="main_middle">
		  	<?php $this->load->view('front/include/admin_menu');?>
			<div class="content">
				<div class="content_title">
                    <div class="user" style="width:150px;"><b>发表人</b></div>
                    <div class="user" style="text-align:left; width:120px; padding-left:10px;"><b>所属部门</b></div>
					<div class="user" style="text-align:left; width:300px; padding-left:30px;"><b>照片描述</b></div>
					<div class="tel"><b>上传日期</b></div>
                    <div class="tel" style="width:200px;"><b>操作</b></div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $aSeasonInfo as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="user" style="width:150px;">
							<?php echo $val['ssoid'];?>
                        </li>
                        <li class="user" style="text-align:left; width:130px;"><?php echo $val['department'];?></li>
                        <li class="name" style="text-align:left; width:320px; padding-left:10px;"><?php echo $val['content'];?></li>
						<li class="prize_time"><?php echo date("Y-m-d",$val['addtime']);?></li>
                        <li class="prize_time" style="width:200px;">
                        	<a target="_blank" href="/admin/admin_season/season_info/<?php echo $val['id'];?>" style="cursor:pointer">详情</a>&nbsp;&nbsp;
                            <?php if( $val['status'] == 0 ):?>
                        	<a class="delete_season" id="delete_season_<?php echo $val['id'];?>" style="cursor:pointer">删除</a>&nbsp;&nbsp;
                            <a class="deduct_season" id="deduct_season_<?php echo $val['id'];?>" style="cursor:pointer">恶意刷分</a>&nbsp;&nbsp;
                            <!--<a class="prize_season" id="prize_season_<?php echo $val['id'];?>" style="cursor:pointer">评奖</a>-->
                            <?php elseif( $val['status'] == 1 ):?>
                            	已获奖
                            <?php elseif( $val['status'] == 2 ):?>
                            	已处罚
                            <?php endif;?>
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
	 <div id="row_prize" style=" display:none; width:250px; height:200px; line-height:35px; padding:10px; background:#FFF; border:1px solid #999;">
    	<div style="width:60px; float:left">发 表 人 ：</div>
        <div style="width:80px; float:left"><font id="r_ssoid"></font></div><br />
        <input type="hidden" name="row_id" id="row_id" value="" />
        奖品类型：<select name="types" id="types" style="width:150px;">
        	<option value="">请选择</option>
            <option value="4">创意激励奖</option>
            <option value="3">三等奖</option>
            <option value="2">二等奖</option>
            <option value="1">一等奖</option>
        </select><br />
        积分奖励：<input type="text" name="score" id="score" style="width:150px;" value="" /><br />
        奖品奖励：<input type="text" name="prize" id="prize" style="width:150px;" value="" /><br />
        <div style="width:100px; height:30px; float:left; text-align:center">
        	<input type="button" name="save_prize" id="save_prize" value="保存" />
        </div>
        <div style="width:100px; height:30px; float:left; text-align:center">
        	<input type="button" onclick="$.dialog({id:'row_prize'}).close();" value="取消" />
        </div>
    </div>
	<div id="tip_message" style="display: none;"></div>