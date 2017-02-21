	<!--内容开始-->
	<div class="main">
		<div class="main_top"></div>
		<div class="main_middle">
		  	<?php $this->load->view('front/include/menu');?>
			<div class="content">
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
				<div class="content_main">
					<form action="/admin/manage/login" method="post">
					<center>
						用户名:&nbsp;&nbsp;<input type="text" name="user" id="user" /><br /><br />
						密　码:&nbsp;&nbsp;<input type="password" name="pass" id="pass" /><br /><br />
						<input type="submit" name="submit" id="submit" value="登录" />&nbsp;&nbsp;
					</center>
				</div>
				<div style="clear:left"></div>
				<div class="content_main">
					<center>
						<br /><br />
						<font color="red" style="font-size: 16px;"><b><?php echo $message;?></b></font>
					</center>
				</div>
			</div>
		</div>
		<div class="main_bottom"></div>
	</div>
	<div id="tip_message" style="display:none; border:#999 solid 1px; background-color:#FFFFFF;">
        <span id="tip_content">
        </span>
    </div>