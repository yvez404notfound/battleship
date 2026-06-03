/**
 * @jest-environment jsdom
 */

import * as randomUtils from "../../../utils/random";
import GameMaster from "../../gameMaster/gameMaster.js";
import Modal from "../modal/modal.js";
import ScreenManager from "../screenManager/screenManager";
import GameHandler from "./gameHandler";

// #region Unit Test
describe("Game Handler unit test", () => {
	let mockUserData = {
		name: "Yves",
		shipsData: {
			destroyer: {
				coords: ["00", "01"],
				axis: "x",
			},
			submarine: {
				coords: ["88", "89", "90"],
				axis: "x",
			},
		},
	};
	let mockRobotData = {
		name: "Robot",
		shipsData: mockUserData.shipsData,
	};
	let gameHandler;
	let generateRandVal;

	beforeEach(() => {
		document.body.innerHTML = "";

		gameHandler = new GameHandler();

		ScreenManager.setUserData(mockUserData);
		ScreenManager.setRobotData(mockRobotData);

		generateRandVal = jest
			.spyOn(randomUtils, "generateRandVal")
			.mockReturnValue(0);

		jest.useFakeTimers();

		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.restoreAllMocks();
	});

	describe("renderPage()", () => {
		beforeEach(() => {
			gameHandler.renderPage();
		});

		test("should render the Game UI in dom", () => {
			expect(document.body.innerHTML).toContain("players-game-info");
		});

		test("should add game state to body class", () => {
			expect(document.body.classList.contains("game")).toBeTruthy();
			expect(
				document.body.classList.contains("start", "preparation"),
			).not.toBeTruthy();
		});

		let playerTargetCell;
		let playerNameEl;
		let robotTargetCell;
		let robotNameEl;

		beforeEach(() => {
			playerTargetCell = document.querySelector(
				".player-game-info:first-child .gameboard > .cell[data-position='00'",
			);
			playerNameEl = document.querySelector(
				".player-game-info:first-child .player-name p",
			);
			robotTargetCell = document.querySelector(
				".player-game-info:last-child .gameboard > .cell[data-position='00'",
			);
			robotNameEl = document.querySelector(
				".player-game-info:last-child .player-name p",
			);
		});

		test("should render the player ships in gameboard", () => {
			const playerShip = playerTargetCell.querySelector("img");
			const robotShip = playerTargetCell.querySelector("img");

			expect(playerShip).not.toBeNull();
			expect(robotShip).not.toBeNull();
		});

		test("should render the player names", () => {
			expect(playerNameEl.textContent).toBe(mockUserData.name);
			expect(robotNameEl.textContent).toBe(mockRobotData.name);
		});
	});

	describe("renderPage() (First turn: Robot)", () => {
		test("should take turn immediately if robot is the first turn", () => {
			console.log("Robot first turn test");
			const takeTurn = jest.spyOn(GameMaster.prototype, "takeTurn");

			generateRandVal.mockReturnValueOnce(1);
			gameHandler.renderPage();

			jest.advanceTimersByTime(1501);

			expect(takeTurn).toHaveBeenCalled();
		});
	});

	describe("DOM Events", () => {
		let targetCell;
		let takeTurn;

		beforeEach(() => {
			gameHandler.renderPage();
			gameHandler.bindEvents();

			targetCell = document.querySelector(
				".player-game-info:last-child .gameboard > .cell[data-position='00']",
			);

			takeTurn = jest.spyOn(GameMaster.prototype, "takeTurn");
		});

		describe("Gameboard cell events", () => {
			describe("onClick", () => {
				test("should start the turn", () => {
					targetCell.click();
					expect(takeTurn).toHaveBeenCalledWith("00");
				});

				test("should take turn again if next the current player after turn is Robot", () => {
					targetCell.click();
					expect(takeTurn).toHaveBeenCalledWith("00");

					targetCell.click();
					expect(takeTurn).not.toHaveBeenCalledTimes(2);

					jest.advanceTimersByTime(1501);

					expect(takeTurn).toHaveBeenCalledTimes(2);
				});

				describe("Should update page UI after successful turn", () => {
					describe("Update attack indicator on hit cell", () => {
						test("should add hit indicator on occupied cell", () => {
							targetCell.click();
							expect(targetCell.innerHTML).toContain("attack-indicator hit");
						});

						test("should add miss indicator on unoccupied cell", () => {
							const testCell = document.querySelector(
								".player-game-info:last-child .gameboard > .cell[data-position='99']",
							);

							testCell.click();
							expect(testCell.innerHTML).toContain("attack-indicator");
						});
					});

					let targetCell1;
					let targetCell2;
					let targetCell3;
					let targetCell4;

					beforeEach(() => {
						targetCell1 = document.querySelector(
							".player-game-info:last-child .gameboard > .cell[data-position='01']",
						);

						targetCell2 = document.querySelector(
							".player-game-info:last-child .gameboard > .cell[data-position='88']",
						);

						targetCell3 = document.querySelector(
							".player-game-info:last-child .gameboard > .cell[data-position='89']",
						);

						targetCell4 = document.querySelector(
							".player-game-info:last-child .gameboard > .cell[data-position='90']",
						);
					});

					describe("Update ship indicators if one ship got sunk", () => {
						test("should update battleship indicator UI when enemy battleship is destroyed", () => {
							const battleshipIndicator = document.querySelector(
								".player-game-info:last-child .ship.destroyer",
							);

							expect(
								battleshipIndicator.classList.contains("destroyed"),
							).toBeFalsy();

							targetCell.click();
							jest.runOnlyPendingTimers();

							generateRandVal.mockReturnValueOnce(99);

							targetCell1.click();
							jest.runOnlyPendingTimers();

							expect(
								battleshipIndicator.classList.contains("destroyed"),
							).toBeTruthy();
						});
					});

					test("display winner modal if current player sunk all enemy player ships", () => {
						targetCell.click();
						jest.runOnlyPendingTimers();

						generateRandVal.mockReturnValueOnce(99);

						targetCell1.click();
						jest.runOnlyPendingTimers();

						generateRandVal.mockReturnValueOnce(5);

						targetCell2.click();
						jest.runOnlyPendingTimers();

						generateRandVal.mockReturnValueOnce(6);

						targetCell3.click();
						jest.runOnlyPendingTimers();

						generateRandVal.mockReturnValueOnce(7);

						targetCell4.click();
						jest.runOnlyPendingTimers();

						expect(document.body.innerHTML).toContain("winner-modal");
					});
				});
			});
		});
	});
});
// #endregion
