---
title: Publications
type: landing
# cms_exclude: true

# # View.
# view: citation

# # Optional header image (relative to `static/media/` folder).
# banner:
#   caption: ''
#   image: ''
sections:
  - block: pub-collection
    content:
      title: Publications
      filters:
        author: ""           # (可选) 填入名字，留空则显示所有
        show_toolbar: true   # (可选) 是否显示蓝色筛选条，默认为 true
    design:
      view: pub-item
      sort_order: "year_type" # 可选: "year_type" (默认) 或 "type_year"
---
