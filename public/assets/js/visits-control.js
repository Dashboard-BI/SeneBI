// Centre de Contrôle des Visites - JavaScript
(function() {
  'use strict';

  // Simuler des données de visites pour démonstration
  const mockVisits = [
    {
      id: 1,
      name: 'Mimi Manager',
      email: 'mimi.manager@senebi.sn',
      role: 'manager',
      loginTime: new Date(Date.now() - 1000 * 60 * 15), // Il y a 15 minutes
      action: 'Consultation du dashboard',
      duration: 15
    },
    {
      id: 2,
      name: 'Sidi Client',
      email: 'sidi@sidi-agri.sn',
      role: 'client',
      loginTime: new Date(Date.now() - 1000 * 60 * 45), // Il y a 45 minutes
      action: 'Vérification des stocks',
      duration: 45
    },
    {
      id: 3,
      name: 'Agriculteur Alpha',
      email: 'alpha@ferme-mali.com',
      role: 'client',
      loginTime: new Date(Date.now() - 1000 * 60 * 120), // Il y a 2 heures
      action: 'Saisie de récolte',
      duration: 120
    },
    {
      id: 4,
      name: 'Superviseur Beta',
      email: 'beta@senebi.sn',
      role: 'manager',
      loginTime: new Date(Date.now() - 1000 * 60 * 5), // Il y a 5 minutes
      action: 'Analyse de rentabilité',
      duration: 5
    }
  ];

  // Obtenir l'initiale d'un nom
  function getInitial(name) {
    return (name || '?').charAt(0).toUpperCase();
  }

  // Formater la durée
  function formatDuration(minutes) {
    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  }

  // Formater l'heure
  function formatTime(date) {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  // Formater la date relative
  function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `Il y a ${diffDays}j`;
  }

  // Créer une ligne de visite
  function createVisitRow(visit) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="user-cell">
          <div class="user-avatar ${visit.role}">${getInitial(visit.name)}</div>
          <div class="user-info">
            <div class="user-name">${visit.name}</div>
            <div class="user-role">${visit.role === 'manager' ? 'Manager' : 'Client'}</div>
          </div>
        </div>
      </td>
      <td>
        <div class="time-cell">
          <div>${formatTime(visit.loginTime)}</div>
          <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">
            ${formatRelativeTime(visit.loginTime)}
          </div>
        </div>
      </td>
      <td>
        <div class="action-cell">${visit.action}</div>
      </td>
    `;
    return tr;
  }

  // Mettre à jour les statistiques
  function updateStats(visits) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisits = visits.filter(v => v.loginTime >= today);
    const totalVisitsEl = document.getElementById('totalVisits');
    const avgDurationEl = document.getElementById('avgDuration');
    const activeNowEl = document.getElementById('activeNow');
    
    if (totalVisitsEl) {
      totalVisitsEl.textContent = todayVisits.length;
    }
    
    if (avgDurationEl) {
      const avgDuration = visits.length > 0 
        ? Math.round(visits.reduce((sum, v) => sum + v.duration, 0) / visits.length)
        : 0;
      avgDurationEl.textContent = formatDuration(avgDuration);
    }
    
    if (activeNowEl) {
      const activeCount = visits.filter(v => v.duration < 30).length; // Actifs si < 30min
      activeNowEl.textContent = activeCount;
    }
  }

  // Rendre le tableau des visites
  function renderVisitsTable() {
    const tbody = document.getElementById('visitsTableBody');
    const noVisitsMessage = document.getElementById('noVisitsMessage');
    
    if (!tbody) return;
    
    // Vider le tableau
    tbody.innerHTML = '';
    
    // Trier les visites par date (plus récent en premier)
    const sortedVisits = [...mockVisits].sort((a, b) => b.loginTime - a.loginTime);
    
    if (sortedVisits.length === 0) {
      if (noVisitsMessage) {
        noVisitsMessage.hidden = false;
      }
    } else {
      if (noVisitsMessage) {
        noVisitsMessage.hidden = true;
      }
      
      sortedVisits.forEach(visit => {
        const row = createVisitRow(visit);
        tbody.appendChild(row);
      });
    }
    
    updateStats(sortedVisits);
  }

  // Ajouter une nouvelle visite (simulation)
  function addNewVisit() {
    const names = ['Jean Dupont', 'Marie Konaté', 'Ibrahim Touré', 'Fatoumata Diallo'];
    const actions = ['Consultation du dashboard', 'Vérification des stocks', 'Saisie de récolte', 'Analyse de rentabilité'];
    const roles = ['manager', 'client'];
    
    const newVisit = {
      id: mockVisits.length + 1,
      name: names[Math.floor(Math.random() * names.length)],
      email: `user${mockVisits.length + 1}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      loginTime: new Date(),
      action: actions[Math.floor(Math.random() * actions.length)],
      duration: 0
    };
    
    mockVisits.unshift(newVisit);
    
    // Limiter à 10 visites maximum
    if (mockVisits.length > 10) {
      mockVisits.pop();
    }
    
    renderVisitsTable();
  }

  // Mettre à jour les durées en temps réel
  function updateDurations() {
    mockVisits.forEach(visit => {
      const now = new Date();
      const diffMs = now - visit.loginTime;
      visit.duration = Math.floor(diffMs / (1000 * 60));
    });
    
    renderVisitsTable();
  }

  // Initialiser la page
  function init() {
    // Vérifier l'authentification
    const auth = window.SeneBI?.getAuth?.();
    if (!auth) {
      window.location.href = './login.html';
      return;
    }
    
    // Rendre le tableau initial
    renderVisitsTable();
    
    // Simuler des mises à jour en temps réel
    setInterval(updateDurations, 30000); // Mettre à jour les durées toutes les 30s
    
    // Simuler l'ajout de nouvelles visites occasionnellement
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance
        addNewVisit();
      }
    }, 15000); // Toutes les 15 secondes
  }

  // Démarrer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
