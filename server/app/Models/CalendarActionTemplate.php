<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class CalendarActionTemplate extends Model
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

        static::creating(function (CalendarActionTemplate $calendarActionTemplate) {
            $calendarActionTemplate->uuid = Str::uuid()->toString();
        });
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
     * Get the ideas that are assigned to this template.
     *
     * @return HasMany
     */
    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }
}
