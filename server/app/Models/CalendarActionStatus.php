<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class CalendarActionStatus extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'calendar_action_id',
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

        static::creating(function (CalendarActionStatus $calendarActionStatus) {
            $calendarActionStatus->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the calendar action that has the status.
     *
     * @return BelongsTo
     */
    public function calendarAction(): BelongsTo
    {
        return $this->belongsTo(CalendarAction::class);
    }
}
