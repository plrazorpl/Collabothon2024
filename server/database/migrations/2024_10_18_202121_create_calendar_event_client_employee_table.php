<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calendar_event_client_employee', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendar_event_id')->references('id')->on('calendar_events')->cascadeOnDelete();
            $table->foreignId('client_employee_id')->references('id')->on('client_employees')->cascadeOnDelete();
            $table->boolean('accepted')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_event_client_employee');
    }
};
