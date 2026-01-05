---
title: Unlimited Vector Processing for Wireless Baseband Based on RISC-V Extension
authors:
- Limin Jiang
- Yi Shi
- Yihao Shen
- Shan Cao
- Zhiyuan Jiang
- Sheng Zhou
date: '2025-01-01'
publishDate: '2025-11-23T16:16:51.083100Z'
publication_types:
- article-journal
publication: '*IEEE Transactions on Very Large Scale Integration (VLSI) Systems*'
hugoblox:
  ids:
    doi: 10.1109/TVLSI.2025.3602401
abstract: Wireless baseband processing (WBP) serves as an ideal scenario for utilizing
  vector processing, which excels in managing data-parallel operations due to its
  parallel structure. However, conventional vector architectures face certain constraints
  such as limited vector register sizes, reliance on power-of-two vector length multipliers,
  and vector permutation capabilities tied to specific architectures. To address these
  challenges, we have introduced an instruction set extension (ISE) based on RISC-V
  known as unlimited vector processing (UVP). This extension enhances both the flexibility
  and efficiency of vector computations. UVP employs a novel programming model that
  supports non-power-of-two register groupings and hardware strip-mining, thus enabling
  smooth handling of vectors of varying lengths while reducing the software strip-mining
  burden. Vector instructions are categorized into symmetric and asymmetric classes,
  complemented by specialized load/store strategies to optimize execution. Moreover,
  we present a hardware implementation of UVP featuring sophisticated hazard detection
  mechanisms, optimized pipelines for symmetric tasks such as fixed-point multiplication
  and division, and a robust permutation engine for effective asymmetric operations.
  Comprehensive evaluations demonstrate that UVP significantly enhances performance,
  achieving up to 3.0$ times$ and 2.1$ times$ speedups in matrix multiplication and
  fast Fourier transform (FFT) tasks, respectively, when measured against lane-based
  vector architectures. Our synthesized RTL for a 16-lane configuration using SMIC
  40nm technology spans 0.94 mm$textasciicircum 2$ and achieves an area efficiency
  of 21.2 GOPS/mm$textasciicircum 2$.
links:
- name: arXiv
  url: https://arxiv.org/abs/2504.10832
---
