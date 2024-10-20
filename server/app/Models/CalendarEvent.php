<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class CalendarEvent extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'location',
        'calendar_action_id',
        'start_date',
        'end_date',
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

        static::creating(function (CalendarEvent $calendarEvent) {
            $calendarEvent->uuid = Str::uuid()->toString();
        });
    }

    /**
     * @brief The calendar action that this event belongs to.
     *
     * @return BelongsTo
     */
    public function calendarAction(): BelongsTo
    {
        return $this->belongsTo(CalendarAction::class);
    }

    /**
     * @brief The client employees that are responsible for this event.
     *
     * @return BelongsToMany
     */
    public function clientEmployees(): BelongsToMany
    {
        return $this->belongsToMany(ClientEmployee::class)
            ->withPivot('accepted');
    }

    /**
     * @brief The bank employees that are responsible for this event.
     *
     * @return BelongsToMany
     */
    public function bankEmployees(): BelongsToMany
    {
        return $this->belongsToMany(BankEmployee::class)
            ->withPivot('accepted');
    }

    public function clone(): CalendarEvent
    {
        $cloned = $this->replicate();

        $cloned->uuid = Str::uuid()->toString();
        $cloned->push();

        $this->relations = [];

        foreach($this->getRelations() as $relation => $items){
            foreach($items as $item){
                unset($item->id);
                $cloned->{$relation}()->create($item->toArray());
            }
        }

        return $cloned;
    }
}
