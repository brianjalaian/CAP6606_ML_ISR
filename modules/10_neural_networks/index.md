# Module 10: Neural Networks

This module develops multilayer perceptrons from first principles: nonlinear representation learning, forward propagation, softmax cross-entropy, backpropagation, mini-batch optimization, initialization, normalization, regularization, and practical model diagnosis.

## What You'll Learn

- Trace tensor shapes through a multilayer perceptron
- Explain why nonlinear activations solve problems that linear classifiers cannot
- Derive backpropagation for an affine–activation–affine network
- Implement and gradient-check a two-layer network using NumPy
- Diagnose optimization and generalization from training and validation curves
- Evaluate an image classifier using errors, robustness, confidence, and latency—not accuracy alone

## Lecture Materials

- 📊 [View lecture slides](https://brianjalaian.github.io/markdown-slides/neural-networks/)
- 📝 [Lecture Notes (PDF)](M10-Lecture_Note.pdf)
- 📓 [Theory & fundamentals notebook](../../notebooks/02_neural_networks.ipynb)
- 🔢 [Applied notebook: handwritten digit recognition](../../notebooks/02b_neural_network_digit_recognition.ipynb)
- 📔 Chapter notebook: *Implementing a Multilayer Artificial Neural Network from Scratch* (ch11)

## Local Preview

Run both development servers in separate terminals:

```bash
# Course site and notebooks → http://localhost:3000
cd ~/Workspace/CAP6606_ml_for_intelligent_systems
npx jupyter-book start
```

```bash
# Slides → http://localhost:8000/neural-networks/
cd ~/Workspace/markdown-slides/reveal.js
npm start -- --root ../
```

On localhost, the slide deck automatically loads `slides.local.md`, including private presenter notes. Add `?public=1` to preview the stripped public deck.

## Prerequisites

- Linear models and vector/matrix multiplication
- Derivatives and the scalar chain rule
- NumPy array operations
- Train/validation/test splits and feature scaling
- Overfitting versus underfitting

## Recommended Sequence

1. Watch or present the lecture slides.
2. Run the theory notebook and inspect the gradient check.
3. Complete the digit-recognition case study.
4. Try the exercises at the end of each notebook.

## References

- Raschka, S., & Mirjalili, V. (2022). *Machine Learning with PyTorch and Scikit-Learn*, Chapters 11–12.
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). “Learning representations by back-propagating errors.” *Nature*, 323, 533–536.
- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*, Chapters 6–8.
