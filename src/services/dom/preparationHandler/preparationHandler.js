import { SHIP } from "../../../assets/imgs/ships/sprites/shipAssets";
import preparationPageUI from "../../../pages/preparation";
import { generateRandVal } from "../../../utils/random";
import ScreenManager from "../screenManager/screenManager";
import {
	calculateAxis,
	generateRobotPlayerShipData,
	isPositionOutOfBounds,
} from "./utils";

class PreparationHandler {
	#SHIP_POSITION_VERTICES = {
		aircraftCarrier: [-2, -1, 0, 1, 2],
		battleship: [-1, 0, 1, 2],
		cruiser: [-1, 0, 1],
		submarine: [-1, 0, 1],
		destroyer: [0, 1],
	};

	#userData = {
		name,
		shipsData: {
			aircraftCarrier: {
				coords: [],
				axis: "",
			},
			battleship: {
				coords: [],
				axis: "",
			},
			cruiser: {
				coords: [],
				axis: "",
			},
			submarine: {
				coords: [],
				axis: "",
			},
			destroyer: {
				coords: [],
				axis: "",
			},
		},
	};

	#robotData = {};

	#shipPlacement = {
		states: Object.keys(this.#userData.shipsData),
		idx: 0,
		axis: "x",
	};

	#currentShip = this.#shipPlacement.states[this.#shipPlacement.idx];

	constructor() {
		this.bodyEl = document.querySelector("body");
	}

	renderPage() {
		this.bodyEl.innerHTML = preparationPageUI();
		this.bodyEl.classList.add("preparation");
		this.bodyEl.classList.remove("start", "game");
	}

	#undoCurrentShipState() {
		if (this.#shipPlacement.idx === 0) return;

		const shipsData = Object.values(this.#userData.shipsData).map((data) => {
			return data.coords;
		});

		if (shipsData[shipsData.length - 1].length < 1) this.#shipPlacement.idx--;

		this.#currentShip = this.#shipPlacement.states[this.#shipPlacement.idx];
	}

	#undoShipDataRecord() {
		this.#userData.shipsData[this.#currentShip].coords = [];
		this.#userData.shipsData[this.#currentShip].axis = "";
	}

	#destroyPlacedShips(currShipCoords) {
		let shipLocCells = currShipCoords.map((pos) => {
			const cell = this.bodyEl.querySelector(`.cell[data-position="${pos}"]
			`);

			return cell;
		});

		shipLocCells.forEach((cell) => {
			cell.innerHTML = "";
			cell.classList.remove("placeholder", "ready");
		});
	}

	#undoShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[this.#shipPlacement.idx];
		ship.classList.replace("placed", "focused");

		const nextShip = ship.nextElementSibling;

		if (nextShip !== null) nextShip.classList.remove("focused", "placed");
	}

	#undoShipPlacement() {
		if (this.#shipPlacement.idx === 0) return;

		this.#undoCurrentShipState();

		const currShipCoords = this.#userData.shipsData[this.#currentShip].coords;

		this.#undoShipDataRecord();

		this.#undoShipIndicators();

		this.#destroyPlacedShips(currShipCoords);

		// console.log("Ship location removed: ", this.#userData.shipsData);
		// console.log("Current ship: ", this.#currentShip);
	}

	#areCellsOccupied(cells) {
		const hasChild = cells.some((cell) => {
			if (cell === null) return;
			const child = cell.querySelector("img");
			if (child !== null) return cell.classList.contains("ready");
		});

		return hasChild;
	}

	#renderCurrentShipToGameboard(position, state) {
		let cellsToBeFilled = [];
		const currentShipPositionVertices =
			this.#SHIP_POSITION_VERTICES[this.#currentShip];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = calculateAxis(this.#shipPlacement.axis, position, vertex);

			if (isPositionOutOfBounds(cellPos, position, this.#shipPlacement.axis)) {
				cellsToBeFilled.push(null);
				return;
			}

			cellsToBeFilled.push(
				this.bodyEl.querySelector(`.cell[data-position='${cellPos}']`),
			);
		});

		const imgSpritePaths = SHIP[this.#currentShip];
		const imgSpriteClass = `ship-sprite ${this.#shipPlacement.axis}`;
		const isOutOfBounds = cellsToBeFilled.includes(null);
		const areCellsOccupied = this.#areCellsOccupied(cellsToBeFilled);

		cellsToBeFilled.forEach((cell, i) => {
			if (cell === null) return;

			const isCellReady = cell.classList.contains("ready");

			cell.classList.add(state);
			if ((areCellsOccupied && !isCellReady) || isOutOfBounds)
				cell.classList.add("illegal");

			if (isCellReady) cell.classList.remove("illegal", "placeholder");

			const img = document.createElement("img");
			img.classList = imgSpriteClass;
			img.src = imgSpritePaths[i];
			cell.appendChild(img);
		});
	}

	#destroyCurrentShipToGameboard(position) {
		const currentShipPositionVertices =
			this.#SHIP_POSITION_VERTICES[this.#currentShip];
		let cellsToBeDestroyed = [];

		currentShipPositionVertices.forEach((vertex) => {
			const cellPos = calculateAxis(this.#shipPlacement.axis, position, vertex);

			if (isPositionOutOfBounds(cellPos, position, this.#shipPlacement.axis)) {
				cellsToBeDestroyed.push(null);
				return;
			}

			cellsToBeDestroyed.push(
				this.bodyEl.querySelector(`.cell[data-position='${cellPos}']`),
			);
		});

		cellsToBeDestroyed.forEach((cell) => {
			if (cell === null || cell.classList.contains("ready")) return;
			cell.innerHTML = "";
			cell.classList.remove("illegal", "placeholder");
		});
	}

	#updateShipIndicators(idx) {
		const shipIndicators = this.bodyEl.querySelectorAll(".ships > .ship");

		const ship = shipIndicators[idx];
		ship.classList.replace("focused", "placed");

		const nextShip = ship.nextElementSibling;
		if (nextShip !== null) nextShip.classList.add("focused");
	}

	#updateCurrentShipState() {
		const shipLength = this.#shipPlacement.states.length - 1;
		if (this.#shipPlacement.idx >= shipLength) return;

		this.#shipPlacement.idx++;
		this.#currentShip = this.#shipPlacement.states[this.#shipPlacement.idx];
	}

	#areAllShipsPlaced() {
		const shipsData = Object.values(this.#userData.shipsData).map((data) => {
			return data.coords;
		});
		return shipsData[shipsData.length - 1].length > 0;
	}

	#recordCurrentShipData(position) {
		if (this.#areAllShipsPlaced())
			return alert("All ships are already placed.");

		const currentShipPositionVertices =
			this.#SHIP_POSITION_VERTICES[this.#currentShip];
		let cellsToBeFilled = [];
		let coordinates = [];

		for (let i = 0; i <= currentShipPositionVertices.length - 1; i++) {
			const vertex = currentShipPositionVertices[i];

			const cellPos = calculateAxis(this.#shipPlacement.axis, position, vertex);

			if (isPositionOutOfBounds(cellPos, position, this.#shipPlacement.axis))
				return alert("This ship is out of bounds.");

			const cell = this.bodyEl.querySelector(
				`.cell[data-position='${cellPos}']`,
			);

			cellsToBeFilled.push(cell);
			coordinates.push(cellPos);
		}

		if (this.#areCellsOccupied(cellsToBeFilled))
			return alert("Coordinates already occupied by other ship.");

		this.#renderCurrentShipToGameboard(position, "ready");
		this.#updateShipIndicators(this.#shipPlacement.idx);

		this.#userData.shipsData[this.#currentShip].coords = coordinates;
		this.#userData.shipsData[this.#currentShip].axis = this.#shipPlacement.axis;

		// console.log("Ship location inserted: ", this.#currentShip);
		// console.table(this.#userData.shipsData[this.#currentShip]);

		this.#updateCurrentShipState();
	}

	#nameInputEvent(inputEl) {
		inputEl.setCustomValidity(
			"We must know your name before we battle, Admiral.",
		);

		inputEl.addEventListener(
			"input",
			(e) => (this.#userData.name = e.target.value),
		);
	}

	#rotateBtnEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			this.#shipPlacement.axis = this.#shipPlacement.axis === "x" ? "y" : "x";
			// console.log("Ship placement axis changed: ", this.#shipPlacement.axis);
		});
	}

	#undoBtnEvent(buttonEl) {
		buttonEl.addEventListener("click", () => {
			this.#undoShipPlacement();
		});
	}

	#gameboardCellHoverEvent(cell) {
		cell.addEventListener("mouseenter", (e) => {
			if (this.#areAllShipsPlaced()) return;

			const position = e.target.dataset.position;
			this.#renderCurrentShipToGameboard(position, "placeholder");
		});
	}

	#gameboardCellMouseLeaveEvent(cell) {
		cell.addEventListener("mouseleave", (e) => {
			if (this.#areAllShipsPlaced()) return;

			const position = e.target.dataset.position;
			this.#destroyCurrentShipToGameboard(position);
		});
	}

	#gameboardCellClickEvent(cell) {
		cell.addEventListener("click", (e) => {
			let targetEl = e.currentTarget;

			const position = targetEl.dataset.position;
			this.#recordCurrentShipData(position);
		});
	}

	#gameboardCellsEvents(cells) {
		cells.forEach((cell) => {
			this.#gameboardCellHoverEvent(cell);
			this.#gameboardCellMouseLeaveEvent(cell);
			this.#gameboardCellClickEvent(cell);
		});
	}

	#confirmPreparationEvent(buttonElement, nameInputEl) {
		buttonElement.addEventListener("click", () => {
			if (this.#userData.name === "") return nameInputEl.reportValidity();

			if (!this.#areAllShipsPlaced())
				return alert("Place all the ships first.");

			this.#robotData = {
				name: "Robot",
				shipsData: generateRobotPlayerShipData(
					this.#shipPlacement.states,
					this.#SHIP_POSITION_VERTICES,
				),
			};

			// console.log("Generated data for Robot player: ", this.#robotData);

			ScreenManager.setUserData(this.#userData);
			ScreenManager.setRobotData(this.#robotData);

			ScreenManager.changeState("GAME");
		});
	}

	bindEvents() {
		const nameInputEl = this.bodyEl.querySelector("input[name='name']");
		const rotateBtn = this.bodyEl.querySelector(".rotate-btn");
		const undoBtn = this.bodyEl.querySelector(".undo-btn");
		const gameboardCells = this.bodyEl.querySelectorAll(".cell");
		const confirmBtn = this.bodyEl.querySelector(".confirm-preparation");

		this.#nameInputEvent(nameInputEl);
		this.#rotateBtnEvent(rotateBtn);
		this.#undoBtnEvent(undoBtn);
		this.#gameboardCellsEvents(gameboardCells);
		this.#confirmPreparationEvent(confirmBtn, nameInputEl);
	}
}

export default PreparationHandler;
