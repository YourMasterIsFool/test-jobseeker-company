<?php

namespace App\Services;

use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpKernel\Exception\HttpException;

use function Pest\Laravel\json;

class ResponseService
{
    public function successResponse($data, $message = 'Success', $statusCode = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public function datatableResponse($data)
    {
        return response()->json($data);
    }
    public function badRequestResponse($data =  null, $message = 'Bad Request')
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $data,
        ], 400));
    }

    public function unProcessableEntity($data, $message = 'Error Validation')
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $data,
        ], 422));
    }

    public function internalServer($data, $message = 'Internal Server')
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $data,
        ], 500));
    }

    public function notAuthorized($data = null, $message = 'Not Authorized')
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $data,
        ], 401));
    }

    public function notFound($data = null, $message = 'Not Found')
    {
        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $data,
        ], 404));
    }
}
