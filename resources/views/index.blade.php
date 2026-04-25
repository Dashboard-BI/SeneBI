<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI — Dashboard</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/dashboard.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/region-filter.css') }}" />
  </head>
  <body data-page="dashboard">
    <div class="app">
      <div data-layout="header"></div>

      <main class="container">
        <div class="page-title">
          <div>
            <h1>Tableau de Bord Analytique</h1>
            <p>Vue d'ensemble des performances agricoles, avec analyse des tendances et alertes opérationnelles.</p>
          </div>
          <div class="region-selector">
            <label for="regionSelect" class="region-label">Région</label>
            <select id="regionSelect" class="region-dropdown">
              <option value="all">Toutes les régions</option>
              <option value="bko">Bamako</option>
              <option value="kay">Kayes</option>
              <option value="kou">Koulikoro</option>
              <option value="seg">Ségou</option>
              <option value="sik">Sikasso</option>
              <option value="mop">Mopti</option>
              <option value="tom">Tombouctou</option>
              <option value="gao">Gao</option>
              <option value="kid">Kidal</option>
            </select>
          </div>
        </div>

        <div id="stockAlert" class="alert-banner">
          <div id="stockAlertText">Alerte Stock</div>
          <a class="btn danger" href="{{ route('stocks') }}">Voir le stock</a>
        </div>

        <section class="grid kpis">
          <article class="card">
            <div class="card-header">
              <p class="card-title">Total Récolté</p>
              <div class="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20"/><path d="M7 6c2 2 2 4 0 6"/><path d="M17 6c-2 2-2 4 0 6"/><path d="M7 12c2 2 2 4 0 6"/><path d="M17 12c-2 2-2 4 0 6"/>
                </svg>
              </div>
            </div>
            <div class="kpi-value"><span id="kpiTotalHarvest">0</span> <span class="muted" style="font-size:14px;font-weight:700;">kg</span></div>
            <div class="kpi-sub">
              <span>+12.5% vs. période précédente</span>
              <span class="muted">Basé sur les saisies de récoltes</span>
            </div>
          </article>

          <article class="card">
            <div class="card-header">
              <p class="card-title">Chiffre d'Affaires estimé</p>
              <div class="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M12 7v10"/><path d="M9.5 9.5c.6-1 4.4-1 5 0"/><path d="M9.5 14.5c.6 1 4.4 1 5 0"/>
                </svg>
              </div>
            </div>
            <div class="kpi-value"><span id="kpiCA">0</span> <span class="muted" style="font-size:14px;font-weight:700;">M FCFA</span></div>
            <div class="kpi-sub">
              <span>+8.3% vs. période précédente</span>
              <span class="muted">Prix moyen × quantité récoltée</span>
            </div>
          </article>

          <article class="card">
            <div class="card-header">
              <p class="card-title">Hectares Actifs</p>
              <div class="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11z"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
              </div>
            </div>
            <div class="kpi-value"><span id="kpiHa">0</span> <span class="muted" style="font-size:14px;font-weight:700;">ha</span></div>
            <div class="kpi-sub">
              <span>+5.2% vs. période précédente</span>
              <span class="muted">Parcelles hors jachère</span>
            </div>
          </article>

          
          <article class="card">
            <div class="card-header">
              <p class="card-title">Rendement Moyen</p>
              <div class="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>
                </svg>
              </div>
            </div>
            <div class="kpi-value"><span id="kpiRend">0</span> <span class="muted" style="font-size:14px;font-weight:700;">t/ha</span></div>
            <div class="kpi-sub">
              <span>+3.1% vs. période précédente</span>
              <span class="muted">Moyenne sur parcelles récoltées</span>
            </div>
          </article>
        </section>

        <div class="weather-widget">
            <div class="weather-content">
                <div class="weather-icon">☀️</div>
                <div class="weather-info">
                    <div class="weather-location">Bamako</div>
                    <div class="weather-temp">35°C</div>
                    <div class="weather-condition">Temps sec</div>
                </div>
            </div>
        </div>

        <p id="dashboardInsight" class="dashboard-insight" role="status"></p>

        <section class="grid cards-2">
          <article class="card" style="min-height: 320px;">
            <div class="card-header">
              <div>
                <h3 style="margin:0; font-size:16px;">Évolution du Prix des Céréales</h3>
                <div class="small muted">Courbe dynamique (Chart.js)</div>
              </div>
              <span class="tag muted">FCFA/kg</span>
            </div>
            <div class="cereal-price-toolbar">
              <label class="cereal-price-label" for="cerealPriceSelect">Culture affichée</label>
              <select id="cerealPriceSelect" class="cereal-price-select" aria-label="Choisir la culture pour la courbe de prix">
                <option value="Riz">Riz</option>
                <option value="Maïs">Maïs</option>
                <option value="Coton">Coton</option>
              </select>
            </div>
            <div style="height: 260px;">
              <canvas id="priceChart"></canvas>
            </div>
          </article>

          <article class="card" style="min-height: 320px;">
            <div class="card-header">
              <div>
                <h3 style="margin:0; font-size:16px;">Distribution des Cultures</h3>
                <div class="small muted">Riz / Maïs / Coton</div>
              </div>
              <span class="tag good" id="dominantCulture">—</span>
            </div>
            <div style="height: 260px;">
              <canvas id="cultureChart"></canvas>
            </div>
          </article>

        </section>

        <div class="footer-note">Astuce: si tu saisis des consommations d'intrants dans "Stocks", l'alerte rouge apparaît ici automatiquement.</div>
      </main>
      <div data-layout="footer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="{{ asset('assets/js/layout.js') }}"></script>
    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/dashboard.js') }}"></script>
    <script src="{{ asset('assets/js/region-filter.js') }}"></script>
        <script src="{{ asset('assets/js/notifications-simple.js') }}"></script>
  </body>
</html>

