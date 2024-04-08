<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('sign-up', [UserController::class, 'signUp']);
Route::post('sign-in', [UserController::class, 'signIn']);

Route::middleware(['auth:sanctum'])->group(
    function () {

        //User Controller
        Route::get('get-admin-details', [UserController::class, 'getUserDetails']);
        Route::get('sign-out', [UserController::class, 'signOut']);
        Route::get('get-menus', [UserController::class, 'getMenus']);
        // Employee Controller
        Route::post('get-employee-details-with-salaries', [EmployeeController::class, 'getEmployeeDetailsWithSalaries']);
        Route::get('get-all-employees', [EmployeeController::class, 'getAllEmployees']);
        Route::post('add-employee', [EmployeeController::class, 'addEmployee']);
        Route::post('add-salary', [EmployeeController::class, 'addSalaryDetails']);

        Route::get('fetch-select-options', [EmployeeController::class, 'fetchSelectOptions']);
    }
);
