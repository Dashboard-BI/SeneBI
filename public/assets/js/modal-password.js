// SeneBI - Modale mot de passe oublié - JavaScript
(function() {
    'use strict';
    
    class ForgotPasswordModal {
        constructor() {
            this.modal = null;
            this.backdrop = null;
            this.closeBtn = null;
            this.confirmBtn = null;
            this.forgotLink = null;
            this.isOpen = false;
            
            this.init();
        }

        init() {
            // Attendre que le DOM soit chargé
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupElements());
            } else {
                this.setupElements();
            }
        }

        setupElements() {
            // Récupérer les éléments du DOM
            this.modal = document.getElementById('forgotPasswordModal');
            this.backdrop = document.getElementById('modalBackdrop');
            this.closeBtn = document.getElementById('modalClose');
            this.confirmBtn = document.getElementById('modalConfirm');
            this.forgotLink = document.getElementById('forgotPasswordLink');

            if (!this.modal || !this.backdrop || !this.closeBtn || !this.confirmBtn || !this.forgotLink) {
                console.warn('Certains éléments de la modale sont manquants');
                return;
            }

            this.bindEvents();
        }

        bindEvents() {
            // Ouvrir la modale au clic sur "Mot de passe oublié?"
            this.forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });

            // Fermer la modale avec le bouton ×
            this.closeBtn.addEventListener('click', () => {
                this.close();
            });

            // Fermer la modale avec le bouton OK
            this.confirmBtn.addEventListener('click', () => {
                this.close();
            });

            // Fermer la modale en cliquant sur le backdrop
            this.backdrop.addEventListener('click', () => {
                this.close();
            });

            // Fermer la modale avec la touche Échap
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Empêcher la propagation du clic depuis le contenu de la modale
            this.modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        open() {
            if (this.isOpen) return;

            // Mettre à jour l'état
            this.isOpen = true;
            this.modal.setAttribute('aria-hidden', 'false');

            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';

            // Focus sur le bouton de fermeture pour l'accessibilité
            setTimeout(() => {
                this.closeBtn.focus();
            }, 100);

            // Émettre un événement personnalisé
            this.modal.dispatchEvent(new CustomEvent('modal:open', {
                detail: { modal: this.modal }
            }));
        }

        close() {
            if (!this.isOpen) return;

            // Mettre à jour l'état
            this.isOpen = false;
            this.modal.setAttribute('aria-hidden', 'true');

            // Réactiver le scroll du body
            document.body.style.overflow = '';

            // Retourner le focus sur le lien "Mot de passe oublié?"
            setTimeout(() => {
                this.forgotLink.focus();
            }, 100);

            // Émettre un événement personnalisé
            this.modal.dispatchEvent(new CustomEvent('modal:close', {
                detail: { modal: this.modal }
            }));
        }

        // Méthode pour vérifier si la modale est ouverte
        isModalOpen() {
            return this.isOpen;
        }

        // Méthode pour détruire la modale (nettoyage)
        destroy() {
            if (this.modal) {
                this.modal.removeEventListener('click', this.stopPropagation);
            }
            
            if (this.forgotLink) {
                this.forgotLink.removeEventListener('click', this.open);
            }
            
            if (this.closeBtn) {
                this.closeBtn.removeEventListener('click', this.close);
            }
            
            if (this.confirmBtn) {
                this.confirmBtn.removeEventListener('click', this.close);
            }
            
            if (this.backdrop) {
                this.backdrop.removeEventListener('click', this.close);
            }
            
            document.removeEventListener('keydown', this.handleEscape);
            
            // Réactiver le scroll au cas où
            document.body.style.overflow = '';
        }
    }

    // Créer l'instance globale
    window.forgotPasswordModal = new ForgotPasswordModal();

    // Pour compatibilité, permettre d'accéder à la modale depuis n'importe où
    window.openForgotPasswordModal = () => {
        window.forgotPasswordModal.open();
    };
    
    window.closeForgotPasswordModal = () => {
        window.forgotPasswordModal.close();
    };

})();
