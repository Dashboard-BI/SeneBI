<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SeneBI - 403 Acces Interdit</title>
    <link rel="stylesheet" href="{{ asset('assets/css/base.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/auth.css') }}" />
  </head>
  <body data-page="access-denied">
    <main class="auth-shell">
      <section class="auth-card">
        <span class="tag warn">Erreur 403</span>
        <div class="denied-icon" aria-hidden="true">🔒</div>
        <h1>Acces interdit</h1>
        <p id="deniedMessage">Oups ! Cette zone est reservee aux proprietaires. Si vous avez besoin de ces chiffres, contactez votre manager.</p>
        <div class="module-actions" style="margin-top: 14px;">
          <a id="backToSpaceBtn" class="btn" href="{{ route('parcelles') }}">Retour a mon espace</a>
          <a class="btn secondary" href="{{ route('login') }}">Se reconnecter</a>
        </div>
      </section>
    </main>
    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/access-denied.js') }}"></script>
  </body>
</html>
