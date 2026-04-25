<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SenebiController extends Controller
{
    // Accueil / Dashboard Principal
    public function index() {
        return view('index');
    }

    // Authentification
    public function login() {
        return view('login');
    }

    public function loginClient() {
        return view('login-client');
    }

    // Espace Client
    public function clientDashboard() {
        return view('client-dashboard');
    }

    // Gestion
    public function visites() {
        return view('visits-control');
    }

    public function stocks() {
        return view('stocks');
    }

    public function parcelles() {
        return view('parcelles');
    }

    public function rentabilite() {
        return view('rentabilite');
    }

    // Profil et Sécurité
    public function compte() {
        return view('Compte');
    }

    public function portail() {
        return view('secure-portal');
    }

    // Erreurs
    public function error403() {
        return view('403');
    }
}