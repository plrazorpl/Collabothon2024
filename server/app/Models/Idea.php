<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Idea extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content',
        'calendar_action_template_id',
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

        static::creating(function (Idea $idea) {
            $idea->uuid = Str::uuid()->toString();
        });
    }

    /**
     * Get the action template that is assigned to this idea.
     *
     * @return BelongsTo
     */
    public function calendarActionTemplate(): BelongsTo
    {
        return $this->belongsTo(CalendarActionTemplate::class);
    }
}
