<?php

namespace App\Dto;

use Spatie\LaravelData\Optional;

class CreateCandidateDto
{
    public function __construct(
        public string $email,
        public string $phone_number,
        public string $full_name,
        public string $dob,
        public string $pob,
        public string $gender,
        public string $year_exp,
        public ?int $last_salary =  null,
    ) {}
}
