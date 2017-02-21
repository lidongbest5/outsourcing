<div class="tab_div">
	<div class="tab_list<?php if($which == 'awards'):?>_1<?php endif;?>">
        <a href="/admin/awards/index"><b>奖品管理</b></a>
    </div>
    <div class="tab_list<?php if($which == 'prize'):?>_1<?php endif;?>">
        <a href="/admin/prize/index"><b>获奖名单</b></a>
    </div>
    <!--<div class="tab_list<?php if($which == 'export'):?>_1<?php endif;?>">
        <a href="/admin/export/index">导出/导入</a>
    </div>
    <div class="tab_list<?php if($which == 'hongbao'):?>_1<?php endif;?>">
        <a href="/admin/hongbao/index">红包客户(<?php echo $hongbao_nums?>)</a>
    </div>-->
    
    <div style=" float:left; width: 300px;">&nbsp;
    	<?php if($user['uid'] != NULL):?>
    		欢迎您: <?php echo $user['uid']?>，
        	<a href="/admin/manage/logout">退出</a>
        <?php else:?>
        	欢迎您，
        	<a href="/admin/manage/logout">清登录</a>
        <?php endif;?>
    </div>
</div>