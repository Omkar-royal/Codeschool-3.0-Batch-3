<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_image',
        'fullname',
        'date_of_birth',
        'gender',
        'contact_number',
        'department_id',
        'address',
        'email',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    public function earning(): HasMany
    {
        return $this->hasMany(Earning::class, 'employee_id', 'id');
    }

    public function deduction(): HasMany
    {
        return $this->hasMany(Deduction::class, 'employee_id', 'id');
    }

    public function salaries(): HasMany
    {
        return $this->hasMany(Salary::class, 'employee_id', 'id');
    }
}
