<?php

namespace App\Http\Controllers;

use App\Data\ApplicantData;
use App\Dto\DatatableFilterDto;
use App\Services\ResponseService;
use App\Services\ApplicantService;
use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function __construct(
        public ApplicantService $applicantService,
        public ResponseService $responseService,
     )
     {
        
     }
    public function index(Request $request)
    {
            
        // return data dari applicant servicce
        $page_length =  $request->get('page_length', 10);
        $cursor =  $request->get('cursor');
        $search =  $request->get("search");

        $filterDto =  new DatatableFilterDto(
            $page_length,
            $cursor,
            $search
        );
        return $this->responseService->datatableResponse($this->applicantService->findAll($filterDto));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $validated = ApplicantData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }
        return $this->responseService->successResponse($this->applicantService->create($validated->toCreateDto()));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        return $this->responseService->successResponse($this->applicantService->findById($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try {
            $validated = ApplicantData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }
        return $this->responseService->successResponse($this->applicantService->update($id, $validated->toUpdateDto()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //


        return $this->responseService->successResponse($this->applicantService->deleteById($id));
    }
}
