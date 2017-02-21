<style>
body{
	background:none;
}
</style>
	<!--内容开始-->
	<div class="main">
		<!--<div class="main_top"></div>-->
		<div class="main_middle">
			<div class="content" style="padding:0 10px; width:620px; border:1px solid #ddd;">
                <div class="text_info_img" style="height:auto; width:602px; padding-top:10px;">
                    <a target="_blank" href="<?php echo $aSeasonInfo['img']?>"><img src="<?php echo $aSeasonInfo['img']?>" width="602" /></a>
                </div>
                <div class="clear"></div>
                <hr class="hr" />
                <div class="video_info_share" style="float:left; width:300px; line-height:22px;">参&nbsp;&nbsp;赛&nbsp;&nbsp;人：<?php echo $aSeasonInfo['ssoid'];?></div>
                <div class="video_info_share" style="float:left; width:200px; line-height:22px;"><?php echo date("Y-m-d",$aSeasonInfo['addtime']);?></div>
                <div class="video_info_share" style="float:right; width:100px; text-align:right; line-height:22px;">赞：<?php if( $aSeasonInfo['prize_count'] != '' ): echo $aSeasonInfo['prize_count']; else: echo 0; endif;?> <img src="/common/images/xin.jpg" /></div>
                <div style="clear:left"></div>
                <div class="video_info_share" style=" line-height:22px;">所属部门：<?php echo $aSeasonInfo['department'];?></div>
        		<div class="video_info_share" style=" line-height:22px; height:auto; padding-bottom:10px;"><?php echo $aSeasonInfo['content'];?></div>
            </div>
            <div style="clear:left"></div>
		</div>
		<div class="main_bottom"></div>
	</div>
	<div id="tip_message" style="display:none; border:#999 solid 1px; background-color:#FFFFFF;">
        <span id="tip_content">
        </span>
    </div>
    <div id="showBox" style="display: none;"></div><!-- 存放弹出层临时内容 //-->
