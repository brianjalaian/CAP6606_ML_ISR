---
title: Extended Materials
date: 2026-11-22
---

These optional notebooks extend the course's coverage of [recurrent neural networks](../14_rnn/index.md), [Transformers](../15_transformers/index.md), and [large language models](../17_llm/00-toc-llm.md). Each notebook includes worked examples and checks you can run on a CPU in Google Colab.

| Notebook | What you will do |
| --- | --- |
| [From RNN to LSTM to Transformer](./00_rnn_lstm_to_transformer.ipynb) | Compare how RNNs, LSTMs, and attention retain information across a sequence. |
| [Tokenization and Embeddings](./01_tokenization_clm_mlm.ipynb) | Build a small BPE tokenizer and distinguish token embeddings from embeddings of entire texts. |
| [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb) | Compute attention by hand, verify a causal mask, and compare self-attention with cross-attention. |
| [KV Cache and GQA](./03_gqa_kv_cache.ipynb) | Verify cached decoding and estimate how grouped-query attention changes the memory budget. |
| [Positional Encoding: From Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) | Compare absolute positions with rotary embeddings and test how RoPE handles relative positions. |
| [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) | Compare GPT-2 and Llama decoder blocks, then trace how a mixture of experts routes tokens. |

Start with the first notebook for the full sequence. If you already know how a Transformer block works, start with KV Cache and GQA, then continue with RoPE and the decoder comparison.

The notebooks were developed by Chung-En (Johnny) Yu and draw on Sebastian Raschka's [Machine Learning with PyTorch and Scikit-Learn](https://github.com/rasbt/machine-learning-book) and [Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch). Each notebook identifies its sources. License notices for bundled helper scripts are included alongside those scripts.
