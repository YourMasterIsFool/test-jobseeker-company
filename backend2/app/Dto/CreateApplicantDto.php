<?php

namespace App\Dto;

use Spatie\LaravelData\Optional;

class CreateApplicantDto
{
    public function __construct(
        public int $vacancy_id,
        public string $candidate_id,
        public string|Optional $status_applicant_id,
    ) {}
}
