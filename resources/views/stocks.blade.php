<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI — Stocks</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/stocks.css') }}" />
  </head>
  <body data-page="stocks">
    <div class="app">
      <div data-layout="header"></div>

      <main class="container">
        <div class="page-title">
          <div>
            <h1>Suivi des Stocks & Intrants</h1>
            <p>Inventaire en temps reel et alertes de seuil critique</p>
          </div>
        </div>

        <div id="stocksLocalAlert" class="alert-banner">
          <div class="alert-main">
            <div class="alert-icon">!</div>
            <div>
              <h3>Alerte Stock Critique</h3>
              <p id="stocksLocalAlertText">Aucun intrant critique pour le moment.</p>
              <div class="alert-chip" id="criticalChip">-</div>
            </div>
          </div>
        </div>

        <section class="grid cards-2 kpi-row" id="inventoryCards"></section>

        <section class="grid cards-2 stocks-extra-row">
          <article class="card stock-gauge-card">
            <h3 class="section-title">Remplissage global (capacite)</h3>
            <p class="small muted">Vue jauge : stock actuel vs capacite totale (engrais + semences)</p>
            <div class="gauge-chart-wrap">
              <canvas id="stockGaugeChart" aria-label="Jauge de remplissage du stock"></canvas>
              <div class="gauge-center-label" id="stockGaugePct">0%</div>
            </div>
          </article>
          <article class="card">
            <h3 class="section-title">Top 3 consommateurs d'intrants (mois en cours)</h3>
            <p class="small muted" id="topConsumersNote">Classement par parcelle sur le mois civil actuel.</p>
            <table class="table table-compact top-consumers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Parcelle</th>
                  <th>Volume (kg)</th>
                </tr>
              </thead>
              <tbody id="topConsumersBody"></tbody>
            </table>
            <p class="small muted top-consumers-fallback" id="topConsumersFallback" hidden>
              Pas de consommation ce mois-ci — affichage du classement sur toutes les donnees disponibles.
            </p>
          </article>
        </section>

        <section class="card">
          <h3 class="section-title">Niveau des Stocks par Intrant</h3>
          <div class="chart-wrap">
            <canvas id="stocksChart"></canvas>
          </div>
        </section>

        <section class="card">
          <div style="overflow:auto;">
            <table class="table table-large">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Stock Actuel</th>
                  <th>Seuil Critique</th>
                  <th>Cout Unitaire</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody id="stockTableBody"></tbody>
            </table>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <div>
              <h3 class="section-title">Historique des Consommations (Simulation)</h3>
            </div>
            <span class="tag muted">Top: <span id="topConsumer">—</span></span>
          </div>
          <div id="consumptionList" class="history-list"></div>
        </section>

        <section class="grid cards-1" id="stocksConsumeSection">
          <article class="card">
            <div class="card-header">
              <div>
                <h3 class="section-title">Declarer une consommation</h3>
                <div class="small muted">Deduit automatiquement du stock</div>
              </div>
              <span class="tag warn">Logistique</span>
            </div>

            <form class="form" id="consumeForm">
              <div class="form-row">
                <div>
                  <label class="small muted" for="consumeRegion">Région</label>
                  <select id="consumeRegion" required>
                    <option value="">Sélectionner une région</option>
                    <option value="Kayes">Kayes</option>
                    <option value="Bamako">Bamako</option>
                    <option value="Koulikoro">Koulikoro</option>
                    <option value="Sikasso">Sikasso</option>
                    <option value="Ségou">Ségou</option>
                    <option value="Mopti">Mopti</option>
                  </select>
                </div>
                <div>
                  <label class="small muted" for="consumeParcel">Parcelle</label>
                  <select id="consumeParcel" required></select>
                </div>
                <div>
                  <label class="small muted" for="consumeDate">Date</label>
                  <input id="consumeDate" type="date" required />
                </div>
              </div>
              <div class="form-row">
                <div>
                  <label class="small muted" for="consumeItem">Intrant</label>
                  <select id="consumeItem" required>
                    <option>Urée</option>
                    <option>NPK</option>
                    <option>Semence Riz</option>
                    <option>Semence Maïs</option>
                    <option>Semence Coton</option>
                  </select>
                </div>
                <div>
                  <label class="small muted" for="consumeQty">Quantité (kg)</label>
                  <input id="consumeQty" type="number" min="1" step="1" placeholder="ex: 50" required />
                </div>
              </div>
              <div class="form-actions">
                <button class="btn" type="submit">Enregistrer</button>
                <a class="btn secondary" href="{{ route('home') }}">Retour Dashboard</a>
              </div>
              <div class="footer-note">Si un stock passe sous le seuil critique, une alerte rouge apparait.</div>
              <div class="form-feedback" id="consumeFeedback" aria-live="polite"></div>
            </form>
          </article>
        </section>
      </main>
      <div data-layout="footer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="{{ asset('assets/js/layout.js') }}"></script>
    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/stocks.js') }}"></script>
  </body>
</html>