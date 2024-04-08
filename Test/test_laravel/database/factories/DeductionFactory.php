<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deduction>
 */
class DeductionFactory extends Factory
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
            'salary_id' => fake()->numberBetween(1, 10),
            'deduction_id' => fake()->numberBetween(1, 5),
            'amount' => fake()->randomFloat(2, 10, 100),
            'date_of_deduction' => fake()->date(),
        ];
    }
}
