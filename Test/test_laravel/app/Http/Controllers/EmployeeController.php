<?php

namespace App\Http\Controllers;

use App\Models\Deduction;
use App\Models\DeductionType;
use App\Models\Department;
use App\Models\Earning;
use App\Models\EarningType;
use App\Models\Employee;
use App\Models\Salary;
use Date;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    public function addEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string',
            'email' => 'required|email|unique:employees,email',
            'employee_image' => 'required|image|max:2048',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Male,Female',
            'contact_number' => 'required|string',
            'address' => 'required|string',
            'department_id' => 'required|exists:departments,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        if ($request->hasFile('employee_image')) {
            $image = $request->file('employee_image');

            try {
                $imagePath = $image->store('', 'custom');
                $imageUrl = url('/assets/images/' . basename($imagePath));
                $imageUrl = $imagePath;
                $employee = new Employee();
                $employee->fullname = $request->fullname;
                $employee->email = $request->email;
                $employee->employee_image = $imageUrl;
                $employee->date_of_birth = $request->date_of_birth;
                $employee->gender = $request->gender;
                $employee->contact_number = $request->contact_number;
                $employee->address = $request->address;
                $employee->department_id = $request->department_id;
                $employee->save();
                return response()->json(['message' => 'Employee added successfully'], 200);
            } catch (Exception $e) {
                $errorMessage = 'Error uploading image: ' . $e->getMessage();
                return response()->json(['error' => $errorMessage], 422);
            }
        }
    }


    public function addSalaryDetails(Request $request)
    {
        $employeeId = $request->employee_id;
        $baseSalary = $request->base_salary;
        $totalEarnings = $request->total_earnings;
        $totalDeductions = $request->total_deductions;
        $netSalary = $request->net_salary;
        $earnings = $request->earnings;
        $deductions = $request->deductions;

        DB::beginTransaction();

        try {
            $salary = Salary::create([
                'employee_id' => $employeeId,
                'base_salary' => $baseSalary,
                'total_earnings' => $totalEarnings,
                'total_deductions' => $totalDeductions,
                'net_salary' => $netSalary,
                'date_of_salary' => now(),
            ]);
            $salary->save();

            foreach ($earnings as $earning) {

                $earningModel = Earning::create([
                    'employee_id' => $employeeId,
                    'salary_id' => $salary->id,
                    'earning_id' => $earning['earning_id'],
                    'amount' => $earning['amount'],
                    'date_of_earning' => now(),
                ]);

                $earningModel->save();
            }

            foreach ($deductions as $deduction) {
                $deductionModel = Deduction::create([
                    'employee_id' => $employeeId,
                    'salary_id' => $salary->id,
                    'deduction_id' => $deduction['deduction_id'],
                    'amount' => $deduction['amount'],
                    'date_of_deduction' => now(),
                ]);
                $deductionModel->save();
            }
            DB::commit();
            return response()->json(['salary' => $salary], 200);
        } catch (Exception $e) {

            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function getEmployeeDetailsWithSalaries(Request $request)
    {
        $employee_id = $request->employee_id;
        $employee = Employee::where('id', $employee_id)->with('department', 'salaries', 'deduction', 'earning')->first();
        return response()->json(['employee' => $employee], 200);
    }
    public function getAllEmployees(Request $request)
    {
        $perPage = $request->input('per_page', 6);
        $employees = Employee::with('department', 'salaries', 'deduction', 'earning')->paginate($perPage);
        $paginationInfo = [
            'current_page' => $employees->currentPage(),
            'total_pages' => $employees->lastPage(),
            'total_items' => $employees->total(),
            'per_page' => $employees->perPage()
        ];
        return response()->json(['employees' => $employees, 'paginationInfo' => $paginationInfo], 200);
    }

    public function fetchSelectOptions()
    {
        $employees = Employee::all();
        $deduction_type = DeductionType::all();
        $earning_type = EarningType::all();
        $department_name = Department::all();
        return response()->json(['employees' => $employees, 'deduction_type' => $deduction_type, 'earning_type' => $earning_type, 'department_names' => $department_name], 200);
    }
}
