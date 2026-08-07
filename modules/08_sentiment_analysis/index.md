# Module 8: Sentiment Analysis (Applying ML to Text)

Our first applied deep-dive into unstructured data: turning raw movie-review text into features a classifier can learn from, and scaling the pipeline to datasets that don't fit in memory.

## What You'll Learn

- The bag-of-words model and n-grams
- Term frequency–inverse document frequency (tf-idf) weighting
- Text cleaning and tokenization; stemming and stop words
- Training a logistic regression sentiment classifier on 50k IMDb reviews
- Out-of-core learning with stochastic gradient descent
- Topic modeling with latent Dirichlet allocation (LDA)

## Lecture Materials

- 📓 Chapter notebook: *Applying Machine Learning to Sentiment Analysis*

```{note}
The IMDb `movie_data.csv` file (~63 MB) is not stored in this repository — the notebook's first cells download and rebuild it from the original source.
```

## Prerequisites

- Modules 3, 4, and 6

## Reference

Raschka & Mirjalili, *Machine Learning with PyTorch and Scikit-Learn*, Chapter 8.
