<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EarningType extends Model
{
    use HasFactory;

    protected $fillable = [
        'earning_type',
    ];
}