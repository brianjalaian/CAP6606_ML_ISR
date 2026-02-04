// Auth Gate for MyST Site
// Requires Netlify Identity - blocks content until user is logged in with 'promo' role

(function() {
  // Flag to track if user has been verified
  let accessVerified = false;

  // Create and inject the overlay immediately
  const overlay = document.createElement('div');
  overlay.id = 'auth-gate';
  overlay.innerHTML = `
    <div style="
      background: #16213e;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    ">
      <h1 style="color: #fff; margin: 0 0 10px 0; font-size: 24px;">
        Machine Learning for Intelligent Systems
      </h1>
      <p style="color: #a0a0a0; margin: 0 0 30px 0;">
        Please log in to access course content
      </p>

      <div id="auth-status" style="color: #fff; margin-bottom: 20px;"></div>

      <button id="auth-login-btn" style="
        background: #4f46e5;
        color: white;
        border: none;
        padding: 12px 32px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-bottom: 15px;
        width: 100%;
      ">
        Log In / Sign Up
      </button>

      <div id="promo-section" style="display: none; margin-top: 20px;">
        <p style="color: #a0a0a0; margin-bottom: 10px;">Enter your access code:</p>
        <input type="text" id="promo-input" placeholder="e.g., UWF-ML2026" style="
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #333;
          border-radius: 6px;
          background: #0f0f23;
          color: #fff;
          box-sizing: border-box;
          margin-bottom: 10px;
        ">
        <button id="promo-submit-btn" style="
          background: #10b981;
          color: white;
          border: none;
          padding: 12px 32px;
          font-size: 16px;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
        ">
          Activate Access
        </button>
        <p id="promo-error" style="color: #ef4444; margin-top: 10px; display: none;"></p>
      </div>

      <div id="logout-section" style="display: none; margin-top: 15px;">
        <a href="#" id="logout-link" style="color: #a0a0a0; font-size: 14px;">
          Log out
        </a>
      </div>
    </div>
  `;

  // Style the overlay
  overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: #1a1a2e !important;
    z-index: 999999 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  `;

  // Insert overlay as first child of body (or wait for body)
  function insertOverlay() {
    if (document.body) {
      document.body.insertBefore(overlay, document.body.firstChild);
      setupEventListeners();
      waitForNetlifyIdentity();
    } else {
      // Body not ready, wait
      document.addEventListener('DOMContentLoaded', function() {
        document.body.insertBefore(overlay, document.body.firstChild);
        setupEventListeners();
        waitForNetlifyIdentity();
      });
    }
  }

  function setupEventListeners() {
    document.getElementById('auth-login-btn').addEventListener('click', function() {
      if (window.netlifyIdentity) {
        netlifyIdentity.open();
      }
    });

    document.getElementById('promo-submit-btn').addEventListener('click', submitPromoCode);
    document.getElementById('promo-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') submitPromoCode();
    });

    document.getElementById('logout-link').addEventListener('click', function(e) {
      e.preventDefault();
      if (window.netlifyIdentity) {
        netlifyIdentity.logout();
      }
    });
  }

  function waitForNetlifyIdentity() {
    // Check if netlifyIdentity is loaded
    if (window.netlifyIdentity) {
      initAuth();
    } else {
      // Wait for it to load
      let attempts = 0;
      const checkInterval = setInterval(function() {
        attempts++;
        if (window.netlifyIdentity) {
          clearInterval(checkInterval);
          initAuth();
        } else if (attempts > 50) {
          // Give up after 5 seconds
          clearInterval(checkInterval);
          console.error('Netlify Identity failed to load');
        }
      }, 100);
    }
  }

  function initAuth() {
    // Use the 'init' event to wait for full initialization
    netlifyIdentity.on('init', function(user) {
      console.log('Netlify Identity initialized, user:', user);
      checkAccess(user);
    });

    // Also listen for login/logout events
    netlifyIdentity.on('login', function(user) {
      console.log('User logged in:', user);
      checkAccess(user);
    });

    netlifyIdentity.on('logout', function() {
      console.log('User logged out');
      accessVerified = false;
      showGate();
      resetGateUI();
    });

    // Trigger init check
    netlifyIdentity.init();
  }

  function checkAccess(user) {
    console.log('Checking access for user:', user);

    if (!user) {
      console.log('No user, showing gate');
      showGate();
      resetGateUI();
      return;
    }

    // Check if user has 'promo' role
    const roles = user.app_metadata?.roles || [];
    console.log('User roles:', roles);

    if (roles.includes('promo')) {
      console.log('User has promo role, hiding gate');
      accessVerified = true;
      hideGate();
    } else {
      console.log('User lacks promo role, showing promo input');
      showGate();
      showPromoInput(user);
    }
  }

  function showGate() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function hideGate() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  function resetGateUI() {
    document.getElementById('auth-login-btn').style.display = 'block';
    document.getElementById('auth-status').textContent = '';
    document.getElementById('promo-section').style.display = 'none';
    document.getElementById('logout-section').style.display = 'none';
  }

  function showPromoInput(user) {
    document.getElementById('auth-login-btn').style.display = 'none';
    document.getElementById('auth-status').innerHTML = `
      <span style="color: #10b981;">Logged in as ${user.email}</span>
    `;
    document.getElementById('promo-section').style.display = 'block';
    document.getElementById('logout-section').style.display = 'block';
  }

  async function submitPromoCode() {
    const code = document.getElementById('promo-input').value.trim();
    const errorEl = document.getElementById('promo-error');
    const submitBtn = document.getElementById('promo-submit-btn');

    if (!code) {
      errorEl.textContent = 'Please enter an access code';
      errorEl.style.display = 'block';
      return;
    }

    submitBtn.textContent = 'Verifying...';
    submitBtn.disabled = true;
    errorEl.style.display = 'none';

    try {
      const user = netlifyIdentity.currentUser();
      const token = await user.jwt();

      const response = await fetch('/.netlify/functions/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: code })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success! Reload to get fresh JWT with new role
        errorEl.style.display = 'none';
        submitBtn.textContent = 'Success! Reloading...';
        setTimeout(function() {
          window.location.reload();
        }, 500);
      } else {
        errorEl.textContent = result.error || 'Invalid code. Please try again.';
        errorEl.style.display = 'block';
        submitBtn.textContent = 'Activate Access';
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('Promo code error:', err);
      errorEl.textContent = 'Something went wrong. Please try again.';
      errorEl.style.display = 'block';
      submitBtn.textContent = 'Activate Access';
      submitBtn.disabled = false;
    }
  }

  // Start
  insertOverlay();
})();
