<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class System extends Eloquent
{
    protected $collection = 'systems';
}
