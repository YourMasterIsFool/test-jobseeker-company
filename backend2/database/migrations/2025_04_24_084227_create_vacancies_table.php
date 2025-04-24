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
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string("vacancy_name");
            $table->integer('min_exp');
            $table->integer('max_age')->nullable();
            $table->boolean('flag_status')->default(1);
            $table->string('salary');
            $table->text('description');
            $table->timestamp('publish_date')->default(now());
            $table->timestamp("expired_date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
