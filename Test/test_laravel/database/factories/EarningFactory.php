<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Earning>
 */
class EarningFactory extends Factory
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
            'earning_id' => fake()->numberBetween(1, 3),
            'amount' => fake()->randomFloat(2, 10, 100),
            'date_of_earning' => fake()->date(),
        ];
    }
}
