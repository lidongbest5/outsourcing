<?php
/*
 * 额外添加js
 * jquery.js 被添加到header里面
 */
if ($LoadFile['js'] != NULL){
	if( $static == 1 ){
		foreach ( $LoadFile['js'] as $v )
		{
			$file = base_url()."common/js/".$v.".js";
			$content_js .= file_get_contents($file);
		}
		if( $which == 'prize' ){
			$name = FCPATH."common/html/".$which."/plan_".$plan_type."/js/index.js";
			$k=fopen($name,"w");
			fwrite($k,$content_js);
			fclose($k);
			echo "<script type=\"text/javascript\" src=\"" . base_url() . "common/html/".$which."/plan_".$plan_type."/js/index.js \"></script>\n";
		}
		if( $which == 'hongbao' ){
			$name = FCPATH."common/html/".$which."/js/index.js";
			$k=fopen($name,"w");
			fwrite($k,$content_js);
			fclose($k);
			echo "<script type=\"text/javascript\" src=\"" . base_url() . "common/html/".$which."/js/index.js \"></script>\n";
		}
		
		
	} else {
		foreach ( $LoadFile['js'] as $v )
		{
			//echo '<script type="text/javascript" src="' . base_url() . 'common/js/' . $v['file'] . '.js?time='.time().'"></script>';
			echo "<script type=\"text/javascript\" src=\"" . base_url() . "common/js/" . $v . ".js?time=" . time() . "\"></script>\n";
		}
	}
}
?>
