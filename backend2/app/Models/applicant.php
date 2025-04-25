<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class applicant extends Model
{
    //

    public function candidate() {
        return $this->belongsTo(candidate::class, 'candidate_id', 'id');
    }

    public function vacancy()
    {
        return $this->belongsTo(vacancy::class, 'vacancy_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(status_applicant::class, 'status_applicant_id', 'id');
    }
}
