<?php

namespace App\Repository;

use App\Dto\CreateApplicantDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateApplicantDto;
use App\Models\applicant;
use Carbon\Carbon;

class ApplicantRepository
{

    public function findAll(DatatableFilterDto $filter)
    {

        $query =  applicant::query();

        if ($filter->search) {
            $query =  $query->whereHas('candidate', function ($query) use ($filter) {
                $search =  $filter->search;
                $query->whereAny(['email', 'phone_number', 'full_name'], 'like', '%' . $search . '%');
            })->orWhereHas('vacancy', function ($query) use ($filter) {
                $search =  $filter->search;
                $query->whereAny(['vacancy_name'], 'like', '%' . $search . '%');
            });
        }
        $query = $query
            ->with(['candidate', 'vacancy', 'status'])
            ->cursorPaginate($filter->page_length, ['*'], 'cursor', $filter->cursor);
        return $query;
    }
    public function create(CreateApplicantDto $data)
    {
        $model =  new applicant();
        $model->vacancy_id = $data->vacancy_id;
        $model->candidate_id = $data->candidate_id;
        $model->apply_date = now();
        $model->status_applicant_id  = $data->status_applicant_id;
        $model->save();

        return $model;
    }


    public function findByEmail(string $email)
    {
        return applicant::where('email', $email)->first();
    }

    public function findByPhoneNumber(string $phone_number)
    {
        return applicant::where('phone_number', $phone_number)->first();
    }
    public function findById(string $id)
    {
        return applicant::where('id', $id)->first();
    }

    public function deleteById(string $id)
    {
        return applicant::where('id', $id)->delete();
    }

    public function update(string $id, UpdateApplicantDto $data)
    {
        $model =  applicant::find($id);
        $model->vacancy_id = $data->vacancy_id;
        $model->candidate_id = $data->candidate_id;
        $model->apply_date = now();
        $model->status_applicant_id  = $data->status_applicant_id;
        $model->save();

        return $model;
    }
}
