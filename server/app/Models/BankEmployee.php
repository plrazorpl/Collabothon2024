<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class BankEmployee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'role_id',
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

        static::creating(function (BankEmployee $bankEmployee) {
            $bankEmployee->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the clients for the bank employee.
     *
     * @return HasMany
     */
    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    // /**
    //  * Get the calendar actions that the employee is responsible for.
    //  *
    //  * @return HasMany
    //  */
    // public function calendarActions(): HasMany
    // {
    //     return $this->hasMany(CalendarAction::class);
    // }

    /**
     * Get the calendar events that the employee is responsible for.
     *
     * @return BelongsToMany
     */
    public function calendarEvents(): BelongsToMany
    {
        return $this->belongsToMany(CalendarEvent::class)
            ->withPivot('accepted');
    }

    /**
     * Get the role of the employee.
     *
     * @return BelongsTo
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
