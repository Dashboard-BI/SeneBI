<?php

use Illuminate\Support\Facades\Route;

// La route pour le login
Route::get('/', function () {
    return view('login');
});

// La route pour l'index
Route::get('/index', function () {
    return view('index');
});

// La route pour les parcelles
Route::get('/parcelles', function () {
    return view('parcelles');
});

// La route pour les stocks
Route::get('/stocks', function () {
    return view('stocks');
});

// La route pour les compte
Route::get('/compte', function () {
    return view('compte');
});
// La route pour les secure-portal
Route::get('/secure-portal', function () {
    return view('secure-portal');

}); 
// La route pour le 403
Route::get('/403', function () {
    return view('403');
}); 
// La route pour le client-dashboard
Route::get('/client-dashboard', function () {
    return view('client-dashboard');
});
// La route pour les rentabilites
Route::get('/rentabilite', function () {
    return view('rentabilite');
});
