<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Centre de Contrôle des Visites - SeneBI</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/visits-control.css') }}" />
  </head>
  <body data-page="visits-control">
    <div class="visits-app">
      <!-- Navigation Header -->
      <header class="visits-header">
        <div class="header-container">
          <div class="header-actions">
            <a href="{{ route('home') }}" class="btn btn-secondary">Retour au Portail</a>
            <a href="{{ route('login') }}" class="btn btn-danger">Déconnexion</a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="visits-main">
        <!-- Page Title Section -->
        <section class="page-header">
          <div class="page-title-content">
            <h1 class="page-title">Centre de Contrôle des Visites</h1>
            <p class="page-subtitle">Suivi en temps réel des connexions et activités des utilisateurs</p>
          </div>
        </section>

        <!-- Statistics Section -->
        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <div class="stat-value" id="totalVisits">0</div>
                <div class="stat-label">Visites aujourd'hui</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <div class="stat-value" id="avgDuration">0m</div>
                <div class="stat-label">Durée moyenne</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔄</div>
              <div class="stat-content">
                <div class="stat-value" id="activeNow">0</div>
                <div class="stat-label">Actives maintenant</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Visits Table Card -->
        <section class="visits-card">
          <div class="card-header">
            <h2 class="card-title">Visites Actives</h2>
            <div class="live-indicator">
              <span class="live-dot"></span>
              <span class="live-text">En direct</span>
            </div>
          </div>
          
          <div class="table-container">
            <table class="visits-table">
              <thead>
                <tr>
                  <th class="th-user">Utilisateur</th>
                  <th class="th-time">Heure de connexion</th>
                  <th class="th-action">Action effectuée</th>
                </tr>
              </thead>
              <tbody id="visitsTableBody">
                <!-- Les visites seront injectées ici par JavaScript -->
              </tbody>
            </table>
            
            <!-- Message si aucune visite -->
            <div id="noVisitsMessage" class="no-visits-message" hidden>
              <div class="no-visits-icon">📊</div>
              <p>Aucune visite active pour le moment</p>
              <span class="no-visits-subtitle">Les nouvelles visites apparaîtront ici automatiquement</span>
            </div>
          </div>
        </section>

        </main>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/visits-control.js') }}"></script>
  </body>
</html>
