---
title: ''
date: 2025-10-24
type: landing

design:
  spacing: '6rem'

sections:
  - block: slider-tw
    content:
      slides:
        - background:
            image:
              filename: team1.jpg
              position: center
              size: cover
        - background:
            image:
              filename: team2.jpg
              position: center
              size: cover
        - background:
            image:
              filename: team3.jpg
              position: center
              size: cover
    design:
      slide_height: "calc(100vh - 120px)"
      auto_play: true
      interval_ms: 4000
      css_class: ""
    blocks:
      - block: lab-card
        id: lab-intro
        content:
          title: "ACELab"
          subtitle: "上海大学先进通信与计算芯片实验室<br>Advanced Communication and Computing Electronics Lab"
          description: >
            ACELab 面向无线通信、智能计算与集成电路系统开展交叉研究，
            关注从基础方法、体系结构到真实应用场景的贯通创新。
            实验室常年招收博士、硕士（专硕为主）和博士后等研究人员。

  - block: research-overview
    id: researches
    content:
      title: 重点研究方向
      subtitle: "两条技术主线，一套融合计算底座：数据流驱动 · RISC-V 可编程 · 共享近存 · 领域工具链。"
      items:
        - title: "高能效 RISC-V 融合基带"
          text: "NeuroBaseband / Venus，面向 6G AI-RAN 的融合芯片架构。以数据流驱动的 RISC-V 体系替代传统固定硬件路径，FFT 能效较通用平台提升 33.4×，40nm SoC 完成实测。"
          image: "report-neurobaseband.png"
          link: "/reports/neurobaseband/"
        - title: "超低功耗多模态感知 NPU"
          text: "Kuiloong / LPNPU 端侧语义门控 × KXP KV 扩展处理器：端侧以 mW 级功耗决定是否唤醒主系统；数据中心侧把 Decode Attention 搬到 KV 数据旁边，跨链路流量下降约 3,000–4,000 倍。"
          image: "report-npu.png"
          link: "/reports/npu/"
    design:
      columns: 2
      fit_image: true
      css_class: "bg-gray-50 dark:bg-gray-900"

  - block: portfolio-lite
    content:
      offset: 0
      count: 0
      title: 实验室活动
      filters:
        folders:
          - events
        exclude_featured: false
      tag_param: "publication_type"
      buttons:
        - name: 全部
          filter: "*"
        - name: 团队建设
          filter: "Team Building"
    design:
      columns: 3
      fill_image: true
      show_summary: true
      show_date: true
      show_read_time: true
      show_read_more: true

  - block: pub-collection
    content:
      title: 论文成果
      filters:
        author: ""
        show_toolbar: false
    design:
      view: pub-item
      sort_order: "type_year"
---
