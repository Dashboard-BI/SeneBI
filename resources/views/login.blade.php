<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI - Connexion sécurisée</title>
    {{-- On utilise asset() pour que Laravel trouve le CSS dans le dossier public --}}
    <link rel="stylesheet" href="{{ asset('css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}" />
  </head>
  <body data-page="auth-login">
    <main class="auth-shell">
      <section class="login-frame">
        <aside class="login-photo" aria-hidden="true"></aside>
        <div class="login-panel">
          <div class="login-brand">
           
            <img
              class="login-brand-image"
              src="{{ asset('img/logo.png') }}"
              alt="Logo SeneBI"
            />
          </div>

          <h1>SeneBI: Business Intelligence Agricole Mali</h1>
          <p class="login-subtitle">Votre plateforme de gestion sécurisée</p>

          {{-- CORRECTION : action="/index" correspond à ta route dans web.php --}}
          <form id="loginForm" class="auth-form" action="/index" method="GET">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Ex: adiaratou@sidi-agri.sn" required />

            <label for="password">Mot de passe</label>
            <input id="password" name="password" type="password" placeholder="Votre mot de passe" required />

            <button class="btn login-submit" type="submit">Se connecter</button>
            <div class="login-help">Mot de passe oublié ?</div>
            <div id="loginFeedback" class="form-feedback" aria-live="polite"></div>
          </form>

          <div class="demo-users">
            <strong>Comptes de démo</strong>
            <div>Admin: <code>mimi.admin@senebi.sn / admin123</code></div>
            <div>Manager: <code>adiaratou@sidi-agri.sn / manager123</code></div>
            <div>Client: <code>sidi@sidi-agri.sn / client123</code></div>
          </div>
        </div>
      </section>
    </main>

    {{-- Chargement du JS --}}
    <script src="{{ asset('js/auth.js') }}"></script>
  </body>
</html>