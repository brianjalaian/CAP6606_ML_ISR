# Netlify Deployment Setup

Deploy the course site to `courses.brianjalaian.com` with authentication and promo code access.

---

## Step 1: Create New Netlify Site

1. Go to [Netlify](https://app.netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select the `CAP6606_ML_ISR` repository
4. Configure build settings:
   - **Build command:** `npm install -g jupyter-book && jupyter-book build --html`
   - **Publish directory:** `_build/html`
   - **Functions directory:** `netlify/functions`
5. Click **Deploy**

---

## Step 2: Set Up Subdomain (courses.brianjalaian.com)

Since you already have `brianjalaian.com` on Netlify:

### Option A: If using Netlify DNS (recommended)

1. Go to your **main site** (brianjalaian.com) → **Domain settings**
2. Confirm you're using **Netlify DNS** (you'll see Netlify nameservers)
3. Go to your **new course site** → **Domain settings** → **Add custom domain**
4. Enter: `courses.brianjalaian.com`
5. Netlify will automatically add the DNS record since you're using Netlify DNS
6. Wait for SSL certificate (usually 1-2 minutes)

### Option B: If using external DNS (e.g., Cloudflare, GoDaddy)

1. Go to your **course site** on Netlify → **Domain settings** → **Add custom domain**
2. Enter: `courses.brianjalaian.com`
3. Netlify will show you the required DNS record
4. Go to your DNS provider and add a **CNAME record**:
   - **Name:** `courses`
   - **Value:** `your-netlify-site-name.netlify.app`
5. Wait for DNS propagation (can take up to 24 hours, usually faster)
6. Back in Netlify, verify the domain and enable HTTPS

---

## Step 3: Enable Netlify Identity

1. In your **course site** dashboard, go to **Site settings** → **Identity**
2. Click **Enable Identity**
3. Under **Registration**, choose:
   - **Open** (anyone can sign up), or
   - **Invite only** (you manually invite users)
4. Under **External providers** (optional), enable Google, GitHub, etc.
5. Under **Services** → **Git Gateway**, click **Enable Git Gateway**

---

## Step 4: Configure Promo Codes

1. Go to **Site settings** → **Environment variables**
2. Add a new variable:
   - **Key:** `VALID_PROMO_CODES`
   - **Value:** `UWF-ML2026,SPRING2026` (comma-separated list)
3. Save

Students enter these codes at `courses.brianjalaian.com/promo.html` to unlock access.

---

## Step 5: Set Up GitHub Secrets (for GitHub Actions)

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:

| Secret Name | How to Get It |
|-------------|---------------|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings (top right avatar) → Applications → Personal access tokens → **New access token** |
| `NETLIFY_SITE_ID` | Netlify → Your course site → Site settings → General → **Site ID** (under Site details) |

---

## Step 6: Disable GitHub Pages

1. Go to GitHub repo → **Settings** → **Pages**
2. Set **Source** to **None**
3. (Optional) Delete the `gh-pages` branch if it exists

---

## Final URLs

| Page | URL |
|------|-----|
| Homepage | `https://courses.brianjalaian.com` |
| Login | `https://courses.brianjalaian.com/login.html` |
| Promo Code | `https://courses.brianjalaian.com/promo.html` |
| Course Content | `https://courses.brianjalaian.com/notebooks/...` (protected) |

---

## How It Works

### User Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Visit Site     │ ──▶ │  Click Content  │ ──▶ │  Redirected to  │
│  (public home)  │     │  (protected)    │     │  /login.html    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                        ┌───────────────────────────────┘
                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Sign Up/In     │ ──▶ │  Enter Promo    │ ──▶ │  Full Access!   │
│  (Netlify ID)   │     │  Code (optional)│     │  Role: promo    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Role-Based Access

| Role | Access |
|------|--------|
| None (not logged in) | Homepage, login, promo page only |
| `promo` | Full access to all protected content |

---

## File Structure

```
├── .github/workflows/deploy-netlify.yml  # GitHub Actions deployment
├── netlify.toml                          # Netlify config
├── netlify/functions/validate-code.js    # Promo code validation
├── _redirects                            # Access rules
├── login.html                            # Login page
├── promo.html                            # Promo code entry
├── NETLIFY_SETUP.md                      # This file
└── _build/html/                          # Built site (generated)
```

---

## Customization

### Change Promo Codes

Update `VALID_PROMO_CODES` environment variable in Netlify dashboard. No redeployment needed.

### Add More Protected Paths

Edit `netlify.toml`:

```toml
[[redirects]]
  from = "/premium/*"
  to = "/login.html"
  status = 200
  force = true
  conditions = {Role = ["promo"]}
```

### Make Content Fully Public

Remove the redirect rules from `netlify.toml` and `_redirects`.

---

## Troubleshooting

### Domain not working
- Check DNS propagation: https://dnschecker.org
- Verify CNAME record points to your Netlify site
- Wait for SSL certificate provisioning

### "Invalid promo code" error
- Check the code matches exactly (case-insensitive)
- Verify `VALID_PROMO_CODES` env variable in Netlify

### Can't access protected content after login
- User needs to enter a valid promo code at `/promo.html`
- Or manually assign `promo` role: Identity → Users → Edit user → App metadata: `{"roles": ["promo"]}`

### Build fails
- Check Node.js version (needs 18+)
- Run `jupyter-book build --html` locally to test
- Check Netlify deploy logs

---

## Local Testing

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build site
jupyter-book build --html

# Run locally with functions
netlify dev
```

This runs the site at `http://localhost:8888` with full function support.

---

## Quick Reference

| Task | Location |
|------|----------|
| Add promo codes | Netlify → Site settings → Environment variables |
| Invite users | Netlify → Identity → Invite users |
| View users | Netlify → Identity → Users |
| Assign roles manually | Identity → Users → Click user → Edit → App metadata |
| Check deploy status | Netlify → Deploys |
| View function logs | Netlify → Functions |
