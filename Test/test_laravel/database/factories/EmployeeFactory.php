<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fullname' => fake()->name,
            'email' => fake()->unique()->safeEmail,
            'employee_image' => 'placeholder.jpg',
            'date_of_birth' => fake()->date(),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'contact_number' => fake()->phoneNumber,
            'address' => fake()->address,
            'department_id' => fake()->numberBetween(1, 5), // Assuming you have 10 departments
        ];
    }
}
