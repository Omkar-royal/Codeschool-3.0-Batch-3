<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',

        'base_salary',
        'total_earnings',
        'total_deductions',
        'net_salary',
        'date_of_salary',
    ];

    public function earning()
    {
        return $this->hasMany(Earning::class);
    }
    // In Salary.php model
    public function deductions()
    {
        return $this->hasMany(Deduction::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
