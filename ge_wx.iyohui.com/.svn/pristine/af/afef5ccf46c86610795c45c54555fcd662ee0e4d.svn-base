	<!--内容开始-->
	<div class="main">
		<div class="search_div">
            <div style="width:781px; float:left;">
            	奖品<select name="types" id="types">
                	<option value="">请选择</option>
                    <option value="1" <?php if( $search['types'] == 1 ):?>selected="selected"<?php endif;?>>第一波</option>
                    <option value="2" <?php if( $search['types'] == 2 ):?>selected="selected"<?php endif;?>>第二波</option>
                    <option value="3" <?php if( $search['types'] == 3 ):?>selected="selected"<?php endif;?>>第三波</option>
                </select>&nbsp;&nbsp;
                ssoid&nbsp;<input type="text" name="ssoid" id="ssoid" style="width:90px;" value="<?php echo $search['ssoid'];?>" />&nbsp;&nbsp;
                微信名&nbsp;<input type="text" name="name" id="name" style="width:90px;" value="<?php echo $search['name'];?>" />&nbsp;&nbsp;
                兑换券&nbsp;<input type="text" name="coupon_code" id="coupon_code" style="width:90px;" value="<?php echo $search['coupon_code'];?>" />&nbsp;&nbsp;
                &nbsp;<input type="button" name="search" id="search" value="&nbsp;搜索&nbsp;" />&nbsp;&nbsp;&nbsp;
                <input type="button" name="search" id="search" value="&nbsp;导出&nbsp;" />
            </div>
		</div>
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
                	<div class="user" style="width:50px">ID</div>
                    <div class="user">场次</div>
					<div class="user">SSOID</div>
                    <div class="name">微信名</div>
                    <div class="user">奖品</div>
					<div class="tel">兑换券</div>
					<div class="prize_time">密码</div>
					<div class="delivery_number">中奖时间</div>
				</div>
				<div class="content_main">
				<?php $i=0;?>
				<?php foreach( $prize_info as $key => $val):?>
					<ul <?php if( $i % 2 == 0 ):?> class="content_item" <?php else:?>class="content_item_1"<?php endif;?>>
                    	<li class="user" style="width:50px"><?php echo $val['id'];?></li>
						<li class="user">
							<?php if( $val['awards_types'] == 1 ): echo '第一波'; endif;?>
                            <?php if( $val['awards_types'] == 2 ): echo '第二波'; endif;?>
                            <?php if( $val['awards_types'] == 3 ): echo '第三波'; endif;?>
                        </li>
                        <li class="user"><?php echo $val['ssoid'];?></li>
                        <li class="name"><?php echo $val['name'];?></li>
						<li class="user"><?php echo $val['memo'];?></li>
                        <li class="tel"><?php echo $val['coupon_code'];?></li>
						<li class="prize_time"><?php echo $val['password'];?></li>
						<li class="delivery_number"><?php echo date('m-d(H:i)',$val['add_time']);?></li>
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
	 <div id="row_update_user" style=" display:none; width:350px; height:200px; line-height:35px; padding:30px;">
    	<div style="width:50px; float:left">省份：</div>
        <div style="width:80px; float:left"><font id="r_province"></font></div>
        <div style="width:80px; float:left"><font id="r_city"></font></div>
        <div style="width:80px; float:left"><font id="r_district"></font></div><br />
        <input type="hidden" name="row_id" id="row_id" value="" />
        修改：<select name="row_province" id="row_province" onchange="row_province(this)">
                <option value="">请选择</option>
				<?php foreach( $aprovince as $province_key => $province_val ):?>
                <option value="<?php echo $province_val['region_name']?>" <?php if( $aPrizeInfo['province']== $province_val['region_name'] ):?>selected="selected"<?php endif;?>><?php echo $province_val['region_name']?></option>
                <?php endforeach;?>
            </select>
            &nbsp;
            <select name="row_city" id="row_city" onchange="row_city(this)" style="min-width:100px">
            	<option value="">请选择</option>
            </select>
            &nbsp;
            <select name="row_district" id="row_district" style="min-width:100px">
            	<option value="">请选择</option>
            </select>
            <br />
        地址：<input type="text" name="row_address" id="row_address" style="width:200px;" value="<?php echo $aPrizeInfo['address'];?>" /><br />
    	姓名：<input type="text" name="row_name" id="row_name" style="width:80px;" value="<?php echo $aPrizeInfo['name'];?>" />&nbsp;&nbsp;
        电话：<input type="text" name="row_tel" id="row_tel" style="width:100px;" value="<?php echo $aPrizeInfo['tel'];?>" /><br />
        运单号：<input type="text" name="row_shipping_code" id="row_shipping_code" value="<?php echo $aPrizeInfo['shipping_code'];?>" /><br />
        <div style="width:170px; height:30px; float:left; text-align:center">
        	<input type="button" name="row_save_user" id="row_save_user" value="修改" />
        </div>
        <div style="width:170px; height:30px; float:left; text-align:center">
        	<input type="button" onclick="$('#row_update_user').dialog('close');" value="取消" />
        </div>
    </div>
