<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class ClientEmployee extends Model
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
        'client_id',
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

        static::creating(function (ClientEmployee $clientEmployee) {
            $clientEmployee->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the client where the employee is hired.
     *
     * @return BelongsTo
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
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

    /**
     * Get the calendar actions that were issued by the employee.
     *
     * @return HasMany
     */
    public function calendarActions(): HasMany
    {
        return $this->hasMany(CalendarAction::class);
    }

    /**
     * Get the calendar events that were issued by the employee.
     *
     * @return BelongsToMany
     */
    public function calendarEvents(): BelongsToMany
    {
        return $this->belongsToMany(CalendarEvent::class)
            ->withPivot('accepted');
    }
}
