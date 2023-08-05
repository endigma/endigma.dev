import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import uno from "unocss/astro"

import preact from "@astrojs/preact"

// https://astro.build/config
export default defineConfig({
	site: "https://site.endigma.dev",
	markdown: {
		shikiConfig: {
			theme: "github-dark-dimmed",
		},
	},
	integrations: [
		uno({
			injectReset: true,
		}),
		mdx(),
		preact(),
	],
})
