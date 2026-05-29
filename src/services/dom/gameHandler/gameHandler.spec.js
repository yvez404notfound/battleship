/**
 * @jest-environment jsdom
 */

import * as randomUtils from "../../../utils/random";
import GameMaster from "../../gameMaster/gameMaster.js";
import ScreenManager from "../screenManager/screenManager";
import GameHandler from "./gameHandler";

// #region Mocks
jest.mock("../../../pages/game", () => {
	return jest.fn(
		() => `
			<div class="players-game-info">
				<div class="player-game-info">
					<div>
						<div class="player-name">
							<span>
								<span class="material-symbols-outlined filled"> person </span>
								<p>Yves</p>
								<span class="turn-indicator hidden">Your Turn</span>
							</span>
							<button class="forfeit-btn error-btn-filled">
								<span class="material-symbols-outlined"> flag_2 </span>
								<p>Forfeit</p>
							</button>
						</div>
					</div>
					<div class="gameboard">
						${Array.from(
							{ length: 100 },
							(_, i) => `
												<div
													class="cell"
													data-position="${String(i).padStart(2, "0")}"
												></div>
											`,
						).join("")}
					</div>
					<div class="ships-indicator">
						<div class="ship focused">
							<p>Aircraft<br />carrier</p>
						</div>
						<div class="ship focused">
							<p>Battleship</p>
						</div>
						<div class="ship focused">
							<p>Cruiser</p>
						</div>
						<div class="ship focused">
							<p>Submarine</p>
						</div>
						<div class="ship focused">
							<p>Destroyer</p>
						</div>
					</div>
				</div>

				<div class="player-game-info">
					<div>
						<div class="player-name">
							<span>
								<span class="material-symbols-outlined filled"> robot_2 </span>
								<p>Robot</p>
								<span class="turn-indicator hidden">Your Turn</span>
							</span>
						</div>
					</div>
					<div class="gameboard">
						${Array.from(
							{ length: 100 },
							(_, i) => `
												<div
													class="cell"
													data-position="${String(i).padStart(2, "0")}"
												></div>
											`,
						).join("")}
					</div>
					<div class="ships-indicator">
						<div class="ship focused">
							<p>Aircraft<br />carrier</p>
						</div>
						<div class="ship focused">
							<p>Battleship</p>
						</div>
						<div class="ship focused">
							<p>Cruiser</p>
						</div>
						<div class="ship focused">
							<p>Submarine</p>
						</div>
						<div class="ship focused">
							<p>Destroyer</p>
						</div>
					</div>
				</div>
			</div>

	`,
	);
});
// #endregion

// #region Unit Test
describe("Game Handler unit test", () => {
	let mockUserData = {
		name: "Yves",
		shipsData: {
			battleship: {
				coords: ["00", "01"],
				axis: "x",
			},
		},
	};
	let mockRobotData = {
		name: "Robot",
		shipsData: mockUserData.shipsData,
	};
	let gameHandler;

	jest.spyOn(randomUtils, "generateRandVal").mockReturnValue(0);

	beforeEach(() => {
		document.body.innerHTML = "";

		gameHandler = new GameHandler();

		ScreenManager.setUserData(mockUserData);
		ScreenManager.setRobotData(mockRobotData);

		jest.clearAllMocks();
	});

	afterEach(() => {
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
			});
		});
	});
});
// #endregion
