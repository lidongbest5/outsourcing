<div class="main">
	<div class="configuration_discount" style="height: 300px; padding-top: 20px;">
		<div style="margin:0 auto; width: 400px; border: 1px solid #a5a5a5; padding: 20px; text-align:center;">
			<?php echo br(2)?>出错了:
			<?php echo br(4)?>
			<?php echo $ErrorMsg?>
			<?php if( $redirect ): ?>
			<?php echo br(2)?>
			<?php echo anchor($Taobao['api_container'] . '?appkey=' . $Taobao['api_key'], '您需要转向到淘宝登录')?>
			<?php endif?>
			<?php echo br(5)?>
		</div>
	</div>
</div>
<iframe style="display:none;" src="<?php echo $iframe?>" frameborder="0" scroll="no"></iframe>