<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Config extends Eloquent
{
	protected $collection = 'configs';
}
