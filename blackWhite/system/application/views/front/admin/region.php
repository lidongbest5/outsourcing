    <!--内容开始-->
	<div class="main">
		<div class="search_div">

            
		</div>
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
					<div style="width:250px; float:left; text-align:center">省份<font color="#FF0000">(红色代表不可送达地区)</font></div>
					<div style="width:250px; float:left; text-align:center">城市<font color="#FF0000">(红色代表不可送达地区)</font></div>
					<div style="width:250px; float:left; text-align:center">区县<font color="#FF0000">(红色代表不可送达地区)</font></div>
					<!--<div style="width:200px; float:left; text-align:center">操作</div>-->
				</div>
				<div class="content_main">
					<div style="width:250px; float:left; text-align:center">
                    <div id="province">
                    	<?php foreach( $aprovince as $province_key => $province_val ):?>
	                        <div class="region" style=" <?php if($province_val['if_post'] == 0):?>color:#FF0000;<?php endif;?>">
								<div class="province" id="province_<?php echo $province_val['region_id']?>">
									<font id="if_post_<?php echo $province_val['region_id']?>"><?php echo $province_val['region_name']?></font>
                                </div>
                                <div class="region_right">
                                    <img src="/common/images/X_20.gif" id="X_<?php echo $province_val['region_id']?>" <?php if($province_val['if_post'] == 1):?> style="display:none"<?php endif;?> onclick="if_post(<?php echo $province_val['region_id']?>)" />
                                    <img src="/common/images/V_20.gif" id="V_<?php echo $province_val['region_id']?>" <?php if($province_val['if_post'] == 0):?> style="display:none"<?php endif;?> onclick="if_post(<?php echo $province_val['region_id']?>)" />
                                </div>
                            </div>
                        <?php endforeach;?>
                	</div>
                	</div>
					<div id="city">
                    	&nbsp;
                    </div>
					<div id="district" style="width:250px; float:left; text-align:center">
                    	&nbsp;
                	</div>
				</div>
				<div style="clear:left"></div>
				<div class="show_options">
				<?php echo $this->pagination->create_links();?>
				</div>
			</div>
		</div>
		<div class="main_bottom"></div>
	</div>
	
	 <div id="showBox" style="display: none;"></div><!-- 存放弹出层临时内容 //-->