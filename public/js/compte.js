(function () {
  const USERS_KEY = "senebi_auth_users";
  const PREFS_KEY = "senebi_notification_prefs_v1";

  const defaultPrefs = {
    emailAlerts: true,
    stockAlerts: true,
    parcelReminders: true,
    weeklyDigest: false,
    smsAlerts: false,
  };

  function normalizeEmail(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
  }

  function roleLabel(role) {
    if (role === "admin") return "Admin";
    if (role === "manager") return "Manager";
    return "Client";
  }

  function roleClass(role) {
    if (role === "admin") return "role-pill role-pill--admin";
    if (role === "manager") return "role-pill role-pill--manager";
    return "role-pill role-pill--client";
  }

  const defaultUsers = [
    { id: "U-1", name: "Mimi", company: "SeneBI", email: "mimi.admin@senebi.sn", password: "admin123", role: "admin", blocked: false },
    { id: "U-2", name: "Adiaratou", company: "Sidi Agri", email: "adiaratou@sidi-agri.sn", password: "manager123", role: "manager", blocked: false },
    { id: "U-3", name: "Sidi", company: "Sidi Agri", email: "sidi@sidi-agri.sn", password: "client123", role: "client", blocked: false },
  ];

  function loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (!raw) {
        saveUsers(defaultUsers);
        return [...defaultUsers];
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) {
        saveUsers(defaultUsers);
        return [...defaultUsers];
      }
      return parsed;
    } catch {
      saveUsers(defaultUsers);
      return [...defaultUsers];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function prefsKeyFor(email) {
    return normalizeEmail(email);
  }

  function loadPrefs(email) {
    const key = prefsKeyFor(email);
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      return { ...defaultPrefs, ...(all[key] || {}) };
    } catch {
      return { ...defaultPrefs };
    }
  }

  function savePrefs(email, prefs) {
    const key = prefsKeyFor(email);
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      all[key] = prefs;
      localStorage.setItem(PREFS_KEY, JSON.stringify(all));
    } catch {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ [key]: prefs }));
    }
  }

  function setFeedback(el, text, kind) {
    if (!el) return;
    el.textContent = text || "";
    el.className = "form-feedback" + (kind === "ok" ? " ok" : kind === "err" ? " err" : "");
  }

  function initial(name) {
    const c = String(name || "?").trim().charAt(0);
    return c ? c.toUpperCase() : "?";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const auth = SeneBI.requireRole(["admin", "manager", "client"], "Connexion requise.");
    if (!auth) return;

    const state = SeneBI.loadState();
    SeneBI.renderTopbar(state);

    const back = SeneBI.qs("#compteBackLink");
    if (back) {
      const home =
        auth.role === "admin"
          ? "./secure-portal.html"
          : auth.role === "manager"
            ? "./parcelles.html"
            : "./client-dashboard.html";
      back.href = home;
    }

    SeneBI.qs("#fieldName").textContent = auth.name || "—";
    SeneBI.qs("#fieldEmail").textContent = auth.email || "—";
    SeneBI.qs("#fieldCompany").textContent = auth.company || "—";

    const roleEl = SeneBI.qs("#fieldRole");
    if (roleEl) {
      roleEl.textContent = roleLabel(auth.role);
      roleEl.className = roleClass(auth.role);
    }

    const av = SeneBI.qs("#profileAvatar");
    if (av) av.textContent = initial(auth.name);

    const prefs = loadPrefs(auth.email);
    SeneBI.qs("#prefEmail").checked = !!prefs.emailAlerts;
    SeneBI.qs("#prefStock").checked = !!prefs.stockAlerts;
    SeneBI.qs("#prefParcel").checked = !!prefs.parcelReminders;
    SeneBI.qs("#prefDigest").checked = !!prefs.weeklyDigest;
    SeneBI.qs("#prefSms").checked = !!prefs.smsAlerts;

    const pwdForm = SeneBI.qs("#passwordForm");
    if (pwdForm && !pwdForm.dataset.bound) {
      pwdForm.dataset.bound = "1";
      pwdForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cur = SeneBI.qs("#currentPassword")?.value || "";
        const neu = SeneBI.qs("#newPassword")?.value || "";
        const conf = SeneBI.qs("#confirmPassword")?.value || "";
        const fb = SeneBI.qs("#passwordFeedback");

        if (neu.length < 6) {
          setFeedback(fb, "Le nouveau mot de passe doit contenir au moins 6 caractères.", "err");
          return;
        }
        if (neu !== conf) {
          setFeedback(fb, "La confirmation ne correspond pas au nouveau mot de passe.", "err");
          return;
        }

        const users = loadUsers();
        const emailKey = normalizeEmail(auth.email);
        const idx = users.findIndex((u) => normalizeEmail(u.email) === emailKey);
        if (idx < 0) {
          setFeedback(
            fb,
            "Compte introuvable dans la liste locale. Utilisez un compte créé depuis le portail admin.",
            "err"
          );
          return;
        }
        if (users[idx].password !== cur) {
          setFeedback(fb, "Mot de passe actuel incorrect.", "err");
          return;
        }

        users[idx].password = neu;
        saveUsers(users);
        pwdForm.reset();
        setFeedback(fb, "Mot de passe mis à jour avec succès.", "ok");
      });
    }

    const prefsForm = SeneBI.qs("#prefsForm");
    if (prefsForm && !prefsForm.dataset.bound) {
      prefsForm.dataset.bound = "1";
      prefsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const next = {
          emailAlerts: SeneBI.qs("#prefEmail").checked,
          stockAlerts: SeneBI.qs("#prefStock").checked,
          parcelReminders: SeneBI.qs("#prefParcel").checked,
          weeklyDigest: SeneBI.qs("#prefDigest").checked,
          smsAlerts: SeneBI.qs("#prefSms").checked,
        };
        savePrefs(auth.email, next);
        setFeedback(SeneBI.qs("#prefsFeedback"), "Préférences enregistrées sur cet appareil.", "ok");
      });
    }

    window.addEventListener("senebi:seasonChanged", () => {
      SeneBI.renderTopbar(state);
    });
  });
})();
