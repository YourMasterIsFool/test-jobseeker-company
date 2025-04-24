<?php

namespace Database\Seeders;

use App\Models\status_applicant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusApplicantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $data = [
           [
                'code' => 'pending',
                'name' => "Pending",
           ],
            [
                'code' => 'processed',
                'name' => "Processed",
            ],
            [
                'code' => 'pending',
                'name' => "Pending",
            ],
            [
                "code" => "passed",
                "name" => "Passed",
            ],
            [
                "code" => "failed",
                "name" => "Failed",
            ]
            ];


            $insert = [];

            foreach($data as $dat) {
                $findData =  status_applicant::where('code', $dat['code'])->first();
                if(!$findData) {
                    status_applicant::create($dat);
                }
            }
    }
}
