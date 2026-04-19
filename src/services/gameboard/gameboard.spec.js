import { createSubmarine } from "../ship/ship.js";
import Gameboard from "./gameboard.js";

describe("Gameboard class unit tests", () => {
	const gameboard = new Gameboard();

	test("should be able to place ship", () => {
		gameboard.placeShip(createSubmarine(), ["A1", "A2", "A3"]);
		const cellData = gameboard.getCell("A1");
		expect(cellData.occupiedByShip.type).toBe("Submarine");
	});

	test("should be able to receive attack", () => {
		gameboard.receiveAttack("A1");

		expect(cellData.isHit).toBeTruthy();
		expect(cellData.occupiedByShip.length).toBe(2);
	});
});
