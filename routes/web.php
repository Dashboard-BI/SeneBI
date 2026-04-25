<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SenebiController;

// Accueil et Portail
Route::get('/', [SenebiController::class, 'index'])->name('home');
Route::get('/portail', [SenebiController::class, 'portail'])->name('portal');

// Authentification
Route::get('/login', [SenebiController::class, 'login'])->name('login');
Route::get('/login-client', [SenebiController::class, 'loginClient'])->name('login.client');

// Espace Client et Compte
Route::get('/client-dashboard', [SenebiController::class, 'clientDashboard'])->name('dashboard.client');
Route::get('/mon-compte', [SenebiController::class, 'compte'])->name('compte');

// Gestion Technique (Visites, Stocks, Parcelles)
Route::get('/visites', [SenebiController::class, 'visites'])->name('visites');
Route::get('/stocks', [SenebiController::class, 'stocks'])->name('stocks');
Route::get('/parcelles', [SenebiController::class, 'parcelles'])->name('parcelles');

// Analyse et Erreurs
Route::get('/rentabilite', [SenebiController::class, 'rentabilite'])->name('rentabilite');
Route::get('/403', [SenebiController::class, 'error403'])->name('error.403');