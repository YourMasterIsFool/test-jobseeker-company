<?php

namespace App\Dto;

use Spatie\LaravelData\Optional;

class DatatableFilterDto
{
    public function __construct(
        public ?int $page_length = 10,
        public ?string $cursor =  null,
        public ?string $search = null,
    ) {}
}
