<?php
class MY_URI extends CI_URI {
    function _filter_uri($str)
    {
        if ($str != '' AND $this->config->item('permitted_uri_chars') != '')
        {
            //$str = urlencode($str);
            //if ( ! preg_match("|^[".preg_quote($this->config->item('permitted_uri_chars'))."]+$|i", $str))
			if ( ! preg_match("|^[".str_replace(array('\\-', '\-'), '-', preg_quote($this->config->item('permitted_uri_chars'), '-'))."]+$|i", urlencode($str)))
            {
                exit('The URI you submitted has disallowed characters.');
            }
            $str = urldecode($str);
        }
        return $str;
    }

    function _clean_input_keys($str)
	{
		$config = &get_config('config');
		if ( ! preg_match("/^[".$config['permitted_uri_chars']."]+$/i", rawurlencode($str)))
		{
			exit('Disallowed Key Characters.');
		}
		return $str;
	}
}
?>