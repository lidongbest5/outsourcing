<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Config
 * support congig like aa/bb/cc
 * useage:
 * $this->config->item('aa/bb/cc');
 *
 *
 * @package		CodeIgniter
 * @author		nevergreen <xnevergreen@163.com>
 * @license		http://www.soso2.com
 * @link		http://www.soso2.com
 * @since		Version 1.0
 * @filesource
 */

class MY_Config extends CI_Config {

	function MY_Config(){
        parent::CI_Config();
    }

	// --------------------------------------------------------------------

	/**
	 * Fetch a config file item
	 * $item can write like 'aa/bb/cc'
	 *
	 *
	 * @author	nevergreen <xnevergreen@163.com>
	 * @access	public
	 * @param	string	the config item name
	 * @param	string	the index name
	 * @param	bool
	 * @return	string
	 */
	function item($item, $index = '')
	{
		$aItem = explode('/', $item);
		if(count($aItem)>=2){ //配置是多为数组，即路径中含有/的
			if ($index == '')
			{
				$string_config = '$ItemValue = $this->config';
				$key_config = '$obj = $this->config';
				$tmp_config = '';
				foreach($aItem as $value){
					eval($key_config.$tmp_config.';');
					//echo "<br /><br />当前数组:";
					//print_r($obj);

					$Exist = @array_key_exists($value, $obj);
					//echo " <br />Exist: $value -> ".($Exist==false?0:1)."<br />";
					if(!$Exist) {
						return false;
					}
					unset($obj);

					$string_config .= '[\''.$value.'\']';
					$tmp_config .=  '[\''.$value.'\']';
					//echo $tmp_config."<br />";
				}
				$string_config .= ';';
				eval($string_config);

				if ( ! isset($ItemValue))
				{
					return FALSE;
				}

				$pref = $ItemValue;
			}
			else
			{
				$string_config = '$ItemValue = $this->config[\''.$index.'\']';
				$key_config = '$obj = $this->config';
				$tmp_config = '';
				foreach($aItem as $value){
					eval($key_config.'[\''.$index.'\']'.$tmp_config.';');
					//echo "<br /><br />当前数组:";
					//print_r($obj);

					$Exist = @array_key_exists($value, $obj);
					//echo " <br />Exist: $value -> ".($Exist==false?0:1)."<br />";
					if(!$Exist) {
						return false;
					}
					unset($obj);

					$string_config .= '[\''.$value.'\']';
					$tmp_config .=  '[\''.$value.'\']';
					//echo $tmp_config."<br />";
				}
				$string_config .= ';';
				eval($string_config);

				if ( ! isset($this->config[$index]))
				{
					return FALSE;
				}

				if ( ! isset($ItemValue))
				{
					return FALSE;
				}

				$pref = $ItemValue;
			}

		} else { //原始代码

			if ($index == '')
			{
				if ( ! isset($this->config[$item]))
				{
					return FALSE;
				}

				$pref = $this->config[$item];
			}
			else
			{
				if ( ! isset($this->config[$index]))
				{
					return FALSE;
				}

				if ( ! isset($this->config[$index][$item]))
				{
					return FALSE;
				}

				$pref = $this->config[$index][$item];
			}
		}
		return $pref;
	}
}

// END CI_Config class

/* End of file MY_Config.php */
/* Location: ./system/application/libraries/MY_Config.php */