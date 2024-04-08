<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => fake()->numberBetween(1, 10),
            'base_salary' => fake()->randomFloat(2, 1000, 5000),
            'total_earnings' => fake()->randomFloat(2, 100, 1000),
            'total_deductions' => fake()->randomFloat(2, 50, 500),
            'net_salary' => fake()->randomFloat(2, 500, 5000),
            'date_of_salary' => fake()->date(),
        ];
    }
}
