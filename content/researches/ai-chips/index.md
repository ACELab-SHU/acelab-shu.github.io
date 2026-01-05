---
title: "AI Chips and Neural Network Processors"
date: 2024-01-01
type: landing
featured: true
sections:
  - block: research-detail
    content:
      # 1. 总体介绍
      title: "AI Chips and Neural Network Processors"
      image: "featured_ai_chip.png"
      text: |
        We focus on the design of **Domain-Specific Architectures (DSA)** for edge intelligence. By leveraging heterogeneous computing (RISC-V + NPU) and hardware-software co-design, we address the bottlenecks of power consumption and latency in modern deep learning deployment.
        
        Our team has developed a series of accelerators ranging from **ultra-low power NPUs** to high-performance **RISC-V vector processors**, supported by a full-stack LLVM-MLIR compiler ecosystem.

      # 2. 细分方向
      features:
        - title: "Heterogeneous RISC-V + NPU"
          icon: "cpu-chip"
          description: "A flexible heterogeneous architecture combining RISC-V control cores with specialized NPU acceleration units for efficient mixed-workload processing."
        
        - title: "AI Compiler Stack (LLVM-MLIR)"
          icon: "code-bracket" 
          description: "An end-to-end compilation framework based on LLVM and MLIR, enabling automated operator mapping and optimization for our custom hardware."

        - title: "Sparsity-Aware Acceleration"
          icon: "bolt"
          description: "Hardware-level optimizations for sparse neural networks (e.g., AlexNet, VGG, ResNet) to maximize energy efficiency and throughput."
    design:
      css_class: "bg-white dark:bg-gray-900"
---

<!-- ---
title: AI Chips and Neural Network Processors
date: 2023-10-26
type: landing
# links:
#   - type: site
#     url: https://github.com/scikit-learn/scikit-learn
# tags:
#   - Hugo
#   - HugoBlox
#   - Markdown

featured: true

sections:
  - block: cta-card
    content:
      title: AI Chips and Neural Network Processors
      text: |-
        This research area addresses the growing demand for edge intelligence and on-device AI by exploring neural network accelerators, general-purpose NPU architectures, and their compiler and software stacks. Starting from dedicated accelerators for representative CNN models such as ResNet, VGG, and AlexNet, our work extends to general-purpose NPUs supporting both CNNs and Transformers, as well as LLVM-MLIR–based heterogeneous compiler frameworks and runtime systems. We further investigate ultra-low-power design, multi-dimensional compute units, and on-chip networks to enable efficient intelligence on battery-powered and edge devices.
    design:
      card:
        # Card background color (CSS class)
        css_class: 'bg-primary-300 dark:bg-primary-700'
        css_style: ''
  - block: collection
    content:
      title: Recent Publications
      text: ''
      filters:
        folders:
          - publications
        exclude_featured: false
    design:
      view: citation

# tags:
#   - Hugo
---
AI Chips and Neural Network Processors -->
