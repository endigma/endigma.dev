import mdx from "@astrojs/mdx"
import svelte from "@astrojs/svelte"
import { defineConfig } from "astro/config"
import uno from "unocss/astro"

// https://astro.build/config
export default defineConfig({
	site: "https://endigma.dev",
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
		svelte(),
	],
})
