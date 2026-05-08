// SeneBI - Filtre par région pour la page Parcelles - Module additionnel
(function() {
    'use strict';
    
    class RegionParcellesFilter {
        constructor() {
            this.currentRegion = 'all';
            this.regionData = this.initRegionParcellesData();
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateParcellesPage();
        }

        initRegionParcellesData() {
            // Données de parcelles et récoltes par région du Mali
            return {
                all: {
                    name: 'Toutes les régions',
                    parcels: [
                        { id: 'P-101', name: 'Parcelle Alpha', areaHa: 10.5, culture: 'Riz', status: 'Récoltée', region: 'sik', rendement: 13.7 },
                        { id: 'P-102', name: 'Parcelle Beta', areaHa: 5.0, culture: 'Maïs', status: 'Récoltée', region: 'seg', rendement: 14.1 },
                        { id: 'P-103', name: 'Parcelle Gamma', areaHa: 2.9, culture: 'Coton', status: 'En jachère', region: 'kou', rendement: 13.6 },
                        { id: 'P-104', name: 'Parcelle Delta', areaHa: 6.0, culture: 'Riz', status: 'En culture', region: 'bko', rendement: 13.3 },
                        { id: 'P-105', name: 'Parcelle Epsilon', areaHa: 4.5, culture: 'Maïs', status: 'Récoltée', region: 'kay', rendement: 12.0 },
                        { id: 'P-106', name: 'Parcelle Zeta', areaHa: 3.2, culture: 'Coton', status: 'En culture', region: 'mop', rendement: 12.9 },
                        { id: 'P-107', name: 'Parcelle Eta', areaHa: 1.4, culture: 'Riz', status: 'Récoltée', region: 'tom', rendement: 10.0 },
                        { id: 'P-108', name: 'Parcelle Theta', areaHa: 0.8, culture: 'Maïs', status: 'En jachère', region: 'gao', rendement: 10.0 },
                        { id: 'P-109', name: 'Parcelle Iota', areaHa: 0.3, culture: 'Coton', status: 'En culture', region: 'kid', rendement: 10.0 }
                    ],
                    harvests: [
                        { id: 'H-1', parcelId: 'P-101', date: '2026-10-18', quantityKg: 52000, culture: 'Riz' },
                        { id: 'H-2', parcelId: 'P-102', date: '2026-09-25', quantityKg: 35250, culture: 'Maïs' },
                        { id: 'H-3', parcelId: 'P-104', date: '2026-11-02', quantityKg: 31980, culture: 'Riz' },
                        { id: 'H-4', parcelId: 'P-105', date: '2026-10-10', quantityKg: 27000, culture: 'Maïs' },
                        { id: 'H-5', parcelId: 'P-107', date: '2026-09-15', quantityKg: 7000, culture: 'Riz' }
                    ],
                    totalArea: 34.6,
                    totalHarvest: 153230,
                    averageRendement: 13.2
                },
                bko: {
                    name: 'Bamako',
                    parcels: [
                        { id: 'P-104', name: 'Parcelle Delta', areaHa: 6.0, culture: 'Riz', status: 'En culture', region: 'bko', rendement: 13.3 },
                        { id: 'P-201', name: 'Parcelle Koro', areaHa: 1.5, culture: 'Maïs', status: 'Récoltée', region: 'bko', rendement: 13.5 },
                        { id: 'P-202', name: 'Parcelle Faladié', areaHa: 0.8, culture: 'Coton', status: 'En jachère', region: 'bko', rendement: 13.0 }
                    ],
                    harvests: [
                        { id: 'H-3', parcelId: 'P-104', date: '2026-11-02', quantityKg: 31980, culture: 'Riz' },
                        { id: 'H-6', parcelId: 'P-201', date: '2026-10-20', quantityKg: 10125, culture: 'Maïs' }
                    ],
                    totalArea: 8.3,
                    totalHarvest: 42105,
                    averageRendement: 13.3
                },
                kay: {
                    name: 'Kayes',
                    parcels: [
                        { id: 'P-105', name: 'Parcelle Beta', areaHa: 4.5, culture: 'Maïs', status: 'Récoltée', region: 'kay', rendement: 12.0 },
                        { id: 'P-203', name: 'Parcelle Kayes-Nord', areaHa: 3.0, culture: 'Riz', status: 'En culture', region: 'kay', rendement: 11.8 },
                        { id: 'P-204', name: 'Parcelle Kayes-Sud', areaHa: 2.2, culture: 'Coton', status: 'Récoltée', region: 'kay', rendement: 12.2 }
                    ],
                    harvests: [
                        { id: 'H-4', parcelId: 'P-105', date: '2026-10-10', quantityKg: 27000, culture: 'Maïs' },
                        { id: 'H-7', parcelId: 'P-204', date: '2026-09-28', quantityKg: 11088, culture: 'Coton' }
                    ],
                    totalArea: 9.7,
                    totalHarvest: 38088,
                    averageRendement: 12.0
                },
                kou: {
                    name: 'Koulikoro',
                    parcels: [
                        { id: 'P-103', name: 'Parcelle Gamma', areaHa: 2.9, culture: 'Coton', status: 'En jachère', region: 'kou', rendement: 13.6 },
                        { id: 'P-205', name: 'Parcelle Kati', areaHa: 4.0, culture: 'Riz', status: 'Récoltée', region: 'kou', rendement: 13.8 },
                        { id: 'P-206', name: 'Parcelle Kolokani', areaHa: 2.5, culture: 'Maïs', status: 'En culture', region: 'kou', rendement: 13.4 }
                    ],
                    harvests: [
                        { id: 'H-8', parcelId: 'P-205', date: '2026-10-25', quantityKg: 27600, culture: 'Riz' }
                    ],
                    totalArea: 9.4,
                    totalHarvest: 27600,
                    averageRendement: 13.6
                },
                seg: {
                    name: 'Ségou',
                    parcels: [
                        { id: 'P-102', name: 'Parcelle Beta', areaHa: 5.0, culture: 'Maïs', status: 'Récoltée', region: 'seg', rendement: 14.1 },
                        { id: 'P-207', name: 'Parcelle Ségou-Ville', areaHa: 3.5, culture: 'Riz', status: 'Récoltée', region: 'seg', rendement: 14.3 },
                        { id: 'P-208', name: 'Parcelle Bla', areaHa: 2.8, culture: 'Coton', status: 'En culture', region: 'seg', rendement: 14.0 }
                    ],
                    harvests: [
                        { id: 'H-2', parcelId: 'P-102', date: '2026-09-25', quantityKg: 35250, culture: 'Maïs' },
                        { id: 'H-9', parcelId: 'P-207', date: '2026-11-05', quantityKg: 25025, culture: 'Riz' }
                    ],
                    totalArea: 11.3,
                    totalHarvest: 60275,
                    averageRendement: 14.1
                },
                sik: {
                    name: 'Sikasso',
                    parcels: [
                        { id: 'P-101', name: 'Parcelle Alpha', areaHa: 10.5, culture: 'Riz', status: 'Récoltée', region: 'sik', rendement: 13.7 },
                        { id: 'P-209', name: 'Parcelle Sikasso-Centre', areaHa: 4.2, culture: 'Maïs', status: 'Récoltée', region: 'sik', rendement: 13.5 },
                        { id: 'P-210', name: 'Parcelle Koutiala', areaHa: 3.8, culture: 'Coton', status: 'En culture', region: 'sik', rendement: 13.8 },
                        { id: 'P-211', name: 'Parcelle Bougouni', areaHa: 2.5, culture: 'Riz', status: 'Récoltée', region: 'sik', rendement: 13.9 }
                    ],
                    harvests: [
                        { id: 'H-1', parcelId: 'P-101', date: '2026-10-18', quantityKg: 52000, culture: 'Riz' },
                        { id: 'H-10', parcelId: 'P-209', date: '2026-10-15', quantityKg: 28350, culture: 'Maïs' },
                        { id: 'H-11', parcelId: 'P-211', date: '2026-11-08', quantityKg: 17475, culture: 'Riz' }
                    ],
                    totalArea: 21.0,
                    totalHarvest: 97825,
                    averageRendement: 13.7
                },
                mop: {
                    name: 'Mopti',
                    parcels: [
                        { id: 'P-106', name: 'Parcelle Zeta', areaHa: 3.2, culture: 'Coton', status: 'En culture', region: 'mop', rendement: 12.9 },
                        { id: 'P-212', name: 'Parcelle Mopti-Ville', areaHa: 1.8, culture: 'Riz', status: 'Récoltée', region: 'mop', rendement: 12.7 },
                        { id: 'P-213', name: 'Parcelle Djenné', areaHa: 1.2, culture: 'Maïs', status: 'En jachère', region: 'mop', rendement: 13.0 }
                    ],
                    harvests: [
                        { id: 'H-12', parcelId: 'P-212', date: '2026-10-12', quantityKg: 11412, culture: 'Riz' }
                    ],
                    totalArea: 6.2,
                    totalHarvest: 11412,
                    averageRendement: 12.9
                },
                tom: {
                    name: 'Tombouctou',
                    parcels: [
                        { id: 'P-107', name: 'Parcelle Eta', areaHa: 1.4, culture: 'Riz', status: 'Récoltée', region: 'tom', rendement: 10.0 },
                        { id: 'P-214', name: 'Parcelle Tombouctou-Nord', areaHa: 0.8, culture: 'Maïs', status: 'En culture', region: 'tom', rendement: 9.8 },
                        { id: 'P-215', name: 'Parcelle Goundam', areaHa: 0.5, culture: 'Coton', status: 'Récoltée', region: 'tom', rendement: 10.2 }
                    ],
                    harvests: [
                        { id: 'H-5', parcelId: 'P-107', date: '2026-09-15', quantityKg: 7000, culture: 'Riz' }
                    ],
                    totalArea: 2.7,
                    totalHarvest: 7000,
                    averageRendement: 10.0
                },
                gao: {
                    name: 'Gao',
                    parcels: [
                        { id: 'P-108', name: 'Parcelle Theta', areaHa: 0.8, culture: 'Maïs', status: 'En jachère', region: 'gao', rendement: 10.0 },
                        { id: 'P-216', name: 'Parcelle Gao-Ville', areaHa: 0.6, culture: 'Riz', status: 'Récoltée', region: 'gao', rendement: 9.7 },
                        { id: 'P-217', name: 'Parcelle Ansongo', areaHa: 0.4, culture: 'Coton', status: 'En culture', region: 'gao', rendement: 10.3 }
                    ],
                    harvests: [],
                    totalArea: 1.8,
                    totalHarvest: 0,
                    averageRendement: 10.0
                },
                kid: {
                    name: 'Kidal',
                    parcels: [
                        { id: 'P-109', name: 'Parcelle Iota', areaHa: 0.3, culture: 'Coton', status: 'En culture', region: 'kid', rendement: 10.0 },
                        { id: 'P-218', name: 'Parcelle Kidal-Ville', areaHa: 0.2, culture: 'Maïs', status: 'En jachère', region: 'kid', rendement: 9.5 },
                        { id: 'P-219', name: 'Parcelle Tessalit', areaHa: 0.1, culture: 'Riz', status: 'En culture', region: 'kid', rendement: 10.5 }
                    ],
                    harvests: [],
                    totalArea: 0.6,
                    totalHarvest: 0,
                    averageRendement: 10.0
                }
            };
        }

        bindEvents() {
            const regionSelect = document.getElementById('regionSelectParcel');
            if (regionSelect) {
                regionSelect.addEventListener('change', (e) => {
                    this.currentRegion = e.target.value;
                    this.updateParcellesPage();
                    this.showRegionNotification();
                });
            }
        }

        updateParcellesPage() {
            const data = this.regionData[this.currentRegion];
            if (!data) return;

            // Mettre à jour le sous-titre
            this.updatePageTitle(data.name);
            
            // Filtrer et afficher les parcelles
            this.displayParcels(data.parcels);
            
            // Mettre à jour les statistiques
            this.updateStatistics(data);
            
            // Mettre à jour le formulaire de saisie
            this.updateHarvestForm(data.parcels);
        }

        updatePageTitle(regionName) {
            const pageSubtitle = document.querySelector('.hero-subtitle');
            if (pageSubtitle) {
                const originalText = 'Suivi de la production et des rendements';
                if (this.currentRegion === 'all') {
                    pageSubtitle.textContent = originalText;
                } else {
                    pageSubtitle.textContent = `Suivi de la production et des rendements pour la région de ${regionName}`;
                }
            }
        }

        displayParcels(parcels) {
            const parcelsList = document.getElementById('parcelsList');
            if (!parcelsList) return;

            if (parcels.length === 0) {
                parcelsList.innerHTML = `
                    <div class="no-parcels">
                        <p>Aucune parcelle trouvée pour cette région</p>
                    </div>
                `;
                return;
            }

            // Utiliser le même format que le fichier parcelles.js original
            const data = this.regionData[this.currentRegion];
            const lastHarvestByParcel = new Map();
            
            for (const h of data.harvests) {
                const prev = lastHarvestByParcel.get(h.parcelId);
                if (!prev || prev.date < h.date) lastHarvestByParcel.set(h.parcelId, h);
            }

            const badgeClass = (st) => (st === "En culture" ? "green" : st === "Récoltée" ? "blue" : "yellow");

            // Créer un journal d'activités pour chaque parcelle
            const activityJournal = this.createActivityJournal(parcels);

            parcelsList.innerHTML = parcels
                .map((p) => {
                    const h = lastHarvestByParcel.get(p.id);
                    const hasHarvest = h && Number(h.quantityKg || 0) > 0;
                    const yieldKgHa = hasHarvest ? Number(h.quantityKg) / Number(p.areaHa || 1) : null;
                    const dateFr = h?.date ? new Date(h.date).toLocaleDateString("fr-FR") : null;
                    const journal = activityJournal[p.id] || [];
                    const journalHtml = journal
                        .map(
                            (j) => `
                            <li class="parcel-journal-item">
                              <span class="parcel-journal-k">${j.label}</span>
                              <span class="parcel-journal-v">${j.value}</span>
                            </li>`
                        )
                        .join("");
                    return `
                      <article class="parcel-card">
                        <div class="parcel-head">
                          <div class="parcel-name">${p.name}</div>
                          <span class="badge ${badgeClass(p.status)}">${p.status}</span>
                        </div>

                        <div class="parcel-body">
                        <div class="parcel-grid">
                          <div class="kv"><div class="k">Culture</div><div class="v">${p.culture}</div></div>
                          <div class="kv"><div class="k">Surface</div><div class="v">${this.fmtHectaresWord(p.areaHa)}</div></div>
                          <div class="kv"><div class="k">Dernière récolte</div><div class="v">${dateFr || "—"}</div></div>

                          <div class="kv"><div class="k">Quantité</div><div class="v">${hasHarvest ? this.fmtKg(h.quantityKg) : "—"}</div></div>
                          <div class="kv">
                            <div class="k">Rendement</div>
                            <div class="v yield">
                              <span>${hasHarvest ? this.fmtKgPerHa(yieldKgHa) : "—"}</span>
                              ${hasHarvest ? `<span class="yield-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>` : ""}
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <aside class="parcel-journal" aria-label="Journal d'activites">
                          <div class="parcel-journal-title">Journal d'activites</div>
                          <ul class="parcel-journal-list">
                            ${journalHtml}
                          </ul>
                        </aside>
                        </div>
                      </article>
                    `;
                })
                .join("");

            // Mettre à jour le sélecteur de parcelles
            this.updateParcelSelect(parcels);
        }

        getHarvestInfo(parcelId) {
            const data = this.regionData[this.currentRegion];
            const harvest = data.harvests.find(h => h.parcelId === parcelId);
            
            if (!harvest) return '';
            
            return `
                <div class="harvest-info">
                    <div class="harvest-detail">
                        <span class="harvest-label">Dernière récolte</span>
                        <span class="harvest-value">${new Date(harvest.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div class="harvest-detail">
                        <span class="harvest-label">Quantité</span>
                        <span class="harvest-value">${harvest.quantityKg.toLocaleString()} kg</span>
                    </div>
                </div>
            `;
        }

        updateStatistics(data) {
            // Mettre à jour les statistiques si elles existent dans la page
            const statsContainer = document.querySelector('.parcelles-stats');
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="stat-item">
                        <span class="stat-label">Surface totale</span>
                        <span class="stat-value">${data.totalArea} ha</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Récoltes totales</span>
                        <span class="stat-value">${data.totalHarvest.toLocaleString()} kg</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rendement moyen</span>
                        <span class="stat-value">${data.averageRendement} t/ha</span>
                    </div>
                `;
            }
        }

        updateHarvestForm(parcels) {
            const harvestParcel = document.getElementById('harvestParcel');
            if (!harvestParcel) return;

            // Vider les options existantes sauf la première
            harvestParcel.innerHTML = '<option value="">Sélectionner une parcelle</option>';

            // Ajouter les parcelles en culture de la région
            const availableParcels = parcels.filter(p => p.status === 'En culture');
            
            availableParcels.forEach(parcel => {
                const option = document.createElement('option');
                option.value = parcel.id;
                option.textContent = `${parcel.name} (${parcel.culture} - ${parcel.areaHa} ha)`;
                harvestParcel.appendChild(option);
            });

            // Mettre à jour les placeholders avec les valeurs régionales
            const harvestQty = document.getElementById('harvestQty');
            if (harvestQty) {
                const avgYield = this.getAverageYieldForRegion();
                harvestQty.placeholder = `Ex: ${Math.round(avgYield * 1000)} kg (rendement moyen région)`;
            }
        }

        getAverageYieldForRegion() {
            const data = this.regionData[this.currentRegion];
            if (!data || !data.parcels.length) return 13.0;
            
            const totalYield = data.parcels.reduce((sum, parcel) => sum + (parcel.rendement * parcel.areaHa), 0);
            const totalArea = data.parcels.reduce((sum, parcel) => sum + parcel.areaHa, 0);
            
            return totalYield / totalArea;
        }

        openHarvestForm(parcelId) {
            // Ouvrir le formulaire de récolte
            const harvestPanel = document.getElementById('harvestPanel');
            const harvestParcel = document.getElementById('harvestParcel');
            
            if (harvestPanel && harvestParcel) {
                harvestPanel.setAttribute('aria-hidden', 'false');
                harvestParcel.value = parcelId;
                
                // Pré-remplir avec les données de la parcelle
                const data = this.regionData[this.currentRegion];
                const parcel = data.parcels.find(p => p.id === parcelId);
                
                if (parcel) {
                    const harvestQty = document.getElementById('harvestQty');
                    if (harvestQty) {
                        const estimatedYield = parcel.rendement * parcel.areaHa * 1000; // kg
                        harvestQty.placeholder = `Ex: ${Math.round(estimatedYield)} kg (estimation)`;
                    }
                }
            }
        }

        viewParcelDetails(parcelId) {
            const data = this.regionData[this.currentRegion];
            const parcel = data.parcels.find(p => p.id === parcelId);
            
            if (!parcel) return;
            
            // Créer une modale avec les détails
            const modal = document.createElement('div');
            modal.className = 'parcel-detail-modal';
            modal.innerHTML = `
                <div class="modal-backdrop" onclick="regionParcellesFilter.closeModal()"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Détails de ${parcel.name}</h3>
                        <button class="close-btn" onclick="regionParcellesFilter.closeModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">Identifiant</span>
                                <span class="detail-value">${parcel.id}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Surface</span>
                                <span class="detail-value">${parcel.areaHa} hectares</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Culture</span>
                                <span class="detail-value">${parcel.culture}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Statut</span>
                                <span class="detail-value">${parcel.status}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Rendement</span>
                                <span class="detail-value">${parcel.rendement} tonnes/ha</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Région</span>
                                <span class="detail-value">${data.name}</span>
                            </div>
                        </div>
                        ${this.getParcelHarvestHistory(parcelId)}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 10);
        }

        getParcelHarvestHistory(parcelId) {
            const data = this.regionData[this.currentRegion];
            const harvests = data.harvests.filter(h => h.parcelId === parcelId);
            
            if (harvests.length === 0) return '';
            
            return `
                <div class="harvest-history">
                    <h4>Historique des récoltes</h4>
                    ${harvests.map(harvest => `
                        <div class="harvest-item">
                            <span class="harvest-date">${new Date(harvest.date).toLocaleDateString('fr-FR')}</span>
                            <span class="harvest-culture">${harvest.culture}</span>
                            <span class="harvest-quantity">${harvest.quantityKg.toLocaleString()} kg</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        closeModal() {
            const modal = document.querySelector('.parcel-detail-modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        }

        showRegionNotification() {
            const data = this.regionData[this.currentRegion];
            if (!data || this.currentRegion === 'all') return;

            // Créer une notification temporaire
            const notification = document.createElement('div');
            notification.className = 'region-notification';
            notification.innerHTML = `
                <div class="region-notification-content">
                    <span class="region-icon">📍</span>
                    <span class="region-text">${data.parcels.length} parcelles dans ${data.name}</span>
                    <button class="region-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            
            // Ajouter au body
            document.body.appendChild(notification);
            
            // Animation d'entrée
            setTimeout(() => notification.classList.add('show'), 10);
            
            // Retirer après 3 secondes
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Méthode pour obtenir les données actuelles
        getCurrentRegionData() {
            return this.regionData[this.currentRegion];
        }

        createActivityJournal(parcels) {
            const journal = {};
            
            parcels.forEach(parcel => {
                const activities = [];
                
                // Ajouter des activités selon le statut et la culture
                if (parcel.status === 'En culture') {
                    activities.push(
                        { label: "Dernier arrosage", value: this.getRandomRecentDate() },
                        { label: "Engrais appliqué", value: this.getRandomRecentDate() + " (NPK)" },
                        { label: "Traitement phytosanitaire", value: this.getRandomRecentDate() }
                    );
                } else if (parcel.status === 'Récoltée') {
                    activities.push(
                        { label: "Récolte effectuée", value: this.getHarvestDate(parcel.id) },
                        { label: "Dernier arrosage", value: "Avant récolte" },
                        { label: "Engrais appliqué", value: this.getRandomDateBeforeHarvest(parcel.id) }
                    );
                } else { // En jachère
                    activities.push(
                        { label: "Dernier arrosage", value: "— (jachère)" },
                        { label: "Dernière intervention", value: this.getRandomOldDate() }
                    );
                }
                
                journal[parcel.id] = activities;
            });
            
            return journal;
        }

        getRandomRecentDate() {
            const options = ["Hier", "Aujourd'hui (matin)", "Il y a 2 jours", "Il y a 3 jours", "Hier (soir)"];
            return options[Math.floor(Math.random() * options.length)];
        }

        getHarvestDate(parcelId) {
            const data = this.regionData[this.currentRegion];
            const harvest = data.harvests.find(h => h.parcelId === parcelId);
            return harvest ? new Date(harvest.date).toLocaleDateString('fr-FR') : "—";
        }

        getRandomDateBeforeHarvest(parcelId) {
            const data = this.regionData[this.currentRegion];
            const harvest = data.harvests.find(h => h.parcelId === parcelId);
            if (!harvest) return "—";
            
            const harvestDate = new Date(harvest.date);
            const daysBefore = Math.floor(Math.random() * 30) + 10; // 10-40 jours avant
            const activityDate = new Date(harvestDate);
            activityDate.setDate(activityDate.getDate() - daysBefore);
            
            return activityDate.toLocaleDateString('fr-FR');
        }

        getRandomOldDate() {
            const months = ["01/02/2026", "15/01/2026", "01/01/2026", "20/12/2025"];
            return months[Math.floor(Math.random() * months.length)];
        }

        updateParcelSelect(parcels) {
            const parcelSelect = document.getElementById('harvestParcel');
            if (parcelSelect) {
                const availableParcels = parcels.filter(p => p.status === 'En culture');
                parcelSelect.innerHTML = `<option value="">Sélectionner une parcelle</option>` + 
                    availableParcels.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
            }
        }

        // Fonctions de formatage comme dans parcelles.js
        fmtHectaresWord(n) {
            const v = Number(n || 0);
            const num = v.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
            return `${num} hectares`;
        }

        fmtKg(n) {
            return `${Number(n || 0).toLocaleString("fr-FR")} kg`;
        }

        fmtKgPerHa(n) {
            const v = Math.round(Number(n || 0));
            return `${v.toLocaleString("fr-FR")} kg/ha`;
        }

        // Méthode pour réinitialiser à "Toutes les régions"
        resetToAll() {
            this.currentRegion = 'all';
            const regionSelect = document.getElementById('regionSelectParcel');
            if (regionSelect) {
                regionSelect.value = 'all';
            }
            this.updateParcellesPage();
        }
    }

    // Créer l'instance globale
    window.regionParcellesFilter = new RegionParcellesFilter();

})();
