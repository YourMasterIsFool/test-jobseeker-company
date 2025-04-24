<?php

namespace App\Repository;

use App\Dto\CreateVacancyDto;
use App\Dto\DatatableFilterDto;
use App\Dto\UpdateVacancyDto;
use App\Models\vacancy;
use Carbon\Carbon;

class VacancyRepository
{
    public function create(CreateVacancyDto $data)
    {
        $model =  new vacancy();
        $model->vacancy_name = $data->vacancy_name;
        $model->min_exp = $data->min_exp;
        $model->max_age = $data->max_age;
        $model->max_age = $data->max_age;
        $model->salary = $data->salary;
        $model->description = $data->description;
        $model->publish_date = $data->publish_date;
        $model->expired_date = Carbon::parse($data->publish_date)->addDay(60);
        $model->flag_status = $data->flag_status ?? 1;
        $model->save();
        return $model;
    }


    public function findAll(DatatableFilterDto $filter)
    {

        $query =  vacancy::query();

        if ($filter->search) {
            $query =  $query->whereAny(['vacancy_name', 'min_exp', 'max_age', 'salary'], 'like', '%' . $filter->search . '%');
        }
        $query = $query
            ->cursorPaginate($filter->page_length, ['*'], 'cursor', $filter->cursor);
        return $query;
    }
    public function findById(string $id)
    {
        return vacancy::where('id', $id)->first();
    }

    public function deleteById(string $id)
    {
        return vacancy::where('id', $id)->delete();
    }

    public function update(string $id, UpdateVacancyDto $update)
    {
        $model =  vacancy::find($id);
        $model->vacancy_name = $update->vacancy_name;
        $model->min_exp = $update->min_exp;
        $model->max_age = $update->max_age;
        $model->max_age = $update->max_age;
        $model->salary = $update->salary;
        $model->description = $update->description;
        $model->publish_date = $update->publish_date;
        $model->expired_date = Carbon::parse($update->publish_date)->addDay(60);
        $model->flag_status = $update->flag_status ?? 1;
        $model->save();

        return $model;
    }
}
