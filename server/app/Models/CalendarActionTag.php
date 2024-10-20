<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class CalendarActionTag extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tag',
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

        static::creating(function (CalendarActionTag $calendarActionTag) {
            $calendarActionTag->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the calendar actions that have the tag.
     *
     * @return BelongsToMany
     */
    public function calendarActions(): BelongsToMany
    {
        return $this->belongsToMany(CalendarAction::class);
    }

    /**
     * Get the calendar action templates that have the tag.
     *
     * @return HasMany
     */
    public function CalendarActionTemplates(): BelongsToMany
    {
        return $this->belongsToMany(CalendarActionTemplate::class);
    }
}
