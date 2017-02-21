<script type="text/javascript">
var process_request = "<?php echo $this->_var['lang']['process_request']; ?>";
</script>
<?php echo $this->smarty_insert_scripts(array('files'=>'utils.js')); ?>
<link rel="stylesheet" type="text/css" href="themes/default/css/index.css">
<?php 
$k = array (
  'name' => 'header',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>



