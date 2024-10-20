<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\BankEmployee;
use App\Models\CalendarAction;
use App\Models\CalendarEvent;
use App\Models\ClientEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\QueryBuilder;

class CalendarEventActionController extends Controller
{
    public function accept(string $uuid): JsonResponse
    {
        try {
            $requester = Auth::user();
            $targetEvent = QueryBuilder::for(CalendarEvent::class)
                ->where('uuid', '=', $uuid)
                ->whereHasPermission(Auth::user(), CalendarEvent::class)
                ->firstOrFail()
            ;

            if ($requester instanceof ClientEmployee) {
                $targetEvent->clientEmployees()->updateExistingPivot($requester, ['accepted' => 1]);
            } else {
                $targetEvent->bankEmployees()->updateExistingPivot($requester, ['accepted' => 1]);
            }

            return response()->json(['message' => 'Event has been accepted successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to accept the calendar event: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to accept the event.'], 500);
        }
    }

    public function decline(string $uuid): JsonResponse
    {
        try {
            $targetEvent = QueryBuilder::for(CalendarEvent::class)
                ->with('clientEmployees')
                ->with('bankEmployees')
                ->where('uuid', '=', $uuid)
                ->whereHasPermission(Auth::user(), CalendarEvent::class)
                ->firstOrFail()
            ;

            DB::transaction(static function() use ($targetEvent) {
                $targetEvent->deleted_at = (string)now();
                foreach ([...$targetEvent->clientEmployees, ...$targetEvent->bankEmployees] as $approver) {
                    if ($approver instanceof ClientEmployee) {
                        $targetEvent->clientEmployees()->updateExistingPivot($approver, ['accepted' => 0]);
                    } else {
                        $targetEvent->bankEmployees()->updateExistingPivot($approver, ['accepted' => 0]);
                    }
                }
                $targetEvent->save();
            });

            return response()->json(['message' => 'Event has been declined successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to delete the calendar event: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to decline the event.'], 500);
        }
    }

    public function quickDuplicate(string $uuid, Request $request): JsonResponse
    {
        try {
            $targetEvent = QueryBuilder::for(CalendarEvent::class)
                ->where('uuid', '=', $uuid)
                ->whereHasPermission(Auth::user(), CalendarEvent::class)
                ->firstOrFail()
            ;

            $bodyContent = json_decode($request->getContent(), true);

            $changedCalendarEvent = $targetEvent->clone();
            $changedCalendarEvent->start_date = $bodyContent['start_date'];
            $changedCalendarEvent->end_date = $bodyContent['end_date'];

            $changedCalendarEvent->save();

            return response()->json(['message' => 'Event has been created successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to add the calendar event: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to add the event.' . $e->getMessage()], 500);
        }
    }

    public function createEvent(string $actionUuid, Request $request): JsonResponse
    {
        try {
            /** @var CalendarAction $targetAction */
            $targetAction = QueryBuilder::for(CalendarAction::class)
                ->where('uuid', '=', $actionUuid)
                ->whereHasPermission(Auth::user(), CalendarAction::class)
                ->firstOrFail()
            ;

            $bodyContent = json_decode($request->getContent(), true);

            $event = $targetAction->calendarEvents()->create([
                'start_date' => $bodyContent['start_date'],
                'end_date' => $bodyContent['end_date'],
                'location' => $bodyContent['location'],
            ]);
            $targetAction->push();

            $emp = Auth::user();

            if ($emp instanceof ClientEmployee) {
                $event->clientEmployees()->attach($emp->id, ['accepted' => 1]);
            } else {
                $event->clientEmployees()->attach($targetAction->clientEmployee->id, ['accepted' => null]);
            }

            $event->bankEmployees()->attach(BankEmployee::all()->random(2)->pluck('id'), ['accepted' => null]);

            return response()->json(['message' => 'Event has been created successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to create the calendar event: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to add the event.' . $e->getMessage()], 500);
        }
    }
}
