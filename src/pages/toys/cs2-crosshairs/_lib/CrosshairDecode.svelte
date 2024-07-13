<script lang="ts">
	import { crosshairToConVars, decodeCrosshairShareCode, type Crosshair } from "csgo-sharecode"

	let shareCode = "CSGO-BxYA4-u8xrB-voGTj-t6Jyr-ruWPA"

	function loadCrosshair(shareCode: string): Crosshair | null {
		console.log("trying to load crosshair", shareCode)
		try {
			return decodeCrosshairShareCode(shareCode)
		} catch (e) {
			console.log(e)
		}

		return null
	}

	function toConVars(crosshair: Crosshair): string {
		console.log("trying to stringify crosshair", shareCode)
		return crosshairToConVars(crosshair)
	}

	$: crosshair = loadCrosshair(shareCode)
	$: cvars = crosshair && toConVars(crosshair).trim()
</script>

<label class="flex flex-grow flex-col">
	Share Code
	<input bind:value={shareCode} />
</label>

{#if crosshair}
	<pre class="bg-base2 py-2 px-4 border-base6 border">{cvars}</pre>
{:else}
	invalid crosshair sharecode
{/if}

<style>
	pre {
		font-family: Iosevka Aile;
	}

	input {
		--at-apply: border border-base7 w-full bg-base2 text-base12 ring-0 focus-visible:
			(outline-none border-primary9) px-4 h-10 text-base;
	}
</style>
