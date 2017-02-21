	<!--内容开始-->
	<div class="main">
		<!--<div class="main_top"></div>-->
		<div class="main_middle">
		  	<?php $this->load->view('front/include/admin_menu');?>
			<div class="content">
            	<div class="content_title" style="height:50px; text-align:left">
                    <div class="user" style="width:250px; height:50px; line-height:25px; text-align:left; padding-left:10px; cursor:pointer; <?php if( $column == 1 ):?>background:#9cdbf8<?php endif;?>" onclick="window.location.href='/admin/admin_testimony/index/1'">
                    	<b>How do you drive simplification <br />to reach +10pts in GEOs?</b>
                    </div>
                    <div class="user" style="width:250px; height:50px; line-height:25px; text-align:left; padding-left:10px; cursor:pointer; <?php if( $column == 2 ):?>background:#dccfe5<?php endif;?>" onclick="window.location.href='/admin/admin_testimony/index/2'">
                    	<b>How do you drive simplification <br />culture in your function?</b>
                    </div>
                    <div class="user" style="width:310px; height:50px; line-height:25px; text-align:left; padding-left:10px; cursor:pointer; <?php if( $column == 3 ):?>background:#fff7af<?php endif;?>" onclick="window.location.href='/admin/admin_testimony/index/3'">
                    	<b>How do you drive personal <br />/ employee engagement in your function?</b>
                    </div>
                    <div class="user" style="width:48px; height:48px; line-height:25px; text-align:left; padding-left:20px; background:#fff; border:1px solid #eee; cursor:pointer;" id="add_testimony">
                    	<b>添 加<br />证 言</b>
                    </div>
				</div>
				<div class="content_title">
                    <div class="user" style="width:150px;"><b>标题</b></div>
                    <div class="user" style="text-align:left; width:430px; padding-left:10px;"><b>内容</b></div>
					<div class="tel" style="width:60px;"><b>点赞数</b></div>
                    <div class="tel"><b>添加时间</b></div>
                    <div class="tel"><b>操作</b></div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $aTestimonyInfo as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
						<li class="user" style="width:150px;">
							<?php echo $val['title'];?>
                        </li>
                        <li class="user" style="text-align:left; width:440px;"><?php echo $val['content'];?></li>
						<li class="prize_time" style="width:60px;"><?php echo $val['prize_count'];?></li>
                        <li class="prize_time"><?php echo date("Y-m-d",$val['addtime']);?></li>
                        <li class="prize_time">
                        	<a class="info" id="info_<?php echo $val['id'];?>" style="cursor:pointer">详情</a>&nbsp;&nbsp;
                        	<a class="update" id="update_<?php echo $val['id'];?>" style="cursor:pointer">修改</a>&nbsp;&nbsp;
                            <a class="delete" id="delete_<?php echo $val['id'];?>" style="cursor:pointer">删除</a>
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
	<div id="save_testimony" style="display:none; width:600px; height:420px; line-height:35px; padding:10px; background:#FFF; border:1px solid #999;">
        <input type="hidden" name="act" id="act" value="" />
        <input type="hidden" name="row_id" id="row_id" value="" />
        栏目：<select name="column" id="column" style="width:500px;">
        	<option value="">请选择</option>
            <option value="1">How do you drive simplification to reach +10pts in GEOs?</option>
            <option value="2">How do you drive simplification culture in your function?</option>
            <option value="3">How do you drive personal / employee engagement in your function?</option>
        </select><br />
        标题：<input type="text" name="title" id="title" style="width:500px;" value="" /><br />
        <div contentEditable="true" id="content" style="border:1px solid #999; width:580px; height:300px; line-height:20px; padding:5px; overflow-y:scroll"></div>
        <div style="width:100px; height:30px; float:left; text-align:center; padding-top:10px;">
        	<input type="button" name="save_testimony_btn" id="save_testimony_btn" value="保存" />
        </div>
        <div style="width:100px; height:30px; float:left; text-align:center; padding-top:10px;">
        	<input type="button" onclick="$.dialog({id:'save_testimony'}).close();" value="取消" />
        </div>
    </div>
    
    <div id="info_testimony" style="display:none; width:600px; height:420px; line-height:35px; padding:10px; background:#FFF; border:1px solid #999;">
        栏目：<span id="info_column"></span><br />
        标题：<span id="info_title"></span><br />
        <div  id="info_content" style="border:1px solid #999; width:580px; height:300px; line-height:20px; padding:5px; overflow-y:scroll"></div>
        <div style="width:100px; height:30px; float:left; text-align:center; padding-top:10px;">
        	<input type="button" onclick="$.dialog({id:'info_testimony'}).close();" value="关闭" />
        </div>
    </div>
	<div id="tip_message" style="display: none;"></div>