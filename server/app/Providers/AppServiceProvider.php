<?php

namespace App\Providers;

use App\Helpers\APIAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::viaRequest('apiKey', function ($request) {
            return APIAuth::tryAuthenticate($request);
        });
    }
}
