<?php $this->load->view('front/include/header');?>
<title>"简之美"摄影比赛</title>
<script src="http://g.tbcdn.cn/kissy/k/1.3.2/seed.js" data-config="{combine:true}"></script>
<script type="text/javascript">
	var session_id = '<?php echo session_id();?>';
</script>
</head>
<body>
<div id="pagewrap">
	<div id="page">
		<header id="top">
			<div id="bold_title"><a href="/season/index">"简之美"摄影比赛</a></div>
			<div id="ground">
				<div class="normal_title"><a href="/season/my_works">我的作品</a></div>
				<div class="normal_title" style="margin-right:0;"><a href="/season/rule">比赛规则</a></div>
				<div class="my_bt"><img id="file_upload" /></div>
			</div>
			<p id="descript">提示：描述不超过50个字，最多上传3张作品，单张大小不超过3M</p>
		</header>
		<div class="clear"></div>
		<article id="content">
			<div id="ColumnContainer"></div>
			<!--<?php foreach( $aSeasonInfo as $key => $val ):?>
			<div class="show">
				<a href="/season/season_info/<?php echo $val['id'];?>"><img src="<?php echo $val['img'];?>" class="tu" /></a>
				<div class="show_text">赞：<?php echo $val['prizecount'];?> <img class="zan" onClick="zan(<?php echo $val['id'];?>)" src="/common/images/xin.gif" /></div>
			</div>
			<?php endforeach;?>-->
			<div class="clear"></div>
		</article>
	</div>
</div>
<script type="tpl" id="tpl">
	<div class="show ks-waterfall">
		<a class="image" href="/season/season_info/{id}"><img height="{height}" src="{img}" /></a>
		<div class="show_text">赞：{prizecount} <img class="zan" onClick="zan({id})" src="/common/images/xin.gif" /></div>
	</div>
	
</script>
		 
<script type="text/javascript">
$(function(){
	var window_width = $(window).width();//浏览器当前窗口文档对象宽度
	//alert(window_width);
	var aWidth = check_width();
	var imageWidth = aWidth[0];
	var colWidth = aWidth[1];
	//alert(colWidth);
	imageWidth = 130;
	var waterfall;
	KISSY.use("waterfall,node,ajax", function (S, Waterfall, Node,IO) {
		var $ = Node.all;
	
		var tpl = ($('#tpl').html()),
			nextpage = 1;
			waterfall = new Waterfall.Loader({
				container:"#ColumnContainer",
				// 窗口大小变化时的调整特效
				adjustEffect:{
					duration:0.5,
					easing:"easeInStrong"
				},
				load:function (success, end) {
					$('#loadingPins').show();
					IO({
						data:{
							'page':nextpage,
							'per_page':2,
						},
						url:'/season/ajax_season',
						dataType:"json",
						//jsonp:"jsoncallback",
						success:function (d) {
							// 如果数据错误, 则立即结束
							/*if (d['stat'] !== 'ok') {
								alert('load data error!');
								end();
								return;
							}*/
							// 如果到最后一页了, 也结束加载
							nextpage = parseInt(d['photos'].page) + 1;
							if ( d['photos'].num == 0 ) {
								end();
								return;
							}
							// 拼装每页数据
							var items = [];
							S.each(d['photos']['photo'], function (item) {
								//item.height = Math.round(Math.random() * (300 - 180) + 180); // fake height
								item.height = parseInt((item.height/item.width) * imageWidth);
								items.push(new S.Node(S.substitute(tpl,item)));
								
							});
							success(items);
						},
						complete:function () {
							$('#loadingPins').hide();
						}
					});
				},
				minColCount:2,
				colWidth:140
			});
	});

	// 用户变化屏幕方向时调用
	//$(window).bind( 'orientationchange', function(e){
		
	//});
})
function check_width(){
	var aWidth = new Array();　//创建一个数组
	var window_width = $(window).width();//浏览器当前窗口文档对象宽度
	if( window_width < 360 ){
		aWidth[0] = 130;
		aWidth[1] = 150;
	} else if( window_width >= 360 && window_width < 480 ){
		aWidth[0] = 150;
		aWidth[1] = 170;
	} else if( window_width >= 480 && window_width < 750 ){
		aWidth[0] = 170;
		aWidth[1] = 190;
	} else {
		aWidth[0] = 190;
		aWidth[1] = 210;
	}
	return aWidth;
}
</script> 
<input type="hidden" id="ssoid"	value="<?php echo $aUserInfo['ssoid'];?>" />
<?php $this->load->view('front/include/footer');?>