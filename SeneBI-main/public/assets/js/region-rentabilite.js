// SeneBI - Filtre par région pour la page Rentabilité - Module additionnel
(function() {
    'use strict';
    
    class RegionRentabiliteFilter {
        constructor() {
            this.currentRegion = 'all';
            this.regionData = this.initRegionRentabiliteData();
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateRentabilitePage();
        }

        initRegionRentabiliteData() {
            // Données de rentabilité par région du Mali
            return {
                all: {
                    name: 'Toutes les régions',
                    salesFcfa: 14200000,
                    intrantsCostFcfa: 6100000,
                    exportsFcfa: 3200000,
                    margeFcfa: 8100000,
                    rentabilite: 57.0,
                    coutProduction: 4300, // FCFA/kg
                    prixVenteMoyen: 5800, // FCFA/kg
                    beneficeParHa: 431000, // FCFA/hectare
                    cultures: [
                        { name: 'Riz', surface: 8.3, ca: 6240000, marge: 3560000 },
                        { name: 'Maïs', surface: 6.2, ca: 4650000, marge: 2670000 },
                        { name: 'Coton', surface: 4.3, ca: 3290000, marge: 1870000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 1100000, cout: 480000 },
                        { mois: 'Fév', ca: 1200000, cout: 520000 },
                        { mois: 'Mar', ca: 1150000, cout: 490000 },
                        { mois: 'Avr', ca: 1250000, cout: 540000 },
                        { mois: 'Mai', ca: 1180000, cout: 510000 },
                        { mois: 'Jun', ca: 1220000, cout: 530000 },
                        { mois: 'Jul', ca: 1300000, cout: 560000 },
                        { mois: 'Aoû', ca: 1280000, cout: 550000 },
                        { mois: 'Sep', ca: 1350000, cout: 580000 },
                        { mois: 'Oct', ca: 1400000, cout: 600000 },
                        { mois: 'Nov', ca: 1380000, cout: 590000 },
                        { mois: 'Déc', ca: 1420000, cout: 610000 }
                    ]
                },
                bko: {
                    name: 'Bamako',
                    salesFcfa: 1680000,
                    intrantsCostFcfa: 720000,
                    exportsFcfa: 380000,
                    margeFcfa: 960000,
                    rentabilite: 57.1,
                    coutProduction: 4280,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 457000,
                    cultures: [
                        { name: 'Riz', surface: 1.0, ca: 680000, marge: 389000 },
                        { name: 'Maïs', surface: 0.7, ca: 560000, marge: 322000 },
                        { name: 'Coton', surface: 0.4, ca: 440000, marge: 249000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 130000, cout: 56000 },
                        { mois: 'Fév', ca: 140000, cout: 60000 },
                        { mois: 'Mar', ca: 135000, cout: 58000 },
                        { mois: 'Avr', ca: 145000, cout: 62000 },
                        { mois: 'Mai', ca: 138000, cout: 59000 },
                        { mois: 'Jun', ca: 142000, cout: 61000 },
                        { mois: 'Jul', ca: 150000, cout: 64000 },
                        { mois: 'Aoû', ca: 148000, cout: 63000 },
                        { mois: 'Sep', ca: 155000, cout: 66000 },
                        { mois: 'Oct', ca: 160000, cout: 68000 },
                        { mois: 'Nov', ca: 158000, cout: 67000 },
                        { mois: 'Déc', ca: 162000, cout: 69000 }
                    ]
                },
                kay: {
                    name: 'Kayes',
                    salesFcfa: 2520000,
                    intrantsCostFcfa: 1120000,
                    exportsFcfa: 560000,
                    margeFcfa: 1400000,
                    rentabilite: 55.6,
                    coutProduction: 4480,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 400000,
                    cultures: [
                        { name: 'Riz', surface: 1.2, ca: 840000, marge: 467000 },
                        { name: 'Maïs', surface: 1.4, ca: 980000, marge: 549000 },
                        { name: 'Coton', surface: 0.9, ca: 700000, marge: 384000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 190000, cout: 85000 },
                        { mois: 'Fév', ca: 200000, cout: 89000 },
                        { mois: 'Mar', ca: 195000, cout: 87000 },
                        { mois: 'Avr', ca: 210000, cout: 93000 },
                        { mois: 'Mai', ca: 205000, cout: 91000 },
                        { mois: 'Jun', ca: 208000, cout: 92000 },
                        { mois: 'Jul', ca: 220000, cout: 98000 },
                        { mois: 'Aoû', ca: 218000, cout: 97000 },
                        { mois: 'Sep', ca: 225000, cout: 100000 },
                        { mois: 'Oct', ca: 230000, cout: 102000 },
                        { mois: 'Nov', ca: 228000, cout: 101000 },
                        { mois: 'Déc', ca: 232000, cout: 103000 }
                    ]
                },
                kou: {
                    name: 'Koulikoro',
                    salesFcfa: 2280000,
                    intrantsCostFcfa: 980000,
                    exportsFcfa: 510000,
                    margeFcfa: 1300000,
                    rentabilite: 57.0,
                    coutProduction: 4250,
                    prixVenteMoyen: 5780,
                    beneficeParHa: 464000,
                    cultures: [
                        { name: 'Riz', surface: 1.4, ca: 952000, marge: 543000 },
                        { name: 'Maïs', surface: 0.8, ca: 544000, marge: 311000 },
                        { name: 'Coton', surface: 0.6, ca: 784000, marge: 446000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 175000, cout: 75000 },
                        { mois: 'Fév', ca: 185000, cout: 79000 },
                        { mois: 'Mar', ca: 180000, cout: 77000 },
                        { mois: 'Avr', ca: 190000, cout: 81000 },
                        { mois: 'Mai', ca: 183000, cout: 78000 },
                        { mois: 'Jun', ca: 187000, cout: 80000 },
                        { mois: 'Jul', ca: 195000, cout: 83000 },
                        { mois: 'Aoû', ca: 193000, cout: 82000 },
                        { mois: 'Sep', ca: 200000, cout: 85000 },
                        { mois: 'Oct', ca: 205000, cout: 87000 },
                        { mois: 'Nov', ca: 203000, cout: 86000 },
                        { mois: 'Déc', ca: 207000, cout: 88000 }
                    ]
                },
                seg: {
                    name: 'Ségou',
                    salesFcfa: 2700000,
                    intrantsCostFcfa: 1150000,
                    exportsFcfa: 600000,
                    margeFcfa: 1550000,
                    rentabilite: 57.4,
                    coutProduction: 4220,
                    prixVenteMoyen: 5940,
                    beneficeParHa: 484000,
                    cultures: [
                        { name: 'Riz', surface: 1.7, ca: 1156000, marge: 663000 },
                        { name: 'Maïs', surface: 0.9, ca: 594000, marge: 340000 },
                        { name: 'Coton', surface: 0.6, ca: 950000, marge: 547000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 210000, cout: 89000 },
                        { mois: 'Fév', ca: 220000, cout: 93000 },
                        { mois: 'Mar', ca: 215000, cout: 91000 },
                        { mois: 'Avr', ca: 230000, cout: 97000 },
                        { mois: 'Mai', ca: 223000, cout: 94000 },
                        { mois: 'Jun', ca: 227000, cout: 96000 },
                        { mois: 'Jul', ca: 235000, cout: 99000 },
                        { mois: 'Aoû', ca: 233000, cout: 98000 },
                        { mois: 'Sep', ca: 240000, cout: 101000 },
                        { mois: 'Oct', ca: 245000, cout: 103000 },
                        { mois: 'Nov', ca: 243000, cout: 102000 },
                        { mois: 'Déc', ca: 247000, cout: 104000 }
                    ]
                },
                sik: {
                    name: 'Sikasso',
                    salesFcfa: 3120000,
                    intrantsCostFcfa: 1340000,
                    exportsFcfa: 700000,
                    margeFcfa: 1780000,
                    rentabilite: 57.1,
                    coutProduction: 4310,
                    prixVenteMoyen: 5820,
                    beneficeParHa: 468000,
                    cultures: [
                        { name: 'Riz', surface: 1.5, ca: 1020000, marge: 581000 },
                        { name: 'Maïs', surface: 1.4, ca: 868000, marge: 496000 },
                        { name: 'Maïs', surface: 0.9, ca: 1232000, marge: 703000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 240000, cout: 103000 },
                        { mois: 'Fév', ca: 250000, cout: 107000 },
                        { mois: 'Mar', ca: 245000, cout: 105000 },
                        { mois: 'Avr', ca: 260000, cout: 111000 },
                        { mois: 'Mai', ca: 253000, cout: 108000 },
                        { mois: 'Jun', ca: 257000, cout: 110000 },
                        { mois: 'Jul', ca: 265000, cout: 113000 },
                        { mois: 'Aoû', ca: 263000, cout: 112000 },
                        { mois: 'Sep', ca: 270000, cout: 115000 },
                        { mois: 'Oct', ca: 275000, cout: 117000 },
                        { mois: 'Nov', ca: 273000, cout: 116000 },
                        { mois: 'Déc', ca: 277000, cout: 118000 }
                    ]
                },
                mop: {
                    name: 'Mopti',
                    salesFcfa: 1080000,
                    intrantsCostFcfa: 480000,
                    exportsFcfa: 240000,
                    margeFcfa: 600000,
                    rentabilite: 55.6,
                    coutProduction: 4440,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 429000,
                    cultures: [
                        { name: 'Riz', surface: 0.6, ca: 408000, marge: 228000 },
                        { name: 'Maïs', surface: 0.4, ca: 272000, marge: 152000 },
                        { name: 'Coton', surface: 0.4, ca: 400000, marge: 220000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 85000, cout: 38000 },
                        { mois: 'Fév', ca: 90000, cout: 40000 },
                        { mois: 'Mar', ca: 87000, cout: 39000 },
                        { mois: 'Avr', ca: 95000, cout: 42000 },
                        { mois: 'Mai', ca: 92000, cout: 41000 },
                        { mois: 'Jun', ca: 94000, cout: 42000 },
                        { mois: 'Jul', ca: 98000, cout: 44000 },
                        { mois: 'Aoû', ca: 97000, cout: 43000 },
                        { mois: 'Sep', ca: 100000, cout: 45000 },
                        { mois: 'Oct', ca: 102000, cout: 46000 },
                        { mois: 'Nov', ca: 101000, cout: 45000 },
                        { mois: 'Déc', ca: 103000, cout: 46000 }
                    ]
                },
                tom: {
                    name: 'Tombouctou',
                    salesFcfa: 480000,
                    intrantsCostFcfa: 220000,
                    exportsFcfa: 100000,
                    margeFcfa: 260000,
                    rentabilite: 54.2,
                    coutProduction: 5500,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 325000,
                    cultures: [
                        { name: 'Riz', surface: 0.2, ca: 120000, marge: 56000 },
                        { name: 'Maïs', surface: 0.4, ca: 240000, marge: 112000 },
                        { name: 'Coton', surface: 0.2, ca: 120000, marge: 92000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 38000, cout: 17500 },
                        { mois: 'Fév', ca: 40000, cout: 18500 },
                        { mois: 'Mar', ca: 39000, cout: 18000 },
                        { mois: 'Avr', ca: 42000, cout: 19300 },
                        { mois: 'Mai', ca: 41000, cout: 18800 },
                        { mois: 'Jun', ca: 41500, cout: 19000 },
                        { mois: 'Jul', ca: 43000, cout: 19700 },
                        { mois: 'Aoû', ca: 42500, cout: 19500 },
                        { mois: 'Sep', ca: 44000, cout: 20200 },
                        { mois: 'Oct', ca: 44500, cout: 20400 },
                        { mois: 'Nov', ca: 44200, cout: 20300 },
                        { mois: 'Déc', ca: 44700, cout: 20500 }
                    ]
                },
                gao: {
                    name: 'Gao',
                    salesFcfa: 360000,
                    intrantsCostFcfa: 170000,
                    exportsFcfa: 80000,
                    margeFcfa: 190000,
                    rentabilite: 52.8,
                    coutProduction: 5667,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 317000,
                    cultures: [
                        { name: 'Riz', surface: 0.2, ca: 84000, marge: 38000 },
                        { name: 'Maïs', surface: 0.3, ca: 126000, marge: 57000 },
                        { name: 'Coton', surface: 0.1, ca: 150000, marge: 95000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 29000, cout: 13700 },
                        { mois: 'Fév', ca: 30000, cout: 14200 },
                        { mois: 'Mar', ca: 29500, cout: 14000 },
                        { mois: 'Avr', ca: 31500, cout: 14900 },
                        { mois: 'Mai', ca: 31000, cout: 14700 },
                        { mois: 'Jun', ca: 31200, cout: 14800 },
                        { mois: 'Jul', ca: 32000, cout: 15200 },
                        { mois: 'Aoû', ca: 31800, cout: 15100 },
                        { mois: 'Sep', ca: 32500, cout: 15400 },
                        { mois: 'Oct', ca: 32700, cout: 15500 },
                        { mois: 'Nov', ca: 32600, cout: 15500 },
                        { mois: 'Déc', ca: 32800, cout: 15600 }
                    ]
                },
                kid: {
                    name: 'Kidal',
                    salesFcfa: 180000,
                    intrantsCostFcfa: 90000,
                    exportsFcfa: 40000,
                    margeFcfa: 90000,
                    rentabilite: 50.0,
                    coutProduction: 6000,
                    prixVenteMoyen: 6000,
                    beneficeParHa: 300000,
                    cultures: [
                        { name: 'Riz', surface: 0.1, ca: 30000, marge: 12000 },
                        { name: 'Maïs', surface: 0.2, ca: 60000, marge: 24000 },
                        { name: 'Coton', surface: 0.0, ca: 90000, marge: 54000 }
                    ],
                    evolution: [
                        { mois: 'Jan', ca: 14500, cout: 7300 },
                        { mois: 'Fév', ca: 15000, cout: 7500 },
                        { mois: 'Mar', ca: 14800, cout: 7400 },
                        { mois: 'Avr', ca: 15800, cout: 7900 },
                        { mois: 'Mai', ca: 15600, cout: 7800 },
                        { mois: 'Jun', ca: 15700, cout: 7850 },
                        { mois: 'Jul', ca: 16000, cout: 8000 },
                        { mois: 'Aoû', ca: 15900, cout: 7950 },
                        { mois: 'Sep', ca: 16200, cout: 8100 },
                        { mois: 'Oct', ca: 16300, cout: 8150 },
                        { mois: 'Nov', ca: 16250, cout: 8125 },
                        { mois: 'Déc', ca: 16400, cout: 8200 }
                    ]
                }
            };
        }

        bindEvents() {
            const regionSelect = document.getElementById('regionSelectRent');
            if (regionSelect) {
                regionSelect.addEventListener('change', (e) => {
                    this.currentRegion = e.target.value;
                    this.updateRentabilitePage();
                    this.showRegionNotification();
                });
            }
        }

        updateRentabilitePage() {
            const data = this.regionData[this.currentRegion];
            if (!data) return;

            // Mettre à jour les KPIs financiers
            this.updateFinancialKPIs(data);
            
            // Mettre à jour le sous-titre
            this.updatePageTitle(data.name);
            
            // Mettre à jour les graphiques
            this.updateRentabiliteCharts(data);
            
            // Mettre à jour le calculateur
            this.updateCalculatorDefaults(data);
        }

        updateFinancialKPIs(data) {
            // Mettre à jour les chiffres affichés dans la page
            this.updateValue('sales-fcfa', data.salesFcfa.toLocaleString());
            this.updateValue('intrants-cost-fcfa', data.intrantsCostFcfa.toLocaleString());
            this.updateValue('exports-fcfa', data.exportsFcfa.toLocaleString());
            this.updateValue('marge-fcfa', data.margeFcfa.toLocaleString());
            this.updateValue('rentabilite-pct', data.rentabilite.toFixed(1) + '%');
            this.updateValue('cout-production', data.coutProduction.toLocaleString());
            this.updateValue('prix-vente-moyen', data.prixVenteMoyen.toLocaleString());
            this.updateValue('benefice-par-ha', data.beneficeParHa.toLocaleString());
        }

        updateValue(elementId, value) {
            const element = document.getElementById(elementId);
            if (element) {
                // Animation de comptage
                const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
                const targetValue = parseFloat(value.replace(/[^0-9.]/g, ''));
                
                this.animateValue(element, currentValue, targetValue, 500, value);
            }
        }

        animateValue(element, start, end, duration, finalText) {
            const startTime = performance.now();
            const elementId = element.id;
            
            const updateValue = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = start + (end - start) * this.easeOutQuad(progress);
                
                if (elementId.includes('pct')) {
                    element.textContent = currentValue.toFixed(1) + '%';
                } else if (elementId === 'cout-production' || elementId === 'prix-vente-moyen' || elementId === 'benefice-par-ha') {
                    element.textContent = Math.round(currentValue).toLocaleString();
                } else {
                    element.textContent = Math.round(currentValue).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateValue);
                } else {
                    element.textContent = finalText;
                }
            };
            
            requestAnimationFrame(updateValue);
        }

        easeOutQuad(t) {
            return t * (2 - t);
        }

        updatePageTitle(regionName) {
            const pageSubtitle = document.querySelector('.page-head p');
            if (pageSubtitle) {
                const originalText = 'Analyse financiere et generation de rapports';
                if (this.currentRegion === 'all') {
                    pageSubtitle.textContent = originalText;
                } else {
                    pageSubtitle.textContent = `Analyse financiere pour la région de ${regionName} et generation de rapports`;
                }
            }
        }

        updateRentabiliteCharts(data) {
            // Mettre à jour le graphique d'évolution CA/coûts
            const evolutionChart = window.rentabiliteCharts?.evolutionChart;
            if (evolutionChart && data.evolution) {
                evolutionChart.data.datasets[0].data = data.evolution.map(m => m.ca);
                evolutionChart.data.datasets[1].data = data.evolution.map(m => m.cout);
                evolutionChart.update();
            }

            // Mettre à jour le graphique de répartition par culture
            const culturesChart = window.rentabiliteCharts?.culturesChart;
            if (culturesChart && data.cultures) {
                culturesChart.data.datasets[0].data = data.cultures.map(c => c.ca);
                culturesChart.data.datasets[1].data = data.cultures.map(c => c.marge);
                culturesChart.update();
            }
        }

        updateCalculatorDefaults(data) {
            // Mettre à jour les valeurs par défaut du calculateur
            const prixUnitaire = document.getElementById('calcPrice');
            const coutIntrants = document.getElementById('calcIntrants');
            
            if (prixUnitaire && data.prixVenteMoyen) {
                prixUnitaire.placeholder = `Ex: ${data.prixVenteMoyen}`;
            }
            
            if (coutIntrants && data.coutProduction) {
                coutIntrants.placeholder = `Ex: ${data.coutProduction}`;
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
                    <span class="region-text">Rentabilité pour ${data.name}: ${data.rentabilite.toFixed(1)}%</span>
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

        // Méthode pour réinitialiser à "Toutes les régions"
        resetToAll() {
            this.currentRegion = 'all';
            const regionSelect = document.getElementById('regionSelectRent');
            if (regionSelect) {
                regionSelect.value = 'all';
            }
            this.updateRentabilitePage();
        }
    }

    // Créer l'instance globale
    window.regionRentabiliteFilter = new RegionRentabiliteFilter();

    // Sauvegarder les graphiques existants pour pouvoir les mettre à jour
    window.rentabiliteCharts = window.rentabiliteCharts || {};

})();
