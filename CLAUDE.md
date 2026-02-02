# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jupyter Book-based course platform for CAP 6606 (Machine Learning for Intelligent Systems & Robotics) at the University of West Florida. It's a static site generator that converts Jupyter notebooks and MyST Markdown into an HTML e-book.

## Build Commands

```bash
# Setup
python3 -m venv .venv
source .venv/bin/activate
pip install jupyter-book

# Build (sync config first if myst.yml was modified)
cp myst.yml _config.yml
jupyter-book build .

# View locally
open _build/html/index.html
```

## Deployment

Push to `main` triggers GitHub Actions which builds and deploys to GitHub Pages automatically. The workflow:
1. Syncs `myst.yml` → `_config.yml`
2. Runs `jupyter-book build .`
3. Deploys `_build/html` to `gh-pages` branch

Live site: `https://brianjalaian.github.io/CAP6606_ML_ISR/`

## Architecture

- **`myst.yml`**: Primary configuration (MyST/Jupyter Book settings, theme, launch buttons). Copy to `_config.yml` before building.
- **`_toc.yml`**: Table of contents defining course structure
- **`notebooks/`**: Course content as `.ipynb` files or MyST `.md` files
- **`lectures/lectures.md`**: Links to external slide decks
- **`_static/custom.css`**: UWF-themed styling overrides
- **`assets/`**: Logo and favicon

## Adding Content

1. Create notebook in `notebooks/` with Colab/Kaggle badges in first markdown cell
2. Register in `_toc.yml` under appropriate part/chapter
3. For live code demos, add `thebe: true` to page frontmatter (disabled by default)

## Key Configuration Notes

- Notebooks are NOT executed during build (`execute_notebooks: off` in myst.yml)
- MyST extensions enabled: `colon_fence`, `dollarmath`, `deflist`, `html_image`
- Colab launch buttons are enabled; Binder is disabled
- Python 3.11 used in CI
