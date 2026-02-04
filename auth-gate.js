// Auth Gate for MyST Site
// Requires Netlify Identity - blocks content until user is logged in with 'promo' role

(function() {
  // Create overlay HTML
  const overlayHTML = `
    <div id="auth-gate" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #1a1a2e;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
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

        <!-- Login/Signup Button -->
        <button id="auth-login-btn" onclick="netlifyIdentity.open()" style="
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

        <!-- Promo Code Section (shown after login) -->
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

        <!-- Logout link -->
        <div id="logout-section" style="display: none; margin-top: 15px;">
          <a href="#" onclick="netlifyIdentity.logout(); return false;" style="color: #a0a0a0; font-size: 14px;">
            Log out
          </a>
        </div>
      </div>
    </div>
  `;

  // Inject overlay into page
  document.body.insertAdjacentHTML('afterbegin', overlayHTML);

  // Wait for Netlify Identity to be ready
  if (window.netlifyIdentity) {
    initAuth();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (window.netlifyIdentity) {
        initAuth();
      }
    });
  }

  function initAuth() {
    const user = netlifyIdentity.currentUser();
    checkAccess(user);

    // Listen for login
    netlifyIdentity.on('login', function(user) {
      checkAccess(user);
    });

    // Listen for logout
    netlifyIdentity.on('logout', function() {
      showGate();
      document.getElementById('auth-status').textContent = '';
      document.getElementById('promo-section').style.display = 'none';
      document.getElementById('logout-section').style.display = 'none';
      document.getElementById('auth-login-btn').style.display = 'block';
    });

    // Setup promo code submission
    document.getElementById('promo-submit-btn').addEventListener('click', submitPromoCode);
    document.getElementById('promo-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') submitPromoCode();
    });
  }

  function checkAccess(user) {
    if (!user) {
      showGate();
      return;
    }

    // Check if user has 'promo' role
    const roles = user.app_metadata?.roles || [];
    if (roles.includes('promo')) {
      hideGate();
    } else {
      // Logged in but no promo role - show promo code input
      showGate();
      document.getElementById('auth-login-btn').style.display = 'none';
      document.getElementById('auth-status').innerHTML = `
        <span style="color: #10b981;">Logged in as ${user.email}</span>
      `;
      document.getElementById('promo-section').style.display = 'block';
      document.getElementById('logout-section').style.display = 'block';
    }
  }

  function showGate() {
    document.getElementById('auth-gate').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function hideGate() {
    document.getElementById('auth-gate').style.display = 'none';
    document.body.style.overflow = '';
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
        // Refresh user to get updated roles
        await netlifyIdentity.refresh();
        const updatedUser = netlifyIdentity.currentUser();
        checkAccess(updatedUser);

        // If still showing gate, force reload to get fresh JWT
        if (document.getElementById('auth-gate').style.display !== 'none') {
          window.location.reload();
        }
      } else {
        errorEl.textContent = result.error || 'Invalid code. Please try again.';
        errorEl.style.display = 'block';
      }
    } catch (err) {
      console.error('Promo code error:', err);
      errorEl.textContent = 'Something went wrong. Please try again.';
      errorEl.style.display = 'block';
    }

    submitBtn.textContent = 'Activate Access';
    submitBtn.disabled = false;
  }
})();
