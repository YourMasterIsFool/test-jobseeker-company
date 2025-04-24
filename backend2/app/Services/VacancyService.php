<?php

namespace App\Services;

use App\Dto\CreateVacancyDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateVacancyDto;
use App\Repository\VacancyRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VacancyService extends ResponseService
{

    public function __construct(
        public VacancyRepository $vacancyRepository
    ) {}

    public function findAll(DatatableFilterDto $filter)
    {
        return $this->vacancyRepository->findAll($filter);
    }
    public function create(CreateVacancyDto $createVacancy)
    {
        DB::beginTransaction();
        try {
            $created =  $this->vacancyRepository->create($createVacancy);
            DB::commit();
            return $created;
        } catch (\Exception $e) {
            Log::info($e);
            DB::rollBack();
            return $this->internalServer(null, $e);
        }
    }


    public function findById(string $id)
    {
        $find = $this->vacancyRepository->findById($id);
        if (!$find) {
            return $this->notFound(null, "Vacancy data not found");
        }

        return $find;
    }

    public function update(string $id, UpdateVacancyDto $data)
    {
        $find = $this->findById($id);
        try {
            $updated =  $this->vacancyRepository->update($find->id, $data);
            DB::commit();
            return $updated;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e);
            return $this->internalServer(null, "Error Update Data Vacancy Data");
        }
    }
    public function deleteById(string $id)
    {
        $find = $this->findById($id);
        DB::beginTransaction();
        try {

            $this->vacancyRepository->deleteById($find->id);
            DB::commit();
            return $find->id;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e);
            return $this->internalServer(null, "Error Deleted Vacancy Data");
        }
    }
}
