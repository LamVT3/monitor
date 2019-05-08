<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class DiskUsage extends Eloquent
{
    protected $collection = 'disk_usages';
}
