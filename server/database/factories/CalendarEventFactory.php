<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalendarEvent>
 */
class CalendarEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::parse(fake()->dateTimeBetween('-3 month', '+3 month'))->setTime(fake()->numberBetween(6, 17), fake()->numberBetween(0, 59));
        $endDate = $startDate->copy()->addMinutes(fake()->numberBetween(30, 180));

        $location = fake()->boolean() ? fake()->address() : "ONLINE";

        return [
            'location' => $location,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'deleted_at' => fake()->boolean(10) ? Carbon::now() : null,
        ];
    }
}
