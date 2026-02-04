// Auth Gate - Redirects to auth.html if user is not authenticated with 'promo' role
// This runs on every page and redirects unauthenticated users

(function() {
  // Skip if we're already on the auth page
  if (window.location.pathname === '/auth.html') {
    return;
  }

  // Hide page content immediately while checking auth
  document.documentElement.style.opacity = '0';

  function checkAuth() {
    if (!window.netlifyIdentity) {
      // Netlify Identity not loaded yet, wait
      setTimeout(checkAuth, 100);
      return;
    }

    netlifyIdentity.on('init', function(user) {
      if (!user) {
        // Not logged in - redirect to auth page
        redirectToAuth();
        return;
      }

      // Check for promo role
      const roles = user.app_metadata?.roles || [];
      if (roles.includes('promo')) {
        // User has access - show the page
        document.documentElement.style.opacity = '1';
      } else {
        // Logged in but no promo role - redirect to enter code
        redirectToAuth();
      }
    });

    // Initialize
    netlifyIdentity.init();
  }

  function redirectToAuth() {
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = '/auth.html?return=' + returnUrl;
  }

  // Start checking
  checkAuth();
})();
