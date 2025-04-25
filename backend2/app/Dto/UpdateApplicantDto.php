<?php

namespace App\Dto;

use Spatie\LaravelData\Optional;

class UpdateApplicantDto
{
    public function __construct(
        public int $vacancy_id,
        public ?string $candidate_id,
        public ?string $status_applicant_id,
    ) {}
}
