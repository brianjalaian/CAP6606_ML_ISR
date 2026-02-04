// Auth Gate - Redirects to auth.html if user is not authenticated with 'promo' role
// This runs on every page and redirects unauthenticated users

(function() {
  // Skip if we're already on the auth page
  if (window.location.pathname === '/auth.html') {
    return;
  }

  // Hide page content immediately while checking auth
  document.documentElement.style.opacity = '0';

  var handled = false;

  function handleUser(user) {
    if (handled) return;
    handled = true;

    if (!user) {
      redirectToAuth();
      return;
    }

    // Check for promo role
    var roles = (user.app_metadata && user.app_metadata.roles) || [];
    if (roles.indexOf('promo') !== -1) {
      // User has access - show the page
      document.documentElement.style.opacity = '1';
    } else {
      // Logged in but no promo role - redirect to enter code
      redirectToAuth();
    }
  }

  function checkAuth() {
    if (!window.netlifyIdentity) {
      // Netlify Identity not loaded yet, wait
      setTimeout(checkAuth, 100);
      return;
    }

    // Check if widget already initialized and has a user
    var currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      handleUser(currentUser);
      return;
    }

    // Listen for init event (in case widget hasn't initialized yet)
    netlifyIdentity.on('init', function(user) {
      handleUser(user);
    });

    // Try to initialize (safe to call; will fire init event)
    netlifyIdentity.init();

    // Fallback: if init event never fires, redirect after timeout
    setTimeout(function() {
      if (!handled) {
        var user = netlifyIdentity.currentUser();
        if (user) {
          handleUser(user);
        } else {
          handleUser(null);
        }
      }
    }, 3000);
  }

  function redirectToAuth() {
    var returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = '/auth.html?return=' + returnUrl;
  }

  // Start checking
  checkAuth();
})();
