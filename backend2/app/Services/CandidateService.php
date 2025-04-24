<?php

namespace App\Services;

use App\Dto\CreateCandidateDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateCandidateDto;
use App\Repository\CandidateRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CandidateService extends ResponseService
{

    public function __construct(
        public CandidateRepository $candidateRepository
    ) {}

    public function findAll(DatatableFilterDto $filter)
    {
        return $this->candidateRepository->findAll($filter);
    }

    public function findByEmail(string $email)
    {
        return $this->candidateRepository->findByEmail($email);
    }

    public function findByPhoneNumber(string $phonenumber)
    {
        return $this->candidateRepository->findByPhoneNumber($phonenumber);
    }
    public function create(CreateCandidateDto $createCandidate)
    {

        $findByEmail = $this->findByEmail($createCandidate->email);

        if ($findByEmail) {
            return $this->badRequestResponse([
                'email' => "email telah digunakan"
            ]);
        }

        $findByPhone = $this->findByPhoneNumber($createCandidate->phone_number);

        if ($findByPhone) {
            return $this->badRequestResponse([
                'phone_number' => "Nomor Telephone Telah Digunakan",
            ]);
        }


        DB::beginTransaction();
        try {
            $created =  $this->candidateRepository->create($createCandidate);
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
        $find = $this->candidateRepository->findById($id);
        if (!$find) {
            return $this->notFound(null, "Candidate data not found");
        }

        return $find;
    }

    public function update(string $id, UpdateCandidateDto $data)
    {
        $find = $this->findById($id);
        try {
            $result = $this->candidateRepository->update($find->id, $data);
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e);
            return $this->internalServer(null, "Error Update Data Candidate Data");
        }
    }
    public function deleteById(string $id)
    {
        $find = $this->findById($id);
        DB::beginTransaction();
        try {

            $this->candidateRepository->deleteById($find->id);
            DB::commit();
            return $find->id;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e);
            return $this->internalServer(null, "Error Deleted Candidate Data");
        }
    }
}
