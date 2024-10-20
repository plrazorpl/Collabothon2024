<?php

namespace App\Http\Controllers;

use App\Http\Resources\BankEmployeeResource;
use App\Models\BankEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BankEmployeeController extends Controller
{
    public function getGeneralAdvisor(Request $request): BankEmployeeResource
    {
        $user = Auth::user();

        if ($user instanceof BankEmployee) {
            return new BankEmployeeResource($user);
        }

        $emp = $user->client->bankEmployee;

        return new BankEmployeeResource($emp);
    }
}
