import Ship from "../ship/ship.js";
import { createSubmarine } from "../ship/shipFactory.js";
import Cell from "./cell.js";

describe("Cell class unit test", () => {
	const testCell = new Cell("A1");

	test("should be able to occupy by ship", () => {
		testCell.setOccupiedByShip(createSubmarine());

		expect(testCell.occupiedByShip).toBeInstanceOf(Ship);
		expect(testCell.occupiedByShip.type).toBe("Submarine");
	});

	test("should take a hit when attacked", () => {
		testCell.takeHit();

		expect(testCell.isHit).toBeTruthy();
	});
});
