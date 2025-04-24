<?php

namespace App\Services;

use App\Repository\StatusApplicantRepository;

class StatusApplicantService extends ResponseService {
    public function __construct(
        public StatusApplicantRepository $statusApplicantRepo
    )
    {
        
    }

    public function findByCode(string $code) {
        $find =  $this->statusApplicantRepo->findByCode($code);
        if($find == null) {
            return $this->notFound(null, $message="Status Code Not Found");
        }
        return $find;
    }

    public function findAll() {
        return $this->statusApplicantRepo->findAll();
    }

    
}