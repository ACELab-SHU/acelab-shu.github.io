module github.com/HugoBlox/hugo-blox-builder/starters/academic-cv

go 1.19

require (
	github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify v1.2.0
	github.com/HugoBlox/hugo-blox-builder/modules/blox-tailwind v0.10.0
)

require github.com/HugoBlox/hugo-blox-builder/modules/blox-analytics v0.3.0 // indirect

replace github.com/HugoBlox/hugo-blox-builder/modules/blox-tailwind => ./hugo-blox-builder-main/modules/blox-tailwind

replace github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify => ./hugo-blox-builder-main/modules/blox-plugin-netlify

replace github.com/HugoBlox/hugo-blox-builder/modules/blox-analytics => ./hugo-blox-builder-main/modules/blox-analytics
