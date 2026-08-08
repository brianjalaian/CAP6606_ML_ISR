# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CAP6606: Machine Learning for Intelligent Systems & Robotics** — an interactive course built as a Jupyter Book (MyST-based). Each lecture consists of multiple coordinated artifacts created together:

1. **Slide deck** — Reveal.js in `~/Workspace/markdown-slides/<module-name>/`. Edit `slides.local.md` (the source — has `Note:` blocks for recording, gitignored). `slides.md` is auto-generated stripped output committed to GitHub Pages — never edit it directly.
2. **Theory notebook** — `notebooks/<nn>_<topic>.ipynb` (fundamentals, derivations, code walkthroughs)
3. **Applied notebook** — `notebooks/<nn>b_<topic>.ipynb` (real-world case study)
4. **Module overview page** — `modules/<nn>_<name>/index.md` (prerequisites, learning objectives, links)
5. **Video recording script** — `resource/<topic>_script.md` (talking script synchronized to slides/notebook cells)

The reference textbook is Raschka & Mirjalili, *Machine Learning with PyTorch and Scikit-Learn* (PDF at `resource/MachineLearningWithPyTorchAndScikitLearn-original.pdf`).

## Local Development

Always run **both** servers when doing course development — open two terminal tabs.

**Terminal 1 — Course site** → http://localhost:3000
```bash
cd ~/Workspace/CAP6606_ml_for_intelligent_systems
npx jupyter-book start
```

**Terminal 2 — Slides** → http://localhost:8000/\<deck-name\>/
```bash
cd ~/Workspace/markdown-slides/reveal.js
npm start -- --root ../
```
> `--root ../` is required — without it the server can't find the slide decks.

Both servers have live reload. Navigate to e.g. http://localhost:8000/ensemble-methods/ for the ensemble slides.

## Deployment

Push to `main` triggers Netlify to build and deploy automatically.

Live site: `https://courses.brianjalaian.com`

### Local Testing with Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and serve locally
jupyter-book build --html && netlify dev
```

Runs at `http://localhost:8888`.

## Architecture

- **`myst.yml`**: All configuration (metadata, TOC, theme options)
- **`notebooks/`**: Jupyter notebooks (may include data files like `.csv` alongside notebooks)
- **`modules/`**: Module overview pages (`modules/<nn>_<name>/index.md`) with prerequisites and learning objectives
- **`resource/`**: Video recording scripts (`<topic>_script.md`) and the reference textbook PDF — **gitignored** (copyrighted material + private scripts)
- **`assets/`**: Logo and favicon
- **`netlify.toml`**: Netlify build and security config
- **`PLAN.md`**: Internal personal planning doc (weekly cadence, module pipeline, recording checklist). **Gitignored** — never committed, never deployed. Edit freely as your working planning surface.

## Related Repo: Slide Decks

Slide decks live in `~/Workspace/markdown-slides/` (GitHub: `https://github.com/brianjalaian/markdown-slides`), deployed to GitHub Pages at `https://brianjalaian.github.io/markdown-slides/`.

- Each deck: `<module-name>/index.html` + `<module-name>/slides.local.md` (source, with notes, **gitignored**) + `<module-name>/slides.md` (auto-generated, no notes, committed) + optional `<module-name>/figure/`
- `index.html` branches on hostname: localhost loads `slides.local.md` (with notes), GitHub Pages loads `slides.md` (no notes). Force-test the public version locally with `?public=1`.
- **Notes-stripping is automatic** — a pre-commit hook at `markdown-slides/.git/hooks/pre-commit` runs `python3 strip-notes.py` on every commit, regenerating `slides.md` from `slides.local.md` and staging it. Never edit `slides.md` directly; it gets overwritten. (The hook is machine-local, not in git — must be re-installed on a fresh clone.)
- Slides use Reveal.js: `---` separates horizontal slides, `--` separates vertical slides
- Math: MathJax inline `$...$` and display `$$...$$`
- Presenter notes: `Note:` block after slide content, before `---` — opens with `S` key in browser. Notes are **private** — never edit slides.md to add notes; always work in slides.local.md.
- When linking slides from the course site, always use the GitHub Pages URL (e.g., `https://brianjalaian.github.io/markdown-slides/ensemble-methods/`)
- To develop slides: `cd ~/Workspace/markdown-slides/reveal.js && npm start -- --root ../` (the `--root ../` is required so all decks are reachable at `localhost:8000/<deck-name>/`)

### Slide Content Rules

**Slides are for theory, concept, and intuition; notebooks are for code.** This is a graduate ML course that arcs from classical ML through deep learning to Transformers and LLMs, so slide design must work across that whole range. When choosing how to present something on a slide, prefer in this order:

1. **Architecture / data-flow diagram** (primary medium for DL/LLM; often unused for classical ML — fine)
2. **Annotated equation** — LaTeX with tensor shapes labeled per symbol (`(B, T, d)` etc.) in DL material
3. **Concrete worked example on real inputs** (tokens, feature values, sample predictions)
4. **Empirical plot** — loss curves, scaling laws, decision boundaries, distributions
5. **Comparison / ablation / results table**
6. **Progressive fragment reveal** (Reveal.js fragments) — for building derivations or diagrams step-by-step
7. **Pseudocode in plain English**
8. **Actual code** — only when syntax *is* the concept; keep minimal, never paste a whole notebook cell

**Use the `frontend-design` skill** for any slide needing custom layout, a CSS-built diagram, or distinctive visual treatment beyond plain markdown.

