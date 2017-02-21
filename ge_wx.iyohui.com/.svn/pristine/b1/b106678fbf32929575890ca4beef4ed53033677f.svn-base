<?php if (!defined('BASEPATH')) exit('No direct script access allowed'); 

require_once realpath ( dirname ( __FILE__ ) ) . '/cache/RedisServer.php';

class cache {
	
	private static $instance;
	
	private $driver;

	private $host = 'localhost';

	private $port = '6379';

	private $pass = '';
	
	public function __construct() {
		
		$this->driver = new RedisServer ();
		$this->driver->Auth($this->pass);
	}
	
	public static function factory($driver = 'redis') {
		if (self::$instance == null) {
			self::$instance = new self ();
		}
		return self::$instance;
	}

	public function setConfig($host, $port) {
		if( $host != NULL ) $this->host = $host;
		if( intval($port) > 0 ) $this->port = $port;
		if( $pass != NULL ) $this->pass = $pass;
	}
	
	public function save($k, $v, $ttl = 259200) {
		return $this->driver->SetEX ( $k, $ttl, $v );
	}
	
	public function push($k, $v) {
		return $this->driver->RPush ( $k, $v );
	}
	
	public function pop($k) {
		return $this->driver->LPop ( $k );
	}
	
	public function len($k) {
		return $this->driver->LLEN ( $k );
	}
	
	public function read($k) {
		return $this->driver->Get ( $k );
	}

	public function del($k) {
		return $this->driver->Del ( $k );
	}
	
	public function get_keys() {
		return $this->driver->Keys ( '*' );
	}
	
	public function getLastErr() {
		return $this->driver->getLastErr ();
	}
	
	public function get_stat() {
		return $this->driver->info ();
	}
	
	public function getErrLog() {
		return $this->driver->getErrLog ();
	}
	public function flushdb() {
		return $this->driver->FlushDB();
	}
}