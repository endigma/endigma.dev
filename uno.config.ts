import transformerDirectives from "@unocss/transformer-directives"
import transformerVariantGroup from "@unocss/transformer-variant-group"
import {
	VariantHandlerContext,
	VariantObject,
	defineConfig,
	escapeRegExp,
	presetIcons,
	presetUno,
} from "unocss"
import { presetRadix, type RadixColors } from "unocss-preset-radix"

const palette: RadixColors[] = ["sage", "mint", "red"]

const aliases: { [key: string]: RadixColors } = {
	base: "sage",
	primary: "mint",
}

export default defineConfig({
	presets: [
		presetUno(),
		presetRadix({
			darkSelector: ":root",
			lightSelector: ".never",
			palette: palette,
			aliases: aliases,
		}),
		presetIcons(),
	],
	variants: [
		variantParentMatcher("print", "@media print"),
		variantParentMatcher("screen", "@media screen"),
	],
	safelist: [
		...Array.from({ length: 10 }, (_, i) => `p-${i + 1}`),
		...Array.from({ length: 10 }, (_, i) => `mr-${i + 1}`),
		...Array.from({ length: 10 }, (_, i) => `ml-${i + 1}`),
		...palette.map((p) => `hue-${p}`),
		...Object.keys(aliases).map((a) => `hue-${a}`),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
})

export function variantParentMatcher(name: string, parent: string): VariantObject {
	let re: RegExp
	return {
		name,
		match(input, ctx) {
			if (!re)
				re = new RegExp(
					`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`
				)

			const match = input.match(re)
			if (match) {
				return {
					matcher: input.slice(match[0].length),
					handle: (input, next) =>
						next({
							...input,
							parent: `${input.parent ? `${input.parent} $$ ` : ""}${parent}`,
						}),
				}
			}
		},
		autocomplete: `${name}:`,
	}
}

export function variantMatcher(
	name: string,
	handler: (input: VariantHandlerContext) => Record<string, any>
): VariantObject {
	let re: RegExp
	return {
		name,
		match(input, ctx) {
			if (!re)
				re = new RegExp(
					`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`
				)

			const match = input.match(re)
			if (match) {
				return {
					matcher: input.slice(match[0].length),
					handle: (input, next) =>
						next({
							...input,
							...handler(input),
						}),
				}
			}
		},
		autocomplete: `${name}:`,
	}
}
