<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Earning extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'salary_id',
        'earning_id',
        'amount',
        'date_of_earning',
    ];
}
