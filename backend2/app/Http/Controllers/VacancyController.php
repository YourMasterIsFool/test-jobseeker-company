<?php

namespace App\Http\Controllers;

use App\Data\VacancyData;
use App\Dto\DatatableFilterDto;
use App\Services\ResponseService;
use App\Services\VacancyService;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(
        public ResponseService $responseService,
        public VacancyService $vacancyService,
    ) {}
    public function index(Request $request)
    {
        //
        $page_length =  $request->get('page_length', 10);
        $cursor =  $request->get('cursor');
        $search =  $request->get("search");
        $filterDto =  new DatatableFilterDto(
            $page_length,
            $cursor,
            $search
        );
        return $this->responseService->datatableResponse($this->vacancyService->findAll($filterDto));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // validation data
        // dd($request->all());
        try {
            $validated = VacancyData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }

        return $this->responseService->successResponse($this->vacancyService->create($validated->toDto()));
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        return $this->responseService->successResponse($this->vacancyService->findById($id));
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
            $validated = VacancyData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }
        return $this->responseService->successResponse($this->vacancyService->update($id,$validated->toUpdateDto()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    
        return $this->responseService->successResponse($this->vacancyService->deleteById($id));
    }
}
