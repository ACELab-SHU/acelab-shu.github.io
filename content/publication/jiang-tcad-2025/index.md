---
title: 'An Arbitrary Register Grouping Scheme for RISC-V Vector Extension: Compilation
  Support and Hardware Implementation'
authors:
- Limin Jiang
- Siyi Xu
- Yintao Liu
- Yihao Shen
- Yi Shi
- Shan Cao
- Zhiyuan Jiang
date: '2025-01-01'
publishDate: '2026-01-18T08:13:44.229419Z'
publication_types:
- article-journal
publication: '*IEEE Transactions on Computer-Aided Design of Integrated Circuits and
  Systems*'
doi: 10.1109/TCAD.2025.3649448
abstract: Vector instruction set architectures (ISAs) play a critical role in accelerating
  data-parallel computation, yet mainstream designs—such as the RISC-V “V” Vector
  Extension (RVV) – still rely on rigid, power-of-two register grouping strategies.
  These limitations hinder performance when handling ultra-long vectors or non-uniform
  workloads, as they require extensive strip-mining and careful low-level tuning to
  maintain efficiency. To overcome these bottlenecks, we propose Zoozve, a flexible,
  strip-mining-free extension to the RISC-V vector ISA. Zoozve introduces an arbitrary
  register grouping mechanism that enables more precise register utilization and eliminates
  the need for data slicing across multiple loop iterations. This work presents a
  full-stack realization of Zoozve, including (1) a hardware-compatible ISA with support
  for flexible vector lengths and asymmetric instructions, (2) a compiler backend
  based on LLVM that performs intrinsic splitting, register allocation with live-interval
  modification, and instruction coalescing, and (3) a hardware proof-of-concept implementation
  that integrates hazard detection and a register-level element exchange engine. Experimental
  evaluation using instruction-level simulation shows that Zoozve achieves up to 344.44×
  speedup in fast Fourier transform (FFT), 76× in dot product, 58.92× in axpy, and
  20.41× in 2D convolution compared to RVV, primarily by eliminating strip-mining
  and improving register reuse. Register transfer level (RTL) synthesis in a 40 nm
  process shows that Zoozve’s additional hardware logic incurs only 9% area overhead,
  confirming its feasibility for real-world deployment. Together, these results demonstrate
  Zoozve’s potential as a scalable and efficient vector processing solution for high-performance
  computing, machine learning, and signal processing.
---
