<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class status_applicant extends Model
{
    //

    protected $fillable = ['vacancy_id', 'candidate_id', 'apply_date', 'apply_status'];
}
