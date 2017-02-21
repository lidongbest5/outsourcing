<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="Generator" content="ECSHOP v2.7.2" />
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />
<title><?php echo $this->_var['page_title']; ?></title>
<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link href="/themes/default/css/common.css" rel="stylesheet" type="text/css" />
<link href="/themes/default/css/goods.css" rel="stylesheet" type="text/css" />
<link href="/themes/default/css/list.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/themes/default/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="/themes/default/js/jqzoom.pack.1.0.1.js"></script>
<script type="text/javascript" src="/themes/default/js/mSize.js" ></script>

<script type="text/javascript"> 
$(function() {
var options =
	  {
		  zoomWidth: 450,
		  zoomHeight: 485,
		  title :false
	  }
	  $(".jqzoom").jqzoom(options);
});
</script>

<?php echo $this->smarty_insert_scripts(array('files'=>'common2.js,json2.js,transport2.js')); ?>

<base target="_blank"/>
</head>
<body>
<?php echo $this->fetch('library/page_header.lbi'); ?>


<div class="main">
<div class="listtop mtop10"  >
<div class="f_r seach" style="float:right">
           <form id="searchForm" name="searchForm" method="get" action="search.php" onSubmit="return checkSearchForm()"  >
           <input name="keywords" type="text" id="keyword" value="<?php echo htmlspecialchars($this->_var['search_keywords']); ?>" class="B_input" >
           <input name="imageField" type="submit" value="" class="go"  />
           </form>
</div>
<div style=" float:right; margin-right:20px; height:17px; ">
<a href="<?php echo $this->_var['prev_good']['url']; ?>"><img alt="prev" src="themes/default/images/up.gif" /></a>
<a href="<?php echo $this->_var['next_good']['url']; ?>"><img alt="next" src="themes/default/images/down.gif" /></a>
</div>

<div class="clr"></div>
</div>
<div class="wind978">
  <div class="left viewpic">
	<div class="sp1">
     <?php $_from = $this->_var['pictures']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'picture');$this->_foreach['picture'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['picture']['total'] > 0):
    foreach ($_from AS $this->_var['picture']):
        $this->_foreach['picture']['iteration']++;
?>
        <?php if ($this->_foreach['picture']['iteration'] == 2): ?>
        
    <a href="<?php echo $this->_var['picture']['img_original']; ?>" id="mainImg" class="jqzoom" target="_blank">
		<img src="<?php echo $this->_var['picture']['img_url']; ?>" id="mainPicture"  class="goodsimg" />
    </a>
     <?php endif; ?>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div>
	<div class="sp2">
        <ul id="Tab1">
        <?php if ($this->_var['pictures']): ?>
        <?php $_from = $this->_var['pictures']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'picture');$this->_foreach['picture'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['picture']['total'] > 0):
    foreach ($_from AS $this->_var['picture']):
        $this->_foreach['picture']['iteration']++;
