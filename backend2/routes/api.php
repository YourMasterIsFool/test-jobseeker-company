<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\StatusApplicantController;
use App\Http\Controllers\VacancyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('vacancys', VacancyController::class);
Route::resource('candidates', CandidateController::class);
Route::resource('applicants', ApplicantController::class);
Route::resource('status_applicants', StatusApplicantController::class);
