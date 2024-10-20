<?php

namespace App\Helpers\Enums;

enum RoleEnum: string
{
    case CEO = 'CEO';

    case CONTROLLER = 'Controller';

    case CASH_MANAGEMENT_SPECIALIST = 'Cash management specialist';

    case ACCOUNTANT = 'Accountant';

    case COMMERZBANK_ADMIN = 'Commerzbank admin';
}
