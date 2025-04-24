<?php

namespace App\Data;

use App\Dto\CreateCandidateDto;
use App\Dto\CreateVacancyDto;
use App\Dto\UpdateCandidateDto;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class CandidateData extends Data
{

    public function __construct(
        #[Required]
        public string $email,
        #[Required]
        public string $phone_number,
        #[Required]
        public string $full_name,

        #[Required]
        public string $dob,

        #[Required]
        public string $pob,

        #[Required]
        public string $gender,

        #[Required]
        public int $year_exp,

        public ?int $last_salary =  null,
    ) {}


    public function toCreateDto() {
        return new CreateCandidateDto(
              $this->email,
            $this->phone_number,
            $this->full_name,
            $this->dob,
            $this->pob,
            $this->gender,
            $this->year_exp,
            $this->last_salary,
        );
    }
    public function topUpdateDto()
    {
        return new UpdateCandidateDto(
            $this->email,
            $this->phone_number,
            $this->full_name,
            $this->dob,
            $this->pob,
            $this->gender,
            $this->year_exp,
            $this->last_salary,
        );
    }

}
