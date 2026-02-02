---
title: "Real-time Demo"
thebe: true
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.16.3
kernelspec:
  name: python3
  display_name: Python 3
  language: python
---

# Real-time Demo

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/brianjalaian/CAP6606_ml_for_intelligent_systems/blob/main/notebooks/lightweight_demo.md)

[![Open in Kaggle](https://kaggle.com/static/images/open-in-kaggle.svg)](https://kaggle.com/kernels/welcome?src=https://github.com/brianjalaian/CAP6606_ml_for_intelligent_systems/blob/main/notebooks/lightweight_demo.md)

```{note}
Use this lightweight page to toggle Thebe for quick CPU-bound experiments during lectures.
```

```{code-cell} ipython3
import math

angles = [0, 30, 60, 90]
sin_table = {angle: math.sin(math.radians(angle)) for angle in angles}
sin_table
```
