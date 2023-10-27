<script>
	let height = screen.height
	let width = screen.width
	let hfov = 90

	function calc(screen_height, screen_width, hfov) {
		let fovTop = (Math.ceil((2 * Math.atan(Math.tan((hfov * Math.PI) / 180.0/2) * height / width)) * (180/Math.PI)) * 0.0175).toFixed(2)
		let fovLeft = ((fovTop / height) * width).toFixed(2)

		return [fovTop, fovLeft] 
	}

	$: [fovTop, fovLeft] = calc(screen.height, screen.width, hfov)

	$: valid = (hfov <= 120) && (hfov >= 70)
</script>

<div class="flex flex-row gap-2 w-full">
	<label class="flex flex-grow flex-col">
		Screen Width
		<input class="bg" bind:value={width} />
	</label>
	<label class="flex flex-grow flex-col">
		Screen Height
		<input class="bg" bind:value={height} />
	</label>
</div>

<label class="flex flex-grow flex-col mt-2">
	Horizontal FOV
	<input inputmode="numeric" min="70" max="120" step="1" bind:value={hfov} />
	<small class="{valid ? "text-base11" : "text-red9"} mt-1">Values above 120 or below 70 will not work well, the default is 70.</small>
</label>

<p>Result:</p>
<pre class="bg-base2 py-2 px-4 border-base6 border">
fovTop={fovTop};
fovLeft={fovLeft};
</pre>

<p>
	You should set these values in your Arma 3 profile config which can usually be found at:
</p>
<pre class="bg-base2 py-2 px-4 border-base6 border">
~/Documents/Arma 3 - Other Profiles/[your profile name]
</pre>

<style>
	pre {
		font-family: Iosevka Aile;
	}

	input {
		--at-apply: border border-base7 w-full bg-base2 text-base12 ring-0 placeholder:text-base11 disabled:opacity-65 disabled:cursor-not-allowed focus-visible:(outline-none border-primary9) px-4 h-10 text-base
	}

	datalist {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  width: 200px;
	}
	
	option {
	  padding: 0;
	}
	
	input[type="range"] {
	  width: 200px;
	  margin: 0;
	}
	

</style>
