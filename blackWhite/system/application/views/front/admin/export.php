	<!--内容开始-->
	<div class="main">
		<div class="main_top"></div>
		<div class="main_middle">
        	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<div class="content_title">
					<div class="user">场次</div>
					<div class="oper">操作</div>
                    <div style=" width:600px; float:left">
                    	<form action="/admin/export/import" method="post" enctype="multipart/form-data">
                        	<input type="file" name="import" id="import" value="" />&nbsp;&nbsp;
                            <input type="submit" name="sub_imp" id="sub_imp" value="导入" />
						<?php if( $no != '' ):?>
							<?php if( $no == 'no1' ):?>
							<font color="#FF0000">csv匹配错误，内容格式不正确</font>
							<?php elseif ( $no == 'no2' ):?>
							<font color="#FF0000">文件格式不正确，只能是csv</font>
							<?php endif;?>
						<?php endif;?>
                        </form>
                    </div>
				</div>
				<div class="content_main">
				<?php foreach( $event as $key => $val ):?>
					<ul class="content_item">
						<li class="user"><?php echo $val.'点';?></li>
						<li class="oper">
							<input class="export" type="button" id="export_<?php echo $val; ?>" value="导出" />
							<!--<input class="create" type="button" id="create_<?php echo $val; ?>" value="生成名单" />-->
						</li>
					</ul>
				<?php endforeach;?>
				</div>
			</div>
		</div>
		<script language="javascript">
			$(function(){
				$(".export").click(function(){
					var id = $(this).attr("id").replace('export_','');
					//alert(id);
					window.location.href="/admin/export/download/22";
				});	
				$(".create").click(function(){
					var id = $(this).attr("id").replace('create_','');
					//window.location.href="/admin/export/download/22";
					$.get('/admin/html/create/'+id,function(data){//alert(data);
						if( data == 1 ){
							//alert("成功");
							var content = '<center>';
							content += '	<br/>';
							content += '		<h3 style="font-size: 12px; color: blue">';
							content += '		生成html页面成功！<br />';
							content += '		</h3>';
							content += '		<button onclick="$.modal.close();">知道了</button>';
							content += '</center>';
							popNotice('tip_message', 1, content, 300, 120);	
						} else {
							//alert("失败");
							var content = '<center>';
							content += '	<br/>';
							content += '		<h3 style="font-size: 12px; color: blue">';
							content += '		生成html页面成功！<br />';
							content += '		</h3>';
							content += '		<br /><button onclick="$.modal.close();">知道了</button>';
							content += '</center>';
							popNotice('tip_message', 1, content, 300, 120);	
						}
					});
				});	
			});		
		</script>
		<div class="main_bottom"></div>
	</div>
	<div id="tip_message" style="display:none; border:#999 solid 1px; background-color:#FFFFFF;">
        <span id="tip_content">
        </span>
    </div>
    <div id="showBox" style="display: none;"></div><!-- 存放弹出层临时内容 //-->
	 