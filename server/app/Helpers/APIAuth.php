<?php

namespace App\Helpers;

use App\Helpers\Enums\RoleEnum;
use App\Models\BankEmployee;
use App\Models\ClientEmployee;
use Illuminate\Http\Request;

class APIAuth
{
    private static array $tokenRoleMap = [
        '2rqkCplZPDNNibrXTAyA576IeOLu18ASBiuer0oqmXuCruwJ5WAaF2KvAa9pCRh2' => RoleEnum::CEO->value,
        'koP7tEvVel3gfG0gWOjG3bTgrzo1ubzbfsD5vKll2mjVM263aEGPHhIZSIMWNdy1' => RoleEnum::CONTROLLER->value,
        'Yk7lYm6LaZwpeDW4yJucFVJ5UaqfWbL9Hc9t5SjmgmZXs03HWZQnaBFErTANrFgm' => RoleEnum::CASH_MANAGEMENT_SPECIALIST->value,
        'BB4I3gN8OJZPFfVt4fWuYUYxhvnB0jS6feg0KQCx0u33EIl6aCgbx7qZ1VJOxsm0' => RoleEnum::ACCOUNTANT->value,
    ];

    private static string $adminToken = 's0G3UTt79wsL4wgIHHBea7ptulrXpCvxIOYRXBdM5rOIbIdasOhAaKRWSJQG1XrU';

    public static function tryAuthenticate(Request $request): ClientEmployee | BankEmployee | null
    {
        $token = $request->bearerToken();

        if ($token === static::$adminToken) {
            $emp = BankEmployee::first();

            return $emp;
        }

        if (array_key_exists($token, static::$tokenRoleMap)) {
            $emp = ClientEmployee::whereHas('role', fn($query) => $query->where('name', static::$tokenRoleMap[$token]))
                ->with('role')
                ->first();

            return $emp;
        }

        return null;
    }
}
