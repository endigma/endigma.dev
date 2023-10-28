<script lang="ts">
	import { calc } from "./arma3fov"

	let width = !import.meta.env.SSR ? screen.width : 0
	let height = !import.meta.env.SSR ? screen.height : 0
	let fov = 90

	$: [fovTop, fovLeft] = calc(width, height, fov)
</script>

<div class="flex flex-row gap-2 w-full">
	<label class="flex flex-grow flex-col">
		Screen Width
		<input bind:value={width} />
	</label>
	<label class="flex flex-grow flex-col">
		Screen Height
		<input bind:value={height} />
	</label>
</div>

<label class="flex flex-grow flex-col mt-2">
	Horizontal FOV
	<input inputmode="numeric" min="70" max="120" step="1" bind:value={fov} />
	<small class="{fov <= 120 && fov >= 70 ? 'text-base11' : 'text-red9'} mt-1"
		>Default is 90</small>
</label>

<p>Result:</p>

<pre class="bg-base2 py-2 px-4 border-base6 border">
fovTop={fovTop.toFixed(2)};
fovLeft={fovLeft.toFixed(2)};
</pre>

<p>You should set these values in your Arma 3 profile config which can usually be found at:</p>
<pre class="bg-base2 py-2 px-4 border-base6 border">
~/Documents/Arma 3 - Other Profiles/[your profile name]
</pre>

<style>
	pre {
		font-family: Iosevka Aile;
	}

	input {
		--at-apply: border border-base7 w-full bg-base2 text-base12 ring-0 focus-visible:(outline-none border-primary9) px-4 h-10 text-base
	}
</style>
