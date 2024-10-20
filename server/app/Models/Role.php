<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'uuid';
    }

    /**
     * Standard boot function for defining proper action handling.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function (Role $role) {
            $role->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the client employees having this role.
     *
     * @return HasMany
     */
    public function clientEmployees(): HasMany
    {
        return $this->hasMany(ClientEmployee::class);
    }

    /**
     * Get the bank employees having this role.
     *
     * @return HasMany
     */
    public function bankEmployees(): HasMany
    {
        return $this->hasMany(BankEmployee::class);
    }
}
