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
<link href="/themes/default/css/list.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/themes/default/js/mSize.js"></script>

<?php echo $this->smarty_insert_scripts(array('files'=>'common.js,global.js,compare.js')); ?>
</head>
<body>
<?php echo $this->fetch('library/page_header.lbi'); ?>
<div class="main">
<div class="cate-banner">
    <div class="container">
        <h3>线 香</h3>
        <p>活放情前、種而又解積苦生：響活中不賽給間可到式失花細；把示否密們眾張院計現異中媽命原能線？
服決中義名升照全過不的己量方就然怕小眾家始高個，大老行速，表全要至更照果，道式黃</p>
    </div>
</div>
<div class="listtop mtop10">


<div class="page">
<?php echo $this->fetch('library/pages_category.lbi'); ?>
</div>

<div class="lb">

	<div class="lb01">
        <form method="GET" name="listform">
        <font class="f01"><?php echo $this->_var['lang']['btn_display']; ?>：</font>
        <a href="javascript:;" onClick="javascript:display_mode('list')"><img class="mt05" src="themes/default/images/btn-imageSizeMedium<?php if ($this->_var['pager']['display'] == 'list'): ?>_act<?php endif; ?>.gif" alt="<?php echo $this->_var['lang']['display']['list']; ?>"></a>
        <a href="javascript:;" onClick="javascript:display_mode('grid')"><img class="mt05" src="themes/default/images/btn-imageSizeLarge<?php if ($this->_var['pager']['display'] == 'grid'): ?>_act<?php endif; ?>.gif" alt="<?php echo $this->_var['lang']['display']['grid']; ?>"></a>
        <a href="<?php echo $this->_var['script_name']; ?>.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=goods_id&order=<?php if ($this->_var['pager']['sort'] == 'goods_id' && $this->_var['pager']['order'] == 'DESC'): ?>ASC<?php else: ?>DESC<?php endif; ?>#goods_list"><img src="themes/default/images/goods_id_<?php if ($this->_var['pager']['sort'] == 'goods_id'): ?><?php echo $this->_var['pager']['order']; ?><?php else: ?>default<?php endif; ?>.gif" alt="<?php echo $this->_var['lang']['sort']['goods_id']; ?>"></a>
        <a href="<?php echo $this->_var['script_name']; ?>.php?category=<?php echo $this->_var['category']; ?>&display=<?php echo $this->_var['pager']['display']; ?>&brand=<?php echo $this->_var['brand_id']; ?>&price_min=<?php echo $this->_var['price_min']; ?>&price_max=<?php echo $this->_var['price_max']; ?>&filter_attr=<?php echo $this->_var['filter_attr']; ?>&page=<?php echo $this->_var['pager']['page']; ?>&sort=shop_price&order=<?php if ($this->_var['pager']['sort'] == 'shop_price' && $this->_var['pager']['order'] == 'ASC'): ?>DESC<?php else: ?>ASC<?php endif; ?>#goods_list"><img src="themes/default/images/shop_price_<?php if ($this->_var['pager']['sort'] == 'shop_price'): ?><?php echo $this->_var['pager']['order']; ?><?php else: ?>default<?php endif; ?>.gif" alt="<?php echo $this->_var['lang']['sort']['shop_price']; ?>"></a>
        
        <input type="hidden" name="category" value="<?php echo $this->_var['category']; ?>" />
        <input type="hidden" name="display" value="<?php echo $this->_var['pager']['display']; ?>" id="display" />
        <input type="hidden" name="brand" value="<?php echo $this->_var['brand_id']; ?>" />
        <input type="hidden" name="price_min" value="<?php echo $this->_var['price_min']; ?>" />
        <input type="hidden" name="price_max" value="<?php echo $this->_var['price_max']; ?>" />
        <input type="hidden" name="filter_attr" value="<?php echo $this->_var['filter_attr']; ?>" />
        <input type="hidden" name="page" value="<?php echo $this->_var['pager']['page']; ?>" />
        <input type="hidden" name="sort" value="<?php echo $this->_var['pager']['sort']; ?>" />
        <input type="hidden" name="order" value="<?php echo $this->_var['pager']['order']; ?>" />
        </form>
    </div>
    	    
    <div class="f_r seach">
           <form id="searchForm" name="searchForm" method="get" action="search.php" onSubmit="return checkSearchForm()"  >
           <input name="keywords" type="text" id="keyword" value="<?php echo htmlspecialchars($this->_var['search_keywords']); ?>" class="B_input" >
           <input name="imageField" type="submit" value="" class="go"  />
           </form>
    </div> 
</div>




</div>

<div class="clr"></div>

<?php echo $this->fetch('library/goods_list.lbi'); ?>
<div class="clr"></div>
<div class="listbottom"></div>

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
</body>
</html>
