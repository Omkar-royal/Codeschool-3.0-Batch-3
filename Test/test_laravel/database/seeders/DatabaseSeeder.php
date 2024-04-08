<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Deduction;
use App\Models\DeductionType;
use App\Models\Department;
use App\Models\Earning;
use App\Models\EarningType;
use App\Models\Employee;
use App\Models\Salary;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\Employee::factory(10)->create();

        \App\Models\User::factory()->create([
            'username' => 'Admin',
            'password' => bcrypt('Admin'),
        ]);


        $departments =  [
            [
                'department_name' => 'Development'
            ], [
                'department_name' => 'Design'
            ], [
                'department_name' => 'Management'
            ], [
                'department_name' => 'Testing'
            ],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
        $earnings = [
            ['earning_type' => 'Overtime Pay'],
            ['earning_type' => 'Bonuses'],
            ['earning_type' => 'Allowances'],
        ];

        foreach ($earnings as $earning) {
            EarningType::create($earning);
        }
        $deductions = [
            ['deduction_type' => 'Income Tax'],
            ['deduction_type' => 'Security Tax'],
            ['deduction_type' => 'Health Insurance Premiums'],
            ['deduction_type' => 'Provident Fund'],
            ['deduction_type' => 'Loan Repayments'],
        ];

        foreach ($deductions as $deduction) {
            DeductionType::create($deduction);
        }
        Employee::factory()->count(10)->create();
        Salary::factory()->count(10)->create();
        Earning::factory()->count(30)->create();
        Deduction::factory()->count(30)->create();
    }
}
