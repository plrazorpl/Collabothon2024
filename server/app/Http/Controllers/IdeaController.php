<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdeaResource;
use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class IdeaController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $ideas = QueryBuilder::for(Idea::class)
            ->with([
                'calendarActionTemplate',
            ])
            ->paginate();

        return IdeaResource::collection($ideas);
    }
}
