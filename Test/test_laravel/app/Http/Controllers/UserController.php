<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'username' => 'required|string|unique:users',
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users',
            'date_of_birth' => 'required',
            'gender' => 'required|in:male,female',
            'contact_number' => 'required',
            'address' => 'required',
            'password' => 'required|string|min:8|regex:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!?@$ %^&*-]).{8,}$"',
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }

        $user = new User([
            "username" => $request->username,
            "full_name" => $request->full_name,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'contact_number' => $request->contact_number,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'department_id' => $request->department_id,
        ]);
        $user->save();

        return response()->json(['message' => 'Sign up successfully'], 200);
    }
    public function signIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 420);
        }
        $user = User::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["message" => 'Invalid credentials'], 400);
        }
        $data['token'] = $user->createToken($request->username)->plainTextToken;
        $data['user'] = $user;
        $response = [
            'message' => 'Successfully sign in',
            'data' => $data
        ];
        return  response()->json($response, 201);
    }
    public function signOut(Request $request)
    {
        $signOutMessage = auth()->user()->tokens()->delete();
        if (isset($signOutMessage)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully.'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to logout.'
            ], 500);
        }
    }
    public function getUserDetails()
    {
        $user = Auth::user();
        return response()->json(['data' => $user], 200);
    }
    public function getMenus()
    {
        $menu = Menu::all();
        return response()->json(['data' => $menu], 200);
    }
}
