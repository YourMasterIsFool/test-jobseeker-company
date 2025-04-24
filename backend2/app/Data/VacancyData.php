<?php 

namespace App\Data;

use App\Dto\CreateVacancyDto;
use App\Dto\UpdateVacancyDto;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\IntegerType;

use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Validation;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class VacancyData extends Data {

    public function __construct(
        #[Required]
        public string $vacancy_name,

        #[Required, IntegerType]
        public int $min_exp,

        #[IntegerType]
        public ?int $max_age,

        #[Required]
        public string $salary,

        #[Required]
        public string $description,

        #[Required, Date]
        public string $publish_date,

        #[IntegerType]
        public ?int $flag_status = null,

    )
    {
        
    }


    // public static function rules(): array
    // {
    //     return [
    //         'vacancy_name' => 'required',
    //         'min_exp' => 'required|integer',
    //         'max_age' => 'integer',
    //         'salary' => 'required',
    //         'description' => 'required',
    //         'publish_date' => 'required|date',
    //     ];
    // }

    public static function messages(...$args):array
    {
        return [
            'vacancy_name.required' => "Vacancy name tidak boleh kosong",
            'min_exp.required' => "Minimum Experience tidak boleh kosong",
            'max_age.integer' => "Maximal Age harus angka",
            'min_exp.integer' => "Minimum Experience harus angka",
            'salary.required' => "Salary tidak boleh kosong",
            'description.required' => "Description tidak boleh kosong",
            'publish_date.required' => "Publish Date tidak boleh kosong",
            'publish_date.date' => "Publish date harus datetime",
        ];
    }
    public function toDto() {
        return new CreateVacancyDto(
            $this->vacancy_name,
            $this->min_exp,
            $this->salary,
            $this->description,
            $this->publish_date,
            $this->max_age ?? null,
            $this->flag_status ?? null,
        );
    }

    public function toUpdateDto()
    {
        return new UpdateVacancyDto(
            $this->vacancy_name,
            $this->min_exp,
            $this->salary,
            $this->description,
            $this->publish_date,
            $this->max_age,
            $this->flag_status,
        );
    }
}