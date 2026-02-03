# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Jupyter Book (MyST-based) that converts Jupyter notebooks and MyST Markdown into an interactive HTML book.

## Build Commands

Requires Node.js (v18+).

```bash
# Start local dev server
jupyter-book start

# Or without global install
npx jupyter-book start
```

Opens at http://localhost:3000

## Deployment

Push to `main` triggers GitHub Actions which builds and deploys to GitHub Pages automatically.

Live site: `https://brianjalaian.github.io/CAP6606_ML_ISR/`

## Architecture

- **`myst.yml`**: All configuration (metadata, TOC, theme options)
- **`notebooks/`**: Jupyter notebooks
- **`lectures/lectures.md`**: Links to lecture slides
- **`assets/`**: Logo and favicon

## Adding Content

1. Create notebook in `notebooks/` with Colab/Kaggle badges in first markdown cell
2. Add to `myst.yml` under the `toc:` section
