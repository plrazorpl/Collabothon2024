<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarActionTagResource extends JsonResource
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
            'tag' => $this->tag,
            'created_at' => (string) $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => (string) $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
