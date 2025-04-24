<?php

namespace App\Services;

use App\Dto\CreateApplicantDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateApplicantDto;
use App\Repository\ApplicantRepository;
use App\Repository\StatusApplicantRepository;
use App\Services\CandidateService;
use App\Services\ResponseService;
use App\Services\StatusApplicantService;
use App\Services\VacancyService;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log as FacadesLog;

class ApplicantService extends ResponseService
{

    public function __construct(
        public CandidateService $candidateService,
        public VacancyService $vacancyService,
        public ApplicantRepository $applicantRepository,
        public StatusApplicantService $statusApplicantService,
    ) {}

    public function findAll(DatatableFilterDto $filter)
    {
        return $this->applicantRepository->findAll($filter);
    }

    public function findById(string $id)
    {


        $find =  $this->applicantRepository->findById($id);

        if (!$find) {
            return $this->notFound(null, "Applicant data not found");
        }
        return $find;
    }

    public function create(CreateApplicantDto $data)
    {

        // checkdata vacation terlebih dahulu jika ada maka lanjut
        $this->vacancyService->findById($data->vacancy_id);

        // check data candidate data terlebih dahulu jika ada maka lanjut jika tidak ada langsung return 404 not found
        $this->candidateService->findById($data->candidate_id);

        // ambil data pending status
        $findPendingStatus =  $this->statusApplicantService->findByCode('pending');


        DB::beginTransaction();

        try {
            $data->status_applicant_id = $findPendingStatus->id;

            $created =  $this->applicantRepository->create($data);
            DB::commit();
            return $created;
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            FacadesLog::info($e);


            return $this->internalServer(null, "Gagal menyimpan data applicant");
        }
    }

    public function update(string $id, UpdateApplicantDto $data)
    {
        $find = $this->findById($id);
        try {
            $updated =  $this->applicantRepository->update($find->id, $data);
            DB::commit();
            return $updated;
        } catch (\Exception $e) {
            DB::rollBack();
            FacadesLog::info($e);
            return $this->internalServer(null, "Error Update Data Applicant Data");
        }
    }

    public function deleteById(string $id)
    {
        $find = $this->findById($id);
        DB::beginTransaction();
        try {

            $this->vacancyService->deleteById($find->id);
            DB::commit();
            return $find->id;
        } catch (\Exception $e) {
            DB::rollBack();
            FacadesLog::info($e);
            return $this->internalServer(null, "Error Deleted Applicant Data");
        }
    }
}
