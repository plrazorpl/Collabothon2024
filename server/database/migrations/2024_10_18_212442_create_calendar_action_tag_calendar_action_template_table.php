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
        Schema::create('calendar_action_tag_calendar_action_template', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendar_action_tag_id')->references('id')->on('calendar_action_tags')->cascadeOnDelete();
            $table->foreignId('calendar_action_template_id')->references('id')->on('calendar_action_templates')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_action_tag_calendar_action_template');
    }
};
