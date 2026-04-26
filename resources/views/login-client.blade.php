<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI - Connexion Client</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/auth.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/modal-password.css') }}" />
  </head>
  <body data-page="auth-login">
    <main class="auth-shell">
      <section class="login-frame">
        <aside class="login-photo" aria-hidden="true"></aside>
        <div class="login-panel">
          <div class="login-brand">
            <img
              class="login-brand-image"
              src="{{ asset('assets/img/logo.png') }}"
              alt="Logo SeneBI"
            />
          </div>

          <h1>SeneBI: Espace Client</h1>
          <p class="login-subtitle">Votre plateforme de suivi agricole</p>

          <form id="loginForm" class="auth-form">
            <label for="email">Email</label>
            <input id="email" type="email" value="sidi@sidi-agri.sn" placeholder="Ex: votre-email@entreprise.com" required />

            <label for="password">Mot de passe</label>
            <input id="password" type="password" value="client123" placeholder="Votre mot de passe" required />

            <button class="btn login-submit" type="submit">Se connecter</button>
            <div class="login-help" id="forgotPasswordLink">Mot de passe oublie?</div>
            <div id="loginFeedback" class="form-feedback" aria-live="polite"></div>
          </form>

          <div class="auth-switch">
            <p>Vous êtes un manager ?</p>
            <a href="{{ route('login') }}" class="btn secondary">Accès Manager</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Modale pour mot de passe oublié -->
    <div class="modal-overlay" id="forgotPasswordModal" aria-hidden="true">
      <div class="modal-backdrop" id="modalBackdrop"></div>
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Mot de passe oublié</h3>
            <button class="modal-close" id="modalClose" aria-label="Fermer">×</button>
          </div>
          <div class="modal-body">
            <p>Pour réinitialiser votre mot de passe, veuillez contacter l'administrateur de SeneBI à l'adresse :</p>
            <div class="contact-info">
              <strong>support@senebi.com</strong>
            </div>
            <p class="modal-note">Nous traiterons votre demande dans les plus brefs délais.</p>
          </div>
          <div class="modal-footer">
            <button class="btn primary" id="modalConfirm">OK</button>
          </div>
        </div>
      </div>
    </div>

    <script src="{{ asset('assets/js/auth.js') }}"></script>
    <script src="{{ asset('assets/js/modal-password.js') }}"></script>
  </body>
</html>
