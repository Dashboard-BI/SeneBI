// Header/Footer unique (injecté) — fonctionne en file://
(function () {
  function computeBase() {
    const p = location.pathname.replace(/\\/g, "/").toLowerCase();
    return p.includes("/pages/") ? ".." : ".";
  }

  function headerHtml(base) {
    return `
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="${base}/index.html">
            <img class="logo-img" src="${base}/assets/img/logo.png" alt="Logo SeneBI" />
            <div class="brand-title">
              <strong>SeneBI</strong>
              <span>Business Intelligence Agricole</span>
            </div>
          </a>

          <div class="topbar-right">
            <nav class="nav" data-senebi-nav></nav>
            <div class="topbar-actions">
              <div class="auth-pills" id="authPills" hidden>
                <a class="pill user-pill user-pill--link" id="authUserName" href="${base === ".." ? base + "/compte.html" : base + "/pages/compte.html"}">Mon compte</a>
                <a class="pill auth-link" id="portalBtn" href="#">Retour au Portail</a>
                <button class="pill auth-logout" id="globalLogoutBtn" type="button">Deconnexion</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function footerHtml() {
    return `
      <footer class="site-footer">
        <div class="site-footer-inner">
          <div class="muted small">© 2026 SeneBI - Système Intégré de Gestion Agricole</div>
        </div>
      </footer>
    `;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const base = computeBase();
    const mountHeader = document.querySelector("[data-layout='header']");
    const mountFooter = document.querySelector("[data-layout='footer']");
    if (mountHeader) mountHeader.innerHTML = headerHtml(base);
    if (mountFooter) mountFooter.innerHTML = footerHtml();
  });
})();

