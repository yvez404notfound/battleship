import { mockRobotData, mockUserData } from "../../data/player";
import Ship from "../ship/ship";
import Player from "./player";
import { createHumanPlayer, createRobotPlayer } from "./playerFactory";
import {
	attack,
	getGameboard,
	getShipsLeft,
	getType,
	initShips,
	isDead,
	isPositionAttacked,
} from "./playerMethods";

describe("Player class unit test", () => {
	describe("Player behaviors", () => {
		let player;
		let gameboard;
		const shipsData = mockUserData.shipsData;

		beforeEach(() => {
			gameboard = {
				placeShip: jest.fn(),
				receiveAttack: jest.fn(),
			};

			player = new Player("human", "Yves", gameboard)
				.inject(attack)
				.inject(getGameboard)
				.inject(getType)
				.inject(initShips)
				.inject(isDead)
				.inject(isPositionAttacked)
				.inject(getShipsLeft);
		});

		describe("initShips()", () => {
			test("should be able to create ship", () => {
				player.initShips(shipsData);

				expect(player._ships).toHaveLength(5);
				expect(player._ships[0]).toBeInstanceOf(Ship);
			});

			test("should be able to place ship in player gameboard", () => {
				player.initShips(shipsData);

				expect(gameboard.placeShip).toHaveBeenCalled();
			});
		});

		describe("attack()", () => {
			let enemyGameboard;
			const pos = "00";

			test("should attack given enemy gameboard", () => {
				enemyGameboard = {
					receiveAttack: jest.fn(),
				};

				player.attack(pos, enemyGameboard);

				expect(enemyGameboard.receiveAttack).toHaveBeenCalledWith(pos);
			});
		});

		describe("isDead()", () => {
			let testShip;

			test("should return true when all ships are dead", () => {
				testShip = {
					isSunk: jest.fn(() => false),
				};

				player._ships.push(testShip);

				expect(player.isDead()).toBeFalsy();
			});

			test("should return false if player still has ship alive", () => {
				testShip = {
					isSunk: jest.fn(() => true),
				};

				player._ships.push(testShip);

				expect(player.isDead()).toBeTruthy();
			});
		});

		describe("isPositionAttacked()", () => {
			let enemyGameboard = {};
			let pos = "00";

			test("should return false when position is new", () => {
				expect(player.isPositionAttacked(pos)).toBeFalsy();
			});

			test("should return true when position is alredy in recorded attacks", () => {
				player._recordedAttacks.push(pos);
				expect(player.isPositionAttacked(pos)).toBeTruthy();
			});
		});
	});

	describe("Player factories", () => {
		const gameboard = {};
		let player;

		describe("createHumanPlayer()", () => {
			test("Created player type should be human", () => {
				player = new createHumanPlayer("Yves", gameboard);
				expect(player.getType()).toBe("human");
			});
		});

		describe("createRobotPlayer()", () => {
			test("Created player type should be robot", () => {
				player = new createRobotPlayer(gameboard);
				expect(player.getType()).toBe("robot");
			});
		});
	});
});
