---
# Leave the homepage title empty to use the site title
title: ''
date: 2025-10-24
type: landing

design:
  # Default section spacing
  spacing: '6rem'

sections:
  - block: slider-tw
    content:
      slides:
        - background:
            image:
              filename: team1.jpg      # 放在 assets/media/hero1.jpg
              position: center
              size: cover
        - background:
            image:
              filename: team2.jpg      # 放在 assets/media/hero1.jpg
              position: center
              size: cover
        - background:
            image:
              filename: team3.jpg      # 放在 assets/media/hero1.jpg
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
          subtitle: "Advanced Communication and Computing Electronics Lab"
          description: >
            ACELab focuses on wireless communication, intelligent computing,
            and integrated circuit systems, bridging fundamental research
            and real-world applications.
  - block: research-overview
    id: researches
    content:
      title: Key Research Directions
      subtitle: "Two technical lines, one fusion-computing backbone: dataflow-driven, RISC-V programmable, shared near-memory, domain toolchain."

      items:
        - title: "RISC-V Fusion Baseband"
          text: "NeuroBaseband / Venus — a fusion chip architecture for 6G AI-RAN. Dataflow-driven RISC-V replaces rigid hardware paths, delivering 33.4× FFT energy efficiency over general-purpose platforms, silicon-proven on a 40nm SoC."
          image: "report-neurobaseband.png"
          link: "/reports/neurobaseband/en/"

        - title: "Ultra-Low-Power Sensing NPU"
          text: "Kuiloong / LPNPU edge semantic gating × KXP KV Extension Processor: at the edge, mW-level power decides whether to wake the main system; in the data center, Decode Attention moves next to the KV data, cutting cross-link traffic by roughly 3,000–4,000×."
          image: "report-npu.png"
          link: "/reports/npu/en/"

    design:
      columns: 2
      fit_image: true
      css_class: "bg-gray-50 dark:bg-gray-900"
  # - block: portfolio-lite
  #   content:
  #     offset: 0
  #     count: 0
  #     title: PROJECT
  #     # page_type: projects
  #     filters:
  #       folders:
  #         - researches
  #       exclude_featured: false
  #     tag_param: "tags"
  #     buttons:
  #       - name: All
  #         filter: "*"
  #       - name: 5G
  #         filter: "5g"
  #       - name: UAV
  #         filter: "uav"
  #   design:
  #     view: card        # card / article-grid / date-title-summary
  #     columns: 3
  #     fill_image: false
  #     show_summary: true
  #     show_date: true
  #     show_read_time: false
  #     show_read_more: false
  - block: portfolio-lite
    content:
      offset: 0
      count: 0
      title: Events
      filters:
        folders:
          - events
        exclude_featured: false
      tag_param: "publication_type"
      buttons:
        - name: All
          filter: "*"
        - name: Team Building
          filter: "Team Building"
    design:
      columns: 3
      fill_image: true
      show_summary: true
      show_date: true
      show_read_time: true
      show_read_more: true
  # - block: collection
  #   content:
  #     title: Recent Publications
  #     text: ''
  #     filters:
  #       folders:
  #         - publication
  #       exclude_featured: false
  #   design:
  #     view: citation
  - block: pub-collection
    content:
      title: Publications
      filters:
        author: ""           # (可选) 填入名字，留空则显示所有
        show_toolbar: false   # (可选) 是否显示蓝色筛选条，默认为 true
    design:
      view: pub-item
      sort_order: "type_year" # 可选: "year_type" (默认) 或 "type_year"
  # - block: collection
  #   id: talks
  #   content:
  #     title: Recent & Upcoming Talks
  #     filters:
  #       folders:
  #         - events
  #   design:
  #     view: card
  # - block: collection
  #   id: news
  #   content:
  #     title: Recent News
  #     subtitle: ''
  #     text: ''
  #     # Page type to display. E.g. post, talk, publication...
  #     page_type: blog
  #     # Choose how many pages you would like to display (0 = all pages)
  #     count: 5
  #     # Filter on criteria
  #     filters:
  #       author: ''
  #       category: ''
  #       tag: ''
  #       exclude_featured: false
  #       exclude_future: false
  #       exclude_past: false
  #       publication_type: ''
  #     # Choose how many pages you would like to offset by
  #     offset: 0
  #     # Page order: descending (desc) or ascending (asc) date.
  #     order: desc
  #   design:
  #     # Choose a layout view
  #     view: card
  #     # Reduce spacing
  #     spacing:
  #       padding: [0, 0, 0, 0]

---
