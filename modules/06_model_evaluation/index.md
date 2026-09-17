# Module 6: Model Evaluation & Hyperparameter Tuning

Best practices for knowing whether your model is actually good: honest evaluation protocols, systematic hyperparameter search, and the diagnostic tools that tell you *why* a model underperforms.

## What You'll Learn

- Pipelines for leak-free preprocessing + modeling
- K-fold cross-validation and stratification
- Learning curves and validation curves for diagnosing bias vs. variance
- Grid search and randomized/successive-halving hyperparameter search
- Confusion matrices, precision/recall, F1, ROC-AUC, and metrics for imbalanced classes

## Lecture Materials

- 📝 [Lecture Notes (PDF)](M6-Lecture_Note.pdf)
- 📓 Chapter notebook: *Learning Best Practices for Model Evaluation and Hyperparameter Tuning*


<!-- BEGIN YOUTUBE LECTURE VIDEOS -->
## Lecture Videos

### Part 1: Introduction and Module Overview | CAP 6606 — Module 6, Part 1

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/V6ceShpX_KU"
  title="Introduction and Module Overview | CAP 6606 — Module 6, Part 1"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 2: Streamlining Workflows with Pipelines | CAP 6606 — Module 6, Part 2

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/I53T__ksfsA"
  title="Streamlining Workflows with Pipelines | CAP 6606 — Module 6, Part 2"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 3: Holdout and K-Fold Cross-Validation | CAP 6606 — Module 6, Part 3

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/n1q72CRoeAs"
  title="Holdout and K-Fold Cross-Validation | CAP 6606 — Module 6, Part 3"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 4: Learning and Validation Curves | CAP 6606 — Module 6, Part 4

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/cyexMrny5QQ"
  title="Learning and Validation Curves | CAP 6606 — Module 6, Part 4"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 5: Hyperparameter Search with Grid and Randomized Search | CAP 6606 — Module 6, Part 5

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/Upn5HlW6Zto"
  title="Hyperparameter Search with Grid and Randomized Search | CAP 6606 — Module 6, Part 5"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 6: Nested Cross-Validation for Algorithm Selection | CAP 6606 — Module 6, Part 6

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/vmHJkF2rUr8"
  title="Nested Cross-Validation for Algorithm Selection | CAP 6606 — Module 6, Part 6"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 7: The Confusion Matrix | CAP 6606 — Module 6, Part 7

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/DmN1wRKxRCU"
  title="The Confusion Matrix | CAP 6606 — Module 6, Part 7"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 8: Optimizing Precision and Recall | CAP 6606 — Module 6, Part 8

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/shTU32Oidmw"
  title="Optimizing Precision and Recall | CAP 6606 — Module 6, Part 8"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 9: ROC Curves and AUC | CAP 6606 — Module 6, Part 9

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/MtkTtLWU6aU"
  title="ROC Curves and AUC | CAP 6606 — Module 6, Part 9"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

### Part 10: Multiclass Metrics, Class Imbalance, and Summary | CAP 6606 — Module 6, Part 10

<iframe
  width="100%"
  style="aspect-ratio: 16 / 9;"
  src="https://www.youtube-nocookie.com/embed/9RIRIyMzhzQ"
  title="Multiclass Metrics, Class Imbalance, and Summary | CAP 6606 — Module 6, Part 10"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen>
</iframe>

<!-- END YOUTUBE LECTURE VIDEOS -->
## Prerequisites

- Modules 3–5

## Reference

Raschka & Mirjalili, *Machine Learning with PyTorch and Scikit-Learn*, Chapter 6.
