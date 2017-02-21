<div class="wind978" style="_width:973px;">  
  <?php if ($this->_var['category'] > 0): ?>
  <form name="compareForm" action="compare.php" method="post" onSubmit="return compareGoods(this);">
  <?php endif; ?>
    <?php if ($this->_var['pager']['display'] == 'list'): ?>
    	<li class="l01"><img src="/images/ad/ad_small_<?php echo $this->_var['category']; ?>.jpg" /></li>
        <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['goods_list'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['goods_list']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['goods_list']['iteration']++;
?>
        <li class="l01"><a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo $this->_var['goods']['goods_name']; ?>" target="_blank">
        <img src="<?php echo $this->_var['goods']['goods_thumb']; ?>" onmousemove="javascript:document.images['img_small_<?php echo $this->_var['goods']['goods_id']; ?>'].src='<?php echo $this->_var['goods']['goods_img']; ?>';"
      onmouseout="javascript:document.images['img_small_<?php echo $this->_var['goods']['goods_id']; ?>'].src='<?php echo $this->_var['goods']['goods_thumb']; ?>'; return true;"
      name="img_small_<?php echo $this->_var['goods']['goods_id']; ?>" alt="<?php echo $this->_var['goods']['goods_name']; ?>"onload="mSize(this,322,344);"/></a></li>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    <?php else: ?>
    	<li class="l02"><img src="/images/ad/ad_big_<?php echo $this->_var['category']; ?>.jpg" /></li>
        <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
            <?php if ($this->_var['goods']['goods_id']): ?>
            <li class="l02"><a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo $this->_var['goods']['goods_name']; ?>" target="_blank">
            <img src="<?php echo $this->_var['goods']['goods_thumb']; ?>" onmousemove="javascript:document.images['img_big_<?php echo $this->_var['goods']['goods_id']; ?>'].src='<?php echo $this->_var['goods']['goods_img']; ?>';"
      onmouseout="javascript:document.images['img_big_<?php echo $this->_var['goods']['goods_id']; ?>'].src='<?php echo $this->_var['goods']['goods_thumb']; ?>'; return true;"
      name="img_big_<?php echo $this->_var['goods']['goods_id']; ?>" alt="<?php echo $this->_var['goods']['goods_name']; ?>" /></a></li>
            <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    <?php endif; ?>

  <?php if ($this->_var['category'] > 0): ?>
  </form>
  <?php endif; ?>

</div>
<div class="blank5"></div>
