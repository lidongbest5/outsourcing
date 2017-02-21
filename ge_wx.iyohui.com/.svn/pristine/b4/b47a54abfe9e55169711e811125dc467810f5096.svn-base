<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Layout
{
    var $obj;
    var $layout;
    static private $DefaultVar;

    function Layout($params = array())
    {
    	self::getDefaultVar();
        $this->obj =& get_instance();
        if (count($params) > 0)
        {
            $this->initialize($params);
        }
        else
        {
            $this->layout = 'layout_main';
        }
    }

    function set($tpl)
    {
    	if($tpl!=null)
    	{
    		$this->Layout = $tpl;
    	}
    }

    function initialize($params = array())
    {
        if (count($params) > 0)
        {
            foreach ($params as $key => $val)
            {
                $this->$key = $val;
            }
        }
    }

	static private function getDefaultVar(){
		$CI =& get_instance();
		$CI->config->load("Layout", TRUE);
		self::$DefaultVar = $CI->config->item('Layout', 'Layout');
	}

    function view($view, $data=null, $return=false)
    {
    	//默认载入在config中需要用到的变量
    	$aRequireRegister = array_diff_key(self::$DefaultVar, $data);
    	foreach ($aRequireRegister as $key => $value) {
			$data[$key] = $value;
    	}
    	//print_r($data);
        $data['content_for_layout'] = $this->obj->load->view($view,$data,true);
        if($return)
        {
            $output = $this->obj->load->view($this->layout,$data, true);
            return $output;
        }
        else
        {
            $this->obj->load->view($this->layout,$data, false);
        }
    }
}

/* End of file Layout.php */
/* Location: ./system/application/libraries/Layout.php */