<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI - Espace client lecture seule</title>
    <link rel="stylesheet" href="{{ asset('css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/client-dashboard.css') }}" />
  </head>
  <body data-page="client-readonly">
    <div class="app">
      <div data-layout="header"></div>
      <main class="container">
        <section class="page-title">
          <div>
            <h1>Espace Client (Lecture seule)</h1>
            <p>Vue de vos indicateurs et performances sans possibilite de modification.</p>
          </div>
          <div class="head-actions">
            <button class="btn" id="clientExportBtn" type="button">Exporter le Rapport PDF</button>
            <a class="btn secondary" href="./secure-portal.html">Retour portail</a>
          </div>
        </section>

        <section class="grid kpis">
          <article class="card"><p class="label">Recolte totale</p><strong id="kpiHarvest">0 kg</strong></article>
          <article class="card"><p class="label">Chiffre d'affaires</p><strong id="kpiSales">0 FCFA</strong></article>
          <article class="card"><p class="label">Benefice net</p><strong id="kpiProfit">0 FCFA</strong></article>
          <article class="card"><p class="label">Marge nette</p><strong id="kpiMargin">0%</strong></article>
        </section>

        <section class="grid charts">
          <article class="card">
            <h2>Revenus vs Couts</h2>
            <div class="chart-wrap"><canvas id="financeChart"></canvas></div>
          </article>
          <article class="card">
            <h2>Stock intrants</h2>
            <div class="chart-wrap"><canvas id="stockChart"></canvas></div>
          </article>
        </section>
      </main>
      <div data-layout="footer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js"></script>
    <script src="{{ asset('js/layout.js') }}"></script>
    <script src="{{ asset('js/core.js') }}"></script>
    <script src="{{ asset('js/client-dashboard.js') }}"></script>
  </body>
</html>
