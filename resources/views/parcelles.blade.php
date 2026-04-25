<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI — Parcelles</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/parcelles.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/region-filter.css') }}" />
  </head>
  <body data-page="parcels">
    <div class="app">
      <div data-layout="header"></div>

      <main class="container">
        <div class="page-hero">
          <div>
            <h1 class="hero-title">Gestion des Parcelles & Récoltes</h1>
            <p class="hero-subtitle">Suivi de la production et des rendements</p>
          </div>
          <div class="hero-actions">
            <div class="region-selector">
              <label for="regionSelectParcel" class="region-label">Région</label>
              <select id="regionSelectParcel" class="region-dropdown">
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
            <button class="action-btn" id="openHarvestBtn" type="button">
              <span class="action-plus">+</span>
              <span>Saisir une récolte</span>
            </button>
          </div>
        </div>

        <section class="card harvest-panel" id="harvestPanel" aria-hidden="true">
          <h2 class="panel-title">Nouvelle Récolte</h2>

          <form class="panel-form" id="harvestForm">
            <div class="panel-field">
              <label for="harvestParcel">Parcelle</label>
              <select id="harvestParcel" required>
                <option value="">Sélectionner une parcelle</option>
              </select>
            </div>

            <div class="panel-grid-2">
              <div class="panel-field">
                <label for="harvestDate">Date de récolte</label>
                <div class="input-icon">
                  <input id="harvestDate" type="date" required />
                  <span class="icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="4"></rect>
                      <path d="M16 2v4M8 2v4"></path>
                      <path d="M3 10h18"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="panel-field">
                <label for="harvestQty">Poids récolté (kg)</label>
                <input id="harvestQty" type="number" min="1" step="1" placeholder="Ex: 15000" required />
              </div>
            </div>

            <div class="panel-actions">
              <button class="btn-primary" type="submit">Enregistrer</button>
              <button class="btn-ghost" id="cancelHarvestBtn" type="button">Annuler</button>
            </div>
          </form>
        </section>

        <section class="parcels-list" id="parcelsList"></section>
      </main>
      <div data-layout="footer"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
    <script src="{{ asset('assets/js/layout.js') }}"></script>
    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/parcelles.js') }}"></script>
    <script src="{{ asset('assets/js/region-filter.js') }}"></script>
    <script src="{{ asset('assets/js/region-parcelles.js') }}"></script>
  </body>
</html>

