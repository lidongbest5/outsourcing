<div id="append_parent"></div>
<?php if ($this->_var['user_info']): ?>
<?php echo $this->_var['lang']['hello']; ?>��<font class="f4_b"><?php echo $this->_var['user_info']['username']; ?></font>, <?php echo $this->_var['lang']['welcome_return']; ?>��
<a href="user.php"><?php echo $this->_var['lang']['user_center']; ?></a>|
<a href="user.php?act=logout"><?php echo $this->_var['lang']['user_logout']; ?></a>
<?php else: ?>
 ��ã���ӭ Welcome&nbsp;|&nbsp;
 <a href="user.php">��¼ Sign In </a>&nbsp;|&nbsp;
 <a href="user.php?act=register">ע�� Register </a>&nbsp;|&nbsp;
 <img src="themes/default/images/top_01.gif" align="absmiddle" />
 <a href="/flow.php">����� Shopping Bag</a>&nbsp;|&nbsp;
 <img src="themes/default/images/top_2.gif" width="17" height="17" align="absmiddle" />
 <a href="/message.php">���԰� Online Talk </a>
<?php endif; ?>