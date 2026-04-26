<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function clientDashboard() {
        return view('client-dashboard');
    }

    public function compte() {
        return view('compte');
    }

    public function portail() {
        return view('secure-portal');
    }
}