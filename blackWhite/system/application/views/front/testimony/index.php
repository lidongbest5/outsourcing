<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<script type="text/javascript" src="<?php echo base_url()?>common/js/jquery/jquery.js"></script>
<script src="http://g.tbcdn.cn/kissy/k/1.3.2/seed.js" data-config="{combine:true}"></script>
<?php
//额外添加css
if ($LoadFile['css'] != NULL){
	
	foreach ( $LoadFile['css'] as $v )
	{
		echo link_tag( base_url() . 'common/css/' . $v . '.css' );
	}
}
?>
<title>领导层证言</title>
</head>
<body>
<div id="pagewrap">
    <header class="top">
        领导层证言
    </header>
    <div class="textimony_menu"<?php if($column == 1 ):?> style="background:#ddeefa; color:#0958a8"<?php endif;?> onClick="window.location.href='/testimony/index/1'">
    	How do you drive simplification <br />to reach +10pts in GEOs?
    </div>
    <div class="clear"></div>
    <div class="textimony_menu"<?php if($column == 2 ):?> style="background:#eaeec0; color:#389938"<?php endif;?> onClick="window.location.href='/testimony/index/2'">
    	How do you drive simplification <br />culture in your function?
    </div>
    <div class="clear"></div>
    <div class="textimony_menu"<?php if($column == 3 ):?> style="background:#fbebc2; color:#e3740e"<?php endif;?> onClick="window.location.href='/testimony/index/3'">
    	How do you drive personal <br />/ employee engagement in your function?
    </div>
    <div class="clear"></div>
    
    <?php foreach( $aTestimonyInfo as $key => $val ):?>
    <div class="testimony_info">
    	<div class="testimony_title">
        	<?php echo $val['title'];?>
        </div>
        <div class="testimony_content">
        	<?php echo $val['content'];?>
        </div>
    </div>
    <div class="testimony_zan">
    	<span class="zan_click" id="zan_click_<?php echo $val['id'];?>">赞（ <?php echo $val['prize_count'];?> ）</span>
    </div>
    <?php endforeach;?>
</div>
<input type="hidden" id="ssoid"	value="<?php echo $aUserInfo['ssoid'];?>" />
<?php $this->load->view('front/include/footer');?>
