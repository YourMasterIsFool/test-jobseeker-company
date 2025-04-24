<?php

namespace App\Data;

use App\Dto\CreateApplicantDto;
use Spatie\LaravelData\Attributes\Validation\IntegerType;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class ApplicantData extends Data
{

    public function __construct(
        #[Required, IntegerType]
        public int $vacancy_id,

        #[Required, IntegerType]
        public int $candidate_id,
       
        public int|Optional $status_applicant
    ) {}



    public static function messages(...$args): array
    {
        return [
            'vacancy_id.required' => "vacancy_id tidak boleh kosong",
            'candidate_id.required' => "candidate_id tidak boleh kosong",
            'candidate_id.integer' => "Candidate Id harus angka",
            'vacancy_id.integer' => "vacancy_id harus angka",
            'salary.required' => "Salary tidak boleh kosong",
            'description.required' => "Description tidak boleh kosong",
            'publish_date.required' => "Publish Date tidak boleh kosong",
            'publish_date.date' => "Publish date harus datetime",
        ];
    }
    public function toCreateDto() {
        return new CreateApplicantDto(
            $this->vacancy_id,
            $this->candidate_id,
            $this->status_applicant,
        );
    }
}
