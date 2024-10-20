<?php

namespace App\Http\Controllers;

use App\Http\Resources\CalendarActionResource;
use App\Http\Resources\CalendarActionTagResource;
use App\Models\CalendarActionTag;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class CalendarActionTagController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $calendarActionTags = QueryBuilder::for(CalendarActionTag::class)
            ->whereHasPermission(Auth::user(), CalendarActionTag::class)
            ->paginate();

        return CalendarActionTagResource::collection($calendarActionTags);
    }
}
