<?php

namespace App\Helpers\Enums;

enum CalendarActionStatusEnum: string
{
    case CREATED = 'CREATED';

    case AWAITING = 'AWAITING'; // awaiting meeting

    case COMPLETED = 'COMPLETED';

    case CANCELLED = 'CANCELLED';
}
