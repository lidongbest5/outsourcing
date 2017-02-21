<?php

require_once realpath(dirname(__FILE__) . '/../') . '/IMemoryStorage.php';

interface ISingleMemory extends IMemoryStorage
{
	public function getSingleMemory();

	public function setMutex(IMutex $mutex);
}
