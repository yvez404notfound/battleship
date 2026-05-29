/**
 * @jest-environment jsdom
 */
import { generateGameboardCells } from "../../../utils/dom.js";
import ScreenManager from "../screenManager/screenManager.js";
import PreparationHandler from "./preparationHandler.js";
import { calculateAxis, generateRobotPlayerShipData } from "./utils.js";

import { convertAssetsToInlineSVG } from "../../../utils/asset.js";

// #region Mocks
jest.mock("../../../utils/asset.js");
jest.mock("../../../pages/preparation", () => {
	return jest.fn(
		() => `
				<form class="preparation-editor">
					<div class="name-field">
						<label for="name">What's your name, Admiral?</label>
						<input
							type="text"
							name="name"
							placeholder="Garp"
							id="name" 
							required/>
					</div>

					<div class="ship-placement-editor">
						<p>Place your ships</p>

						<div class="ship-indicators">
							<div class="ships">
								<div class="ship focused">
									<p>Aircraft<br />carrier</p>
								</div>
								<div class="ship">
									<p>Battleship</p>
								</div>
								<div class="ship">
									<p>Cruiser</p>
								</div>
								<div class="ship">
									<p>Submarine</p>
								</div>
								<div class="ship">
									<p>Destroyer</p>
								</div>
							</div>

							<div class="helper-btns">
								<button class="rotate-btn secondary-btn-filled" type="button">
									<span class="material-symbols-outlined">
										rotate_90_degrees_cw
									</span>
									<span>Rotate</span>
								</button>
								<button class="undo-btn error-btn-tonal" type="button">
									<span class="material-symbols-outlined"> undo </span
									><span>Undo</span>
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
					</div>

					<button class="confirm-preparation primary-btn-filled" type="submit">Confirm</button>
				</form>
	`,
	);
});
jest.mock("../../../assets/imgs/ships/sprites/shipAssets", () => ({
	SHIP: {
		aircraftCarrier: ["1", "2", "3", "4", "5"],
		battleship: ["1", "2", "3", "4"],
		cruiser: ["1", "2", "3"],
		submarine: ["1", "2", "3"],
		destroyer: ["1", "2"],
	},
}));
jest.mock("./utils", () => ({
	...jest.requireActual("./utils"),
	generateRobotPlayerShipData: jest.fn(),
}));
// #endregion

