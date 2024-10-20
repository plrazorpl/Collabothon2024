<?php

namespace Database\Seeders;

use App\Helpers\Enums\RoleEnum;
use App\Models\BankEmployee;
use App\Models\CalendarAction;
use App\Models\CalendarActionStatus;
use App\Models\CalendarActionTag;
use App\Models\CalendarActionTemplate;
use App\Models\CalendarEvent;
use App\Models\Client;
use App\Models\ClientEmployee;
use App\Models\Role;
use Illuminate\Database\Seeder;

class ClientEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRoleId = Role::firstOrCreate([
            'name' => RoleEnum::COMMERZBANK_ADMIN->value
        ])->id;

        $specialistsData = [
            [
                'first_name' => 'Lars',
                'last_name' => 'LoanSpecialist',
                'email' => 'Lars.Loan@commerzbank.com',
                'phone' => '+49-69-123-8391',
                'role_id' => $adminRoleId,
            ],
            [
                'first_name' => 'Frederic',
                'last_name' => 'FXSpecialist',
                'email' => 'FXFred@commerzbank.com',
                'phone' => '+49-69-123-8643',
                'role_id' => $adminRoleId,
            ]
        ];

        foreach ($specialistsData as $specialistData) {
            BankEmployee::create($specialistData);
        }

        $specialists = BankEmployee::all();

        $generalAdvisor = BankEmployee::create([
            'first_name' => 'Celia',
            'last_name' => 'CRM',
            'email' => 'Celia.CRM@commerzbank.com',
            'phone' => '+49-69-123-4567',
            'role_id' => $adminRoleId,
        ]);

        $client = Client::factory()
            ->for($generalAdvisor)
            ->create();

        $tags = CalendarActionTag::all();

        $clientEmployeesData = [
            [
                'first_name' => 'Charles',
                'last_name' => 'Conntrolling',
                'email' => 'ControllingCharlie@midcap.com',
                'phone' => '+49-30-434-8891',
                'role_id' => Role::firstOrCreate([
                    'name' => RoleEnum::CONTROLLER->value
                ])->id,
                'client_id' => $client->id
            ],
            [
                'first_name' => 'Karen',
                'last_name' => 'Accounting',
                'email' => 'KarenFromFinance@midcap.com',
                'phone' => '+49-30-434-0667',
                'role_id' => Role::firstOrCreate([
                    'name' => RoleEnum::ACCOUNTANT->value
                ])->id,
                'client_id' => $client->id
            ],
            [
                'first_name' => 'Ben',
                'last_name' => 'CEO',
                'email' => 'BenTheBoss@midcap.com',
                'phone' => '+49-30-434-0007',
                'role_id' => Role::firstOrCreate([
                    'name' => RoleEnum::CEO->value
                ])->id,
                'client_id' => $client->id
            ],
            [
                'first_name' => 'Joseph',
                'last_name' => 'CashFlowManager',
                'email' => 'CashFlowJoe@midcap.com',
                'phone' => '+49-30-434-9911',
                'role_id' => Role::firstOrCreate([
                    'name' => RoleEnum::CASH_MANAGEMENT_SPECIALIST->value
                ])->id,
                'client_id' => $client->id
            ]
        ];

        $calendarActionTemplates = CalendarActionTemplate::all();

        foreach ($clientEmployeesData as $clientEmployeeData) {
            $clientEmployee = ClientEmployee::create($clientEmployeeData);

            $randomTemplates = $calendarActionTemplates->random(5);

            $calendarActions = collect();
            foreach ($randomTemplates as $randomTemplate) {
                // create from template
                for ($i = 0; $i < 5; $i++)  {
                    $calendarAction = CalendarAction::create([
                        'title' => $randomTemplate->title,
                        'description' => $randomTemplate->description,
                        'client_employee_id' => $clientEmployee->id
                    ]);
                    $calendarAction->calendarActionTags()->attach($randomTemplate->calendarActionTags->pluck('id'));

                    $calendarActions->push($calendarAction);
                }
            }

            $calendarActions->each(function (CalendarAction $calendarAction) use ($clientEmployee, $specialists) {
                $calendarEvents = CalendarEvent::factory(2)
                    ->for($calendarAction)
                    ->hasAttached($specialists, ['accepted' => true])
                    ->create();

                $calendarEvents->each(function (CalendarEvent $calendarEvent) use ($clientEmployee) {
                    $calendarEvent->clientEmployees()->attach($clientEmployee);
                });

                $calendarAction->calendarEvents()->saveMany($calendarEvents);

                $calendarActionStatuses = CalendarActionStatus::factory(4)
                    ->for($calendarAction)
                    ->create();

                $calendarAction->calendarActionStatuses()->saveMany($calendarActionStatuses);
            });
        }
    }
}
