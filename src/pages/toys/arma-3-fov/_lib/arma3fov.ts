const de_ra = (de: number) => de * (Math.PI / 180)

export function calc(screen_width: number, screen_height: number, hFov: number): [number, number] {
	const aspect_ratio = screen_width / screen_height
	const fovTop = ((4 / 3) * Math.tan(de_ra(hFov) / 2)) / aspect_ratio
	const fovLeft = fovTop * aspect_ratio

	return [fovTop, fovLeft]
}
