<?php

namespace Database\Seeders;

use App\Helpers\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate([
            'name' => RoleEnum::CEO->value
        ]);

        Role::firstOrCreate([
            'name' => RoleEnum::CONTROLLER->value
        ]);

        Role::firstOrCreate([
            'name' => RoleEnum::CASH_MANAGEMENT_SPECIALIST->value
        ]);

        Role::firstOrCreate([
            'name' => RoleEnum::ACCOUNTANT->value
        ]);

        Role::firstOrCreate([
            'name' => RoleEnum::COMMERZBANK_ADMIN->value
        ]);
    }
}
