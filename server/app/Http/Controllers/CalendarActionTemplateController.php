<?php

namespace App\Http\Controllers;

use App\Http\Resources\CalendarActionTemplateResource;
use App\Models\CalendarActionTemplate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class CalendarActionTemplateController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $calendarActionTemplates = QueryBuilder::for(CalendarActionTemplate::class)
            ->with([
                'calendarActionTags',
            ])
            ->whereHasPermission(Auth::user(), CalendarActionTemplate::class)
            ->paginate();

        return CalendarActionTemplateResource::collection($calendarActionTemplates);
    }
}