?>
        <?php if ($this->_foreach['picture']['iteration'] > 1): ?> 
        <?php if ($this->_foreach['picture']['iteration'] == 2): ?> 
             <li><a class="current" href="javascript:void(0)" target="_self" onclick="showImg(<?php echo $this->_foreach['picture']['iteration']; ?>);"><?php echo $this->_foreach['picture']['iteration']; ?></a></li>
       <?php else: ?>
        <li><a href="javascript:void(0)" target="_self" onclick="showImg(<?php echo $this->_foreach['picture']['iteration']; ?>);"><?php echo $this->_foreach['picture']['iteration']; ?></a></li>
        <?php endif; ?>
        <?php endif; ?>
       <?php if ($this->_foreach['picture']['iteration'] > 1): ?>
               <input type="hidden" id=img_original_<?php echo $this->_foreach['picture']['iteration']; ?> value="<?php echo $this->_var['picture']['img_original']; ?>"/>
        <input type="hidden" id=img_goods_<?php echo $this->_foreach['picture']['iteration']; ?> value="<?php echo $this->_var['picture']['img_url']; ?>"/>

      
		  <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        <?php endif; ?>
        </ul>
		<script type="text/javascript">
        function showImg(imgId){
        var img_original = document.getElementById('img_original_'+imgId).value;
        var img_goods = document.getElementById('img_goods_'+imgId).value;
        document.getElementById('mainPicture').src=img_goods;
        document.getElementById('mainImg').href=img_original;
		
		showTab(imgId);
        }
        
		//选项卡切换
		function showTab(n){
			var h=document.getElementById("Tab1").getElementsByTagName("a");
			for(var i=0;i<h.length;i++){

				if(n-2==i){
					h[i].className="current";
				}
				else {
					h[i].className=" ";
				}
			}
		}  
    </script>  
    </div>	
    
    </div>
  <div class="viewcontent right">
		<div class="left viewlieft">
        <form action="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" target="_self" method="post" name="ECS_FORMBUY" id="ECS_FORMBUY" >
          <ul class="tb-meta">
          <li><h3><?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?></h3></li>
          <?php if ($this->_var['goods']['goods_brand'] != "" && $this->_var['cfg']['show_brand']): ?>
          <li><span>品    牌：</span>><a href="<?php echo $this->_var['goods']['goods_brand_url']; ?>" ><?php echo $this->_var['goods']['goods_brand']; ?></a></li>          <?php endif; ?>
          <li><span>货　　号：</span><?php echo $this->_var['goods']['goods_sn']; ?></li>
          <li><span>价　　格：</span><strong class="tb-price"><?php echo $this->_var['goods']['market_price']; ?></strong></li>
          <li><span>详细介绍：</span><p class="clear"></p></li>
          <li><div class="goods-desc"><?php echo $this->_var['goods']['goods_desc']; ?></div></li>
         </ul>
           <div class="tb-key">
           
            <?php $_from = $this->_var['specification']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('spec_key', 'spec');if (count($_from)):
    foreach ($_from AS $this->_var['spec_key'] => $this->_var['spec']):
?>
            <dl class="tb-prop tb-clearfix">
            <dt><?php echo $this->_var['spec']['name']; ?>：</dt>
            <dd>
            <ul class="tb-clearfix" data-property="<?php echo $this->_var['spec']['name']; ?>" id="tab<?php echo $this->_var['spec_key']; ?>">
            
            <?php if ($this->_var['spec']['attr_type'] == 1): ?>
            <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
            <li <?php if ($this->_var['key'] == 0): ?>class="tb-selected"<?php endif; ?> >
            <a title="<?php echo $this->_var['value']['label']; ?>" href="javascript:void(0);" target="_self" onclick="changeProperty(<?php echo $this->_var['spec_key']; ?>,<?php echo $this->_var['key']; ?>,<?php echo $this->_var['value']['id']; ?>)"><span><?php echo $this->_var['value']['label']; ?></span></a>
             <i <?php if ($this->_var['key'] != 0): ?>class="none"<?php endif; ?>>已选中</i>
            <?php if ($this->_var['key'] == 0): ?><input type="hidden" name="spec_<?php echo $this->_var['spec_key']; ?>" value="<?php echo $this->_var['value']['id']; ?>" id="spec_value_<?php echo $this->_var['spec_key']; ?>" /><?php endif; ?>
            </li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            
            <?php endif; ?>
            </ul>
            </dd>
            </dl>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            

			
            <dl class="tb-prop tb-clearfix">
                <dt>我 要 买：</dt>
                <dd>
                <input name="number" type="text" id="number" value="1" size="4"  class="tb-text" title="请输入购买量" maxlength="8" /><?php echo $this->_var['goods']['measure_unit']; ?>
                <em>(库存<span class="tb-count"><?php echo $this->_var['goods']['goods_number']; ?></span><?php echo $this->_var['goods']['measure_unit']; ?>)</em>
               </dd>
            </dl>
            
            <div style="margin-top:15px;">
			<div style="margin-top:15px;">
            <div class="addtocart">
            <a href="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" target="_self"><img src="themes/default/images/button.jpg" /></a></div>
            
          <div class="bshare-custom bshare"><a title="分享到QQ空间" class="bshare-qzone"></a><a title="分享到新浪微博" class="bshare-sinaminiblog"></a><a title="分享到人人网" class="bshare-renren"></a><a title="分享到腾讯微博" class="bshare-qqmb"></a><a title="分享到豆瓣" class="bshare-douban"></a><a title="更多平台" class="bshare-more bshare-more-icon more-style-sharethis"></a><span class="BSHARE_COUNT bshare-share-count">0</span></div><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script><script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
            
            <div class="clr"></div>
            </div>
			</div>
