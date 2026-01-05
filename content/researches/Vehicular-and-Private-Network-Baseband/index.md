---
title: "AI Chips & Neural Processors"
date: 2024-01-01
type: landing  # 关键：设置为 landing 类型以允许使用 blocks
sections:
  - block: research-detail
    content:
      # 1. 总体介绍部分
      title: "Energy-Efficient AI Hardware"
      image: "featured.png" # 大图
      text: |
        Our research focuses on overcoming the "Memory Wall" and "Power Wall" in modern deep learning deployment. 
        
        We investigate novel architectures including **Compute-in-Memory (CIM)**, sparsity-aware processing, and hardware-software co-design. Our goal is to enable real-time intelligence on edge devices with milliwatt-level power consumption.

      # 2. 细分方向部分
      features:
        - title: "Sparsity-Aware Accelerators"
          icon: "cpu-chip" # 可以使用 icon
          description: "Exploiting activation and weight sparsity to reduce computation by 5x-10x without accuracy loss."
        
        - title: "Compute-in-Memory"
          icon: "circle-stack" 
          description: "Designing mixed-signal circuits to perform MAC operations directly within SRAM/RRAM arrays."

        - title: "Reconfigurable Architectures"
          image: "featured.png" # 也可以使用具体的小图片
          description: "FPGA-based dynamic accelerators that adapt to Transformer and CNN workloads in real-time."

    design:
      css_class: "bg-white dark:bg-gray-900"
---

<!-- ---
title: Vehicular and Private Network Baseband
date: 2023-10-26
type: landing
# links:
#   - type: site
#     url: https://github.com/scikit-learn/scikit-learn
# tags:
#   - Hugo
#   - HugoBlox
#   - Markdown

featured: false

sections:
  - block: cta-card
    content:
      title: Vehicular and Private Network Baseband
      text: |-
        This research area targets emerging vehicular, power, and industry-specific networks, focusing on advanced physical-layer and baseband processing techniques and their corresponding dedicated chips and processor architectures. Our work spans LTE-V/C-V2X vehicular communication, 230 MHz power private network baseband chips, and baseband ASICs for roadside units and industrial IoT. Building on RISC-V and dataflow-driven architectures, we develop domain-specific processors for key communication kernels such as synchronization, channel estimation, and MIMO detection, together with supporting software and toolchains.

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
categories: ["Wireless-Communication-Systems-and-Dedicated-Baseband-Processors"]
---
Vehicular and Private Network Baseband -->
