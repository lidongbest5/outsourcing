<header>
	<div class="container clearfix">
		<a class="header-logo"><img src="themes/default/images/logo_big.png"></a>
		<div class=""></div>
		<nav>
			<a class="home" href="/"></a>
			<a href="/article_cat.php?id=6">�����Ļ�</a>                
			<a href="/category.php?id=1">����aƷ</a>                
			<a href="charity.php">��۷���</a>                
			<a href="about.php">�M��</a>
			<div class="header-right">
				<div id="append_parent"></div>
								<?php if ($this->_var['user_info']): ?>
				<?php echo $this->_var['lang']['hello']; ?>��<font class="f4_b"><?php echo $this->_var['user_info']['username']; ?></font>, <?php echo $this->_var['lang']['welcome_return']; ?>��
				<a href="user.php"><?php echo $this->_var['lang']['user_center']; ?></a>|
				<a href="user.php?act=logout"><?php echo $this->_var['lang']['user_logout']; ?></a>
				<?php else: ?>
				 <a href="user.php">��¼</a>
				 <a href="user.php?act=register">ע��</a>
				 <a href="/flow.php">�����</a>
				 <a href="/message.php">���԰�</a>
				<?php endif; ?>
			</div>
		</nav>
	</div>
</header>