<?php

namespace App\Http\Controllers;

use App\Helpers\Enums\CalendarActionStatusEnum;
use App\Http\Resources\CalendarActionResource;
use App\Models\BankEmployee;
use App\Models\CalendarAction;
use App\Models\CalendarActionStatus;
use App\Models\CalendarActionTag;
use App\Models\CalendarEvent;
use App\Models\ClientEmployee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

class CalendarActionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return ResourceCollection
     */
    public function index(Request $request): ResourceCollection
    {
        $calendarActions = QueryBuilder::for(CalendarAction::class)
            ->with([
                'calendarActionTags',
                'calendarEvents' => function ($query) {
                    $query->whereNull('deleted_at')->withTrashed();
                },
                'calendarActionStatus'
            ])
            ->whereHasPermission(Auth::user(), CalendarAction::class)
            ->withCount(['calendarActionStatus as status_order' => function ($query) {
                $query->select(DB::raw("CASE WHEN name IN ('COMPLETED', 'CANCELLED') THEN 1 ELSE 0 END"));
            }])
            ->orderBy('status_order')
            ->orderBy('created_at')
            ->paginate(100);

        return CalendarActionResource::collection($calendarActions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'tags' => 'array',
            'tags.*' => 'uuid',
            'client_employee_uuid' => 'uuid|nullable',
        ]);

        DB::beginTransaction();

        $calendarAction = CalendarAction::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'description' => 'Consultation meeting',
            'client_employee_id' => Auth::user()->id,
        ]);

        CalendarActionStatus::create([
            'name' => CalendarActionStatusEnum::CREATED->value,
            'calendar_action_id' => $calendarAction->id,
        ]);

        if (isset($request->tags)) {
            $tags = CalendarActionTag::whereIn('uuid', $request->tags)->pluck('id');

            $calendarAction->calendarActionTags()->sync($tags);
        }

        $startDate = Carbon::now()->addDays(rand(1, 7));
        $endDate = $startDate->copy()->addMinutes(rand(30, 180));

        $calendarEvent = CalendarEvent::create([
            'location' => fake()->boolean() ? fake()->address() : "ONLINE",
            'start_date' => $startDate,
            'end_date' => $endDate,
            'calendar_action_id' => $calendarAction->id,
        ]);

        $emp = $request->client_employee_uuid ?
            ClientEmployee::where('uuid', $request->client_employee_uuid)->first() : Auth::user();

        $calendarEvent->clientEmployees()->attach($emp->id, ['accepted' => null]);

        $specialists = BankEmployee::all()->random(2);
        $calendarEvent->bankEmployees()->attach($specialists->pluck('id'), ['accepted' => true]);

        CalendarActionStatus::create([
            'name' => CalendarActionStatusEnum::AWAITING->value,
            'calendar_action_id' => $calendarAction->id,
        ]);

        DB::commit();

        return new CalendarActionResource($calendarAction);
    }
}
