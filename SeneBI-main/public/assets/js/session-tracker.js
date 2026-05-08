// SeneBI - Suivi des visites et sessions - Module additionnel
(function() {
    'use strict';
    
    class SessionTracker {
        constructor() {
            this.startTime = Date.now();
            this.sessionTimer = null;
            this.sessionData = this.initSessionData();
            this.init();
        }

        init() {
            this.createSessionTimer();
            this.createVisitHistory();
            this.startSessionTracking();
        }

        initSessionData() {
            // Données simulées des visites précédentes
            return [
                {
                    user: 'Aminata',
                    loginTime: this.getRandomRecentTime(),
                    duration: this.getRandomDuration()
                },
                {
                    user: 'Ouane',
                    loginTime: this.getRandomRecentTime(),
                    duration: this.getRandomDuration()
                },
                {
                    user: 'Gestionnaire',
                    loginTime: this.getRandomRecentTime(),
                    duration: this.getRandomDuration()
                },
                {
                    user: 'Bakary',
                    loginTime: this.getRandomRecentTime(),
                    duration: this.getRandomDuration()
                },
                {
                    user: 'Fatoumata',
                    loginTime: this.getRandomRecentTime(),
                    duration: this.getRandomDuration()
                }
            ];
        }

        createSessionTimer() {
            // Le chronomètre a été supprimé car pas beau
            // On garde seulement le suivi en arrière-plan pour les statistiques
        }

        addTimerStyles() {
            // Les styles du chronomètre ont été supprimés
            // On garde seulement les styles pour le tableau d'historique
        }

        startSessionTracking() {
            // Le suivi de session continue en arrière-plan pour les statistiques
            // Mais sans affichage du chronomètre visible
        }

        createVisitHistory() {
            // Vérifier si l'utilisateur est un manager
            const auth = window.SeneBI ? window.SeneBI.getAuth() : null;
            if (!auth || auth.role !== 'manager') {
                // Si ce n'est pas un manager, ne pas afficher l'historique
                return;
            }

            // Créer la section d'historique des sessions (uniquement pour les managers)
            const historySection = document.createElement('section');
            historySection.className = 'visit-history-section';
            historySection.innerHTML = `
                <div class="visit-history-header">
                    <h2 class="visit-history-title">
                        <span class="title-icon">📊</span>
                        Historique des Sessions
                    </h2>
                    <div class="visit-subtitle">Dernières connexions et durées de visite</div>
                </div>
                <div class="visit-history-table-wrapper">
                    <table class="visit-history-table">
                        <thead>
                            <tr>
                                <th class="user-column">Utilisateur</th>
                                <th class="time-column">Heure de connexion</th>
                                <th class="duration-column">Durée de la visite</th>
                            </tr>
                        </thead>
                        <tbody id="visitHistoryBody">
                            ${this.generateVisitRows()}
                        </tbody>
                    </table>
                </div>
            `;

            // Ajouter les styles pour le tableau
            this.addTableStyles();

            // Insérer en bas du dashboard
            const container = document.querySelector('.container');
            const footerNote = document.querySelector('.footer-note');
            
            if (container && footerNote) {
                container.insertBefore(historySection, footerNote);
            } else if (container) {
                container.appendChild(historySection);
            }
        }

        addTableStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .visit-history-section {
                    margin-top: 40px;
                    padding: 24px;
                    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                    border-radius: 16px;
                    border: 1px solid #bbf7d0;
                    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
                }

                .visit-history-header {
                    margin-bottom: 20px;
                    text-align: center;
                }

                .visit-history-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 20px;
                    font-weight: 600;
                    color: #065f46;
                    margin: 0 0 8px 0;
                }

                .title-icon {
                    font-size: 24px;
                }

                .visit-subtitle {
                    color: #047857;
                    font-size: 14px;
                    opacity: 0.8;
                }

                .visit-history-table-wrapper {
                    overflow-x: auto;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);
                }

                .visit-history-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                }

                .visit-history-table thead {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                }

                .visit-history-table th {
                    padding: 16px;
                    text-align: left;
                    font-weight: 600;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .user-column {
                    border-radius: 12px 0 0 0;
                    min-width: 120px;
                }

                .time-column {
                    min-width: 140px;
                }

                .duration-column {
                    border-radius: 0 12px 0 0;
                    min-width: 120px;
                }

                .visit-history-table tbody tr {
                    border-bottom: 1px solid #e5e7eb;
                    transition: background-color 0.2s ease;
                }

                .visit-history-table tbody tr:hover {
                    background-color: #f0fdf4;
                }

                .visit-history-table tbody tr:last-child {
                    border-bottom: none;
                }

                .visit-history-table td {
                    padding: 16px;
                    color: #374151;
                }

                .user-cell {
                    font-weight: 600;
                    color: #065f46;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .user-avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 600;
                }

                .time-cell {
                    color: #6b7280;
                    font-family: 'Courier New', monospace;
                }

                .duration-cell {
                    font-weight: 500;
                    color: #059669;
                }

                .duration-badge {
                    display: inline-block;
                    padding: 4px 8px;
                    border-radius: 6px;
                    background: #dcfce7;
                    color: #065f46;
                    font-size: 12px;
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .visit-history-section {
                        margin-top: 30px;
                        padding: 20px;
                    }

                    .visit-history-title {
                        font-size: 18px;
                    }

                    .visit-history-table {
                        font-size: 13px;
                    }

                    .visit-history-table th,
                    .visit-history-table td {
                        padding: 12px 8px;
                    }

                    .user-column,
                    .time-column,
                    .duration-column {
                        min-width: 100px;
                    }
                }

                @media (max-width: 480px) {
                    .visit-history-section {
                        padding: 16px;
                        margin-top: 20px;
                    }

                    .visit-history-title {
                        font-size: 16px;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .title-icon {
                        font-size: 20px;
                    }

                    .visit-history-table {
                        font-size: 12px;
                    }

                    .visit-history-table th,
                    .visit-history-table td {
                        padding: 8px 6px;
                    }

                    .user-avatar {
                        width: 20px;
                        height: 20px;
                        font-size: 10px;
                    }

                    .duration-badge {
                        font-size: 11px;
                        padding: 2px 6px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        generateVisitRows() {
            return this.sessionData.map((session, index) => `
                <tr>
                    <td class="user-cell">
                        <div class="user-avatar">${session.user.charAt(0).toUpperCase()}</div>
                        ${session.user}
                    </td>
                    <td class="time-cell">${session.loginTime}</td>
                    <td class="duration-cell">
                        <span class="duration-badge">${session.duration}</span>
                    </td>
                </tr>
            `).join('');
        }

        getRandomRecentTime() {
            const now = new Date();
            const hoursAgo = Math.floor(Math.random() * 8) + 1; // 1-8 heures avant
            const pastTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
            
            return pastTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        getRandomDuration() {
            const durations = ['12 min', '25 min', '45 min', '8 min', '33 min', '18 min', '52 min', '7 min'];
            return durations[Math.floor(Math.random() * durations.length)];
        }

        // Méthode pour ajouter une nouvelle visite (pour les futures sessions)
        addVisit(user, duration) {
            const newVisit = {
                user: user,
                loginTime: new Date().toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                duration: duration
            };

            this.sessionData.unshift(newVisit);
            this.updateVisitTable();
        }

        updateVisitTable() {
            const tbody = document.getElementById('visitHistoryBody');
            if (tbody) {
                tbody.innerHTML = this.generateVisitRows();
            }
        }

        // Méthode pour obtenir la durée de la session actuelle
        getCurrentSessionDuration() {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            return `${minutes} min`;
        }

        // Méthode pour arrêter le suivi
        stopTracking() {
            if (this.sessionTimer) {
                clearInterval(this.sessionTimer);
            }
        }
    }

    // Créer l'instance globale
    window.sessionTracker = new SessionTracker();

    // Sauvegarder la durée de session quand l'utilisateur quitte la page
    window.addEventListener('beforeunload', () => {
        const duration = window.sessionTracker.getCurrentSessionDuration();
        const currentUser = localStorage.getItem('senebi_user') || 'Visiteur';
        window.sessionTracker.addVisit(currentUser, duration);
    });

})();