// #region Unit Test
describe("Preparation Handler unit test", () => {
	let preparationHandler;

	beforeEach(() => {
		document.body.innerHTML = "";

		preparationHandler = new PreparationHandler();

		preparationHandler.renderPage();
		preparationHandler.bindEvents();

		jest.clearAllMocks();

		global.alert = jest.fn();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("renderPage()", () => {
		test("should render html contents inside body", () => {
			expect(document.body.innerHTML).toContain("preparation-editor");
		});
		test("should add state to body class", () => {
			expect(document.body.classList.contains("preparation")).toBeTruthy();
			expect(document.body.classList.contains("game", "start")).toBeFalsy();
		});
	});

	describe("DOM Events", () => {
		describe("Rotate Button onClick", () => {
			let rotateBtn;
			let targetCell;

			beforeEach(() => {
				rotateBtn = document.querySelector(".rotate-btn");
				targetCell = document.querySelector(".cell[data-position='54']");
			});

			test("should place ships vertically when axis value is Y", () => {
				rotateBtn.click();
				targetCell.click();

				expect(targetCell.classList.contains("ready", "y")).toBeTruthy();
				expect(targetCell.innerHTML).toContain("ship");
			});

			test("should place ships horizontally when axis value is X", () => {
				targetCell.click();

				expect(targetCell.classList.contains("ready", "x")).toBeTruthy();
				expect(targetCell.innerHTML).toContain("ship");
			});
		});

		describe("Undo Button onClick", () => {
			let undoBtn;
			let targetCell;

			beforeEach(() => {
				undoBtn = document.querySelector(".undo-btn");
				targetCell = document.querySelector(".cell[data-position='54']");
			});

			test("should undo the current ship state to previous", () => {
				const firstShipIndicator = document.querySelector(
					".ships > .ship:first-child",
				);

				targetCell.click();
				undoBtn.click();

				expect(firstShipIndicator.classList.contains("placed")).toBeFalsy();
			});

			test("should remove the recent placed ship", () => {
				targetCell.click();
				undoBtn.click();

				expect(targetCell.innerHTML).not.toContain("ship");
			});
		});

		describe("Gameboard Cells Interaction", () => {
			let validTargetCell;
			let invalidTargetCell;

			beforeEach(() => {
				validTargetCell = document.querySelector(".cell[data-position='54']");
				invalidTargetCell = document.querySelector(".cell[data-position='00']");
			});

			describe("onHover", () => {
				test("should render a placeholder ship when hovered on valid cell", () => {
					validTargetCell.dispatchEvent(
						new MouseEvent("mouseenter", {
							bubbles: true,
						}),
					);

					expect(
						validTargetCell.classList.contains("placeholder"),
					).toBeTruthy();
				});

				test("should render a illegal placeholder ship when hovered on an invalid cell", () => {
					invalidTargetCell.dispatchEvent(
						new MouseEvent("mouseenter", {
							bubbles: true,
						}),
					);

					expect(
						invalidTargetCell.classList.contains("placeholder", "illegal"),
					).toBeTruthy();
				});
			});

			describe("onMouseLeave", () => {
				test("should remove the placeholder ship inside", () => {
					validTargetCell.dispatchEvent(
						new MouseEvent("mouseenter", {
							bubbles: true,
						}),
					);

					validTargetCell.dispatchEvent(
						new MouseEvent("mouseleave", {
							bubbles: true,
						}),
					);

					expect(validTargetCell.classList.contains("placeholder")).toBeFalsy();
				});
			});

			describe("onClick", () => {
				let pos = 54;
				const aircraftCarrierVertices = [-2, -1, 0, 1, 2];
				let cells = [];
				let middleCell;

				beforeEach(() => {
					cells = aircraftCarrierVertices.map((vertex) => {
						return document.querySelector(
							`.cell[data-position='${calculateAxis("x", pos, vertex)}']`,
						);
					});

					middleCell = cells[Math.ceil(cells.length / 2)];
				});

				test("should place the ship on the gameboard", () => {
					middleCell.click();

					cells.forEach((cell) => {
						expect(cell.classList.contains("ready"));
						const shipSprite = cell.children[0];
						expect(shipSprite).not.toBeNull();
					});
				});

				test("should update the ship indicators", () => {
					const firstShipIndicator = document.querySelector(
						".ships > .ship:first-child",
					);

					middleCell.click();
					expect(firstShipIndicator.classList.contains("placed")).toBeTruthy();
				});

				test("should return alert when clicked on occupied cell", () => {
					middleCell.click();
					middleCell.click();

					expect(alert).toHaveBeenCalledWith(
						"Coordinates already occupied by other ship.",
					);
				});

				test("should return alert when all ships are already plaved in the gameboard", () => {
					const rotateBtn = document.querySelector(".rotate-btn");
					rotateBtn.click();

					cells.forEach((cell) => cell.click());
					middleCell.click();

					expect(alert).toHaveBeenCalledWith("All ships are already placed.");
				});

				test("should return alert when ship is placed out of bounds", () => {
					middleCell = document.querySelector(".cell[data-position='00'");

					middleCell.click();

					expect(alert).toHaveBeenCalledWith("This ship is out of bounds.");
				});
			});
		});

		describe("Confirm Preparation onClick", () => {
			let confirmBtn;
			let inputEl;

			beforeEach(() => {
				inputEl = document.querySelector('input[name="name"]');
				confirmBtn = document.querySelector(".confirm-preparation");
			});

			describe("User data is incomplete", () => {
				test("should report validity to name input element if it is empty", () => {
					jest.spyOn(inputEl, "reportValidity").mockImplementation(() => true);

					confirmBtn.click();

					expect(inputEl.reportValidity).toHaveBeenCalled();
				});

				test("should return alert when ship data is incomplete", () => {
					inputEl.value = "Yves";
					inputEl.dispatchEvent(new Event("input", { bubbles: true }));

					confirmBtn.click();
					expect(alert).toHaveBeenCalledWith("Place all the ships first.");
				});
			});

			describe("User data is complete", () => {
				const pos = 54;
				const aircraftCarrierVertices = [-2, -1, 0, 1, 2];

				let rotateBtn;
				let cells = [];

				beforeEach(() => {
					rotateBtn = document.querySelector(".rotate-btn");
					cells = aircraftCarrierVertices.map((vertex) => {
						return document.querySelector(
							`.cell[data-position='${calculateAxis("x", pos, vertex)}']`,
						);
					});

					inputEl.value = "Yves";
					inputEl.dispatchEvent(new Event("input", { bubbles: true }));

					rotateBtn.click();

					cells.forEach((cell) => cell.click());
				});

				test("should generate robot data", () => {
					confirmBtn.click();
					expect(generateRobotPlayerShipData).toHaveBeenCalled();
				});

				test("should set user data and robot data to Screen Manager", () => {
					const setUserData = jest.spyOn(ScreenManager, "setUserData");
					const setRobotData = jest.spyOn(ScreenManager, "setRobotData");

					confirmBtn.click();

					expect(setUserData).toHaveBeenCalled();
					expect(setRobotData).toHaveBeenCalled();
				});

				test("should change the state", () => {
					const changeState = jest.spyOn(ScreenManager, "changeState");

					confirmBtn.click();

					expect(changeState).toHaveBeenCalledWith("GAME");
				});
			});
		});
	});
});
// #endregion
