<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ManagementController extends Controller
{
    public function visites() {
        return view('visits-control');
    }

    public function stocks() {
        return view('stocks');
    }

    public function parcelles() {
        return view('parcelles');
    }
}