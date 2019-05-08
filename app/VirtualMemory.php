<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class VirtualMemory extends Eloquent
{
    protected $collection = 'virtual_memories';
}