</div>
				
		<div class="clr"></div>
        </form>	
		</div>
	
		<div class="right viewright">
			可能喜欢<br />
			<div class="viewpic">
				<ul>
                 <?php $_from = $this->_var['related_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'releated_goods_data');if (count($_from)):
    foreach ($_from AS $this->_var['releated_goods_data']):
?>
                 <li><a href="<?php echo $this->_var['releated_goods_data']['url']; ?>"><img src="<?php echo $this->_var['releated_goods_data']['goods_thumb']; ?>" alt="<?php echo $this->_var['releated_goods_data']['goods_name']; ?>" width="100" height="106"  onload="mSize(this,100,106);"/></a></li>
                  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
				</ul>
			</div>
		</div>
	</div>
  <div class="clr"></div>
</div>
<div class="clr"></div>
<div class="listbottom"></div>

<div class="good-main">
  <div class="container">
    <div class="good-nav">
      <a class="selected" data-type="1">详细介绍</a>
      <a data-type="2">原料属性</a>
      <a data-type="3">更多属性</a>
      <a data-type="4">慈善留言</a>
    </div>
    <div class="good-detail good-detail1 clearfix">
      <img src="themes/default/images/img1.png">
      <h3>PAN 香</h3>
      <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？
服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？

服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？</p>
    </div>
    <div class="good-detail good-detail2 clearfix">
            <img src="themes/default/images/img1.png">
            <h3>PAN 香</h3>
            <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？
      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？

      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？</p>
    </div>
    <div class="good-detail good-detail3 clearfix">
            <img src="themes/default/images/img1.png">
            <h3>PAN 香</h3>
            <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？
      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？

      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？</p>
    </div>
    <div class="good-detail good-detail4 clearfix">
            <img src="themes/default/images/img1.png">
            <h3>PAN 香</h3>
            <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？
      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？

      服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？</p>
    </div>
  </div>
</div>
<div class="introduction">
  <div class="introduction-img"><img src="themes/default/images/intro_img.png"></div>
  <div class="introduction-text">
    <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果.</p>
    <a href="www.seeschau.ch">www.seeschau.ch</a>
  </div>
</div>
<div class="contact">
  <div class="title"><span>聯繫我們</span></div>
  <img src="themes/default/images/mail.png" class="mail-img">
  <div class="contact-submit">
    <input type="text" placeholder="Type your email address here">
    <a>提交</a>
  </div>
  <div class="contact-info">
    联系我们，了解更多产品信息        <span>电子邮箱：</span>contact@hope-insence.com        <span>免费电话：</span>400－088－0846        <span>官方网站：</span>www.hope-insence.com
  </div>
</div>
</div>
<?php echo $this->fetch('library/page_footer.lbi'); ?>
<script>

//选择商品属性
function changeProperty(n1,n2,n3){
	var I=document.getElementById("tab"+n1).getElementsByTagName("i");
	var L=document.getElementById("tab"+n1).getElementsByTagName("li");
	//var H=document.getElementById("tab"+n1).getElementsByTagName("input");
	for(var i=0;i<L.length;i++){
		//alert(i)
		if(n2==i){
			L[i].className="tb-selected";
			I[i].className="";
			document.getElementById("spec_value_"+n1).value = n3;
		}
		else {
			L[i].className="";
			I[i].className="none";
		}
	}
}

</script>
</body>
</html>

