<?php

namespace App\Repository;

use App\Models\status_applicant;

class StatusApplicantRepository
{
    public function findByCode(string $code)
    {
        return status_applicant::where('code', $code)->first();
    }

    public function findAll()
    {
        return status_applicant::all();
    }
}
