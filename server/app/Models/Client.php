<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'bank_employee_id',
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

        static::creating(function (Client $client) {
            $client->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the client employees for the client.
     *
     * @return HasMany
     */
    public function clientEmployees(): HasMany
    {
        return $this->hasMany(ClientEmployee::class);
    }

    /**
     * Get the general advisor for the client.
     *
     * @return BelongsTo
     */
    public function bankEmployee(): BelongsTo
    {
        return $this->belongsTo(BankEmployee::class);
    }
}
