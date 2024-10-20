<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientEmployeeResource;
use App\Models\ClientEmployee;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class ClientEmployeeController extends Controller
{
    public function index(Request $request): ResourceCollection
    {
        $clientEmployees = QueryBuilder::for(ClientEmployee::class)
            ->paginate();

        return ClientEmployeeResource::collection($clientEmployees);
    }
}
