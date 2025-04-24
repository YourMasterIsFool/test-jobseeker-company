<?php

namespace App\Repository;

use App\Dto\CreateCandidateDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateCandidateDto;
use App\Models\candidate;
use Carbon\Carbon;

class CandidateRepository
{

    public function findAll(DatatableFilterDto $filter)
    {

        $query =  candidate::query();

        if ($filter->search) {
            $query =  $query->whereAny(['email', 'phone_number', 'full_name', 'dob', 'pob', 'year_exp', 'last_salary'], 'like', '%' . $filter->search . '%');
        }
        $query = $query
            ->cursorPaginate($filter->page_length, ['*'], 'cursor', $filter->cursor);
        return $query;
    }
    public function create(CreateCandidateDto $data)
    {
        $model =  new candidate();
        $model->email = $data->email;
        $model->phone_number = $data->phone_number;
        $model->full_name = $data->full_name;
        $model->dob = $data->dob;
        $model->pob = $data->pob;
        $model->gender = $data->gender;
        $model->year_exp = $data->year_exp;
        $model->last_salary = $data->last_salary ?? null;
        $model->save();

        return $model;
    }


    public function findByEmail(string $email)
    {
        return candidate::where('email', $email)->first();
    }

    public function findByPhoneNumber(string $phone_number)
    {
        return candidate::where('phone_number', $phone_number)->first();
    }
    public function findById(string $id)
    {
        return candidate::where('id', $id)->first();
    }

    public function deleteById(string $id)
    {
        return candidate::where('id', $id)->delete();
    }

    public function update(string $id, UpdateCandidateDto $data)
    {
        $model =  candidate::find($id);
        $model->email = $data->email;
        $model->phone_number = $data->phone_number;
        $model->full_name = $data->full_name;
        $model->dob = $data->dob;
        $model->pob = $data->pob;
        $model->gender = $data->gender;
        $model->year_exp = $data->year_exp;
        $model->last_salary = $data->last_salary ?? null;
        $model->save();

        return $model;
    }
}