**Cross-cutting rules for every deck:**
- Establish notation early and lock it across the deck — students cross-reference with papers.
- Cite the source paper or Raschka & Mirjalili chapter in the slide corner (small text).
- Annotate tensor shapes on every equation in DL/LLM material.

**Notes must stay in sync with slides.** After changing any slide's visual content, update its `Note:` block in the same edit. Notes should reference what is actually visible on the slide. Stale notes that reference removed elements (e.g., old code blocks) cause problems during video recording.

**Verify rendered output via Playwright MCP after slide edits.** Text-only edits miss MathJax rendering bugs, CSS overflow, and layout issues. After editing one or more slides, use `mcp__playwright__browser_navigate` to `http://localhost:8000/<deck>/#/<slide>` and `mcp__playwright__browser_screenshot` each affected slide before reporting the edit done.

**Always clean up Playwright screenshots from the project root before ending a session.** Playwright MCP drops PNGs at the working directory by default. The `.gitignore` already excludes `*.png` at root, but leaving them around clutters the workspace. Use `rm -f ens-*.png live-*.png` (or similar) once verification is done.

## Project Tooling

### MCP Servers (configured in `.mcp.json` — gitignored)

| Server | Purpose |
|---|---|
| `brave-search` | Academic search (Google Scholar, arXiv lookups, citation verification). Uses `BRAVE_API_KEY` from `.env`. Tool prefix: `mcp__brave-search__brave_web_search`. |
| `playwright` | Browser automation — navigate, screenshot, click. Use for visual verification of slides. Tool prefix: `mcp__playwright__browser_*`. First run downloads Chromium. |

Both load at Claude Code session start. Approved via `enabledMcpjsonServers` in `.claude/settings.local.json`. Restart Claude Code if a tool isn't showing up.

### Subagent: `course-researcher`

Defined at `.claude/agents/course-researcher.md`. Use proactively for:
- Looking up canonical papers to cite on slides
- Verifying derivations against the original source
- Cross-referencing Raschka chapters with primary literature
- Deepening graduate-level explanations

Has access to WebSearch, WebFetch, Read (the Raschka PDF in `resource/`), Brave Search MCP, and Bash. Returns a research brief — NOT slide markdown. Invoke via Agent tool with `subagent_type: "course-researcher"`.

### Secrets

`.env`, `.mcp.json`, and `.claude/settings.local.json` are all gitignored — they may contain the Brave API key. If the key is rotated, update both `.env` and `.mcp.json`.

## Adding a New Lecture Module

1. **Slides**: Create `~/Workspace/markdown-slides/<module>/slides.local.md` (source, with `Note:` blocks) + `index.html` (copy from `ensemble-methods/` as template — it has the hostname-branching script and the canonical Reveal config). The first commit will auto-generate `slides.md` via the pre-commit hook.
2. **Theory notebook**: Create `notebooks/<nn>_<topic>.ipynb` with Colab/Kaggle badges in first markdown cell
3. **Applied notebook**: Create `notebooks/<nn>b_<topic>.ipynb` with real-world case study
4. **Place data files** alongside notebooks in `notebooks/` (add large files to `.gitignore`)
5. **Module overview**: Create `modules/<nn>_<name>/index.md` with prerequisites, objectives, and slide link
6. **Video script**: Create `resource/<topic>_script.md` synchronized to slides and notebook sections
7. **Register in TOC**: Add all new files to `myst.yml` under `toc:`

## Current Modules

Modules 1–9 follow Raschka & Mirjalili chapters 1–9 one-to-one; each module dir under `modules/` holds the overview page, the annotated chapter notebook (`chXX-BAJ.ipynb`), referenced `figures/`, small data files, and lecture-note PDFs synced from Google Drive (`~/Library/CloudStorage/GoogleDrive-bjalaian@uwf.edu/My Drive/Teaching/Teaching-ML-MainRepo-Live/lecture/`).

| # | Topic | Status |
|---|-------|--------|
| 01 | Introduction to ML (ch01) | Chapter notebook + lecture notes |
| 02 | Linear Classifiers (ch02) | Chapter notebook + slides + math notes |
| 03 | ML Classifiers with Scikit-Learn (ch03) | Chapter notebook + lecture/math notes |
| 04 | Data Preprocessing (ch04) | Chapter notebook + lecture/math notes |
| 05 | Dimensionality Reduction (ch05) | Chapter notebook + extra example + lecture/math notes |
| 06 | Model Evaluation & Tuning (ch06) | Chapter notebook + lecture notes |
| 07 | Ensemble Methods (ch07) | Complete (theory + fraud detection case study + chapter notebook + scripts) |
| 08 | Sentiment Analysis (ch08) | UWFLecture notebook (IMDb data downloaded by notebook, not in repo) |
| 09 | Regression Analysis (ch09) | Chapter notebook + lecture notes |
| 10 | Neural Networks (ch11) | Theory + applied notebooks + chapter notebook + lecture notes |
| 11 | PyTorch (ch12–13) | Four UWFLecture notebooks + slides |
| 12 | CNN (ch14) | UWFLecture notebook + slides |
| 13 | RNN (ch15) | UWFLecture notebook + slides |
| 14 | Transformers (ch16) | UWFLecture notebook + slides |
| 15 | Reinforcement Learning (ch19) | Lecture notebook + slides |
| 16 | Large Language Models | Student-contributed lecture notebooks (6 parts) |

Modules 10–15 source from `~/Library/CloudStorage/GoogleDrive-bjalaian@uwf.edu/My Drive/Teaching/ML-DL-LectureHub/ModuleXX-*/` (UWFLecture notebooks + slide PDFs).
