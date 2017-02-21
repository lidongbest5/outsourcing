<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * @author	nevergreen <xnevergreen@163.com>
 * 增加了model_with_params方法,可以传入参数,例如:
 * $this->load->model_with_params('Taobao_model', 'taobao', $this->config->item('taobaoke_active'));
 *
 */

// ------------------------------------------------------------------------

/**
 * Loader Class
 *
 * Loads views and files
 *
 * @package		CodeIgniter
 * @subpackage	Libraries
 * @author		ExpressionEngine Dev Team
 * @category	Loader
 * @link		http://codeigniter.com/user_guide/libraries/loader.html
 */
class MY_Loader extends CI_Loader {

	// All these are set automatically. Don't mess with them.
	var $_ci_models			= array();
	var $_ci_helpers		= array();
	

	/**
	 * Constructor
	 *
	 * Sets the path to the view files and gets the initial output buffering level
	 *
	 * @access	public
	 */
	function MY_Loader()
	{	
		parent::CI_Loader();
	}

	// --------------------------------------------------------------------
	
	/**
	 * Model Loader
	 *
	 * This function lets users load and instantiate models.
	 *
	 * @access	public
	 * @param	string	the name of the class
	 * @param	string	name for the model
	 * @param	bool	database connection
	 * @return	void
	 */	
	function model_with_params($model, $name = '', $params = array(), $db_conn = FALSE)
	{		
		if (is_array($model))
		{
			foreach($model as $babe)
			{
				$this->model($babe);	
			}
			return;
		}

		if ($model == '')
		{
			return;
		}
	
		// Is the model in a sub-folder? If so, parse out the filename and path.
		if (strpos($model, '/') === FALSE)
		{
			$path = '';
		}
		else
		{
			$x = explode('/', $model);
			$model = end($x);			
			unset($x[count($x)-1]);
			$path = implode('/', $x).'/';
		}
	
		if ($name == '')
		{
			$name = $model;
		}
		
		if (in_array($name, $this->_ci_models, TRUE))
		{
			return;
		}
		
		$CI =& get_instance();
		if (isset($CI->$name))
		{
			show_error('The model name you are loading is the name of a resource that is already being used: '.$name);
		}
	
		$model = strtolower($model);
		
		if ( ! file_exists(APPPATH.'models/'.$path.$model.EXT))
		{
			show_error('Unable to locate the model you have specified: '.$model);
		}
				
		if ($db_conn !== FALSE AND ! class_exists('CI_DB'))
		{
			if ($db_conn === TRUE)
				$db_conn = '';
		
			$CI->load->database($db_conn, FALSE, TRUE);
		}
	
		if ( ! class_exists('Model'))
		{
			load_class('Model', FALSE);
		}

		require_once(APPPATH.'models/'.$path.$model.EXT);

		$model = ucfirst($model);
				
		$CI->$name = new $model( ($params == NULL ? '' : $params) );
		$CI->$name->_assign_libraries();
		
		$this->_ci_models[] = $name;	
	}
}

/* End of file Loader.php */
/* Location: ./system/application/libraries/Loader.php */