<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login() {
        return view('login');
    }

    public function loginClient() {
        return view('login-client');
    }

    public function error403() {
        return view('403');
    }
}