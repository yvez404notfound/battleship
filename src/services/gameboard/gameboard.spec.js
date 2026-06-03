import { createSubmarine } from "../ship/shipFactory.js";
import Gameboard from "./gameboard.js";

describe("Gameboard unit tests", () => {
	let gameboard;
	let coordinates = ["00", "02", "03"];

	beforeEach(() => {
		gameboard = new Gameboard();
	});

	describe("placeShip", () => {
		let ship = {};

		test("should place a ship on given coordinates", () => {
			gameboard.placeShip(ship, coordinates);

			const cellwShip = gameboard.getCell(coordinates[0]);

			expect(cellwShip.isOccupied()).toBeTruthy();
		});

		test("the occupied cell should store the correct ship reference", () => {
			gameboard.placeShip(ship, coordinates);

			const cellwShip = gameboard.getCell(coordinates[0]);

			expect(cellwShip.getOccupiedByShip()).toBe(ship);
		});
	});

	describe("receiveAttack", () => {
		const pos = "00";

		test("should mark attacked cell as hit", () => {
			gameboard.receiveAttack(pos);
			const attackedCell = gameboard.getCell(pos);
			expect(attackedCell.getIsHit()).toBeTruthy();
		});

		test("should hit the ship if attacked cell is occupied by one", () => {
			let ship = {
				hit: jest.fn(),
			};

			gameboard.placeShip(ship, coordinates);
			gameboard.receiveAttack(pos);
			expect(ship.hit).toHaveBeenCalledTimes(1);
		});

		test("should not hit a ship when cell is not occupied by one", () => {
			let ship = {
				hit: jest.fn(),
			};

			gameboard.placeShip(ship, coordinates);
			gameboard.receiveAttack("99");

			expect(ship.hit).not.toHaveBeenCalled();
		});
	});
});
