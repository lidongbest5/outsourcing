<?php
require_once realpath ( dirname ( __FILE__ ) ) . '/RedisObject.php';
class PhpRedisObject extends RedisObject {
	private $try = false;
	protected function setDefaultRedisServer($host = '127.0.0.1', $port = '6379', $try = false) {
		try {
			$this->try = $try;
			$this->redis = new Redis ();
			$this->redis->connect ( $host, $port );
		} catch ( RedisException $e ) {
			if ($this->try == false) {
				$this->setDefaultRedisServer ( '172.16.33.18', '6379', true );
			} else {
				return $this->ReportError ( 'connection error:' . $e->getMessage () );
			}
		}
	}
}
