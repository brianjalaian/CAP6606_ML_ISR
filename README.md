# Machine Learning for Intelligent Systems & Robotics

An interactive Jupyter Book covering machine learning techniques for intelligent systems and robotics. It combines narrative content, executable notebooks, and lecture resources.

## Repository Layout

```
├── myst.yml              # MyST configuration
├── intro.md              # Landing page
├── notebooks/            # Jupyter notebooks
├── lectures/lectures.md  # Links to lecture slides
├── assets/               # Logo and favicon
└── .github/workflows/    # GitHub Pages deployment
```

## Adding New Content

### 1. New Notebooks
1. Create your notebook in `notebooks/` (e.g., `notebooks/02_neural_networks.ipynb`).
2. Add Colab and Kaggle badges in the first markdown cell:

   ```markdown
   [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/brianjalaian/CAP6606_ML_ISR/blob/main/notebooks/YOUR_NOTEBOOK.ipynb)

   [![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://kaggle.com/kernels/welcome?src=https://github.com/brianjalaian/CAP6606_ML_ISR/blob/main/notebooks/YOUR_NOTEBOOK.ipynb)
   ```

3. Add the notebook to `myst.yml` under the appropriate module in the `toc` section.

### 2. Linking Slide Decks
Edit `lectures/lectures.md` and add your lecture link.

## Local Development

Requires Node.js (v18+).

```bash
# Start dev server
jupyter-book start

# Or use npx without global install
npx jupyter-book start
```

Open http://localhost:3000 in your browser.

## Deployment

Push to `main` triggers GitHub Actions which builds and deploys to GitHub Pages automatically.

Live site: https://brianjalaian.github.io/CAP6606_ML_ISR/
