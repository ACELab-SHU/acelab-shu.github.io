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
          subtitle: "上海大学先进通信与计算芯片实验室"
          description: >
            ACELab 面向无线通信、智能计算与集成电路系统开展交叉研究，
            关注从基础方法、体系结构到真实应用场景的贯通创新。

  - block: research-overview
    id: researches
    content:
      title: 重点研究方向
      subtitle: "面向 AI 与通信深度融合，探索下一代异构计算与开放式通信架构。"
      items:
        - title: "NeuroBaseband"
          text: "面向 6G 的新型基带处理器架构。通过数据流驱动的 RISC-V 体系替代传统固定硬件路径，降低控制流开销，提升 5G/6G 基带处理效率，并为开放、可持续的通信计算平台提供支撑。"
          image: "featured.png"
          link: "/researches/NeuroBaseband/"
        - title: "边缘 AI 推理引擎"
          text: "面向边缘智能的高效异构计算引擎。通过 1D 向量核心与 2D 脉动阵列共享片上存储，缓解存储墙瓶颈，在受限功耗下支持 CNN、Transformer 等模型的高吞吐推理。"
          image: "featured.png"
          link: "/researches/Edge_AI/"
    design:
      columns: 3
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
