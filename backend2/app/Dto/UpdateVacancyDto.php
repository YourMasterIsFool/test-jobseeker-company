<?php

namespace App\Dto;

use Spatie\LaravelData\Optional;

class UpdateVacancyDto
{
    public function __construct(
        public string $vacancy_name,
        public int $min_exp,
        public string $salary,
        public string $description,
        public string $publish_date,
        public ?int $max_age = null,
        public ?int $flag_status = null,
    ) {}
}
