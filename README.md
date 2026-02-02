# CAP 6606 – Machine Learning for Intelligent Systems & Robotics

This repository hosts the MyST-powered Jupyter Book that serves as the official course companion for CAP 6606 at the University of West Florida. It combines narrative content, executable notebooks, and lecture resources so students can move seamlessly between readings, code, and slide decks.

## Repository Layout

```
CAP6606_ml_for_intelligent_systems/
├── myst.yml              # Primary MyST configuration (copied to _config.yml for sphinx)
├── _config.yml           # Auto-synced from myst.yml for compatibility
├── _toc.yml              # Course table of contents
├── intro.md              # Landing page for the course book
├── notebooks/            # Jupyter notebooks and optional MyST companions
├── lectures/lectures.md  # Links to external lecture slides
├── assets/               # Branding assets (logo + favicon)
├── _static/custom.css    # UWF themed overrides
└── .github/workflows/    # GitHub Pages deployment workflow
```

## Adding New Content

### 1. New Chapters or Notebooks
1. Create your notebook in `notebooks/` (e.g., `notebooks/02_neural_networks.ipynb`).
2. Add a leading Markdown cell with the Colab and Kaggle launch badges:

   ```markdown
   [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/brianjalaian/CAP6606_ML_ISR/blob/main/notebooks/02_neural_networks.ipynb)

   [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://kaggle.com/kernels/welcome?src=https://github.com/brianjalaian/CAP6606_ML_ISR/blob/main/notebooks/02_neural_networks.ipynb)
   ```

3. Update `_toc.yml` to include the new chapter in the proper module section.
4. (Optional) If you prefer prose-first development, create a MyST Markdown page and embed code cells with ```` ```{code-cell}```` blocks.

### 2. Linking Additional Slide Decks
1. Edit `lectures/lectures.md` and append the new bullet with the lecture title and URL.
2. Commit the change so it appears in the “Lectures” top-level navigation group.

## Local Development

1. Create and activate the local environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install jupyter-book
   ```

2. Sync the MyST configuration (only needed if you modify `myst.yml`):

   ```bash
   cp myst.yml _config.yml
   ```

3. Build the book and open the generated HTML:

   ```bash
   jupyter-book build .
   open _build/html/index.html
   ```

## Deployment via GitHub Actions

The workflow in `.github/workflows/jupyterbook.yml` publishes the site to the `gh-pages` branch.

1. Push changes to `main`:

   ```bash
   git add .
   git commit -m "Add week 4 materials"
   git push origin main
   ```

2. GitHub Actions will:
   - Install Jupyter Book.
   - Copy `myst.yml` to `_config.yml` for the build step.
   - Run `jupyter-book build .` to populate `_build/html`.
   - Deploy the HTML to `gh-pages` with `peaceiris/actions-gh-pages@v3`.

3. Enable GitHub Pages in the repository settings, pointed at the `gh-pages` branch (root folder).

Once Pages is enabled, the course book will be available at `https://brianjalaian.github.io/CAP6606_ML_ISR/` and update automatically whenever `main` is updated.

## Customization Notes

- Replace the placeholder logo (`assets/uwf-logo.png`) and favicon (`assets/favicon.png`) with official UWF assets when available.
- Adjust the color palette or typography in `_static/custom.css` to align with future branding guidelines.
- Use the repository button in the header to encourage student contributions or errata PRs.
