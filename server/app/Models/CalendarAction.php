<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class CalendarAction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'client_employee_id',
        // 'bank_employee_id',
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

        static::creating(function (CalendarAction $calendarAction) {
            $calendarAction->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the client employee that demanded creation of calendar action.
     *
     * @return BelongsTo
     */
    public function clientEmployee(): BelongsTo
    {
        return $this->belongsTo(ClientEmployee::class);
    }

    // /**
    //  * Get the bank employee that is responsible for calendar action.
    //  *
    //  * @return BelongsTo
    //  */
    // public function bankEmployee(): BelongsTo
    // {
    //     return $this->belongsTo(BankEmployee::class);
    // }

    /**
     * Get the statuses of the calendar action.
     *
     * @return HasMany
     */
    public function calendarActionStatuses(): HasMany
    {
        return $this->hasMany(CalendarActionStatus::class)
            ->orderBy('created_at','desc');
    }

    /**
     * Get the latest status of the calendar action.
     *
     * @return HasOne
     */
    public function calendarActionStatus(): HasOne
    {
        return $this->hasOne(CalendarActionStatus::class)
            ->latestOfMany();
    }

    /**
     * Get the tags of the calendar action.
     *
     * @return HasMany
     */
    public function calendarActionTags(): BelongsToMany
    {
        return $this->belongsToMany(CalendarActionTag::class);
    }

    /**
     * Get the events of the calendar action.
     *
     * @return HasMany
     */
    public function calendarEvents(): HasMany
    {
        return $this->hasMany(CalendarEvent::class);
    }
}
