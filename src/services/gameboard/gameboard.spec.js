import { createSubmarine } from "../ship/ship.js";
import Gameboard from "./gameboard.js";

describe("Gameboard class unit tests", () => {
	const gameboard = new Gameboard();
	gameboard.initBoardCell();

	test("should be able to place ship", () => {
		gameboard.placeShip(createSubmarine(), ["01", "02", "03"]);

		const cell = gameboard.board[0][1];
		expect(cell.occupiedByShip.type).toBe("Submarine");
	});

	test("should be able to receive attack", () => {
		gameboard.receiveAttack("00");
		const cell = gameboard.board[0][0];

		expect(cell.isHit).toBeTruthy();
		expect(cell.occupiedByShip.length).toBe(2);
	});
});
