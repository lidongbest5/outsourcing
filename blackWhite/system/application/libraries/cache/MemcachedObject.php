<?php
require_once realpath ( dirname ( __FILE__ ) ) . '/MemcacheObject.php';
require_once realpath ( dirname ( __FILE__ ) ) . '/MemcachedDecorator.php';

class MemcachedObject extends MemcacheObject {
	protected function setMemcacheObject($host = 'localhost', $port = 11211) {
		$this->memcache = new MemcachedDecorator ( $host, $port );
	}
}
