<?php

namespace Database\Factories;

use App\Helpers\Enums\CalendarActionStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalendarActionStatus>
 */
class CalendarActionStatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cases = CalendarActionStatusEnum::cases();

        return [
            'name' => $cases[array_rand($cases)]->value,
        ];
    }
}
