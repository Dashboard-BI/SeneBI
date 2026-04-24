<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI - Rentabilite</title>
    <link rel="stylesheet" href="{{ asset('css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/rentabilite.css') }}" />
  </head>
  <body data-page="business">
    <div class="app">
      <div data-layout="header"></div>

      <main class="container">
        <section class="page-head">
          <div>
            <h1>Rentabilite & Exports</h1>
            <p>Analyse financiere et generation de rapports</p>
          </div>
          <div class="head-actions">
            <button class="btn secondary" type="button" id="openCalculatorBtn">Calculateur</button>
            <button class="btn" type="button" id="exportPdfBtn">Exporter le bilan PDF</button>
          </div>
        </section>

        <section class="card calculator-panel" id="calculatorPanel" aria-hidden="true">
          <h2>Calculateur de Rentabilite</h2>
          <form class="calculator-form" id="calculatorForm">
            <div class="calc-grid-3">
              <div class="calc-field">
                <label for="calcParcel">Parcelle</label>
                <input id="calcParcel" type="text" placeholder="Ex: Parcelle Nord (Riz)" />
              </div>
              <div class="calc-field">
                <label for="calcCulture">Culture</label>
                <input id="calcCulture" type="text" placeholder="Ex: Riz" />
              </div>
              <div class="calc-field">
                <label for="calcArea">Surface (ha)</label>
                <input id="calcArea" type="number" min="0" step="0.1" placeholder="Ex: 5.5" />
              </div>
            </div>

            <div class="calc-grid-4">
              <div class="calc-field">
                <label for="calcQty">Quantite recoltee (kg)</label>
                <input id="calcQty" type="number" min="0" step="1" placeholder="Ex: 22000" />
              </div>
              <div class="calc-field">
                <label for="calcPrice">Prix unitaire (FCFA/kg)</label>
                <input id="calcPrice" type="number" min="0" step="1" placeholder="Ex: 250" />
              </div>
              <div class="calc-field">
                <label for="calcIntrants">Couts intrants (FCFA)</label>
                <input id="calcIntrants" type="number" min="0" step="1000" placeholder="Ex: 2500000" />
              </div>
              <div class="calc-field">
                <label for="calcOther">Autres couts (FCFA)</label>
                <input id="calcOther" type="number" min="0" step="1000" placeholder="Ex: 400000" />
              </div>
            </div>

            <div class="calc-results" id="calcResults">
              <div><span>Rendement</span><strong id="calcYield">0 kg/ha</strong></div>
              <div><span>Revenu total</span><strong id="calcRevenue">0 FCFA</strong></div>
              <div><span>Benefice net</span><strong id="calcProfit">0 FCFA</strong></div>
              <div><span>Marge nette</span><strong id="calcMargin">0%</strong></div>
              <div class="calc-verdict"><span>Verdict</span><strong id="calcVerdict">A completer</strong></div>
            </div>

            <div class="calc-actions">
              <button class="btn" type="button" id="applyCalculatorBtn">Appliquer au bilan</button>
              <button class="btn-ghost" type="button" id="closeCalculatorBtn">Fermer</button>
            </div>
            <div class="form-feedback" id="calculatorFeedback" aria-live="polite"></div>
          </form>
        </section>

        <section class="kpi-grid">
          <article class="card kpi-card">
            <div>
              <h3>Chiffre d'Affaires</h3>
              <strong id="salesKpi">0.00</strong>
              <p>Millions FCFA</p>
            </div>
            <span class="kpi-icon blue">$</span>
          </article>
          <article class="card kpi-card">
            <div>
              <h3>Couts Intrants</h3>
              <strong id="costKpi">0.00</strong>
              <p>Millions FCFA</p>
            </div>
            <span class="kpi-icon red">%</span>
          </article>
          <article class="card kpi-card">
            <div>
              <h3>Benefice Net</h3>
              <strong class="good" id="profitKpi">0.00</strong>
              <p>Millions FCFA</p>
            </div>
            <span class="kpi-icon green">^</span>
          </article>
          <article class="card kpi-card">
            <div>
              <h3>Marge Nette</h3>
              <strong id="marginKpi">0%</strong>
              <p id="marginStatus" class="good">Tres rentable</p>
            </div>
            <span class="kpi-icon purple">#</span>
          </article>
        </section>

        <section class="charts-grid">
          <article class="card">
            <h2>Comparaison Revenus vs Couts</h2>
            <p class="chart-hint">Vert = revenus · Rouge = couts · Violet = benefice (meme echelle)</p>
            <div class="chart-wrap">
              <canvas id="profitChart"></canvas>
            </div>
            <div class="bilan-legend-row" aria-label="Legende des couleurs">
              <span><i class="bilan-dot bilan-dot--rev"></i> Revenus</span>
              <span><i class="bilan-dot bilan-dot--cost"></i> Couts</span>
              <span><i class="bilan-dot bilan-dot--profit"></i> Benefice</span>
            </div>
          </article>
          <article class="card">
            <h2>Performance par Culture</h2>
            <p class="chart-hint">Rendement moyen par culture (t/ha) — axes explicites</p>
            <div class="chart-wrap">
              <canvas id="cultureChart"></canvas>
            </div>
          </article>
        </section>

        <section class="card table-card">
          <h2>Detail des Recoltes et Revenus</h2>
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Parcelle</th>
                  <th>Quantite (kg)</th>
                  <th>Prix Unitaire</th>
                  <th>Revenu Total</th>
                </tr>
              </thead>
              <tbody id="harvestRows"></tbody>
            </table>
          </div>
        </section>

        <section class="export-box">
          <div class="export-title">
            <span class="export-icon">v</span>
            <div>
              <h2>Export du Bilan Financier</h2>
              <p>Generez un rapport PDF professionnel incluant les graphiques, tableaux et analyses de rentabilite.</p>
            </div>
          </div>
          <div class="export-items">
            <div>Inclus dans le rapport <strong>✓ KPIs financiers</strong></div>
            <div>Inclus dans le rapport <strong>✓ Tous les graphiques</strong></div>
            <div>Inclus dans le rapport <strong>✓ Tableaux detailles</strong></div>
          </div>
          <button class="btn export-main" type="button" id="exportPdfBottomBtn">Generer le rapport PDF</button>
        </section>
      </main>

      <div data-layout="footer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js"></script>
    <script src="{{ asset('js/layout.js') }}"></script>
    <script src="{{ asset('js/core.js') }}"></script>
    <script src="{{ asset('js/rentabilite.js') }}"></script>
  </body>
</html>