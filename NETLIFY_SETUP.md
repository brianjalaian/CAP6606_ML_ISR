# Netlify Deployment Setup

This guide explains how to deploy the JupyterBook site to Netlify with authentication and promo code access.

## Overview

- **Public pages:** Homepage, login, promo code entry
- **Protected pages:** `/notebooks/`, `/modules/` - require `promo` or `authenticated` role
- **Authentication:** Netlify Identity
- **Promo codes:** Validated via Netlify Function

---

## Step 1: Create Netlify Site

1. Go to [Netlify](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select the `CAP6606_ML_ISR` repository
4. Configure build settings:
   - **Build command:** `npm install -g jupyter-book && jupyter-book build --html`
   - **Publish directory:** `_build/html`
   - **Functions directory:** `netlify/functions`
5. Click **Deploy**

---

## Step 2: Enable Netlify Identity

1. In your Netlify site dashboard, go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration**, choose:
   - **Open** (anyone can sign up), or
   - **Invite only** (you manually invite users)
4. Under **External providers** (optional), enable Google, GitHub, etc.
5. Under **Services** → **Git Gateway**, click **Enable Git Gateway**

---

## Step 3: Configure Promo Codes

1. Go to **Site settings** → **Environment variables**
2. Add a new variable:
   - **Key:** `VALID_PROMO_CODES`
   - **Value:** `UWF-ML2026,SPRING2026,DEMO` (comma-separated list)
3. Save

Students will enter these codes at `/promo.html` to unlock access.

---

## Step 4: Set Up GitHub Secrets (for GitHub Actions)

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | How to Get It |
|-------------|---------------|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications → Personal access tokens → New |
| `NETLIFY_SITE_ID` | Netlify → Site settings → General → Site ID |

---

## Step 5: Disable GitHub Pages

1. Go to GitHub repo → **Settings** → **Pages**
2. Set **Source** to **None** or delete the `gh-pages` branch
3. The old GitHub Actions workflow (`jupyterbook.yml`) can be deleted or renamed

---

## How It Works

### User Flow

1. User visits site → sees public homepage
2. User clicks protected content → redirected to `/login.html`
3. User signs up/logs in via Netlify Identity
4. (Optional) User enters promo code at `/promo.html`
5. Promo code validated → user gets `promo` role
6. User can now access protected content

### Role-Based Access

| Role | Access |
|------|--------|
| None (not logged in) | Homepage, login, promo page only |
| `authenticated` | Protected content (if configured) |
| `promo` | Full access to all content |

### File Structure

```
├── .github/workflows/deploy-netlify.yml  # GitHub Actions deployment
├── netlify.toml                          # Netlify config
├── netlify/functions/validate-code.js    # Promo code validation
├── _redirects                            # Access rules
├── login.html                            # Login page
├── promo.html                            # Promo code entry
└── _build/html/                          # Built site (generated)
```

---

## Customization

### Change Promo Codes

Update `VALID_PROMO_CODES` environment variable in Netlify dashboard.

### Add More Protected Paths

Edit `_redirects` or `netlify.toml`:

```
/premium/*  /login.html  200!  Role=promo
```

### Restrict to Invite-Only

1. Netlify → Identity → Registration → **Invite only**
2. Invite users via Netlify dashboard or API

---

## Troubleshooting

### "Invalid promo code" error
- Check the code matches exactly (case-insensitive)
- Verify `VALID_PROMO_CODES` env variable is set correctly

### Can't access protected content after login
- User needs the `promo` role - enter a promo code
- Or manually assign role in Netlify Identity dashboard

### Build fails
- Check Node.js version (needs 18+)
- Ensure `jupyter-book` builds locally first

---

## Local Testing

```bash
# Build site
jupyter-book build --html

# Test with Netlify CLI
npm install -g netlify-cli
netlify dev
```

This runs the site locally with functions support.
