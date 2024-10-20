<?php

namespace App\Models;

use App\Helpers\PermissionScopes;
use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    use PermissionScopes;
}
