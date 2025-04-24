<?php

namespace App\Http\Controllers;

use App\Data\CandidateData;
use App\Dto\DatatableFilterDto;
use App\Services\ResponseService;
use App\Services\CandidateService;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(
        public ResponseService $responseService,
        public CandidateService $candidateService,
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
            $search);

        return $this->responseService->datatableResponse($this->candidateService->findAll($filterDto));
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
        // validation data
        try {
            $validated = CandidateData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }

        return $this->responseService->successResponse($this->candidateService->create($validated->toCreateDto()));
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        return $this->responseService->successResponse($this->candidateService->findById($id));
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
            $validated = CandidateData::from($request);
        } catch (\Exception $e) {
            return $this->responseService->unProcessableEntity($e->errors(), "Error Validation");
        }
        return $this->responseService->successResponse($this->candidateService->update($id, $validated->topUpdateDto()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        return $this->responseService->successResponse($this->candidateService->deleteById($id));
    }
}
