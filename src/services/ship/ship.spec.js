import { createSubmarine } from "./shipFactory.js";

describe("Ship class test", () => {
	const submarine = createSubmarine();

	test("should take a hit", () => {
		submarine.hit();
		expect(submarine.length).toBe(2);
	});

	test("should sunk", () => {
		submarine.hit();
		submarine.hit();
		expect(submarine.isSunk()).toBeTruthy();
	});
});
