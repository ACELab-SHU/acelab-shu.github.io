---
title: People
date: 2025-10-26
type: landing

design:
  # Section spacing
  spacing: '5rem'

# Page sections
# sections:
#   - block: collection
#     content:
#       title: "教师团队"
#       text: ""
#       filters:
#         folders:
#           - people
#         tag: teacher
#       sort_by: "Params.weight"
#       sort_ascending: true
#     design:
#       view: article-grid
#       fill_image: false
#       columns: 3
#       show_date: false
#       show_read_time: false
#       show_read_more: true
sections:
  - block: team-showcase
    content:
      title: Teams
      # subtitle: World-class researchers advancing science
      # text: Our diverse team brings together expertise from multiple disciplines.
      user_groups:
        - Faculties
        - Postdoctoral Researchers
        - Ph.D. Students
        - Master Students
        - Alumni
      sort_by: 'Params.weight'
      sort_ascending: true
      cta:
        text: Join Our Team
        url: /opportunities
        icon: user-plus
    design:
      show_role: true
      show_organizations: true
      show_interests: false
      show_social: true
      # Section background color (CSS class)
      css_class: "bg-gray-50 dark:bg-gray-900"
  # - block: team-showcase
  #   content:
  #     title: PostDoc Researchers
  #     # subtitle: World-class researchers advancing science
  #     # text: Our diverse team brings together expertise from multiple disciplines.
  #     user_groups:
  #       - Postdoctoral Researchers
  #     sort_by: 'Params.weight'
  #     sort_ascending: true
  #     # cta:
  #     #   text: Join Our Team
  #     #   url: /opportunities
  #     #   icon: user-plus
  #   design:
  #     show_role: true
  #     show_organizations: true
  #     show_interests: false
  #     show_social: true
  #     # Section background color (CSS class)
  #     css_class: "bg-gray-50 dark:bg-gray-900"
  # - block: team-showcase
  #   content:
  #     title: Ph.D. Students
  #     # subtitle: World-class researchers advancing science
  #     # text: Our diverse team brings together expertise from multiple disciplines.
  #     user_groups:
  #       - Ph.D. Students
  #     sort_by: 'Params.weight'
  #     sort_ascending: true
  #   design:
  #     show_role: true
  #     show_organizations: true
  #     show_interests: false
  #     show_social: true
  #     # Section background color (CSS class)
  #     css_class: "bg-gray-50 dark:bg-gray-900"
  # - block: team-showcase
  #   content:
  #     title: Master Students
  #     # subtitle: World-class researchers advancing science
  #     # text: Our diverse team brings together expertise from multiple disciplines.
  #     user_groups:
  #       - Master Students
  #     sort_by: 'Params.weight'
  #     sort_ascending: true
  #   design:
  #     show_role: true
  #     show_organizations: true
  #     show_interests: false
  #     show_social: true
  #     # Section background color (CSS class)
  #     css_class: "bg-gray-50 dark:bg-gray-900"
  # - block: team-showcase
  #   content:
  #     title: Undergraduate Students
  #     # subtitle: World-class researchers advancing science
  #     # text: Our diverse team brings together expertise from multiple disciplines.
  #     user_groups:
  #       - Undergraduate Students
  #     sort_by: 'Params.weight'
  #     sort_ascending: true
  #     cta:
  #       text: Join Our Team
  #       url: /opportunities
  #       icon: user-plus
  #   design:
  #     show_role: true
  #     show_organizations: true
  #     show_interests: false
  #     show_social: true
  #     # Section background color (CSS class)
  #     css_class: "bg-gray-50 dark:bg-gray-900"
  # 毕业生列表块，学位包含：PostDoc,Ph.D.,M.S.,B.S.
  - block: alumni-list
    content:
      title: Alumni
      subtitle: Our graduates make impacts in academia and industry
      user_groups:
        - Alumni
    design:
      # 背景色可以稍微区分一下，或者保持一致
      css_class: "bg-white dark:bg-gray-900"
---
