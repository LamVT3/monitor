<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Server extends Eloquent
{
    protected $collection = 'servers';
}
