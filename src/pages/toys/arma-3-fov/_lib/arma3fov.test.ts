import { calc } from "./arma3fov"

import { expect, test } from "vitest"

test("calc produces correct output", () => {
	let [fovTop, fovLeft] = calc(1920, 1080, 90)

	expect(fovTop).toBeCloseTo(0.75)
	expect(fovLeft).toBeCloseTo(1.33)
})
