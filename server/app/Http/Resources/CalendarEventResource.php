<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'title' => $this->title,
            'location' => $this->location,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'client_employees' => ClientEmployeeInCalendarEventResource::collection($this->clientEmployees),
            'bank_employees' => BankEmployeeInCalendarEventResource::collection($this->bankEmployees),
            'created_at' => (string) $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => (string) $this->updated_at->format('Y-m-d H:i:s'),
            'deleted_at' => $this->deleted_at,
        ];
    }
}
