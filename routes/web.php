<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ManagementController;

// Routes publiques (accessibles sans connexion)
Route::get('/', [DashboardController::class, 'index'])->name('index');
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/login-client', [AuthController::class, 'loginClient'])->name('login-client');

// Routes protégées (nécessitent une connexion)
Route::middleware(['auth'])->group(function () {
    Route::get('/portail', [ClientController::class, 'portail'])->name('portal');
    Route::get('/client-dashboard', [ClientController::class, 'clientDashboard'])->name('dashboard-client');
    Route::get('/mon-compte', [ClientController::class, 'compte'])->name('compte');
    Route::get('/visites', [ManagementController::class, 'visites'])->name('visites');
    Route::get('/stocks', [ManagementController::class, 'stocks'])->name('stocks');
    Route::get('/parcelles', [ManagementController::class, 'parcelles'])->name('parcelles');
    Route::get('/rentabilite', [DashboardController::class, 'rentabilite'])->name('rentabilite');
});

// Erreurs
Route::get('/403', [AuthController::class, 'error403'])->name('error.403');