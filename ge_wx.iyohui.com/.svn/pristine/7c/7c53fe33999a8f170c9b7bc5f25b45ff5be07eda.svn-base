<?php

require_once realpath ( dirname ( __FILE__ ) ) . '/MultiAccess.php';

class ReadOnlyAccess extends MultiAccess {
	public function get_access_write(&$auto_unlocker_reference) {
		return false;
	}
}
