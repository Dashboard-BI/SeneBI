// SeneBI - Rend le site dynamique et interactif
(function() {
    'use strict';
    
    class DynamicSite {
        constructor() {
            this.init();
        }

        init() {
            this.addDynamicAnimations();
            this.createLiveDataUpdates();
            this.addInteractiveElements();
            this.createParticleEffects();
            this.addScrollAnimations();
            this.createDynamicCharts();
            this.addProgressBars();
            this.createLiveCounters();
        }

        // 1. Animations dynamiques globales
        addDynamicAnimations() {
            const style = document.createElement('style');
            style.textContent = `
                /* Animations globales dynamiques */
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
                }
                
                /* Classes d'animation */
                .animate-slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }
                
                .animate-slide-in-right {
                    animation: slideInRight 0.6s ease-out;
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .animate-pulse {
                    animation: pulse 2s infinite;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
                
                /* Effet de chargement shimmer */
                .shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }
                
                /* Transitions fluides */
                .card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
                }
                
                .btn {
                    transition: all 0.3s ease;
                }
                
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
                }
                
                /* Animations scroll */
                .scroll-reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.6s ease-out;
                }
                
                .scroll-reveal.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(style);
        }

        // 2. Mises à jour de données en temps réel
        createLiveDataUpdates() {
            // Simuler des données dynamiques pour les KPIs
            setInterval(() => {
                this.updateKPIs();
            }, 5000); // Toutes les 5 secondes

            // Simuler des nouvelles notifications
            setInterval(() => {
                this.addRandomNotification();
            }, 30000); // Toutes les 30 secondes
        }

        updateKPIs() {
            const kpis = document.querySelectorAll('.kpi-value');
            kpis.forEach(kpi => {
                const currentValue = parseFloat(kpi.textContent.replace(/[^0-9.]/g, ''));
                const change = (Math.random() - 0.5) * 10; // +/- 5%
                const newValue = currentValue + change;
                
                // Animation de changement
                kpi.style.transition = 'color 0.5s';
                kpi.style.color = change > 0 ? '#10b981' : '#ef4444';
                
                setTimeout(() => {
                    kpi.textContent = this.formatKpiValue(newValue);
                    kpi.style.color = '';
                }, 250);
            });
        }

        formatKpiValue(value) {
            if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
            }
            return value.toFixed(0);
        }

        addRandomNotification() {
            const notifications = [
                { icon: '📊', title: 'Nouveau rapport', message: 'Rapport journalier disponible', type: 'info' },
                { icon: '🌾', title: 'Récolte', message: 'Nouvelle récolte enregistrée', type: 'success' },
                { icon: '💧', title: 'Irrigation', message: 'Niveau d\'eau optimal', type: 'info' },
                { icon: '🚜', title: 'Équipement', message: 'Maintenance requise', type: 'warning' }
            ];
            
            const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
            this.showNotification(randomNotif);
        }

        showNotification(notification) {
            const notifElement = document.createElement('div');
            notifElement.className = `live-notification ${notification.type}`;
            notifElement.innerHTML = `
                <div class="notif-icon">${notification.icon}</div>
                <div class="notif-content">
                    <div class="notif-title">${notification.title}</div>
                    <div class="notif-message">${notification.message}</div>
                </div>
                <button class="notif-close">×</button>
            `;
            
            // Styles pour les notifications live
            if (!document.querySelector('#live-notifications-style')) {
                const style = document.createElement('style');
                style.id = 'live-notifications-style';
                style.textContent = `
                    .live-notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: white;
                        border-radius: 12px;
                        padding: 16px;
                        box-shadow: 0 8px 32px rgba(15, 23, 42, 0.15);
                        border-left: 4px solid #10b981;
                        z-index: 10000;
                        max-width: 350px;
                        animation: slideInRight 0.5s ease-out;
                        display: flex;
                        align-items: flex-start;
                        gap: 12px;
                    }
                    
                    .live-notification.warning {
                        border-left-color: #f59e0b;
                    }
                    
                    .live-notification.success {
                        border-left-color: #10b981;
                    }
                    
                    .notif-icon {
                        font-size: 20px;
                    }
                    
                    .notif-content {
                        flex: 1;
                    }
                    
                    .notif-title {
                        font-weight: 600;
                        margin-bottom: 4px;
                    }
                    
                    .notif-message {
                        font-size: 14px;
                        color: #6b7280;
                    }
                    
                    .notif-close {
                        background: none;
                        border: none;
                        font-size: 18px;
                        cursor: pointer;
                        color: #9ca3af;
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notifElement);
            
            // Auto-suppression après 5 secondes
            setTimeout(() => {
                notifElement.style.animation = 'slideInRight 0.5s ease-out reverse';
                setTimeout(() => notifElement.remove(), 500);
            }, 5000);
            
            // Fermeture manuelle
            notifElement.querySelector('.notif-close').addEventListener('click', () => {
                notifElement.remove();
            });
        }

        // 3. Éléments interactifs avancés
        addInteractiveElements() {
            // Ajouter des tooltips
            this.addTooltips();
            
            // Ajouter des menus contextuels
            this.addContextMenus();
            
            // Ajouter du drag & drop
            this.addDragAndDrop();
        }

        addTooltips() {
            const elements = document.querySelectorAll('[data-tooltip]');
            elements.forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'dynamic-tooltip';
                    tooltip.textContent = e.target.dataset.tooltip;
                    
                    // Styles tooltip
                    if (!document.querySelector('#tooltip-style')) {
                        const style = document.createElement('style');
                        style.id = 'tooltip-style';
                        style.textContent = `
                            .dynamic-tooltip {
                                position: absolute;
                                background: #1f2937;
                                color: white;
                                padding: 8px 12px;
                                border-radius: 6px;
                                font-size: 12px;
                                z-index: 10000;
                                pointer-events: none;
                                animation: fadeInUp 0.3s ease-out;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = e.target.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    e.target.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
                });
            });
        }

        // 4. Effets de particules
        createParticleEffects() {
            // Ajouter des particules flottantes en arrière-plan
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particles-container';
            particleContainer.innerHTML = `
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            `;
            
            // Styles particules
            const style = document.createElement('style');
            style.textContent = `
                .particles-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .particle {
                    position: absolute;
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: 50%;
                    animation: float 6s ease-in-out infinite;
                }
                
                .particle:nth-child(1) {
                    width: 4px;
                    height: 4px;
                    left: 10%;
                    animation-delay: 0s;
                }
                
                .particle:nth-child(2) {
                    width: 6px;
                    height: 6px;
                    left: 30%;
                    animation-delay: 1s;
                }
                
                .particle:nth-child(3) {
                    width: 3px;
                    height: 3px;
                    left: 50%;
                    animation-delay: 2s;
                }
                
                .particle:nth-child(4) {
                    width: 5px;
                    height: 5px;
                    left: 70%;
                    animation-delay: 3s;
                }
                
                .particle:nth-child(5) {
                    width: 4px;
                    height: 4px;
                    left: 90%;
                    animation-delay: 4s;
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(particleContainer);
        }

        // 5. Animations au scroll
        addScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });

            // Observer tous les éléments avec la classe scroll-reveal
            document.querySelectorAll('.card, .section').forEach(element => {
                element.classList.add('scroll-reveal');
                observer.observe(element);
            });
        }

        // 6. Graphiques dynamiques
        createDynamicCharts() {
            // Animer les graphiques existants
            const charts = document.querySelectorAll('canvas');
            charts.forEach(canvas => {
                canvas.style.animation = 'fadeInUp 1s ease-out';
            });
        }

        // 7. Barres de progression animées
        addProgressBars() {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const progress = bar.dataset.progress || 50;
                bar.style.width = '0%';
                bar.style.transition = 'width 2s ease-out';
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 500);
            });
        }

        // 8. Compteurs animés
        createLiveCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target || 100);
                const duration = 2000; // 2 secondes
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                // Démarrer l'animation quand l'élément est visible
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        updateCounter();
                        observer.disconnect();
                    }
                });
                
                observer.observe(counter);
            });
        }
    }

    // Initialiser le site dynamique
    document.addEventListener('DOMContentLoaded', function() {
        window.dynamicSite = new DynamicSite();
        console.log('Site dynamique initialisé !');
    });

})();
